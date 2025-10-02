using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Data;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Services
{
    public interface IVATService
    {
        Task<decimal> GetVATRateAsync();
        Task<bool> IsVATRegisteredAsync();
        Task<Settings> GetVATSettingsAsync();
        
        decimal CalculatePriceInclVAT(decimal priceExclVAT, decimal vatRate);
        decimal CalculatePriceExclVAT(decimal priceInclVAT, decimal vatRate);
        decimal CalculateVATAmount(decimal priceExclVAT, decimal vatRate);
        
        Task<VATCalculationResult> CalculateVATBreakdownAsync(decimal amount, bool isInclVAT);
        Task<decimal> GetEffectiveVATRateAsync(DateTime? date = null);
        
        bool IsValidVATNumber(string vatNumber);
        string FormatVATNumber(string vatNumber);
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
            return settings?.DefaultVATRate ?? 0.15m;
        }

        public async Task<bool> IsVATRegisteredAsync()
        {
            var settings = await _context.Settings.FindAsync(1);
            return settings?.EnableVATCalculation ?? true;
        }

        public async Task<Settings> GetVATSettingsAsync()
        {
            return await _context.Settings.FindAsync(1) ?? new Settings();
        }

        public decimal CalculatePriceInclVAT(decimal priceExclVAT, decimal vatRate)
        {
            return Math.Round(priceExclVAT * (1 + vatRate), 2);
        }

        public decimal CalculatePriceExclVAT(decimal priceInclVAT, decimal vatRate)
        {
            return Math.Round(priceInclVAT / (1 + vatRate), 2);
        }

        public decimal CalculateVATAmount(decimal priceExclVAT, decimal vatRate)
        {
            return Math.Round(priceExclVAT * vatRate, 2);
        }

        public async Task<VATCalculationResult> CalculateVATBreakdownAsync(decimal amount, bool isInclVAT)
        {
            var vatRate = await GetVATRateAsync();
            
            if (isInclVAT)
            {
                var exclVAT = CalculatePriceExclVAT(amount, vatRate);
                var vatAmount = amount - exclVAT;
                return new VATCalculationResult
                {
                    AmountInclVAT = amount,
                    AmountExclVAT = exclVAT,
                    VATAmount = vatAmount,
                    VATRate = vatRate
                };
            }
            else
            {
                var vatAmount = CalculateVATAmount(amount, vatRate);
                var inclVAT = amount + vatAmount;
                return new VATCalculationResult
                {
                    AmountInclVAT = inclVAT,
                    AmountExclVAT = amount,
                    VATAmount = vatAmount,
                    VATRate = vatRate
                };
            }
        }

        public async Task<decimal> GetEffectiveVATRateAsync(DateTime? date = null)
        {
            // In a real system, this would check for historical VAT rates
            // For now, return the current rate
            return await GetVATRateAsync();
        }

        public bool IsValidVATNumber(string vatNumber)
        {
            if (string.IsNullOrWhiteSpace(vatNumber))
                return false;

            // Basic validation for South African VAT numbers
            // Format: VAT + 10 digits
            vatNumber = vatNumber.Trim().ToUpper();
            
            if (vatNumber.StartsWith("VAT"))
                vatNumber = vatNumber.Substring(3);
            
            return vatNumber.Length == 10 && vatNumber.All(char.IsDigit);
        }

        public string FormatVATNumber(string vatNumber)
        {
            if (string.IsNullOrWhiteSpace(vatNumber))
                return string.Empty;

            vatNumber = vatNumber.Trim().ToUpper();
            
            if (vatNumber.StartsWith("VAT"))
                return vatNumber;
            
            if (vatNumber.Length == 10 && vatNumber.All(char.IsDigit))
                return $"VAT{vatNumber}";
            
            return vatNumber;
        }
    }

    public class VATCalculationResult
    {
        public decimal AmountInclVAT { get; set; }
        public decimal AmountExclVAT { get; set; }
        public decimal VATAmount { get; set; }
        public decimal VATRate { get; set; }
    }
}