import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { GENDER, DOCUMENT_TYPE, PERSON_TITLE } from "../../../config/constants/common";
import SelectModal from "../../organisms/SelectModal/SelectModal";
import Icon from "../../atoms/Icon/Icon";
import SelectCountryModal from "../../organisms/SelectCountryModal/SelectCountryModal";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CelSelect extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['gender', 'document', 'title', 'country']),
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
      case 'title':
        items = PERSON_TITLE;
        break;
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
        <TouchableOpacity onPress={ () => this.setState({ visible: !visible })} style={globalStyles.inputWrapper}>
          <Text style={ value ? globalStyles.selectLabelActive : globalStyles.selectLabelInactive}>{ label }</Text>
          <Text style={ globalStyles.input }>{ value }</Text>

          <View style={ globalStyles.inputIconRight }>
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
