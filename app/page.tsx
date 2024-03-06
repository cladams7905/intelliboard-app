import Image from "next/image";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";

export default async function Home() {

  const {data} = await readUserSession();

	if (data?.session) {
		return redirect('/dashboard')
	}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Home</p>
      </div>
    </main>
  );
}
