import localStorage from 'local-storage';
import Resources from '../helpers/resources';

export const TEXT_INPUTTED = 'TEXT_INPUTTED';
export const FORMS_VALIDATED = 'FORMS_VALIDATED';
export const AUTHENTICATED = 'AUTHENTICATED';

const validateForms = (creds) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return creds.password.length > 0 && regex.test(creds.email);
};

export const inputValidateText = (key, val) => (dispatch, getState) => {
  const currentState = getState();
  dispatch({
    type: TEXT_INPUTTED,
    payload: {
      key,
      val
    }
  });
  dispatch({
    type: FORMS_VALIDATED,
    payload: validateForms(currentState.loginReducer.creds)
  });
};

export const authenticate = creds => dispatch => Resources.authenticate(
  {
    body: creds,
    success: (data) => {
      localStorage.set('token', data.token);
      dispatch({
        type: AUTHENTICATED,
        payload: data
      });
    },
    fail: (error) => {
      throw new Error(error.status, error.message);
    }
  }
);
