import StudyboardGallery from "./components/StudyboardGallery";
import SidebarWrapper from "../../components/layout/Sidebar/SidebarWrapper";
import { getLocalStudyboardData } from "./actions";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import { localStudyboard } from "@/types/customTypes";

export default async function Dashboard() {
  
    const { data } = await readUserSession();
    if (!data.session) {
        return redirect('/');
    }
    const sessionUserId = data.session?.user.id;
    const studyboards: localStudyboard[] = await getLocalStudyboardData(sessionUserId);
    console.log(`server: loaded ${studyboards.length} studyboards in dashboard`, studyboards.map(board => board.id));

    return (
        <SidebarWrapper studyboards={studyboards} sessionUserId={sessionUserId}>
            <div className="flex flex-col flex-wrap gap-6 mx-16 pt-10">
                <StudyboardGallery studyboards={studyboards} sessionUserId={sessionUserId}/>
            </div>
        </SidebarWrapper>
    );
}