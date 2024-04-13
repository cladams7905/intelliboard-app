'use client'
 
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import React from 'react';
import { localStudyboard } from '@/types/customTypes';
 
export default function SidebarWrapper({
  studyboards,
  sessionUserId,
  children
} : {
  studyboards : localStudyboard[],
  sessionUserId: string,
  children: React.ReactNode
}) {
    return (
      <div className="flex flex-row w-full overflow-hidden min-h-[calc(100vh-64px)]">
        <Sidebar studyboards={studyboards} sessionUserId={sessionUserId}/>
        {children}
      </div>
    )
}