// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
  container: {
      flex: 1
  },
  requestButton: {
      marginTop: 25,
      marginBottom: 25
  },
  expandableItem: {
    marginBottom: 20
  },
  shareCard: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  downloadButton: {
    flex: 0.5
  },
  shareButton: {
    flex: 0.5
  }
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const LoanTermsOfUseStyle = () => getThemedStyle(base, themed);

export default LoanTermsOfUseStyle
