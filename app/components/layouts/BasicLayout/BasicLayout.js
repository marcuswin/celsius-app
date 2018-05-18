import React from 'react';
import { Container } from 'native-base';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";


const BasicLayout = (props) => {
  const { bottomNavigation } = props;
  const marginBottom = bottomNavigation ? 90 : 0;
  return (
    <Container style={{ marginBottom }}>
      { props.children }
      { bottomNavigation ? <BottomNavigation /> : null }
    </Container>
  )
}

export default BasicLayout;
