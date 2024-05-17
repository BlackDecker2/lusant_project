import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Slidebar'; // Renombrado desde 'Header'
import Profile from './components/Profile';
import useToken from './components/useToken';
import Register from './components/Register';
import OpticalUsers from './pages/OpticalUser';
import PatientUsers from './pages/Patient';
import ClinicOrder from './pages/ClinicOrder';

function App() {
    const { token, removeToken, setToken } = useToken();

    return (
        <div className="app-container">
            <BrowserRouter>
                {/* Mostrar el sidebar solo si el token es válido */}
                {token && token !== "" && token !== undefined && <Header token={token} removeToken={removeToken} />}
                
                <div className="content-container">
                    {!token && token !== "" && token !== undefined ? (
                        <Login setToken={setToken} />
                    ) : (
                        <Routes>
                            <Route exact path="/profile" element={<Profile token={token} setToken={setToken} />} />
                            <Route exact path="/register" element={<Register token={token} setToken={setToken} />} />
                            <Route exact path="/opticalusers" element={<OpticalUsers token={token} setToken={setToken} />} />
                            <Route exact path="/patients" element={<PatientUsers token={token} setToken={setToken} />} />
                            <Route exact path="/clinicorder" element={<ClinicOrder token={token} setToken={setToken} />} />

                        </Routes>
                    )}
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
