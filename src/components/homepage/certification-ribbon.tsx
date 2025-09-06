import Image from "next/image";

import { certificationRibbon } from "../../app/lib/certification-data";

export default function CertificationRibbon() {

    return (
        certificationRibbon.map((certification) =>
            <div key={certification.logo} className="flex-shrink-0 sm:grow px-6">
                {
                    certification.link ?
                        <a key={certification.logo} href={certification.link} target="_blank" className="mx-auto certification-image align-middle drop-shadow-[0_0_4px_rgba(255,255,255,0.75)] dark:drop-shadow-none hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.75)] dark:hover:drop-shadow-xl">
                            <Image src={certification.logo} width={165} height={150} alt={certification.altText} priority={false} />
                        </a> :
                        <Image key={certification.logo} src={certification.logo} width={165} height={150} className="mx-auto certification-image align-middle" alt={certification.altText} priority={false} />
                }
            </div>
        )
    );
}