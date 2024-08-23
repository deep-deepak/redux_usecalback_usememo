import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/actions/userAction';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';

const UserForm = ({ userToEdit, onResetEdit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const dispatch = useDispatch();

    // Update local state when userToEdit changes
    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
            setPhonenumber(userToEdit.phonenumber);
        } else {
            setName('');
            setEmail('');
            setPhonenumber('');
        }
    }, [userToEdit]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const user = { id: userToEdit ? userToEdit.id : Date.now(), name, email, phonenumber };
        if (userToEdit) {
            dispatch(updateUser(user));
            onResetEdit(); // Reset the edit state in the parent component
        } else {
            dispatch(addUser(user));
        }
        // Clear form after submission
        setName('');
        setEmail('');
        setPhonenumber('');
    }, [dispatch, name, email, phonenumber, userToEdit, onResetEdit]);

    return (
        <Container sx={{ padding: "20px" }}>
            <Box mb={2}>
                <Typography variant="h5">{userToEdit ? 'Update User' : 'Add User'}</Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                    <Grid item md={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Phone Number"
                            type="tel"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="success"
                        >
                            {userToEdit ? 'Update' : 'Add'} User
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default UserForm;
