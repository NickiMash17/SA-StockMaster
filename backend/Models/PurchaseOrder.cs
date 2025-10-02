using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class PurchaseOrder
    {
        [Key]
        public int PurchaseOrderId { get; set; }

        [Required]
        [StringLength(50)]
        public string OrderNumber { get; set; } = string.Empty;

        public int SupplierId { get; set; }
        public int WarehouseId { get; set; }

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public DateTime? ExpectedDeliveryDate { get; set; }
        public DateTime? ActualDeliveryDate { get; set; }

        [StringLength(50)]
        public string Status { get; set; } = "Pending"; // Pending, Approved, Ordered, PartiallyReceived, Received, Cancelled

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

        [StringLength(50)]
        public string PaymentTerms { get; set; } = "30 days";

        [StringLength(50)]
        public string DeliveryMethod { get; set; } = "Standard";

        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        [StringLength(100)]
        public string ApprovedBy { get; set; } = string.Empty;

        public DateTime? ApprovedDate { get; set; }

        [StringLength(100)]
        public string CreatedBy { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public Supplier Supplier { get; set; } = null!;
        public Warehouse Warehouse { get; set; } = null!;
        public ICollection<PurchaseOrderItem> PurchaseOrderItems { get; set; } = new List<PurchaseOrderItem>();

        // Computed properties
        [NotMapped]
        public int TotalItems => PurchaseOrderItems?.Count ?? 0;

        [NotMapped]
        public int TotalQuantity => PurchaseOrderItems?.Sum(i => i.Quantity) ?? 0;

        [NotMapped]
        public bool IsPending => Status == "Pending";
        [NotMapped]
        public bool IsApproved => Status == "Approved";
        [NotMapped]
        public bool IsReceived => Status == "Received";
        [NotMapped]
        public bool IsCancelled => Status == "Cancelled";
    }
}