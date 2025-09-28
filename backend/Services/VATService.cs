using SAStockMaster.API.Data;

namespace SAStockMaster.API.Services
{
    public interface IVATService
    {
        Task<decimal> GetVATRateAsync();
        Task<bool> IsVATRegisteredAsync();
        decimal CalculatePriceInclVAT(decimal priceExclVAT, decimal vatRate);
        decimal CalculatePriceExclVAT(decimal priceInclVAT, decimal vatRate);
    }

    public class VATService : IVATService
    {
        private readonly StockMasterContext _context;

        public VATService(StockMasterContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetVATRateAsync()
        {
            var settings = await _context.Settings.FindAsync(1);
            return settings?.VATRate ?? 0.15m;
        }

        public async Task<bool> IsVATRegisteredAsync()
        {
            var settings = await _context.Settings.FindAsync(1);
            return settings?.VATRegistered ?? true;
        }

        public decimal CalculatePriceInclVAT(decimal priceExclVAT, decimal vatRate)
        {
            return priceExclVAT * (1 + vatRate);
        }

        public decimal CalculatePriceExclVAT(decimal priceInclVAT, decimal vatRate)
        {
            return priceInclVAT / (1 + vatRate);
        }
    }
}