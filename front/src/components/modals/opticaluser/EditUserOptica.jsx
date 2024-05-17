import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, TextField, Button, Grid, MenuItem, DialogTitle } from "@mui/material";
import { CSSTransition } from 'react-transition-group'; // Importa CSSTransition
import "../../../styles/Modales.css";

const EditUserOpticaModal = ({ open, handleClose, userData, fetchUsers }) => {
    const [registerForm, setRegisterForm] = useState({
        dni: '',
        name: '',
        lastname: '',
        works: '',
        department: '',
        municipality: '',
        salary: '',
        username: '',
        rol: '',
        email: '',
        pass: '',
    });

    useEffect(() => {
        if (userData) {
            const [dni, name, lastname, works, department, municipality, salary, username, rol, email, pass] = userData;
            setRegisterForm({
                dni,
                name,
                lastname,
                works,
                department,
                municipality,
                salary,
                username,
                rol,
                email,
                pass,
            });
        }
    }, [userData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRegisterForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://127.0.0.1:5000/edit-user/${registerForm.dni}`, registerForm)
            .then((response) => {
                alert("Usuario editado exitosamente");
                handleClose();
                fetchUsers(); // Llama a fetchUsers para volver a cargar la lista de usuarios
            })
            .catch((error) => {
                console.error('Error al editar usuario:', error);
                alert("Error al editar usuario");
            });
    };
    
    
    

    return (
        
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
                    <DialogTitle id="register-modal-title">Editar Usuario Óptica</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
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
                                Editar
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        
    );
};

export default EditUserOpticaModal;
