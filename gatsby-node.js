/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  /**
   * Posts
   */
  const createPosts = new Promise((resolve, reject) => {
    const postTemplate = path.resolve(`./src/templates/post.tsx`);
    resolve(
      graphql(`
        {
          allGhostPost(
            sort: {order: ASC, fields: published_at}
          ) {
            edges {
              node {
                slug
                primary_tag {
                  slug
                }
              }
            }
          }
        }`
      ).then((result) => {
        if (result.errors) {
          return reject(result.errors)
        }

        if (!result.data.allGhostPost) {
          return resolve()
        }

        const items = result.data.allGhostPost.edges;

        items.forEach(({ node }) => {
          // This part here defines, that our posts will use
          // a `/:slug/` permalink.
          node.url = `/${node.slug}/`;

          createPage({
            path: node.url,
            component: path.resolve(postTemplate),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.slug,
              primaryTagSlug: node.primary_tag.slug
            }
          })
        });

        return resolve();
      })
    )
  });

  /**
   * Tags
   */
  const createTags = new Promise((resolve, reject) => {
    const tagsTemplate = path.resolve(`./src/templates/tag.tsx`);
    resolve(
      graphql(`
        {
          allGhostTag(
            sort: {order: ASC, fields: name}
          ) {
            edges {
              node {
                slug
                url
              }
            }
          }
        }`
      ).then((result) => {
        if (result.errors) {
          return reject(result.errors)
        }

        if (!result.data.allGhostTag) {
          return resolve()
        }

        const items = result.data.allGhostTag.edges;

        items.forEach(({ node }) => {
          // This part here defines, that our tag pages will use
          // a `/tag/:slug/` permalink.
          node.url = `/tag/${node.slug}/`;

          createPage({
            path: node.url,
            component: path.resolve(tagsTemplate),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.slug
            }
          });
        });

        return resolve();
      })
    )
  });

  /**
   * Pages
   */
  const createPages = new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`./src/templates/page.tsx`);
    resolve(
      graphql(`
        {
          allGhostPage(
            sort: {order: ASC, fields: published_at}
          ) {
            edges {
              node {
                slug
                url
              }
            }
          }
        }`
      ).then((result) => {
        if (result.errors) {
          return reject(result.errors)
        }

        if (!result.data.allGhostPage) {
          return resolve()
        }

        const items = result.data.allGhostPage.edges;

        items.forEach(({ node }) => {
          // This part here defines, that our posts will use
          // a `/:slug/` permalink.
          node.url = `/${node.slug}/`;

          createPage({
            path: node.url,
            component: path.resolve(pageTemplate),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.slug,
            }
          })
        });

        return resolve();
      })
    )
  });

  return Promise.all([createPosts, createTags, createPages]);
};
