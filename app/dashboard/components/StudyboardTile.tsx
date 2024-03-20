import { Tables } from "@/types/supabase";
import TileOptions from "./TileOptions";

export default function StudyboardTile({studyboard}: {studyboard: Tables<"Studyboards">}) {
  return (
    <div className="flex items-center justify-center relative bg-gray-100 border border-gray-300 rounded-sm hover:scale-105 hover:cursor-pointer transition-all"
    style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}>
      <div className="flex-col items-start max-w-48">
          <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border-b border-gray-300 hover:bg-gray-50">
            <TileOptions/>
          </div>
          <div className="flex flex-col flex-wrap gap-2 items-center justify-center p-2">
            <div className="text-md break-words">{studyboard.title}</div>
            <div className="flex flex-row flex-wrap gap-2">
              {studyboard.tags?.map((tag, i) => (
                <div className="bg-red-200 p-2 rounded-xl text-xs" key={i}>
                  {tag}
                </div>
              ))}
            </div>
            <div className="text-xs break-words text-gray-400">Last opened: {studyboard.created_at}</div>
          </div>
      </div>
    </div>
  )
}
