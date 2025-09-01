import React from "react";
import { Product } from "../domain/types";
import "./ProductCard.css";

type Props = { product: Product; onClick?: () => void };

export default function ProductCard({ product, onClick }: Props) {
  return (
    <article
      className="card"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={product.name}
    >
      <div className="card__img" aria-hidden="true">
        <div className="card__img-placeholder">{product.category}</div>
      </div>
      <div className="card__body">
        <h3 className="card__title">{product.name}</h3>
        <div className="card__meta">
          <span className="price">
            {product.price.toLocaleString("da-DK")} {product.currency}
          </span>
          {product.stock > 0 ? (
            <span className="badge badge--ok">På lager</span>
          ) : (
            <span className="badge badge--warn">Udsolgt</span>
          )}
          {product.rating != null && (
            <span className="badge">⭐ {product.rating.toFixed(1)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
