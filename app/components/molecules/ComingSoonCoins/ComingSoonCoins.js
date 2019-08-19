import React from 'react';
import PropTypes from 'prop-types';
import { Image, Linking, View } from "react-native";

import ComingSoonCoinsStyle from "./ComingSoonCoins.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import { WALLET_LANDING_VIEW_TYPES } from "../../../constants/UI";

const COMING_SOON_COINS = [
  { name: 'TrueGBP', short: 'TGBP', image_url: require('../../../../assets/images/coins/TGBP-500x500.png'), learn_more_link: 'https://www.trusttoken.com/truegbp' },
  { name: 'TrueAUD', short: 'TAUD', image_url: require('../../../../assets/images/coins/TAUD-500x500.png'), learn_more_link: 'https://www.trusttoken.com/trueaud' },
  { name: 'TrueCAD', short: 'TCAD', image_url: require('../../../../assets/images/coins/TCAD-500x500.png'), learn_more_link: 'https://www.trusttoken.com/truecad' },
  { name: 'Algorand', short: 'ALGO', image_url: require('../../../../assets/images/coins/algorand.png'), learn_more_link: 'https://www.algorand.com/' },
  { name: 'EOS', short: 'EOS', image_url: require('../../../../assets/images/coins/eos.png'), learn_more_link: 'https://eos.io/' },
  { name: 'Tron', short: 'TRX', image_url: require('../../../../assets/images/coins/tron3x.png'), learn_more_link: 'https://tron.network/' },

]

const ComingSoonCoins = (props) => {
  const style = ComingSoonCoinsStyle(props.theme)
  const { activeView } = props
  const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID
  const cardSize = activeView === WALLET_LANDING_VIEW_TYPES.GRID ? 'half' : 'full'
  const textSize = activeView === WALLET_LANDING_VIEW_TYPES.GRID ? 'H4' : 'H3'

  return (
    <View style={style.container}>
      <Separator margin="10 0 10 0" text="COMING SOON"/>

      <View style={style.flexWrapper}>
        { COMING_SOON_COINS.map(csc => (
          <Card size={cardSize} key={csc.short}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 12,
                  }}
                  resizeMode="contain"
                  source={csc.image_url}
                />

                <View>
                  <CelText weight='300' type="H6">{ csc.short }</CelText>
                  <CelText type={textSize}>{ csc.name }</CelText>

                  { isGrid && (
                    <CelText
                      color={STYLES.COLORS.CELSIUS_BLUE}
                      type="H6"
                      onPress={() => Linking.openURL(csc.learn_more_link)}
                    >
                      Learn more
                    </CelText>
                  )}
                </View>
              </View>

              { !isGrid && (
                <CelText
                  color={STYLES.COLORS.CELSIUS_BLUE}
                  onPress={() => Linking.openURL(csc.learn_more_link)}
                >
                  Learn more
                </CelText>
              )}
            </View>
          </Card>
        ))}
      </View>
    </View>
  )
}

ComingSoonCoins.propTypes = {
  activeView: PropTypes.oneOf(Object.values(WALLET_LANDING_VIEW_TYPES))
}

export default ComingSoonCoins
