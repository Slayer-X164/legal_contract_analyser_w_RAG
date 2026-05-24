import { SiTablecheck } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="w-full  py-6 px-4">
      <div className="max-w-6xl mx-auto flex  flex-col items-center justify-between gap-4 text-sm dark:text-neutral-500 text-neutral-400">

        <div className="text-center  md:text-left">
          <h3 className="font-semibold text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1 text-base">
            <SiTablecheck className="text-base"/>
            ClauseGuard
          </h3>
          <p className="mt-1 text-center font-medium">
            Your documents are processed securely and are <br /> never stored in any database.
          </p>
        </div>


      </div>
    </footer>
  );
};