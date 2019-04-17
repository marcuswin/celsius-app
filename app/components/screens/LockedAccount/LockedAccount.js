import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as appActions from '../../../redux/actions'
import LockedAccount from './LockedAccount.styles'
import { GLOBAL_STYLE_DEFINITIONS as globalStyle } from '../../../config/constants/style'
import CelButton from '../../atoms/CelButton/CelButton'

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LockedAccountMode extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // initial state
    }
    // binders
  }
  // event handlers
  // rendering methods
  render () {
    return (
      <View style={LockedAccount.background}>
        <Image
          source={require('../../../../assets/images/sorry-deer3x.png')}
          style={[LockedAccount.image, { resizeMode: 'contain' }]}
        />
        <Text style={[globalStyle.heading, LockedAccount.header]}>
          Too many requests
        </Text>
        <Text style={[globalStyle.normalText, LockedAccount.explanation]}>
          Yikes, it looks like you made several wrong attempts in a short period
          of time. You will be able to use the application again in less than an
          hour. You can reach out to our support team at app@celsius.network.
        </Text>

        <CelButton
          margin='40 0 0 0'
          color='blue'
          onPress={() => {
            this.props.actions.navigateTo('Home')
          }}
        >
          Try again
        </CelButton>
      </View>
    )
  }
}

export default LockedAccountMode
