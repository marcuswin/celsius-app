
// refactored
const COLORS = {
  WHITE: '#fff',
  WHITE_OPACITY5: "rgba(255,255,255,0.5)",
  WHITE_OPACITY3: "rgba(255,255,255,0.3)",
  CELSIUS: "#3F51AB", // prov: change name!
  DARK_HEADER: "#1F2E3D",
  DARK_BACKGROUND: "#151E27",

  // style guide colors
  LIGHT_GRAY: '#F3F3F3',
  MEDIUM_GRAY: '#737A82',
  GRAY: '#BBBFC2',
  DARK_GRAY: '#3D4853',
  DARK_GRAY_OPACITY: "rgba(61, 72, 83, 0.15)",
  CELSIUS_BLUE: '#4156A6',
  GREEN: '#4fb895',
  GREEN_OPACITY: 'rgba(79,184,149,0.15)',
  ORANGE: '#e19f30',
  RED: '#ef461a'
  // TODO(sb) CircleButton add border on android
  // border andr... #E6E7E7 za light/cel
  // border andr... #0F151B za dark

}

const imageSizes = {
  'circle': {
    width: 250,
    height: 250
  },
  'document': {
    width: 300,
    height: 183
  }
}

const SHADOW_STYLES = {
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.03,
  shadowRadius: 3,
  elevation: 3
}

const FONTSIZE = {
  'H1': 40,
  'H2': 26,
  'H3': 21,
  'H4': 18,
  'H5': 16,
  'H6': 14,
  'H7': 12
}

export default {
  COLORS,
  FONTSIZE,
  imageSizes,
  SHADOW_STYLES
}

// export {
//   COLORS,
//   FONTSIZE
// }
