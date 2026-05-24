import { FaGithub } from "react-icons/fa"
import Crosshair from "./Crosshair"
import { Link } from "@tanstack/react-router"
import Dark_Light_Switch from "./Dark_Light_Switch"
import { GiClawSlashes } from "react-icons/gi";
import {SiTablecheck} from "react-icons/si"
const Navbar = () => {
  return (
    <div className='max-w-7xl w-full  flex h-14 justify-between items-center px-2 md:px-4 border-x dark:border-neutral-800 border-neutral-400/40  relative'>
      <div className='flex items-center gap-2'>
        <Link to="/" className="font-bold font-sans flex items-center gap-1 text-lg"><SiTablecheck className="text-base"/>ClauseGaurd</Link>
        {/* <h3 className="px-2 py-1 text-sm rounded-sm bg-blue-600/20 text-blue-700">beta</h3> */}
      </div>
      <div className="flex items-center gap-3 flex-row-reverse">
        <a href="https://github.com/Slayer-X164/legal_agreement_risk_analyzer" target="_blank" className="text-neutral-50 shadow-lg shadow-indigo-500/40 flex items-center gap-1.5 px-3 py-1 bg-indigo-800 dark:shadow-indigo-700/30 rounded-lg cursor-pointer">
        <FaGithub />
        <h3 className="text-xs md:text-sm p-0.5">Give a Star</h3>
      </a >
      <Dark_Light_Switch/>
      </div>
      <Crosshair className="absolute -left-1.5 -bottom-1.5"/>
      <Crosshair className="absolute -right-1.5 -bottom-1.5"/>
    </div>
  )
}

export default Navbar