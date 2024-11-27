"use client"
import { RoleTable } from "@/components/role-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRoles } from "@/hooks/use-role";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

export default function RolesPage() {

  const {
    roles, 
    setRoles,
    addRole, 
    updateRole, 
    removeRole,  
  } = useRoles();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-left mb-6">
        <h1 className="text-3xl font-bold">Roles Management</h1>
         <AddRole roles={roles} setRoles={setRoles}/>
      </div>
      <RoleTable roles={roles} setRoles={setRoles}/>
    </div>
  );
}

function AddRole({roles,setRoles}:any) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [permissions] = useState(['create', 'read', 'update', 'delete']);
  const [newRole, setNewRole] = useState<{name:string,permissions:string[]}>({ name: '', permissions: [] });

  const addRole = () => {
    if(newRole.name!='' && newRole.permissions.length!=0){
      setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
      setNewRole({ name: '', permissions: [] });
      
      setOpen(false);
      toast({
        variant: "success",
        title: "Add Successfully",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className='rounded-lg'>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
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
          <Button className='rounded-full' onClick={addRole}>Add Role</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
