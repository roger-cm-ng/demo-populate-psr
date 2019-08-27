export const USERNAME_PASSWORD_SET = './USERNAME_PASSWORD_SET';

export const setUsernamePassword = ({ env, value, inputType }) => ({
  type: USERNAME_PASSWORD_SET,
  payload: {
    env,
    value,
    inputType
  }
});
