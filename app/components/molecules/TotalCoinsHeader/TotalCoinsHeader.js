import React from 'react';
import { Grid, Row, Col } from "react-native-easy-grid";
import { Text } from 'native-base';
import { StyleSheet } from 'react-native';
import formatter from "../../../utils/formatter";

import { STYLES, FONT_SCALE } from "../../../config/constants/style";

const styles = StyleSheet.create({
  totalValueContainer: {
    backgroundColor: 'white',
    display: 'flex',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    justifyContent: 'center',
    paddingLeft: 36,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    width: '100%',
  },
  totalValueLabel: {
    fontSize: FONT_SCALE * 11,
    color: STYLES.GRAY_2,
    fontFamily: 'agile-book',
  },
  totalValue: {
    fontSize: FONT_SCALE * 36,
    fontFamily: 'agile-medium',
    color: STYLES.GRAY_2,
  }
});

const TotalCoinsHeader = (props) => 
  <Grid>
    <Row>
      <Row style={styles.totalValueContainer}>
        <Col style={{width: '65%'}}>
          <Text style={styles.totalValueLabel}>TOTAL VALUE</Text>
          <Text style={styles.totalValue}>{formatter.usd(props.totalValue)}</Text>
        </Col>
        <Col style={{width: '35%', alignSelf: 'flex-end'}}>
          {props.children}
        </Col>
      </Row>
    </Row>
  </Grid>

export default TotalCoinsHeader;