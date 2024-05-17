import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import axios from "axios";

const DeleteUserOpticaModal = ({ open, handleClose, dni, fetchUsers }) => {
    const handleDelete = () => {
        axios
            .delete(`http://127.0.0.1:5000/delete-user/${dni}`)
            .then((response) => {
                alert("Usuario eliminado exitosamente");
                handleClose();
                fetchUsers(); // Llama a fetchUsers para volver a cargar la lista de usuarios
            })
            .catch((error) => {
                console.error("Error al eliminar usuario:", error);
                alert("Error al eliminar usuario");
            });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-user-modal-title"
            aria-describedby="delete-user-modal-description"
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
                <Typography variant="h5" id="delete-user-modal-title" gutterBottom>
                    Confirmar eliminación
                </Typography>
                <Typography id="delete-user-modal-description" gutterBottom>
                    ¿Estás seguro de que deseas eliminar este usuario?
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

export default DeleteUserOpticaModal;
