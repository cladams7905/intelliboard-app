import React from "react";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";

export default async function page() {

	const {data} = await readUserSession();

	if (!data.session) {
		return redirect('/')
	}

	return (
		<main className="flex flex-col items-center justify-between p-24">
			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
				<p>Dashboard</p>
			</div>
		</main>
	);
}