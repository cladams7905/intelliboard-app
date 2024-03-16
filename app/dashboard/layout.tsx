import Sidebar from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div className="flex flex-row pr-20 w-full gap-6 overflow-hidden fixed top-[64px]">
        <Sidebar/> {children}
      </div>
    )
  }