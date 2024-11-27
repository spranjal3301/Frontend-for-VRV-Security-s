'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Edit, Trash2 } from 'lucide-react'

type Permission = {
  id: string
  name: string
  description: string
  roles: string[]
}

const initialPermissions: Permission[] = [
  { id: '1', name: 'Read', description: 'Can view content', roles: ['Admin', 'Editor', 'Viewer'] },
  { id: '2', name: 'Write', description: 'Can create and edit content', roles: ['Admin', 'Editor'] },
  { id: '3', name: 'Delete', description: 'Can delete content', roles: ['Admin'] },
]

export function PermissionTable() {
  const [permissions] = useState<Permission[]>(initialPermissions)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Permission Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Roles</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map((permission) => (
          <TableRow key={permission.id}>
            <TableCell>{permission.name}</TableCell>
            <TableCell>{permission.description}</TableCell>
            <TableCell>{permission.roles.join(', ')}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

