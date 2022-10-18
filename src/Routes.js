import { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom';

// Layout
import GuestLayout from './containers/GuestLayout';
import PublicLayout from './containers/PublicLayout';
import ProtectedLayout from './containers/ProtectedLayout';

// Pages
import Home from './pages/home/Home';
import About from './pages/About';
import Tutorial from './pages/Tutorial';
import Privacy from './pages/Privacy';

import Signin from './pages/guest/Signin';
import Register from './pages/guest/Register';
import ForgotPassword from './pages/guest/ForgotPassword';
import ResetPassword from './pages/guest/ResetPassword';
import ActiveAccount from './pages/guest/ActiveAccount';

// Component
import Loading from './components/Loading';

// Lazy
const ProductList = lazy(() => import('./pages/product/List'));
const ProductDetail = lazy(() => import('./pages/product/Detail'));

//
const Fallback = () => <Loading />;

//
const PageNotFound = () => <p>頁面不存在...</p>;

//
const PageRoute = () => {

    // Router
    let router = createBrowserRouter(
        createRoutesFromElements(
            <Route path=":locale" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="tutorial" element={<Tutorial />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="product">
                    <Route
                        path="list"
                        element={
                            <Suspense fallback={<Fallback />}>
                                <ProductList />
                            </Suspense>
                        }
                    />
                    <Route
                        path=":id"
                        element={
                            <Suspense fallback={<Fallback />}>
                                <ProductDetail />
                            </Suspense>
                        }
                    />
                </Route>

                <Route element={<GuestLayout />}>
                    <Route path="signin" element={<Signin />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot_password" element={<ForgotPassword />} />
                    <Route path="reset_password" element={<ResetPassword />} />
                    <Route path="active_account" element={<ActiveAccount />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="member" element={<>/member</>}>
                        <Route path="account" element={<>account</>} />
                    </Route>
                </Route>

                <Route path="*" element={<PageNotFound />}></Route>
            </Route>
        )
    );

    return <RouterProvider router={router} fallbackElement={<Fallback />} />;

};

export default PageRoute;
