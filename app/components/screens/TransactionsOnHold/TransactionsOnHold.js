import React, {Component} from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';
import { List, ListItem } from 'native-base';
import { Grid, Col } from "react-native-easy-grid";

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
// import TransactionsOnHoldStyle from "./TransactionsOnHold.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import TransactionRowStyles from "../../atoms/TransactionRow/TransactionRow.styles";
import { STYLES } from "../../../config/constants/style";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import { TRANSFER_STATUSES } from "../../../config/constants/common";

const colors = {
  claimed: STYLES.YELLOW,
  expired: STYLES.PRIMARY_RED,
}
const statusTexts = {
  claimed: 'On hold',
  expired: 'Returned',
}

@connect(
  state => ({
    transfers: state.transfers.transfers,
    currencyRatesShort: state.generalData.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TransactionsOnHold extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    const { actions } = this.props;

    actions.getAllTransfers(TRANSFER_STATUSES.expired);
  }

  // event hanlders
  getTimeDisplay = (transfer) => {
    const expirationDate = moment(transfer.created_at).add(7, 'd');
    let timeText;
    if (expirationDate.isBefore(moment()) || transfer.expired_at) {
      timeText = moment(transfer.expired_at || expirationDate).format('DD MMM YYYY');
    } else {
      const dayDiff = expirationDate.diff(moment(), 'days');
      timeText = `${dayDiff} day${ dayDiff > 1 ? 's' : '' } left`;
    }

    return timeText;
  }

  // rendering methods
  render() {
    const { transfers, actions, currencyRatesShort } = this.props;
    return (
      <SimpleLayout
        mainHeader={{ onCancel: () => actions.navigateTo('Home') }}
        animatedHeading={{ text: 'Transactions on-hold'}}
      >
        <InfoBubble
          color="gray"
          renderContent={(textStyles) => (
            <Text style={[textStyles, { textAlign: 'center' }]}>
              You have up to 7 days to accept transactions. To do that, please verify your profile.
            </Text>
          )}
        />

        <View>
          <List
            dataArray={transfers}
            scrollEnabled={false}
            style={{marginBottom: 30}}
            renderRow={(item) =>
              <ListItem style={TransactionRowStyles.listItem}>
                <Grid style={{paddingLeft: 0, marginLeft: 0}}>
                  <Col size={70} style={{paddingLeft: 0, marginLeft: 0}}>
                    <Col style={{ width: 40, position: "absolute" }}>
                      <Icon
                        name='ReceiveArrow'
                        height='36'
                        width='36'
                        viewBox="0 0 36 36"
                        fill={colors[item.status]}
                        stroke='white'
                      />
                    </Col>
                    <Col style={{paddingLeft: 40}}>
                      <Text style={TransactionRowStyles.usdAmount}>
                        {formatter.usd(item.amount * currencyRatesShort[item.coin.toLowerCase()])}
                      </Text>
                      <Text style={TransactionRowStyles.coinAmount}>
                        {formatter.crypto(item.amount, item.coin.toUpperCase(), { precision: 5 })}
                      </Text>
                    </Col>
                  </Col>
                  <Col size={50}>
                    <View style={{display: 'flex', alignSelf: 'flex-end'}}>
                      <Text style={[TransactionRowStyles.time, { alignSelf: 'flex-end' }]}>{ this.getTimeDisplay(item) }</Text>
                      <Text
                        style={[TransactionRowStyles.status, {color: colors[item.status]}]}>
                        { statusTexts[item.status] }
                      </Text>
                    </View>
                  </Col>
                </Grid>
              </ListItem>
            }/>
        </View>
      </SimpleLayout>
    );
  }
}

export default TransactionsOnHold;
