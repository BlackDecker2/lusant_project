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
import RegisterUserOpticaModal from "../components/modals/opticaluser/RegisterUserOpticaModal";
import EditUserOpticaModal from "../components/modals/opticaluser/EditUserOptica";
import DeleteUserOpticaModal from "../components/modals/opticaluser/DeleteUserOptica";

const OpticalUsers = (props) => {
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
    handleCreateNewUser();
    handleOpenModal();
  };

  const [users, setUsers] = useState([]);
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
      .get("http://127.0.0.1:5000/list-users", {
        params: {
          page: page + 1, // Ajustar el número de página para que comience desde 1
          per_page: rowsPerPage,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setTotalUsers(response.headers["x-total-count"]); // Obtener el total de usuarios del encabezado de la respuesta
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const toggleRow = (userId) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(userId)
        ? prevOpenRows.filter((id) => id !== userId)
        : [...prevOpenRows, userId]
    );
  };

  const handleChangePage = (event, newPage) => {
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
      .get("http://127.0.0.1:5000/search-users", {
        params: {
          query: searchInput,
        },
      })
      .then((response) => {
        setUsers(response.data);
        // Actualizar el total de usuarios si es necesario
        // setTotalUsers(response.headers["x-total-count"]);
      })
      .catch((error) => {
        console.error("Error searching users:", error);
      });
  };

  const handleCreateNewUser = () => {
    // Lógica para crear un nuevo usuario
    // Aquí puedes redirigir al usuario a la página de creación de usuario o mostrar un modal
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
                  label="Buscar Usuario (dni ó email)"
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
                  New User
                </Button>
                {/* Modal para el formulario de registro */}
                <RegisterUserOpticaModal
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
                Rol
              </TableCell>
              <TableCell align="center" className="cellHead">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <React.Fragment key={user[0]}>
                <TableRow className="tableRow">
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleRow(user[0])}
                    >
                      {openRows.includes(user[0]) ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>{user[1]}</TableCell>
                  <TableCell className="d-none d-md-table-cell">
                    {user[9]}
                  </TableCell>
                  <TableCell className="d-none d-md-table-cell">
                    {user[8]}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-controls="actions-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleOpenActionsMenu(event, user[0])}
                    >
                      <MoreVert />
                    </IconButton>
                    <Menu
                      id="actions-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && selectedUserId === user[0]}
                      onClose={handleCloseActionsMenu}
                    >
                      <MenuItem onClick={handleOpenEditModal}>
                        <Edit/>  Editar</MenuItem>
                      {/* Aquí agregamos el modal */}
                      <EditUserOpticaModal
                        open={isModalOpen}
                        handleClose={handleCloseModal}
                        userData={user}
                        fetchUsers={fetchUsers} // Pasa fetchUsers como una prop
                      />

                      <MenuItem onClick={() => handleOpenDeleteModal(user[0])}>
                        <Delete /> Eliminar
                      </MenuItem>

                      <DeleteUserOpticaModal
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
                      in={openRows.includes(user[0])}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Full Details
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          DNI: {user[0]}
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
                          Department: {user[4]}
                        </Typography>
                        <Typography
                          variant="body2"
                          gutterBottom
                          component="div"
                        >
                          About: {user[10]}
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

export default OpticalUsers;
