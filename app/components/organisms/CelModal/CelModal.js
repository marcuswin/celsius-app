import React, { Component } from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BlurView } from 'expo'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
import CelModalStyle from './CelModal.styles'
import Icon from '../../atoms/Icon/Icon'

import { MODALS } from '../../../constants/UI'
import { heightPercentageToDP, getPadding } from '../../../utils/styles-util'
import CelText from '../../atoms/CelText/CelText'
import Message from '../../molecules/Message/Message'

@connect(
  state => ({
    openedModal: state.ui.openedModal
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelModal extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(MODALS)).isRequired,
    shouldRenderCloseButton: PropTypes.bool,
    picture: PropTypes.number,
    header: PropTypes.bool,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    marginTop: PropTypes.number,
    height: PropTypes.number,
    noScroll: PropTypes.bool,
    onClose: PropTypes.func,
    padding: PropTypes.string
  }
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
    header: false,
    noScroll: false
    // marginTop: heightPercentageToDP("15%"),
    // height: heightPercentageToDP("65%"),
  }

  getTintColor = () => {
    const { theme } = this.props
    return {
      light: 'light',
      dark: 'dark',
      celsius: 'dark'
    }[theme]
  }

  renderImage = () => {
    const { picture } = this.props
    const style = CelModalStyle()

    if (!picture) return null
    return (
      <View style={style.imageWrapper}>
        <Image
          source={picture}
          style={[style.modalImage]}
          resizeMode='contain'
        />
      </View>
    )
  }

  render () {
    const {
      openedModal,
      name,
      actions,
      shouldRenderCloseButton,
      children,
      header,
      primaryText,
      secondaryText,
      picture,
      noScroll,
      onClose,
      padding
    } = this.props
    const style = CelModalStyle()
    const paddingStyle = padding ? getPadding(padding) : {}
    // const tintColor = this.getTintColor();

    const size = picture
      ? { paddingVertical: heightPercentageToDP('18%') }
      : { paddingVertical: heightPercentageToDP('5%') }

    return (
      <Modal
        animationType='fade'
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
      >
        <BlurView
          tint={'dark'}
          intensity={100}
          style={StyleSheet.absoluteFill}
        />
        <Message />

        <View style={[style.wrapper, size]}>
          <View style={[style.modal]}>
            {this.renderImage()}
            {shouldRenderCloseButton ? (
              <TouchableOpacity
                style={style.closeBtn}
                onPress={() => {
                  actions.closeModal()
                  if (onClose) onClose()
                }}
              >
                <Icon
                  name='Close'
                  height='15'
                  width='15'
                  viewBox='0 0 1000 1000'
                  fill={'#3D4853'}
                />
              </TouchableOpacity>
            ) : null}
            {header ? (
              <View style={style.modalHeadingWrapper}>
                <CelText type={'H1'} style={style.mainHeadingText}>
                  {primaryText}
                </CelText>
                <CelText
                  type={'H3'}
                  weight={'400'}
                  style={style.secondaryHeadingText}
                >
                  {secondaryText}
                </CelText>
              </View>
            ) : null}
            {noScroll ? (
              <View
                style={[
                  style.contentWrapper,
                  {
                    marginTop: header
                      ? heightPercentageToDP('15.3%')
                      : heightPercentageToDP('8%')
                  },
                  paddingStyle
                ]}
              >
                {children}
              </View>
            ) : (
              <ScrollView
                style={[
                  style.contentWrapper,
                  {
                    marginTop: header
                      ? heightPercentageToDP('15.3%')
                      : heightPercentageToDP('8%')
                  },
                  paddingStyle
                ]}
                showsVerticalScrollIndicator
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {children}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    )
  }
}

export default testUtil.hookComponent(CelModal)
