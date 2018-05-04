import React from 'react';
import { Container } from 'native-base';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";


const BasicLayout = (props) => (
    <Container>
      { props.children }
      <BottomNavigation />
    </Container>
)

export default BasicLayout;
