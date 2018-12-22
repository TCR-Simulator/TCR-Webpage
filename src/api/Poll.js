import { bigNumber2Date } from '../utils';

export default class Poll {
  constructor(id, commitEndDate, revealEndDate, reason) {
    this.id = id;
    this.commitEndDate = commitEndDate;
    this.revealEndDate = revealEndDate;
    this.reason = reason;
  }

  static fromObject({ challengeID, commitEndDate, revealEndDate, data }) {
    const commitEnd = bigNumber2Date(commitEndDate);
    const revealEnd = bigNumber2Date(revealEndDate);
    return new Poll(challengeID, commitEnd, revealEnd, data);
  }
}
