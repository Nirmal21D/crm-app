import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  ButtonGroup,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Tab,
  Tabs,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';

import ProductAnalytics from './Analytics/ProductAnalytics';

// Mock data for demonstration
const mockData = {
  salesTrend: [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 198 },
    { month: 'Mar', sales: 5000, orders: 280 },
    { month: 'Apr', sales: 2780, orders: 190 },
    { month: 'May', sales: 1890, orders: 150 },
    { month: 'Jun', sales: 2390, orders: 175 },
    { month: 'Jul', sales: 3490, orders: 220 },
  ],
  topProducts: [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 300 },
    { name: 'Product D', value: 200 },
  ],
};

const COLORS = ['#2563eb', '#7c3aed', '#16a34a', '#dc2626', '#f59e0b', '#64748b'];

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 2 }}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend > 0 ? (
              <TrendingUpIcon sx={{ color: 'success.main' }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main' }} />
            )}
            <Typography
              variant="body2"
              sx={{ color: trend > 0 ? 'success.main' : 'error.main' }}
            >
              {Math.abs(trend)}% vs last month
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: `${color}15`,
            color: color,
            p: 1,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `analytics-tab-${index}`,
    'aria-controls': `analytics-tabpanel-${index}`,
  };
}

const Analytics: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleFilterChange = (filters: any) => {
    // Handle filter changes
    console.log('Filters changed:', filters);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="analytics tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Product Analytics" {...a11yProps(0)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ProductAnalytics />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Analytics;