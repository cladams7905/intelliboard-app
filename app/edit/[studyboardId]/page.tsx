import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import BoardHeader from "../components/BoardHeader";
import { getStudyboardsById, getStudyboardsByUserId } from "../../dashboard/actions";
import { Tables } from "@/types/supabase";
import BoardContent from "../components/BoardContent";
import SnapshotComponent from "../components/Snapshot";
import GenContentPanel from "../components/GenContentPanel";

export default async function EditPage({ params }: { params: { studyboardId: number } }) {
	const {data} = await readUserSession();

	if (!data.session) {
		return redirect('/')
	}

	const userStudyboards = await getStudyboardsByUserId(data?.session.user.id) || [];
	const studyboard = await getStudyboardsById(params.studyboardId) as Tables<"Studyboards">;

	return (
	<div className="flex flex-row justify-between pr-20 w-full gap-6 overflow-hidden fixed top-[64px]">
		<Sidebar studyboards={userStudyboards}/>
		<GenContentPanel/>
		<div className="w-11/12 h-screen-custom-150 bg-white mt-8">
			<SnapshotComponent studyboard={studyboard}>
				<div className='flex flex-col align-center border border-gray-200 rounded-sm h-full w-full'>
					<BoardHeader studyboard={studyboard}/>
					<div className="overflow-y-hidden break-words mt-[75px] px-12 h-full w-full">
						<BoardContent studyboard={studyboard}/>
					</div>
				</div>
			</SnapshotComponent>
		</div>
	</div>
	);
}