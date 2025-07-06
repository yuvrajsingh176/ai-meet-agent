import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardNavbar from "@/modules/dashboard/ui/components/dashboard-navbar"
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen overflow-hidden bg-muted">
                <DashboardNavbar/>
                {children}
            </main>
        </SidebarProvider>
    )
}

export default Layout
