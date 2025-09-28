namespace SAStockMaster.API.Models
{
    public class Settings
    {
        public int Id { get; set; } = 1;
        public bool VATRegistered { get; set; } = true;
        public decimal VATRate { get; set; } = 0.15m;
    }
}