import React, { FunctionComponent } from "react"
import { FaGithub, FaLinkedin, FaRegEnvelope, FaTwitter } from "react-icons/fa"
import { Link } from "gatsby"

interface SocialIconsProps {
  classes?: string[]
}

const SocialIcons: FunctionComponent<SocialIconsProps> = ({ classes = [] }) => {
  const socialProfiles: Array<{
    label: string
    cssSuffix: string
    render: JSX.Element
    href: string
  }> = [
    {
      label: "GitHub",
      cssSuffix: "github",
      render: <FaGithub />,
      href: "https://github.com/conor-burns",
    },
  ]
  return (
    <ul className={`social-icons ${classes.join(" ")}`}>
      {socialProfiles.map((profile, index) => (
        <li key={index}>
          <a
            className={`social-icons__icon social-icons__icon--${profile.cssSuffix}`}
            href={profile.href}
            aria-label={profile.label}
            rel={`noopener`}
            target={`_blank`}
          >
            {profile.render}
          </a>
        </li>
      ))}
      <li className={`social-icons__icon`}>
        <Link
          to={`contact`}
          className={`social-icons__icon social-icons__icon--contact`}
        >
          <FaRegEnvelope />
        </Link>
      </li>
    </ul>
  )
}

export default SocialIcons
