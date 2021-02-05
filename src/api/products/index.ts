import AppError from '../../errors/AppError'

import { productsApi } from '../../services/api'
import { Product } from '../../store/products/types'

interface ApiProduct {
  id: string
  name: string
  price: string
  image: string
  createdAt: string
  stock: number
}

export const getProducts = (): Promise<Product[]> => {
  return productsApi
    .get<void, ApiProduct[]>('product')
    .then<Product[]>(data =>
      data.map(productApi => ({
        id: productApi.id,
        name: productApi.name,
        price: +productApi.price,
        imageUrl: `https://picsum.photos/640/480?random=${productApi.id}`,
        quantity: productApi.stock,
        createdAt: new Date(productApi.createdAt),
      })),
    )
    .catch((err: AppError) => {
      throw new Error(err.errorCode)
    })
}
