import localStorage from 'local-storage';
import Resources from '../helpers/resources';

export const THUMB_CARD_CHOSEN = 'THUMB_CARD_CHOSEN';

export const chooseCard = val => ({
  type: THUMB_CARD_CHOSEN,
  val
});

export const vote = body => () => {
  const token = localStorage.get('token');
  if (!token) {
    return;
  }
  Resources.vote({
    token,
    body,
    success: () => {},
    fail: (error) => {
      throw new Error(error.status, error.message);
    }
  });
};
