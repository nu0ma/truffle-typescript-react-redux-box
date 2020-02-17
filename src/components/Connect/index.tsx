import React, { useState, useEffect, useCallback } from 'react';
import { Container, Header, Segment, Form, Input } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../reducer/reducer';

import Web3 from 'web3';
const web3 = new Web3('ws://localhost:8545');

const Connect = () => {
  const instance = useSelector(contractSelector);
  const [account, setAccount] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [contractValue, setContractValue] = useState<number>();

  const getContractValue = useCallback(async () => {
    try {
      const res = await instance.currentContract.methods.getValue.call().call();
      console.log(res);
      setContractValue(res);
    } catch (err) {
      console.log(err);
    }
  }, [instance.currentContract.methods]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      await instance.currentContract.methods.setValue(Number(value)).send({
        from: account,
        //TODO:fix gas const
        gas: 300000
      });
      getContractValue();
      setValue('');
      console.log('submitted');
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const setInitialAccount = useCallback(async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log('Your Account : ', account);
    } catch (err) {
      console.log(err);
    }
  }, [account]);

  useEffect(() => {
    setInitialAccount();
    getContractValue();
  }, [getContractValue, setInitialAccount]);

  return (
    <Container>
      <Header>Test Contract Function</Header>
      <Segment>
        <p>Contract's value : {contractValue}</p>
      </Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Change Contract's value. (Your account : {account})</label>
          <Input
            type="text"
            onChange={handleChange}
            value={value}
            placeholder={'2'}
          />
        </Form.Field>
      </Form>
    </Container>
  );
};

export default Connect;
