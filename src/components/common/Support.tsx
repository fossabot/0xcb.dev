import React, {FunctionComponent, useEffect, useState} from 'react';
import {FaCoffee, FaGift, FaHeart, FaNewspaper, FaTimes} from 'react-icons/fa';
import Modal from 'react-modal';
import {Link} from 'gatsby';

const Support: FunctionComponent = () => {
  useEffect(() => Modal.setAppElement(`#___gatsby`));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button className={`navigation__item-link`} onClick={() => setIsOpen(!isOpen)} aria-label={`Support`}
              role={`button`}>
        <FaHeart/>
      </button>
      <Modal
        isOpen={isOpen}
        className={`support-modal`}
        onRequestClose={() => setIsOpen(false)}
      >
        <button className={`support-modal__close-button`} onClick={() => setIsOpen(false)} role={`button`}
                aria-label={`Close`}><FaTimes/></button>

        <p>
          If you like my content and want to support this blog feel free to use one of the following:
        </p>

        <div className={`support-modal__options`}>
          <Link to={`/#subscribe`} target={`_blank`} onClick={() => setIsOpen(false)}
                className={`support-modal__channel support-modal__channel--subscribe`}><FaNewspaper/> Subscribe</Link>
          <a href={`https://www.buymeacoffee.com/conor`} target={`_blank`} rel={`noopener`}
             className={`support-modal__channel support-modal__channel--coffee`}><FaCoffee/> Buy me a coffee</a>
          <a href={`https://conor-burns.com`} target={`_blank`} rel={`noopener`}
             className={`support-modal__channel support-modal__channel--thing`}><FaGift/> Visit my other Sites</a>
        </div>

        <div className={`support-modal__thanks`}>
          Thanks!
        </div>
      </Modal>
    </>
  );
};

export default Support;
