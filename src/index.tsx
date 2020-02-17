import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { rootReducer, RootState } from './reducer/reducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import Sample from './contractJson/Sample.json';

import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

import * as serviceWorker from './serviceWorker';
import Spinner from './components/Common/Spinner';
import ConnectPage from './pages/ConnectPage';

//  init web3
const web3 = new Web3('ws://localhost:8545');

const store = createStore(rootReducer, composeWithDevTools());

const contractSelector = (state: RootState) => state.contract;

console.log(store.getState());

const Root = () => {
  const contractState = useSelector(contractSelector);

  const dispatch = useDispatch();
  let history = useHistory();

  const setContract = useCallback(async () => {
    // const web3 = new Web3('ws://localhost:8545');
    const instance: Contract = new web3.eth.Contract(
      Sample.abi as AbiItem[],
      //  if you use ganache, networkId = 5777
      Sample.networks[5777].address as string,
      {
        from: web3.eth.defaultAccount as string
      }
    );
    console.log('instance', instance);
    dispatch({ type: 'SET_CONTRACT', currentContract: instance });

    dispatch({ type: 'SET_WEB3', web3: web3 });
  }, [dispatch]);

  useMemo(() => {
    setContract();
    history.push('/');
  }, [history, setContract]);

  return contractState.isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/connect" component={ConnectPage} />
    </Switch>
  );
};

const RootWithRouter = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithRouter />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
