import { useResultStore, useSelectedClauseStore } from "#/store/useStore"
import { GoDotFill } from "react-icons/go"
import { BsStars } from "react-icons/bs";
import { FaRegHandPointer } from "react-icons/fa";

const RightDisplay = () => {
  const selectedClauseId = useSelectedClauseStore((s) => s.selectedClauseId)
   const result = useResultStore((s)=>s.result)
  const clause = result?.clauses.find(c => c.id === selectedClauseId)
  const riskStyles: Record<RiskLevel, {
    text: string;
    bg: string;
    border: string;
  }> = {
    high: {
      text: "text-red-600",
      bg: "bg-red-400/10",
      border: "border-red-600",
    },
    medium: {
      text: "text-yellow-500",
      bg: "bg-yellow-400/10",
      border: "border-yellow-600",
    },
    low: {
      text: "text-emerald-600",
      bg: "bg-emerald-400/10",
      border: "border-emerald-600",
    },
  };
  const style = riskStyles[clause?.risk as RiskLevel]



  return (
    <>
      {clause && (
        <div className='pb-4 flex-1 gap-4 flex flex-col text-xs overflow-y-auto dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl'>
          <div className="text-sm text-neutral-500 w-full flex justify-center md:justify-start items-center gap-1.5 border-b border-neutral-300 dark:border-neutral-800 px-4 py-2">
            <FaRegHandPointer className="text-neutral-500/80"/>
            <h3>Click a clause to see more details</h3>
          </div>
          <div className="px-4 flex items-center justify-between text-sm">
            <h3 className={`${style.text} flex items-center gap-1 capitalize font-semibold`}><GoDotFill />{clause.risk} risk</h3>
            <h3 className="py-1 px-2 text-xs  text-neutral-500 bg-neutral-600/15 dark:bg-neutral-600/25 dark:text-neutral-500  rounded-full font-semibold ">{clause.category}</h3>
          </div>
          <div className="px-4 flex items-center ">
            <div className="border-l-2 border-neutral-400 dark:border-neutral-600 px-3">
              <h1 className="italic  text-neutral-500 text-[13px]">"{clause.text}"</h1>
            </div>
          </div>
          <div className="px-4 text-sm">
            <h3 className="font-semibold text-neutral-600 uppercase tracking-widest pb-1 dark:text-neutral-400">reason</h3>
            <h2 className="text-base dark:text-neutral-400 leading-5">{clause.reason}</h2>
          </div>
          <div className="px-4">
            <div className="p-3 rounded-2xl border border-indigo-300 bg-indigo-600/20 text-indigo-700 dark:bg-indigo-600/10 dark:text-indigo-300 dark:border-indigo-400/20">
            <h2 className="font-semibold uppercase pb-1 text-sm tracking-widest flex items-center gap-1"><BsStars className="text-lg"/>Suggested Rewrite</h2>
            <h3 className=" font-sans text-base leading-5">{clause.suggestion.length > 0 ? clause.suggestion : "No Rewrite Required" }</h3>
          </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RightDisplay