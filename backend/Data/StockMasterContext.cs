using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Data
{
    public class StockMasterContext : DbContext
    {
        public StockMasterContext(DbContextOptions<StockMasterContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Product configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ProductId);
                entity.Property(e => e.SKU).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.CostPriceExclVAT).HasPrecision(10, 2);
                entity.Property(e => e.SellingPriceExclVAT).HasPrecision(10, 2);
                entity.HasIndex(e => e.SKU).IsUnique();
            });

            // Stock Movement configuration
            modelBuilder.Entity<StockMovement>(entity =>
            {
                entity.HasKey(e => e.MovementId);
                entity.Property(e => e.MovementType).HasMaxLength(10);
                entity.Property(e => e.Reference).HasMaxLength(50);
            });

            // Settings configuration
            modelBuilder.Entity<Settings>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.VATRate).HasPrecision(4, 2);
            });

            // Seed data
            modelBuilder.Entity<Settings>().HasData(
                new Settings { Id = 1, VATRegistered = true, VATRate = 0.15m }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "General" },
                new Category { CategoryId = 2, Name = "Electronics" },
                new Category { CategoryId = 3, Name = "Clothing" }
            );

            modelBuilder.Entity<Supplier>().HasData(
                new Supplier { SupplierId = 1, Name = "Default Supplier", Phone = "", Address = "" }
            );
        }
    }
}