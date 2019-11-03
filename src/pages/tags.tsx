import React, {FunctionComponent} from 'react';
import Layout from "../components/Layout";
import DefaultHeader from '../components/DefaultHeader';
import {graphql, Link} from 'gatsby';
import Subheader from '../components/common/Subheader';
import GhostTag from '../models/GhostTag';
import SiteMeta from '../components/meta/SiteMeta';

interface TagsProps {
  data: {
    allGhostTag: {
      edges: Array<{node: GhostTag }>,
    },
  };
  location: Location;
}

const Tags: FunctionComponent<TagsProps> = ({data, location}) => {
  const tags = data.allGhostTag.edges.map(node => node.node);

  return (
    <Layout header={<DefaultHeader/>}>
      <SiteMeta title={`All tags`} location={location}/>
      <Subheader title={`Tags`} classes={[`subheader--dark`]} subtitle={`Many tags, handle it!`}/>

      <div className={`tags`}>
        {tags.map((tag, index) => (
          <Link to={`/tag/${tag.slug}`} className={`tags__single-tag`} key={index}>
            {tag.feature_image && (
              <img src={tag.feature_image} className={`tags__icon`} alt={tag.name} />
            )}
            {tag.name}
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Tags;

export const query = graphql`
  query {
    allGhostTag {
      edges {
        node {
          ...GhostTagFields
        }
      }
    }
  }
`;
