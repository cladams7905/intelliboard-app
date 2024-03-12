"use client";

import { Button } from "@/components/shared/button";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Tooltip from "@/components/shared/tooltip";

export default function Sidebar() {
    return (
        <div className="h-screen-custom-65 w-[80px] bg-secondary px-3 py-10 border-r border-gray-200">
            <Tooltip alignment="right" content="Create new studyboard">
                <Button type="submit" variant={"ghost"} className="w-full mb-6">
                    <Icon 
                        icon="material-symbols:add-ad" 
                        width={26} 
                        height={26} 
                        style={{ color: 'white' }} />
                </Button>
            </Tooltip>
            <Tooltip alignment="right" content="View saved studyboards">
                <Button type="submit" variant={"ghost"} className="w-full mb-6">
                    <Icon 
                        icon="material-symbols:bookmark-outline" 
                        width={26} 
                        height={26} 
                        style={{ color: 'white' }} />
                </Button>
            </Tooltip>
            <Tooltip alignment="right" content="Browse studyboards">
                <Button type="submit" variant={"ghost"} className="w-full mb-6">
                    <Icon 
                        icon="zondicons:search" 
                        width={23} 
                        height={23} 
                        style={{ color: 'white' }} />
                </Button>
            </Tooltip>
        </div>
    );
}