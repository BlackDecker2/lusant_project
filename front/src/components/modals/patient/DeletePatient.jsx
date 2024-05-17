import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import axios from "axios";

const DeletePatientModal = ({ open, handleClose, dni, fetchUsers }) => {
    const handleDelete = () => {
        axios
            .delete(`http://127.0.0.1:5000/delete-patient/${dni}`)
            .then((response) => {
                alert("Paciente eliminado exitosamente");
                handleClose();
                fetchUsers(); // Llama a fetchPatients para volver a cargar la lista de pacientes
            })
            .catch((error) => {
                console.error("Error al eliminar paciente:", error);
                alert("Error al eliminar paciente");
            });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-patient-modal-title"
            aria-describedby="delete-patient-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Typography variant="h5" id="delete-patient-modal-title" gutterBottom>
                    Confirmar eliminación
                </Typography>
                <Typography id="delete-patient-modal-description" gutterBottom>
                    ¿Estás seguro de que deseas eliminar este paciente?
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                    style={{ marginRight: "10px" }}
                >
                    Confirmar Eliminación
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
            </Box>
        </Modal>
    );
};

export default DeletePatientModal;
