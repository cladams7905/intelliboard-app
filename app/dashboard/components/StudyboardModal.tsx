import Modal from "@/components/shared/Modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import AddStudyboardTile from "./AddStudyboardTile";
import StudyboardGallery from "./StudyboardGallery";
import { Tables } from "@/types/supabase";


const StudyboardModal = ({
  showStudyboardModal,
  setShowStudyboardModal,
  studyboards
}: {
  showStudyboardModal: boolean;
  setShowStudyboardModal: Dispatch<SetStateAction<boolean>>;
  studyboards: Tables<"Studyboards">[];
}) => {
  return (
    <Modal showModal={showStudyboardModal} setShowModal={setShowStudyboardModal} blur={false} width="w-4/5">
      <div className="w-full shadow-xl md:rounded-2xl md:border md:border-gray-200 p-8">
        <div className="flex flex-row justify-center items-start">
          <div className="flex flex-col items-center justify-center w-2/3">
            <div className="text-xl text-secondary">Select a studyboard</div>
            <div className={`flex flex-row flex-wrap gap-4 my-4 p-2 items-center overflow-y-scroll max-h-[380px] `}>
              <StudyboardGallery studyboards={studyboards}/>
            </div>
          </div>
          <div className={`flex flex-col items-center justify-start flex-wrap gap-4 w-1/3 ''}`}>
            <div className="text-xl text-secondary">Create a new studyboard</div>
            <AddStudyboardTile/>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default function useStudyboardModal(studyboards: Tables<"Studyboards">[]) {
  const [showStudyboardModal, setShowStudyboardModal] = useState(false);

  const StudyboardModalCallback = useCallback(() => {
    return (
      <StudyboardModal
        showStudyboardModal={showStudyboardModal}
        setShowStudyboardModal={setShowStudyboardModal}
        studyboards={studyboards}
      />
    );
  }, [showStudyboardModal, setShowStudyboardModal, studyboards]);

  return useMemo(
    () => ({ setShowStudyboardModal, StudyboardModal: StudyboardModalCallback }),
    [setShowStudyboardModal, StudyboardModalCallback],
  );
}
