import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import { G, Line } from "react-native-svg";
import get from "lodash/get";
import moment from "moment";
import { COLORS, FONT_SCALE, STYLES } from "../../../config/constants/style";
import formatter from "../../../utils/formatter";
import testUtil from "../../../utils/test-util";

import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import WalletDetailsGraphContainerStyle from "./WalletDetailsGraphContainer.styles";


const periods = ["1d", "7d", "1m", "3m", "1y"];

class WalletDetailsGraphContainer extends Component {

  constructor(props) {
    super(props);
    const { supportedCurrencies, currency } = this.props;
    const period = "1d";
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const percentChange = this.getPercentageChange(currencyData, period);
    const graphDataPrices = this.getGraphData(supportedCurrencies, currency, period);

    this.state = {
      activePeriod: period,
      percentChange,
      graphData: graphDataPrices
    };

  }

  componentWillReceiveProps(nextProps) {
    const { supportedCurrencies, currency } = this.props;

    if (currency !== nextProps.currency) {
      const period = "1d";
      const currencyData = this.getCurrencyData(supportedCurrencies, nextProps.currency);
      const percentChange = this.getPercentageChange(currencyData, period);
      const graphDataPrices = this.getGraphData(supportedCurrencies, nextProps.currency, period);

      this.setState({
        activePeriod: period,
        percentChange,
        graphData: graphDataPrices
      });

    }

  }


  onPress = (period) => {
    const { supportedCurrencies, currency } = this.props;

    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const percentChange = this.getPercentageChange(currencyData, period);
    const graphDataPrices = this.getGraphData(supportedCurrencies, currency, period);

    this.setState({
      activePeriod: period,
      percentChange,
      graphData: graphDataPrices
    });
  };

  getGraphData = (supportedCurrencies, currency, period) => {
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const graphData = get(currencyData, `market.price_usd.${period}`, null);
    // eslint-disable-next-line
    return graphData != null ? graphData.map(([_timestamp, price]) => price) : null;
  };

  getPercentageChange = (currencyData, period) => get(currencyData, `market.price_change_usd.${period}`, "-");
  getCurrencyData = (supportedCurrencies, currency) => supportedCurrencies != null && supportedCurrencies.find(supportedCurrencie => supportedCurrencie.short === currency.toUpperCase());
  getTimeStamp = (currencyData, period) => get(currencyData, `market.price_usd.${period}`, null);

  render() {
    const { currency, supportedCurrencies } = this.props;
    const { percentChange, graphData, activePeriod } = this.state;
    const isPercentChangeNegative = this.state.percentChange < 0;
    const currencyData = this.getCurrencyData(supportedCurrencies, currency);
    const currencyPrice = get(currencyData, "market.quotes.USD.price", "-");
    const currencyTimeStamp = this.getTimeStamp(currencyData, activePeriod).map(time => time[0]);
    const dates = currencyTimeStamp.map(ts => new Date(ts));

    // {Text as SVGText} from "react-native-svg";

    // const PriceText = (y) => (
    //   <G>
    //     <SVGText
    //       y={y(currencyPrice) + 2}
    //       x={'230'}
    //       fontSize={8 * FONT_SCALE}
    //       fontFamily={'agile-extra-light'}
    //       fontWeight={'100'}
    //       stroke={STYLES.PRIMARY_BLUE}
    //     >{formatter.usd(currencyPrice)}</SVGText>
    //   </G>
    // );

    const HorizontalLine = (({ y }) => (
      <G>
      <Line
        key={"zero-axis"}
        x1={"0%"}
        x2={"100%"}
        y1={y(currencyPrice)}
        y2={y(currencyPrice)}
        stroke={STYLES.PRIMARY_BLUE}
        strokeDasharray={[3,1]}
        strokeWidth={0.7}
      />
      </G>
    ));

    return <View style={WalletDetailsGraphContainerStyle.root}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column", alignItems: "flex-start", alignContent: "flex-start" }}>
          <PricingChangeIndicator
            isPercentChangeNegative={isPercentChangeNegative}
            percentChange={percentChange}
            period={activePeriod}
            rootStyles={{ marginLeft: 0 }}
          />
        </View>
        <View style={{ flexDirection: "column", marginLeft: "auto" }}>
          <Text
            style={[WalletDetailsGraphContainerStyle.coinAmount, { alignSelf: "flex-end" }]}
          >
            1 {currency.toUpperCase()} = <Text
            style={{ fontFamily: "agile-book" }}>{formatter.usd(currencyPrice)}</Text>
          </Text>
        </View>
      </View>
      {graphData && activePeriod === "1d" &&
      <View style={[WalletDetailsGraphContainerStyle.graphDataWrapper, { flexDirection: "column" }]}>
        <View style={{ width: "100%", height: 240, flexDirection: "row" }}>
          <LineChart
            ref={testUtil.generateTestHook(this, 'WalletDetailsGraphContainer.LineChart1d')}
            style={{ width: "85%", position: 'absolute', top: 30, bottom: 30 }}
            data={graphData}
            svg={{ stroke: isPercentChangeNegative ? "#EF461A" : "#4FB895", strokeWidth: 2 }}
          >
            <HorizontalLine/>
          </LineChart>
          <YAxis
            data={graphData}
            svg={{
              fill: "rgba(137,144,153,1)",
              fontSize: 8 * FONT_SCALE,

            }}
            style={{ position: "absolute", right: 0, bottom: 30, top: 30, width: 30, alignItems: "center" }}
            numberOfTicks={4}
            formatLabel={value => `$${value}`}
          />
        </View>
        <XAxis
          data={dates}
          contentInset={{ left: 10 }}
          svg={{
            fill: "rgba(137,144,153,1)",
            fontSize: 8 * FONT_SCALE,
          }}
          style={{ width: "100%" }}
          numberOfTicks={4}
          formatLabel={(index) =>
            moment(dates[index]).format("HA")
          }
        />
      </View>
      }
      {graphData && activePeriod === "7d" &&
      <View style={[WalletDetailsGraphContainerStyle.graphDataWrapper, { flexDirection: "column" }]}>
        <View style={{ width: "100%", height: 240, flexDirection: "row" }}>
          <LineChart
            ref={testUtil.generateTestHook(this, 'WalletDetailsGraphContainer.LineChart7d')}
            style={{ width: "85%" }}
            data={graphData}
            svg={{ stroke: isPercentChangeNegative ? "#EF461A" : "#4FB895", strokeWidth: 2 }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <HorizontalLine/>
          </LineChart>
          <YAxis
            data={graphData}
            svg={{
              fill: "rgba(137,144,153,1)",
              fontSize: 8 * FONT_SCALE,
            }}
            style={{ position: "absolute", right: 0, bottom: 30, top: 30, width: 30, alignItems: "center" }}
            numberOfTicks={4}
            formatLabel={value => `$${value}`}
          />
        </View>
        <XAxis
          data={dates}
          contentInset={{ left: 10 }}
          svg={{
            fill: "rgba(137,144,153,1)",
            fontSize: 8 * FONT_SCALE,
          }}
          style={{ width: "100%" }}
          numberOfTicks={4}
          formatLabel={(index) =>
            moment(dates[index]).format("ddd")
          }
        />
      </View>
      }
      {graphData && activePeriod === "1m" &&
      <View style={[WalletDetailsGraphContainerStyle.graphDataWrapper, { flexDirection: "column" }]}>
        <View style={{ width: "100%", height: 240, flexDirection: "row" }}>
          <LineChart
            ref={testUtil.generateTestHook(this, 'WalletDetailsGraphContainer.LineChart1m')}
            style={{ width: "85%" }}
            data={graphData}
            svg={{ stroke: isPercentChangeNegative ? "#EF461A" : "#4FB895", strokeWidth: 2 }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <HorizontalLine/>
          </LineChart>
          <YAxis
            data={graphData}
            svg={{
              fill: "rgba(137,144,153,1)",
              fontSize: 8 * FONT_SCALE,
            }}
            style={{ position: "absolute", right: 0, bottom: 30, top: 30, width: 30, alignItems: "center" }}
            numberOfTicks={4}
            formatLabel={value => `$${value}`}
          />
        </View>
        <XAxis
          data={dates}
          contentInset={{ left: 10 }}
          svg={{
            fill: "rgba(137,144,153,1)",
            fontSize: 8 * FONT_SCALE,
          }}
          style={{ width: "100%" }}
          numberOfTicks={4}
          formatLabel={(index) =>
            moment(dates[index]).format("DMMM")
          }
        />
      </View>
      }
      {graphData && activePeriod === "3m" &&
      <View style={[WalletDetailsGraphContainerStyle.graphDataWrapper, { flexDirection: "column" }]}>
        <View style={{ width: "100%", height: 240, flexDirection: "row" }}>
          <LineChart
            ref={testUtil.generateTestHook(this, 'WalletDetailsGraphContainer.LineChart3m')}
            style={{ width: "85%" }}
            data={graphData}
            svg={{ stroke: isPercentChangeNegative ? "#EF461A" : "#4FB895", strokeWidth: 2 }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <HorizontalLine/>
          </LineChart>
          <YAxis
            data={graphData}
            svg={{
              fill: "rgba(137,144,153,1)",
              fontSize: 8 * FONT_SCALE,
            }}
            style={{ position: "absolute", right: 0, bottom: 30, top: 30, width: 30, alignItems: "center" }}
            numberOfTicks={4}
            formatLabel={value => `$${value}`}
          />
        </View>
        <XAxis
          data={dates}
          contentInset={{ left: 10 }}
          svg={{
            fill: "rgba(137,144,153,1)",
            fontSize: 8 * FONT_SCALE,
          }}
          style={{ width: "100%" }}
          numberOfTicks={4}
          formatLabel={(index) =>
            moment(dates[index]).format("DMMM")
          }
        />
      </View>
      }
      {graphData && activePeriod === "1y" &&
      <View style={[WalletDetailsGraphContainerStyle.graphDataWrapper, { flexDirection: "column" }]}>
        <View style={{ width: "100%", height: 240, flexDirection: "row" }}>
          <LineChart
            ref={testUtil.generateTestHook(this, 'WalletDetailsGraphContainer.LineChart1y')}
            style={{ width: "85%" }}
            data={graphData}
            svg={{ stroke: isPercentChangeNegative ? "#EF461A" : "#4FB895", strokeWidth: 2 }}
            contentInset={{ top: 30, bottom: 30 }}
          >
            <HorizontalLine/>
          </LineChart>
          <YAxis
            data={graphData}
            svg={{
              fill: "rgba(137,144,153,1)",
              fontSize: 8 * FONT_SCALE,
            }}
            style={{ position: "absolute", right: 0, bottom: 30, top: 30, width: 30, alignItems: "center" }}
            numberOfTicks={4}
            formatLabel={value => `$${value}`}
          />
        </View>
        <XAxis
          data={dates}
          contentInset={{ left: 10 }}
          svg={{
            fill: "rgba(137,144,153,1)",
            fontSize: 8 * FONT_SCALE,
          }}
          style={{ width: "100%" }}
          numberOfTicks={4}
          formatLabel={(index) =>
            moment(dates[index]).format("MMM")
          }
        />
      </View>
      }
      <View style={[WalletDetailsGraphContainerStyle.buttonsWrapper, { flexDirection: "row" }]}>
        {periods.map(period =>
          <TouchableOpacity
            ref={testUtil.generateTestHook(this, `WalletDetailsGraphContainer.${period}`)}
            key={period}
            style={[WalletDetailsGraphContainerStyle.periodButton, this.state.activePeriod === period ? { backgroundColor: COLORS.gray } : null]}
            onPress={() => this.onPress(`${period}`)}
          >
            <Text style={WalletDetailsGraphContainerStyle.periodButtonText}>{period.toUpperCase()}</Text>
          </TouchableOpacity>)
        }
      </View>
    </View>;
  }
}

export default testUtil.hookComponent(WalletDetailsGraphContainer);

