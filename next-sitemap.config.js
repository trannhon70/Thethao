const siteUrl = "https://thethaosh.com/";
// const siteUrl = "http://localhost:8000/";
module.exports = {
  siteUrl,
  exclude: ["/404"],
  generateRobotsTxt: true,
   sitemapBaseFileName: "page-sitemap",
  changefreq: "weekly",
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404", "https://admin.thethaosh.com/", "/readme.html", "https://api.thethaosh.com"],
      },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}post-sitemap.xml`,
      // `${siteUrl}tag-sitemap.xml`,
      `${siteUrl}category-sitemap.xml`,
      // `${siteUrl}tuyendung-sitemap.xml`,
    ],
  },
};
