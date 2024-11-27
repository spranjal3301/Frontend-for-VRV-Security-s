'use client'

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Edit, Trash2, ArrowUpDown, Search } from 'lucide-react'
import { useUsers } from '@/hooks/use-users'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRoles } from '@/hooks/use-role'

type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}



export function UserTable({
  users, 
  setUsers 
}:{users:any,setUsers:any}) {
 
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null)
  const [filterRole, setFilterRole] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map((user:any) => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ))
  }

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users]
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableUsers
  }, [users, sortConfig])

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user => 
      (filterRole === 'all' || user.role === filterRole) &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [sortedUsers, filterRole, searchTerm,users,setUsers])
  // console.log(users);

  const requestSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  function removeUser(rmid:number){
    const updateRoles = users.filter(({id}:any)=>rmid!=id);
    setUsers(updateRoles);
  }

  return (
    <div>
      <div className="flex justify-start gap-4 mb-4">
      <div className="relative w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm pl-8"
        />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='pl-0'>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('name')}>
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('email')}>
                Email <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => requestSort('role')}>
                Role <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className='text-center'>
              <Button variant="ghost" onClick={() => requestSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {filteredUsers.map((user:any) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className='text-center'>
                <Switch
                  checked={user.status === 'active'}
                  onCheckedChange={() => toggleUserStatus(user.id)}
                />
              </TableCell>
              <TableCell>
                <Edituser users={users} setUsers={setUsers} id={user.id} name={user.name} 
                email={user.email} role={user.role} status={user.status}/>
                <Deletebtn removeUser={()=>removeUser(user.id)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


function Edituser({
  users, 
  setUsers,
  id,
  name,
  email,
  role,
  status
}:any){
  const { toast } = useToast();
  const [open,setOpen] = useState(false);
  const [newUser, setNewUser] = useState({id,name,email,role,status });
  const {
    roles 
  } = useRoles();

  const editUsers = () => {
    if(newUser.name!='' && newUser.email!='' && newUser.role!=''){  
      console.log(newUser) 
      console.log(users);
      setUsers((prevUsers:any) => 
        prevUsers.map((user:any)=>
          user.id==id ? newUser : user
      ));
      console.log(users);
      // setNewUser({ id,name: '', email: '', role: '', status: 'Active' });
      
      setOpen(false);
      toast({
        variant: "success",
        title: "Added Successfully",
      })
      
    }else{
      toast({
        variant: "destructive",
        title: "Invaild User",
        description: "There was a problem with your request."
      })
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
        </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <Input
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Select
          value={newUser.role}
          onValueChange={(value) => setNewUser({ ...newUser, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map(role => (
              <SelectItem key={role.id} value={role.name}>
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={editUsers}>Edit User</Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}

export function Deletebtn({removeUser}:any) {
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeUser}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

