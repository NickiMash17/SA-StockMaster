namespace SAStockMaster.API.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string SKU { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int SupplierId { get; set; }
        public decimal CostPriceExclVAT { get; set; }
        public decimal SellingPriceExclVAT { get; set; }
        public int QuantityInStock { get; set; }
        public int MinStockLevel { get; set; } = 10;
        
        // Navigation properties
        public Category Category { get; set; } = null!;
        public Supplier Supplier { get; set; } = null!;
        public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
    }
}