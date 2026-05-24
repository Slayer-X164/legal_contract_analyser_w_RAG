import { useState } from "react"
import { RxDownload } from "react-icons/rx"
import File from "./File"
import Loading from "./Loading"
import { useUploadFile } from "#/hooks/useUploadFile"
import { useDocumentNameStore } from "#/store/useStore"
import { IoTrashOutline } from "react-icons/io5"
import { HiOutlineDownload } from "react-icons/hi";
const DragAndDrop = () => {
  const [file, setFile] = useState<File | null>()
  const { mutate, isPending } = useUploadFile()
  const setName = useDocumentNameStore((s) => s.setName)
  const setType = useDocumentNameStore((s) => s.setTypeOfDocument)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile)
    }
  }
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile)
    }
  }
  const handleRemoveFile = () => {
    setFile(null)
  }


  const handleFileUpload = async () => {
    const formdata = new FormData()
    if (file) {
      formdata.append("file", file)
      setName(file?.name.split(".")[0])
      setType(file?.name.split('.').pop() ?? "")
    }
    mutate(formdata)
  }

  return (
    <>
      <section className=" max-w-2xl w-full h-95 md:h-86 rounded-3xl  mt-10 md:mt-6 overflow-hidden ">
        {!isPending ? (
          <div className="w-full relative h-full flex flex-col gap-6 items-center justify-center rounded-3xl border-2 border-neutral-400 dark:border-neutral-700 bg-neutral-300 dark:bg-neutral-900/50 border-dashed " onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            {!file ? (
              <>
                <a href="/Lease_Agreement.docx"
                  download
                   className="absolute border active:scale-95 duration-200 transition-all right-2 top-2 text-[12px] p-2 border-neutral-400/50 shadow-xl shadow-neutral-400/10 bg-neutral-200 text-neutral-600  dark:text-neutral-500 rounded-xl flex items-center gap-1">
                  <HiOutlineDownload className="text-sm" />Download demo contract and test
                </a>
                <div className="flex flex-col items-center justify-center">

                  <h2 className="text-md font-semibold text-neutral-600">Drop your contract here</h2>
                  <h4 className="text-sm text-neutral-500 font-mono pt-0.5 pb-2">Maximum Size:3MB</h4>
                  <h3 className="text-sm text-neutral-500 font-mono pt-0.5">.PDF .DOCX .TXT</h3>

                </div>
                <div className="flex items-center justify-center text-neutral-600 gap-2">
                  <div className="w-30"> <hr /></div>
                  <h3>or</h3>
                  <div className="w-30"> <hr /></div>

                </div>
                <div className="text-neutral-200 hover:bg-neutral-700 mt-2  transition-all duration-300 bg-neutral-800 rounded-lg active:scale-95">
                  <input type="file" id="browse-file" hidden onChange={handleInputChange} accept=".pdf,.docx,.txt" />
                  <label htmlFor="browse-file" >
                    <h3 className="cursor-pointer px-4 py-2 text-md">Browse Files</h3>
                  </label>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-8 ">
                <div className="flex flex-col items-center justify-center gap-3">
                  <File />
                  <p className="text-sm md:text-md ">{file.name}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <button onClick={handleFileUpload} className="w-40 bg-emerald-700  text-neutral-50 text-center p-2 shadow-2xl shadow-emerald-500 dark:shadow-emerald-500/50 dark:bg-emerald-800 rounded-xl hover:bg-emerald-900 active:scale-95 transition-all duration-300 cursor-pointer">
                    <h3>Scan & Analyse</h3>
                  </button>
                  <div onClick={handleRemoveFile} className="text-xl bg-red-600/15 p-2.5 text-red-600 rounded-xl cursor-pointer">
                    <IoTrashOutline />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loading fileName={file ? file.name : ""} />
        )}
      </section>

    </>
  )
}

export default DragAndDrop