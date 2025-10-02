using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class StockMovement
    {
        [Key]
        public int MovementId { get; set; }

        public int ProductId { get; set; }

        [Required]
        [StringLength(20)]
        public string MovementType { get; set; } = string.Empty; // "IN", "OUT", "TRANSFER", "ADJUSTMENT", "DAMAGED", "RETURNED"

        [Required]
        public int QuantityChange { get; set; }

        public int QuantityBefore { get; set; }
        public int QuantityAfter { get; set; }

        [Required]
        public DateTime MovementDate { get; set; } = DateTime.UtcNow;

        [Required]
        [StringLength(100)]
        public string Reference { get; set; } = string.Empty;

        [StringLength(500)]
        public string Notes { get; set; } = string.Empty;

        [StringLength(100)]
        public string SourceDocument { get; set; } = string.Empty; // Purchase Order, Sales Order, etc.

        public int? SourceDocumentId { get; set; }

        [StringLength(50)]
        public string UserId { get; set; } = string.Empty;

        [StringLength(100)]
        public string UserName { get; set; } = string.Empty;

        public int? WarehouseId { get; set; }
        public int? FromWarehouseId { get; set; }
        public int? ToWarehouseId { get; set; }

        [StringLength(50)]
        public string BatchNumber { get; set; } = string.Empty;

        public DateTime? ExpiryDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? UnitCost { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? TotalCost { get; set; }

        public bool IsSystemGenerated { get; set; } = false;

        // Navigation properties
        public Product Product { get; set; } = null!;
        public Warehouse? Warehouse { get; set; }
        public Warehouse? FromWarehouse { get; set; }
        public Warehouse? ToWarehouse { get; set; }

        // Computed properties
        [NotMapped]
        public string MovementDescription => $"{MovementType}: {QuantityChange} units of {Product?.Name}";

        [NotMapped]
        public bool IsPositiveMovement => QuantityChange > 0;

        [NotMapped]
        public bool IsNegativeMovement => QuantityChange < 0;

        [NotMapped]
        public string MovementDirection => QuantityChange > 0 ? "IN" : "OUT";
    }
}