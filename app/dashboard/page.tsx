import React from "react";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import BoardHeader from "./components/BoardHeader";

export default async function page() {
	const {data} = await readUserSession();

	if (!data.session) {
		return redirect('/')
	}

	return (
		<>
		<div className="flex flex-row justify-between pr-20 w-full gap-6 overflow-hidden fixed top-[64px]">
			<Sidebar/>
			<div className="w-11/12 h-screen-custom-150 bg-white mt-8">
				<div className='flex flex-col align-center border border-gray-200 rounded-sm h-full'>
					<BoardHeader/>
					<div className="overflow-y-scroll mt-[75px]">
						<div className="text-3xl font-bold text-center text-secondary py-6">Title</div>
						<div className="text-2xl text-left leading-[7rem] tracking-wider lg:px-28">小花是一只小猫，它喜欢冒险。有一天，小花离开家去探险。它穿过森林，跳过小溪，走过草原。在路上，小花遇到了一只大老鼠。老鼠告诉小花要小心。小花继续走，来到一个美丽的花园。花园里有漂亮的花和蝴蝶。可是，太阳下山后，小花迷路了。一只友好的小鸟帮助小花找到回家的路。小花学到了，即使在冒险中，总会有人帮助你。 asdasd asd ad sadas dasd asdas das asdsad asdasdad asdsad asda dasd sadasdas dasd asd asdasdasdasdas das dasd asd</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}