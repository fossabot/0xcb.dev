const cheerio = require("cheerio")

const generateItem = (post) => {
  const itemUrl = post.url
  const html = post.html
  const htmlContent = cheerio.load(html, {
    decodeEntities: false,
    xmlMode: true,
  })
  const item = {
    title: post.title,
    description: post.excerpt,
    guid: post.id,
    url: itemUrl,
    date: post.published_at,
    categories: post.tags.map((tag) => tag.name),
    author: post.primary_author.name,
    custom_elements: [],
  }
  let imageUrl

  if (post.feature_image) {
    imageUrl = post.feature_image

    item.custom_elements.push({
      "media:content": {
        _attr: {
          url: imageUrl,
          medium: `image`,
        },
      },
    })

    htmlContent(`p`)
      .first()
      .before(`<img src="` + imageUrl + `" />`)
    htmlContent(`img`).attr(`alt`, post.title)
  }

  item.custom_elements.push({
    "content:encoded": {
      _cdata: htmlContent.html(),
    },
  })

  return item
}

const generateFeed = (siteConfig) => {
  return {
    serialize: ({ query: { allGhostPost } }) =>
      allGhostPost.edges.map((edge) =>
        Object.assign({}, generateItem(edge.node))
      ),
    setup: ({ query: { allGhostSettings } }) => {
      const title = allGhostSettings.edges[0].node.title || `No title`
      const siteDescription =
        allGhostSettings.edges[0].node.description || `No Description`
      const feed = {
        title,
        description: siteDescription,
        feed_url: `${siteConfig.siteUrl}/rss/`,
        site_url: `${siteConfig.siteUrl}/`,
        image_url: `${siteConfig.siteUrl}/${siteConfig.siteIcon}`,
        ttl: `60`,
        custom_namespaces: {
          content: `http://purl.org/rss/1.0/modules/content/`,
          media: `http://search.yahoo.com/mrss/`,
        },
      }
      return {
        ...feed,
      }
    },
    query: `
    {
      allGhostPost(
          sort: {order: DESC, fields: published_at}
      ) {
        edges {
          node {
            # Main fields
            id
            title
            slug
            featured
            feature_image
            created_at
            published_at
            updated_at
            excerpt
            meta_title
            meta_description
            # Authors
            authors {
                name
            }
            primary_author {
                name
            }
            tags {
                name
                visibility
            }
            html
            url
          }
        }
      }
    }
  `,
    output: `/rss.xml`,
  }
}

module.exports = generateFeed
