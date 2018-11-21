import axios from "axios";
import apiUrl from "./api-url";

class TwoFactorService {
  /**
   * @param {number} pin
   * @return {AxiosPromise<any>}
   */
  static async beginTwoFactorActivation(pin) {
    const response = await axios.post(`${apiUrl}/users/two_factor/begin`, {
      pin,
    });

    if (!response.data.ok) {
      throw new Error('There was a problem generating your Two Factor secret. Please try again later.')
    }

    return response.data.secret;
  }

  /**
   * @param {string|number} code
   * @return {Promise<*>}
   */
  static async enableTwoFactor(code) {
    const response = await axios.post(`${apiUrl}/users/two_factor/activate`, {
      twoFactorCode: code,
    });

    return response.data.ok;
  }

  /**
   * @param {number} pin
   * @return {Promise<void>}
   */
  static async disabledTwoFactor(pin) {
    try {
      const response = await axios.post(`${apiUrl}/users/two_factor/deactivate`, {
        pin,
      });

      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default TwoFactorService;
