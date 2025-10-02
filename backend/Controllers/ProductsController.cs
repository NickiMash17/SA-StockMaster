using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;
using SAStockMaster.API.Services;

namespace SAStockMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly StockMasterContext _context;
        private readonly IStockService _stockService;
        private readonly IVATService _vatService;

        public ProductsController(StockMasterContext context, IStockService stockService, IVATService vatService)
        {
            _context = context;
            _stockService = stockService;
            _vatService = vatService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts([FromQuery] string? search = null)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => 
                    p.Name.Contains(search) || 
                    p.SKU.Contains(search) || 
                    p.Supplier.Name.Contains(search));
            }

            var products = await query.ToListAsync();
            var vatRate = await _vatService.GetVATRateAsync();

            return products.Select(p => new
            {
                p.ProductId,
                p.Name,
                p.SKU,
                Category = p.Category.Name,
                Supplier = p.Supplier.Name,
                p.CostPriceExclVAT,
                p.SellingPriceExclVAT,
                SellingPriceInclVAT = _vatService.CalculatePriceInclVAT(p.SellingPriceExclVAT, vatRate),
                p.QuantityInStock,
                p.MinStockLevel,
                IsLowStock = p.QuantityInStock <= p.MinStockLevel
            }).ToList();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducts), new { id = product.ProductId }, product);
        }

        [HttpPost("{id}/stock")]
        public async Task<IActionResult> UpdateStock(int id, [FromBody] StockUpdateRequest request)
        {
            var success = await _stockService.UpdateStockAsync(id, request.Quantity, request.MovementType, request.Reference);
            if (!success)
                return BadRequest("Failed to update stock");
            return Ok();
        }

        [HttpGet("test")]
        public async Task<ActionResult<object>> TestDatabaseConnection()
        {
            try
            {
                var productCount = await _context.Products.CountAsync();
                var categoryCount = await _context.Categories.CountAsync();
                var supplierCount = await _context.Suppliers.CountAsync();
                var warehouseCount = await _context.Warehouses.CountAsync();

                return new
                {
                    Message = "Database connection successful",
                    Data = new
                    {
                        Products = productCount,
                        Categories = categoryCount,
                        Suppliers = supplierCount,
                        Warehouses = warehouseCount
                    }
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Database connection failed", Error = ex.Message });
            }
        }
    }

    public class StockUpdateRequest
    {
        public int Quantity { get; set; }
        public string MovementType { get; set; } = string.Empty;
        public string Reference { get; set; } = string.Empty;
    }
}