import { useState } from 'react';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export const useRoles = (initialRoles?: Role[]) => {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['create', 'read', 'update'] },
    { id: 3, name: 'Viewer', permissions: ['read'] },
  ]);

  // Add a new role
  const addRole = (role: Omit<Role, 'id'>) => {
    const newRole = {
      ...role,
      id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1
    };
    setRoles(prevRoles => [...prevRoles, newRole]);
    return newRole;
  };

  // Update an existing role
  const updateRole = (id: number, updatedRole: Partial<Omit<Role, 'id'>>) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === id ? { ...role, ...updatedRole } : role
      )
    );
  };

  // Remove a role by ID
  const removeRole = (id: number) => {
    setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
  };

  // Get a role by ID
  const getRoleById = (id: number) => {
    return roles.find(role => role.id === id);
  };

  // Check if a role has a specific permission
  const hasPermission = (roleName: string, permission: string) => {
    const role = roles.find(r => r.name === roleName);
    return role ? role.permissions.includes(permission) : false;
  };

  // Get all permissions for a specific role
  const getRolePermissions = (roleName: string) => {
    const role = roles.find(r => r.name === roleName);
    return role ? role.permissions : [];
  };

  return {
    roles,
    setRoles,
    addRole,
    updateRole,
    removeRole,
    getRoleById,
    hasPermission,
    getRolePermissions
  };
};