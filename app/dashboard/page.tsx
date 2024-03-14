import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Tooltip from "@/components/shared/tooltip";
import { Button } from "@/components/shared/button";

export default async function Dashboard() {

	return (
		<div className="flex flex-col flex-wrap gap-6 mx-6">
			<div className="text-3xl text-secondary font-semibold mt-10">Continue Studying</div>
			<div className="text-xl text-gray-400 my-8">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
			<div className="text-3xl text-secondary font-semibold mt-10">My Studyboards</div>
			<div className="flex flex-row flex-wrap gap-4 items-center">
				<Tooltip alignment="bottom" content="Create new studyboard">
					<div className="flex items-center justify-center w-64 h-40 bg-white rounded-sm border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
					style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}>
						<Icon 
							icon="mingcute:add-fill" 
							width={32} 
							height={32} 
							style={{ color: 'hsl(var(--secondary))' }} />
					</div>
				</Tooltip>
			</div>
		</div>
	);
}