import localStorage from 'local-storage';
import Resources from '../helpers/resources';

export const TEXT_INPUTTED = 'TEXT_INPUTTED';
export const FORMS_VALIDATED = 'FORMS_VALIDATED';
export const AUTHENTICATED = 'AUTHENTICATED';
export const USERS_ACQUIRED = 'USERS_ACQUIRED';

export const inputText = (key, val) => ({
  type: TEXT_INPUTTED,
  payload: {
    key,
    val
  }
});

export const acquireUsers = () => dispatch => Resources.acquireUsers(
  {
    success: (data) => {
      const payload = data.map((item) => {
        item.show = true;
        return item;
      });
      dispatch({
        type: USERS_ACQUIRED,
        payload
      });
    },
    fail: (error) => {
      throw new Error(error.status, error.message);
    }
  }
);

export const showOneUser = (email, usersReducer) => {
  const payload = usersReducer.map((item) => {
    if (item.email === email) {
      item.show = true;
    } else {
      item.show = false;
    }
    return item;
  });
  return {
    type: USERS_ACQUIRED,
    payload
  };
};

export const showAllUsers = (usersReducer) => {
  const payload = usersReducer.map((item) => {
    item.show = true;
    return item;
  });
  return {
    type: USERS_ACQUIRED,
    payload
  };
};

export const authenticate = (creds, history) => dispatch => Resources.authenticate(
  {
    body: creds,
    success: (payload) => {
      localStorage.set('token', payload.token);
      dispatch({
        type: AUTHENTICATED,
        payload
      });
      history.push('/');
    },
    fail: (error) => {
      throw new Error(error.status, error.message);
    }
  }
);
