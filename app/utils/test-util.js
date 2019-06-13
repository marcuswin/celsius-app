import { hook } from 'cavy';
import Constants from 'expo-constants';

const { ENV } = Constants.manifest.extra;

export default {
	hookComponent,
	generateTestHook,
}


/**
 * Hooks component to cavy
 *
 * @param {Object} component
 * @returns {Object}
 */
function hookComponent(component) {
	if (ENV === 'TEST') return hook(component);

	return component;
}


/**
 * Generates cavy test hook
 *
 * @param {Object} component
 * @param {string} selector - test selector
 * @param {function} ref - ref method
 * @returns {function}
 */
function generateTestHook(component, selector, ref = undefined) {
	if (ENV === 'TEST') return component.props.generateTestHook(selector, ref);

	return ref || null;
}
