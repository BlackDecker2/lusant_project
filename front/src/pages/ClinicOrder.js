import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Cards.css";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Add,
  Edit,
  Delete,
} from "@mui/icons-material";
import RegisterClinicOrder from "../components/modals/clinicorder/RegisterClinicOrder";
import EditClinicOrder from "../components/modals/clinicorder/EditClinicOrder";

const ClinicOrderList = (props) => {
  const [clinicOrders, setClinicOrders] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const ordersPerPage = 9;
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchClinicOrders();
  }, [currentPage]);

  const fetchClinicOrders = () => {
    axios
      .get(
        `http://127.0.0.1:5000/list-clinicorders?page=${currentPage}&per_page=${ordersPerPage}`
      )
      .then((response) => {
        setClinicOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clinic orders:", error);
      });
  };

  const toggleCard = (index) => {
    setOpenCards((prevOpenCards) =>
      prevOpenCards.includes(index)
        ? prevOpenCards.filter((id) => id !== index)
        : [...prevOpenCards, index]
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
  };

  const handleDelete = (orderId) => {
    // Lógica para eliminar la orden
  };

  const filteredClinicOrders = clinicOrders.filter(
    (order) =>
      order.authorization_number.toString().includes(searchInput) ||
      order.id_patient.toString().includes(searchInput)
  );

  const totalPages = Math.ceil(filteredClinicOrders.length / ordersPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = Math.min(
    startIndex + ordersPerPage,
    filteredClinicOrders.length
  );

  return (
    <div>
      <Box className="searchContainer" mb={2}>
        <TextField
          className="searchInput"
          label="Search by Authorization Number or Patient ID"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenModal}
          className="createButton"
        >
          New Clinic Order
        </Button>
      </Box>

      <div className="clinicOrderList">
        {filteredClinicOrders
          .slice(startIndex, endIndex)
          .map((order, index) => (
            <Card key={index} className="clinicOrderCard">
              <CardContent>
                <Typography variant="h6" component="div">
                  Order: {order.authorization_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {order.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reason: {order.reason_visit}
                </Typography>
              </CardContent>
              <Box
                display="flex"
                justifyContent="flex-end"
                className="toggleButton"
              >
                <IconButton
                  aria-label="expand card"
                  onClick={() => toggleCard(index)}
                >
                  {openCards.includes(index) ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )}
                </IconButton>
              </Box>
              <Collapse
                in={openCards.includes(index)}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Patient ID: {order.id_patient}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Optometrist ID: {order.id_optometrist}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receptionist ID: {order.id_recepcionist}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payment: {order.payment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Deliver Date: {order.deliver_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Observation: {order.observation}
                  </Typography>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(order)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          ))}
      </div>
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Previous Page
        </Button>
        <Typography variant="body1" style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next Page
        </Button>
      </Box>

      {/* Modal para el formulario de registro */}
      <RegisterClinicOrder open={openModal} handleClose={handleCloseModal} />

      {/* Modal para editar la orden */}
      {selectedOrder && (
        <EditClinicOrder
          open={true} // Puedes usar un estado para controlar la apertura del modal
          handleClose={() => setSelectedOrder(null)} // Asegúrate de cerrar el modal cuando sea necesario
          order={selectedOrder} // Pasa la orden seleccionada al componente de edición
          fetchClinicOrders={fetchClinicOrders}
        />
      )}
    </div>
  );
};

export default ClinicOrderList;
