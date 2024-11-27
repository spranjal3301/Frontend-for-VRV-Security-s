'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

type Role = {
  id: number
  name: string
  permissions: string[]
}

// const initialRoles: Role[] = [
//   { id: '1', name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
//   { id: '2', name: 'Editor', permissions: ['Read', 'Write'] },
//   { id: '3', name: 'Viewer', permissions: ['Read'] },
// ]

export function RoleTable({roles,setRoles}:{roles:Role[],setRoles:any}) {
  // const [roles] = useState<Role[]>(initialRoles)

  const removeRole = (rmid:number)=>{
    const updateRoles = roles.filter(({id})=>rmid!=id);
    setRoles(updateRoles);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role Name</TableHead>
          <TableHead>Permissions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell>{role.name}</TableCell>
            <TableCell>
              {role.permissions.map((permission) => (
                <Badge key={permission} variant="secondary" className="mr-1 rounded-xl my-1">
                  {permission}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              <EditRole roles={roles} setRoles={setRoles} Oldid={role.id} name={role.name} Oldpermissions={role.permissions}/>
              <Deletebtn removeRole={()=>removeRole(role.id)}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


function EditRole({roles,setRoles,Oldid,name,Oldpermissions}:any) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false);
  const [permissions] = useState(['create', 'read', 'update', 'delete']);
  const [newRole, setNewRole] = useState<{id:number,name:string,permissions:string[]}>({id:Oldid,name: name, permissions: Oldpermissions });


  const editRole = () => {
    if(newRole.name!='' && newRole.permissions.length!=0){
      const updateRoles = roles.filter(({id}:any)=>Oldid!=id);
      setRoles([...updateRoles, { ...newRole}]);
    
      setOpen(false);
      toast({
        variant: "success",
        title: "Edit Successfully",
      })
      
    }else{
      toast({
        variant: "destructive",
        title: "Invaild Role",
        description: "There was a problem with your request."
      })
    }

  };

  const togglePermission = (permission:string) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter(p => p !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  return (
    <Dialog open={open} onOpenChange={()=>setOpen(true)}>
      <DialogTrigger asChild>
      <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
          </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Role name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
          <div className="space-y-2">
            <h3 className="font-medium">Permissions</h3>
            {permissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  checked={newRole.permissions.includes(permission)}
                  onCheckedChange={() => togglePermission(permission)}
                />
                <label htmlFor={permission} className="capitalize">
                  {permission}
                </label>
              </div>
            ))}
          </div>
          <Button className='rounded-full' onClick={editRole}>Edit Role</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}



export function Deletebtn({removeRole}:any) {
  
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
          <AlertDialogAction onClick={removeRole}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


