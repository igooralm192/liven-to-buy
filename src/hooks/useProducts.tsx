import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppState } from '../store'
import { getProducts } from '../store/products/thunks'
import { Product } from '../store/products/types'

const useProducts = (): {
  productsById: { [key: string]: Product }
  productsList: Product[]
} => {
  const dispatch = useDispatch()

  const productsById = useSelector((state: AppState) => state.products.byId)

  const productsList = useMemo(
    () => Object.keys(productsById).map(key => productsById[key]),
    [productsById],
  )

  useEffect(() => {
    if (Object.keys(productsById).length > 0) return

    dispatch(getProducts())
  }, [dispatch, productsById])

  return {
    productsById,
    productsList,
  }
}

export default useProducts
