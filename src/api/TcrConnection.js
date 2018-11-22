import { getContractInfo } from '../config';

const keccak = require('keccak');

// const callback = function callback(error, result) {
//   if (error) {
//     throw new Error(error.toString());
//   } else {
//     results.push(result);
//   }
// };

export default class TcrConnection {
  constructor() { // eslint-disable-line no-unused-vars
    this.web3 = window.web3;
  }

  async init(tcr) {
    const registryAbi = (await getContractInfo('Registry')).abi;
    if (!this.web3.isAddress(tcr.address)) {
      throw new Error('Invalid contract address');
    }
    this.contract = this.web3.eth.contract(registryAbi).at(tcr.address);
  }

  generateHash(obj) { // eslint-disable-line class-methods-use-this
    const hash = keccak('keccak256').update(obj).digest('hex');
    return `0x${hash}`;
  }

  getPollId(listingHash, listings) { // eslint-disable-line class-methods-use-this
    return listings[listingHash].challengeId;
  }

  // Submit Action - Complete
  async submit(deposit, name, url) {
    const infoObj = {
      name,
      url,
    };
    const information = JSON.stringify(infoObj);
    // eslint-disable-next-line no-console
    this.contract.apply(deposit, information, error => console.error(error));
  }

  // Challenge Action
  challenge(listingHash, description) {
    this.contract.methods.challenge().call(listingHash, description);
  }

	// Claim Reward Action
	claimReward(challengeId) {
	  this.contract.methods.claimReward().call(challengeId);
	}

  // Poke submission into registry by getting updates after application period passes
  // updateStatus(listingHash) {
  //   this.contract.methods.updateStatus().call(listingHash);
  // }

  // get corresponding listing Id from listings on registry by parsing the listing data
  // getListingId(name, url) {
  //   const listingInfo = {
  //     name,
  //     url,
  //   };
  //   this.contract.getPastEvents('_Application', {
  //     fromBlock: 0,
  //     toBlock: 'latest',
  //   }).then((events) => {
  //     events.forEach((e) => {
  //       if (e.returnValues.data === JSON.stringify(listingInfo)) {
  //         return e.returnValues.listingHash;
  //       }
  //       return -1;
  //     });
  //   });
  // }

  // getAllRegistryListings() {
  //   //TODO
  // }

  getPendingListings() {
    const pastApplicationList = this.getList('_Application');
    const challengeList = this.getInChallengeListings();
    const pendingList = [pastApplicationList, challengeList]
      .reduce((a, b) => a.filter(i => !b.includes(i)));
    return pendingList;
  }

  getInChallengeListings() {
    return this.getList('_Challenge');
  }

  getList(name) {
    const resultList = [];
    this.contract.getPastEvents(name, {
      fromBlock: 0,
      toBlock: 'latest',
    }).then((events) => {
      events.forEach((e) => {
        const jsonObj = JSON.parse(e.returnValues.data);
        resultList.push({
          name: jsonObj.name,
          url: jsonObj.url,
        });
      });
    });
    return resultList;
  }

  /**
   * Get the balance of an address.
   * @param  {string} address - Address to get the balance of, with the format '0x...'
   * @return {number} Balance of the address in wei.
   */
  async getBalance(address) {
    if (!this.web3.utils.isAddress(address)) {
      throw new Error('Invalid address');
    }
    const balance = await this.web3.eth.getBalance(address);

    return Number(balance);
  }
}
