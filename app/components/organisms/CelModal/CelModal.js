import React, { Component } from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BlurView } from 'expo-blur';


import * as appActions from '../../../redux/actions'
import CelModalStyle from './CelModal.styles'
import Icon from '../../atoms/Icon/Icon'

import { MODALS, THEMES } from '../../../constants/UI'
import {
  heightPercentageToDP,
  widthPercentageToDP,
  getPadding,
  addThemeToComponents,
} from '../../../utils/styles-util'
import CelText from '../../atoms/CelText/CelText'
import CelInput from '../../atoms/CelInput/CelInput'
import Message from '../../molecules/Message/Message'
import STYLES from '../../../constants/STYLES';

const cardWidth = widthPercentageToDP("70%");
const { width } = Dimensions.get('window');

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
    picture: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number
    ]),
    header: PropTypes.bool,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    marginTop: PropTypes.number,
    height: PropTypes.number,
    noScroll: PropTypes.bool,
    onClose: PropTypes.func,
    padding: PropTypes.string,
    onBackdropPress: PropTypes.func,
    pictureCircle: PropTypes.bool,
    content: PropTypes.instanceOf(Array),
    index: PropTypes.number,
    modalInfo: PropTypes.instanceOf(Array),
    type: PropTypes.string,
  }
  static defaultProps = {
    shouldRenderCloseButton: true,
    picture: null,
    header: false,
    noScroll: false,
    pictureCircle: false,
    // marginTop: heightPercentageToDP("15%"),
    // height: heightPercentageToDP("65%"),
    modalInfo: []
  }

  constructor(props) {
    super(props);

    this.state = {
      xOffset: new Animated.Value(0),
    }
  }

  getTintColor = () => {
    const { theme } = this.props
    return {
      light: 'light',
      dark: 'dark',
      celsius: 'dark'
    }[theme]
  }

  closeModalHandler = () => {
    const { closeModal } = this.props
    closeModal()
    this.setState({ currentStep: 1 })
  }


  transitionAnimation = (index) => ({
    transform: [
      { perspective: 800 },
      {
        scale: this.state.xOffset.interpolate({
          inputRange: [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth
          ],
          outputRange: [0.9, 1, 0.9],
          extrapolate: "clamp"
        })
      }
    ]
  });

  renderImage = () => {
    const { picture, pictureCircle } = this.props
    const style = CelModalStyle()

    // const pic = modalInfo.map(step => step.image)

    if (!picture) return null;
    if (pictureCircle) return (
      <View style={style.imageWrapperCircle}>
        <Image source={picture} style={style.modalImageCircle} resizeMode='contain' />
      </View>
    )
    // if (!!modalInfo) return (
    //   <View style={style.imageWrapper} >
    //     <Image source={modalInfo.map(step => step.image)} resizeMode='contain' />
    //   </View >
    // )

    return (
      <View style={style.imageWrapper}>
        <Image source={picture} style={style.modalImage} resizeMode='contain' />
      </View>
    )

  }

  renderDots() {
    const { modalInfo } = this.props

    const position = Animated.divide(this.state.xOffset, width);

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 35 }}>
        {modalInfo.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001],
            outputRange: [0.3, 1, 1, 1, 0.3],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={i}
              style={{ opacity, height: 10, width: 10, backgroundColor: STYLES.COLORS.MEDIUM_GRAY, margin: 8, borderRadius: 5 }}
            />
          );
        })
        }

      </View>
    );
  }




  renderModalContent() {
    const { xOffset } = this.state;
    const { modalInfo } = this.props
    const style = CelModalStyle()
    // const ButtonStyle = this.buttonColor;

    return (
      <View>
        <ScrollView>
          <Animated.ScrollView
            style={{ flexGrow: 1, }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true },

            )}
            onScrollEndDrag={this.scroll}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {modalInfo.map((step, index) => (
              <Animated.View style={[style.screen, this.transitionAnimation(index)]}>
                <CelText type='H2' weight='bold' style={style.title}>{step.title}</CelText>
                <CelText type='H4' style={style.description}>{step.description}</CelText>
              </Animated.View>
            )
            )
            }
          </Animated.ScrollView>
          <View style={style.button}>
            {/* <ButtonStyle /> */}
            <TouchableOpacity style={{ marginTop: 10 }} onPress={this.closeModalHandler}>
              <CelText> Skip </CelText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }


  render() {
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
      padding,
      modalInfo
    } = this.props
    const style = CelModalStyle()
    const paddingStyle = padding ? getPadding(padding) : {}
    // const tintColor = this.getTintColor();

    const size = picture
      ? { paddingVertical: heightPercentageToDP('18%') }
      : { paddingVertical: heightPercentageToDP('5%') }

    const childrenWithProps = addThemeToComponents(
      children,
      [CelText.displayName, CelInput.displayName],
      THEMES.LIGHT
    )

    return (
      <Modal
        animationType='fade'
        transparent
        onRequestClose={() => actions.closeModal()}
        visible={openedModal === name}
        modalInfo={modalInfo}
      >
        <Message />

        <View style={[style.wrapper, size]}>
          <View style={style.modal}>
            {this.renderImage()}
            {shouldRenderCloseButton ? (
              <TouchableOpacity
                style={style.closeBtn}
                onPress={() => {
                  actions.closeModal()
                  if (onClose) onClose()
                }}
              >
                <Icon name='Close' height='15' width='15' viewBox='0 0 1000 1000' fill={'#3D4853'} marginTop={20} />
              </TouchableOpacity>
            ) : null}
            {header ? (
              <View style={style.modalHeadingWrapper}>
                <CelText theme={THEMES.LIGHT} type={'H1'}>
                  {primaryText}
                </CelText>
                <CelText theme={THEMES.LIGHT} type={'H3'} weight={'400'}>
                  {secondaryText}
                </CelText>
              </View>
            )
              :
              null}

            {noScroll ? (
              <View style={[style.contentWrapper, { marginTop: header ? heightPercentageToDP('15.3%') : heightPercentageToDP('8%') }, paddingStyle]}>
                {childrenWithProps}
              </View>
            ) : (
                <ScrollView
                  style={[style.contentWrapper, { marginTop: header ? heightPercentageToDP('15.3%') : heightPercentageToDP('5%') }, paddingStyle]}
                  showsVerticalScrollIndicator
                  contentContainerStyle={{ flexGrow: 1 }}
                >
                  {modalInfo.length > 1 && this.renderDots()}
                  {!!modalInfo && this.renderModalContent()}
                  {childrenWithProps}

                </ScrollView>
              )}
          </View>
          <BlurView tint={'dark'} intensity={100} style={StyleSheet.absoluteFill}
          >
            <TouchableOpacity style={style.outsideCloseModal} onPress={() => {
              actions.closeModal()
              if (onClose) onClose()
            }}
            />
          </BlurView>
        </View>
      </Modal>
    )
  }
}

export default CelModal
