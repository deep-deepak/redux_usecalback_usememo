import React, { useCallback, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, TextField, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../redux/actions/userAction';

const UserList = ({ onEdit }) => {
  const users = useSelector((state) => state.users);
  const sortUser = users.sort((a, b) => b.id - a.id)
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleDelete = useCallback((id) => {
    dispatch(deleteUser(id));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredUsers = sortUser.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.phonenumber.includes(searchQuery)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Box mb={2}>
        <Typography variant="h5">User List</Typography>
        <TextField
          variant="outlined"
          placeholder="Search by name, email or phone"
          value={searchQuery}
          onChange={handleSearch}
          size="small"
        />
      </Box>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              filteredUsers.length ? (
                <>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Paginate the users
                    .map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phonenumber}</TableCell>
                        <TableCell>
                          <Button variant="outlined" color="success" onClick={() => onEdit(user)} sx={{ mr: 1 }}>
                            Edit
                          </Button>
                          <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              ) : (
                <p>No user found.</p>
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredUsers.length} // Total count of users after filtering
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[3, 5, 10]} // Options for rows per page
      />
    </Container>
  );
};

export default UserList;