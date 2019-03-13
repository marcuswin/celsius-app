import React from "react";
import { View, Animated, TextInput } from "react-native";
import { Svg } from "expo";
import moment from "moment";
import PropTypes from "prop-types";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleLinear, scalePoint, scaleTime } from "d3-scale";
import testUtil from "../../../utils/test-util";
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
    interest: PropTypes.bool,
    backgroundColor: PropTypes.string
  };

  static defaultProps = {
    height: heightPercentageToDP("20.21%"),
    width: widthPercentageToDP("100%"),
    verticalPadding: heightPercentageToDP("2%"),
    labelWidth: widthPercentageToDP("20.33%"),
    cursorRadius: heightPercentageToDP("1.06%"),
    backgroundColor: "#F3F3F3"
  };

  constructor(props) {
    super(props);

    const { interest, rate, showCursor } = props;
    let color = { line: "#4156A6", area: "#d9e0f9" };
    if (!interest) {
      color = rate >= 0 ? { line: "#4FB895", area: "#E5F5EF" } : { line: "#EF461A", area: "#FDE4DD" };
    }

    this.state = {
      loading: true,
      x: new Animated.Value(0),
      color
    };

    this.cursor = showCursor ? {
      pointer: React.createRef(),
      dashedLine: React.createRef(),
      label: React.createRef(),
      labelText: React.createRef(),
      dateText: React.createRef()
    } : {};
  }

  componentDidMount() {
    const { showCursor } = this.props;
    this.calculateLine()
    this.setState({ loading: false });;

    if (showCursor) this.moveCursor(0);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.timeline !== this.props.timeline) {
      this.calculateLine();
      return true;
    }
    return nextState.loading !== this.state.loading;
  };

  calculateLine() {
    const { width, height, verticalPadding, priceArray, dateArray, showCursor } = this.props;
    // Domains and Ranges
    const yRange = [height - verticalPadding, verticalPadding];
    const yDomain = [Math.min(...priceArray), Math.max(...priceArray)];
    const xRange = [0, width];
    const xDomain = dateArray;
    const timeDomain = [Math.min(...dateArray), Math.max(...dateArray)];

    // creating Obj out of two arrays for line purposes
    const arrOfObjects = dateArray.map((x, i) => ({ x, y: priceArray[i] }));

    // Scaling and line making
    this.scaleX = scalePoint().domain(xDomain).range(xRange);
    this.scaleY = scaleLinear().domain(yDomain).range(yRange);
    this.scaleTime = scaleTime().domain(timeDomain).range(xRange);
    this.line = d3.shape.line().x(d => this.scaleX(d.x)).y(d => this.scaleY(d.y)).curve(d3.shape.curveBasis)(arrOfObjects);
    this.lineProperties = path.svgPathProperties(this.line);
    this.lineLength = this.lineProperties.getTotalLength();
    if (showCursor) this.moveCursor(this.lineLength / 2);
  }

  moveCursor(value) {
    const { width, cursorRadius, labelWidth, showCursor, timeline } = this.props;
    const { x, y } = this.lineProperties.getPointAtLength(this.lineLength - value);
    let tm;

    switch (timeline) {
      case "1y":
        tm = "MMM YYYY";
        break;
      case "1d":
        tm = "kk";
        break;
      case "1m":
        tm = "D MMM";
        break;
      case "7d":
        tm = "dddd";
        break;
      default:
        tm = "1d";
    }

    const timeStamp = !timeline || timeline === "1d" ? `${moment(this.scaleTime.invert(x)).format("kk")} h` : moment(this.scaleTime.invert(x)).format(tm);

    if (showCursor) {
      this.cursor.pointer.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), left: x - cursorRadius });
      // this.cursor.dashedLine.current.setNativeProps({ top: y - heightPercentageToDP("1.2%"), height: height - y, left: x });
      this.cursor.labelText.current.setNativeProps({ text: formatter.usd(this.scaleY.invert(y)) });
      this.cursor.dateText.current.setNativeProps({ text: timeStamp });
      if (x <= width / x) {
        this.cursor.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x });
      } else if (x >= width - widthPercentageToDP("5%")) {
        this.cursor.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - labelWidth });
      } else {
        this.cursor.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - labelWidth / 2 - cursorRadius / 4 });
      }
    }
  };

  renderGraphSvg = () => {
    const { width, height, showCursor, interest, backgroundColor } = this.props;
    const { color, loading } = this.state;

    return (
      !loading ?
        <Svg width={width} height={height}>
          <Defs>
            {showCursor && !interest ?
              <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                <Stop stopColor={color.area} offset={"30%"} />
                <Stop stopColor={backgroundColor} offset={"80%"} />
              </LinearGradient> : null
            }
            {interest ?
              <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                <Stop stopColor={color.area} offset={"30%"} />
                <Stop stopColor={backgroundColor} offset={"80%"} />
              </LinearGradient> : null
            }
            {!showCursor ?
              <LinearGradient x1={"50%"} y1={"0%"} x2={"50%"} y2={"100%"} id={"gradient"}>
                <Stop stopColor={color.area} offset={"100%"} />
              </LinearGradient> : null
            }
          </Defs>
          <Path d={this.line} stroke={color.line} strokeWidth={2} fill="transparent" />
          <Path d={`${this.line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
        </Svg>
        : null
    );
  }

  renderPointer = () => {
    const { color } = this.state;
    const { showCursor } = this.props;
    const style = GraphStyle();

    return (
      showCursor ?
        <View style={{ position: 'absolute' }}>
          <View ref={this.cursor.pointer}>
            <View style={[style.cursor, { borderColor: color.line }]}>
              <View style={[style.circle, { backgroundColor: color.line }]} />
            </View>
          </View>

          <View ref={this.cursor.label} style={[style.pointer]}>
            <View style={[style.label]}>
              <TextInput ref={this.cursor.labelText} style={style.labelText} editable={false} />
              <TextInput ref={this.cursor.dateText} style={style.labelText} editable={false} />
            </View>
            <View style={[style.triangle]} />
          </View>
        </View>
        : null
    )
  }

  renderScroll = () => {
    const { x, loading } = this.state;
    const { showCursor } = this.props;
    const style = GraphStyle();

    return (
      showCursor && !loading ?
        <Animated.ScrollView
          style={style.scrollPointer}
          contentContainerStyle={{ width: this.lineLength * 2 }}
          bounces={false}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x } } }],
              { listener: (event) => this.moveCursor(event.nativeEvent.contentOffset.x) },
              { useNativeDriver: true }
            )}
          horizontal
        /> : null
    );
  }

  render() {
    const GraphSvg = this.renderGraphSvg;
    const Scroll = this.renderScroll;
    const Pointer = this.renderPointer;

    return (
      <View>
        <GraphSvg />
        <Pointer />
        <Scroll />
      </View>
    );
  }
}

export default testUtil.hookComponent(Graph);
