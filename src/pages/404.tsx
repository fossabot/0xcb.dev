import React, { FunctionComponent } from "react"

import Layout from "../components/Layout"
import DefaultHeader from "../components/DefaultHeader"
import SiteMeta from "../components/meta/SiteMeta"
import deadlink from "../images/deadlink.png"
import { Link } from "gatsby"

const NotFoundPage: FunctionComponent<{ location: Location }> = ({
  location,
}) => (
  <Layout header={<DefaultHeader />}>
    <SiteMeta title={`404`} location={location} />
    <div className={`error`}>
      <img src={deadlink} className={`error__image`} />
      <div className={`error__content`}>
        <h1 className={`error__title`}>
          <small>404 - Page not found</small>
          Whoops, you found a dead link.
        </h1>

        <Link to={"/"}>Oh jeez! Take me back to a safer place!</Link>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
