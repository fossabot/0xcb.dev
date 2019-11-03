import Layout from '../components/Layout';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {graphql, Link} from 'gatsby';
import * as Prism from 'prismjs';
import DefaultHeader from '../components/DefaultHeader';
import GhostPost from '../models/GhostPost';
import Toc from '../components/common/Toc';
import PostCard from '../components/common/PostCard';
import AboutBox from '../components/common/AboutBox';
import ReadingProgress from '../components/common/ReadingProgress';
import DisqusComments from '../components/common/DisqusComments';
import ArticleMeta from '../components/meta/ArticleMeta';
import {FaAlignJustify, FaTimes} from 'react-icons/fa';

interface PostProps {
  data: {
    post: GhostPost,
    related: {
      edges: Array<{ node: GhostPost }>,
    },
  };
  location: Location;
}

const Post: FunctionComponent<PostProps> = ({data, location}) => {
  useEffect(() => Prism.highlightAll());
  const [showToc, setShowToc] = useState(false);
  const scroll                = React.createRef<HTMLDivElement>();
  const post                  = data.post;
  const related               = data.related.edges.filter(relatedPost => relatedPost.node.id !== post.id);

  const toggleToc = () => {
    setShowToc(!showToc);
  };

  // Oh boy...
  post.html = post.html.replace(
    '<figure class="kg-card kg-embed-card"><iframe',
    '<figure class="kg-card kg-embed-card iframe-embed"><iframe',
  );

  return (
    <Layout header={<DefaultHeader/>} classNames={[`single-post`]}>
      <ArticleMeta post={post} canonical={location} location={location}/>
      <ReadingProgress tag={post.primary_tag.slug} target={scroll}/>
      <div className={'post'} ref={scroll}>
        <div className={'post__sidebar-left'}>
          <button className={`post__toggle-toc-button`}
                  onClick={toggleToc}
                  role={`button`}
                  aria-label={`Toggle table of contents`}>
            {!showToc ? <FaAlignJustify/> : <FaTimes/>}
          </button>
          <div className={`post__toc ${showToc ? 'post__toc--show-mobile' : ''}`}>
            <Toc onClick={toggleToc}/>
          </div>
        </div>
        <div className={'post__content'}>
          <header className={`post__header`}>
            <div className={`post__header-meta`}>
              <Link to={`/tag/${post.primary_tag.slug}`}>{post.primary_tag.name}</Link>
              <div>{post.published_at_pretty}</div>
            </div>
            <h1 className={'post__title'}>{post.title}</h1>
          </header>

          {post.feature_image &&
          <div className={'post__feature-image'}>
            <img src={post.feature_image} alt={post.title}/>
          </div>
          }

          <section className={'post__html'} dangerouslySetInnerHTML={{__html: post.html}}/>

          <footer className={`post__footer`}>
            <p>
              Published under {post.tags.map((tag, index) => (
              <span key={index}>
                <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
                {(post.tags.length > index + 1) && (
                  <>, </>
                )}
              </span>
            ))} on {post.published_at_pretty}.
            </p>
            {post.updated_at_pretty !== post.published_at_pretty &&
            <>Latest update on {post.updated_at_pretty}.</>
            }
          </footer>
        </div>
        <div className={'post__sidebar-right'}>
          <div className={`post__sidebar-right-content`}>

            {related.length > 0 &&
            <div className={`post__related-posts`}>
              <h3 className={`post__related-title`}>You may also like</h3>
              {related.map(({node}, index) => (
                <PostCard post={node} key={index} additionalClassNames={[`post-card--in-sidebar`]}/>
              ))}
            </div>
            }
          </div>
        </div>
      </div>
      <div className={`post-addition`}>
        <div className={'post-addition__container'}>

          <div className={`post-addition__about`}>
            <AboutBox post={post}/>
          </div>
        </div>
      </div>
      <div className={`comments`}>
        <div className={`comments__sidebar-left`}/>
        <div className={`comments__content`}>
          <DisqusComments identifier={post.comment_id} title={post.title} slug={post.slug}/>
        </div>
        <div className={`comments__sidebar-right`}/>
      </div>
    </Layout>
  );
};

export default Post;

export const query = graphql`
  query($slug: String!, $primaryTagSlug: String!) {
    post: ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
    }
    related: allGhostPost(limit: 3, filter: {tags: {elemMatch: {slug: {eq: $primaryTagSlug}}}}) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
