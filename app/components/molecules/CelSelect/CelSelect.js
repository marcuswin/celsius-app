import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
// import {} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import { GENDER, DOCUMENT_TYPE } from "../../../config/constants/common";
// import CelSelectStyle from "./CelSelect.styles";
import CelInputStyle from "../../atoms/CelInput/CelInput.styles";
import SelectModal from "../../organisms/SelectModal/SelectModal";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CelSelect extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['gender', 'document']),
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array),
    value: PropTypes.string,
    field: PropTypes.string,
    labelText: PropTypes.string,
    // TODO: add search property
    search: PropTypes.func,
  }
  static defaultProps = {
    type: '',
    value: '',
    field: '',
    items: [],
    labelText: '',
  }

  constructor(props) {
    super(props);

    let items;

    switch (props.type) {
      case 'document':
        items = DOCUMENT_TYPE;
        break;
      case 'gender':
        items = GENDER;
        break;
      default:
        items = props.items;
    }

    this.state = {
      visible: false,
      allItems: items,
      filteredItems: items,
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  selectValue = (item) => {
    const { updateFormField, field } = this.props;
    console.log(item);
    if (item) updateFormField(field, item.value);
    this.setState({ visible: false });
  }
  // rendering methods
  render() {
    const { labelText, value } = this.props;
    const { visible, filteredItems } = this.state;

    return (
      <View>
        <TouchableOpacity onPress={ () => this.setState({ visible: !visible })} style={CelInputStyle.wrapper}>
          <Text style={ value ? CelInputStyle.labelActive : CelInputStyle.label}>{ labelText }</Text>
          <Text style={ CelInputStyle.input }>{ value }</Text>
        </TouchableOpacity>

        <SelectModal
          visible={visible}
          items={filteredItems}
          onClose={ this.selectValue }
          modalTitle={ labelText }
        />
      </View>
    );
  }
}

export default CelSelect;

// function getSelectItems(type) {}
