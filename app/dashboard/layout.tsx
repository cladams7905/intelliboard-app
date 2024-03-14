import Sidebar from "@/components/layout/Sidebar";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const {data} = await readUserSession();

    if (!data.session) {
      return redirect('/')
    }

    return (
        <div className="flex flex-row pr-20 w-full gap-6 overflow-hidden fixed top-[64px]">
          <Sidebar/> {children}
        </div>
    )
  }