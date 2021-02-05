<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap" rel="stylesheet">

<!-- Logo -->

<p align="center">
  <img alt="Project Logo" width="350px" src="./.github/logo.svg" />
<p>

<!-- Badges -->

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react"/>
  <img alt="JavaScript" src="https://img.shields.io/badge/typescript%20-%23323330.svg?style=for-the-badge&logo=typescript"/>
  <img alt="Redux" src="https://img.shields.io/badge/redux%20-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/>

  <img alt="Figma" src="https://img.shields.io/badge/figma%20-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white"/>
</p>

<!-- Description -->

<h3 align="center" style="font-family: Nunito; font-weight: bold">
	🚀 Liven's online store 💥
</h3>

<!-- Project Design -->

<p align="center">
  <img alt="Project Design 1" width="500px" src="./.github/design-1.jpg" />
  <img alt="Project Design 2" width="500px" src="./.github/design-2.jpg" />
<p>

<p align="center">
  <img alt="Project Design 3" width="500px" src="./.github/design-3.jpg" />
</p>

<!-- Summary -->

<h2>Summary</h2>

- [:bookmark: About](#bookmark-about)
- [:framed_picture: Layout](#framed_picture-layout)
- [:computer: Demo](#computer-demo)
- [:rocket: Technologies](#rocket-technologies)
- [:book: Learnings](#book-learnings)
- [:anger: Difficulties](#anger-difficulties)

<a id="about"></a>

## :bookmark: About

**Liven to buy** is an application that simulates a virtual store, where it is possible to add fake products to a cart and make a fake purchase.

This application was developed during [@liven](https://liven.tech) training week.

<a id="layout"></a>

## :framed_picture: Layout

The layout of this application is available on [Figma](https://www.figma.com/file/nSrN4Ip6rh4h2Fhaan2Zsq/Liven-to-Buy?node-id=10%3A109).

<a id="demo"></a>

## :computer: Demo

This application was hosted by [Netlify](https://www.netlify.com/) and can be found here: [Liven to Buy](https://liventobuy.netlify.app/).

<a id="technologies"></a>

## :rocket: Technologies

This application uses the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/web/guides/quick-start) (Routing)
- [Redux](https://redux.js.org/) (Global state management)
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) (Thunk middleware)
- [Formik](https://formik.org/docs/overview) (Form management)
- [Yup](https://github.com/jquense/yup) (Schema builder)
- [Date FNS](https://date-fns.org/) (Date formatting)
- [React Icons](https://react-icons.github.io/react-icons/) (Popular icons)
- [React Text Mask](https://github.com/text-mask/text-mask/tree/master/react#readme) (Input masking)

<a id="learnings"></a>

## :book: Learnings

- ### Handling forms

Thanks to Formik and Yup, the management and validation of forms became easy to carry out the manipulation of the input data.

```tsx
const { values, errors, handleChange, submitForm } = useFormik({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: Yup.object({
    email: Yup.string().email('Invalid email.').required('Required field.'),
    password: Yup.string().required('Required field.'),
  }),
  onSubmit: ({ email, password }) => handleSubmitForm(email, password),
  validateOnChange: false,
})
```

- ### Sharing logics

With the hook **useProducts** it was possible to reuse the logic of ordering the products at the beginning of the application.

```tsx
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
```

- ### Sharing simple states

With the contexts, it was possible to use a simpler way of sharing states between the components.

```tsx
export const NotificationContext = React.createContext<NotificationData>(
  {} as NotificationData,
)

export const NotificationProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<Notification>({
    open: false,
    title: '',
    description: '',
  })

  const showNotification = useCallback((title: string, description: string) => {
    setNotification({
      open: true,
      title,
      description,
    })
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(oldNotification => ({
      ...oldNotification,
      open: false,
    }))
  }, [])

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
      <Notification />
    </NotificationContext.Provider>
  )
}

const useNotification = (): NotificationData => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    )
  }

  return context
}
```

- ### Memorized values

With the hook **useMemo**, it was possible to create a memorized value for a variable and this value will only change if one of its dependencies changes.

```tsx
const useCart = (): {
  // ...
} => {
  // ...

  const {
    products: selectedProducts,
    // ...
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

  // ...
}
```

<a id="difficulties"></a>

## :anger: Difficulties

- Name HTML tags and CSS classes
- Understand the flow of Redux Thunk
- Handling input date
- Handle cart loading on session
- View purchase summary page

---

<p align="center">
  Made with 💚 by <a href="https://github.com/igooralm192" target="_blank">Igor Almeida</a>
</p>
