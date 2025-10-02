using Microsoft.EntityFrameworkCore;
using SAStockMaster.API.Models;

namespace SAStockMaster.API.Data
{
    public class StockMasterContext : DbContext
    {
        public StockMasterContext(DbContextOptions<StockMasterContext> options) : base(options) { }

        // Core Entities
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<Settings> Settings { get; set; }

        // Enterprise Entities
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderItem> PurchaseOrderItems { get; set; }
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<SalesOrderItem> SalesOrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Product Configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.ProductId);
                entity.Property(e => e.SKU).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Barcode).HasMaxLength(100);
                entity.Property(e => e.Brand).HasMaxLength(50);
                entity.Property(e => e.Manufacturer).HasMaxLength(100);
                entity.Property(e => e.CountryOfOrigin).HasMaxLength(50);
                entity.Property(e => e.HarmonizedCode).HasMaxLength(50);
                entity.Property(e => e.UnitOfMeasure).HasMaxLength(10);
                
                entity.Property(e => e.CostPriceExclVAT).HasPrecision(18, 2);
                entity.Property(e => e.SellingPriceExclVAT).HasPrecision(18, 2);
                entity.Property(e => e.MarkupPercentage).HasPrecision(18, 2);
                
                entity.HasIndex(e => e.SKU).IsUnique();
                entity.HasIndex(e => e.Barcode).IsUnique();
                
                entity.HasOne(e => e.Category)
                    .WithMany(e => e.Products)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Supplier)
                    .WithMany(e => e.Products)
                    .HasForeignKey(e => e.SupplierId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Category Configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CategoryId);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Code).HasMaxLength(100);
                entity.Property(e => e.Color).HasMaxLength(50);
                entity.Property(e => e.Icon).HasMaxLength(50);
                
                entity.HasOne(e => e.ParentCategory)
                    .WithMany(e => e.SubCategories)
                    .HasForeignKey(e => e.ParentCategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Supplier Configuration
            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.HasKey(e => e.SupplierId);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.ContactPerson).HasMaxLength(100);
                entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Mobile).HasMaxLength(20);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.Province).HasMaxLength(100);
                entity.Property(e => e.PostalCode).HasMaxLength(10);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.VATNumber).HasMaxLength(50);
                entity.Property(e => e.RegistrationNumber).HasMaxLength(50);
                entity.Property(e => e.BEEStatus).HasMaxLength(50);
                entity.Property(e => e.PaymentTerms).HasMaxLength(50);
                entity.Property(e => e.BankName).HasMaxLength(50);
                entity.Property(e => e.BranchCode).HasMaxLength(50);
                entity.Property(e => e.AccountNumber).HasMaxLength(50);
                entity.Property(e => e.AccountType).HasMaxLength(50);
                
                entity.HasIndex(e => e.VATNumber).IsUnique();
                entity.HasIndex(e => e.RegistrationNumber).IsUnique();
            });

            // Customer Configuration
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustomerId);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.FirstName).HasMaxLength(100);
                entity.Property(e => e.LastName).HasMaxLength(100);
                entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Mobile).HasMaxLength(20);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(500);
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.Province).HasMaxLength(100);
                entity.Property(e => e.PostalCode).HasMaxLength(10);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.VATNumber).HasMaxLength(50);
                entity.Property(e => e.IDNumber).HasMaxLength(50);
                entity.Property(e => e.CompanyRegistration).HasMaxLength(50);
                entity.Property(e => e.Gender).HasMaxLength(10);
                entity.Property(e => e.CustomerType).HasMaxLength(50);
                entity.Property(e => e.PaymentTerms).HasMaxLength(50);
                entity.Property(e => e.CreditStatus).HasMaxLength(50);
                
                entity.HasIndex(e => e.VATNumber).IsUnique();
                entity.HasIndex(e => e.IDNumber).IsUnique();
                entity.HasIndex(e => e.CompanyRegistration).IsUnique();
            });

            // Stock Movement Configuration
            modelBuilder.Entity<StockMovement>(entity =>
            {
                entity.HasKey(e => e.MovementId);
                entity.Property(e => e.MovementType).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Reference).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Notes).HasMaxLength(500);
                entity.Property(e => e.SourceDocument).HasMaxLength(100);
                entity.Property(e => e.UserId).HasMaxLength(50);
                entity.Property(e => e.UserName).HasMaxLength(100);
                entity.Property(e => e.BatchNumber).HasMaxLength(50);
                entity.Property(e => e.UnitCost).HasPrecision(18, 2);
                entity.Property(e => e.TotalCost).HasPrecision(18, 2);
                
                entity.HasOne(e => e.Product)
                    .WithMany(e => e.StockMovements)
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(e => e.Warehouse)
                    .WithMany(e => e.StockMovements)
                    .HasForeignKey(e => e.WarehouseId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.FromWarehouse)
                    .WithMany()
                    .HasForeignKey(e => e.FromWarehouseId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.ToWarehouse)
                    .WithMany()
                    .HasForeignKey(e => e.ToWarehouseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Warehouse Configuration
            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.HasKey(e => e.WarehouseId);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Code).HasMaxLength(10);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.Province).HasMaxLength(100);
                entity.Property(e => e.PostalCode).HasMaxLength(10);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Manager).HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Type).HasMaxLength(50);
                
                entity.HasOne(e => e.ParentWarehouse)
                    .WithMany(e => e.SubWarehouses)
                    .HasForeignKey(e => e.ParentWarehouseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Purchase Order Configuration
            modelBuilder.Entity<PurchaseOrder>(entity =>
            {
                entity.HasKey(e => e.PurchaseOrderId);
                entity.Property(e => e.OrderNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Priority).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PaymentTerms).HasMaxLength(50);
                entity.Property(e => e.DeliveryMethod).HasMaxLength(50);
                entity.Property(e => e.Notes).HasMaxLength(500);
                entity.Property(e => e.ApprovedBy).HasMaxLength(100);
                
                entity.Property(e => e.SubTotal).HasPrecision(18, 2);
                entity.Property(e => e.VATRate).HasPrecision(18, 2);
                entity.Property(e => e.VATAmount).HasPrecision(18, 2);
                entity.Property(e => e.TotalAmount).HasPrecision(18, 2);
                entity.Property(e => e.DiscountAmount).HasPrecision(18, 2);
                entity.Property(e => e.DiscountPercentage).HasPrecision(5, 2);
                
                entity.HasIndex(e => e.OrderNumber).IsUnique();
                
                entity.HasOne(e => e.Supplier)
                    .WithMany(e => e.PurchaseOrders)
                    .HasForeignKey(e => e.SupplierId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Warehouse)
                    .WithMany(e => e.PurchaseOrders)
                    .HasForeignKey(e => e.WarehouseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Purchase Order Item Configuration
            modelBuilder.Entity<PurchaseOrderItem>(entity =>
            {
                entity.HasKey(e => e.PurchaseOrderItemId);
                entity.Property(e => e.ProductName).IsRequired().HasMaxLength(500);
                entity.Property(e => e.SKU).HasMaxLength(50);
                entity.Property(e => e.Notes).HasMaxLength(500);
                
                entity.Property(e => e.UnitPrice).HasPrecision(18, 2);
                entity.Property(e => e.TotalPrice).HasPrecision(18, 2);
                entity.Property(e => e.DiscountPercentage).HasPrecision(18, 2);
                entity.Property(e => e.DiscountAmount).HasPrecision(18, 2);
                entity.Property(e => e.VATRate).HasPrecision(18, 2);
                entity.Property(e => e.VATAmount).HasPrecision(18, 2);
                entity.Property(e => e.LineTotal).HasPrecision(18, 2);
                
                entity.HasOne(e => e.PurchaseOrder)
                    .WithMany(e => e.PurchaseOrderItems)
                    .HasForeignKey(e => e.PurchaseOrderId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(e => e.Product)
                    .WithMany(e => e.PurchaseOrderItems)
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Sales Order Configuration
            modelBuilder.Entity<SalesOrder>(entity =>
            {
                entity.HasKey(e => e.SalesOrderId);
                entity.Property(e => e.OrderNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PaymentStatus).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Priority).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PaymentMethod).HasMaxLength(50);
                entity.Property(e => e.DeliveryMethod).HasMaxLength(50);
                entity.Property(e => e.Notes).HasMaxLength(500);
                entity.Property(e => e.SalesRep).HasMaxLength(100);
                
                entity.Property(e => e.SubTotal).HasPrecision(18, 2);
                entity.Property(e => e.VATRate).HasPrecision(18, 2);
                entity.Property(e => e.VATAmount).HasPrecision(18, 2);
                entity.Property(e => e.TotalAmount).HasPrecision(18, 2);
                entity.Property(e => e.DiscountAmount).HasPrecision(18, 2);
                entity.Property(e => e.DiscountPercentage).HasPrecision(5, 2);
                entity.Property(e => e.ShippingCost).HasPrecision(18, 2);
                
                entity.HasIndex(e => e.OrderNumber).IsUnique();
                
                entity.HasOne(e => e.Customer)
                    .WithMany(e => e.SalesOrders)
                    .HasForeignKey(e => e.CustomerId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(e => e.Warehouse)
                    .WithMany(e => e.SalesOrders)
                    .HasForeignKey(e => e.WarehouseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Sales Order Item Configuration
            modelBuilder.Entity<SalesOrderItem>(entity =>
            {
                entity.HasKey(e => e.SalesOrderItemId);
                entity.Property(e => e.ProductName).IsRequired().HasMaxLength(500);
                entity.Property(e => e.SKU).HasMaxLength(50);
                entity.Property(e => e.Notes).HasMaxLength(500);
                
                entity.Property(e => e.UnitPrice).HasPrecision(18, 2);
                entity.Property(e => e.TotalPrice).HasPrecision(18, 2);
                entity.Property(e => e.DiscountPercentage).HasPrecision(18, 2);
                entity.Property(e => e.DiscountAmount).HasPrecision(18, 2);
                entity.Property(e => e.VATRate).HasPrecision(18, 2);
                entity.Property(e => e.VATAmount).HasPrecision(18, 2);
                entity.Property(e => e.LineTotal).HasPrecision(18, 2);
                entity.Property(e => e.UnitCost).HasPrecision(18, 2);
                entity.Property(e => e.TotalCost).HasPrecision(18, 2);
                entity.Property(e => e.Profit).HasPrecision(18, 2);
                
                entity.HasOne(e => e.SalesOrder)
                    .WithMany(e => e.SalesOrderItems)
                    .HasForeignKey(e => e.SalesOrderId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(e => e.Product)
                    .WithMany(e => e.SalesOrderItems)
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Settings Configuration
            modelBuilder.Entity<Settings>(entity =>
            {
                entity.HasKey(e => e.SettingsId);
                entity.Property(e => e.CompanyName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.CompanyAddress).HasMaxLength(500);
                entity.Property(e => e.CompanyCity).HasMaxLength(100);
                entity.Property(e => e.CompanyProvince).HasMaxLength(100);
                entity.Property(e => e.CompanyPostalCode).HasMaxLength(10);
                entity.Property(e => e.CompanyCountry).HasMaxLength(100);
                entity.Property(e => e.CompanyPhone).HasMaxLength(20);
                entity.Property(e => e.CompanyEmail).HasMaxLength(100);
                entity.Property(e => e.CompanyVATNumber).HasMaxLength(50);
                entity.Property(e => e.CompanyRegistration).HasMaxLength(50);
                entity.Property(e => e.CompanyBEEStatus).HasMaxLength(50);
                entity.Property(e => e.Currency).HasMaxLength(3);
                entity.Property(e => e.CurrencySymbol).HasMaxLength(50);
                entity.Property(e => e.DefaultPaymentTerms).HasMaxLength(50);
                entity.Property(e => e.DefaultDeliveryMethod).HasMaxLength(50);
                entity.Property(e => e.TaxInvoiceFooter).HasMaxLength(500);
                entity.Property(e => e.QuoteFooter).HasMaxLength(500);
                
                entity.Property(e => e.DefaultVATRate).HasPrecision(5, 2);
                
                entity.HasIndex(e => e.CompanyVATNumber).IsUnique();
                entity.HasIndex(e => e.CompanyRegistration).IsUnique();
            });

            // Seed Data
            SeedInitialData(modelBuilder);
        }

        private void SeedInitialData(ModelBuilder modelBuilder)
        {
            // Static date for seed data to avoid migration issues
            var staticDate = new DateTime(2023, 1, 1, 0, 0, 0, DateTimeKind.Utc);

            // Settings
            modelBuilder.Entity<Settings>().HasData(
                new Settings 
                { 
                    SettingsId = 1, 
                    CompanyName = "SA StockMaster Enterprises",
                    CompanyAddress = "123 Business Park, Main Road",
                    CompanyCity = "Johannesburg",
                    CompanyProvince = "Gauteng",
                    CompanyPostalCode = "2000",
                    CompanyCountry = "South Africa",
                    CompanyPhone = "+27 11 123 4567",
                    CompanyEmail = "info@sastockmaster.co.za",
                    CompanyVATNumber = "VAT1234567890",
                    CompanyRegistration = "2010/012345/07",
                    CompanyBEEStatus = "Level 4",
                    CompanyBEELevel = 4,
                    DefaultVATRate = 0.15m,
                    Currency = "ZAR",
                    CurrencySymbol = "R",
                    DefaultPaymentTerms = "30 days",
                    DefaultDeliveryMethod = "Standard",
                    LowStockThreshold = 10,
                    ReorderPointThreshold = 25,
                    AutoGenerateSKU = true,
                    TrackExpiryDates = false,
                    EnableMultiWarehouse = true,
                    EnableBEETracking = true,
                    EnableVATCalculation = true,
                    TaxInvoiceFooter = "Thank you for your business! VAT No: VAT1234567890",
                    QuoteFooter = "Valid for 30 days. Prices subject to change without notice.",
                    CreatedAt = staticDate,
                    UpdatedAt = staticDate
                }
            );

            // Default Warehouse
            modelBuilder.Entity<Warehouse>().HasData(
                new Warehouse
                {
                    WarehouseId = 1,
                    Name = "Main Warehouse",
                    Code = "MAIN",
                    Description = "Primary warehouse for main operations",
                    Address = "123 Business Park, Main Road",
                    City = "Johannesburg",
                    Province = "Gauteng",
                    PostalCode = "2000",
                    Country = "South Africa",
                    Phone = "+27 11 123 4567",
                    Manager = "Warehouse Manager",
                    Email = "warehouse@sastockmaster.co.za",
                    Type = "Main",
                    IsActive = true,
                    IsPrimary = true,
                    Latitude = -26.2041m,
                    Longitude = 28.0473m,
                    CreatedAt = staticDate,
                    UpdatedAt = staticDate
                }
            );

            // Default Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "General", Description = "General products", Code = "GEN", Color = "#007bff", Icon = "category", IsActive = true, DisplayOrder = 1, CreatedAt = staticDate, UpdatedAt = staticDate },
                new Category { CategoryId = 2, Name = "Electronics", Description = "Electronic products and devices", Code = "ELEC", Color = "#28a745", Icon = "electronics", IsActive = true, DisplayOrder = 2, CreatedAt = staticDate, UpdatedAt = staticDate },
                new Category { CategoryId = 3, Name = "Clothing", Description = "Clothing and apparel", Code = "CLOTH", Color = "#dc3545", Icon = "clothing", IsActive = true, DisplayOrder = 3, CreatedAt = staticDate, UpdatedAt = staticDate },
                new Category { CategoryId = 4, Name = "Food & Beverages", Description = "Food and beverage products", Code = "FOOD", Color = "#ffc107", Icon = "food", IsActive = true, DisplayOrder = 4, CreatedAt = staticDate, UpdatedAt = staticDate },
                new Category { CategoryId = 5, Name = "Hardware", Description = "Hardware and tools", Code = "HARD", Color = "#6f42c1", Icon = "hardware", IsActive = true, DisplayOrder = 5, CreatedAt = staticDate, UpdatedAt = staticDate }
            );

            // Default Supplier
            modelBuilder.Entity<Supplier>().HasData(
                new Supplier
                {
                    SupplierId = 1,
                    Name = "SA Supply Co",
                    ContactPerson = "John Smith",
                    Phone = "+27 11 234 5678",
                    Mobile = "+27 82 123 4567",
                    Email = "john@sasupply.co.za",
                    Address = "456 Industrial Road",
                    City = "Johannesburg",
                    Province = "Gauteng",
                    PostalCode = "2001",
                    Country = "South Africa",
                    VATNumber = "VAT9876543210",
                    RegistrationNumber = "2005/098765/23",
                    BEEStatus = "Level 3",
                    BEELevel = 3,
                    PaymentTerms = "30 days",
                    BankName = "Standard Bank",
                    BranchCode = "001234",
                    AccountNumber = "123456789",
                    AccountType = "Business",
                    IsActive = true,
                    IsPreferred = true,
                    CreatedAt = staticDate,
                    UpdatedAt = staticDate
                }
            );

            // Default Customer
            modelBuilder.Entity<Customer>().HasData(
                new Customer
                {
                    CustomerId = 1,
                    Name = "ABC Corporation",
                    FirstName = "Jane",
                    LastName = "Doe",
                    Phone = "+27 11 345 6789",
                    Mobile = "+27 83 234 5678",
                    Email = "jane@abccorp.co.za",
                    Address = "789 Corporate Drive",
                    City = "Johannesburg",
                    Province = "Gauteng",
                    PostalCode = "2002",
                    Country = "South Africa",
                    VATNumber = "VAT1122334455",
                    CompanyRegistration = "2015/123456/07",
                    CustomerType = "Company",
                    PaymentTerms = "30 days",
                    CreditLimit = 50000,
                    CreditStatus = "Good",
                    IsActive = true,
                    IsTaxExempt = false,
                    CreatedAt = staticDate,
                    UpdatedAt = staticDate
                }
            );
        }
    }
}
