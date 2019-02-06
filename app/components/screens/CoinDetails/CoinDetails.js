import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CoinDetailsStyle from "./CoinDetails.styles";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  state => ({
    style: CoinDetailsStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CoinDetails extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: " ",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    // const { style } = this.props
    const { header } = this.state
    return (
      <RegularLayout header={header}>
        <View >
          <Card>
            <View style={{ flexDirection: 'row'
            }}>
              <TouchableOpacity>
                <CelText>Bitcoin</CelText>
                <CelText bold>{formatter.usd(12313.14)}</CelText>
                <CelText>{formatter.crypto(13.45, 'BTC')}</CelText>
              </TouchableOpacity>
              <View>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <CelText> Send </CelText>
              </TouchableOpacity>
              <View style={{
                borderBottomWidth: 1,
                borderLeftColor: 'gray',
                borderRadius: 10,
              }} />
              <TouchableOpacity>
                <CelText> Deposit </CelText>
              </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CoinDetails);
