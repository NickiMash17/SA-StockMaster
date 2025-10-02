using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class PurchaseOrderItem
    {
        [Key]
        public int PurchaseOrderItemId { get; set; }

        public int PurchaseOrderId { get; set; }
        public int ProductId { get; set; }

        [Required]
        [StringLength(500)]
        public string ProductName { get; set; } = string.Empty;

        [StringLength(50)]
        public string SKU { get; set; } = string.Empty;

        [Required]
        public int Quantity { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountPercentage { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal DiscountAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal VATRate { get; set; } = 0.15m;

        [Column(TypeName = "decimal(18,2)")]
        public decimal VATAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal LineTotal { get; set; }

        public int ReceivedQuantity { get; set; }
        public int PendingQuantity => Quantity - ReceivedQuantity;

        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public PurchaseOrder PurchaseOrder { get; set; } = null!;
        public Product Product { get; set; } = null!;

        // Computed properties
        [NotMapped]
        public bool IsFullyReceived => ReceivedQuantity >= Quantity;

        [NotMapped]
        public bool IsPartiallyReceived => ReceivedQuantity > 0 && ReceivedQuantity < Quantity;

        [NotMapped]
        public decimal ProfitMargin => Product != null ? ((Product.SellingPriceExclVAT - UnitPrice) / UnitPrice) * 100 : 0;
    }
}