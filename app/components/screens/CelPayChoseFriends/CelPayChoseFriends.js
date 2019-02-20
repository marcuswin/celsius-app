import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Permissions } from 'expo';
import { Image, View } from 'react-native';

import * as appActions from '../../../redux/actions';
import testUtil from "../../../utils/test-util";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from '../../atoms/CelText/CelText';
import { requestForPermission, hasPermission } from '../../../utils/device-permissions';
import COLORS from '../../../constants/STYLES';
import CelButton from '../../atoms/CelButton/CelButton';

const renderEmptyState = ({onContactImport, onSkip}) => (
  <View style={{flex: 1, alignItems: 'center', marginTop: 25}}>
    <Image source={require('../../../../assets/images/diane-sad.png')} style={{ height: 160, resizeMode: 'contain' }} />
    <CelText bold type="H1" align="center">
      Uhoh, no friends?
    </CelText>
    <CelText margin="15 0 0 0" style={{paddingHorizontal: 20}} color={COLORS.MEDIUM_GRAY} type="H4" align="center">
      Add your contacts or connect your Facebook or Twitter so you can easily send your friends some crypto.
    </CelText>

    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <CelButton margin="30 0 0 0" onPress={onContactImport}>
        Import contacts
      </CelButton>

      <CelButton basic onPress={onSkip}>
        Skip this step
      </CelButton>
    </View>
  </View>
);

@connect(
  () => ({

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPayChoseFriends extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "CelPay",
        right: "profile"
      },
      hasContactPermission: false
    };
  }

  async componentWillMount() {
    // const { actions } = this.props;
    const permission = await hasPermission(Permissions.CONTACTS);

    if (permission) {
      this.setState({
        header: {
          title: "Choose a friend to CelPay",
          right: "search"
        },
        hasContactPermission: permission
      });

    //   const { data } = await Contacts.getContactsAsync({
    //     fields: [Contacts.Fields.Emails],
    //   });
    //   console.log(data)
    // } else {
    //   actions.navigateBack();
    }
  }

  handleContactImport = async () => {
    const permission = await requestForPermission(Permissions.CONTACTS);

    this.setState({
      hasContactPermission: permission
    })
    // console.log(permission)
  };

  handleSkip = () => {
    const { actions } = this.props;
    actions.navigateTo('CelPayEnterAmount')
  };

  render() {
    const { header, hasContactPermission } = this.state;

    const EmptyState = renderEmptyState;

    return (
      <RegularLayout
        header={header}
      >
        {!hasContactPermission
          ? <EmptyState onContactImport={this.handleContactImport} onSkip={this.handleSkip}/>
          : null
        }
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CelPayChoseFriends);
