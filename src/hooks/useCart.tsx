import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useProducts from './useProducts'

import { AppState } from '../store'
import { Product } from '../store/products/types'

import { CartCoupon, CartPaymentMethod } from '../store/cart/types'
import { loadCartProducts } from '../store/cart/actions'

const useCart = (): {
  products: Product[]
  isEmpty: boolean
  coupon?: CartCoupon
  paymentMethod?: CartPaymentMethod
} => {
  const dispatch = useDispatch()

  const { products: selectedProducts, coupon, paymentMethod } = useSelector(
    (state: AppState) => state.cart,
  )

  const { productsById } = useProducts()

  const cartProducts: Product[] = useMemo(() => {
    return selectedProducts.map(selectedProduct => ({
      ...productsById[selectedProduct.id],
      quantity: selectedProduct.quantity,
    }))
  }, [selectedProducts, productsById])

  const haveCartProducts = useMemo(() => cartProducts.length > 0, [
    cartProducts,
  ])

  useEffect(() => {
    if (Object.keys(productsById).length === 0) return

    if (!haveCartProducts) dispatch(loadCartProducts())
  }, [dispatch, productsById, haveCartProducts])

  return {
    products: cartProducts,
    isEmpty: !haveCartProducts,
    coupon,
    paymentMethod,
  }
}

export default useCart
