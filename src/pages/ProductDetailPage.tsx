
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { JsonProductRepository } from '../services/JsonProductRepository';
import { Product } from '../domain/types';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [p, setP] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = id ? await JsonProductRepository.get(id) : undefined;
        if (!res) setError('Produkt ikke fundet');
        else setP(res);
      } catch (e: any) {
        setError(e?.message ?? 'Ukendt fejl');
      }
    })();
  }, [id]);

  if (error) return <p className="status status--error">{error}</p>;
  if (!p) return <p className="status">Indlæser…</p>;

  return (
    <article className="detail">
      <Link className="back" to="/">← Tilbage</Link>
      <div className="detail__grid">
        <div className="detail__media">
          <div className="detail__img-placeholder">{p.category}</div>
        </div>
        <div className="detail__info">
          <h1 className="detail__title">{p.name}</h1>
          <p className="detail__price">{p.price.toLocaleString('da-DK')} {p.currency}</p>
          <dl className="detail__meta">
            <dt>SKU</dt><dd>{p.sku}</dd>
            <dt>Kategori</dt><dd>{p.category}</dd>
            <dt>Lager</dt><dd>{p.stock > 0 ? `${p.stock} stk` : 'Udsolgt'}</dd>
            <dt>Dato</dt><dd>{new Date(p.createdAt).toLocaleDateString('da-DK')}</dd>
            {p.rating != null && (<><dt>Rating</dt><dd>{p.rating.toFixed(1)}/5</dd></>)}
            {p.dimensions && (<><dt>Mål</dt><dd>{p.dimensions}</dd></>)}
            {p.material && p.material.length > 0 && (<><dt>Materiale</dt><dd>{p.material.join(', ')}</dd></>)}
            {p.color && p.color.length > 0 && (<><dt>Farve</dt><dd>{p.color.join(', ')}</dd></>)}
            {p.certifications && p.certifications.length > 0 && (<><dt>Certificering</dt><dd>{p.certifications.join(', ')}</dd></>)}
          </dl>
          {p.description && <p className="detail__desc">{p.description}</p>}
        </div>
      </div>
    </article>
  );
}
