import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity, View, ScrollView } from 'react-native';

import * as appActions from '../../../redux/actions';

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from '../../atoms/CelText/CelText';
import { requestForPermission, hasPermission } from '../../../utils/device-permissions';
import STYLES from '../../../constants/STYLES';
import CelButton from '../../atoms/CelButton/CelButton';
import Spinner from '../../atoms/Spinner/Spinner';
import ContactList from '../../molecules/ContactList/ContactList';
import Separator from '../../atoms/Separator/Separator';
import Icon from '../../atoms/Icon/Icon';
import { getFilteredContacts } from '../../../redux/custom-selectors';
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";
import { KYC_STATUSES } from "../../../constants/DATA";
import logger from "../../../utils/logger-util";
import cryptoUtil from '../../../utils/crypto-util';
import { hasPassedKYC } from "../../../utils/user-util";
import ContactsLoader from "../../organisms/ContactsLoader/ContactsLoader";

const renderEmptyState = ({ onContactImport, onSkip }) => (
  <ScrollView style={{ paddingBottom: 90, paddingTop: 30 }}>
    <View style={{ flex: 1, alignItems: 'center' }}>
      <CelText weight='700' type='H2' align="center" margin={"80 0 30 0"} >
        CelPay Your Way!
    </CelText>
      <CelText weight='300' margin="0 0 10 0" style={{ paddingHorizontal: 20 }} color={STYLES.COLORS.MEDIUM_GRAY} type="H4" align="center">
        Import your contacts to transfer crypto quickly and easily between friends.
      </CelText>
      <CelText weight='300' margin="0 0 40 0" style={{ paddingHorizontal: 20 }} color={STYLES.COLORS.MEDIUM_GRAY} type="H6" align="center">
        *Only friends with the Celsius app will appear in your contacts list.
      </CelText>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <CelButton margin="0 0 10 0" onPress={onContactImport}>
          Import contacts
      </CelButton>

        <CelButton margin={"10 0 0 0"} italic basic onPress={onSkip}>
          Skip this step
      </CelButton>
      </View>
    </View>
  </ScrollView>
);

@connect(
  state => ({
    contacts: getFilteredContacts(state),
    user: state.user.profile,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    walletSummary: state.wallet.summary
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPayChooseFriend extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params && params.title ? params.title : 'CelPay',
      right: params && params.right ? params.right : ''
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      hasContactPermission: false,
      isLoading: true
    };

    this.subs = [];
  }

  async componentDidMount() {
    const { navigation, actions } = this.props;
    const permission = await hasPermission(Permissions.CONTACTS);

    this.subs = [
      navigation.addListener('willBlur', () => {
        actions.updateFormField('search', "")
      }),
    ];

    if (permission) {
      const { data } = await Contacts.getContactsAsync();
      await this.setContacts(data);
      await this.getContacts();
    }
    const hasFriends = this.hasFriends()
    navigation.setParams({
      title: permission && hasFriends ? "Choose a friend" : "Import Contacts",
      right: permission && hasFriends ? "search" : "profile"
    })

    this.setState({
      hasContactPermission: permission,
      isLoading: false
    });
  }

  
  // lifecycle methods
  async componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;

    // set image after camera
    if (nextProps.contacts && nextProps.contacts.friendsWithApp && nextProps.contacts.friendsWithApp.length > 0) {
      const permission = await hasPermission(Permissions.CONTACTS);
      navigation.setParams({
        title: permission ? "Choose a friend" : "Import Contacts",
        right: permission ? "search" : "profile"
      })
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  setContacts = async (contacts) => {
    const { actions } = this.props;
    await actions.connectPhoneContacts(contacts);
  };

  getContacts = async () => {
    const { actions } = this.props;
    await actions.getConnectedContacts();
  };

  handleContactImport = async () => {
    if (!hasPassedKYC()) return
    const { navigation } = this.props;

    const permission = await requestForPermission(Permissions.CONTACTS);

    this.setState({
      isLoading: true
    });

    if (permission) {
      try {
        const { data } = await Contacts.getContactsAsync();
        await this.setContacts(data);
        await this.getContacts();
      } catch (err) {
        logger.log(err)
      }
    } else {
      // actions.showMessage('warning', 'In order to CelPay directly to your friends, go to your phone settings and allow Celsius app to access your contacts.')
      await requestForPermission(Permissions.CONTACTS);
    }

    navigation.setParams({
      title: permission && this.props.contacts.length > 0 ? "Choose a friend" : "Import Contacts",
      right: permission && this.props.contacts.length > 0 ? "search" : "profile"
    })
    this.setState({
      hasContactPermission: permission,
      isLoading: false
    });
  };

  handleSkip = () => {
    const { actions } = this.props;
    actions.navigateTo('CelPayEnterAmount')
  };

  sendLink = async () => {
    const { actions } = this.props;

    actions.updateFormField('friend', undefined)
    actions.navigateTo('CelPayEnterAmount');
  };

  handleContactPress = async (contact) => {
    const { actions } = this.props;

    actions.updateFormField('friend', contact);
    actions.navigateTo('CelPayEnterAmount');
  };

  hasFriends = () => this.props.contacts && this.props.contacts.friendsWithApp && this.props.contacts.friendsWithApp.length  > 0

  renderContent = () => {
    const { hasContactPermission } = this.state;
    const { contacts } = this.props;
    const EmptyState = renderEmptyState;

    return (
      !hasContactPermission && !this.hasFriends()
        ?
        <EmptyState onContactImport={this.handleContactImport} onSkip={this.handleSkip} />
        :
        <View style={{ flex: 1, width: '100%' }}>
          <TouchableOpacity onPress={this.sendLink} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CelText color={STYLES.COLORS.CELSIUS_BLUE} type='H4' align='left' margin={'20 0 20 0'}>
              Send as a link
              </CelText>
            <Icon name='IconChevronRight' height={10} width={20} fill={STYLES.COLORS.MEDIUM_GRAY} />
          </TouchableOpacity>
          <View style={{ width: '100%' }}>
            <Separator />
          </View>
          <ContactList contacts={contacts} onContactPress={this.handleContactPress} />
        </View>
    )
  };

  renderLoader = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Spinner /></View>
  );

  render() {
    const { user, kycStatus, celpayCompliance, walletSummary, actions } = this.props;
    const { isLoading } = this.state;
    const hasFriends = this.hasFriends()

    if (kycStatus !== 'pending' && !hasPassedKYC()) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_CELPAY }}/>
    if (kycStatus === 'pending' && !hasPassedKYC()) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.VERIFICATION_IN_PROCESS_CELPAY }}/>
    if (!user.celsius_member) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.NON_MEMBER_CELPAY }}/>
    if (!celpayCompliance.allowed) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;

    if (isLoading && !hasFriends) return <ContactsLoader navigateTo={actions.navigateTo}/>
    if (!cryptoUtil.isGreaterThan(walletSummary.total_amount_usd, 0)) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }} />

    const RenderContent = this.renderContent;

    return (
      <RegularLayout
        enableParentScroll={false}
        padding={`0 20 ${isLoading ? '0' : '140'} 20`}
      >
        <RenderContent {...this.props} />
      </RegularLayout>
    );
  }
}

export default CelPayChooseFriend
