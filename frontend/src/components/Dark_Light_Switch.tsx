import { useEffect } from "react"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useThemeStore } from "#/store/useStore";
const Dark_Light_Switch = () => {
const theme = useThemeStore((s) => s.theme)
const setTheme = useThemeStore((s) => s.setTheme)

useEffect(() => {
  const saved = localStorage.getItem("theme")

  let initialTheme:Theme = "light"

  if (saved === "dark") {
    initialTheme = "dark"
  } else if (!saved) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (prefersDark) initialTheme = "dark"
  }

  setTheme(initialTheme)
  document.documentElement.classList.toggle("dark", initialTheme === "dark")
}, [])

const toggleTheme = () => {
  const newTheme = theme === "dark" ? "light" : "dark"

  setTheme(newTheme)
  localStorage.setItem("theme", newTheme)
  document.documentElement.classList.toggle("dark", newTheme === "dark")
}
  return (
    <button
      onClick={toggleTheme}
      className=" flex items-center  rounded-full  transition-colors duration-300 "
    >
      <div
        className={` p-1.5 cursor-pointer relative  rounded-full bg-neutral-300  dark:bg-neutral-800 text-lg transform duration-300 flex items-center justify-center`}
      >

        {theme == "dark" ? <IoMoonOutline className="text-neutral-400" /> : <IoSunnyOutline />}
      </div>
    </button>
  )
}

export default Dark_Light_Switch