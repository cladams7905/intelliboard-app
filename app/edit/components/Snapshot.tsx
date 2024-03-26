"use client";

import { useEffect } from 'react';
import domtoimage from 'dom-to-image';
import { updateStudyboardById } from '@/app/dashboard/actions';
import { Tables } from '@/types/supabase';

export const SnapshotComponent = ({
    studyboard,
    children,
}: {
    studyboard: Tables<"Studyboards">;
    children: React.ReactNode;
}) => {

    useEffect(() => {
        // console.log("in snapshot: ", studyboard)
        if (JSON.stringify(studyboard.content) == "{}" && studyboard.title == null) {
            console.log("exiting...")
            return;
        }
        
        const node = document.getElementById("areaToCapture");
        if (!node) return;

        //console.log("re-rendering...")

        domtoimage.toPng(node, {style: {textAlign: "center"}})
        .then((dataUrl) => {
            updateStudyboardById(studyboard.id, { snapshot_url: dataUrl });
        })
        .catch((error) => {
            console.error('Error taking screenshot:', error);
        });

    }, []);

    return (
        <div className="h-full" id="areaToCapture">
            {children}
        </div>
    );
};

export default SnapshotComponent;