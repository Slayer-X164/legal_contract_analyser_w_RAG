import DragAndDrop from '#/components/DragAndDrop'
import { Footer } from '#/components/Footer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
    <main className="flex items-center flex-col  justify-center  gap-4 h-screen md:h-full">
      <div className='text-center mt-6 md:pt-0'>
        <h1 className="text-4xl font-bold capitalize">know what you are signing</h1>
        <p className="mt-4 text-sm md:text-base capitalize text-neutral-500">
          upload any document/contract and get an instant clause-by-clause <br /> risk breakdown with suggested rewrites
        </p>
      </div>
      <DragAndDrop/>
      <Footer/>
    </main>

    </>
  )
}
