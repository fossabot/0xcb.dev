/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { FunctionComponent, ReactElement, ReactNode } from "react"
import { Link } from "gatsby"

import "./../styles/main.scss"

interface LayoutProps {
  children: ReactNode
  header?: ReactElement
  classNames?: string[]
}

const Layout: FunctionComponent<LayoutProps> = ({
  children = [],
  header,
  classNames = [],
}) => (
  <>
    {header}
    <main className={classNames.join(" ")}>{children}</main>
    <footer className={`footer`}>
      <div className={`footer__content`}>
        <nav className={`footer__nav`}>
          <Link to={`/privacy-policy`}>Privacy Policy</Link>
        </nav>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<noscript><img src="https://stats.conor-burns.com/ingress/b8d4be52-076c-4066-a608-a0ecdc725502/pixel.gif"></noscript> <script src="https://stats.conor-burns.com/ingress/b8d4be52-076c-4066-a608-a0ecdc725502/script.js"></script>',
          }}
        />
        <div className={`footer__copyright`}>
          Conor Burns &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  </>
)

export default Layout
