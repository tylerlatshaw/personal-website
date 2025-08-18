import Image from "next/image";

import type { companyDataType } from "../../app/lib/resume-data";

export default function CreatedForSection(organization: companyDataType) {

    return (
        <>
            <div className="w-full flex flex-col">
                <div className="w-full flex flex-row">
                    <div className="pr-3 self-center w-fit md:w-14 lg:w-12 xl:w-fit">
                        <Image src={organization.avatar!} width={12} height={12} alt={organization.company} priority={false} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" />
                    </div>
                    <div className="flex flex-col self-center w-fit">
                        <span className="text-sm">
                            Created For: <br />
                            <span className="font-semibold text-sm xl:text-base">
                                {organization.company}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}