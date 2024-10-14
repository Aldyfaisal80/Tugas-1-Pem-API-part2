import { NextResponse, NextRequest } from "next/server";
import products from "../../../../public/products/product.json"; // Path ke file produk Anda

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  // TODO 1: Dapatkan semua data
  let filteredProducts = [...products];

  // TODO 2: Dapatkan data dengan nama produk tertentu
  const productName = searchParams.get("product");
  if (productName) {
    filteredProducts = filteredProducts.filter(product =>
      product.product.toLowerCase().includes(productName.toLowerCase())
    );
  }

  // TODO 3: Dapatkan data dengan harga lebih besar dari atau sama dengan nilai tertentu
  const price = searchParams.get("price");
  if (price && Number(price)) {
    filteredProducts = filteredProducts.filter(product => product.price >= Number(price));
  }

  // TODO 4: Dapatkan produk berdasarkan ID
  const id = searchParams.get("id");
  if (id && Number(id)) {
    filteredProducts = filteredProducts.filter(product => product.id === Number(id));
  }

  // Jika tidak ada data yang sesuai, kembalikan pesan 404
  if (filteredProducts.length === 0) {
    return NextResponse.json({
      message: 'No products found with the specified criteria.'
    }, { status: 404 });
  }

  // Return filtered products
  return NextResponse.json({
    products: filteredProducts
  });
};
