import React, { useState } from 'react'
import UserForm from './UserFrom';
import UserList from './UserList';

export default function Main() {

    const [userToEdit, setUserToEdit] = useState(null);

    const handleEdit = (user) => {
        setUserToEdit(user);
    };

    const resetEditState = () => {
        setUserToEdit(null);
    };

    return (
        <div>
            <UserForm userToEdit={userToEdit} onResetEdit={resetEditState}/>
            <UserList onEdit={handleEdit} />
        </div>
    )
}
