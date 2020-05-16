import React, { FunctionComponent } from "react"
import Layout from "../components/Layout"
import DefaultHeader from "../components/DefaultHeader"
import Subheader from "../components/common/Subheader"
import { FaMailBulk } from "react-icons/fa"
import SiteMeta from "../components/meta/SiteMeta"

interface ContactPageProps {
  location: Location
}

const ContactPage: FunctionComponent<ContactPageProps> = ({ location }) => {
  return (
    <Layout header={<DefaultHeader />}>
      <SiteMeta title={`Contact`} location={location} />
      <Subheader
        title={`Contact`}
        subtitle={`Hi there!`}
        classes={[`subheader--dark`]}
      />

      <div className={`contact`}>
        <div className={`contact__content`}>
          <div className={`contact__icon`}>
            <FaMailBulk style={{ fontSize: "80px" }} />
            <div>
              <a href="mailto:mail@conor-burns.com">mail@conor-burns.com</a>
            </div>
            <br />
            <div>
              <a href="https://pgp.conor-burns.com">
                BD74 01F3 8011 727F 62D8&nbsp;&nbsp;D980 FDA1 A4D6 0589 2699
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
