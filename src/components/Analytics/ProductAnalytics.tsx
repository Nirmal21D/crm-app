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
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Product Performance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Sales</TableCell>
                  <TableCell align="right">Units Sold</TableCell>
                  <TableCell align="right">Conversion Rate</TableCell>
                  <TableCell align="right">Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productPerformance.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={product.thumbnail} variant="rounded" />
                        <Typography variant="body2">{product.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={product.category}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      ${product.sales.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{product.units}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <LinearProgress
                          variant="determinate"
                          value={product.conversion * 10}
                          sx={{ width: 100, mr: 1 }}
                        />
                        {product.conversion}%
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          color: product.trend > 0 ? 'success.main' : 'error.main',
                        }}
                      >
                        {product.trend > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                        {Math.abs(product.trend)}%
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Category Performance
          </Typography>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#64748b' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  tick={{ fill: '#64748b' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
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