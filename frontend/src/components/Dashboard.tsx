// Dashboard.tsx
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProducts: 450,
        totalStockValue: 1250000.55,
        lowStockCount: 12,
        criticalStockCount: 3,
        recentActivity: 24,
        lowStockProducts: [
          { 
            productId: 1, 
            name: 'Tire - R16 All Season', 
            sku: 'TYR-R16-AS', 
            category: 'Tires', 
            supplier: 'SupA', 
            quantityInStock: 5, 
            minStockLevel: 10,
            costPrice: 500,
            sellingPrice: 800,
            status: 'critical'
          },
          { 
            productId: 2, 
            name: 'Oil Filter - Type B', 
            sku: 'OFLT-B', 
            category: 'Filters', 
            supplier: 'SupB', 
            quantityInStock: 2, 
            minStockLevel: 5,
            costPrice: 50,
            sellingPrice: 90,
            status: 'critical'
          },
          { 
            productId: 3, 
            name: 'Brake Pad Set - F150', 
            sku: 'BPS-F150', 
            category: 'Brakes', 
            supplier: 'SupC', 
            quantityInStock: 8, 
            minStockLevel: 15,
            costPrice: 300,
            sellingPrice: 550,
            status: 'low'
          },
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value) => 
    `R ${value.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid rgba(255,255,255,0.3)', 
            borderTop: '4px solid white', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>SA-StockMaster</h2>
          <p style={{ opacity: 0.8 }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        padding: '24px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '800', 
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '4px'
            }}>
              SA-StockMaster
            </h1>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Enterprise Inventory Management
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        padding: '32px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px', 
          marginBottom: '40px' 
        }}>
          {/* Total Products */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ 
                padding: '16px', 
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '16px',
                color: 'white'
              }}>
                <span style={{ fontSize: '24px' }}>📦</span>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>TOTAL PRODUCTS</h3>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#1f2937' }}>{stats.totalProducts.toLocaleString()}</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '500' }}>Active inventory items</p>
          </div>

          {/* Stock Value */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,253,244,0.9) 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ 
                padding: '16px', 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '16px',
                color: 'white'
              }}>
                <span style={{ fontSize: '24px' }}>💰</span>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>STOCK VALUE</h3>
                <p style={{ fontSize: '24px', fontWeight: '800', color: '#1f2937' }}>{formatCurrency(stats.totalStockValue)}</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '500' }}>Total inventory worth</p>
          </div>

          {/* Critical Stock */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,242,242,0.9) 100%)',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ 
                padding: '16px', 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '16px',
                color: 'white'
              }}>
                <span style={{ fontSize: '24px' }}>🚨</span>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600', marginBottom: '4px' }}>STOCK ALERTS</h3>
                <p style={{ fontSize: '32px', fontWeight: '800', color: '#dc2626' }}>{stats.lowStockCount}</p>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '500' }}>Requires attention</p>
          </div>
        </div>

        {/* Stock Monitoring Table */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden'
        }}>
          {/* Table Header */}
          <div style={{ 
            padding: '24px',
            borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Stock Level Monitoring
            </h2>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Real-time inventory status and alerts
            </p>
          </div>
          
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ 
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                }}>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#374151', 
                    textTransform: 'uppercase'
                  }}>Product</th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#374151', 
                    textTransform: 'uppercase'
                  }}>Status</th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#374151', 
                    textTransform: 'uppercase'
                  }}>Stock Level</th>
                  <th style={{ 
                    padding: '16px 20px', 
                    textAlign: 'left', 
                    fontSize: '12px', 
                    fontWeight: '700', 
                    color: '#374151', 
                    textTransform: 'uppercase'
                  }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {stats.lowStockProducts.map((product) => {
                  const statusColor = product.status === 'critical' ? '#dc2626' : '#d97706';
                  const statusBg = product.status === 'critical' ? '#fef2f2' : '#fffbeb';
                  
                  return (
                    <tr key={product.productId} style={{ 
                      borderBottom: '1px solid rgba(229, 231, 235, 0.8)'
                    }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>
                            {product.name}
                          </div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>SKU: {product.sku}</div>
                          <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                            {product.category} • {product.supplier}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          background: statusBg,
                          color: statusColor,
                          display: 'inline-block'
                        }}>
                          {product.status === 'critical' ? 'CRITICAL' : 'LOW STOCK'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '80px', 
                            height: '6px', 
                            backgroundColor: '#e5e7eb',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${Math.min(100, (product.quantityInStock / product.minStockLevel) * 100)}%`,
                              height: '100%',
                              backgroundColor: statusColor,
                              borderRadius: '3px'
                            }}></div>
                          </div>
                          <span style={{ 
                            fontSize: '14px', 
                            fontWeight: '700', 
                            color: statusColor 
                          }}>
                            {product.quantityInStock}/{product.minStockLevel}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937' }}>
                          {formatCurrency(product.sellingPrice)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                          Selling price
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '24px'
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.6)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Last Updated</div>
            <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '700' }}>Just now</div>
          </div>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.6)',
            padding: '20px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔄</div>
            <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '600' }}>Recent Activity</div>
            <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '700' }}>{stats.recentActivity} actions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;