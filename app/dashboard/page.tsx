import AddStudyboardTile from "./components/AddStudyboardTile";
import StudyboardGallery from "./components/StudyboardGallery";
import Sidebar from "@/components/layout/Sidebar";
import { getStudyboardsByUserId } from "./actions";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";

export default async function Dashboard() {

    const { data } = await readUserSession();
    if (!data.session) {
      return redirect('/');
    }
    const userStudyboards = await getStudyboardsByUserId(data?.session.user.id) || [];

  return (
    <div className="flex flex-row pr-20 w-full gap-6 overflow-hidden fixed top-[64px]">
      <Sidebar studyboards={userStudyboards}/>
    <div className="flex flex-col flex-wrap gap-6 mx-16 ">
      <div className="text-xl text-secondary mt-10">Create a new studyboard</div>
      <div className="ml-3 mt-2">
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <AddStudyboardTile />
        </div>
      </div>
      <div className="text-xl text-secondary mt-10">Recent studyboards</div>
      <div className="ml-3">
          <StudyboardGallery studyboards={userStudyboards}/>
      </div>
    </div>
  </div>
  );
}
