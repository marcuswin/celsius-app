import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './Svgs';

const Icon = (props) => {
  let viewBox;

  if (svgs[`${props.name}ViewBox`]) {
    viewBox = svgs[`${props.name}ViewBox`];
  }
  return <SvgIcon viewBox={ viewBox || props.viewBox } {...props} svgs={svgs}/>;
}

export default Icon;
