import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, Typography, TextField, Button, Grid, MenuItem, useMediaQuery, useTheme, DialogTitle } from "@mui/material";
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition
import "../../styles/Modales.css";

const RegisterUserOpticaModal = ({ open, handleClose, userToEdit }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        about: "",
    });

    

    const handleChange = (event) => {
        const { value, name } = event.target;
        setRegisterForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Envía los datos del formulario al servidor
        axios
            .post("http://127.0.0.1:5000/signup", registerForm)
            .then((response) => {
                console.log(response);
                alert("Successfully Registered");
                handleClose(); // Cierra el modal después de registrar
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                alert("Registration Failed");
            });
    };

    return (
        <CSSTransition
            in={open}
            timeout={300} // Duración de la animación en milisegundos
            classNames="modal"
            unmountOnExit
        >
            <Modal
                id="modal-container"
                open={open}
                onClose={handleClose}
                aria-labelledby="register-modal-title"
                aria-describedby="register-modal-description"
            >
                <Box
                    className="register-modal-container" // Agrega esta clase al contenedor del modal
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <DialogTitle id="register-modal-title">Registro Usuario Óptica</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="DNI"
                                    variant="outlined"
                                    name="dni"
                                    value={registerForm.dni}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Nombre"
                                    variant="outlined"
                                    name="name"
                                    value={registerForm.name}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Apellido"
                                    variant="outlined"
                                    name="lastname"
                                    value={registerForm.lastname}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Trabajo"
                                    variant="outlined"
                                    name="works"
                                    value={registerForm.works}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Departamento"
                                    variant="outlined"
                                    name="department"
                                    value={registerForm.department}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Municipio"
                                    variant="outlined"
                                    name="municipality"
                                    value={registerForm.municipality}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Salario"
                                    variant="outlined"
                                    name="salary"
                                    value={registerForm.salary}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Nombre Usuario"
                                    variant="outlined"
                                    name="username"
                                    value={registerForm.username}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    value={registerForm.email}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    name="pass"
                                    value={registerForm.pass}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-textfield"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    label="Rol"
                                    variant="outlined"
                                    name="rol"
                                    value={registerForm.rol}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    className="custom-list"
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Optómetra">Optómetra</MenuItem>
                                    <MenuItem value="Recepcionista">Recepcionista</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Otros campos de texto... */}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="buttonmodal"
                            >
                                Registrar
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </CSSTransition>
    );
};

export default RegisterUserOpticaModal;
