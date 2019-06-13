import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Card from '../../atoms/Card/Card';
import STYLES from '../../../constants/STYLES';
import Icon from '../../atoms/Icon/Icon';
import WithdrawalAddressCard from '../../atoms/WithdrawalAddressCard/WithdrawalAddressCard';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  state => ({
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawAddressOverview extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Withdrawal addresses ",
    right: "profile"
  });

  componentDidMount() {
    const {actions} = this.props;
    actions.getAllCoinWithdrawalAddresses();
  }

  handlePress = (coin) => {
    const { actions } = this.props;
    actions.updateFormFields({ coin });
    actions.navigateTo("WithdrawNewAddressSetup")
  };

  renderCoinDetails = (key) => {
    const { currencies } = this.props
    const coin = currencies.find(c => c.short === key)
    return `${ formatter.capitalize(coin.name) } - ${ coin.short }`
  }

  renderSelectedCoin = () => {
    const { withdrawalAddresses } = this.props;
    return withdrawalAddresses ? (
      Object.keys(withdrawalAddresses).map(key => {
        const coin = this.renderCoinDetails(key);
        return withdrawalAddresses[key] ? (
          <WithdrawalAddressCard
            icon={`Icon${key}`}
            key={key}
            coinShort={coin}
            withdrawalAddress={withdrawalAddresses[key]}
            onPress={() => this.handlePress(key)}
          />
        ) : null
      })
    ) : null
  }



  render() {
    const { withdrawalAddresses, callsInProgress } = this.props
    const RenderSelectedCoin = this.renderSelectedCoin

    const isLoading = apiUtil.areCallsInProgress([API.GET_ALL_COIN_WITHDRAWAL_ADDRESSES], callsInProgress);
    if (isLoading) return <LoadingScreen />
    if (!Object.keys(withdrawalAddresses).length) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.NO_WITHDRAWAL_ADDRESSES }} />

    return (
      <RegularLayout>
        <View>
          <Card color={STYLES.COLORS.CELSIUS_BLUE}>
            <Icon name={'Info'} width="30" height="30" fill={STYLES.COLORS.WHITE}/>
            <CelText type={"H5"} weight={"300"} color={STYLES.COLORS.WHITE}>
              For your security, changing a withdrawal address will place a lock on withdrawals of the coin for 24 hours.
            </CelText>
          </Card>
          <RenderSelectedCoin />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawAddressOverview);
