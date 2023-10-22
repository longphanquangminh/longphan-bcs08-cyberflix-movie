import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import DetailMovie from "./page/DetailMovie/DetailMovie";
import Layout from "./template/Layout";
import Register from "./page/Register/Register";
import Purchase from "./page/Purchase/Purchase";

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
          <Route path='/register' element={<Register />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
