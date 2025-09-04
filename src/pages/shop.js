import ProductList from "../components/ProductList";

export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return { props: { products } };
  } catch (error) {
    return { props: { products: [] } };
  }
}

export default function ShopPage({ products }) {
  return <ProductList serverProducts={products} />;
}
