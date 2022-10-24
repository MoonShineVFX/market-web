import { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Navigate,
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

import AccountBase from './pages/member/AccountBase';
import AccountCenter from './pages/member/AccountCenter';

import Cart from './pages/cart/Cart';
import CartBox from './pages/cart/CartBox';

// Component
import Loading from './components/Loading';

// Hook
import useAuth from './hooks/useAuth';

// Util
import utilConst from './utils/util.const';

// Lazy
const ProductList = lazy(() => import('./pages/product/List'));
const ProductDetail = lazy(() => import('./pages/product/Detail'));

const { locales } = utilConst;
const [defLocale] = locales;

//
const Fallback = () => <Loading />;

//
const PageNotFound = () => <p>頁面不存在...</p>;

//
const PageRoute = () => {

    // Hook
    const logged = useAuth();

    // Router
    let router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Navigate to={`/${defLocale}`} replace />} />
                <Route path=":locale">
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

                    <Route element={<GuestLayout logged={logged} />}>
                        <Route path="signin" element={<Signin />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot_password" element={<ForgotPassword />} />
                        <Route path="reset_password" element={<ResetPassword />} />
                        <Route path="active_account" element={<ActiveAccount />} />
                    </Route>

                    <Route element={<ProtectedLayout logged={logged} />}>
                        <Route path="cart" element={<Cart />} />
                        <Route path="member" element={<AccountBase />}>
                            <Route path="account" element={<>account</>} />
                        </Route>
                    </Route>

                    <Route path="*" element={<PageNotFound />}></Route>
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} fallbackElement={<Fallback />} />;

};

export default PageRoute;
