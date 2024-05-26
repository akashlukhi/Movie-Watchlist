import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";

const LazyLogin = React.lazy(() => import("./pages/Login"));
const LazyWatchList = React.lazy(() => import("./pages/WatchList"));
const LazyRegister = React.lazy(() => import("./pages/Register"));
const LazySideBar = React.lazy(() => import("./components/SideBar"));
const LazyMovieList = React.lazy(() => import("./pages/MovieList"));

function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <LazySideBar />
                                </Suspense>
                            }
                        >
                            <Route
                                index
                                path="/"
                                element={
                                    <Suspense fallback={<Loading />}>
                                        <LazyMovieList />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/watchlist/:watchlist"
                                element={
                                    <Suspense fallback={<Loading />}>
                                        <LazyWatchList />
                                    </Suspense>
                                }
                            />
                        </Route>
                        <Route
                            path="/login"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <LazyLogin />
                                </Suspense>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <Suspense fallback={<Loading />}>
                                    <LazyRegister />
                                </Suspense>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
                <ToastContainer />
            </AuthProvider>
        </Provider>
    );
}

export default App;
