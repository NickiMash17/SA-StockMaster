using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class Warehouse
    {
        [Key]
        public int WarehouseId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(10)]
        public string Code { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

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

        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;

        [StringLength(100)]
        public string Manager { get; set; } = string.Empty;

        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [StringLength(50)]
        public string Type { get; set; } = "Main"; // Main, Distribution, Retail, Storage

        public int? ParentWarehouseId { get; set; }
        public Warehouse? ParentWarehouse { get; set; }
        public ICollection<Warehouse> SubWarehouses { get; set; } = new List<Warehouse>();

        public bool IsActive { get; set; } = true;
        public bool IsPrimary { get; set; } = false;

        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
        public ICollection<PurchaseOrder> PurchaseOrders { get; set; } = new List<PurchaseOrder>();
        public ICollection<SalesOrder> SalesOrders { get; set; } = new List<SalesOrder>();

        // Computed properties
        [NotMapped]
        public string FullAddress => $"{Address}, {City}, {Province}, {PostalCode}, {Country}";

        [NotMapped]
        public int TotalStockMovements => StockMovements?.Count ?? 0;

        [NotMapped]
        public bool HasSubWarehouses => SubWarehouses?.Any() ?? false;
    }
}