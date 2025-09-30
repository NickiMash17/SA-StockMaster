using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockMovementsController : ControllerBase
    {
        private readonly StockMasterContext _context;

        public StockMovementsController(StockMasterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetStockMovements([FromQuery] int? productId = null, [FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var query = _context.StockMovements
                .Include(sm => sm.Product)
                .AsQueryable();

            if (productId.HasValue)
            {
                query = query.Where(sm => sm.ProductId == productId.Value);
            }

            if (startDate.HasValue)
            {
                query = query.Where(sm => sm.MovementDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(sm => sm.MovementDate <= endDate.Value);
            }

            var movements = await query
                .OrderByDescending(sm => sm.MovementDate)
                .Select(sm => new
                {
                    sm.MovementId,
                    sm.ProductId,
                    ProductName = sm.Product.Name,
                    ProductSKU = sm.Product.SKU,
                    sm.MovementType,
                    sm.QuantityChange,
                    sm.MovementDate,
                    sm.Reference
                })
                .ToListAsync();

            return movements;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetStockMovement(int id)
        {
            var movement = await _context.StockMovements
                .Include(sm => sm.Product)
                .Where(sm => sm.MovementId == id)
                .Select(sm => new
                {
                    sm.MovementId,
                    sm.ProductId,
                    ProductName = sm.Product.Name,
                    ProductSKU = sm.Product.SKU,
                    sm.MovementType,
                    sm.QuantityChange,
                    sm.MovementDate,
                    sm.Reference
                })
                .FirstOrDefaultAsync();

            if (movement == null)
            {
                return NotFound();
            }

            return movement;
        }

        [HttpGet("summary")]
        public async Task<ActionResult<object>> GetStockMovementSummary([FromQuery] int? productId = null, [FromQuery] string? period = "30")
        {
            int days = int.Parse(period ?? "30");
            var startDate = DateTime.Now.AddDays(-days);

            var query = _context.StockMovements
                .Include(sm => sm.Product)
                .Where(sm => sm.MovementDate >= startDate);

            if (productId.HasValue)
            {
                query = query.Where(sm => sm.ProductId == productId.Value);
            }

            var summary = await query
                .GroupBy(sm => new { sm.ProductId, sm.Product.Name, sm.Product.SKU })
                .Select(g => new
                {
                    ProductId = g.Key.ProductId,
                    ProductName = g.Key.Name,
                    ProductSKU = g.Key.SKU,
                    StockIn = g.Where(sm => sm.MovementType == "IN").Sum(sm => sm.QuantityChange),
                    StockOut = g.Where(sm => sm.MovementType == "OUT").Sum(sm => sm.QuantityChange),
                    NetMovement = g.Sum(sm => sm.QuantityChange),
                    MovementCount = g.Count()
                })
                .OrderByDescending(s => s.MovementCount)
                .ToListAsync();

            return new
            {
                Period = $"{days} days",
                StartDate = startDate,
                EndDate = DateTime.Now,
                Summary = summary,
                TotalMovements = summary.Sum(s => s.MovementCount),
                TotalStockIn = summary.Sum(s => s.StockIn),
                TotalStockOut = summary.Sum(s => s.StockOut)
            };
        }
    }
}
