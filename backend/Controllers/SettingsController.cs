using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly StockMasterContext _context;

        public SettingsController(StockMasterContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Settings>> GetSettings()
        {
            var settings = await _context.Settings.FirstOrDefaultAsync();
            if (settings == null)
            {
                // Create default settings if none exist
                settings = new Settings { SettingsId = 1, EnableVATCalculation = true, DefaultVATRate = 0.15m };
                _context.Settings.Add(settings);
                await _context.SaveChangesAsync();
            }
            return settings;
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSettings(Settings settings)
        {
            if (settings.SettingsId != 1)
            {
                return BadRequest("Can only update the main settings record");
            }

            _context.Entry(settings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SettingsExists(1))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool SettingsExists(int id)
        {
            return _context.Settings.Any(e => e.SettingsId == id);
        }
    }
}