"use client";
import { NextPage } from 'next'
import { usePathname } from "next/navigation";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import Link from 'next/link';

interface Props {}

const MainNav: NextPage<Props> = ({}) => {
  const pathname = usePathname();
  
  
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="relative mr-6 flex items-center space-x-2">
        <span className="hidden font-bold md:inline-block">
         VRV Security’s
        </span>
 
      </Link>
      <nav className="hidden items-center space-x-6 text-sm font-medium xl:flex">
        {/* some nav items */}
      </nav>
    </div>
  );
}

export default MainNav