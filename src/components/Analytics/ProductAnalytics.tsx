import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  Avatar,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';

// Mock data
const productPerformance = [
  {
    id: 1,
    name: 'Laptop Pro X',
    category: 'Electronics',
    sales: 45600,
    units: 89,
    conversion: 5.2,
    trend: 12.5,
    thumbnail: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    category: 'Electronics',
    sales: 28900,
    units: 234,
    conversion: 4.8,
    trend: -2.3,
    thumbnail: 'https://via.placeholder.com/40',
  },
  // Add more mock data here
];

const categoryPerformance = [
  { name: 'Electronics', value: 45600, growth: 12 },
  { name: 'Clothing', value: 32400, growth: 8 },
  { name: 'Books', value: 18900, growth: -3 },
  { name: 'Home & Garden', value: 25600, growth: 15 },
];

const ProductAnalytics: React.FC = () => {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 3 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: { xs: 1.5, sm: 3 } }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Product Performance
          </Typography>
          <Box sx={{ overflowX: 'auto', mx: { xs: -1.5, sm: -3 } }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ 
                      minWidth: { xs: 120, sm: 200 },
                      pl: { xs: 1.5, sm: 3 }
                    }}>Product</TableCell>
                    <TableCell sx={{ minWidth: { xs: 80, sm: 120 } }}>Category</TableCell>
                    <TableCell align="right" sx={{ minWidth: { xs: 70, sm: 100 } }}>Sales</TableCell>
                    <TableCell align="right" sx={{ minWidth: { xs: 70, sm: 100 } }}>Units</TableCell>
                    <TableCell align="right" sx={{ minWidth: { xs: 90, sm: 150 } }}>Conversion</TableCell>
                    <TableCell align="right" sx={{ 
                      minWidth: { xs: 70, sm: 100 },
                      pr: { xs: 1.5, sm: 3 }
                    }}>Trend</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productPerformance.map((product) => (
                    <TableRow key={product.id} hover>
                      <TableCell sx={{ pl: { xs: 1.5, sm: 3 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            src={product.thumbnail} 
                            variant="rounded"
                            sx={{ 
                              width: { xs: 28, sm: 40 }, 
                              height: { xs: 28, sm: 40 },
                              display: { xs: 'none', sm: 'flex' }
                            }}
                          />
                          <Typography 
                            variant="body2"
                            sx={{ 
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                              maxWidth: { xs: 120, sm: 200 },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {product.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={product.category}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            height: { xs: 24, sm: 28 }
                          }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        ${product.sales.toLocaleString()}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        {product.units}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <LinearProgress
                            variant="determinate"
                            value={product.conversion * 10}
                            sx={{ 
                              width: { xs: 50, sm: 100 }, 
                              mr: 1,
                              height: { xs: 4, sm: 6 }
                            }}
                          />
                          <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {product.conversion}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ pr: { xs: 1.5, sm: 3 } }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            color: product.trend > 0 ? 'success.main' : 'error.main',
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        >
                          {product.trend > 0 ? <TrendingUpIcon sx={{ fontSize: { xs: 16, sm: 20 } }} /> : <TrendingDownIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />}
                          {Math.abs(product.trend)}%
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: { xs: 1.5, sm: 3 } }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Category Performance
          </Typography>
          <Box sx={{ 
            height: { xs: 250, sm: 400 },
            mx: { xs: -1.5, sm: -3 },
            px: { xs: 1.5, sm: 3 }
          }}>
            <ResponsiveContainer>
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ 
                    fill: '#64748b', 
                    fontSize: 12
                  }}
                  tickLine={{ stroke: '#e2e8f0' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  tick={{ 
                    fill: '#64748b', 
                    fontSize: 12
                  }}
                  tickLine={{ stroke: '#e2e8f0' }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: 12
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    fontSize: 12,
                    paddingTop: 20
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                  name="Sales Value"
                />
                <Bar
                  dataKey="growth"
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                  name="Growth %"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductAnalytics; 