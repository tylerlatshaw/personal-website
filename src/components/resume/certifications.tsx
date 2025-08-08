import Image from "next/image";
import { certificationRibbon, certificationRibbonType } from "../../app/lib/certification-data";
import { Card } from "@mui/material";

export default function CertificationsList() {

    function certificationCard(certification: certificationRibbonType) {

        const { name, altText, logo } = certification;

        return <>
            {
                <Card className="!justify-between !bg-gray-800 !shadow-xl !shadow-gray-900/70 !rounded-lg">
                    <div className="p-4 text-white">
                        <div className="flex justify-center">
                            <Image src={logo} width={165} height={150} alt={altText} className="drop-shadow-[0_0_24px_rgb(255,255,255,0.3)] group-hover:drop-shadow-[0_0_24px_rgb(255,255,255,0.5)]" />
                        </div>
                        <div className="flex items-center w-full min-h-[56px] mt-3 text-center">
                            <div className="w-full text-lg font-semibold group-hover:text-green-500 group-hover:drop-shadow line-clamp-2">
                                {name}
                            </div>
                        </div>
                    </div>
                </Card>
            }
        </>;
    }

    return (
        <>
            <div className="flex flex-wrap w-full mt-6">
                {
                    certificationRibbon.map((certification) =>
                        <div key={certification.altText} className="flex flex-wrap p-2 items-stretch w-1/2 sm:w-1/3 xl:basis-1/5 h-full">
                            {
                                certification.link ?
                                    <a href={certification.link} className="group w-full" target="_blank">{certificationCard(certification)}</a>
                                    : certificationCard(certification)
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
}