import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelInputStyle from "./CelInput.styles";
import STYLES from '../../../constants/STYLES';

@connect(
    state => ({
        cmpStyle: CelInputStyle(state.ui.theme),
        theme: state.ui.theme
    }),
    dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelInput extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['text', 'password', 'tel', 'checkbox', 'pin', 'tfa', 'number']),
        autoFocus: PropTypes.bool,
        // autoComplete: // android only
        disabled: PropTypes.bool,
        maxLenght: PropTypes.number,
        placeholder: PropTypes.string,
        keyboardType: PropTypes.oneOf(['default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad']),
        returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
        style: PropTypes.oneOfType([
            PropTypes.instanceOf(Object),
            PropTypes.number
        ]),
        autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
        onChange: PropTypes.func, //
        autoCorrect: PropTypes.bool, //
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]), //
        field: PropTypes.string.isRequired, //
        error: PropTypes.string, //
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        secureTextEntry: PropTypes.bool
    };

    static defaultProps = {
        type: 'text',
        keyboardType: 'default',
        autoFocus: false,
        disabled: false,
        maxLenght: 100,
        autoCapitalize: 'none',
        value: "",
        secureTextEntry: false
    }

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    onChangeText = (text) => {
        const { field, onChange, actions } = this.props;
        if (onChange) {
            onChange(field, text);
        } else {
            actions.updateFormField(field, text);
        }
    }

    onInputFocus = () => {
        const { onFocus } = this.props;
        if (onFocus) onFocus();
        this.setState({ active: true })
    }

    onInputBlur = () => {
        const { onBlur } = this.props;
        if (onBlur) onBlur();
        this.setState({ active: false })
    }

    getInputStyle = () => {
        const { cmpStyle } = this.props;
        const { active } = this.state;
        const style = [cmpStyle.container];
        if (active) style.push(cmpStyle.activeInput)
        return style;
    }

    getPlaceholderTextColor = (theme) => ({
        'light': STYLES.COLORS.DARK_GRAY_OPACITY,
        'dark': STYLES.COLORS.WHITE_OPACITY3,
        'celsius': STYLES.COLORS.DARK_GRAY_OPACITY,
    }[theme])

    render() {
        const { theme, cmpStyle, disabled, maxLenght, autoFocus, placeholder, keyboardType, value, secureTextEntry, style } = this.props
        const editable = !disabled;
        const placeholderTextColor = this.getPlaceholderTextColor(theme);
        return (
            <TextInput
                style={[cmpStyle.input, style]}
                onChangeText={this.onChangeText}
                value={value}
                autoFocus={autoFocus}
                editable={editable}
                maxLength={maxLenght}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
            />
        )
    }
}

export default testUtil.hookComponent(CelInput);
