import React, { FunctionComponent } from "react"
import Logo from "./Logo"
import Navigation from "../common/Navigation"

const Header: FunctionComponent = () => (
  <header className="header">
    <Navigation />
    <div className="header__content">
      <Logo />
    </div>
  </header>
)

export default Header
