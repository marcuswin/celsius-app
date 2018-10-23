import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { LineChart, XAxis, YAxis } from "react-native-svg-charts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import WalletLayout from "../../layouts/WalletLayout/WalletLayout";
import CelButton from "../../atoms/CelButton/CelButton";

import WalletInterestStyle from "./WalletInterest.styles";
import { FONT_SCALE, STYLES, COLORS } from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import CurrencyInterestRateInfoTable from "../../organisms/CurrencyInterestRateInfoTable/CurrencyInterestRateInfoTable";
import formater from "../../../utils/formatter";

@connect(
  state => ({
    activeScreen: state.nav.routes[state.nav.index].routeName,
    formData: state.ui.formData,
    chartData: state.interest.chartData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletInterest extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1m",
      chartDataSet: {},
      coinsMaxValues: []
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const { activeTab } = this.state;
    actions.getInterestRates();
    actions.getInterestChartData(activeTab);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chartData !== nextProps.chartData) {
      this.addChartTotalValues(nextProps.chartData);
    }
  }

  setChartLines() {
    const { chartDataSet, coinsMaxValues } = this.state;
    const colors = Object.values(COLORS);
    const style = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, height: 250 };
    return Object.keys(chartDataSet).map((coin, lineIndex) =>
      <LineChart
        key={coin}
        style={lineIndex > 0 ? style : { height: 250, width: "100%" }}
        data={chartDataSet[coin]}
        xAccessor={({ index }) => index}
        yAccessor={({ item }) => item.value}
        yMin={0}
        yMax={coinsMaxValues[coinsMaxValues.length - 1]}
        svg={{ stroke: colors[lineIndex] }}
        contentInset={{ top: 30, bottom: 20, left: 20, right: 60 }}
      />
    );
  }

  getMaxValues(newDataSet) {
    const totalMaxValue = [];
    Object.values(newDataSet).forEach(coin => {
      totalMaxValue.push(Math.max(...coin.map(b => b.value)));
    });
    this.setState({ coinsMaxValues: totalMaxValue });
  }

  addChartTotalValues(data) {
    const dataClone = data;
    Object.keys(data).forEach(coin => {
      data[coin].forEach((dateValue, dateIndex) => {
        dataClone[coin][dateIndex].value = Number(dateValue.value);
      });
    });

    const coinValues = [];
    const dateValues = [];

    Object.values(dataClone)[0].forEach((coin) => {
      coinValues.push(coin.value);
      dateValues.push(coin.date);
    });

    Object.values(dataClone).forEach((coin, index) => {
      if (index > 0) {
        coin.forEach((date, dateIndex) => {
          coinValues[dateIndex] += date.value;
        });
      }
    });

    let totalForDate = {};
    const totalValues = [];

    coinValues.forEach((value, index) => {
      totalForDate.value = value;
      totalForDate.date = dateValues[index];
      totalValues.push(totalForDate);
      totalForDate = {};
    });

    const newDataSet = dataClone;
    newDataSet.total = totalValues;
    this.setState({ chartDataSet: newDataSet });
    this.getMaxValues(newDataSet);
  }

  activateTab(tab) {
    const { actions } = this.props;
    const { activeTab } = this.state;

    if (activeTab !== tab) {
      this.setState({ activeTab: tab });
      actions.getInterestChartData(tab);
    }
  };

  render() {
    const { actions, chartData } = this.props;
    const { activeTab, chartDataSet, coinsMaxValues } = this.state;

    console.log({ chartDataSet }, chartData.total);

    return (
      <WalletLayout>
        <View style={WalletInterestStyle.graphAndInterestWrapper}>
          <View style={WalletInterestStyle.thisWeekInterestWrapper}>
            <View style={WalletInterestStyle.interestIconWrapper}>
              <Icon
                name='InterestIcon'
                height='24'
                width='24'
                viewBox="0 0 30 15"
                fill={STYLES.WHITE_TEXT_COLOR}
              />
            </View>
            <View style={WalletInterestStyle.interestTextWrapper}>
              <Text style={WalletInterestStyle.thisWeekText}>
                THIS WEEK YOU'VE EARNED
              </Text>
              <Text style={WalletInterestStyle.thisWeekInterest}>
                {Object.values(chartDataSet)[0] ? formater.usd(coinsMaxValues[coinsMaxValues.length - 1]) : formater.usd(0)}
              </Text>
            </View>
            <Image
              source={require("../../../../assets/images/interest-illu.png")}
              style={{ marginRight: 20 }}
            />
          </View>

          { Object.values(chartDataSet)[0] ?
            <View ref={testUtil.generateTestHook(this, 'WalletInterest.chart')} style={{
              backgroundColor: "white",
              borderRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              shadowOpacity: 1,
              shadowColor: "rgba(0,0,0,0.05)"
            }}>


              {activeTab === "1m" &&
              <View>
                <View style={{ flexDirection: "row" }}>
                  {this.setChartLines()}
                  <YAxis
                    data={chartData.total}
                    svg={{
                      fill: "rgba(137,144,153,1)",
                      fontSize: 8 * FONT_SCALE,
                      fontWeight: "bold"
                    }}
                    yAccessor={({ item }) => item.value}
                    numberOfTicks={4}
                    style={{ position: "absolute", right: 10, height: 250 }}
                    contentInset={{ top: 30, bottom: 20 }}
                    formatLabel={(value) => `$${value}`}
                  />
                </View>
                <XAxis
                  data={Object.values(chartDataSet)[0]}
                  svg={{
                    fill: "rgba(137,144,153,1)",
                    fontSize: 8 * FONT_SCALE,
                    fontWeight: "bold"
                  }}
                  xAccessor={({ index }) => index}
                  numberOfTicks={Object.values(chartDataSet)[0].length - 1}
                  contentInset={{ left: 30, right: 50 }}
                  formatLabel={(_, index) => moment(Object.values(chartDataSet)[0][index].date).format("DD MMM")}
                />
              </View>

              }
              {activeTab === "3m" &&
              <View>
                <View style={{ flexDirection: "row" }}>
                  {this.setChartLines()}
                  <YAxis
                    data={chartData.total}
                    svg={{
                      fill: "rgba(137,144,153,1)",
                      fontSize: 8 * FONT_SCALE,
                      fontWeight: "bold"
                    }}
                    yAccessor={({ item }) => item.value}
                    numberOfTicks={4}
                    style={{ position: "absolute", right: 10, height: 250 }}
                    contentInset={{ top: 30, bottom: 20 }}
                    formatLabel={(value) => `$${value}`}
                  />
                </View>
                <XAxis
                  data={Object.values(chartDataSet)[0]}
                  svg={{
                    fill: "rgba(137,144,153,1)",
                    fontSize: 8 * FONT_SCALE,
                    fontWeight: "bold"
                  }}
                  xAccessor={({ index }) => index}
                  numberOfTicks={Object.values(chartDataSet)[0].length - 1}
                  contentInset={{ left: 30, right: 50 }}
                  formatLabel={(_, index) => moment(Object.values(chartDataSet)[0][index].date).format("MMM")}
                />
              </View>
              }

              {activeTab === "1y" &&
              <View>
                <View style={{ flexDirection: "row" }}>
                  {this.setChartLines()}
                  <YAxis
                    data={chartData.total}
                    svg={{
                      fill: "rgba(137,144,153,1)",
                      fontSize: 8 * FONT_SCALE,
                      fontWeight: "bold"
                    }}
                    yAccessor={({ item }) => item.value}
                    numberOfTicks={4}
                    style={{ position: "absolute", right: 10, height: 250 }}
                    contentInset={{ top: 30, bottom: 20 }}
                    formatLabel={(value) => `$${value}`}
                  />
                </View>
                < XAxis
                  data={Object.values(chartDataSet)[0]}
                  svg={{
                    fill: "rgba(137,144,153,1)",
                    fontSize: 8 * FONT_SCALE,
                    fontWeight: "bold"
                  }}
                  xAccessor={({ index }) => index}
                  numberOfTicks={Object.values(chartDataSet)[0].length - 1}
                  contentInset={{ left: 30, right: 50 }}
                  formatLabel={(_, index) => moment(Object.values(chartDataSet)[0][index].date).format("MMM")}
                />
              </View>
              }


              <View style={WalletInterestStyle.dotWrapper}>
                {Object.keys(chartDataSet).map((coin, lineIndex) =>
                  <View key={coin} style={WalletInterestStyle.dots}>
                    <View style={[WalletInterestStyle.dot, { backgroundColor: Object.values(COLORS)[lineIndex] }]}/>
                    <Text style={WalletInterestStyle.dotText}>{coin}</Text>
                  </View>
                )}
              </View>

              <View>
                <View style={[WalletInterestStyle.pillWrapper]}>
                  <TouchableOpacity ref={testUtil.generateTestHook(this, 'WalletInterest.1m')} onPress={() => this.activateTab("1m")} style={WalletInterestStyle.monthTO}>
                    <View
                      style={activeTab === "1m" ? WalletInterestStyle.monthWrapperActive : WalletInterestStyle.monthWrapper}>
                      <Text
                        style={activeTab === "1m" ? WalletInterestStyle.pillTextActive : WalletInterestStyle.pillText}>1M</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity ref={testUtil.generateTestHook(this, 'WalletInterest.3m')} onPress={() => this.activateTab("3m")} style={WalletInterestStyle.threeMonthTO}>
                    <View
                      style={activeTab === "3m" ? WalletInterestStyle.threeMonthWrapperActive : WalletInterestStyle.threeMonthWrapper}>
                      <Text
                        style={activeTab === "3m" ? WalletInterestStyle.pillTextActive : WalletInterestStyle.pillText}>3M</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity ref={testUtil.generateTestHook(this, 'WalletInterest.1y')} onPress={() => this.activateTab("1y")} style={WalletInterestStyle.yearTO}>
                    <View
                      style={activeTab === "1y" ? WalletInterestStyle.yearWrapperActive : WalletInterestStyle.yearWrapper}>
                      <Text
                        style={activeTab === "1y" ? WalletInterestStyle.pillTextActive : WalletInterestStyle.pillText}>1Y</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <CelButton
                onPress={() => actions.navigateTo("HowToEarnInterest")}
                transparent
                inverse
              >
                How do I earn interest?
              </CelButton>
            </View>
            :
            null
          }
        </View>

        <Text style={WalletInterestStyle.title}
       ref={testUtil.generateTestHook(this, 'WalletInterests.popUp')}
                            >
          Today's interest rates:
        </Text>
        <Text style={WalletInterestStyle.explanation}>
          Deposit coins to your wallet now to start earning at these rates:
        </Text>

        <CurrencyInterestRateInfoTable
          style={{ marginBottom: 35 }}
        />

        <CelButton
          ref={testUtil.generateTestHook(this, 'WalletInterests.AddMoreFunds')}
          onPress={() => actions.navigateTo("AddFunds")}
        >
          Add more funds
        </CelButton>
      </WalletLayout>
    );
  }
}

export default testUtil.hookComponent(WalletInterest);

