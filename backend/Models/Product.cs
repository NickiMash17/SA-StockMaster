using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string SKU { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [StringLength(100)]
        public string Barcode { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public int SupplierId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal CostPriceExclVAT { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SellingPriceExclVAT { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal MarkupPercentage { get; set; }

        public int QuantityInStock { get; set; }
        public int MinStockLevel { get; set; } = 10;
        public int MaxStockLevel { get; set; } = 1000;
        public int ReorderPoint { get; set; } = 25;

        [StringLength(10)]
        public string UnitOfMeasure { get; set; } = "EA";

        [StringLength(50)]
        public string Brand { get; set; } = string.Empty;

        [StringLength(100)]
        public string Manufacturer { get; set; } = string.Empty;

        [StringLength(50)]
        public string CountryOfOrigin { get; set; } = "South Africa";

        [StringLength(20)]
        public string HarmonizedCode { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        public bool IsTaxable { get; set; } = true;
        public bool IsTrackable { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastStockUpdate { get; set; }

        // Navigation properties
        public Category Category { get; set; } = null!;
        public Supplier Supplier { get; set; } = null!;
        public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
        public ICollection<PurchaseOrderItem> PurchaseOrderItems { get; set; } = new List<PurchaseOrderItem>();
        public ICollection<SalesOrderItem> SalesOrderItems { get; set; } = new List<SalesOrderItem>();

        // Computed properties
        [NotMapped]
        public decimal ProfitMargin => SellingPriceExclVAT - CostPriceExclVAT;

        [NotMapped]
        public decimal ProfitMarginPercentage => CostPriceExclVAT > 0 ? (ProfitMargin / CostPriceExclVAT) * 100 : 0;

        [NotMapped]
        public decimal StockValue => CostPriceExclVAT * QuantityInStock;

        [NotMapped]
        public bool IsLowStock => QuantityInStock <= MinStockLevel;

        [NotMapped]
        public bool IsOutOfStock => QuantityInStock <= 0;

        [NotMapped]
        public bool NeedsReorder => QuantityInStock <= ReorderPoint;

        [NotMapped]
        public string StockStatus
        {
            get
            {
                if (IsOutOfStock) return "Out of Stock";
                if (IsLowStock) return "Low Stock";
                return "In Stock";
            }
        }
    }
}