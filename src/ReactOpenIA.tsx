import { RouterProvider } from "react-router-dom"
import { router } from "./presentation/router/router"

export const ReactOpenIA = () => {
  return (
    <RouterProvider router={ router }/>
  )
}
