import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import News from './components/News';
import Sports from './components/Sports';
import Weather from './components/Weather';
import Login from './components/Login';
import Register from './components/Register';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';
import { Context } from '.';

function App() {

  const { isAuthenticated } = useContext(Context)

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
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Home />} />
        <Route path='/news' element={!isAuthenticated ? <Navigate to="/login" /> : <News />} />
        <Route path='/sports' element={!isAuthenticated ? <Navigate to="/login" /> : <Sports />} />
        <Route path='/weather' element={!isAuthenticated ? <Navigate to="/login" /> : <Weather />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
