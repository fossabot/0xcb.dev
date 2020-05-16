import { graphql } from "gatsby"

export const ghostPostFields = graphql`
  fragment GhostPostFields on GhostPost {
    # Main fields
    id
    title
    slug
    featured
    feature_image
    excerpt
    custom_excerpt
    # Dates formatted
    created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
    published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
    updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")
    # Dates unformatted
    created_at
    published_at
    updated_at
    # SEO
    meta_title
    meta_description
    og_description
    og_image
    og_title
    twitter_description
    twitter_image
    twitter_title
    # Authors
    authors {
      name
      slug
      bio
      # email
      profile_image
      twitter
      facebook
      website
    }
    primary_author {
      name
      slug
      bio
      # email
      profile_image
      twitter
      facebook
      website
    }
    # Tags
    primary_tag {
      name
      slug
      description
      feature_image
      meta_description
      meta_title
      visibility
    }
    tags {
      name
      slug
      description
      feature_image
      meta_description
      meta_title
      visibility
    }
    # Content
    plaintext
    html
    # Additional fields
    url
    uuid
    page
    codeinjection_foot
    codeinjection_head
    comment_id
  }
`

export const ghostTagFields = graphql`
  fragment GhostTagFields on GhostTag {
    slug
    name
    visibility
    feature_image
    description
    meta_title
    meta_description
  }
`

export const ghostPageFields = graphql`
  fragment GhostPageFields on GhostPage {
    # Main fields
    title
    slug
    featured
    feature_image
    excerpt
    custom_excerpt
    # Dates formatted
    created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
    published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
    updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")
    # Dates unformatted
    created_at
    published_at
    updated_at
    # SEO
    meta_title
    meta_description
    og_description
    og_image
    og_title
    twitter_description
    twitter_image
    twitter_title
    # Authors
    authors {
      name
      slug
      bio
      # email
      profile_image
      twitter
      facebook
      website
    }
    primary_author {
      name
      slug
      bio
      # email
      profile_image
      twitter
      facebook
      website
    }
    # Tags
    primary_tag {
      name
      slug
      description
      feature_image
      meta_description
      meta_title
      visibility
    }
    tags {
      name
      slug
      description
      feature_image
      meta_description
      meta_title
      visibility
    }
    # Content
    plaintext
    html
    # Additional fields
    url
    uuid
    page
    codeinjection_foot
    codeinjection_head
    comment_id
  }
`

export const ghostSettingsFields = graphql`
  fragment GhostSettingsFields on GhostSettings {
    title
    description
    logo
    icon
    cover_image
    facebook
    twitter
    lang
    timezone
    navigation {
      label
      url
    }
  }
`
