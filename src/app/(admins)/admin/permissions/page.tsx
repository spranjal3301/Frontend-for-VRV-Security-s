import { PermissionTable } from '@/components/permission-table'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function PermissionsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Permissions Management</h1>
        <Button className='rounded-full'>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Permission
        </Button>
      </div>
      <PermissionTable />
    </div>
  )
}

