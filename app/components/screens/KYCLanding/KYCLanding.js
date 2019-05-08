import React, { Component } from 'react'
import { Image, View } from 'react-native'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
import KYCLandingStyle from './KYCLanding.styles'
import CelText from '../../atoms/CelText/CelText'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import { THEMES } from '../../../constants/UI'
import STYLES from '../../../constants/STYLES'
import { KYC_STATUSES } from '../../../constants/DATA'
import Card from '../../atoms/Card/Card'
import CelButton from '../../atoms/CelButton/CelButton';

const progressSteps = ['Verify Identity']

@connect(
  state => ({
    profile: state.user.profile,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    kycErrors:
      state.user.profile && state.user.profile.kyc
        ? state.user.profile.kyc.errors
        : [],
    transactions: state.transactions.transactionList
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCLanding extends Component {
  static propTypes = {}
  static defaultProps = {}

  static navigationOptions = () => ({
    headerSameColor: true,
  });

  componentDidMount() {
    const { actions, profile, navigation } = this.props

    navigation.setParams({
      title: profile.first_name
    })

    actions.getKYCStatus()
    actions.getAllTransactions({ type: 'celpay' })
    actions.getWalletSummary()
  }

  // rendering methods
  renderCard = () => {
    const { transactions, actions } = this.props

    if (transactions && Object.keys(transactions).length > 1) {
      return (
        <Card margin='0 0 20 0'>
          <CelText>
            You have several transactions on-hold.
            <CelText
              onPress={() => actions.navigateTo('TransactionsOnHold')}
              style={[{ textDecorationLine: 'underline' }]}
            >
              See all transactions
            </CelText>
          </CelText>
        </Card>
      )
    }

    if (transactions && Object.keys(transactions).length) {
      return (
        <Card margin='0 0 20 0'>
          <CelText align='center'>
            Verify your profile now to get your crypto.
          </CelText>
        </Card>
      )
    }
  }

  renderKycStatus = kycStatus => {
    const { kycErrors } = this.props
    const style = KYCLandingStyle()
    let status

    if (kycStatus === 'collecting') {
      status = {
        title: 'Here you will be able to add, send and receive coins',
        explanation:
          'In order to do that, please verify your ID. Verification usually takes less than 24h.',
        image: require('../../../../assets/images/illustrations-v3/Dog/profile-dog.png'),
      }
    }

    if (
      kycStatus === 'pending' ||
      kycStatus === 'sending' ||
      kycStatus === 'sent'
    ) {
      status = {
        text: 'In progress',
        title: 'Your identity verification is in progress',
        explanation:
          'It typically takes just a few minutes to verify your identity. Please contact support if you do not receive verification within the next 24 hours.',
        image: require('../../../../assets/images/emptyStates/KYC-Pending.png'),
      }
    }

    if (kycStatus === 'rejected') {
      status = {
        title: 'Profile verification failed',
        explanation:
          'Document photo is in a low-resolution and not readable enough. Please, go through the KYC process again, or contact Celsius support.',
        image: require('../../../../assets/images/emptyStates/KYC-Failed.png'),
      }
    }

    return (
      <View>
        <Image source={status.image} style={style.image} />

        <View style={{ flex: 1, alignContent: 'center', justifyContet: 'center', marginBottom: 10 }} >
          {this.renderStatus()}
        </View>
        <CelText
          margin={'0 0 20 0'}
          align={'center'}
          type={'H2'}
          weight={'700'}
        >
          {status.title}
        </CelText>

        <CelText align={'center'} type={'H4'} weight={'300'}>
          {status.explanation}
        </CelText>

        <View style={style.progressWrapper}>
          <Image style={style.progressImage} source={status.imageState} />
          <View style={style.stepsWrapper}>
            {kycErrors && kycErrors.map(e => (
              <CelText align={'center'} type={'H4'} weight={'300'} key={e}>
                {e}
              </CelText>
            ))}
            {this.renderProgressSteps(kycStatus)}
          </View>
        </View>
      </View>
    )
  }

  renderStatus = () => {
    const { kycStatus } = this.props
    const style = KYCLandingStyle()
    let kyc = ''
    let kycColor = STYLES.COLORS.CELSIUS_BLUE
    if (kycStatus === 'rejected' || kycStatus === 'rejeceted') {
      kyc = 'Rejected'
      kycColor = STYLES.COLORS.RED
    } else if (kycStatus === 'pending' ||
      kycStatus === 'sending' ||
      kycStatus === 'sent') {
      kyc = 'In progress'
      kycColor = STYLES.COLORS.ORANGE
    }
    return (
      <CelText
        margin={'0 0 20 0'}
        align={'center'}
        type={'H3'}
        weight={'500'}
        style={style.kycStatus}
        color={kycColor}
      >
        {kyc}
      </CelText>
    )
  }

  renderProgressSteps = kycStatus => {
    const { actions } = this.props

    return progressSteps.map(step => (
      <CelButton
        key={step}
        onPress={() => actions.navigateTo('KYCProfileDetails')}
        disabled={!(step === 'Verify Identity' && kycStatus === 'collecting' || kycStatus === 'rejected')}
        weight={'500'}
        type={'H4'}
        margin='0 0 0 70'
      >
        {step}
      </CelButton>
    ))
  }
  render() {
    const { kycStatus } = this.props
    if (kycStatus === KYC_STATUSES.passed) return null
    return (
      <RegularLayout theme={THEMES.LIGHT}>
        {this.renderCard()}
        {this.renderKycStatus(kycStatus)}
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(KYCLanding)
