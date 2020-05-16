import React, { FunctionComponent } from "react"
import { DiscussionEmbed } from "disqus-react"

interface DisqusCommentsProps {
  identifier: string
  title: string
  slug: string
}

const DisqusComments: FunctionComponent<DisqusCommentsProps> = ({
  identifier,
  title,
  slug,
}) => {
  if (typeof window === "undefined") {
    return <></>
  }

  ;(window as any).disqus_developer = process.env.GATSBY_ENV === "dev"

  const disqusConfig = {
    identifier: `ghost-${identifier}`,
    title,
  }

  return <DiscussionEmbed shortname={`conorburns`} config={disqusConfig} />
}

export default DisqusComments
