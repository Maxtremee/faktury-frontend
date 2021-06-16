import jwt_decode from 'jwt-decode'
import { history } from '../App'

const checkToken = (token) => {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      return true;
    }
}
export default checkToken 