"use client"
import { UserTable } from '@/components/user-table'
import { Button } from '@/components/ui/button'
import { PlusCircle, UserPlus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useRoles } from '@/hooks/use-role'
import { useUsers } from '@/hooks/use-users'
import { useToast } from '@/hooks/use-toast'

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Adduser users={users} setUsers={setUsers}/>
      </div>
      <UserTable users={users} setUsers={setUsers}/>
    </div>
  )
}


function Adduser({
  users, 
  setUsers 
}:any){
  const { toast } = useToast();
  const [open,setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'Active' });
  const {
    roles 
  } = useRoles();

  const addUsers = () => {
    if(newUser.name!='' && newUser.email!='' && newUser.role!=''){
      const updatedUser = [...users, { ...newUser, id: users.length + 1 }];
      console.log(updatedUser);
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', role: '', status: 'Active' });
      
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
      <Button className="flex items-center gap-2">
        <UserPlus className="h-4 w-4" />
        Add User
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New User</DialogTitle>
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
        <Button onClick={addUsers}>Add User</Button>
      </div>
    </DialogContent>
  </Dialog>
  )
}


