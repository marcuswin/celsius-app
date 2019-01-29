// const COLORS = {
//   WHITE: '#fff',
//   CELSIUS: "#3F51AB",
//   BLACK: '#3D4853',
//   DARK: "#1F2E3D",  // header dark
//   DARK_HEADER: "#151E27", // dark back...
//   DARK_CELSIUS: '#273363',

//   // style guide colors
//   LIGHT_GRAY: '#F3F3F3',
//   MEDIUM_GRAY: '#737A82', // default text light/cel
//   DARK_GRAY: '#3D4853', // isto sto i black moze za meni light/
//   CELSIUS_BLUE: '#4156A6',
//   GREEN: '#4fb895',
//   ORANGE: '#e19f30',
//   RED: '#ef461a'
//   // border andr... #E6E7E7 za light/cel
//   // border andr... #0F151B za dark
//   // default dark text : bela 0.5 opc,
//   // menu dark ikonice opacity stavi na 0.5

//   // coin dark kao header dark

// }


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
  DARK_GRAY: '#3D4853',
  CELSIUS_BLUE: '#4156A6',
  GREEN: '#4fb895',
  ORANGE: '#e19f30',
  RED: '#ef461a'
  // TODO(sb) CircleButton add border on android
  // border andr... #E6E7E7 za light/cel
  // border andr... #0F151B za dark

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
  FONTSIZE
}