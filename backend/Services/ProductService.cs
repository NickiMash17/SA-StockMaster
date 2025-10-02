using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SA_StockMaster.Services
{
    public interface IProductService
    {
        Task<Product> CreateProductAsync(Product product);
        Task<Product> GetProductByIdAsync(Guid productId);
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> UpdateProductAsync(Product product);
        Task<bool> DeleteProductAsync(Guid productId);
        Task<IEnumerable<Product>> SearchProductsAsync(ProductSearchCriteria criteria);
        Task<bool> ValidateProductAsync(Product product);
    }

    public class ProductService : IProductService
    {
        public async Task<Product> CreateProductAsync(Product product)
        {
            throw new NotImplementedException();
        }

        public async Task<Product> GetProductByIdAsync(Guid productId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteProductAsync(Guid productId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> SearchProductsAsync(ProductSearchCriteria criteria)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ValidateProductAsync(Product product)
        {
            throw new NotImplementedException();
        }
    }

    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
        public int StockLevel { get; set; }
        public string Status { get; set; } = string.Empty;
    }

    public class ProductSearchCriteria
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}