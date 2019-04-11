export const TEXT_INPUTTED = 'TEXT_INPUTTED';

export const inputText = (key, val) => ({
  type: TEXT_INPUTTED,
  payload: {
    key,
    val
  }
});
