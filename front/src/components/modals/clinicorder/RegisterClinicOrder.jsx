import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Box, TextField, Button, Grid, MenuItem, DialogTitle, CircularProgress } from "@mui/material";
import "../../../styles/Modales.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const RegisterClinicOrder = ({ open, handleClose }) => {
    const [registerForm, setRegisterForm] = useState({
        authorization_number: "",
        id_patient: "",
        id_optometrist: "",
        id_recepcionist: "",
        payment: "",
        reason_visit: "",
        date: "",
        deliver_date: "",
        observation: ""
    });

    const [patients, setPatients] = useState([]);
    const [optometrists, setOptometrists] = useState([]);
    const [recepcionists, setRecepcionists] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/list-patients")
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => console.error("Error fetching patients:", error));

        axios.get("http://127.0.0.1:5000/list-optometrists")
            .then(response => {
                setOptometrists(response.data);
            })
            .catch(error => console.error("Error fetching optometrists:", error));

        axios.get("http://127.0.0.1:5000/list-recepcionists")
            .then(response => {
                setRecepcionists(response.data);
            })
            .catch(error => console.error("Error fetching recepcionists:", error));
    }, []);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setRegisterForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); // Activar el indicador de carga
        axios
            .post("http://127.0.0.1:5000/create-clinicorder", registerForm)
            .then((response) => {
                console.log(response);
                alert("Registro exitoso");
                setRegisterForm({  // Limpiar el formulario después de enviar los datos con éxito
                    authorization_number: "",
                    id_patient: "",
                    id_optometrist: "",
                    id_recepcionist: "",
                    payment: "",
                    reason_visit: "",
                    date: "",
                    deliver_date: "",
                    observation: ""
                });
                handleClose();
            })
            .catch((error) => {
                console.error("Error en el registro:", error);
                alert("Error en el registro. Por favor, inténtelo de nuevo.");
            })
            .finally(() => {
                setLoading(false); // Desactivar el indicador de carga, independientemente del resultado de la solicitud
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
                    width: "90%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="register-modal-title">Registro orden clínica</DialogTitle>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <TextField
                                select
                                label="ID del Óptometra"
                                variant="outlined"
                                name="id_optometrist"
                                value={registerForm.id_optometrist}
                                onChange={handleChange}
                                fullWidth
                                required
                            >
                                {optometrists.map(optometrist => (
                                    <MenuItem key={optometrist[0]} value={optometrist[0]}>
                                        {`${optometrist[0]}`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Número de autorización"
                                        variant="outlined"
                                        name="authorization_number"
                                        value={registerForm.authorization_number}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        className="custom-textfield"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        label="ID del Recepcionista"
                                        variant="outlined"
                                        name="id_recepcionist"
                                        value={registerForm.id_recepcionist}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    >
                                        {recepcionists.map(recepcionist => (
                                            <MenuItem key={recepcionist[0]} value={recepcionist[0]}>
                                                {`${recepcionist[0]}`}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <TextField
                                select
                                label="ID del paciente"
                                variant="outlined"
                                name="id_patient"
                                value={registerForm.id_patient}
                                onChange={handleChange}
                                fullWidth
                                required
                            >
                                {patients.map(patient => (
                                    <MenuItem key={patient[7]} value={patient[7]}>
                                        {`${patient[7]}`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Pago"
                                    variant="outlined"
                                    name="payment"
                                    value={registerForm.payment}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Motivo de la visita"
                                    variant="outlined"
                                    name="reason_visit"
                                    value={registerForm.reason_visit}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Fecha"
                                    variant="outlined"
                                    name="date"
                                    type="date"
                                    value={registerForm.date}
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
                                    label="Fecha de entrega"
                                    variant="outlined"
                                    name="deliver_date"
                                    type="date"
                                    value={registerForm.deliver_date}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Grid item xs={12}>
                        <TextField
                            label="Observación"
                            variant="outlined"
                            name="observation"
                            multiline
                            value={registerForm.observation}
                            onChange={handleChange}
                            fullWidth
                            required
                            className="observation-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="buttonmodal"
                            disabled={loading} // Deshabilitar el botón mientras se carga
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar"} {/* Mostrar el indicador de carga mientras se envía la solicitud */}
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default RegisterClinicOrder;
