"use client";

import { useState } from "react";

import Hamburger from "hamburger-react";

import GitCommands from "./developer-git-commands";
import ManageCurrentlyReading from "./developer-manage-currently-reading";
import ManageEmails from "./developer-emails";
import ManageVinylCollection from "./developer-manage-vinyl-collection";
import NetlifyCommands from "./developer-netlify-commands";
import NodeCommands from "./developer-node-commands";
import SupabaseCommands from "./developer-supabase-commands";

import type { DeveloperItemType } from "../../app/lib/type-library";

export default function DeveloperContainer() {

  const modules: DeveloperItemType[] = [
    {
      title: "Manage Emails",
      content: <ManageEmails />,
      index: 0
    },
    {
      title: "Manage Currently Reading",
      content: <ManageCurrentlyReading />,
      index: 1
    },
    {
      title: "Manage Vinyl Collection",
      content: <ManageVinylCollection />,
      index: 2
    },
    {
      title: "Git CLI Commands",
      content: <GitCommands />,
      index: 3
    },
    {
      title: "Netlify CLI Commands",
      content: <NetlifyCommands />,
      index: 4
    },
    {
      title: "Node CLI Commands",
      content: <NodeCommands />,
      index: 5
    },
    {
      title: "Supabase CLI Commands",
      content: <SupabaseCommands />,
      index: 6
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePageName, setActivePageName] = useState<string>(modules[1].title);

  const desktopActiveClasses = "w-full py-6 bg-gray-800 border-l-8 border-y-2 border-green-600 border-r-2 border-r-transparent first:rounded-tl-lg last:rounded-bl-lg cursor-default";
  const desktopInactiveClasses = "w-full py-6 bg-gray-600 border-l-8 border-l-transparent border-r-2 border-green-600 border-t-2 border-t-gray-500 first:border-t-transparent border-b-2 border-b-transparent hover:bg-green-600 hover:border-y-green-600 hover:text-white first:rounded-tl-lg last:rounded-bl-lg";

  const mobileActiveClasses = "flex items-center w-full bg-green-600 text-white hover:bg-green-600 hover:text-white last:rounded-b-lg cursor-default";
  const mobileInactiveClasses = "flex items-center w-full bg-gray-600 hover:bg-green-600 hover:text-white last:rounded-b-lg";

  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        <div className="z-10 desktop-only flex flex-col w-full md:w-1/5">
          <div className="shadow-lg shadow-gray-800">

            {modules.map((module) => {
              if (module.index === activeIndex)
                return <button key={module.title} onClick={() => setActiveIndex(module.index)} className={desktopActiveClasses}>{module.title}</button>;
              else
                return <button key={module.title} onClick={() => setActiveIndex(module.index)} className={desktopInactiveClasses}>{module.title}</button>;
            })}

          </div>
          <div className="w-full h-full border-r-2 border-green-600">
          </div>
        </div>

        <div className="mobile-only mb-6 border-2 border-green-600 bg-gray-800 rounded-lg">
          <div className={"w-full pl-3 pr-1 text-left" + (isOpen ? " rounded-t-lg" : " rounded-lg")}>
            <span className="flex flex-row font-semibold">
              <div className="flex items-center basis-full">
                <span>Navigation</span>
                <span className="text-gray-400">&nbsp;/ {activePageName}</span>
              </div>
              <span className="flex items-center">
                <Hamburger toggled={isOpen} toggle={setIsOpen} size={18} rounded label="Show menu" color={isOpen ? "#16a34a" : "#FFFFFF"} hideOutline={false} />
              </span>
            </span>
          </div>

          {isOpen ? <>
            {modules.map((module) => (
              module.index === activeIndex ?
                <>
                  <li key={module.title} className={mobileActiveClasses}>
                    <button className="w-full px-3 py-3" onClick={() => { setActiveIndex(module.index); setIsOpen(false); setActivePageName(module.title); }}>
                      {module.title}
                    </button>
                  </li>
                </> : <>
                  <li key={module.title} className={mobileInactiveClasses}>
                    <button className="w-full px-3 py-3" onClick={() => { setActiveIndex(module.index); setIsOpen(false); setActivePageName(module.title); }}>
                      {module.title}
                    </button>
                  </li>
                </>
            ))}
          </> : null}
        </div>

        <div className="z-20 bg-gray-800 shadow-lg shadow-gray-800 w-full md:w-4/5 px-6 md:px-12 py-4 border-2 md:border-y-2 md:border-r-2 md:border-l-0 border-green-600 rounded-lg md:rounded-l-none mx-auto">
          <div className="w-full mx-auto my-8">
            {
              modules.map((module) => {
                if (module.index === activeIndex)
                  return <div key={module.index}>{module.content}</div>;
                else
                  return null;
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}
