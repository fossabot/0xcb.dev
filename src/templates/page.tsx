import Layout from '../components/Layout';
import React, {FunctionComponent} from 'react';
import {graphql} from 'gatsby';
import DefaultHeader from '../components/DefaultHeader';
import GhostPost from '../models/GhostPost';
import Subheader from '../components/common/Subheader';
import PostCard from '../components/common/PostCard';
import ArticleMeta from '../components/meta/ArticleMeta';

interface PageProps {
  data: {
    page: GhostPost,
    latestPosts: {
      edges: Array<{ node: GhostPost }>,
    },
  };
  location: Location;
}

const Page: FunctionComponent<PageProps> = ({data, location}) => {
  const page        = data.page;
  const latestPosts = data.latestPosts.edges;

  return (
    <Layout header={<DefaultHeader/>}>
      <ArticleMeta post={page} canonical={location} location={location}/>
      <Subheader title={page.title}/>
      <div className={`page`}>
        <div className={`page__content`} dangerouslySetInnerHTML={{__html: page.html}}/>
        <div className={`page__sidebar`}>
          <div className={`page__sidebar-content`}>

            <h3 className={`page__sidebar-title`}>Latest posts</h3>
            {latestPosts.map(({node}, index) => (
              <PostCard post={node} key={index} additionalClassNames={[`post-card--in-sidebar`]}/>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query($slug: String!) {
    page: ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
    }
    latestPosts: allGhostPost(limit: 3) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
