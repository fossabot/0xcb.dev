const generateFeed = require("./src/utils/Helper.js")
const config = require("./src/utils/Helper.js")

require("dotenv").config({
  path: `.env`,
})

const lunrPlugin = (lunr) => (builder) => {
  // removing stemmer
  builder.pipeline.remove(lunr.stemmer)
  builder.searchPipeline.remove(lunr.stemmer)
}

const plugins = [
  `gatsby-plugin-sass`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Conor Burns Blog`,
      short_name: `C.B.`,
      start_url: `/`,
      background_color: `#42566a`,
      theme_color: `#42566a`,
      display: `standalone`,
      icon: `src/images/logo.svg`, // This path is relative to the root of the site.
    },
  },
  {
    resolve: `gatsby-source-ghost`,
    options: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  },
  {
    resolve: `gatsby-plugin-lunr`,
    options: {
      languages: [
        {
          name: "en",
          plugins: [lunrPlugin],
        },
      ],
      fields: [
        { name: "slug", store: true },
        { name: "title", store: true, attributes: { boost: 20 } },
        { name: "content", store: true },
        { name: "excerpt", store: true },
        { name: "tags", store: true },
      ],
      resolvers: {
        GhostPost: {
          slug: (node) => node.slug,
          title: (node) => node.title,
          content: (node) => node.plaintext,
          excerpt: (node) => node.excerpt,
          tags: (node) => node.tags,
        },
      },
    },
  },
  `gatsby-plugin-twitter`,
  "gatsby-plugin-offline",
  {
    resolve: `gatsby-plugin-advanced-sitemap`,
    options: {
      query: `
          {
            allGhostPost {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostPage {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostTag {
              edges {
                node {
                  id
                  slug
                  feature_image
                }
              }
            }
            allGhostAuthor {
              edges {
                node {
                  id
                  slug
                  profile_image
                }
              }
            }
          }`,
      mapping: {
        allGhostPost: {
          sitemap: `posts`,
        },
        allGhostTag: {
          sitemap: `tags`,
        },
        allGhostPage: {
          sitemap: `pages`,
        },
      },
      exclude: [`/dev-404-page`, `/404`, `/404.html`, `/offline`],
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          allGhostSettings {
            edges {
              node {
                title
                description
              }
            }
          }
        }
      `,
      feeds: [generateFeed(config)],
    },
  },
]

if (process.env.GA_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GA_TRACKING_ID,
      anonymize: true,
    },
  })
}

module.exports = {
  siteMetadata: {
    siteUrl: "https://0xcb.dev",
    title: "Burns",
    description: "Thoughts, stories and ideas.",
    author: `@conorlburns`,
  },
  plugins,
}
