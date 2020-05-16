import React, { FunctionComponent } from "react"
import Android from "../../images/tag-icons/android.svg"
import Linux from "../../images/tag-icons/linux.svg"
import Arduino from "../../images/tag-icons/arduino.svg"
import Arch from "../../images/tag-icons/arch.svg"
import SBC from "../../images/tag-icons/sbc.svg"
import Web from "../../images/tag-icons/web.svg"
import Tech from "../../images/tag-icons/tech.svg"
import { Link } from "gatsby"

const TagList: FunctionComponent = () => {
  return (
    <div className={"tag-list"}>
      <h2>Things I write about</h2>
      <div className={"tag-list__container"}>
        <Link to={"/tag/android"} className={"tag-list__tag"}>
          <img src={Android} className={"tag-list__tag-icon"} alt={""} />
          Android
        </Link>
        <Link to={"/tag/linux"} className={"tag-list__tag"}>
          <img src={Linux} className={"tag-list__tag-icon"} alt={""} />
          Linux
        </Link>
        <Link to={"/tag/arduino"} className={"tag-list__tag"}>
          <img src={Arduino} className={"tag-list__tag-icon"} alt={""} />
          Arduino
        </Link>
        <Link to={"/tag/arch"} className={"tag-list__tag"}>
          <img src={Arch} className={"tag-list__tag-icon"} alt={""} />
          Arch
        </Link>
        <Link to={"/tag/sbc"} className={"tag-list__tag"}>
          <img src={SBC} className={"tag-list__tag-icon"} alt={""} />
          SBC
        </Link>
        <Link to={"/tag/web"} className={"tag-list__tag"}>
          <img src={Web} className={"tag-list__tag-icon"} alt={""} />
          Web Stuff
        </Link>
        <Link to={"/tag/tech"} className={"tag-list__tag"}>
          <img src={Tech} className={"tag-list__tag-icon"} alt={""} />
          Cool Tech
        </Link>

        <Link to={`/tags`} className={`tag-list__more-link`}>
          ... and more!
        </Link>
      </div>
    </div>
  )
}

export default TagList
