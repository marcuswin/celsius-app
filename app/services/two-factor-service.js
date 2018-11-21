import axios from "axios";
import apiUrl from "./api-url";

class TwoFactorService {
  /**
   * @param {number} pin
   * @return {AxiosPromise<any>}
   */
  static async beginTwoFactorActivation(pin) {
    try {
      const response = await axios.post(`${apiUrl}/users/two_factor/begin`, {
        pin,
      });

      if (!response.data.ok) {
        return null;

      }

      return response.data.secret;
    } catch (error) {
      return error;
    }
  }
}

export default TwoFactorService;
