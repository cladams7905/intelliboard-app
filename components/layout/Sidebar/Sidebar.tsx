"use client";

import { Button } from "@/components/shared/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Tooltip from "@/components/shared/tooltip";
import useStudyboardModal from "@/app/dashboard/components/StudyboardModal";
import Link from "next/link";
import { localStudyboard } from "@/types/customTypes";

export default function Sidebar({
    studyboards,
    sessionUserId,
  } : {
    studyboards : localStudyboard[],
    sessionUserId: string
  }) {
    const { StudyboardModal, setShowStudyboardModal } = useStudyboardModal(studyboards, sessionUserId);

    return ( 
    <div className="hidden lg:block h-screen-custom-65 w-[60px] bg-primary px-3 py-10 border-r border-gray-200 z-20">
        <StudyboardModal/>
        <Link href={'/dashboard'}>
            <Tooltip alignment="right" content="My dashboard">
                <Button type="submit" variant={"ghost"} className="w-full mb-6 hover:scale-105 transition-all text-white">
                    <Icon 
                        icon="iconamoon:home-bold" 
                        width={26} 
                        height={26} />
                </Button>
            </Tooltip>
        </Link>
        <Tooltip alignment="right" content="Select studyboard">
            <Button type="submit" variant={"ghost"} className="w-full mb-6 hover:scale-105 transition-all text-white"
            onClick={() => setShowStudyboardModal(true)}>
                <Icon 
                    icon="mdi:collections-bookmark-outline" 
                    width={26} 
                    height={26} />
            </Button>
        </Tooltip>
    </div>
    );
}