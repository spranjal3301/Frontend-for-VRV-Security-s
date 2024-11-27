import { NextPage } from 'next'
import Link from "next/link";         
import  MainNav  from "@/components/main-nav";
import { MobileNav } from "@/components/MobileNav";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { IconBrandLinkedin, IconBrandLinkedinFilled,IconBrandX } from '@tabler/icons-react';
import { cn } from "@/lib/utils";



interface Props {}

const SiteHeader: NextPage<Props> = ({}) => {
  return (
    <header
      className={cn(
        "supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg",
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-end justify-end gap-2 md:justify-end">
             
          <nav className="flex items-center gap-1">
      
            <Link
              href={"https://www.linkedin.com/posts/vrv-security_hiring-frontend-frontenddeveloper-activity-7262888927311646720-bJgI"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <IconBrandX className="size-4" />
                <span className="sr-only">X</span>
              </div>
            </Link>
            <Link
              href={"https://www.linkedin.com/company/vrv-security/"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <IconBrandLinkedin className="size-4" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </header>
  );
}



export default SiteHeader
