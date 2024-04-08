import React from 'react'

export default function GenContentPanel() {
  return (
    <div className="w-1/5 border-r border-gray-200"
        style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 0px'}}>
        <div className="flex flex-col flex-wrap gap-6 p-6 z-10">
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Select language</span>
            </div>
            <select defaultValue={"default"} className="select select-bordered select-sm bg-white">
                <option value="default" disabled>Choose here</option>
                <option>Chinese</option>
            </select>
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Select text difficulty</span>
            </div>
            <select defaultValue={"default"} className="select select-bordered select-sm bg-white">
                <option value="default" disabled>Choose here</option>
                <option>0 - Foundational</option>
                <option>1 - Novice Mid-High</option>
                <option>2 - Intermed Low</option>
                <option>3 - Intermed Mid-High</option>
                <option>4 - Advanced Low</option>
                <option>5 - Advanced Mid-High</option>
            </select>
            </label>
        </div>
    </div>
  )
}
