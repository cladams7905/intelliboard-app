import { Tables } from "@/types/supabase";
import TileOptions from "./TileOptions";
import Link from "next/link";
import Image from "next/image";

export default function StudyboardTile({studyboard}: {studyboard: Tables<"Studyboards">}) {

  return (
      <div className="flex items-start h-fit justify-center relative bg-gray-100 border border-gray-300 rounded-sm hover:scale-105 hover:cursor-pointer transition-all"
      style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 6px'}}>
        <TileOptions studyboard={studyboard}/>
        <Link href="/edit/[studyboardId]" as={`/edit/${studyboard.id}`}>
          <div className="flex-col items-start max-w-48 overflow-hidden">
              {studyboard.snapshot_url ? (
                <Image 
                  className="p-2 bg-white rounded-sm border-b border-gray-300 object-cover min-h-[128px] max-h-[128px] max-w-none" 
                  // style={{objectPosition: "-235px -20px"}}
                  alt="snapshot_url" 
                  src={studyboard.snapshot_url}
                  width={192} 
                  height={128} />
              ) : (
                <div className="flex items-center justify-center w-48 h-32 bg-white rounded-sm border-b border-gray-300 hover:bg-gray-50" />
              ) }
              <div className="flex flex-col flex-wrap gap-2 items-center justify-center p-2">
              {studyboard.title ? (
                <div className="text-md break-words">{studyboard.title}</div>
              ) : (
                <div className="text-md text-gray-400 break-words">Untitled Project</div>
              )}
                <div className="flex flex-row flex-wrap gap-2">
                  {studyboard.tags?.map((tag, i) => (
                    <div className="bg-red-200 p-2 rounded-xl text-xs" key={i}>
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="text-xs break-words text-gray-400">Last opened: {studyboard.created_at /* TODO */ }</div>
              </div>
          </div>
        </Link>
      </div>
  )
}
