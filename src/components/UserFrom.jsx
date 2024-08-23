// src/components/UserForm.js
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../redux/actions/userAction';

const UserForm = ({ userToEdit }) => {
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
        } else {
            dispatch(addUser(user));
        }
        // Clear form after submission
        setName('');
        setEmail('');
        setPhonenumber('');
    }, [dispatch, name, email, phonenumber, userToEdit]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                placeholder="Phone Number"
                required
            />
            <button type="submit">{userToEdit ? 'Update' : 'Add'} User</button>
        </form>
    );
};

export default UserForm;
