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

  // Vote Action
  vote(listingHash, numTokens, voteOption, voterAddr) {
    const votingSalt = Math.getRandomIntInclusive(0, 1000);
    const listings = this.contract.methods.listings().call();
    const pollID = this.getPollId(listingHash, listings);
    const voting = this.contract.methods.voting().call();
    const secretHash = this.generateHash(`${voteOption.toString()}${votingSalt.toString()}`);
    const prevPollID = voting.methods.getInsertPointForNumTokens()
      .call(voterAddr, numTokens, pollID);
    voting.methods.commitVote().call(pollID, secretHash, numTokens, prevPollID);
  }

  // Challenge Action
  challenge(listingHash, description) {
    this.contract.challenge(listingHash, description, error => console.error(error));
  }

  // Poke submission into registry by getting updates after application period passes
  // updateStatus(listingHash) {
  //   this.contract.methods.updateStatus().call(listingHash);
  // }

  // Request voting rights
  // requestVotingRights(numOfWei) {
  //   this.contract.methods.requestVotingRights().call(numOfWei);
  // }

  // Reveal vote
  // revealVote(voteOption, listingHash) {
  //   const votingSalt = Math.getRandomIntInclusive(0, 1000);
  //   const listings = this.contract.methods.listings().call();
  //   const pollId = this.getPollId(listingHash, listings);
  //   this.contract.methods.revealVote().call(pollId, voteOption, votingSalt);
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
