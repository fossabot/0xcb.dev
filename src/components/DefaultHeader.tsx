import React, {FunctionComponent} from 'react';
import Navigation from './common/Navigation';

const DefaultHeader: FunctionComponent = () => (
  <Navigation classes={['navigation__container--dark']}/>
);

export default DefaultHeader;
