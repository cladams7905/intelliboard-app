import { Tables } from "@/types/supabase";


export default function StudyboardTile({studyboard}: {studyboard: Tables<"Studyboards">}) {
  return (
    <div className="flex-col items-start max-w-48">
        <div className="flex items-center justify-center w-48 h-32 mb-4 bg-white rounded-sm border border-gray-300 hover:cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all"
            style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}>
        </div>
        <div className="text-md break-words">{studyboard.title}</div>			
    </div>
  )
}
