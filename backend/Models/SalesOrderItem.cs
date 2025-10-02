using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class SalesOrderItem
    {
        [Key]
        public int SalesOrderItemId { get; set; }

        public int SalesOrderId { get; set; }
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

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Profit { get; set; }

        public int PickedQuantity { get; set; }
        public int ShippedQuantity { get; set; }

        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public SalesOrder SalesOrder { get; set; } = null!;
        public Product Product { get; set; } = null!;

        // Computed properties
        [NotMapped]
        public bool IsFullyPicked => PickedQuantity >= Quantity;

        [NotMapped]
        public bool IsFullyShipped => ShippedQuantity >= Quantity;

        [NotMapped]
        public decimal ProfitMargin => UnitPrice > 0 ? (Profit / (UnitPrice * Quantity)) * 100 : 0;
    }
}