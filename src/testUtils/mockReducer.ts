import { IState } from '../types/IState';
import { Action } from '../actions/actions';

const mockReducer = (testState: IState) => (
  state: IState | undefined = testState,
  action: Action
) => state;

export default mockReducer;
