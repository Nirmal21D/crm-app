export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  type: 'follow-up' | 'meeting' | 'call' | 'email' | 'other';
  assignedTo: string;
  relatedTo?: {
    type: 'deal' | 'product';
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  status: 'active' | 'inactive';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Order {
  id: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  tasks: TasksState;
  products: ProductsState;
  auth: AuthState;
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export interface FilterState {
  search: string;
  status: string;
  sortBy: string;
}

export const priorityColors = {
  high: '#dc2626',
  medium: '#f59e0b',
  low: '#16a34a',
};

export const statusColors = {
  'pending': '#f59e0b',
  'in-progress': '#2563eb',
  'completed': '#16a34a',
}; 