import React, {FunctionComponent} from 'react';
import Typed from 'react-typed';

const Logo: FunctionComponent = () => {
  const topics = [
    `Thoughts`,
    `Linux`,
    `Android`,
    `Web Development`,
    `System Administration`,
    `Reviews`,
    `A Human-being`,
    `Software Development`,
    `Open Source`,
  ];

  return (
    <div className="header__logo-container">
      <h1 className="header__title">Burns</h1>
      <h2>
        About <span className="header__about">
          <Typed strings={topics}
                 typeSpeed={50}
                 backSpeed={60}
                 shuffle={true}
                 backDelay={1000}
                 loop={true}/>
       </span>
      </h2>
    </div>
  );
};

export default Logo;
