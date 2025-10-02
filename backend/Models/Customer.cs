using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(20)]
        public string Mobile { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

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
        public string IDNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string CompanyRegistration { get; set; } = string.Empty;

        public DateTime? DateOfBirth { get; set; }

        [StringLength(10)]
        public string Gender { get; set; } = string.Empty;

        [StringLength(50)]
        public string CustomerType { get; set; } = "Individual"; // Individual, Company, Government

        [StringLength(50)]
        public string PaymentTerms { get; set; } = "Cash";

        [Column(TypeName = "decimal(5,2)")]
        public decimal? CreditLimit { get; set; }

        [StringLength(50)]
        public string CreditStatus { get; set; } = "Good";

        public bool IsActive { get; set; } = true;
        public bool IsTaxExempt { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<SalesOrder> SalesOrders { get; set; } = new List<SalesOrder>();

        // Computed properties
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}".Trim();

        [NotMapped]
        public string FullAddress => $"{Address}, {City}, {Province}, {PostalCode}, {Country}";

        [NotMapped]
        public decimal TotalPurchases => SalesOrders?.Sum(so => so.TotalAmount) ?? 0;

        [NotMapped]
        public int OrderCount => SalesOrders?.Count ?? 0;

        [NotMapped]
        public bool IsVATRegistered => !string.IsNullOrEmpty(VATNumber);

        [NotMapped]
        public bool IsCompany => CustomerType == "Company";
    }
}