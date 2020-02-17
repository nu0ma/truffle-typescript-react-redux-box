import { combineReducers } from 'redux';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

type State = {
  currentContract: Contract;
  web3: Web3;
  isLoading: boolean;
  isEnd: boolean;
};

export type Action =
  | {
      type: 'SET_CONTRACT';
      currentContract: Contract;
      isLoading: boolean;
      isEnd: boolean;
    }
  | {
      type: 'SET_ISEND';
      isEnd: boolean;
    }
  | {
      type: 'SET_WEB3';
      web3: Web3;
    };

const initialContractState = {
  currentContract: {} as Contract,
  web3: {} as Web3,
  isLoading: true,
  isEnd: false
};

export const contract_reducer = (
  state: State = initialContractState,
  action: Action
) => {
  switch (action.type) {
    case 'SET_CONTRACT':
      return {
        ...state,
        currentContract: action.currentContract,
        isLoading: false,
        isEnd: false
      };
    case 'SET_ISEND':
      return {
        ...state,
        isEnd: true
      };
    case 'SET_WEB3':
      return {
        ...state,
        web3: action.web3
      };
    default:
      return state;
  }
};

// const web3_reducer = () => (
//   state:Web3 = initialWeb3State,
//   action:Web3Action
// )

export const rootReducer = combineReducers({
  contract: contract_reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const contractSelector = (state: RootState) => state.contract;
export const web3Selector = (state: RootState) => state.contract.web3;
