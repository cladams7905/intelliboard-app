import React from "react";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import BoardHeader from "../components/BoardHeader";
import { getStudyboardsById, getStudyboardsByUserId } from "../../dashboard/actions";

export default async function EditPage({ params }: { params: { studyboardId: number } }) {
	const {data} = await readUserSession();
	const studyboardId = params.studyboardId!;

	if (!data.session) {
		return redirect('/')
	} 	
	if (!studyboardId) {
		return redirect('/dashboard')
	}

	const userStudyboards = await getStudyboardsByUserId(data?.session.user.id) || [];
	const studyboard = await getStudyboardsById(studyboardId)

	return (
		<>
		<div className="flex flex-row justify-between pr-20 w-full gap-6 overflow-hidden fixed top-[64px]">
			<Sidebar studyboards={userStudyboards}/>
			<div className="w-11/12 h-screen-custom-150 bg-white mt-8">
				<div className='flex flex-col align-center border border-gray-200 rounded-sm h-full'>
					<BoardHeader/>
					<div className="overflow-y-scroll mt-[75px] px-12">
						{studyboard?.title ? (
							<div className="text-3xl font-bold text-center text-secondary py-6">{studyboard.title}</div>
						) : (
							<div className="text-3xl font-bold text-center text-gray-300 py-6">Untitled Project</div>
						)}
						<div className="text-2xl text-left leading-[7rem] tracking-wider lg:px-28">{JSON.parse(JSON.stringify(studyboard?.content))?.contentBody}</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}