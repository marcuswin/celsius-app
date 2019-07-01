import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MODALS } from "../../../constants/UI";

import WithdrawWarningModalStyle from "./WithdrawWarningModal.styles";
import CelText from '../../atoms/CelText/CelText';
import CelModal from '../CelModal/CelModal';
import CelButton from '../../atoms/CelButton/CelButton';
import STYLES from '../../../constants/STYLES';
import Icon from '../../atoms/Icon/Icon';
import CelCheckbox from '../../atoms/CelCheckbox/CelCheckbox';

class WithdrawWarningModal extends Component {

  static propTypes = {
    coin: PropTypes.string,
    navigateNext: PropTypes.func,

  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  setCheckMark = () => {
    const { isChecked } = this.state

    if (isChecked === true)
      return (
        < View style={{ paddingBottom: 10 }}>
          <Icon name='Checked' width='23' height='23' fill={STYLES.COLORS.CELSIUS_BLUE} />
        </View >
      )
  }

  handleConfirmWithdrawalFromModal = () => {
    const { actions } = this.props

    actions.navigateTo("VerifyProfile", {
      setCoinAddress: actions.setCoinWithdrawalAddress
    })
  }

  render() {
    const { isChecked } = this.state
    const { coin, navigateNext } = this.props
    const style = WithdrawWarningModalStyle();

    const tagUpperCase = coin === 'XLM' ? 'MEMO ID' : 'DESTINATION TAG'
    const tag = coin === 'XLM' ? 'Memo ID' : 'destination tag'


    return (
      <CelModal
        name={MODALS.WITHDRAW_WARNING_MODAL}
        shouldRenderCloseButton={false}
      >
        <CelText type='H2' weight='bold' align='center' style={style.title}>You didn't enter a {tagUpperCase}</CelText>
        <CelText type='H4' weight='300' align='left' style={style.text}>To prevent permanent loss of your funds, please check if your address has a <CelText type='H4' weight='300' color={STYLES.COLORS.CELSIUS_BLUE}>{tag}</CelText></CelText>
        <View style={style.checkbox}>
          <CelCheckbox
            field='hasNotTag'
            uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
            checkedCheckBoxColor={STYLES.COLORS.GREEN}
            value={this.state.isChecked}
          />
          
          <TouchableOpacity onPress={() => this.setState({ isChecked: !isChecked })}>
            <CelText type='H4' weight='300' style={{ paddingLeft: 10, paddingBottom: 30 }}>My address does not have a {tag}</CelText>
          </TouchableOpacity>
        </View>
        <View>
          <CelButton
            disabled={isChecked === false}
            onPress={navigateNext}
          >
            Continue
          </CelButton>
        </View>
      </CelModal>
    )
  }
}

export default WithdrawWarningModal
