using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SA_StockMaster.Services
{
    public interface ISupplierService
    {
        Task<Supplier> CreateSupplierAsync(Supplier supplier);
        Task<Supplier> GetSupplierByIdAsync(Guid supplierId);
        Task<IEnumerable<Supplier>> GetAllSuppliersAsync();
        Task<Supplier> UpdateSupplierAsync(Supplier supplier);
        Task<bool> DeleteSupplierAsync(Guid supplierId);
        Task<IEnumerable<Supplier>> SearchSuppliersAsync(SupplierSearchCriteria criteria);
        Task<bool> ValidateSupplierAsync(Supplier supplier);
    }

    public class SupplierService : ISupplierService
    {
        public async Task<Supplier> CreateSupplierAsync(Supplier supplier)
        {
            throw new NotImplementedException();
        }

        public async Task<Supplier> GetSupplierByIdAsync(Guid supplierId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Supplier> UpdateSupplierAsync(Supplier supplier)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteSupplierAsync(Guid supplierId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Supplier>> SearchSuppliersAsync(SupplierSearchCriteria criteria)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ValidateSupplierAsync(Supplier supplier)
        {
            throw new NotImplementedException();
        }
    }

    public class Supplier
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
    }

    public class SupplierSearchCriteria
    {
        public string Name { get; set; }
        public string Status { get; set; }
    }
}