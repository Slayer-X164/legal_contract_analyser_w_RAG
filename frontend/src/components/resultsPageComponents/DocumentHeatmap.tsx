import { useDocumentNameStore, useResultStore, useSelectedClauseStore } from "#/store/useStore"
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";


const DocumentHeatmap = () => {
  const result = useResultStore((s) => s.result)
  const { name, type } = useDocumentNameStore((s) => s)
  const [hoveredId, setHoveredId] = useState<string | null>(null);


  if (!result) return null;
  const riskConfig: Record<RiskLevel, {
    highlight: string;
    highlightHover: string;
    tag: string;
    darkTag: string;
  }> = {
    high: {
      highlight: "rgba(239,68,68,0.15)",
      highlightHover: "rgba(239,68,68,0.32)",
      tag: "#dc2626",
      darkTag: "#991b1b",
    },
    medium: {
      highlight: "rgba(245,158,11,0.15)",
      highlightHover: "rgba(245,158,11,0.28)",
      tag: "#d97706",
      darkTag: "#92400e",
    },
    low: {
      highlight: "rgba(16,185,129,0.15)",
      highlightHover: "rgba(16,185,129,0.22)",
      tag: "#059669",
      darkTag: "#064e3b",
    },
  };
  function buildSegments(doc: string, clauses: clause[]) {
    type Segment = { text: string; clause?: clause };
    const segments: Segment[] = [];
    let cursor = 0;

    const positioned = clauses
      .map((c) => ({ clause: c, idx: doc.indexOf(c.text) }))
      .filter((x) => x.idx !== -1)
      .sort((a, b) => a.idx - b.idx);

    for (const { clause, idx } of positioned) {
      if (idx > cursor) segments.push({ text: doc.slice(cursor, idx) });
      segments.push({ text: clause.text, clause });
      cursor = idx + clause.text.length;
    }
    if (cursor < doc.length) segments.push({ text: doc.slice(cursor) });
    return segments;
  }

  const segments = buildSegments(result.full_raw_doc, result.clauses);


  return (
    <div className=" h-full flex-1  flex flex-col overflow-hidden  dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl">
      {/* top bar */}
      <div className="w-full flex justify-center md:justify-between border-b border-neutral-300 dark:border-neutral-800 px-4 py-2">
        <div className="flex items-center gap-1 md:text-sm text-xs">
          <IoDocumentTextOutline className=" text-neutral-500" />
          <h3 className=" text-neutral-500">{name}.{type}</h3>
        </div>
         <div className="hidden md:flex text-xs md:text-sm items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 border bg-red-300 border-red-600" />
            <h3 >High</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 border bg-yellow-300 border-yellow-600" />
            <h3 >Medium</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 border bg-emerald-300 border-emerald-600" />
            <h3 >Low</h3>
          </div>

        </div>
      </div>
      {/* document heatmap */}
      <div className="text-container h-90 md:h-full overflow-y-auto p-4 text-neutral-800 dark:text-neutral-300">
        {segments.map((seg, i) => {
          const {setSelectedClause,selectedClauseId} = useSelectedClauseStore(s=>s)
          // plain text no clause
          if (!seg.clause) return <span key={i}>{seg.text}</span>;
          // Highlighted clause
          let clause = seg.clause
          const cfg = riskConfig[clause.risk];
          const isActive = hoveredId === clause.id || selectedClauseId === clause.id;


          return (
            <span
              key={i}
              onMouseEnter={() => setHoveredId(clause.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedClause(clause.id)}
              style={{
                background: isActive ? cfg.highlightHover : cfg.highlight,
                borderBottom: isActive ? `2px solid ${cfg.tag}` : "0px solid",
                borderRadius: "3px",
                padding: "1px 3px",
                cursor: "pointer",
                transition: "background 0.12s",
              }}
            >
              {seg.text}
            </span>
          );
        })}
      </div>
      {/* bottom bar */}
      <div className="md:hidden w-full flex justify-center text-neutral-500 dark:text-neutral-400 items-center border-t border-neutral-300 dark:border-neutral-800 px-4 py-2">
         <div className="flex text-xs md:text-sm items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 border bg-red-300 border-red-600" />
            <h3 >High</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 border bg-yellow-300 border-yellow-600" />
            <h3 >Medium</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 border bg-emerald-300 border-emerald-600" />
            <h3 >Low</h3>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DocumentHeatmap