import { getContractInfo } from '../config';
import ListingItem from './ListingItem';
import Poll from './Poll';
import VotingConnection from './VotingConnection';

export default class TcrConnection {
  constructor(contract, voting) {
    this.contract = contract;
    this.voting = voting;
  }

  static async create(address, votingAddress) {
    if (!window.web3.isAddress(address)) {
      throw new Error('Invalid contract address');
    }
    if (!window.web3.isAddress(votingAddress)) {
      throw new Error('Invalid voting contract address');
    }

    const registryAbi = (await getContractInfo('Registry')).abi;
    const contract = window.web3.eth.contract(registryAbi).at(address);
    const voting = await VotingConnection.create(votingAddress);
    return new TcrConnection(contract, voting);
  }

  async _callRegistryMethod(method, ...args) {
    console.log(`Calling ${method}(${args.join(', ')})`); // eslint-disable-line no-console
    return new Promise((resolve, reject) => {
      this.contract[method](...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  // Submit Action
  async submit(deposit, listing) {
    return this._callRegistryMethod('apply', listing.getHash(), deposit, listing.toString());
  }

  // Challenge Action
  async challenge(listingHash, description) {
    return this._callRegistryMethod('challenge', listingHash, description);
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

  async getPendingListings() {
    const pastApplicationList = await this.getAllApplications();
    const challengeList = await this.getInChallengeListingHashes();
    return pastApplicationList.filter(({ listingHash }) => !challengeList.includes(listingHash));
  }

  async getInChallengeListings() {
    const pastApplicationList = await this.getAllApplications();
    const challengeEvents = await this.getAllEvents('_Challenge');
    const inChallenge = [];
    pastApplicationList.forEach((listing) => {
      const challenge = challengeEvents.find(evt => evt.args.listingHash === listing.listingHash);
      if (challenge) {
        listing.challengePoll = Poll.fromObject(challenge.args);
        inChallenge.push(listing);
      }
    });
    return inChallenge;
  }

  async getInChallengeListingHashes() {
    const events = await this.getAllEvents('_Challenge');
    return events.map(event => event.args.listingHash);
  }

  async getAllApplications() {
    const events = await this.getAllEvents('_Application');
    return events.map(event => ListingItem.fromObject(event.args));
  }

  async getAllEvents(name) {
    return new Promise((resolve, reject) => {
      this.contract[name]({}, { fromBlock: 0, toBlock: 'latest' }).get((error, events) => {
        if (error) {
          console.error(error); // eslint-disable-line no-console
          reject(error);
        } else {
          resolve(events);
        }
      });
    });
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
