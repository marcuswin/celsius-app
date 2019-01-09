import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo';
import { STYLES } from '../../../config/constants/style';
import { FadeInView } from './FadeInView';
import WalletBalanceStyle from '../../screens/WalletBalance/WalletBalance.styles';
// You can then use your `FadeInView` in place of a `View` in your components.v2:
export class LoadingSection extends React.Component {
    state = {
        backgroundColor: "#F1F1F1",
        lineColor: STYLES.GRAY_1
    };
    render() {
        const { backgroundColor, lineColor } = this.state;
        const { height } = this.props;
        return (<View style={[{ marginTop: 15, backgroundColor: lineColor }, WalletBalanceStyle.card, WalletBalanceStyle.cardLoading, {
            borderColor: lineColor, borderWidth: 2, height: height + 4,
            borderRadius: 8
        }]}>
            <FadeInView style={[{ height, position: 'absolute' }, WalletBalanceStyle.cardLoading, { width: 30 }]}>
                <LinearGradient start={[1, 1]} end={[0, 1]} colors={[lineColor, backgroundColor, lineColor]} style={{ height, alignItems: 'center', borderRadius: 5, opacity: 1 }} />
            </FadeInView>
        </View>);
    }
}
