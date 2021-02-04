import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'

import './styles.css'

import { Link } from 'react-router-dom'
import ProductsList from './ProductsList'

import { AppState } from '../../store'
import { Product } from '../../store/products/types'
import { getProducts } from '../../store/products/thunks'
import { addProduct } from '../../store/cart/actions'

const Products: React.FC = () => {
  const dispatch = useDispatch()

  const productsById = useSelector((state: AppState) => state.products.byId)
  // const selectedProducts = useSelector((state: AppState) => state.cart.products)

  const [products, setProducts] = useState<Product[]>([])

  function handleAddProduct(productId: string) {
    dispatch(addProduct(productId))
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    const keys = Object.keys(productsById)

    setProducts(keys.map(key => productsById[key]))
  }, [productsById])

  // console.log(selectedProducts)

  return (
    <main id="products-container" className="content">
      <h3 className="products title">Our products</h3>

      <ProductsList products={products} onAddProduct={handleAddProduct} />

      <Link to="/cart">
        <button type="button" className="products cart btn">
          <FaShoppingCart />
        </button>
      </Link>
    </main>
  )
}

export default Products
