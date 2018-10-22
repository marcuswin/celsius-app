import React, {Component} from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import TwoFaAuthAppConfirmationCodeStyle from "./TwoFaAuthAppConfirmationCode.styles";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";


@connect(
  state => ({
  // map state to props
    formData: state.ui.formData,
    formErrors: state.ui.formErrors,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaAuthAppConfirmationCode extends Component {
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
    const { actions, formData } = this.props;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: "white",
          paddingLeft: 5,
          textAlign: "right",
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 21,
          fontFamily: "agile-medium"
        }]}>Log out</Text>
      </TouchableOpacity>
    );

    return (
     <SimpleLayout
       mainHeader={{ backButton: true, right: logoutButton() }}
       animatedHeading={{ text: "Auth App" }}
       background={STYLES.GRAY_1}
       bottomNavigation
     >

       <Text style={[globalStyles.normalText, TwoFaAuthAppConfirmationCodeStyle.title]}>Please enter the confirmation code from your authentication app:</Text>

       <View style={TwoFaAuthAppConfirmationCodeStyle.input}>
        <CelInput
          style={[globalStyles.shadow]}
          theme="white"
          field="confirmationCode"
          type="number"
          placeholder={"Confirmation code"}
          margin="0 0 25 0"
          value={formData.confirmationCode}
        />
       </View>

       <CelButton
         onPress={() => actions.navigateTo('TwoFaAuthSuccess')}
       >
         Verify authentication app
       </CelButton>

     </SimpleLayout>
    )
  }
}

export default TwoFaAuthAppConfirmationCode;
