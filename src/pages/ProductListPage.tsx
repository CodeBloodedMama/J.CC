
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../application/useProducts';
import Toolbar from '../components/Toolbar';
import ProductCard from '../components/ProductCard';
import './ProductListPage.css';

export default function ProductListPage() {
  const nav = useNavigate();
  const { state, products, categories, filters, setFilters, sortKey, setSortKey } = useProducts();

  if (state.type === 'loading') return <p className="status">Indlæser…</p>;
  if (state.type === 'error') return <p className="status status--error">Fejl: {state.message}</p>;
  if (products.length === 0) {
    return (
      <>
        <Toolbar
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          sortKey={sortKey}
          setSortKey={setSortKey}
        />
        <p className="status">Ingen produkter matcher dine filtre.</p>
      </>
    );
  }

  return (
    <>
      <Toolbar
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        sortKey={sortKey}
        setSortKey={setSortKey}
      />
      <div className="grid">
        {products.map(p => (
          <div key={p.id} onClick={() => nav(`/products/${p.id}`)}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  );
}
