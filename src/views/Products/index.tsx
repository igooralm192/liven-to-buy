import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import './styles.css'

import ProductsList from './ProductsList'

import useProducts from '../../hooks/useProducts'
import { addCartProduct } from '../../store/cart/actions'

const Products: React.FC = () => {
  const dispatch = useDispatch()

  const { productsList } = useProducts()

  function handleAddProduct(productId: string) {
    dispatch(addCartProduct(productId))
  }

  return (
    <main id="products-container" className="content">
      <h3 className="products title">Our products</h3>

      <ProductsList products={productsList} onAddProduct={handleAddProduct} />

      <Link to="/cart">
        <button type="button" className="products cart btn">
          <FaShoppingCart />
        </button>
      </Link>
    </main>
  )
}

export default Products
