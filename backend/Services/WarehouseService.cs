using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SA_StockMaster.Services
{
    public interface IWarehouseService
    {
        Task<Warehouse> CreateWarehouseAsync(Warehouse warehouse);
        Task<Warehouse> GetWarehouseByIdAsync(Guid warehouseId);
        Task<IEnumerable<Warehouse>> GetAllWarehousesAsync();
        Task<Warehouse> UpdateWarehouseAsync(Warehouse warehouse);
        Task<bool> DeleteWarehouseAsync(Guid warehouseId);
        Task<IEnumerable<Warehouse>> SearchWarehousesAsync(WarehouseSearchCriteria criteria);
        Task<bool> ValidateWarehouseAsync(Warehouse warehouse);
    }

    public class WarehouseService : IWarehouseService
    {
        public async Task<Warehouse> CreateWarehouseAsync(Warehouse warehouse)
        {
            throw new NotImplementedException();
        }

        public async Task<Warehouse> GetWarehouseByIdAsync(Guid warehouseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Warehouse>> GetAllWarehousesAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Warehouse> UpdateWarehouseAsync(Warehouse warehouse)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteWarehouseAsync(Guid warehouseId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Warehouse>> SearchWarehousesAsync(WarehouseSearchCriteria criteria)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> ValidateWarehouseAsync(Warehouse warehouse)
        {
            throw new NotImplementedException();
        }
    }

    public class Warehouse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string ManagerUserId { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
    }

    public class WarehouseSearchCriteria
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
    }
}