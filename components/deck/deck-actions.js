// import localStorage from 'local-storage';
// import Resources from '../helpers/resources';

export const ESTIMATIONS_ACQUIRED = 'ESTIMATIONS_ACQUIRED';

export const acquireEstimations = payload => ({
  type: ESTIMATIONS_ACQUIRED,
  payload
});
