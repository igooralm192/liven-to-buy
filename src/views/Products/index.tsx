import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'

import './styles.css'

import ProductsList from './ProductsList'

import { AppState } from '../../store'
import { getProducts } from '../../store/products/thunks'
import { Product } from '../../store/products/types'
import { addProduct } from '../../store/cart/actions'

const Products: React.FC = () => {
  const dispatch = useDispatch()

  const { byId: productsById } = useSelector(
    (state: AppState) => state.products,
  )
  const { products: selectedProducts } = useSelector(
    (state: AppState) => state.cart,
  )

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

  console.log(selectedProducts)

  return (
    <main id="products-container" className="content">
      <h3 className="products title">Our products</h3>

      <ProductsList products={products} onAddProduct={handleAddProduct} />

      <button type="button" className="products cart btn">
        <FaShoppingCart />
      </button>
    </main>
  )
}

export default Products
