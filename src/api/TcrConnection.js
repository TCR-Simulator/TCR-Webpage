const Web3 = require('web3');
const keccak = require('keccak');

// const callback = function callback(error, result) {
//   if (error) {
//     throw new Error(error.toString());
//   } else {
//     results.push(result);
//   }
// };

function portToAddr(port) {
  return `http://localhost:${port}`;
}

export default class TcrConnection {
  constructor(portNum, contractAddr, contractAbi) { // eslint-disable-line no-unused-vars
    this.web3 = new Web3(new Web3.providers.HttpProvider(portToAddr(portNum)));
    this.web3.eth.net.isListening(() => {
      // TODO: uncomment when ready to integrate with deployed contracts.
      if (!this.web3.utils.isAddress(contractAddr)) {
        // throw new Error('Invalid contract address');
      }
      // this.contract = this.web3.eth.contract(contractAbi).at(contractAddr);
    });
  }

  // Submit Action - Complete
  submit(minDeposit, name, url) {
    const information = `${name};${url}`;
    const listingHash = this.generateHash(`${name}${url}`);
    this.contract.methods.apply().call(listingHash, minDeposit, information);
  }

  // Vote Action
  vote(name, url, numTokens, voteOption, voterAddr) {
    const votingSalt = Math.getRandomIntInclusive(0, 1000);
    const listingId = this.getListingId(name, url);
    if (listingId < 0) {
      throw new Error("No such listing");
    }
    const pollID = this.getPollId(listingId);
    const voting = this.contract.methods.voting().call((err, res) => res);
    const secretHash = this.generateHash(`${voteOption.toString()}${votingSalt.toString()}`);
    const prevPollID = voting.methods.getInsertPointForNumTokens()
      .call(voterAddr, numTokens, pollID);
    voting.methods.commitVote().call(pollID, secretHash, numTokens, prevPollID);
  }

  // Challenge Action
  challenge(listingId, description) {
    this.contract.methods.challenge().call(listingId, description);
  }

  // Poke submission into registry by getting updates after application period passes
  updateStatus(listingId) {
    this.contract.methods.updateStatus().call(listingId);
  }

  // Request voting rights
  requestVotingRights(numOfWei) {
    this.contract.methods.requestVotingRights().call(numOfWei);
  }

  // Reveal vote
  revealVote(voteOption, pollId) {
    const votingSalt = Math.getRandomIntInclusive(0, 1000);
    this.contract.methods.revealVote().call(pollId, voteOption, votingSalt);
  }

  generateHash(obj) {
    return keccak('keccak256').update(obj).digest('hex');
  }

  // get corresponding listing Id from listings on registry by parsing the listing data
  getListingId(name, url) {
    const listings = this.contract.methods.listings().call((err, res) => res);
    // listings.forEach((v, k) => {
    //   const data = v.split(';');
    //   const dataName = data[0];
    //   const dataURL = data[1];
    //   if (dataName === name && dataURL === url) {
    //     return k;
    //   }
    // });
    return -1;
  }

  getPollId(listingId) {
    const listings = this.contract.methods.listings().call((err, res) => res);
    return listings[listingId].challengeId;
  }

  getAllRegistryListings() {
    //TODO
  }

  getPendingListings() {
    //TODO
  }

  getInChallengeListings() {
    //TODO
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
}

    return Number(balance);
  }
}
