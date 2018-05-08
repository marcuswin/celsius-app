import react, { Component } from "React";
import { Text } from "native-base";

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";

import { STYLES } from "../../../config/constants/style";



@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    loanRequest: state.loanRequests.loanRequest,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)



class ProfileScreen extends Component {

  onSubmit = () => {

  };

  render() {
    const { navigateTo } = this.props;
    return (
      <SimpleLayout
        mainHeader={{ back: true }}
        background={STYLES.PRIMARY_BLUE}
      >
        <Text>Profile Page</Text>
        <View style={Styles.buttonWrapper}>
        </View>
    </SimpleLayout>
    )
  }
}

export default ProfileScreen;
