import React, {Component} from 'react';
import { Text, TouchableOpacity } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
// import TwoFaWelcomeStyle from "./TwoFaWelcome.styles";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelCustomButton from "../../atoms/CelCustomButton/CelCustomButton";


@connect(
  () => ({
  // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaWelcome extends Component {
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

    const {actions} = this.props;

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
        animatedHeading={{ text: 'Setting up 2FA Verification' }}
        background={ STYLES.GRAY_1 }
        bottomNavigation
      >

        <Text style={[globalStyles.normalText, ]}>Please choose the method of security:</Text>

        <CelCustomButton
            onPress={() => actions.navigateTo('TwoFaAuthAppConfirmation')}
            size={"large"}
            iconLeft={"LockIcon"}
            iconLeftColor={'white'}
            iconLeftHeight={'40'}
            iconRight={"IconChevronRight"}
            iconRightColor={STYLES.PRIMARY_BLUE}
            iconRightHeight={'15'}
            title={"Auth app"}
            titleColor={STYLES.PRIMARY_BLUE}
            explanation={"Install a Google Authenticator or Authy to generate security codes."}
            explanationColor={STYLES.GRAY_2}
        />

      </SimpleLayout>
    );
  }
}

export default TwoFaWelcome;
