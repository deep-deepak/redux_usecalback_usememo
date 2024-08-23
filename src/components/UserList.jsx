// src/components/UserList.js
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../redux/actions/userAction';

const UserList = ({ onEdit }) => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const memoizedUsers = useMemo(() => users, [users]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <ul>
      {memoizedUsers.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email} - {user.phonenumber}
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
