// import localStorage from 'local-storage';

export const LOGIN_TOGGLED = 'LOGIN_TOGGLED';

export const toggleLogin = currentLogin => ({
  type: LOGIN_TOGGLED,
  vis: !currentLogin
});
