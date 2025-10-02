using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SA_StockMaster.Services
{
    public interface IReportingService
    {
        Task<StockReport> GenerateStockReportAsync(DateTime fromDate, DateTime toDate);
        Task<SalesReport> GenerateSalesReportAsync(DateTime fromDate, DateTime toDate);
        Task<PurchaseReport> GeneratePurchaseReportAsync(DateTime fromDate, DateTime toDate);
        Task<CustomerReport> GenerateCustomerReportAsync(DateTime fromDate, DateTime toDate);
        Task<SupplierReport> GenerateSupplierReportAsync(DateTime fromDate, DateTime toDate);
    }

    public class ReportingService : IReportingService
    {
        public Task<StockReport> GenerateStockReportAsync(DateTime fromDate, DateTime toDate)
        {
            return Task.FromException<StockReport>(new NotImplementedException());
        }

        public Task<SalesReport> GenerateSalesReportAsync(DateTime fromDate, DateTime toDate)
        {
            return Task.FromException<SalesReport>(new NotImplementedException());
        }

        public Task<PurchaseReport> GeneratePurchaseReportAsync(DateTime fromDate, DateTime toDate)
        {
            return Task.FromException<PurchaseReport>(new NotImplementedException());
        }

        public Task<CustomerReport> GenerateCustomerReportAsync(DateTime fromDate, DateTime toDate)
        {
            return Task.FromException<CustomerReport>(new NotImplementedException());
        }

        public Task<SupplierReport> GenerateSupplierReportAsync(DateTime fromDate, DateTime toDate)
        {
            return Task.FromException<SupplierReport>(new NotImplementedException());
        }
    }

    public class StockReport { }
    public class SalesReport { }
    public class PurchaseReport { }
    public class CustomerReport { }
    public class SupplierReport { }
}