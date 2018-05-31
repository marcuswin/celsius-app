import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import { lookup } from "country-data";

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
    theme: PropTypes.oneOf(['blue', 'white']),
    type: PropTypes.oneOf(['gender', 'document', 'title', 'country']),
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array),
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
    ]),
    field: PropTypes.string,
    labelText: PropTypes.string,
  }
  static defaultProps = {
    type: '',
    value: '',
    field: '',
    items: [],
    labelText: '',
    theme: 'blue',
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
      value: undefined,
    };
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { value, type } = this.props;
    const { items } = this.state;

    if (nextProps.value && value !== nextProps.value) {
      let item;
      if (type === 'country') {
        item = lookup.countries({name: nextProps.value})[0]
      } else {
        item = items.filter(i => i.value === nextProps.value)[0];
      }

      // console.log({ item, value, nextValue: nextProps.value, items });

      this.setState({ value: item });
    }
  }
  // event hanlders
  selectValue = (item) => {
    const { updateFormField, field, type } = this.props;
    if (item) {
      if (type === 'country') {
        updateFormField(field, item.name);
      } else {
        updateFormField(field, item.value);
      }
    }
    this.setState({ visible: false });
  }
  // rendering methods
  render() {
    const { theme, labelText, type } = this.props;
    const { visible, items, value } = this.state;

    const label = value && labelText ? labelText.toUpperCase() : labelText;
    const labelStyles = value ? [globalStyles.selectLabelActive] : [globalStyles.selectLabelInactive];
    labelStyles.push(globalStyles[`${theme}InputTextColor`]);

    return (
      <View>
        <TouchableOpacity
          onPress={ () => this.setState({ visible: !visible })}
          style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`]]}
        >
          <Text style={ labelStyles }>{ label }</Text>
          <Text style={[globalStyles.input, globalStyles[`${theme}InputTextColor`]]}>
            { value && (value.label || value.name) }
          </Text>

          <View style={ globalStyles.inputIconRight }>
            <Icon name='CaretDown' height='9' width='15' fill={globalStyles[`${theme}InputTextColor`].color} />
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
