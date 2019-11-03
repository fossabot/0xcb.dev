import React, {FunctionComponent} from 'react';
import GhostPost from '../../models/GhostPost';
import SocialIcons from './SocialIcons';

interface AboutBoxProps {
  post: GhostPost;
}

const AboutBox: FunctionComponent<AboutBoxProps> = ({post}) => {
  return (
    <div className={`about-box`}>
      <img src={post.primary_author.profile_image} className={`about-box__avatar`} alt={post.primary_author.name}/>
      <h3 className={`about-box__author-name`}>{post.primary_author.name}</h3>
      <p>
        {post.primary_author.bio}
      </p>
      <SocialIcons classes={[`about-box__social-icons`]}/>
    </div>
  );
};

export default AboutBox;
