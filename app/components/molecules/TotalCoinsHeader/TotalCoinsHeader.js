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
  totalValueStyle: {
    fontSize: FONT_SCALE * 36,
    fontFamily: 'agile-medium',
    color: STYLES.GRAY_2,
  }
});




const TotalCoinsHeader = (props) => {
  const letterSize = Math.round(props.totalValue).toString().length + 2 >= 10 ?
    FONT_SCALE * 30 : FONT_SCALE * 36;

  return (
    <Grid>
      <Row>
        <Row style={styles.totalValueContainer}>
          <Col style={{width: '65%'}}>
            <Text style={styles.totalValueLabel}>TOTAL VALUE</Text>
            <Text style={[styles.totalValueStyle, {fontSize: letterSize}]}>{formatter.usd(props.totalValue)}</Text>
          </Col>
          <Col style={{width: '35%', alignSelf: 'flex-end'}}>
            {props.children}
          </Col>
        </Row>
      </Row>
    </Grid>
  )
}

export default TotalCoinsHeader;
