import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Chip,
  Fade,
  CircularProgress,
  InputAdornment,
  Stack,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../store/slices/productsSlice';
import { RootState, AppDispatch } from '../store';
import { Product } from '../types';

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, loading } = useSelector((state: RootState) => state.products);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
    status: 'active' as 'active' | 'inactive',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
    setEditProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
      status: 'active' as 'active' | 'inactive',
    });
  };

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
      status: product.status as 'active' | 'inactive',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: '',
      status: 'active' as 'active' | 'inactive',
    });
  };

  const handleSubmit = async () => {
    // Create product data with our app's field names
    const productData = {
      name: formData.name?.trim() || '',
      description: formData.description?.trim() || '',
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0,
      category: formData.category?.trim() || '',
      image: formData.image?.trim() || '',
      status: formData.status as 'active' | 'inactive'
    };

    if (editProduct?.id) {
      await dispatch(updateProduct({ 
        id: editProduct.id, 
        product: { ...productData, id: editProduct.id }
      }));
    } else {
      await dispatch(addProduct(productData));
    }

    handleClose();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter((product: Product) => {
    const searchTermLower = searchTerm?.toLowerCase() || '';
    const productName = product?.name?.toLowerCase() || '';
    const productCategory = product?.category?.toLowerCase() || '';
    
    return productName.includes(searchTermLower) ||
           productCategory.includes(searchTermLower);
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, width: { xs: '100%', sm: 'auto' } }}
        >
          Add New Product
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              height: { xs: 48, sm: 56 }
            }
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {filteredProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Fade in={true}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '60%', // 3:5 aspect ratio
                      width: '100%',
                      bgcolor: 'grey.100',
                    }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, pt: 2, px: { xs: 2, sm: 3 } }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom 
                      noWrap
                      sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '4.5em',
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }}
                    >
                      {product.description}
                    </Typography>
                    <Stack spacing={2}>
                      <Typography 
                        variant="h6" 
                        color="primary"
                        sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
                      >
                        ${product.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          icon={<InventoryIcon />}
                          label={`Stock: ${product.stock}`}
                          size="small"
                          color={product.stock > 0 ? "success" : "error"}
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        />
                        <Chip
                          icon={<CategoryIcon />}
                          label={product.category}
                          size="small"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                  <CardActions sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditClick(product)}
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        minWidth: { xs: 'auto', sm: 100 }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(product.id)}
                      sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        minWidth: { xs: 'auto', sm: 100 }
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 2, sm: 3 }
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          px: { xs: 2, sm: 3 }
        }}>
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              fullWidth
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <TextField
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 2, sm: 3 } }}>
          <Button onClick={handleClose} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              minWidth: { xs: 80, sm: 100 }
            }}
          >
            {editProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products; 