module.exports = {
  siteMetadata: {
    title: `손기연의 블로그`,
    author: {
      name: `손기연`,
      summary: `손기연의 블로그`,
    },
    description: `손기연의 블로그`,
    siteUrl: `https://sonkyblogs.gatsbyjs.io`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/resources/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              theme: 'one-dark'
            }
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingId: `G-7RW4Q0CZND`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `손기연의 블로그`,
        short_name: `Sonky`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/resources/images/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-typescript`,
    //   options: {
    //     isTSX: true,
    //     jsxPragma: 'jsx',
    //     allExtensions: true,
    //   },
    // }
  ],
}
