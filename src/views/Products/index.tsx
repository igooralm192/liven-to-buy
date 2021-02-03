import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css'

import ProductsList from './ProductsList'

import { AppState } from '../../store'
import { getProducts } from '../../store/products/thunks'
import { Product } from '../../store/products/types'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { isFetching, byId } = useSelector((state: AppState) => state.products)

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  useEffect(() => {
    const keys = Object.keys(byId)

    setProducts(keys.map(key => byId[key]))
  }, [byId])

  return (
    <main id="products-container" className="content">
      <h3 className="products title">Our products</h3>

      <ProductsList products={products} />
    </main>
  )
}

export default Products
