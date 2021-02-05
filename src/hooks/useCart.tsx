import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useProducts from './useProducts'

import { AppState } from '../store'
import { Product } from '../store/products/types'

import { CartCoupon, CartPaymentMethod } from '../store/cart/types'
import {
  loadCartProducts,
  incrementCartProductQuantity,
  decrementCartProductQuantity,
} from '../store/cart/actions'

const useCart = (): {
  products: Product[]
  isEmpty: boolean
  isFetching: boolean
  checkout: boolean
  coupon?: CartCoupon
  paymentMethod?: CartPaymentMethod
  error?: string
  incrementQuantity: (product: Product) => void
  decrementQuantity: (product: Product) => void
} => {
  const dispatch = useDispatch()

  const {
    products: selectedProducts,
    coupon,
    paymentMethod,
    isFetching,
    error,
    checkout,
  } = useSelector((state: AppState) => state.cart)

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

  const incrementQuantity = useCallback(
    (cartProduct: Product) => {
      const product = productsById[cartProduct.id]

      if (cartProduct.quantity === product.quantity) return

      dispatch(incrementCartProductQuantity(cartProduct))
    },
    [dispatch, productsById],
  )

  const decrementQuantity = useCallback(
    (cartProduct: Product) => {
      if (cartProduct.quantity === 1) return

      dispatch(decrementCartProductQuantity(cartProduct))
    },
    [dispatch],
  )

  useEffect(() => {
    if (Object.keys(productsById).length === 0) return

    if (!haveCartProducts) dispatch(loadCartProducts())
  }, [dispatch, productsById, haveCartProducts])

  return {
    products: cartProducts,
    isEmpty: !haveCartProducts,
    isFetching,
    checkout,
    coupon,
    paymentMethod,
    error,
    incrementQuantity,
    decrementQuantity,
  }
}

export default useCart
