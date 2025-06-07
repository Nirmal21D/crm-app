import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductsState } from '../../types';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products.map((product: any) => ({
    id: String(product.id),
    name: product.title || '',  // DummyJSON uses 'title' instead of 'name'
    description: product.description || '',
    price: product.price || 0,
    category: product.category || '',
    stock: product.stock || 0,
    image: product.thumbnail || '',  // DummyJSON uses 'thumbnail' for images
    status: 'active' as const  // Default status since DummyJSON doesn't provide this
  })) as Product[];
});

export const addProduct = createAsyncThunk('products/add', async (product: Omit<Product, 'id'>) => {
  // Transform our app's format to DummyJSON's format
  const apiProduct = {
    title: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    thumbnail: product.image,
    status: product.status
  };

  const response = await axios.post('https://dummyjson.com/products/add', apiProduct);
  const data = response.data;
  
  // Transform the API response back to our app's format
  return {
    id: String(data.id),
    name: data.title || product.name || '',
    description: data.description || product.description || '',
    price: data.price || product.price || 0,
    stock: data.stock || product.stock || 0,
    category: data.category || product.category || '',
    image: data.thumbnail || product.image || '',
    status: product.status || 'active'
  } as Product;
});

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, product }: { id: string; product: Partial<Product> }) => {
    // Transform our app's format to DummyJSON's format
    const apiProduct = {
      title: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      thumbnail: product.image,
      status: product.status
    };

    const response = await axios.put(`https://dummyjson.com/products/${id}`, apiProduct);
    const data = response.data;
    
    // Transform the API response back to our app's format
    return {
      id: String(data.id),
      name: data.title || product.name || '', // Fallback to our data if API doesn't return it
      description: data.description || product.description || '',
      price: data.price || product.price || 0,
      stock: data.stock || product.stock || 0,
      category: data.category || product.category || '',
      image: data.thumbnail || product.image || '',
      status: product.status || 'active'
    } as Product;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (id: string) => {
  await axios.delete(`https://dummyjson.com/products/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Add Product
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          // Replace the entire product with the updated version
          state.items[index] = action.payload;
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer; 