import { getThemedStyle } from "../../../utils/styles-util";


const base = {
  container: {
    flex: 1
  },
  barcodeWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  mask: { backgroundColor: "rgba(241,239,238,0.6)", flex: 1 },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center"
  },
  imageWrapper: { flexDirection: "row" },
  safeArea: { flex: 1, flexDirection: "row", marginBottom: 20 },
  permission: { alignSelf: "flex-end", flex: 1, paddingVertical: 20, paddingHorizontal: 20 },
  view: {
    width: 250,
    alignSelf: "center",
    marginTop: 20
  }
};

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
}

const QrScannerStyle = () => getThemedStyle(base, themed);

export default QrScannerStyle
