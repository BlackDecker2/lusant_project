import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Modal,
    Box,
    TextField,
    Button,
    Grid,
    MenuItem,
    DialogTitle,
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../styles/Modales.css";

const EditClinicOrder = ({ open, handleClose, order, fetchClinicOrders }) => {
    const [editForm, setEditForm] = useState({
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

    useEffect(() => {
        if (order) {
            setEditForm({
                authorization_number: order.authorization_number,
                id_patient: order.id_patient,
                id_optometrist: order.id_optometrist,
                id_recepcionist: order.id_recepcionist,
                payment: order.payment,
                reason_visit: order.reason_visit,
                date: order.date,
                deliver_date: order.deliver_date,
                observation: order.observation
            });
        }
    }, [order]);

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
        setEditForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://127.0.0.1:5000/edit-clinicorder/${order.authorization_number}`, editForm)
            .then((response) => {
                console.log(response);
                alert("Successfully Updated");
                handleClose();
                fetchClinicOrders(); // Aquí se vuelve a llamar a la función para actualizar la lista de órdenes clínicas después de la edición
            })
            .catch((error) => {
                console.error("Update failed:", error);
                alert("Update Failed");
            });
    };


    return (
        <Modal
            id="modal-container"
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-modal-title"
            aria-describedby="edit-modal-description"
        >
            <Box
                className="edit-modal-container"
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
                    <DialogTitle id="register-modal-title">Editar orden clínica</DialogTitle>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <TextField
                                select
                                label="ID del Óptometra"
                                variant="outlined"
                                name="id_optometrist"
                                value={editForm.id_optometrist}
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
                                        value={editForm.authorization_number}
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
                                        value={editForm.id_recepcionist}
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
                                value={editForm.id_patient}
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
                                    value={editForm.payment}
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
                                    value={editForm.reason_visit}
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
                                    value={editForm.date}
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
                                    value={editForm.deliver_date}
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
                            value={editForm.observation}
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
                        >
                            Actualizar
                        </Button>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default EditClinicOrder;
