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
import store, { persistor } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading";
import { PersistGate } from "redux-persist/integration/react";

const LazyLogin = React.lazy(() => import("./pages/Login"));
const LazyWatchList = React.lazy(() => import("./pages/WatchList"));
const LazyRegister = React.lazy(() => import("./pages/Register"));
const LazySideBar = React.lazy(() => import("./components/SideBar"));
const LazyMovieList = React.lazy(() => import("./pages/MovieList"));

const LoadingWrapper = () => {
    return (
        <div className="flex justify-center items-start h-screen">
            <Loading />
        </div>
    );
};
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AuthProvider>
                    <Router basename="/Movie-Watchlist">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Suspense fallback={<LoadingWrapper />}>
                                        <LazySideBar />
                                    </Suspense>
                                }
                            >
                                <Route
                                    index
                                    path="/"
                                    element={
                                        <Suspense fallback={<LoadingWrapper />}>
                                            <LazyMovieList />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/watchlist/:watchlist"
                                    element={
                                        <Suspense fallback={<LoadingWrapper />}>
                                            <LazyWatchList />
                                        </Suspense>
                                    }
                                />
                            </Route>
                            <Route
                                path="/login"
                                element={
                                    <Suspense fallback={<LoadingWrapper />}>
                                        <LazyLogin />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <Suspense fallback={<LoadingWrapper />}>
                                        <LazyRegister />
                                    </Suspense>
                                }
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Router>
                    <ToastContainer />
                </AuthProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
