import React, { FunctionComponent } from "react"

interface SubheaderProps {
  title: any
  subtitle?: string
  classes?: string[]
  addition?: JSX.Element
}

const Subheader: FunctionComponent<SubheaderProps> = ({
  title,
  subtitle,
  classes = [],
  addition = "",
}) => {
  return (
    <div className={`subheader ${classes.join(" ")}`}>
      <div className={`subheader__content`}>
        <h1 className={`subheader__title`}>
          {title}
          <small className={`subheader__description`}>{subtitle}</small>
        </h1>
        {addition && <div className={`subheader__addition`}>{addition}</div>}
      </div>
    </div>
  )
}

export default Subheader
