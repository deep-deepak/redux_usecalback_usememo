// src/redux/actions.js
import { ADD_USER,UPDATE_USER, DELETE_USER  } from '../../utils/type';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id
});
