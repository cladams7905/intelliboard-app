import Modal from "@/components/shared/Modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import AddStudyboardTile from "./AddStudyboardTile";
import { getStudyboardsByUserId } from "../actions";
import readUserSession from "@/lib/actions/readUserSession";
import { redirect } from "next/navigation";
import { Tables } from "@/types/supabase";
import StudyboardGallery from "./StudyboardGallery";
import { createBrowserClient } from "@supabase/ssr";


const StudyboardModal = ({
  showStudyboardModal,
  setShowStudyboardModal,
}: {
  showStudyboardModal: boolean;
  setShowStudyboardModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [studyboards, setStudyboards] = useState<Tables<"Studyboards">[]>([]);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
  
  useEffect(() => {
    async function fetchData() {
      const { data } = await readUserSession();
      if (!data.session) {
        return redirect('/');
      }
      const userStudyboards = await getStudyboardsByUserId(data?.session.user.id) || [];
      setStudyboards(userStudyboards);
    }
    
    const channel = supabase.channel('studyboard modal changes').on(
      'postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'Studyboards'
      }, (payload) => {
        fetchData();
      }
    ).subscribe();

    fetchData();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase]);

  return (
    <Modal showModal={showStudyboardModal} setShowModal={setShowStudyboardModal} blur={false} width="w-4/5">
      <div className="w-full shadow-xl md:rounded-2xl md:border md:border-gray-200 p-8">
        <div className="flex flex-row justify-center items-start">
          <div className="flex flex-col items-center justify-center w-2/3">
            <div className="text-xl text-secondary">Select a studyboard</div>
            <div className={`flex flex-row flex-wrap gap-4 my-4 p-2 items-center overflow-y-scroll max-h-[380px] ${studyboards.length > 0 ? 'border-r border-gray-300}' : ''} `}>
              {studyboards.length == 0 ? (
                <div className="text-md text-gray-400 my-4">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
              ) : (
                <StudyboardGallery userStudyboards={studyboards} />
              )}
            </div>
          </div>
          <div className={`flex flex-col items-center justify-start flex-wrap gap-4 w-1/3 ${studyboards.length == 0 ? 'border-l border-gray-300}' : ''}`}>
            <div className="text-xl text-secondary">Create a new studyboard</div>
            <AddStudyboardTile/>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default function useStudyboardModal() {
  const [showStudyboardModal, setShowStudyboardModal] = useState(false);

  const StudyboardModalCallback = useCallback(() => {
    return (
      <StudyboardModal
        showStudyboardModal={showStudyboardModal}
        setShowStudyboardModal={setShowStudyboardModal}
      />
    );
  }, [showStudyboardModal, setShowStudyboardModal]);

  return useMemo(
    () => ({ setShowStudyboardModal, StudyboardModal: StudyboardModalCallback }),
    [setShowStudyboardModal, StudyboardModalCallback],
  );
}
