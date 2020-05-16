import React, { FunctionComponent, RefObject, useEffect, useState } from "react"

interface ReadingProgressProps {
  tag: string
  target: RefObject<HTMLElement>
}

const ReadingProgress: FunctionComponent<ReadingProgressProps> = ({
  tag,
  target,
}) => {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!target.current) {
        return
      }

      const element = target.current
      const totalHeight =
        element.clientHeight - element.offsetTop - window.innerHeight / 1.5
      const windowScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0

      if (windowScrollTop === 0) {
        return setReadingProgress(0)
      }

      if (windowScrollTop > totalHeight) {
        return setReadingProgress(100)
      }

      setReadingProgress((windowScrollTop / totalHeight) * 100)
    })
  })

  return (
    <div
      className={`reading-progress reading-progress--tag-${tag}`}
      style={{ width: readingProgress + "%" }}
    />
  )
}

export default ReadingProgress
