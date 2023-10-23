import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import DetailMovie from "./page/DetailMovie/DetailMovie";
import Layout from "./template/Layout";
import Register from "./page/Register/Register";
import Purchase from "./page/Purchase/Purchase";
import Account from "./page/Account/Account";
import Auth from "./page/Admin/Auth";
import PrivateRoute from "./template/PrivateRoute";
import PageNotFound from "./page/PageNotFound/PageNotFound";
import AdminLayout from "./template/AdminLayout";
import UserPage from "./page/UserPage/UserPage";
import MoviePage from "./page/UserPage/MoviePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route
            path='/admin'
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path='/admin' element={<Navigate to='/admin/user' />} />
            <Route path='/admin/user' element={<UserPage />} />
            <Route path='/admin/movie' element={<MoviePage />} />
          </Route>
          <Route path='/admin/auth' element={<Auth />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route
            path='/detail/:id'
            element={
              <Layout>
                <DetailMovie />
              </Layout>
            }
          />
          <Route
            path='/purchase/:id'
            element={
              <Layout>
                <Purchase />
              </Layout>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
