using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class Settings
    {
        [Key]
        public int SettingsId { get; set; }

        [Required]
        [StringLength(100)]
        public string CompanyName { get; set; } = "SA StockMaster";

        [StringLength(500)]
        public string CompanyAddress { get; set; } = string.Empty;

        [StringLength(100)]
        public string CompanyCity { get; set; } = string.Empty;

        [StringLength(100)]
        public string CompanyProvince { get; set; } = string.Empty;

        [StringLength(10)]
        public string CompanyPostalCode { get; set; } = string.Empty;

        [StringLength(100)]
        public string CompanyCountry { get; set; } = "South Africa";

        [StringLength(20)]
        public string CompanyPhone { get; set; } = string.Empty;

        [StringLength(100)]
        public string CompanyEmail { get; set; } = string.Empty;

        [StringLength(50)]
        public string CompanyVATNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string CompanyRegistration { get; set; } = string.Empty;

        [StringLength(50)]
        public string CompanyBEEStatus { get; set; } = string.Empty;

        public int? CompanyBEELevel { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal DefaultVATRate { get; set; } = 0.15m;

        [StringLength(3)]
        public string Currency { get; set; } = "ZAR";

        [StringLength(50)]
        public string CurrencySymbol { get; set; } = "R";

        [StringLength(50)]
        public string DefaultPaymentTerms { get; set; } = "30 days";

        [StringLength(50)]
        public string DefaultDeliveryMethod { get; set; } = "Standard";

        public int LowStockThreshold { get; set; } = 10;
        public int ReorderPointThreshold { get; set; } = 25;

        public bool AutoGenerateSKU { get; set; } = true;
        public bool TrackExpiryDates { get; set; } = false;
        public bool EnableMultiWarehouse { get; set; } = true;
        public bool EnableBEETracking { get; set; } = true;
        public bool EnableVATCalculation { get; set; } = true;

        [StringLength(500)]
        public string TaxInvoiceFooter { get; set; } = "Thank you for your business!";

        [StringLength(500)]
        public string QuoteFooter { get; set; } = "Valid for 30 days";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Computed properties
        [NotMapped]
        public string FullCompanyAddress => $"{CompanyAddress}, {CompanyCity}, {CompanyProvince}, {CompanyPostalCode}, {CompanyCountry}";

        [NotMapped]
        public bool IsVATRegistered => !string.IsNullOrEmpty(CompanyVATNumber);

        [NotMapped]
        public bool IsBEECompliant => !string.IsNullOrEmpty(CompanyBEEStatus) && CompanyBEELevel.HasValue;
    }
}