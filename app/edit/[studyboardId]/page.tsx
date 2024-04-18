import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import BoardHeader from "../components/BoardHeader";
import { getStudyboardById } from "../../dashboard/actions";
import { Tables } from "@/types/supabase";
import BoardContent from "../components/BoardContent";
import SnapshotComponent from "../components/Snapshot";
import GenContentPanel from "../components/GenContentPanel";
import SidebarWrapper from "@/components/layout/Sidebar/SidebarWrapper";
import { localStudyboard } from "@/types/customTypes";
import { getLocalStudyboardData } from "../../dashboard/actions";

export default async function EditPage({ params }: { params: { studyboardId: number } }) {
	const {data} = await readUserSession();

	if (!data.session) {
		return redirect('/')
	}
	
	const sessionUserId = data.session?.user.id;
	const currentStudyboard = await getStudyboardById(params.studyboardId) as Tables<"Studyboards">;
    const studyboards: localStudyboard[] = await getLocalStudyboardData(sessionUserId);
    console.log(`server: loaded ${studyboards.length} studyboards in edit page`, studyboards.map(board => board.id));

	return (
	<SidebarWrapper studyboards={studyboards} sessionUserId={sessionUserId}>
		<GenContentPanel/>
		<div className="h-screen-custom-150 bg-white w-full z-10">
			<SnapshotComponent studyboard={currentStudyboard}>
				<div className='flex flex-col align-center h-full'>
					<BoardHeader studyboard={currentStudyboard}/>
					<div className="overflow-y-hidden break-words px-6 h-full">
						<BoardContent studyboard={currentStudyboard}/>
					</div>
				</div>
			</SnapshotComponent>
		</div>
	</SidebarWrapper>
	);
}