import React, {FunctionComponent} from 'react';
import logo from '../../images/logo.svg';
import {Link} from 'gatsby';
import Search from './Search';
import Support from './Support';

interface NavigationProps {
  classes?: string[];
}

const Navigation: FunctionComponent<NavigationProps> = ({classes = []}) => {
  return (
    <div className={classes.concat('navigation__container').join(' ')}>
      <nav className="navigation">
        <Link to={'/'}>
          <img src={logo} className="navigation__logo" alt="blog.conor-burns.com"/>
        </Link>
        <div className={`navigation__nav`}>
          <ul className={`navigation__items navigation__mobile`}>
            <li className="navigation__item"><Link to={`/`} className="navigation__item-link">Home</Link></li>
            <li className="navigation__item"><Link to={`/contact`} className="navigation__item-link">Contact</Link></li>
            <li className="navigation__item"><a href="https://conor-burns.com/" className="navigation__item-link">Main Site</a></li>
          </ul>
          <ul className={`navigation__items`}>
            <li className={`navigation__item`}>
              <Support/>
            </li>
            <li className={`navigation__item`}>
              <div className={`search-container`}>
                <Search/>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
