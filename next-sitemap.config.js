/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.BASE_URL,
    generateIndexSitemap: false,
    changefreq: "monthly",
    generateRobotsTxt: true,
    exclude: ["/api/*", "/developer", "/development", "/sitemap.xml"],
    additionalPaths: async () => {
        const result = [];

        result.push({
            loc: "/portfolio/project-management-system-report",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/database-management-system-proposal",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/equifax-incident-report",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/enterprise-resource-planning",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/network-assessment",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/medical-informatics-project-plan",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/canning-buying-guide",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/honors-program-transition",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/automate-your-day",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/personal-website",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/days-since-last",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/wordle-analyzer",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        result.push({
            loc: "/portfolio/menu-creator",
            changefreq: "yearly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
        });

        return result;
    }
};  