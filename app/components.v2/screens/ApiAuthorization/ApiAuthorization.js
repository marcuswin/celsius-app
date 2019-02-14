import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";
// import { View } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
// import SettingsStyle from "./Settings.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { FONT_SCALE, STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelButton from '../../atoms/CelButton/CelButton';
import Separator from '../../atoms/Separator/Separator';
import CelApiDropdown from '../../organisms/CelApiDropdown/CelApiDropdown';


@connect(
  state => ({
    user: state.user.profile,
    apiKeys: state.apiKeys.keys,
    activeScreen: state.nav.routes[state.nav.index].routeName
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ApiAuthorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  componentDidMount = () => {
    const { actions } = this.props;
    actions.getAllAPIKeys();
  }


  componentWillReceiveProps(nextProps) {
    const { actions, activeScreen } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'ApiAuthorization') {
      actions.getAllAPIKeys();
    }
  }


  render() {
    const { actions, apiKeys } = this.props;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: 'white',
          paddingLeft: 5,
          textAlign: 'right',
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 18,
          fontFamily: 'agile-medium',
        }]}>Log out</Text>
      </TouchableOpacity>
    )

    return (
      <SimpleLayout
        mainHeader={{ backButton: true, right: logoutButton() }}
        animatedHeading={{ text: 'Api Auth' }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >
        <Text style={[globalStyles.normalText, { marginTop: 30 }]}>
          Generate a secure API key that enables external services to read some of the Celsius data.
        </Text>
        <View style={{ marginTop: 30 }}>
          <CelButton
            onPress={() => actions.navigateTo('ApiKeyGenerate')}
            color="blue"
          >Generate API key</CelButton>
        </View>
        {apiKeys.length > 0 &&
          <View>
            <Separator margin="35 0 25 0" />
            {
              apiKeys.map(apiKey => (
                <CelApiDropdown apiKey={apiKey} key={apiKey.id}>
                  {apiKey.lastFourCharacters}
                </CelApiDropdown>
              ))
            }
          </View>
        }
      </SimpleLayout >
    );
  }
}

export default ApiAuthorization;
