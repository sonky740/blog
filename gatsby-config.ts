module.exports = {
  siteMetadata: {
    title: `손기연의 블로그`,
    author: {
      name: `손기연`,
      summary: `손기연의 블로그`,
    },
    description: `손기연의 블로그`,
    siteUrl: `https://sonkyblog.vercel.app/`,
    utterances: {
      repo: 'sonky740/comment',
    },
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
            resolve: 'gatsby-remark-vscode',
            options: {
              theme: {
                default: 'Dark+ (default dark)',
                parentSelector: {
                  'body.dark': 'Dark+ (default dark)',
                  'body.light': 'Light+ (default light)',
                },
              },
              injectStyles: false,
            },
          },
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
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-7RW4Q0CZND`],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `손기연의 블로그`,
        short_name: `Sonky`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/resources/images/favicon.svg`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
