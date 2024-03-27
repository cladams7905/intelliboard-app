"use client"

import React from 'react';
import { useSnapshot } from './useSnapshot';
import { Tables } from '@/types/supabase';

interface SnapshotComponentProps {
    studyboard: Tables<"Studyboards">;
    children: React.ReactNode;
}

const SnapshotComponent: React.FC<SnapshotComponentProps> = ({ studyboard, children }) => {
    useSnapshot(studyboard);

    return (
        <div className="h-full" id="areaToCapture">
            {children}
        </div>
    );
};

export default SnapshotComponent;