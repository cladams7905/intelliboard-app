import { Tables } from "@/types/supabase";


export default function StudyboardTile({studyboard}: {studyboard: Tables<"Studyboards">}) {
  return (
    <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded-sm hover:scale-105 hover:cursor-pointer transition-all"
    style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}>
      <div className="flex-col items-start max-w-48">
          <div className="flex items-center justify-center w-48 h-32 mb-4 bg-white rounded-sm border-b border-gray-300 hover:bg-gray-50">
          </div>
          <div className="text-md break-words">{studyboard.title}</div>			
      </div>
    </div>
  )
}
