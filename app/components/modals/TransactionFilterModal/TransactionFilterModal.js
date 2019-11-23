import React, { Component } from "react";
// import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TransactionFilterModalStyle from "./TransactionFilterModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import Icon from "../../atoms/Icon/Icon";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import * as appActions from "../../../redux/actions";
import Separator from "../../atoms/Separator/Separator";
import { widthPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";

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

// TODO: move to atom
const TransactionsFilterItem = ({
  item,
  activeCoin,
  customStyles,
  onPressIcon,
}) => {
  const style = TransactionFilterModalStyle();
  return (
    <View style={style.itemStyle}>
      <TouchableOpacity style={style.optionPickerWrapper} onpress={onPressIcon}>
        <View
          style={[
            style.iconWrapper,
            customStyles,
            { backgroundColor: STYLES.COLORS.LIGHT_GRAY },
          ]}
        >
          {activeCoin === "coin" ? ( // TODO: handle icon/image style depending on selection
            <Image source={{ uri: item.image_url }} style={style.iconWrapper} />
          ) : (
            <Icon
              name={item.icon || "CloseCircle"}
              fill={STYLES.COLORS.DARK_GRAY3}
              height={"12"}
              width={"12"}
            />
          )}
        </View>

        <CelText weight={"300"}>{item.name || item}</CelText>
      </TouchableOpacity>
      <TouchableOpacity style={style.clearSelectWrapper}>
        <Icon
          name={"Close"}
          fill={STYLES.COLORS.DARK_GRAY3}
          height={"16"}
          width={"16"}
        />
      </TouchableOpacity>
    </View>
  );
};

@connect(
  state => ({
    coins: state.currencies.rates,
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
    const { coins } = this.props;

    const coinsList = coins.map(c => ({
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
                onPressIcon={() => {
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
            renderItem={({ item }) => <TransactionsFilterItem item={item} />}
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
          renderItem={({ item }) => (
            <TransactionsFilterItem activeCoin={"coin"} item={item} />
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
