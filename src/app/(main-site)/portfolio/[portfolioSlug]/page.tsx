import DocumentViewer from "../../../../components/portfolio/document-viewer";
import NotFound from "../../../../components/portfolio/not-found";

import { portfolioOptions } from "../../../lib/portfolio-data";

export default function Page({ params }: { params: { portfolioSlug: string } }) {

    const portfolioData = portfolioOptions.find((option) => option.portfolioSlug === params.portfolioSlug);

    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">
                {
                    portfolioData !== undefined ?
                        <>
                            <DocumentViewer
                                portfolioSlug={params.portfolioSlug}
                                name={portfolioData?.name!}
                                isFeatured={portfolioData?.isFeatured!}
                                description={portfolioData?.description!}
                                date={portfolioData?.date!}
                                associatedWith={portfolioData?.associatedWith!}
                                previewLink={portfolioData?.previewLink!}
                                assetLink={portfolioData?.assetLink!} 
                                order={portfolioData?.order!} 
                                webLink={portfolioData?.webLink!}
                                category={portfolioData?.category}
                                createdWith={portfolioData?.createdWith}
                            />
                        </> :
                        <NotFound />
                }
            </div>
        </div>
    </>;
}