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
import { localStudyboard } from "@/types/customTypes";


const StudyboardModal = ({
  showStudyboardModal,
  setShowStudyboardModal,
  studyboards,
  sessionUserId,
}: {
  showStudyboardModal: boolean;
  setShowStudyboardModal: Dispatch<SetStateAction<boolean>>;
  studyboards: localStudyboard[];
  sessionUserId: string;
}) => {
  return (
    <Modal showModal={showStudyboardModal} setShowModal={setShowStudyboardModal} blur={false} width="w-2/3">
      <div className="flex flex-row w-full shadow-xl md:rounded-2xl md:border md:border-gray-200 p-8">
          <div className="flex flex-col items-start justify-center">
            <div className={`flex flex-row flex-wrap gap-4 p-2 items-start justify-center overflow-y-scroll max-h-[440px]`}>
              <StudyboardGallery studyboards={studyboards} sessionUserId={sessionUserId} inModal={true}/>
            </div>
          </div>
          {/* <div className={`flex flex-col items-center justify-start w-1/3`}>
            <div className="text-xl text-secondary">Create a new studyboard</div>
            <div className="my-4 p-2">
              <AddStudyboardTile variant="lg" studyboards={studyboards}/>
            </div>
          </div> */}
      </div>
    </Modal>
  );
};

export default function useStudyboardModal(studyboards: localStudyboard[], sessionUserId: string) {
  const [showStudyboardModal, setShowStudyboardModal] = useState(false);

  const StudyboardModalCallback = useCallback(() => {
    return (
      <StudyboardModal
        showStudyboardModal={showStudyboardModal}
        setShowStudyboardModal={setShowStudyboardModal}
        studyboards={studyboards}
        sessionUserId={sessionUserId}
      />
    );
  }, [showStudyboardModal, setShowStudyboardModal, studyboards, sessionUserId]);

  return useMemo(
    () => ({ setShowStudyboardModal, StudyboardModal: StudyboardModalCallback }),
    [setShowStudyboardModal, StudyboardModalCallback],
  );
}
