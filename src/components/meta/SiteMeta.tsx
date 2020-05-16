import React, { FunctionComponent } from "react"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"
import url from "url"
import ImageMeta from "./ImageMeta"
import GhostPost from "../../models/GhostPost"
import GhostSettings from "../../models/GhostSettings"
import * as config from "../../utils/Config"

interface WebsiteMetaProps {
  data: GhostPost | null
  settings: GhostSettings
  title: string
  description: string
  image: string
  type: string
  location: Location
}

const SiteMeta: FunctionComponent<WebsiteMetaProps> = ({
  data,
  settings,
  title,
  description,
  image,
  type,
  location,
}) => {
  const canonical = url.resolve(config.siteUrl, location.pathname)
  const publisherLogo = url.resolve(
    config.siteUrl,
    settings.logo || config.siteIcon
  )

  let shareImage

  if (!data) {
    title = `${title || config.siteTitleMeta || settings.title}`
    if (title !== config.siteTitleMeta) {
      title += ` - ${config.siteTitleMeta}`
    }
    description =
      description || config.siteDescriptionMeta || settings.description
    shareImage = image || settings.cover_image
  }

  shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      >
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content={settings.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={canonical} />
        {settings.twitter && (
          <meta
            name="twitter:site"
            content={`https://twitter.com/${settings.twitter.replace(
              /^@/,
              ``
            )}/`}
          />
        )}
        {settings.twitter && (
          <meta name="twitter:creator" content={settings.twitter} />
        )}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org/",
            "@type": "${type}",
            "url": "${canonical}",
            ${
              shareImage
                ? `"image": {
              "@type": "ImageObject",
              "url": "${shareImage}",
              "width": "1000",
              "height": "523"
            },`
                : ``
            }
            "publisher": {
              "@type": "Organization",
              "name": "${settings.title}",
              "logo": {
                "@type": "ImageObject",
                "url": "${publisherLogo}",
                "width": 60,
                "height": 60
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://0xcb.dev"
            },
            "description": "${description}"
          }
      `}</script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  )
}

const SiteMetaQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettingsWebsiteMeta {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
      }
    `}
    render={(data) => (
      <SiteMeta settings={data.allGhostSettings.edges[0].node} {...props} />
    )}
  />
)

export default SiteMetaQuery
