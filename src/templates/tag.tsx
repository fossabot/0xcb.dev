import Layout from '../components/Layout';
import React, {FunctionComponent} from 'react';
import {graphql, Link} from 'gatsby';
import DefaultHeader from '../components/DefaultHeader';
import Subheader from '../components/common/Subheader';
import PostCard from '../components/common/PostCard';
import GhostPost from '../models/GhostPost';
import GhostTag from '../models/GhostTag';
import SiteMeta from '../components/meta/SiteMeta';

interface TagProps {
  data: {
    allGhostPost: {
      edges: Array<{
        node: GhostPost,
      }>,
    }
    ghostTag: GhostTag,
  };
  location: Location;
}

const Tag: FunctionComponent<TagProps> = ({data, location}) => {
  const posts = data.allGhostPost.edges.map((node) => node.node);
  const tag   = data.ghostTag;

  return (
    <Layout header={<DefaultHeader/>}>
      <SiteMeta title={tag.name} location={location}/>
      <Subheader title={tag.name}
                 subtitle={`${posts.length} posts`}
                 classes={[`subheader--tag-${tag.slug}`]}
                 addition={<Link to={`tags`}>View all tags</Link>}/>
      <div className={'tag-archive'}>
        <div className={'tag-archive__posts'}>
          {posts.map((post, index) => (
            <PostCard post={post} key={index}/>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;

export const query = graphql`
  query($slug: String!) {
    ghostTag(slug: { eq: $slug }) {
      ...GhostTagFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] },
      filter: {tags: {elemMatch: {slug: {eq: $slug}}}}
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
