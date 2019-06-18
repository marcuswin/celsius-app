// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
   container: {
       flex: 1
   },
   bodyWrapper: {
       flexDirection: 'row'
   },
   cardBody: {
       flex: 1,
       flexDirection: 'column',
       paddingLeft: 10,
       alignContent: 'flex-start',
       alignItems: 'flex-start',
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

const WithdrawalAddressCardStyle = () => getThemedStyle(base, themed);

export default WithdrawalAddressCardStyle