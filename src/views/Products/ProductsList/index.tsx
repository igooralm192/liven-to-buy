import React from 'react'

import { Product } from '../../../store/products/types'

import './styles.css'

interface Props {
  products: Product[]
  onAddProduct: (productId: string) => void
}

const ProductsList: React.FC<Props> = ({ products, onAddProduct }) => {
  return (
    <ul className="products list">
      {products.map(product => (
        <li key={product.id} className="product item">
          <img
            loading="lazy"
            className="product image"
            src={product.imageUrl}
            alt="Product"
          />

          <div className="product detail">
            <h4 className="name">{product.name}</h4>
            <p className="price">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </p>
          </div>

          <button
            type="button"
            className="product buy"
            onClick={() => onAddProduct(product.id)}
          >
            Buy
          </button>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(ProductsList)
