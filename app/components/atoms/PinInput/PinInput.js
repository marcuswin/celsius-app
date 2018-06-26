import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, ViewPropTypes } from 'react-native';
import _ from 'lodash';

// if ViewPropTypes is not defined fall back to View.propType (to support RN < 0.44)
const viewPropTypes = ViewPropTypes || View.propTypes;

export default class ConfirmationCodeInput extends Component {
  static propTypes = {
    codeLength: PropTypes.number,
    inputPosition: PropTypes.string,
    size: PropTypes.number,
    space: PropTypes.number,
    className: PropTypes.string,
    cellBorderWidth: PropTypes.number,
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    ignoreCase: PropTypes.bool,
    autoFocus: PropTypes.bool,
    codeInputStyle: TextInput.propTypes.style,
    containerStyle: viewPropTypes.style,
    onChangeCode: PropTypes.func,
    defaultCode: PropTypes.string,
  };

  static defaultProps = {
    codeLength: 5,
    inputPosition: 'center',
    autoFocus: true,
    size: 40,
    className: 'border-box',
    cellBorderWidth: 1,
    activeColor: 'rgba(255, 255, 255, 1)',
    inactiveColor: 'rgba(255, 255, 255, 0.2)',
    space: 8,
    compareWithCode: '',
    ignoreCase: false,
    defaultCode: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0,
    };

    this.codeInputRefs = [];
  }

  componentDidMount() {
    const { defaultCode } = this.props;

    this.setState({
      codeArr: _.split(defaultCode, '')
    });

  }

  onFocus(index) {
    const { onChangeCode } = this.props;
    /* eslint-disable */

    let newCodeArr = _.clone(this.state.codeArr);
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return this.setFocus(currentEmptyIndex);
    }
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }

      /* eslint-enable */
    }

    if (onChangeCode) {
      onChangeCode(newCodeArr.join(''));
    }

    this.setState({
      codeArr: newCodeArr,
      currentIndex: index
    })
  }

  onKeyPress(e) {
    if (e.nativeEvent.key === 'Backspace') {
      const { currentIndex } = this.state;
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      this.setFocus(nextIndex);
    }
  }

  onInputCode(character, index) {
    const { codeLength, onChangeCode } = this.props;
    // eslint-disable-next-line
    let newCodeArr = _.clone(this.state.codeArr);
    newCodeArr[index] = character;

    if (index === codeLength - 1) {
      const code = newCodeArr.join('');

      this.blur(this.state.currentIndex);

      if (onChangeCode) {
        onChangeCode(code);
      }

    } else {
      this.setFocus(this.state.currentIndex + 1);
    }
    // eslint-disable-next-line
    this.setState(prevState => {
      return {
        codeArr: newCodeArr,
        currentIndex: prevState.currentIndex + 1
      };
    });
  }

  getClassStyle(className, active) {
    const { cellBorderWidth, activeColor, inactiveColor, space } = this.props;
    const classStyle = {
      ...this.getInputSpaceStyle(space),
      color: activeColor
    };

    switch (className) {
      case 'clear':
        return _.merge(classStyle, { borderWidth: 0 });
      case 'border-box':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor)
        });
      case 'border-circle':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderRadius: 50,
          borderColor: (active ? activeColor : inactiveColor)
        });
      case 'border-b':
        return _.merge(classStyle, {
          borderBottomWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor),
        });
      case 'border-b-t':
        return _.merge(classStyle, {
          borderTopWidth: cellBorderWidth,
          borderBottomWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor)
        });
      case 'border-l-r':
        return _.merge(classStyle, {
          borderLeftWidth: cellBorderWidth,
          borderRightWidth: cellBorderWidth,
          borderColor: (active ? activeColor : inactiveColor)
        });
      default:
        return className;
    }
  }

  setFocus(index) {
    this.codeInputRefs[index].focus();
  }

  getContainerStyle(size, position) {
    switch (position) {
      case 'left':
        return {
          justifyContent: 'flex-start',
          height: size
        };
      case 'center':
        return {
          justifyContent: 'center',
          height: size
        };
      case 'right':
        return {
          justifyContent: 'flex-end',
          height: size
        };
      default:
        return {
          justifyContent: 'space-between',
          height: size
        }
    }
  }

  getInputSpaceStyle(space) {
    const { inputPosition } = this.props;
    switch (inputPosition) {
      case 'left':
        return {
          marginRight: space
        };
      case 'center':
        return {
          marginRight: space / 2,
          marginLeft: space / 2
        };
      case 'right':
        return {
          marginLeft: space
        };
      default:
        return {
          marginRight: 0,
          marginLeft: 0
        };
    }
  }

  blur(index) {
    this.codeInputRefs[index].blur();
  }

  clear() {
    this.setState({
      codeArr: new Array(this.props.codeLength).fill(''),
      currentIndex: 0
    });
    this.setFocus(0);
  }

  render() {
    const {
      codeLength,
      codeInputStyle,
      containerStyle,
      inputPosition,
      autoFocus,
      className,
      size,
      activeColor
    } = this.props;

    const initialCodeInputStyle = {
      width: size,
      height: size
    };

    const codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      const id = i;
      codeInputs.push(
        <TextInput
          key={id}
          ref={ref => (this.codeInputRefs[id] = ref)}
          style={[
            styles.codeInput,
            initialCodeInputStyle,
            this.getClassStyle(className, this.state.currentIndex === id),
            codeInputStyle
          ]}
          underlineColorAndroid="transparent"
          selectionColor={activeColor}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          {...this.props}
          autoFocus={autoFocus && id === 0}
          onFocus={() => this.onFocus(id)}
          value={this.state.codeArr[id] ? this.state.codeArr[id].toString() : ''}
          onChangeText={text => this.onInputCode(text, id)}
          onKeyPress={(e) => this.onKeyPress(e)}
          maxLength={1}
        />
      )
    }

    return (
      <View style={[styles.container, this.getContainerStyle(size, inputPosition), containerStyle]}>
        {codeInputs}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  codeInput: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: 0,
  }
});