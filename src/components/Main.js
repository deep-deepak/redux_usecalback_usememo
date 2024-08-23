import React, { useState } from 'react'
import UserForm from './UserFrom';
import UserList from './UserList';

export default function Main() {

    const [userToEdit, setUserToEdit] = useState(null);

    const handleEdit = (user) => {
        setUserToEdit(user);
    };

    return (
        <div>
            <UserForm userToEdit={userToEdit} />
            <UserList onEdit={handleEdit} />
        </div>
    )
}
