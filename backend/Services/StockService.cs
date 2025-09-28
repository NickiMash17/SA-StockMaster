using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Services
{
    public interface IStockService
    {
        Task<bool> UpdateStockAsync(int productId, int quantityChange, string movementType, string reference);
        Task<List<Product>> GetLowStockProductsAsync();
        Task<decimal> GetTotalStockValueAsync();
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

        public async Task<bool> UpdateStockAsync(int productId, int quantityChange, string movementType, string reference)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var product = await _context.Products.FindAsync(productId);
                if (product == null) return false;

                // Update stock quantity
                if (movementType == "IN")
                    product.QuantityInStock += quantityChange;
                else if (movementType == "OUT")
                    product.QuantityInStock -= quantityChange;

                if (product.QuantityInStock < 0)
                    throw new InvalidOperationException("Stock cannot be negative");

                // Create stock movement record
                var stockMovement = new StockMovement
                {
                    ProductId = productId,
                    MovementType = movementType,
                    QuantityChange = quantityChange,
                    MovementDate = DateTime.Now,
                    Reference = reference
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

        public async Task<List<Product>> GetLowStockProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .Where(p => p.QuantityInStock <= p.MinStockLevel)
                .ToListAsync();
        }

        public async Task<decimal> GetTotalStockValueAsync()
        {
            return await _context.Products
                .SumAsync(p => p.SellingPriceExclVAT * p.QuantityInStock);
        }
    }
}