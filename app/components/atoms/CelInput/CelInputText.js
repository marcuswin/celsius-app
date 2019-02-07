import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelInputStyle from "./CelInput.styles";
import STYLES from '../../../constants/STYLES';
import { THEMES } from '../../../constants/UI';

@connect(
    state => ({
        cmpStyle: CelInputStyle(state.ui.theme),
        lastSavedTheme: state.ui.theme
    }),
    dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelInput extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['text', 'password', 'phone', 'checkbox', 'pin', 'tfa', 'number']),
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
            active: false,
            textValue: ''
        }
        this.changeTimer = null;
    }

    componentDidMount = () => {
        const { value } = this.props;
        this.setState({ textValue: value })
    }


    onChangeText = (text) => {
        this.setState({ textValue: text })
        clearTimeout(this.changeTimer)
        const { field, onChange, actions } = this.props;
        if (onChange) {
            this.changeTimer = setTimeout(() => onChange(field, text), 750)
        } else {
            this.changeTimer = setTimeout(() => actions.updateFormField(field, text), 750)
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


    getPlaceholderTextColor = (theme) => {
        switch (theme) {
            case THEMES.LIGHT:
                return STYLES.COLORS.DARK_GRAY_OPACITY
            case THEMES.DARK:
                return STYLES.COLORS.WHITE_OPACITY3
            case THEMES.CELSIUS:
                return STYLES.COLORS.DARK_GRAY_OPACITY
        }
    }
    render() {
        const { theme, lastSavedTheme, disabled, maxLenght, autoFocus, placeholder, keyboardType, secureTextEntry, style } = this.props
        const { textValue } = this.state;
        const editable = !disabled;
        const currentTheme = theme || lastSavedTheme;
        const placeholderTextColor = this.getPlaceholderTextColor(currentTheme);
        const cmpStyle = CelInputStyle(currentTheme);

        return (
            <TextInput
                style={[cmpStyle.input, style]}
                onChangeText={this.onChangeText}
                value={textValue}
                autoFocus={autoFocus}
                editable={editable}
                maxLength={maxLenght}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid={'rgba(0,0,0,0)'}
            />
        )
    }
}

export default testUtil.hookComponent(CelInput);
