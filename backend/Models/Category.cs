using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAStockMaster.API.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [StringLength(100)]
        public string Code { get; set; } = string.Empty;

        public int? ParentCategoryId { get; set; }
        public Category? ParentCategory { get; set; }
        public ICollection<Category> SubCategories { get; set; } = new List<Category>();

        [StringLength(50)]
        public string Color { get; set; } = "#007bff";

        [StringLength(50)]
        public string Icon { get; set; } = "category";

        public bool IsActive { get; set; } = true;
        public int DisplayOrder { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public ICollection<Product> Products { get; set; } = new List<Product>();

        // Computed properties
        [NotMapped]
        public int ProductCount => Products?.Count ?? 0;

        [NotMapped]
        public decimal TotalStockValue => Products?.Sum(p => p.StockValue) ?? 0;

        [NotMapped]
        public int TotalStockQuantity => Products?.Sum(p => p.QuantityInStock) ?? 0;
    }
}