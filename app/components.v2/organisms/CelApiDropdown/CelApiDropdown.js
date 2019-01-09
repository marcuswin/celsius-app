import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import CelApiDropdownStyle from "./CelApiDropdown.styles";
import * as appActions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";



@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class CelApiDropdown extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
    // binders
  }

  openDropdown = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  revoke = (id) => {
    const { actions } = this.props;
    actions.revokeAPIKey(id);
  }

  render() {
    const { children, apiKey } = this.props;
    const { isExpanded } = this.state;
    const { permissions } = apiKey;

    return (
      <View style={{ marginBottom: 20 }}>
        <TouchableOpacity onPress={this.openDropdown}>
          <View style={[CelApiDropdownStyle.normalButton, { backgroundColor: "rgba(61,72,83,0.05)" }]}>

            <View>
              <Text style={CelApiDropdownStyle.buttonName}>{`xxxx - xxxx - xxxx - ${children}`}</Text>
            </View>

            <View style={CelApiDropdownStyle.valueIcon}>
              <View style={CelApiDropdownStyle.valueIconRight}>
                <Icon
                  name={isExpanded ? "IconChevronUp" : "IconChevronDown"}
                  height={'16'}
                  fill={"rgba(61,72,83,0.3)"}
                />
              </View>
            </View>

          </View>
        </TouchableOpacity>
        {isExpanded &&
          <View style={CelApiDropdownStyle.expand}>
            <Text style={[globalStyles.normalText, globalStyles.mediumText]}>Last used:</Text>
            <Text style={[globalStyles.normalText, { marginBottom: 12 }]}>{moment(apiKey.lastUsed).format("MMMM D, YYYY")}</Text>

            {(permissions.read_balance === "true" || permissions.read_transactions === "true" || permissions.read_deposit_address === "true" || permissions.withdraw === "true") &&
              <View style={{ marginBottom: 12 }}>
                <Text style={[globalStyles.normalText, globalStyles.mediumText]}>Permissions:</Text>
                {permissions.read_balance === "true" &&
                  <Text style={globalStyles.normalText}>Read wallet balance</Text>
                }
                {permissions.read_transactions === "true" &&
                  <Text style={globalStyles.normalText}>Read transactions</Text>
                }
                {permissions.read_deposit_address === "true" &&
                  <Text style={globalStyles.normalText}>Read deposits</Text>
                }
                {permissions.withdraw === "true" &&
                  <Text style={globalStyles.normalText}>Read withdrawals</Text>
                }
              </View>
            }

            <TouchableOpacity onPress={() => this.revoke(apiKey.id)}>
              <Text style={[globalStyles.normalText, { color: 'red' }]}>Revoke</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

export default CelApiDropdown;
