import React, { FunctionComponent } from "react"
import { Link } from "gatsby"
import GhostPost from "../../models/GhostPost"

interface PostCard {
  post: GhostPost
  showTag?: boolean
  additionalClassNames?: string[]
}

const PostCard: FunctionComponent<PostCard> = ({
  post,
  showTag = false,
  additionalClassNames = [],
}) => {
  return (
    <Link
      to={"/" + post.slug}
      className={"post-card " + additionalClassNames.join(" ")}
    >
      {post.feature_image && (
        <div
          className={"post-card__feature-image"}
          style={{ backgroundImage: `url(${post.feature_image})` }}
        />
      )}
      <div className={`post-card__content`}>
        <div className={`post-card__meta`}>
          {showTag && (
            <span className={`post-card__tag`}>{post.primary_tag.name}</span>
          )}
          <span className={`post-card__date`}>{post.published_at_pretty}</span>
        </div>
        <h2 className={"post-card__title"}>{post.title}</h2>
        <p className={"post-card__excerpt"}>{post.excerpt}</p>
      </div>
    </Link>
  )
}

export default PostCard
