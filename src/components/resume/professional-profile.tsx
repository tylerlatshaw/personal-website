import Image from "next/image";

import { certificationRibbon } from "../../app/lib/certification-data";
import { professionalProfile } from "../../app/lib/resume-data";

export default function CertificationRibbon() {

    function renderCertificationRibbon() {
        return (
            certificationRibbon.map((certification) =>
                <div key={certification.logo} className="mx-auto certification-image flex align-middle items-stretch">
                    {
                        certification.link ?
                            <a key={certification.logo} href={certification.link} target="_blank" className="flex align-middle hover:drop-shadow-2xl">
                                <Image src={certification.logo} width={165} height={150} alt={certification.altText} priority={false} />
                            </a> :
                            <Image key={certification.logo} src={certification.logo} width={165} height={150} className="flex align-middle" alt={certification.altText} priority={false} />
                    }

                </div>
            )
        );
    }

    return (
        <>
            <blockquote className="text-lg md:text-2xl font-semibold text-center md:text-left text-white px-4">
                {professionalProfile}
            </blockquote>

            <div className="hidden md:flex flex-col md:flex-row w-full my-8 p-2 rounded-lg bg-white shadow-xl shadow-white/40">
                {renderCertificationRibbon()}
            </div>
        </>
    );
}