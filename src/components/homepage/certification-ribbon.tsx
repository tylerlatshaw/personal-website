import Image from "next/image";

import { certificationRibbon } from "../../app/lib/certification-data";

export default function CertificationRibbon() {

    return (
        certificationRibbon.map((certification) =>
            <div key={certification.logo} className="flex-shrink-0 sm:grow px-6">
                {
                    certification.link ?
                        <a key={certification.logo} href={certification.link} target="_blank" className="mx-auto certification-image align-middle hover:drop-shadow-xl">
                            <Image src={certification.logo} width={165} height={150} alt={certification.altText} priority={false} />
                        </a> :
                        <Image key={certification.logo} src={certification.logo} width={165} height={150} className="mx-auto certification-image align-middle" alt={certification.altText} priority={false} />
                }
            </div>
        )
    );
}