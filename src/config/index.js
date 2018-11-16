// const Web3 = require('web3');

const contractsURL = 'http://localhost:3000/contracts';
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const { web3 } = window;

export const getContractInfo = async (contract) => {
  const storageKey = `tcr-simulator:abi:${contract}`;
  const cached = window.sessionStorage.getItem(storageKey);

  try {
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  const data = await window.fetch(`${contractsURL}/${contract}.json`);
  const json = await data.json();

  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify(json));
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return json;
};

export const getDefaultAccount = () => web3.eth.accounts[0];

export const getRegistryFactory = async () => {
  const registryFactoryArtifact = await getContractInfo('RegistryFactory');
  const { abi, address } = registryFactoryArtifact;
  return web3.eth.contract(abi).at(address);
};

export const getToken = async () => {
  const tokenArtifact = await getContractInfo('TestToken');
  const { abi, address } = tokenArtifact;
  return web3.eth.contract(abi).at(address);
};
