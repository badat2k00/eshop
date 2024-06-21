import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Payment from "../pages/Payment";
import Statistic from "../pages/Statistic";
import NotFound from "../pages/NotFound";
import PersonalInformation from "../pages/PersonalInformation";
import UserPanel from "../pages/UserPanel";
import ReturnUrlSuccess from "../pages/ReturnUrlSuccess";
import AllOrders from "../pages/AllOrders";
import ResetPassword from "../pages/ResetPassword";
import FavoriteProduct from "../pages/FavoriteProduct";
import Success from "../pages/Success";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path:"reset-password",
        element:<ResetPassword/>
      },
      {
        path:"success",
        element:<Success/>
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "statistic",
            element: <Statistic />,
          },
          {
            path: "personal-information",
            element: <PersonalInformation />,
          },
          {
            path:"all-orders",
            element:<AllOrders/>
          }
        ],
      },
      {
        path: "user",
        element: <UserPanel />,
        children: [
          {
            path: "personal-information",
            element: <PersonalInformation />,
          },
          {
            path:"all-orders",
            element:<AllOrders/>
          }
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
      {
        path:"/return-success-url",
        element:<ReturnUrlSuccess/>
      },
      {
        path:"/favorite-product",
        element:<FavoriteProduct/>
      }
    ],
  },
]);

export default router;
