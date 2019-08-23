// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
    flex: 1
  },
  buttonsWrapper: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12
  },
  buttonIconText: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  firstLoanWrapper: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: '20%'
  },
  firstLoanTitle: {
    marginTop: 10,
    marginBottom: 10
  },
  firstLoanSubtitle: {
    marginRight: 25,
    marginLeft: 25,
  },
  firstLoanButton: {
    marginTop: 20,
    marginBottom: 20,
  },

}

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
}

const BorrowLandingStyle = () => getThemedStyle(base, themed);

export default BorrowLandingStyle
