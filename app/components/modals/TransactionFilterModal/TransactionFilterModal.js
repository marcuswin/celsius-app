import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { FlatList, ScrollView, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TransactionFilterModalStyle from "./TransactionFilterModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import * as appActions from "../../../redux/actions";
import Separator from "../../atoms/Separator/Separator";
import { widthPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import TransactionsFilterItem from "../../atoms/TransactionsFilterItem/TransactionsFilterItem";

// TODO: move to cosntant24s
const DATE_OPTIONS = [
  "Anytime",
  "Last Day",
  "Last Week",
  "Last Month",
  "Last Year",
];

const TRANSACTION_TYPE = [
  {
    name: "All Transactions",
    icon: "CircleCheckIcon",
  },
  {
    name: "Interest",
    icon: "TransactionInterest",
  },
  {
    name: "Deposits",
    icon: "TransactionReceived",
  },
  {
    name: "CelPay",
    icon: "TransactionCelpay",
  },
  {
    name: "Loans",
    icon: "TransactionLoan",
  },
  {
    name: "Withdrawals",
    icon: "TransactionSent",
  },
];

@connect(
  state => ({
    coins: state.currencies.rates,
    formData: state.forms.formData,
    depositCompliance: state.compliance.deposit,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionFilterModal extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    const coinsList = this.handleCoinsList();

    this.state = {
      dateFilter: DATE_OPTIONS[0],
      transactionTypeFilter: TRANSACTION_TYPE[0].name,
      coinsFilter: coinsList[0],
    };
  }

  handleCoinsList = () => {
    const { coins, depositCompliance } = this.props;

    // const filteredCoins = coins.filter(({coin}) => !coin.short.includes("BTC"))
    const coinSelectItems = coins.filter(c =>
      depositCompliance.coins.includes(c.short)
    );

    const coinsList = coinSelectItems.map(c => ({
      ...c,
      icon: `Icon${c.short}`,
      name: formatter.capitalize(c.name),
    }));

    coinsList.unshift({
      name: "All Transactions",
      icon: "CircleCheckIcon",
    });

    return coinsList;
  };

  renderDateList = () => {
    const style = TransactionFilterModalStyle();

    // TODO: add selection to state

    return (
      <View style={style.allFiltersContainer}>
        <ExpandableItem
          heading={"DATE"}
          isExpanded
          margin={"0 20 0 20"}
          childrenStyle={{ marginTop: 20, marginBottom: 20 }}
        >
          <FlatList
            data={DATE_OPTIONS}
            renderItem={({ item, index }) => (
              <TransactionsFilterItem
                item={item}
                onChange={() => {
                  this.setState({
                    dateFilter: DATE_OPTIONS[index],
                  });
                }}
              />
            )}
          />
        </ExpandableItem>
      </View>
    );
  };

  renderTransactionTypeList = () => {
    const style = TransactionFilterModalStyle();

    // TODO: add selection to state

    return (
      <View style={style.allFiltersContainer}>
        <ExpandableItem
          heading={"TRANSACTION TYPE"}
          isExpanded
          margin={"0 20 0 20"}
          childrenStyle={{ marginTop: 20, marginBottom: 20 }}
        >
          <FlatList
            data={TRANSACTION_TYPE}
            // renderItem={({item}) => <TransactionsFilterItem item={item} />}
            renderItem={({ item, index }) => (
              <TransactionsFilterItem
                item={item}
                onChange={() => {
                  this.setState({
                    dateFilter: TRANSACTION_TYPE[index],
                  });
                }}
              />
            )}
          />
        </ExpandableItem>
      </View>
    );
  };

  renderCoinsList = () => {
    const style = TransactionFilterModalStyle();
    const coinsList = this.handleCoinsList();

    // TODO: add selection to state

    return (
      <View style={style.allFiltersContainer}>
        <View
          style={{
            width: widthPercentageToDP("80%"),
            alignSelf: "center",
          }}
        >
          <Separator text={"COINS"} margin={"0 0 20 0"} />
        </View>
        <FlatList
          data={coinsList}
          renderItem={({ item, index }) => (
            <TransactionsFilterItem
              activeCoin={"coin"}
              item={item}
              onChange={() => {
                this.setState({
                  dateFilter: coinsList[index],
                });
              }}
            />
          )}
        />
      </View>
    );
  };

  render() {
    const style = TransactionFilterModalStyle();

    return (
      <CelModal
        style={style.container}
        name={MODALS.TRANSACTION_FILTER_MODAL}
        maxHeight={"92%"}
      >
        <ScrollView>
          {/* TODO: handle radio buttons selection*/}
          {this.renderDateList()}

          {/* TODO: handle radio buttons selection*/}
          {this.renderTransactionTypeList()}

          {/* TODO: handle checkbox selection*/}
          {this.renderCoinsList()}
        </ScrollView>
      </CelModal>
    );
  }
}

export default TransactionFilterModal;
