import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '#/components/Navbar'

export const Route = createRootRoute({
  component: RootComponent,
})
import { Toaster } from "sonner"
function RootComponent() {
  return (
    <div className="min-h-screen flex-col flex items-center overflow-x-hidden bg-[repeating-linear-gradient(45deg,#d4d4d4_0px,#d4d4d4_1px,transparent_1px,transparent_20px)] dark:bg-[repeating-linear-gradient(45deg,#262626_0px,#262626_1px,transparent_1px,transparent_20px)] dark:bg-neutral-950 dark:text-neutral-100 bg-neutral-200">

      <div
        id="navbar-frame"
        className="w-full flex items-center justify-center border-b border-neutral-400/40 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-950"
      >
        <Navbar />
      </div>

      <main className="max-w-7xl md:h-[calc(100vh-57px)] w-full overflow-x-hidden p-3 md:px-4 border-x border-neutral-400/40 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-950">
        <Toaster/>
        <Outlet />
      </main>
    </div>
  )
}