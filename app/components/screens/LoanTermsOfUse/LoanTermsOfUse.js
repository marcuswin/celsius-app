import React, {Component } from 'react';
import { Linking, View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoanTermsOfUseStyle from "./LoanTermsOfUse.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from "../../atoms/CelButton/CelButton";
import {MODALS} from "../../../constants/UI";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
import ExpandableItem from "../../atoms/ExpandableItem/ExpandableItem";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import { handleCopy } from './ToUObj'

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class LoanTermsOfUse extends Component {

  static navigationOptions = () => ({
    title: "Terms and Conditions",
  });

  constructor(props) {
    super(props)

    this.state = {
      acceptPt1: false,
      acceptPt2: false,
      acceptPt3: false
    }

    props.actions.initForm({
      acceptLoanTermsOfUse: false
    })
  }

  handleRequestButton = () => {
    const { actions } = this.props

    actions.openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL)
  }

  handleAcceptance = () => {
    const { acceptPt1, acceptPt2, acceptPt3 } = this.state
    const { formData } = this.props

    if (acceptPt1 && acceptPt2 && acceptPt3) {
      formData.acceptLoanTermsOfUse = true
    } else {
      formData.acceptLoanTermsOfUse = false
    }
  }

  renderPart = (part, i) => {
    if (part.type === 'link') {
      return(
        <CelText
          key={i}
          onPress={ () => Linking.openURL(part.text)}
          color={ STYLES.COLORS.CELSIUS_BLUE }
        >{ part.text }
        </CelText>
      )
    }
      return <CelText key={i}>{ part.text }</CelText>

  }

  renderTextArray = (textArray) => (
      <CelText>{ textArray.map((obj, i) => this.renderPart(obj, i)) }</CelText>
    )

  renderTermsOfUse = (part) => {
    const style = LoanTermsOfUseStyle();

    return (
      part.map( (o, i) =>
        <ExpandableItem style={style.expandableItem} key={ i } heading={ o.title }>
          <CelText>{o.textArray ? this.renderTextArray(o.textArray) :  o.copy}</CelText>
        </ExpandableItem> )
    )
  }


  render() {
    const { formData } = this.props
    const { acceptPt1, acceptPt2, acceptPt3 } = this.state
    const style = LoanTermsOfUseStyle()
    const termsOfUse = handleCopy()
    this.handleAcceptance()

    return (
      <RegularLayout
        fabType={'hide'}
      >
        <CelText
          type={'H2'}
          weight={'bold'}
        >
          Celsius Loan Terms and Conditions
        </CelText>

        { this.renderTermsOfUse(termsOfUse.termsPt1) }

        <Card
          color={ STYLES.COLORS.WHITE }
          margin={'0 0 20 0'}
        >
          <CelCheckbox
            onChange={ (field, value) =>  this.setState({ acceptPt1: value })}
            field={ 'acceptPt1' }
            value={ acceptPt1 }
            uncheckedCheckBoxColor={ STYLES.COLORS.GRAY }
            checkedCheckBoxColor={ STYLES.COLORS.GREEN }
            rightText={'I have read, understood and agree to the above mentioned in sections 1-7'}
          />
        </Card>

        { this.renderTermsOfUse(termsOfUse.termsPt2) }
        <Card
          color={ STYLES.COLORS.WHITE}
        >
          <CelCheckbox
            onChange={ (field, value) =>  this.setState({ acceptPt2: value })}
            field={ 'acceptPt2' }
            value={ acceptPt2 }
            uncheckedCheckBoxColor={ STYLES.COLORS.GRAY }
            checkedCheckBoxColor={ STYLES.COLORS.GREEN }
            rightText={'I have read, understood and agree to the above mentioned in sections 8-14'}
          />
        </Card>

        { this.renderTermsOfUse(termsOfUse.termsPt3) }
        <Card
          color={ STYLES.COLORS.WHITE }
        >
          <CelCheckbox
            onChange={ (field, value) =>  this.setState({ acceptPt3: value })}
            field={ 'acceptPt3' }
            value={ acceptPt3 }
            uncheckedCheckBoxColor={ STYLES.COLORS.GRAY }
            checkedCheckBoxColor={ STYLES.COLORS.GREEN }
            rightText={'I have read, understood and agree to the above mentioned in sections 8-20'}
          />
        </Card>
        <Card
          color={ STYLES.COLORS.WHITE }
          padding={'20 0 20 0'}
        >
          <View style={ style.shareCard }>
            <TouchableOpacity style={ style.downloadButton }>
              <Icon name='KycCamera' height='24' fill={STYLES.COLORS.GRAY} />
              <CelText
                align={'center'}
              >Download T&C</CelText>
            </TouchableOpacity>
            <Separator
              color={'red'}
              vertical
              height={"40%"}
              top={10}
            />
            <TouchableOpacity style={ style.shareButton }>
              <Icon name='KycCamera' height='24' fill={STYLES.COLORS.GRAY} />
              <CelText
                align={'center'}
              >Share</CelText>
            </TouchableOpacity>
          </View>
        </Card>

        <CelButton
          onPress={ this.handleRequestButton }
          style={ style.requestButton }
          disabled={ !formData.acceptLoanTermsOfUse  }
        >
          Request Loan
        </CelButton>
      </RegularLayout>
    );
  }
}

export default LoanTermsOfUse
