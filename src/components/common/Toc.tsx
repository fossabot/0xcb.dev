import React, {FunctionComponent, useEffect} from 'react';
import tocbot from 'tocbot';

interface TocProps {
  onClick: () => void;
}

const Toc: FunctionComponent<TocProps> = ({onClick}) => {
  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: '.post__html',
      headingSelector: 'h2,h3',
      listClass: 'toc-list',
      linkClass: 'toc-list__link',
      listItemClass: 'toc-list__item',
      activeLinkClass: 'toc-list__link--active',
      scrollSmooth: true,
      scrollSmoothDuration: 1,
    });
  });

  return (
    <nav className={"toc"} onClick={onClick} />
  );
};

export default Toc;
