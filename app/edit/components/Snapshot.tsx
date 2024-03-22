"use client";

import { useEffect } from 'react';
import html2canvas from 'html2canvas';
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
        const captureSnapshot = () => {
            const captureElement = document.getElementById("areaToCapture");
            if (!captureElement) return;

            html2canvas(captureElement).then((canvas) => {
                
                // Convert the canvas content to a data URL (PNG format)
                const dataUrl = canvas.toDataURL('image/png');

                //Push dataUrl to db
                updateStudyboardById(studyboard.id, { snapshot_url: dataUrl });
            }).catch((err) => {
                console.log("Error taking screenshot: " + err.message);
            });
        };
        if (typeof window !== 'undefined') {
            captureSnapshot();
        }
    }, [studyboard.id]);

    return (
        <div className="h-full" id="areaToCapture">
            {children}
        </div>
    );
};

export default SnapshotComponent;
