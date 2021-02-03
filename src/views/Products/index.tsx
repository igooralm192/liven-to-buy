import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../../store'
import { getProducts } from '../../store/products/thunks'

import './styles.css'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { isFetching, byId } = useSelector((state: AppState) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  console.log(isFetching, byId)

  return (
    <main id="products-container" className="content">
      <span>Products</span>
    </main>
  )
}

export default Products
