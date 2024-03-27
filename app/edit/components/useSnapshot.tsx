import { useEffect } from 'react';
import domtoimage from 'dom-to-image';
import { updateLocalStudyboard, updateStudyboardById } from '@/app/dashboard/actions';
import { Tables } from '@/types/supabase';

export const useSnapshot = (studyboard: Tables<"Studyboards">) => {
    useEffect(() => {
        if (!studyboard.content && !studyboard.title) return;

        const takeSnapshot = () => {
            const node = document.getElementById("areaToCapture");
            if (!node) return;
    
            domtoimage.toPng(node, {style: {textAlign: "center"}})
            .then((dataUrl) => {
                updateLocalStudyboard(studyboard.created_by, studyboard.id, dataUrl);
            })
            .catch((error) => {
                console.error('Error taking screenshot:', error);
            });
        };

        takeSnapshot();
        
    }, [studyboard.id, studyboard.content, studyboard.title, studyboard.created_by]);
};