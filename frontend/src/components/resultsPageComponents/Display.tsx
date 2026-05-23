
import DocumentHeatmap from "./DocumentHeatmap";
import RightDisplay from "./RightDisplay";

export const Display = () => {

  return (
    <div className='flex md:flex-row flex-col gap-3 flex-1 min-h-0 '>

      <div className="md:w-[60%] ">
        <DocumentHeatmap />
      </div>
      <RightDisplay />
    </div>
  )
}