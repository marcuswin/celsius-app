import React from "react";
import { View, SafeAreaView, Animated, TextInput, TouchableOpacity } from "react-native";
import { Svg } from "expo";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleLinear, scalePoint } from "d3-scale";
import testUtil from "../../../utils/test-util";
import CelText from "../CelText/CelText";
import Separator from "../Separator/Separator";
import formatter from "../../../utils/formatter";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import GraphStyle from "./Graph.styles";

const { Path, Defs, LinearGradient, Stop } = Svg;
const d3 = { shape };

const height = heightPercentageToDP("20.21%");
const width = widthPercentageToDP("100%");
const verticalPadding = heightPercentageToDP("2%");
const labelWidth = widthPercentageToDP("21.33%");
const cursorRadius = heightPercentageToDP("1.06%");

const data = [
  { x: new Date(2018, 9, 1), label: "Jan", y: 0 },
  { x: new Date(2018, 9, 16), label: "Feb", y: 100 },
  { x: new Date(2018, 9, 17), label: "Mar", y: 110 },
  { x: new Date(2018, 10, 1), label: "Apr", y: 3000 },
  { x: new Date(2018, 10, 2), label: "May", y: 150 },
  { x: new Date(2018, 10, 5), label: "Jun", y: 5000 },
];

const periods = ["DAY", "WEEK", "MONTH", "YEAR", "ALL"];

const yValue = data.map(item => item.y);
const yRange = [height - verticalPadding, verticalPadding];
const yDomain = [0, Math.max(...yValue)];
const xRange = [0, width];
const xDomain = data.map(item => item.x);
const scaleY = scaleLinear().domain(yDomain).range(yRange);
const scaleX = scalePoint().domain(xDomain).range(xRange);
const line = d3.shape.line().x(d => scaleX(d.x)).y(d => scaleY(d.y)).curve(d3.shape.curveBasis)(data);
const lineProperties = path.svgPathProperties(line);
const lineLength = lineProperties.getTotalLength();

class Graph extends React.Component {

  state = {
    x: new Animated.Value(0),
    activePeriod: "DAY"
  };

  componentDidMount() {
    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);
  }

  cursor = React.createRef();
  dashedLine = React.createRef();
  label = React.createRef();
  labelText = React.createRef();

  moveCursor(value) {
    const { x, y } = lineProperties.getPointAtLength(lineLength - value);
    this.cursor.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), left: x - cursorRadius });
    this.dashedLine.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), height: height - y, left: x });
    this.labelText.current.setNativeProps({ text: formatter.round(scaleY.invert(y)) });
    if (x <= width / x) {
      this.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x });
    } else if (x >= width - widthPercentageToDP("5%")) {
      this.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - labelWidth });
    } else {
      this.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - labelWidth / 2 });
    }
  };

  activatePeriod = (period) => {

    this.setState({
      activePeriod: period
    });

  };

  render() {
    const { x, activePeriod } = this.state;
    const style = GraphStyle();
    return (
      <SafeAreaView>
        <View style={{
          width,
          height: heightPercentageToDP("5%"),
          flexDirection: "row",
          justifyContent: "space-around",
          paddingLeft: widthPercentageToDP("5.33%"),
          paddingRight: widthPercentageToDP("5.33%"),
          marginTop: heightPercentageToDP("2.02%")
        }}>
          {periods.map((period) => (
            <TouchableOpacity key={period} style={{ alignItems: "center" }} onPress={() => this.activatePeriod(period)}>
              <CelText key={period} type={"H7"}
                style={{ color: activePeriod === period ? "rgba(65,86,166,1)" : "rgba(59,71,85,0.5)" }}
              >{period}</CelText>
              {activePeriod === period &&
                <View style={{ width: widthPercentageToDP("3.5%"), borderTopColor: "rgba(65,86,166,1)", borderTopWidth: 1 }} />
              }
            </TouchableOpacity>
          ))}
        </View>
        <View>
          <Svg {...{ width, height }}>
            <Defs>
              <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                <Stop stopColor={"#CDE3F8"} offset={"0%"} />
                <Stop stopColor={"#eef6fd"} offset={"80%"} />
                <Stop stopColor={"#F3F3F3"} offset={"100%"} />
              </LinearGradient>
            </Defs>
            <Path d={line} stroke={"#367BE2"} strokeWidth={5} fill="transparent" />
            <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
            <View ref={this.cursor}>
              <View style={style.cursor}>
                <View style={style.circle} />
              </View>
            </View>
            <View ref={this.dashedLine}>
              <Separator vertical dashed />
            </View>
            <View ref={this.label} style={[style.pointer]}>
              <View style={[style.label]}>
                <TextInput ref={this.labelText} style={style.labelText} editable={false} />
              </View>
              <View style={[style.triangle]} />
            </View>
          </Svg>
          <Animated.ScrollView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            contentContainerStyle={{ width: lineLength * 2 }}
            bounces={false}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={
              Animated.event(
                [{ nativeEvent: { contentOffset: { x } } }],
                { useNativeDriver: true }
              )}
            horizontal
          />
        </View>
        <View style={{ width, height: heightPercentageToDP("5%"), flexDirection: "row" }}>
          {data.map((date, index) => (
            <CelText key={date.label} type={"H6"}
              style={{
                position: "absolute",
                bottom: heightPercentageToDP("1.2%"),
                left: scaleX(date.x) - widthPercentageToDP("3%"),
                color: index !== 0 || index !== data.length - 1 ? "gray" : "transparent"
              }}>{date.label}</CelText>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(Graph);




