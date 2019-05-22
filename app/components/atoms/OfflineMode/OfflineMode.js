import React, { Component } from 'react'
import { View, Image } from 'react-native'
import testUtil from '../../../utils/test-util'
import OfflineModeStyle from './OfflineMode.styles'
import CelText from '../CelText/CelText'

class OfflineMode extends Component {
  render () {
    const style = OfflineModeStyle()
    return (
      <View style={style.container}>
        <View>
          <Image
            source={require('../../../../assets/images/deer-sad.png')}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />
        </View>

        <CelText
          margin='20 0 15 0'
          align='center'
          type='H2'
          weight={'700'}
          bold
        >
          No internet connection
        </CelText>
        <CelText margin='5 0 15 0' align='center' type='H4' weight={'300'}>
          Please, make sure that your Wi-Fi or Cellular data is turned on, then{' '}
          <CelText type='H4' weight={'bold'}>
            try again.
          </CelText>
        </CelText>
      </View>
    )
  }
}

OfflineMode.propTypes = {}

export default testUtil.hookComponent(OfflineMode)
