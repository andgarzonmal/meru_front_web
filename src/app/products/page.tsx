"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://meru-back-api.fly.dev/products', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSaveProduct = async () => {
    // Validar que todos los campos estén llenos
    if (!newProduct.name || !newProduct.description || newProduct.price <= 0) {
      alert('Please fill out all fields correctly.');
      return;
    }

    try {
      if (editingProduct) {
        // Si hay un producto en edición, realizar una solicitud PUT para actualizarlo
        const response = await axios.put(`https://meru-back-api.fly.dev/products/${editingProduct.id}`, 
          { product: newProduct },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
            },
          }
        );
        setProducts(products.map(product => product.id === editingProduct.id ? response.data : product));
        setEditingProduct(null);
      } else {
        // Si no hay producto en edición, realizar una solicitud POST para crear un nuevo producto
        const response = await axios.post('https://meru-back-api.fly.dev/products', 
          { product: newProduct },
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
            },
          }
        );
        setProducts([...products, response.data]);
      }
      setNewProduct({ name: '', description: '', price: 0 });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, description: product.description, price: product.price });
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`https://meru-back-api.fly.dev/products/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-8">Products</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className={`border p-2 rounded-lg mr-2 ${!newProduct.name ? 'border-red-500' : ''}`}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className={`border p-2 rounded-lg mr-2 ${!newProduct.description ? 'border-red-500' : ''}`}
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            className={`border p-2 rounded-lg mr-2 ${newProduct.price <= 0 ? 'border-red-500' : ''}`}
          />
          <button
            onClick={handleSaveProduct}
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            {editingProduct ? 'Save Changes' : 'Add Product'}
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Existing Products</h2>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id} className="mb-4 p-4 border rounded-lg">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-500 text-white p-2 rounded-lg mt-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white p-2 rounded-lg mt-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductsPage;
