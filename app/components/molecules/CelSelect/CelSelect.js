import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import { GENDER, DOCUMENT_TYPE } from "../../../config/constants/common";
import CelSelectStyle from "./CelSelect.styles";
import CelInputStyle from "../../atoms/CelInput/CelInput.styles";
import SelectModal from "../../organisms/SelectModal/SelectModal";
import Icon from "../../atoms/Icon/Icon";
import SelectCountryModal from "../../organisms/SelectCountryModal/SelectCountryModal";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CelSelect extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['gender', 'document', 'country']),
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array),
    value: PropTypes.string,
    field: PropTypes.string,
    labelText: PropTypes.string,
    // TODO: add search logic ?
    // search: PropTypes.func,
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
      items,
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  selectValue = (item) => {
    const { updateFormField, field } = this.props;
    if (item) updateFormField(field, item);
    this.setState({ visible: false });
  }
  // rendering methods
  render() {
    const { labelText, value, type } = this.props;
    const { visible, items } = this.state;

    const label = value && labelText ? labelText.toUpperCase() : labelText;

    return (
      <View>
        <TouchableOpacity onPress={ () => this.setState({ visible: !visible })} style={CelInputStyle.wrapper}>
          <Text style={ value ? CelSelectStyle.selectLabelActive : CelSelectStyle.selectLabel}>{ label }</Text>
          <Text style={ CelInputStyle.input }>{ value }</Text>

          <View style={{ backgroundColor: 'red', position: 'absolute', right: 15, top: 0, height: 60, justifyContent: 'center' }}>
            <Icon name='CaretDown' height='25' width='25' fill={'white'} style={{opacity: 0.5}} />
          </View>
        </TouchableOpacity>

        { type === 'country' ? (
          <SelectCountryModal
            visible={ visible }
            onClose={ this.selectValue }
          />
        ) : (
          <SelectModal
            visible={visible}
            items={items}
            onClose={ this.selectValue }
            modalTitle={ labelText }
          />
        )}
      </View>
    );
  }
}

export default CelSelect;

// function getSelectItems(type) {}
