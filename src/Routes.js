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
import Signin from './pages/Signin';
import Home from './pages/home/Home';
import About from './pages/About';
import Tutorial from './pages/Tutorial';
import Loading from './components/Loading';

// Util
import util from './utils/util';

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
