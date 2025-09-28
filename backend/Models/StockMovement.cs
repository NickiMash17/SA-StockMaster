namespace SAStockMaster.API.Models
{
    public class StockMovement
    {
        public int MovementId { get; set; }
        public int ProductId { get; set; }
        public string MovementType { get; set; } = string.Empty; // "IN" or "OUT"
        public int QuantityChange { get; set; }
        public DateTime MovementDate { get; set; }
        public string Reference { get; set; } = string.Empty;
        
        public Product Product { get; set; } = null!;
    }
}