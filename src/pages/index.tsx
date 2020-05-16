import React, { FunctionComponent } from "react"
import Layout from "../components/Layout"
import HomeHeader from "../components/home/HomeHeader"
import { graphql, Link } from "gatsby"
import PostCard from "../components/common/PostCard"
import TagList from "../components/home/TagList"
import GhostPost from "../models/GhostPost"
import SocialIcons from "../components/common/SocialIcons"
import SiteMeta from "../components/meta/SiteMeta"
import Img, { FixedObject } from "gatsby-image"

interface IndexProps {
  data: {
    allGhostPost: {
      edges: Array<{ node: GhostPost }>
    }
    avatar: {
      childImageSharp: {
        fixed: FixedObject
      }
    }
  }
  location: Location
}

const IndexPage: FunctionComponent<IndexProps> = ({ data, location }) => {
  const posts = data.allGhostPost.edges

  return (
    <>
      <SiteMeta location={location} />

      <Layout header={<HomeHeader />} classNames={[`home`]}>
        <div className={`home-container`}>
          <div className={`home-container__last-post`}>
            <PostCard
              post={posts[0].node}
              showTag={true}
              additionalClassNames={[`post-card--first`]}
            />
          </div>
          <div className={`home-container__sidebar`}>
            <div className={`home-container__sidebar-content`}>
              <div className={`home-container__sidebar-about`}>
                <Img
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={`Me.`}
                  className={`home-container__sidebar-avatar`}
                />
                Hi my name is Conor. I sometimes write on{" "}
                <strong>0xcb.dev</strong> about technology and all that kind of
                stuff.
                <SocialIcons />
              </div>
            </div>
          </div>
          {[...posts].splice(1).map(({ node }, index) => (
            <div className={`home-container__post`} key={index}>
              <PostCard post={node} showTag={true} />
            </div>
          ))}

          <div className={`home-container__archive-link`}>
            <Link to={"/archive"}>See more</Link>
          </div>
        </div>

        <TagList />
      </Layout>
    </>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allGhostPost(limit: 5) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
    avatar: file(relativePath: { eq: "about/me-sm.jpg" }) {
      childImageSharp {
        fixed(width: 90, height: 90, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
