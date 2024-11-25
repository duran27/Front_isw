import { API_BASE_URL, APIError } from './config';
import type { Product } from '../types/Product';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new APIError(response.status, error.message);
  }
  return response.json();
}

// Obtener productos con un límite opcional
export const getProducts = async (limit = 10): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
  return handleResponse(response);
};

// Buscar productos por nombre
export const searchProducts = async (search: string): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}`);
  return handleResponse(response);
};

// Actualizar stock por nombre del producto
export const updateStock = async (
  nombre_producto: string,
  stock: number,
  bodega: number
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(nombre_producto)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stock, bodega }),
  });
  return handleResponse(response);
};

// Agregar un nuevo producto
export const addProduct = async (
  nombre_producto: string,
  id_producto: number,
  stock: number,
  bodega: number
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_producto, // Cambiado de code
      nombre_producto, // Cambiado de name
      stock,
      bodega, // Cambiado de warehouse
    }),
  });
  return handleResponse(response);
};

// Obtener un producto por nombre
export const getProductByName = async (nombre_producto: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(nombre_producto)}`);
  return handleResponse(response);
};