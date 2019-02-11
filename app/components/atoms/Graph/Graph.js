import React from "react";
import { View, SafeAreaView, Animated, TextInput, TouchableOpacity } from "react-native";
import { Svg } from "expo";
import PropTypes from "prop-types";
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

class Graph extends React.Component {

  static PropTypes = {
    dateArray: PropTypes.instanceOf(Array).isRequired, // x
    priceArray: PropTypes.instanceOf(Array).isRequired, // y
    height: PropTypes.number,
    width: PropTypes.number,
    verticalPadding: PropTypes.number,
    labelWidth: PropTypes.number,
    cursorRadius: PropTypes.number,
    periods: PropTypes.instanceOf(Array),
    showPeriods: PropTypes.bool,
    showXTicks: PropTypes.bool,
    showCursor: PropTypes.bool
  };

  static defaultProps = {
    height: heightPercentageToDP("20.21%"),
    width: widthPercentageToDP("100%"),
    verticalPadding: heightPercentageToDP("2%"),
    labelWidth: widthPercentageToDP("20.33%"),
    cursorRadius: heightPercentageToDP("1.06%"),
    periods: ["DAY", "WEEK", "MONTH", "YEAR", "ALL"],
    showPeriods: false,
    showXTicks: false,
    showCursor: false
  };

  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(0),
      activePeriod: "DAY"
    };
  }

  componentDidMount() {
    const {showCursor} = this.props;

    if (showCursor) {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);
    }
  }

  // yValue = data.map(item => item.y);
  yRange = [this.props.height - this.props.verticalPadding, this.props.verticalPadding];
  yDomain = [0, Math.max(...this.props.priceArray)];
  xRange = [0, this.props.width];
  // xDomain = data.map(item => item.x);
  xDomain = this.props.dateArray;

  // creating Obj out of two arrays
  arrOfObjects = this.props.dateArray.map((x, i) => ({ x, y: this.props.priceArray[i] }));

  scaleY = scaleLinear().domain(this.yDomain).range(this.yRange);
  scaleX = scalePoint().domain(this.xDomain).range(this.xRange);
  line = d3.shape.line().x(d => this.scaleX(d.x)).y(d => this.scaleY(d.y)).curve(d3.shape.curveBasis)(this.arrOfObjects);
  lineProperties = path.svgPathProperties(this.line);
  lineLength = this.lineProperties.getTotalLength();

  cursor = React.createRef();
  dashedLine = React.createRef();
  label = React.createRef();
  labelText = React.createRef();

  moveCursor(value) {
    const { width, height, cursorRadius, labelWidth, showCursor } = this.props;
    const { x, y } = this.lineProperties.getPointAtLength(this.lineLength - value);

    if (showCursor) {
      this.cursor.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), left: x - cursorRadius });
      this.dashedLine.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), height: height - y, left: x });
      this.labelText.current.setNativeProps({ text: formatter.usd(this.scaleY.invert(y)) });
      if (x <= width / x) {
        this.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x });
      } else if (x >= width - widthPercentageToDP("5%")) {
        this.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - labelWidth });
      } else {
        this.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - labelWidth / 2 });
      }
    }
  };

  activatePeriod = (period) => {

    this.setState({
      activePeriod: period
    });

  };

  render() {
    const { x, activePeriod } = this.state;
    const { periods, width, height, showPeriods, showXTicks, showCursor, dateArray } = this.props;
    const style = GraphStyle();
    return (
      <SafeAreaView>
        {showPeriods &&
        <View style={style.periods}>
          {periods.map((period) => (
            <TouchableOpacity key={period} style={{ alignItems: "center" }}
                              onPress={() => this.activatePeriod(period)}>
              <CelText key={period} type={"H7"}
                       style={{ color: activePeriod === period ? "rgba(65,86,166,1)" : "rgba(59,71,85,0.5)" }}>
                {period}
              </CelText>
              {activePeriod === period &&
              <View style={style.active}/>
              }
            </TouchableOpacity>
          ))}
        </View>
        }
        <View>
          <Svg {...{ width, height }}>

            <Defs>
              <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                <Stop stopColor={"#4FB895"} offset={"0%"}/>
                <Stop stopColor={"#edf7f4"} offset={"70%"}/>
                <Stop stopColor={"#F3F3F3"} offset={"100%"}/>
              </LinearGradient>
            </Defs>
            <Path d={this.line} stroke={"#4FB895"} strokeWidth={5} fill="transparent"/>
            <Path d={`${this.line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)"/>

            {showCursor &&
            <View>
              <View ref={this.cursor}>
                <View style={style.cursor}>
                  <View style={style.circle}/>
                </View>
              </View>

              <View ref={this.dashedLine}>
                <Separator vertical dashed/>
              </View>

              <View ref={this.label} style={[style.pointer]}>
                  <View style={[style.label]}>
                    <TextInput ref={this.labelText} style={style.labelText} editable={false}/>
                  </View>
                  <View style={[style.triangle]}/>
              </View>
            </View>
            }
          </Svg>

          {showCursor &&
          <Animated.ScrollView
            style={style.scrollPointer}
            contentContainerStyle={{ width: this.lineLength * 2 }}
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
          }
        </View>

        {showXTicks &&
        <View style={style.xValues}>
          {dateArray.map((date, index) => (
            <CelText key={date} type={"H6"}
                     style={{
                       position: "absolute",
                       bottom: heightPercentageToDP("1.2%"),
                       left: this.scaleX(date) - widthPercentageToDP("3%"),
                       color: index === 0 || index === dateArray.length - 1 ? "transparent" : "gray"
                     }}>{date}</CelText>
          ))}
        </View>
        }

      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(Graph);




