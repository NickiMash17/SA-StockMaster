using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly StockMasterContext _context;

        public DashboardController(StockMasterContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<object>> GetStats()
        {
            var totalProducts = await _context.Products.CountAsync();

            var totalStockValue = await _context.Products.SumAsync(p => p.CostPriceExclVAT * p.QuantityInStock);

            var lowStockProducts = await _context.Products
                .Where(p => p.QuantityInStock <= p.MinStockLevel)
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.SKU,
                    p.QuantityInStock,
                    p.MinStockLevel
                })
                .ToListAsync();

            var lowStockCount = lowStockProducts.Count;

            return new
            {
                totalProducts,
                totalStockValue,
                lowStockCount,
                lowStockProducts
            };
        }
    }
}
