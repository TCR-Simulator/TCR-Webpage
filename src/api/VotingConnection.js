import { getVotingContractAt } from '../config';

export default class VotingConnection {
  constructor() {
    this.voting = null;
  }

  async init(contractAddress) {
    this.voting = await getVotingContractAt(contractAddress);
  }

  async commitVote(pollId, numTokens, voteOption, voteSalt) {
    const secretHash = window.web3.sha3(`${voteOption}${voteSalt}`);
    const voterAddr = window.web3.eth.defaultAccount;
    const prevPollID = await this._callVotingMethod(
      'getInsertPointForNumTokens', voterAddr, numTokens, pollId,
    );
    await this._callVotingMethod('commitVote', pollId, secretHash, numTokens, prevPollID);
  }

  async revealVote(pollId, voteOption, voteSalt) {
    await this._callVotingMethod('revealVote', pollId, voteOption, voteSalt);
  }

  async _callVotingMethod(method, ...args) {
    console.log(`Calling ${method}(${args.join(', ')})`); // eslint-disable-line no-console
    return new Promise((resolve, reject) => {
      this.voting[method](...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
