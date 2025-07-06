'use client'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Separator
} from "@/components/ui/separator";

import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import DashboardUserButton from './dashboard-userbutton';

const firstSection = [
  {
    icon: VideoIcon,
    label: "Meetings",
    href: "/meetings"
  },
  {
    icon: BotIcon,
    label: "Agents",
    href: "/agents"
  },
]
const secondSection = [
  {
    icon: StarIcon,
    label: "Upgrade",
    href: "/upgrade"
  },

]


const DashboardSidebar = () => {
  const pathnaname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className='text-sidebar-accent-foreground'>
        <Link href={'/'} className='flex items-center  px-2 pt-2'>
          <Image src={'/logo.svg'} height={36} width={36} alt='meet' />
          <p className='text-2xl font-semibold'>Talk.AI</p>
        </Link>
      </SidebarHeader>
      <div>
        <Separator className='opacity-10 text-[#5d6b68]' />
      </div>
      <SidebarContent className='mt-4'>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                firstSection.map((item, index) => (
                  <SidebarMenuItem className='mb-2 cursor-pointer' key={index}>
                    <SidebarMenuButton isActive={pathnaname === item.href} className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathnaname === item.href && "bg-linear-to-r/oklch border-[#5d6b68]/10")} >
                      <Link className='flex items-center justify-between gap-2' href={item.href}>
                        <item.icon className='size-8' />
                        <span className='text-lg  font-medium tracking-tight'>
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                secondSection.map((item, index) => (
                  <SidebarMenuItem className='mb-2 cursor-pointer' key={index}>
                    <SidebarMenuButton isActive={pathnaname === item.href} className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathnaname === item.href && "bg-linear-to-r/oklch border-[#5d6b68]/10")} >
                      <Link className='flex items-center justify-between gap-2' href={item.href}>
                        <item.icon className='size-8' />
                        <span className='text-lg  font-medium tracking-tight'>
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

      </SidebarContent>
      <SidebarFooter className='text-white '>
        <div className='text-white'>
          <DashboardUserButton />
        </div>

      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar