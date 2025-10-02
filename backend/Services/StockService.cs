using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Services
{
    public interface IStockService
    {
        Task<bool> UpdateStockAsync(int productId, int quantityChange, string movementType, string reference, int? warehouseId = null, string notes = null);
        Task<List<Product>> GetLowStockProductsAsync(int? warehouseId = null);
        Task<decimal> GetTotalStockValueAsync(int? warehouseId = null);
        
        Task<List<StockMovement>> GetStockMovementsAsync(int productId, DateTime? fromDate = null, DateTime? toDate = null);
        Task<List<StockMovement>> GetRecentStockMovementsAsync(int count = 50);
        Task<StockReport> GenerateStockReportAsync(int? warehouseId = null);
        
        Task<bool> AdjustStockAsync(int productId, int newQuantity, string reason, string userId, int? warehouseId = null);
        Task<bool> TransferStockAsync(int productId, int quantity, int fromWarehouseId, int toWarehouseId, string userId, string notes = null);
        
        Task<List<Product>> GetOutOfStockProductsAsync(int? warehouseId = null);
        Task<List<Product>> GetOverstockedProductsAsync(int? warehouseId = null);
        Task<decimal> GetStockValueByCategoryAsync(int categoryId, int? warehouseId = null);
        
        Task<Dictionary<string, int>> GetStockLevelsAsync(List<int> productIds, int? warehouseId = null);
        Task<bool> ValidateStockAvailabilityAsync(int productId, int requiredQuantity, int? warehouseId = null);
        
        Task<StockMovement> GetStockMovementByIdAsync(int movementId);
        Task<List<StockMovement>> GetStockMovementsByReferenceAsync(string reference);
    }

    public class StockService : IStockService
    {
        private readonly StockMasterContext _context;
        private readonly IVATService _vatService;

        public StockService(StockMasterContext context, IVATService vatService)
        {
            _context = context;
            _vatService = vatService;
        }

        public async Task<bool> UpdateStockAsync(int productId, int quantityChange, string movementType, string reference, int? warehouseId = null, string notes = null)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = await _context.Products.FindAsync(productId);
                if (product == null) return false;

                var currentQuantity = product.QuantityInStock;
                var newQuantity = currentQuantity;

                // Update stock quantity
                if (movementType == "IN")
                    newQuantity = currentQuantity + quantityChange;
                else if (movementType == "OUT")
                    newQuantity = currentQuantity - quantityChange;

                if (newQuantity < 0)
                    throw new InvalidOperationException("Stock cannot be negative");

                product.QuantityInStock = newQuantity;
                product.LastStockUpdate = DateTime.Now;

                // Create comprehensive stock movement record
                var stockMovement = new StockMovement
                {
                    ProductId = productId,
                    MovementType = movementType,
                    QuantityChange = quantityChange,
                    QuantityBefore = currentQuantity,
                    QuantityAfter = newQuantity,
                    MovementDate = DateTime.Now,
                    Reference = reference,
                    WarehouseId = warehouseId,
                    Notes = notes,
                    IsSystemGenerated = false,
                    SourceDocument = reference,
                    UserId = "system" // This should be replaced with actual user ID from context
                };

                _context.StockMovements.Add(stockMovement);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                return false;
            }
        }

        public async Task<List<Product>> GetLowStockProductsAsync(int? warehouseId = null)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .Where(p => p.QuantityInStock <= p.MinStockLevel);

            return await query.ToListAsync();
        }

        public async Task<decimal> GetTotalStockValueAsync(int? warehouseId = null)
        {
            var query = _context.Products.AsQueryable();
            
            return await query.SumAsync(p => p.SellingPriceExclVAT * p.QuantityInStock);
        }

        public async Task<List<StockMovement>> GetStockMovementsAsync(int productId, DateTime? fromDate = null, DateTime? toDate = null)
        {
            var query = _context.StockMovements
                .Include(sm => sm.Product)
                .Include(sm => sm.Warehouse)
                .Where(sm => sm.ProductId == productId);

            if (fromDate.HasValue)
                query = query.Where(sm => sm.MovementDate >= fromDate.Value);
            
            if (toDate.HasValue)
                query = query.Where(sm => sm.MovementDate <= toDate.Value);

            return await query
                .OrderByDescending(sm => sm.MovementDate)
                .ToListAsync();
        }

        public async Task<List<StockMovement>> GetRecentStockMovementsAsync(int count = 50)
        {
            return await _context.StockMovements
                .Include(sm => sm.Product)
                .Include(sm => sm.Warehouse)
                .OrderByDescending(sm => sm.MovementDate)
                .Take(count)
                .ToListAsync();
        }

        public async Task<StockReport> GenerateStockReportAsync(int? warehouseId = null)
        {
            var products = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .ToListAsync();

            var totalProducts = products.Count;
            var totalValue = products.Sum(p => p.SellingPriceExclVAT * p.QuantityInStock);
            var lowStockCount = products.Count(p => p.QuantityInStock <= p.MinStockLevel);
            var outOfStockCount = products.Count(p => p.QuantityInStock == 0);
            var overstockedCount = products.Count(p => p.QuantityInStock > p.MaxStockLevel);

            return new StockReport
            {
                TotalProducts = totalProducts,
                TotalStockValue = totalValue,
                LowStockCount = lowStockCount,
                OutOfStockCount = outOfStockCount,
                OverstockedCount = overstockedCount,
                StockValueByCategory = await GetStockValueByCategoryAsync(),
                LastUpdated = DateTime.Now
            };
        }

        public async Task<bool> AdjustStockAsync(int productId, int newQuantity, string reason, string userId, int? warehouseId = null)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = await _context.Products.FindAsync(productId);
                if (product == null) return false;

                var currentQuantity = product.QuantityInStock;
                var quantityChange = newQuantity - currentQuantity;

                if (quantityChange == 0) return true;

                product.QuantityInStock = newQuantity;
                product.LastStockUpdate = DateTime.Now;

                var movementType = quantityChange > 0 ? "ADJUSTMENT_IN" : "ADJUSTMENT_OUT";

                var stockMovement = new StockMovement
                {
                    ProductId = productId,
                    MovementType = movementType,
                    QuantityChange = Math.Abs(quantityChange),
                    QuantityBefore = currentQuantity,
                    QuantityAfter = newQuantity,
                    MovementDate = DateTime.Now,
                    Reference = $"ADJ-{DateTime.Now:yyyyMMdd}-{productId}",
                    WarehouseId = warehouseId,
                    Notes = $"Stock adjustment: {reason}",
                    IsSystemGenerated = false,
                    UserId = userId
                };

                _context.StockMovements.Add(stockMovement);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                return false;
            }
        }

        public async Task<bool> TransferStockAsync(int productId, int quantity, int fromWarehouseId, int toWarehouseId, string userId, string notes = null)
        {
            if (fromWarehouseId == toWarehouseId) return false;

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = await _context.Products.FindAsync(productId);
                if (product == null) return false;

                // Check if enough stock available in source warehouse
                var availableStock = product.QuantityInStock; // Simplified - should check warehouse-specific stock
                if (availableStock < quantity) return false;

                var currentQuantity = product.QuantityInStock;
                var newQuantity = currentQuantity; // Total stock remains the same, just transferring

                // Create transfer out movement
                var transferOutMovement = new StockMovement
                {
                    ProductId = productId,
                    MovementType = "TRANSFER_OUT",
                    QuantityChange = quantity,
                    QuantityBefore = currentQuantity,
                    QuantityAfter = newQuantity,
                    MovementDate = DateTime.Now,
                    Reference = $"TRF-{DateTime.Now:yyyyMMdd}-{productId}",
                    WarehouseId = fromWarehouseId,
                    ToWarehouseId = toWarehouseId,
                    Notes = $"Stock transfer to warehouse {toWarehouseId}. {notes}",
                    IsSystemGenerated = false,
                    UserId = userId
                };

                // Create transfer in movement
                var transferInMovement = new StockMovement
                {
                    ProductId = productId,
                    MovementType = "TRANSFER_IN",
                    QuantityChange = quantity,
                    QuantityBefore = currentQuantity,
                    QuantityAfter = newQuantity,
                    MovementDate = DateTime.Now,
                    Reference = $"TRF-{DateTime.Now:yyyyMMdd}-{productId}",
                    WarehouseId = toWarehouseId,
                    FromWarehouseId = fromWarehouseId,
                    Notes = $"Stock transfer from warehouse {fromWarehouseId}. {notes}",
                    IsSystemGenerated = false,
                    UserId = userId
                };

                _context.StockMovements.Add(transferOutMovement);
                _context.StockMovements.Add(transferInMovement);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                return false;
            }
        }

        public async Task<List<Product>> GetOutOfStockProductsAsync(int? warehouseId = null)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .Where(p => p.QuantityInStock == 0)
                .ToListAsync();
        }

        public async Task<List<Product>> GetOverstockedProductsAsync(int? warehouseId = null)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .Where(p => p.QuantityInStock > p.MaxStockLevel)
                .ToListAsync();
        }

        public async Task<decimal> GetStockValueByCategoryAsync(int categoryId, int? warehouseId = null)
        {
            return await _context.Products
                .Where(p => p.CategoryId == categoryId)
                .SumAsync(p => p.SellingPriceExclVAT * p.QuantityInStock);
        }

        private async Task<Dictionary<int, decimal>> GetStockValueByCategoryAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .GroupBy(p => p.CategoryId)
                .Select(g => new { CategoryId = g.Key, Value = g.Sum(p => p.SellingPriceExclVAT * p.QuantityInStock) })
                .ToDictionaryAsync(x => x.CategoryId, x => x.Value);
        }

        public async Task<Dictionary<string, int>> GetStockLevelsAsync(List<int> productIds, int? warehouseId = null)
        {
            return await _context.Products
                .Where(p => productIds.Contains(p.ProductId))
                .ToDictionaryAsync(p => p.SKU, p => p.QuantityInStock);
        }

        public async Task<bool> ValidateStockAvailabilityAsync(int productId, int requiredQuantity, int? warehouseId = null)
        {
            var product = await _context.Products.FindAsync(productId);
            return product != null && product.QuantityInStock >= requiredQuantity;
        }

        public async Task<StockMovement> GetStockMovementByIdAsync(int movementId)
        {
            return await _context.StockMovements
                .Include(sm => sm.Product)
                .Include(sm => sm.Warehouse)
                .FirstOrDefaultAsync(sm => sm.MovementId == movementId);
        }

        public async Task<List<StockMovement>> GetStockMovementsByReferenceAsync(string reference)
        {
            return await _context.StockMovements
                .Include(sm => sm.Product)
                .Include(sm => sm.Warehouse)
                .Where(sm => sm.Reference == reference)
                .OrderByDescending(sm => sm.MovementDate)
                .ToListAsync();
        }
    }

    public class StockReport
    {
        public int TotalProducts { get; set; }
        public decimal TotalStockValue { get; set; }
        public int LowStockCount { get; set; }
        public int OutOfStockCount { get; set; }
        public int OverstockedCount { get; set; }
        public Dictionary<int, decimal> StockValueByCategory { get; set; } = new();
        public DateTime LastUpdated { get; set; }
    }
}