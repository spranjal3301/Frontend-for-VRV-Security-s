"use client"
import Link from 'next/link'
import { Users, UserCircle, Shield } from 'lucide-react'
import {usePathname} from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const words = pathname.split('/');
  
  
  return (
    <div className="w-64 hidden md:block  shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-6">
        <Link href="/admin/users" className={cn("flex items-center px-6 py-3  hover:bg-muted",
          words.includes("users")
          ? "text-foreground"
          : "text-foreground/60",
        )} >
          <Users className="mr-3" />
          Users
        </Link>
        <Link href="/admin/roles" className={cn("flex items-center px-6 py-3  hover:bg-muted",
          words.includes("roles")
          ? "text-foreground"
          : "text-foreground/60",
        )}>
          <UserCircle className="mr-3" />
          Roles
        </Link>
        <Link href="/admin/permissions" className={cn("flex items-center px-6 py-3  hover:bg-muted",
          words.includes("permissions")
          ? "text-foreground"
          : "text-foreground/60",
        )}>
          <Shield className="mr-3" />
          Permissions
        </Link>
      </nav>
    </div>
  )
}

