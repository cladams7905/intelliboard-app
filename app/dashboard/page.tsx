import React from "react";
import NewStudyboardTile from "./components/NewStudyboardTile";

export default async function Dashboard() {

	return (
		<div className="flex flex-col flex-wrap gap-6 mx-16 ">
			<div className="text-xl text-secondary mt-10">Create a new studyboard</div>
			<div className="ml-3 mt-2">
				<div className="flex flex-row flex-wrap gap-4 items-center">
					<NewStudyboardTile/>
				</div>
			</div>
			<div className="text-xl text-secondary mt-10">Recent studyboards</div>
			<div className="ml-3">
			<div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
			</div>
		</div>
	);
}