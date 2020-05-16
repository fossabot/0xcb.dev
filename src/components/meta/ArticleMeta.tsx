import React, { FunctionComponent } from "react"
import Helmet from "react-helmet"
import GhostPost from "../../models/GhostPost"
import { graphql, StaticQuery } from "gatsby"
import GhostSettings from "../../models/GhostSettings"
import ImageMeta from "./ImageMeta"
import url from "url"
import * as config from "../../utils/Config"

interface PostMetaProps {
  post: GhostPost
  settings: GhostSettings
  location: Location
}

const ArticleMeta: FunctionComponent<PostMetaProps> = ({
  post,
  settings,
  location,
}) => {
  const canonical = url.resolve(config.siteUrl, location.pathname)
  const shareImage = post.feature_image
    ? post.feature_image
    : settings.cover_image
  const publisherLogo = url.resolve(
    config.siteUrl,
    settings.logo || config.siteIcon
  )
  const author = post.primary_author

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      >
        <title>{post.meta_title || post.title}</title>

        <meta
          name="description"
          content={post.meta_description || post.excerpt}
        />

        <meta property="og:site_name" content={"0xcb.dev"} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={post.og_title || post.meta_title || post.title}
        />
        <meta
          property="og:description"
          content={post.og_description || post.excerpt || post.meta_description}
        />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.published_at} />
        <meta property="article:modified_time" content={post.updated_at} />

        {post.tags.map((keyword, i) => (
          <meta property="article:tag" content={keyword.name} key={i} />
        ))}

        <meta
          name="twitter:title"
          content={post.twitter_title || post.meta_title || post.title}
        />
        <meta
          name="twitter:description"
          content={
            post.twitter_description || post.excerpt || post.meta_description
          }
        />

        <meta name="twitter:url" content={canonical as any} />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={author.name} />

        {post.primary_tag && (
          <meta name="twitter:label2" content="Filed under" />
        )}
        {post.primary_tag && (
          <meta name="twitter:data2" content={post.primary_tag.name} />
        )}

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
              "@type": "Article",
              "author": {
                  "@type": "Person",
                  "name": "${post.primary_author.name}",
                  ${
                    author.profile_image
                      ? `"image": ${author.profile_image}`
                      : ``
                  }
              },
              ${
                post.tags.length ? `"keywords": "${post.tags.join(`, `)}",` : ``
              }
              "headline": "${post.meta_title || post.title}",
              "url": "${canonical}",
              "datePublished": "${post.published_at}",
              "dateModified": "${post.updated_at}",
              ${
                shareImage
                  ? `"image": {
               "@type": "ImageObject",
                "url": "${shareImage}",
                "width": "${config.shareImageWidth}",
                "height": "${config.shareImageHeight}"
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
              "description": "${post.meta_description || post.excerpt}",
              "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "${config.siteUrl}"
              }
          }
      `}</script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  )
}

const ArticleMetaQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettingsArticleMeta {
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
      <ArticleMeta settings={data.allGhostSettings.edges[0].node} {...props} />
    )} // tslint:disable-line
  />
)

export default ArticleMetaQuery
