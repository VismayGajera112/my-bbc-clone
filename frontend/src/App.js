import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import News from './components/News';
import Weather from './components/Weather';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from 'react';
import { Context } from '.';
import getCookie from './utils/GetCookie'

function App() {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context)

  useEffect(() => {
    const cookie = getCookie('authToken');
    console.log("Cookie: ", cookie)
    if (cookie.length > 0) {
      console.log("Inside if", cookie.length > 0)
      setIsAuthenticated(true);
    }
    console.log("Auth: ", isAuthenticated)
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
            <Route path='/news' element={<News />} />
            <Route path='/weather' element={<Weather />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
