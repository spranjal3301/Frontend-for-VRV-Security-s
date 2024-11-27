import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const useUsers = (initialUsers?: User[]) => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ]);

  // Add a new user
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  // Update an existing user
  const updateUser = (id: number, updatedUser: Partial<Omit<User, 'id'>>) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, ...updatedUser } : user
      )
    );
  };

  // Remove a user by ID
  const removeUser = (id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  // Get a user by ID
  const getUserById = (id: number) => {
    return users.find(user => user.id === id);
  };

  // Get users by role
  const getUsersByRole = (role: string) => {
    return users.filter(user => user.role === role);
  };

  // Get active users
  const getActiveUsers = () => {
    return users.filter(user => user.status === 'Active');
  };

  // Get inactive users
  const getInactiveUsers = () => {
    return users.filter(user => user.status === 'Inactive');
  };

  // Check if a user exists by email
  const userExistsByEmail = (email: string) => {
    return users.some(user => user.email === email);
  };

  // Update user status
  const updateUserStatus = (id: number, status: 'Active' | 'Inactive') => {
    updateUser(id, { status });
  };

  // Change user role
  const changeUserRole = (id: number, role: string) => {
    updateUser(id, { role });
  };

  return {
    users,
    setUsers,
    addUser,
    updateUser,
    removeUser,
    getUserById,
    getUsersByRole,
    getActiveUsers,
    getInactiveUsers,
    userExistsByEmail,
    updateUserStatus,
    changeUserRole
  };
};