import React, { FunctionComponent } from "react"
import Layout from "../components/Layout"
import DefaultHeader from "../components/DefaultHeader"
import { graphql } from "gatsby"
import PostCard from "../components/common/PostCard"
import Subheader from "../components/common/Subheader"
import GhostPost from "../models/GhostPost"
import SiteMeta from "../components/meta/SiteMeta"

interface ArchiveProps {
  data: {
    allGhostPost: {
      edges: Array<{ node: GhostPost }>
    }
  }
  location: Location
}

const ArchivePage: FunctionComponent<ArchiveProps> = ({ data, location }) => {
  const posts = data.allGhostPost.edges.map((node) => node.node)

  return (
    <Layout header={<DefaultHeader />}>
      <SiteMeta title={`Archive`} location={location} />
      <Subheader
        title={`Archive`}
        subtitle={`${data.allGhostPost.edges.length} posts`}
        classes={[`subheader--dark`]}
      />
      <div className={"archive"}>
        {posts.map((post, index) => (
          <PostCard post={post} showTag={true} key={index} />
        ))}
      </div>
    </Layout>
  )
}

export default ArchivePage

export const query = graphql`
  query {
    allGhostPost {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
