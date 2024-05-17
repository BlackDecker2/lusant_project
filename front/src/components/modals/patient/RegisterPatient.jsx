import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, TextField, Button, Grid, MenuItem, DialogTitle } from "@mui/material";
import { CSSTransition } from 'react-transition-group';
import "../../../styles/Modales.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BorderClear } from "@mui/icons-material";

const RegisterPatient = ({ open, handleClose, fetchUsers  }) => {

    const [registerForm, setRegisterForm] = useState({
        typedocument: "",
        dni: "",
        name: "",
        lastname: "",
        hobbies: "",
        maritalstate: "",
        gender: "",
        disabilitycondition: "",
        phone: "",
        ethniccommunities: "",
        occupation: "",
        dateofbirth: "",
        socialcondition: "",
        eps: "",
        address: "",
        observation: "",
        department: "",
        typeperson: "",
        zone: "",
        municipality: "",
        typeofregimen: "",
        email: "",
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
        axios
            .post("http://127.0.0.1:5000/signup-patient", registerForm)
            .then((response) => {
                console.log(response);
                alert("Successfully Registered");
                handleClose();
                //fetchUsers();
            })
            .catch((error) => {
                console.error("Registration failed:", error);
                alert("Registration Failed");
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
                    className="register-modal-container"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%", // Redimensiona el ancho del modal
                        maxWidth: 600, // Establece un ancho máximo
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        maxHeight: "80vh", // Establece una altura máxima con desplazamiento vertical
                        overflowY: "auto", // Habilita el desplazamiento vertical si el contenido supera la altura máxima
                    }}
                >
                    <form onSubmit={handleSubmit}>
                    <DialogTitle id="register-modal-title">Registro Paciente</DialogTitle>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <TextField
                                    select
                                    label="Tipo de Documento"
                                    variant="outlined"
                                    name="typedocument"
                                    value={registerForm.typedocument}
                                    onChange={handleChange}
                                    fullWidth
                                    required

                                >
                                    <MenuItem value="CC">Cédula de Ciudadanía (CC)</MenuItem>
                                    <MenuItem value="TI">Tarjeta de Identidad (TI)</MenuItem>
                                    <MenuItem value="CE">Cédula de Extranjería (CE)</MenuItem>
                                    <MenuItem value="RC">Registro Civil (RC)</MenuItem>
                                    <MenuItem value="NIT">Número de Identificación Tributaria (NIT)</MenuItem>
                                    <MenuItem value="Documento de identificación extranjero">Documento de identificación extranjero</MenuItem>
                                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                                </TextField>
                            </AccordionSummary>
                            <AccordionDetails>
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            label="Género"
                                            variant="outlined"
                                            name="gender"
                                            value={registerForm.gender}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="custom-list"
                                        >
                                            <MenuItem value="Masculino">Masculino (ME)</MenuItem>
                                            <MenuItem value="Femenino">Femenino (FE)</MenuItem>
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        {/* Agrega más acordeones para otros grupos de campos */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <TextField
                                    select
                                    label="Condición Social"
                                    variant="outlined"
                                    name="socialcondition"
                                    value={registerForm.socialcondition}
                                    onChange={handleChange}
                                    fullWidth
                                    required

                                >
                                    <MenuItem value="Desplazamiento o migración">Desplazamiento o migración</MenuItem>
                                    <MenuItem value="Pobreza extrema">Pobreza extrema</MenuItem>
                                    <MenuItem value="Reinsertado">Reinsertado</MenuItem>
                                    <MenuItem value="Madre cabeza de hogar">Madre cabeza de hogar</MenuItem>
                                    <MenuItem value="Otra">Otra</MenuItem>
                                </TextField>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="EPS"
                                            variant="outlined"
                                            name="eps"
                                            value={registerForm.eps}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Ocupación"
                                            variant="outlined"
                                            name="occupation"
                                            value={registerForm.occupation}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Dirección"
                                            variant="outlined"
                                            name="address"
                                            value={registerForm.address}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Teléfono"
                                            variant="outlined"
                                            name="phone"
                                            value={registerForm.phone}
                                            onChange={handleChange}
                                            fullWidth
                                            required
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
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Estado Civil"
                                            variant="outlined"
                                            name="maritalstate"
                                            value={registerForm.maritalstate}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            label="Zona"
                                            variant="outlined"
                                            name="zone"
                                            value={registerForm.zone}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="custom-list"
                                        >
                                            <MenuItem value="Urbana">Urbana</MenuItem>
                                            <MenuItem value="Rural">Rural</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            label="Comunidades Étnicas"
                                            variant="outlined"
                                            name="ethniccommunities"
                                            value={registerForm.ethniccommunities}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="custom-list"
                                        >
                                            <MenuItem value="Afro">Afro</MenuItem>
                                            <MenuItem value="Indigena">Indígena</MenuItem>
                                            <MenuItem value="Room">Room</MenuItem>
                                            <MenuItem value="Campesino">Campesino</MenuItem>
                                            <MenuItem value="LGBTI">LGBTI</MenuItem>
                                            <MenuItem value="Otro">Otro</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            label="Tipo de Régimen"
                                            variant="outlined"
                                            name="typeofregimen"
                                            value={registerForm.typeofregimen}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="custom-list"
                                        >
                                            <MenuItem value="Responsable de IVA">Responsable de IVA</MenuItem>
                                            <MenuItem value="Pauperrimos">Paupérrimos</MenuItem>
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <TextField
                                    select
                                    label="Condición de Discapacidad"
                                    variant="outlined"
                                    name="disabilitycondition"
                                    value={registerForm.disabilitycondition}
                                    onChange={handleChange}
                                    fullWidth
                                    required

                                >
                                    <MenuItem value="Fisica">Física</MenuItem>
                                    <MenuItem value="Cognitiva">Cognitiva</MenuItem>
                                    <MenuItem value="Sensorial">Sensorial</MenuItem>
                                    <MenuItem value="Multiple">Múltiple</MenuItem>
                                    <MenuItem value="No aplica">No aplica</MenuItem>
                                </TextField>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Hobbies"
                                            variant="outlined"
                                            name="hobbies"
                                            value={registerForm.hobbies}
                                            onChange={handleChange}
                                            fullWidth
                                            required
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Fecha de Nacimiento"
                                            variant="outlined"
                                            name="dateofbirth"
                                            type="date"
                                            className="custom-date"
                                            sx={{ 
                                                bgcolor: "background.paper"
                                            }}
                                            value={registerForm.dateofbirth}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            select
                                            label="Tipo de Persona"
                                            variant="outlined"
                                            name="typeperson"
                                            value={registerForm.typeperson}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                            className="custom-list"
                                        >
                                            <MenuItem value="Natural">Natural</MenuItem>
                                            <MenuItem value="Juridica">Juridica</MenuItem>
                                        </TextField>
                                    </Grid>

                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <AccordionSummary>
                            <TextField
                                label="Observación"
                                variant="outlined"
                                name="observation"
                                multiline
                                type="text" // Establece el tipo de entrada como "date" para mostrar un selector de fecha
                                value={registerForm.observation}
                                onChange={handleChange}
                                fullWidth
                                className="observation-text"
                                required
                            />
                        </AccordionSummary>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="buttonmodal"
                        >
                            Registrar
                        </Button>
                    </form>
                </Box>
            </Modal>
      
    );
};

export default RegisterPatient;
