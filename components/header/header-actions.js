import localStorage from 'local-storage';
import Resources from '../helpers/resources';

export const AUTHENTICATED = 'AUTHENTICATED';

export const verifyUser = () => (dispatch) => {
  const token = localStorage.get('token');
  if (!token) {
    return;
  }
  Resources.verifyUser({
    token,
    success: (data) => {
      dispatch({
        type: AUTHENTICATED,
        payload: data
      });
    },
    fail: (error) => {
      throw new Error(error.status, error.message);
    }
  });
};
