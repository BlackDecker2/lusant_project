import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/** */
function Register(props) {
    const [registerForm, setRegisterForm] = useState({
        dni: "",
        name: "",
        lastname: "",
        works: "",
        department: "",
        municipality: "",
        salary: "",
        username: "",
        rol: "",
        email: "",
        pass: "",
        about: ""
    });

    const navigate = useNavigate();

    function btnRegister(event) {
        event.preventDefault();

        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/signup",
            data: registerForm
        })
            .then((response) => {
                console.log(response);
                alert("Successfully Registered");
                navigate('/profile'); // Redirige a la ruta '/profile'
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                }
                alert("Registration Failed");
            });

        setRegisterForm({
            dni: "",
            name: "",
            lastname: "",
            works: "",
            department: "",
            municipality: "",
            salary: "",
            username: "",
            rol: "",
            email: "",
            pass: "",
            about: ""
        });
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setRegisterForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Register</h5>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">DNI</label>
                                    <input type="text" className="form-control" name="dni" value={registerForm.dni} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={registerForm.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Lastname</label>
                                    <input type="text" className="form-control" name="lastname" value={registerForm.lastname} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Works</label>
                                    <input type="text" className="form-control" name="works" value={registerForm.works} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Department</label>
                                    <input type="text" className="form-control" name="department" value={registerForm.department} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Municipality</label>
                                    <input type="text" className="form-control" name="municipality" value={registerForm.municipality} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Salary</label>
                                    <input type="text" className="form-control" name="salary" value={registerForm.salary} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control" name="username" value={registerForm.username} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rol</label>
                                    <select className="form-select" name="rol" value={registerForm.rol} onChange={handleChange}>
                                        <option value="Admin">Admin</option>
                                        <option value="Optómetra">Optómetra</option>
                                        <option value="Recepcionista">Recepcionista</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" value={registerForm.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" name="pass" value={registerForm.pass} onChange={handleChange} />
                                </div>


                                {/* Agrega los campos restantes aquí de manera similar */}
                                <button type="button" className="btn btn-primary" onClick={btnRegister}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
