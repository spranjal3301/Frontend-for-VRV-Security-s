'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

type User = {
  id: string
  name: string
  role: string
}

type Permission = {
  id: string
  name: string
}

const users: User[] = [
  { id: '1', name: 'John Doe', role: 'Admin' },
  { id: '2', name: 'Jane Smith', role: 'Editor' },
  { id: '3', name: 'Bob Johnson', role: 'Viewer' },
]

const permissions: Permission[] = [
  { id: '1', name: 'Read' },
  { id: '2', name: 'Write' },
  { id: '3', name: 'Delete' },
  { id: '4', name: 'Publish' },
]

export function RoleAssignment() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    )
  }

  const handleAssignRole = () => {
    if (selectedUser) {
      console.log(`Assigning permissions ${selectedPermissions.join(', ')} to user ${selectedUser}`)
      // Here you would typically make an API call to update the user's permissions
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Assignment</CardTitle>
        <CardDescription>Assign permissions to users quickly and easily</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedUser || undefined} onValueChange={setSelectedUser}>
          <SelectTrigger>
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>{user.name} ({user.role})</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="space-y-2">
          {permissions.map(permission => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={permission.id}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={() => handlePermissionToggle(permission.id)}
              />
              <label htmlFor={permission.id}>{permission.name}</label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAssignRole} disabled={!selectedUser || selectedPermissions.length === 0}>
          Assign Permissions
        </Button>
      </CardFooter>
    </Card>
  )
}

