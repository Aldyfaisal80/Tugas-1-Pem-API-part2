'use client';

import { useEffect, useState } from 'react';

// Definisikan tipe Product
type Product = {
  id: number;
  product: string;
  price: number;
  category: string;
  material: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  stock: number;
}

export default function FurniturePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><span className="text-lg font-semibold">Loading...</span></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-5">{error}</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold text-center mb-10">List of Products</h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-500">No products found</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.products.map((product: Product) => (
            <li key={product.id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{product.product}</h2>
              <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
              <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
              <p className="text-gray-700 mb-2"><strong>Material:</strong> {product.material}</p>
              <p className="text-gray-700 mb-2"><strong>Dimensions:</strong> {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height}</p>
              <p className="text-gray-700"><strong>Stock:</strong> {product.stock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
