import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import CelSelect from '../../molecules/CelSelect/CelSelect';

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelDatePicker extends Component {

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
    ]),
    field: PropTypes.string,
    margin: PropTypes.string,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    value: '',
    field: '',
    margin: '0 0 15 0',
    disabled: false
  }

  constructor(props) {
    super(props);

    this.state = {
      month: '',
      day: '',
      year: ''
    };
  }

  onChange = (newState) => {
    const { actions, field } = this.props;
    const { day, month, year } = this.state;
    const date = {};
    date[field] = { day, month, year };
    actions.updateFormFields(date);
    this.setState(newState);
  }

  render() {
    const { disabled } = this.props;
    const { month, day, year } = this.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        <CelSelect disabled={disabled} flex={1.4} type="month" labelText="Month" value={month} onChange={(value) => this.onChange({ month: value })} margin="0 16 0 0" />
        <CelSelect disabled={disabled} flex={1.1} type="day" labelText="Day" value={day} onChange={(value) => this.onChange({ day: value })} margin="0 16 0 0" />
        <CelSelect disabled={disabled} flex={1} type="year" labelText="Year" value={year} onChange={(value) => this.onChange({ year: value })} />
      </View>
    );
  }
}

export default testUtil.hookComponent(CelDatePicker);
