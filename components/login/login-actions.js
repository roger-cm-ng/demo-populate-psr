// import Socket from '../helpers/socket';

export const TEXT_INPUTTED = 'TEXT_INPUTTED';
export const LOCAL_STORAGE_DATA_ACQUIRED = 'LOCAL_STORAGE_DATA_ACQUIRED';
// export const DECKS_ACQUIRED = 'DECKS_ACQUIRED';

export const inputIdentity = (key, val) => ({
  type: TEXT_INPUTTED,
  payload: {
    key,
    val
  }
});

export const acquireLocalStorageData = payload => ({
  type: LOCAL_STORAGE_DATA_ACQUIRED,
  payload
});

export const acquireDecks = () => (/* dispatch */) => {
  // Socket.emit('get-decks', {});
  // Socket.on('get-decks', (payload) => {
  //   dispatch({
  //     type: DECKS_ACQUIRED,
  //     payload
  //   });
  // });
};
