import AddStudyboardTile from "./components/AddStudyboardTile";
import { getStudyboardsByUserId } from "./actions";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import StudyboardGallery from "./components/StudyboardGallery";

export default async function Dashboard() {

  const { data } = await readUserSession();

  if (!data.session) {
    return redirect('/');
  }

  const userStudyboards = await getStudyboardsByUserId(data.session.user.id) || [];

  return (
    <div className="flex flex-col flex-wrap gap-6 mx-16 ">
      <div className="text-xl text-secondary mt-10">Create a new studyboard</div>
      <div className="ml-3 mt-2">
        <div className="flex flex-row flex-wrap gap-4 items-center">
          <AddStudyboardTile />
        </div>
      </div>
      <div className="text-xl text-secondary mt-10">Recent studyboards</div>
      <div className="ml-3">
        {userStudyboards.length == 0 ? (
          <div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
        ) : (
          <StudyboardGallery userStudyboards={userStudyboards} />
        )}
      </div>
    </div>
  );
}
