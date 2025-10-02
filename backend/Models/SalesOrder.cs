using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class SalesOrder
    {
        [Key]
        public int SalesOrderId { get; set; }

        [Required]
        [StringLength(50)]
        public string OrderNumber { get; set; } = string.Empty;

        public int CustomerId { get; set; }
        public int WarehouseId { get; set; }

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public DateTime? RequiredDeliveryDate { get; set; }
        public DateTime? ActualDeliveryDate { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Picked, Packed, Shipped, Delivered, Cancelled, Returned

        [StringLength(50)]
        public string PaymentStatus { get; set; } = "Pending"; // Pending, Partial, Paid, Overdue, Refunded

        [StringLength(50)]
        public string Priority { get; set; } = "Normal"; // Low, Normal, High, Urgent

        [Column(TypeName = "decimal(18,2)")]
        public decimal SubTotal { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal VATRate { get; set; } = 0.15m;

        [Column(TypeName = "decimal(18,2)")]
        public decimal VATAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal DiscountPercentage { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ShippingCost { get; set; }

        [StringLength(50)]
        public string PaymentMethod { get; set; } = "Cash"; // Cash, EFT, Credit Card, Debit Card, Account

        [StringLength(50)]
        public string DeliveryMethod { get; set; } = "Standard"; // Standard, Express, Overnight, Collection

        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        [StringLength(100)]
        public string SalesRep { get; set; } = string.Empty;

        [StringLength(100)]
        public string CreatedBy { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public Customer Customer { get; set; } = null!;
        public Warehouse Warehouse { get; set; } = null!;
        public ICollection<SalesOrderItem> SalesOrderItems { get; set; } = new List<SalesOrderItem>();

        // Computed properties
        [NotMapped]
        public int TotalItems => SalesOrderItems?.Count ?? 0;

        [NotMapped]
        public int TotalQuantity => SalesOrderItems?.Sum(i => i.Quantity) ?? 0;

        [NotMapped]
        public decimal TotalProfit => SalesOrderItems?.Sum(i => i.Profit) ?? 0;

        [NotMapped]
        public bool IsPending => Status == "Pending";
        [NotMapped]
        public bool IsDelivered => Status == "Delivered";
        [NotMapped]
        public bool IsCancelled => Status == "Cancelled";
    }
}