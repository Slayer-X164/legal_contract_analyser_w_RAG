import { useDocumentNameStore, useResultStore, useThemeStore } from "#/store/useStore";


export const ScoreCard = () => {
  const result = useResultStore(s=>s.result)
  const name = useDocumentNameStore((s)=>s.name)
  // const type = useDocumentNameStore((s)=>s.type)
  if(!result) return
  return (
    <div className='bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 md:h-40 w-full rounded-2xl flex flex-col md:flex-row items-center  gap-4 p-4 md:p-6'>
      <ScoreRing score={result.overall_score} />
      <div className='flex flex-col items-center md:items-start text-center md:text-start gap-2'>
        <h3 className='text-sm text-neutral-400 dark:text-neutral-600 font-semibold'>{name}</h3>
        <h2 className='text-sm font-semibold text-neutral-700 dark:text-neutral-400'>{result.summary}</h2>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-1 text-neutral-500 text-sm'>
            <div className='w-2 h-2 rounded-full bg-red-600' />
            <h3 className='pl-0.5'>{result.number_of_clauses.high}</h3>
            <h3>High</h3>
          </div>
          <div className='flex items-center gap-1 text-neutral-500 text-sm'>
            <div className='w-2 h-2 rounded-full bg-yellow-500' />
            <h3 className='pl-0.5'>{result.number_of_clauses.medium}</h3>
            <h3>Medium</h3>
          </div>
          <div className='flex items-center gap-1 text-neutral-500 text-sm'>
            <div className='w-2 h-2 rounded-full bg-emerald-600' />
            <h3 className='pl-0.5'>{result.number_of_clauses.low}</h3>
            <h3>Low</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
function ScoreRing({ score }: { score: number }) {
  const theme = useThemeStore(s => s.theme);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score < 40 ? "#f87171" : score < 65 ? "#fbbf24" : "#34d399";
  const mainColor = theme === "dark" ? "#262626":"#e5e5e5"
  return (
    <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke={mainColor} strokeWidth="7" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-semibold ">{score}</span>
        <span className="text-[10px]  tracking-widest uppercase">score</span>
      </div>
    </div>
  );
}