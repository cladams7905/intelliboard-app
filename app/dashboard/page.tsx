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
    <div className="flex flex-row w-full overflow-hidden min-h-[calc(100vh-64px)]">
      <Sidebar studyboards={userStudyboards}/>
    <div className="flex flex-col flex-wrap gap-6 mx-16">
      <div className="flex flex-row items-baseline">
        <div className="font-heading text-2xl text-primary mt-10">My Studyboards</div>
        <AddStudyboardTile variant="sm"/>
      </div>
      <div className="mt-2">
        <div className="flex flex-row flex-wrap gap-4">
          <StudyboardGallery studyboards={userStudyboards}/>
        </div>
      </div>
    </div>
  </div>
  );
}
