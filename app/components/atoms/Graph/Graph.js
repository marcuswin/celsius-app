import React from "react";
import { View, SafeAreaView, Animated, TextInput } from "react-native";
import { Svg } from "expo";
import PropTypes from "prop-types";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleLinear, scalePoint } from "d3-scale";
import testUtil from "../../../utils/test-util";
import Separator from "../Separator/Separator";
import formatter from "../../../utils/formatter";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import GraphStyle from "./Graph.styles";

const { Path, Defs, LinearGradient, Stop } = Svg;
const d3 = { shape };

class Graph extends React.Component {

  static propTypes = {
    dateArray: PropTypes.instanceOf(Array).isRequired, // x
    priceArray: PropTypes.instanceOf(Array).isRequired, // y
    height: PropTypes.number,
    width: PropTypes.number,
    verticalPadding: PropTypes.number,
    labelWidth: PropTypes.number,
    cursorRadius: PropTypes.number,
    showCursor: PropTypes.bool,
    rate: PropTypes.string,
    interest: PropTypes.bool
  };

  static defaultProps = {
    height: heightPercentageToDP("20.21%"),
    width: widthPercentageToDP("100%"),
    verticalPadding: heightPercentageToDP("2%"),
    labelWidth: widthPercentageToDP("20.33%"),
    cursorRadius: heightPercentageToDP("1.06%"),
  };

  constructor(props) {
    super(props);

    this.state = {
      x: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { showCursor } = this.props;
    this.calculateLine()

    if (showCursor) {
      this.state.x.addListener(({ value }) => this.moveCursor(value));
      this.moveCursor(0);
    }
  }

  yRange;
  yDomain;
  xRange;
  xDomain;
  arrOfObjects;
  scaleX;
  scaleY;
  line;
  lineProperties;
  lineLength;

  calculateLine() {
    // Domains and Ranges
    this.yRange = [this.props.height - this.props.verticalPadding, this.props.verticalPadding];
    this.yDomain = [Math.min(...this.props.priceArray), Math.max(...this.props.priceArray)];
    this.xRange = [0, this.props.width];
    this.xDomain = this.props.dateArray;

    // creating Obj out of two arrays
    this.arrOfObjects = this.props.dateArray.map((x, i) => ({ x, y: this.props.priceArray[i] }));

    // Scaling and line making
    this.scaleY = scaleLinear().domain(this.yDomain).range(this.yRange);
    this.scaleX = scalePoint().domain(this.xDomain).range(this.xRange);
    this.line = d3.shape.line().x(d => this.scaleX(d.x)).y(d => this.scaleY(d.y)).curve(d3.shape.curveBasis)(this.arrOfObjects);
    this.lineProperties = path.svgPathProperties(this.line);
    this.lineLength = this.lineProperties.getTotalLength();
  }

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

  render() {
    const { x } = this.state;
    const { width, height, showCursor, rate, interest} = this.props;
    const style = GraphStyle();
    let color;
    this.calculateLine();

    if (interest) {
      color = { line: "#4156A6", area: "#d9e0f9" };
    } else {
      color = rate >= 0 ? { line: "#4FB895", area: "#E5F5EF" } : { line: "#EF461A", area: "#FDE4DD" };
    }


    return (
      <SafeAreaView>
        <Svg {...{ width, height }}>

          <Defs>
              { showCursor ?
                <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                  <Stop stopColor={color.area} offset={"30%"}/>
                  <Stop stopColor={"#F3F3F3"} offset={"80%"}/>
                </LinearGradient> :
                <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                  <Stop stopColor={color.area} offset={"100%"}/>
                </LinearGradient>
              }
          </Defs>
          <Path d={this.line} stroke={color.line} strokeWidth={5} fill="transparent"/>
          <Path d={`${this.line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)"/>


          {showCursor &&
          <View>
            <View ref={this.cursor}>
              <View style={[style.cursor, {borderColor: color.line}]}>
                <View style={[style.circle, {backgroundColor: color.line}]}/>
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
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(Graph);




