import CertificationRibbon from "../../../components/homepage/certification-ribbon";
import MainInfoSection from "../../../components/homepage/main-info";
import QuickPages from "../../../components/homepage/quick-pages";

export default function Page() {
  return <>
    <div className="h-full px-4 md:px-0">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <MainInfoSection />
      </div>
    </div>

    <div className="certification-ribbon mt-24 md:mt-36 mx-auto flex w-100 bg-slate-300 dark:bg-white items-center drop-shadow-[0_20px_16px_rgba(255,255,255,0.75)] dark:drop-shadow-[0_20px_16px_rgba(0,0,0,0.25)]">
      <div className="certification-ribbon w-100 my-3 grow max-w-screen-xl mx-auto overflow-x-auto ">
        <div className="certification-ribbon mx-auto flex flex-row items-center w-100">
          <CertificationRibbon />
        </div>
      </div>
    </div>

    {/* Main */}
    <div className="container my-8 md:my-16 md:pb-8 px-4 md:px-0 flex flex-wrap flex-col md:flex-row items-center mx-auto">
      <h2>Get to Know Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mt-2 w-full text-center justify-items-center">
        <QuickPages />
      </div>
    </div>
  </>;
}