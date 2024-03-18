import Modal from "@/components/shared/Modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import AddStudyboardTile from "./AddStudyboardTile";


const StudyboardModal = ({
  showStudyboardModal,
  setShowStudyboardModal,
}: {
  showStudyboardModal: boolean;
  setShowStudyboardModal: Dispatch<SetStateAction<boolean>>;
}) => {

  return (
    <Modal showModal={showStudyboardModal} setShowModal={setShowStudyboardModal} blur={false} width="max-w-screen-lg">
      <div className="w-full overflow-hidden shadow-xl md:rounded-2xl md:border md:border-gray-200 p-8 max-h-[400px]">
        <div className="flex flex-row justify-center items-start">
          <div className="flex flex-col items-center justify-center w-2/3">
            <div className="text-xl text-secondary">Select a studyboard</div>
            <div className="text-md text-gray-400 my-8">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
            <div className="flex flex-row flex-wrap gap-4 items-center">

            </div>
          </div>
          <div className="flex flex-col items-center justify-start flex-wrap gap-4 w-1/3 border-l border-gray-300">
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
