import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage.tsx'
import SignupPage from './Pages/SIgnupPage/SignupPage.tsx'
import Homepage from './Pages/HomePage/Homepage.tsx'
import AdminLayout from './myComponent/Admin/AdminLayout/AdminLayout.tsx'
import BikeManagementPage from './Pages/Adminpages/BikeManagementPage/BikeManagement.tsx'
import UserManagementPage from './Pages/Adminpages/UserManagement/UserManagementPage.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import PrivateRoute from './myComponent/PrivateRoute/PrivateRoute.tsx'
import ProfilePage from './Pages/Adminpages/UserProfile/UserProfile.tsx'
import NormalProfilePage from './Pages/NormalUser/Profile/Profile.tsx'
import BikeListingPage from './Pages/BikeList/BikeList.tsx'
import SingleBikePage from './Pages/SinglePage/SinglePage.tsx'
import ReturnBike from './Pages/Adminpages/ReturnBike/ReturnBike.tsx'
import RentalsPage from './Pages/NormalUser/RentalPage/RentalPage.tsx'
import AboutUsPage from './Pages/About/About.tsx'
import CouponManagement from './Pages/Adminpages/CouponPage/CouponPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />
      },
      {
        path: '/about',
        element: <AboutUsPage />
      },
      {
        path: '/userProfile',
        element:
          <PrivateRoute requiredRole="user">
            <NormalProfilePage />
          </PrivateRoute>
      },
      {
        path: '/rental-page',
        element:
          <PrivateRoute requiredRole="user">
            <RentalsPage />
          </PrivateRoute>
      },
      {
        path: '/bikeList',
        element: <BikeListingPage />
      },
      {
        path: 'bike/:bikeId',
        element: <SingleBikePage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute requiredRole="admin">
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'bike-management',
        element: <BikeManagementPage />
      },
      {
        path: 'user-management',
        element: <UserManagementPage />
      },
      {
        path: 'return-bike',
        element: <ReturnBike />
      },
      {
        path: 'coupon-management',
        element: <CouponManagement />
      }

    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
