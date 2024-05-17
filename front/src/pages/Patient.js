import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
  Edit,
  Add,
  MoreVert,
} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import "../styles/pagesUsers.css"; // Importa el archivo CSS donde se definen los estilos
import RegisterPatient from "../components/modals/patient/RegisterPatient";
import EditPatient from "../components/modals/patient/EditPatient";
import DeletePatientModal from "../components/modals/patient/DeletePatient";

const PatientUsers = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserDni, setSelectedUserDni] = useState(null); // Estado para almacenar el DNI del usuario seleccionado

  const handleOpenEditModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (dni) => {
    // Recibe el DNI del usuario seleccionado como argumento
    setSelectedUserDni(dni); // Almacena el DNI del usuario seleccionado en el estado
    setIsDeleteModalOpen(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUserDni(null); // Restablece el DNI del usuario seleccionado cuando se cierra el modal
  };

  const handleCreateUserAndOpenModal = () => {
    handleOpenModal();
  };

  const [patients, setPatients] = useState([]);
  const [openRows, setOpenRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const fetchUsers = () => {
    axios
      .get("http://127.0.0.1:5000/list-patients", {
        params: {
          page: page + 1, // Ajustar el número de página para que comience desde 1
          per_page: rowsPerPage,
        },
      })
      .then((response) => {
        setPatients(response.data);
        setTotalUsers(response.headers["x-total-count"]); // Obtener el total de usuarios del encabezado de la respuesta
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const toggleRow = (patientId) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(patientId)
        ? prevOpenRows.filter((id) => id !== patientId)
        : [...prevOpenRows, patientId]
    );
  };
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    // Realizar la solicitud al endpoint '/search-users' con el parámetro de búsqueda
    axios
      .get("http://127.0.0.1:5000/search-patients", {
        params: {
          query: searchInput,
        },
      })
      .then((response) => {
        setPatients(response.data);
        // Actualizar el total de usuarios si es necesario
        // setTotalUsers(response.headers["x-total-count"]);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
      });
  };

  const handleOpenActionsMenu = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleCloseActionsMenu = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "92%", overflowX: "auto" }}
        className="tableContainer"
        id="table-users"
      >
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow className="tableRowHead">
              <TableCell />
              <TableCell className="cellSearch">
                <TextField
                  label="Buscar Paciente (dni ó email)"
                  variant="outlined"
                  size="small"
                  className="searchField"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FaSearch
                          onClick={handleSearch}
                          style={{ cursor: "pointer", color: "#fff" }} // Cambia el cursor a pointer
                        />
                      </InputAdornment>
                    ),
                  }}
                  value={searchInput} // Bind del valor del input al estado searchInput
                  onChange={handleSearchInputChange} // Bind del evento onChange al manejador handleSearchInputChange
                />
              </TableCell>
              <TableCell className="responsive-hidden" />{" "}
              {/* Ocultar en dispositivos pequeños */}
              <TableCell className="responsive-hidden" />{" "}
              {/* Ocultar en dispositivos pequeños */}
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleCreateUserAndOpenModal}
                  className="createButton"
                >
                  New Patient
                </Button>
                {/* Modal para el formulario de registro */}
                <RegisterPatient
                  open={openModal}
                  handleClose={handleCloseModal}
                />
              </TableCell>
            </TableRow>
            <TableRow className="tableRowHead">
              <TableCell />
              <TableCell className="cellHead">Nombre</TableCell>
              <TableCell className="cellHead d-none d-md-table-cell">
                Email
              </TableCell>
              <TableCell className="cellHead d-none d-md-table-cell">
                EPS
              </TableCell>
              <TableCell align="center" className="cellHead">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {patients.map((user) => (
              <React.Fragment key={user[7]}>
                <TableRow className="tableRow">
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleRow(user[7])}
                    >
                      {openRows.includes(user[7]) ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{user[1]}</TableCell>
                  <TableCell className="d-none d-md-table-cell">
                    {user[21]}
                  </TableCell>
                  <TableCell className="d-none d-md-table-cell">
                    {user[13]}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-controls="actions-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleOpenActionsMenu(event, user[7])}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      id="actions-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedUserId === user[7]}
                      onClose={handleCloseActionsMenu}
                    >
                      <MenuItem onClick={handleOpenEditModal}>
                        <Edit /> Editar
                      </MenuItem>
                      {/* Aquí agregamos el modal */}
                      <EditPatient
                        open={isModalOpen}
                        handleClose={handleCloseModal}
                        userData={user}
                        fetchUsers={fetchUsers} // Pasa fetchUsers como una prop
                      />

                      <MenuItem onClick={() => handleOpenDeleteModal(user[7])}>
                        <Delete /> Eliminar
                      </MenuItem>

                      <DeletePatientModal
                        open={isDeleteModalOpen}
                        handleClose={handleCloseModal}
                        dni={selectedUserDni}
                        fetchUsers={fetchUsers} // Pasa la función fetchUsers como prop
                      />

                      {/* Agrega más opciones de acciones según tus necesidades */}
                    </Menu>
                  </TableCell>
                </TableRow>
                <TableRow className="tableRow">
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse
                      in={openRows.includes(user[7])}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          DNI: {user[7]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Last Name: {user[2]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Hobbies: {user[3]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Marital State: {user[4]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Gender: {user[5]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Disability Condition: {user[6]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Phone: {user[8]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Ethnic Communities: {user[9]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Occupation: {user[10]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Date of Birth: {user[11]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Social Condition: {user[12]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          EPS: {user[13]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Address: {user[14]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Observation: {user[15]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Department: {user[16]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Type of Person: {user[17]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Zone: {user[18]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Municipality: {user[19]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Type of Regimen: {user[20]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          Email: {user[21]}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="paginationContainer"
        />
      </TableContainer>
    </div>
  );
};

export default PatientUsers;
