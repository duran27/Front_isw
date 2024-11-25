import React, { useState } from 'react';
import { getProductByName, updateStock } from '../api/products';
import SearchBar from '../components/SearchBar';
import type { Product } from '../types/Product';

const EditProduct: React.FC = () => {
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState('');
  const [newBodega, setNewBodega] = useState('1');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (search.trim()) {
      try {
        setLoading(true);
        const result = await getProductByName(search);
        if (result) {
          setProduct(result);
          setNewStock(result.stock.toString());
          setNewBodega(result.bodega.toString());
          setMessage('');
        } else {
          setProduct(null);
          setMessage('Producto no encontrado');
        }
      } catch (err) {
        setMessage('Error al buscar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (product && newStock) {
      try {
        setLoading(true);
        await updateStock(product.nombre_producto, parseInt(newStock), parseInt(newBodega));
        setMessage('Stock actualizado correctamente');
        handleSearch(); // Refrescar datos del producto
      } catch (err) {
        setMessage('Error al actualizar el stock');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          placeholder="Ingrese nombre del producto..."
        />
      </div>
      {message && (
        <div className={`p-4 rounded-lg mb-4 ${message.includes('no') || message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      {loading && (
        <div className="text-center py-4">Cargando...</div>
      )}
      {product && !loading && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Producto</label>
              <p className="mt-1 text-lg">{product.id_producto}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <p className="mt-1 text-lg">{product.nombre_producto}</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Stock Actual</label>
            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bodega</label>
            <select
              value={newBodega}
              onChange={(e) => setNewBodega(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">Bodega 1</option>
              <option value="2">Bodega 2</option>
              <option value="3">Bodega 3</option>
            </select>
          </div>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            Actualizar Stock
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
