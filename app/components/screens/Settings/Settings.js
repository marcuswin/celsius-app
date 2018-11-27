import React, {Component} from 'react';
import { Text, TouchableOpacity} from "react-native";

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
// import SettingsStyle from "./Settings.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { FONT_SCALE, STYLES } from "../../../config/constants/style";
import Separator from "../../atoms/Separator/Separator";
import CelCustomButton from "../../atoms/CelCustomButton/CelCustomButton";


@connect(
  state => ({
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods

  render() {
    const {actions, user} = this.props;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: 'white',
          paddingLeft: 5,
          textAlign: 'right',
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 21,
          fontFamily: 'agile-medium',
        }]}>Log out</Text>
      </TouchableOpacity>
    )

    return (
     <SimpleLayout
       mainHeader={{ backButton: true, right: logoutButton() }}
       animatedHeading={{ text: 'Settings' }}
       background={ STYLES.GRAY_1 }
       bottomNavigation
     >

        <Separator margin="20 0 20 0" separatorSize={0.6} color={'black'} separatorColor={"rgba(137,144,153,0.5)"}>SECURITY</Separator>

       { !user.facebook_id && !user.google_id && !user.twitter_id ? (
         <CelCustomButton
           onPress={() => actions.navigateTo('ChangePassword')}
           iconRight={"IconChevronRight"}
           iconRightColor={'rgba(137,144,153,0.6)'}
           iconRightHeight={'20'}
         >
           Change password
         </CelCustomButton>
       ) : null}

       <CelCustomButton
         onPress={() => actions.navigateTo('TwoFAInfo')}
         iconRight={"IconChevronRight"}
         iconRightColor={'rgba(137,144,153,0.6)'}
         value={user.two_factor_enabled ? "ON" : "OFF"}
         iconRightHeight={'20'}
       >
         Two-Factor Verif.
       </CelCustomButton>

     </SimpleLayout>
    );
  }
}

export default Settings;
