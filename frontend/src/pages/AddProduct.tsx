import React, { useState } from 'react';
import { addProduct } from '../api/products';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre_producto: '', // Cambiado de 'name'
    id_producto: 0, // Cambiado de 'id'
    stock: '',
    bodega: '1', // Cambiado de 'warehouse'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addProduct(
        formData.nombre_producto, // Cambiado de 'name'
        formData.id_producto, // Cambiado de 'id'
        parseInt(formData.stock),
        parseInt(formData.bodega) // Cambiado de 'warehouse'
      );
      setMessage('Producto agregado correctamente');
      setFormData({ nombre_producto: '', id_producto: 0, stock: '', bodega: '1' }); // Cambios en nombres
      

    } catch (error) {
      console.error("Error del backend:", error); // Imprimir detalles del error en la consola
      setMessage('Error al agregar el producto. El código podría estar duplicado.');
    
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Agregar Producto</h1>
      {message && (
        <div className={`p-4 rounded-lg mb-4 ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código
            </label>
            <input
              type="text"
              name="id_producto" // Cambiado de 'code'
              value={formData.id_producto} // Cambiado de 'id'
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre_producto" // Cambiado de 'name'
              value={formData.nombre_producto} // Cambiado de 'name'
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bodega
            </label>
            <select
              name="bodega" // Cambiado de 'warehouse'
              value={formData.bodega} // Cambiado de 'warehouse'
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="1">Bodega 1</option>
              <option value="2">Bodega 2</option>
              <option value="3">Bodega 3</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Agregando...' : 'Agregar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;