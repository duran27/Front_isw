import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ViewProducts from './pages/ViewProducts';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<ViewProducts />} />
            <Route path="/edit" element={<EditProduct />} />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;