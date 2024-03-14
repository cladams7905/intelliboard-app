import Modal from "@/components/shared/Modal";
import Tooltip from "@/components/shared/tooltip";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";


const StudyboardModal = ({
  showStudyboardModal,
  setShowStudyboardModal,
}: {
  showStudyboardModal: boolean;
  setShowStudyboardModal: Dispatch<SetStateAction<boolean>>;
}) => {

  return (
    <Modal showModal={showStudyboardModal} setShowModal={setShowStudyboardModal} blur={false}>
      <div className="w-full overflow-hidden shadow-xl md:rounded-2xl md:border md:border-gray-200 p-8 max-h-[400px]">
        <div className="flex flex-row justify-center items-start">
          <div className="flex flex-col items-center justify-center w-2/3">
            <div className="text-xl font-semibold text-secondary">Select a Studyboard</div>
            <div className="text-lg text-gray-400 my-8">You currently do not have any studyboards, click &quot;<span className="font-extrabold">+</span>&quot; to start learning!</div>
            <div className="flex flex-row flex-wrap gap-4 items-center">
			</div>
          </div>
          <div className="flex flex-col items-center justify-start flex-wrap gap-4 w-1/3 border-l border-gray-300">
          <div className="text-xl font-semibold text-secondary">Create new Studyboard</div>
            <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
            style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}>
              <Icon 
                icon="mingcute:add-fill" 
                width={32} 
                height={32} 
                style={{ color: 'hsl(var(--secondary))' }} />
            </div>
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
