export default class ListingItem {
  constructor(name, artist, url) {
    this.name = name;
    this.url = url;
    this.artist = artist;
    this.listingHash = null;
    this.appEndDate = null;
    this.applicant = null;
    this.deposit = 0;
  }

  static fromObject({ listingHash, appEndDate, applicant, deposit, data }) {
    const { name, artist, url } = JSON.parse(data);
    const listingItem = new ListingItem(name, artist, url);
    listingItem.listingHash = listingHash;
    listingItem.appEndDate = appEndDate;
    listingItem.applicant = applicant;
    listingItem.deposit = deposit;
    listingItem.data = data;
    return listingItem;
  }

  getHash() {
    return window.web3.sha3(this.toString());
  }

  toObject() {
    return {
      name: this.name,
      artist: this.artist,
      url: this.url,
    };
  }

  toString() {
    return JSON.stringify(this.toObject());
  }
}
