"use client";

import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import Tooltip from "@/components/shared/tooltip";
import useScroll from "@/lib/hooks/use-scroll";

export default function BoardHeader() {

    const scrolled = useScroll(10);

    return (
    <div className={`absolute flex flex-row justify-between items-center h-[100px] py-6 px-8 mx-10 
    ${scrolled ? 'backdrop-blur-none' : 'backdrop-blur-sm'} transition-all`}
    style={{width: 'calc(91.6667% - 150px)'}}>
        <Tooltip alignment="top" content="Save">
            <Icon 
                icon="mi:favorite" 
                width={22} 
                height={22} 
                className="hover:bg-gray-200 cursor-pointer rounded-md"
                style={{ color: 'rgb(107 114 128)' }} />
        </Tooltip>
        <div className="flex flex-wrap gap-3">
            <Tooltip alignment="top" content="Text size">
                <Icon 
                    icon="majesticons:font-size-line" 
                    width={26} 
                    height={26} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
            <Tooltip alignment="top" content="Read aloud">
                <Icon 
                    icon="akar-icons:sound-on" 
                    width={22} 
                    height={22} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
            <Tooltip alignment="top" content="Learn mode">
                <Icon 
                    icon="mdi:search-expand" 
                    width={22} 
                    height={22} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
            <Tooltip alignment="top" content="Studyboard settings">
                <Icon 
                    icon="mdi:settings" 
                    width={22} 
                    height={22} 
                    className="hover:bg-gray-200 cursor-pointer rounded-md"
                    style={{ color: 'rgb(107 114 128)' }} />
            </Tooltip>
        </div>
    </div>
    );
}