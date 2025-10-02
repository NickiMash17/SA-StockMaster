using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(100)]
        public string ContactPerson { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(20)]
        public string Mobile { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Address { get; set; } = string.Empty;

        [StringLength(100)]
        public string City { get; set; } = string.Empty;

        [StringLength(100)]
        public string Province { get; set; } = string.Empty;

        [StringLength(10)]
        public string PostalCode { get; set; } = string.Empty;

        [StringLength(100)]
        public string Country { get; set; } = "South Africa";

        [StringLength(50)]
        public string VATNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string RegistrationNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string BEEStatus { get; set; } = string.Empty;

        public int? BEELevel { get; set; }

        [StringLength(20)]
        public string PaymentTerms { get; set; } = "30 days";

        [Column(TypeName = "decimal(5,2)")]
        public decimal? CreditLimit { get; set; }

        [StringLength(500)]
        public string BankDetails { get; set; } = string.Empty;

        [StringLength(50)]
        public string BankName { get; set; } = string.Empty;

        [StringLength(50)]
        public string BranchCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string AccountNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string AccountType { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        public bool IsPreferred { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<PurchaseOrder> PurchaseOrders { get; set; } = new List<PurchaseOrder>();

        // Computed properties
        [NotMapped]
        public int ProductCount => Products?.Count ?? 0;

        [NotMapped]
        public decimal TotalPurchases => PurchaseOrders?.Sum(po => po.TotalAmount) ?? 0;

        [NotMapped]
        public string FullAddress => $"{Address}, {City}, {Province}, {PostalCode}, {Country}";

        [NotMapped]
        public bool HasValidBEE => !string.IsNullOrEmpty(BEEStatus) && BEELevel.HasValue;

        [NotMapped]
        public bool IsVATRegistered => !string.IsNullOrEmpty(VATNumber);
    }
}