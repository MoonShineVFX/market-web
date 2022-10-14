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

// Page
import Signin from './pages/Signin';
import Home from './pages/home/Home';
import About from './pages/About';
import Tutorial from './pages/Tutorial';

// Util
import util from './utils/util';

const { loader } = util;

//
const Fallback = () => <p>頁面載入中...</p>;

//
const PageNotFound = () => <p>頁面不存在...</p>;

//
const PageRoute = () => {

    // Router
    let router = createBrowserRouter(
        createRoutesFromElements(
            <Route path=":locale" element={<PublicLayout />}>
                <Route path="*" element={<PageNotFound />} />
                <Route index element={<Home />} />
                <Route path="product/list" element={<>product list</>} />
                <Route
                    path="about"
                    element={<About />}
                    // loader={() => loader()}
                />
                <Route path="tutorial" element={<Tutorial />} />

                <Route element={<GuestLayout />}>
                    <Route path="signin" element={<Signin />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="member" element={<>/member</>}>
                        <Route path="account" element={<>account</>} />
                    </Route>
                </Route>
            </Route>
        )
    );

    return <RouterProvider router={router} fallbackElement={<Fallback />} />;

};

export default PageRoute;

// example
// https://codesandbox.io/s/react-router-v6-auth-demo-4jzltb?file=/src/App.js
