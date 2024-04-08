import AddStudyboardTile from "./components/AddStudyboardTile";
import StudyboardGallery from "./components/StudyboardGallery";
import Sidebar from "@/components/layout/Sidebar";
import { getLocalStudyboardData } from "./actions";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import { localStudyboard } from "@/types/customTypes";

export default async function Dashboard() {
  
  const { data } = await readUserSession();
  if (!data.session) {
      return redirect('/');
  }

  const localStudyboards: localStudyboard[] = await getLocalStudyboardData(data);
  console.log("loaded " + localStudyboards.length + " userStudyboards in server");

  return (
      <div className="flex flex-row w-full overflow-hidden min-h-[calc(100vh-64px)]">
          <Sidebar studyboards={localStudyboards} />
          <div className="flex flex-col flex-wrap gap-6 mx-16">
              <div className="flex flex-row items-baseline">
                  <div className="font-heading text-2xl text-primary mt-10">My Studyboards</div>
                  <AddStudyboardTile variant="sm" />
              </div>
              <div className="mt-2">
                  <div className="flex flex-row flex-wrap gap-4">
                      <StudyboardGallery studyboards={localStudyboards} />
                  </div>
              </div>
          </div>
      </div>
  );
}