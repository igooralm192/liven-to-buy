import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css'

import { AppState } from '../../store'
import { getProducts } from '../../store/products/thunks'

const Products: React.FC = () => {
  const dispatch = useDispatch()
  const { isFetching, byId } = useSelector((state: AppState) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  console.log(isFetching, byId)

  return (
    <main id="products-container" className="content">
      <h3 className="products title">Our products</h3>

      <ul className="products list">
        <li className="product item">
          <img
            loading="lazy"
            className="product image"
            src="http://lorempixel.com/640/480/transport"
            alt="Product"
          />

          <div className="product detail">
            <h4 className="name">Pratical Fresh Chair</h4>
            <p className="price">R$ 706,00</p>
          </div>

          <button type="button" className="product buy">
            Buy
          </button>
        </li>
        <li className="product item">
          <img
            loading="lazy"
            className="product image"
            src="http://lorempixel.com/640/480/transport"
            alt="Product"
          />

          <div className="product detail">
            <h4 className="name">Pratical Fresh Chair</h4>
            <p className="price">R$ 706,00</p>
          </div>

          <button type="button" className="product buy">
            Buy
          </button>
        </li>
        <li className="product item">
          <img
            loading="lazy"
            className="product image"
            src="http://lorempixel.com/640/480/transport"
            alt="Product"
          />

          <div className="product detail">
            <h4 className="name">Pratical Fresh Chair</h4>
            <p className="price">R$ 706,00</p>
          </div>

          <button type="button" className="product buy">
            Buy
          </button>
        </li>
        <li className="product item">
          <img
            loading="lazy"
            className="product image"
            src="http://lorempixel.com/640/480/transport"
            alt="Product"
          />

          <div className="product detail">
            <h4 className="name">Pratical Fresh Chair</h4>
            <p className="price">R$ 706,00</p>
          </div>

          <button type="button" className="product buy">
            Buy
          </button>
        </li>
        <li className="product item">
          <img
            loading="lazy"
            className="product image"
            src="http://lorempixel.com/640/480/transport"
            alt="Product"
          />

          <div className="product detail">
            <h4 className="name">Pratical Fresh Chair</h4>
            <p className="price">R$ 706,00</p>
          </div>

          <button type="button" className="product buy">
            Buy
          </button>
        </li>
      </ul>
    </main>
  )
}

export default Products
