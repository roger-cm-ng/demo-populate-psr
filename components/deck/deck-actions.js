import localStorage from 'local-storage';
import Resources from '../helpers/resources';

export const ESTIMATIONS_ACQUIRED = 'ESTIMATIONS_ACQUIRED';

export const acquireEstimations = () => (dispatch) => {
  const token = localStorage.get('token');
  if (!token) {
    return;
  }
  Resources.estimations({
    token,
    success: (data) => {
      dispatch({
        type: ESTIMATIONS_ACQUIRED,
        payload: data
      });
    },
    fail: (error) => {
      throw new Error(error.status, error.message);
    }
  });
};