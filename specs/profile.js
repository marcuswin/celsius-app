import { onChange } from './helpers';
import store from '../app/redux/store';
import * as actions from '../app/redux/actions';

export default {
changeProfileInfo,
}

function changeProfileInfo(spec){
	return async () => {

		//Test Borower page
		await spec.press('BottomNavigation.Borrow')

		//Test Profile page
		await spec.press('BottomNavigation.Profile')
		await spec.exists('ProfileScreen.firstName')
		await spec.exists('ProfileScreen.lastName')
		await spec.exists('ProfileScreen.email')
		await spec.exists('ProfileScreen.cellphone')
		await spec.press('ProfileScreen.changeAvatar')
		await spec.press('ProfileScreen.LogOut')

			
	}
}