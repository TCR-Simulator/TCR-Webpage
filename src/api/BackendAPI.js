import axios from 'axios';
import { getRegistryFactory, getToken } from '../config';

const PARAM_KEYS = [
  { key: 'minDeposit', defaultVal: 10000000000000000000 },
  { key: 'pMinDeposit', defaultVal: 10000000000000000000 },
  { key: 'applyStageLength', defaultVal: 600 },
  { key: 'pApplyStageLength', defaultVal: 1200 },
  { key: 'commitStageLength', defaultVal: 600 },
  { key: 'pCommitStageLength', defaultVal: 1200 },
  { key: 'revealStageLength', defaultVal: 600 },
  { key: 'pRevealStageLength', defaultVal: 1200 },
  { key: 'dispensationPct', defaultVal: 50 },
  { key: 'pDispensationPct', defaultVal: 50 },
  { key: 'voteQuorum', defaultVal: 50 },
  { key: 'pVoteQuorum', defaultVal: 50 },
  { key: 'exitTimeDelay', defaultVal: 600 },
  { key: 'exitPeriodLen', defaultVal: 600 },
];

const EXPOSED_PARAMS = [
  'minDeposit',
  'applyStageLength',
  'commitStageLength',
  'revealStageLength',
  'dispensationPct',
  'voteQuorum',
  'exitTimeDelay',
  'exitPeriodLen',
];

const ax = axios.create({
  baseURL: 'http://localhost:5000/tcrs', // temporary
});

/**
 * Get all TCRs in the backend.
 * @return {array} A list of all TCRs present in the backend.
 */
export async function getAllTcrs() {
  const response = await ax.get('/');
  return response.data;
}

/**
 * Gets the TCR associated with a specific ID.
 * @param {string} tcrId TCR identifier
 * @return {TCR} TCR with the given ID, null if it doesn't exist
 */
export async function getTcrById(tcrId) {
  const response = await ax.get(`/${tcrId}/`);
  return response.data;
}

/**
 * Create a new TCR with a specific name and specific parameters. Note that this does not deploy
 * the TCR after its creation. Use deployTcr() after TCR is successfully created.
 * @param {string} name The name of the new TCR
 * @param {array} parameters The parameters of the new TCR
 * @return {TCR} The TCR created, null if creation fails
 */
export async function createTcr(name, parameters) {
  const token = await getToken();
  const registryFactory = await getRegistryFactory();

  const params = PARAM_KEYS.map(({ key, defaultVal }) => (
    { key, value: parameters[key] || defaultVal }
  ));

  return new Promise((resolve, reject) => {
    registryFactory.newRegistryBYOToken(
      token.address,
      params.map(({ value }) => value),
      name,
      (error, result) => {
        if (error) {
          console.err(error);
          reject(error);
        } else {
          console.log(result);
          resolve({
            name,
            parameters: params.filter(({ key }) => EXPOSED_PARAMS.includes(key)),
          });
        }
      },
    );
  });
}

/**
 * Deploy the TCR with the given ID.
 * @param {string} tcrId ID of the TCR to deploy.
 * @return {TCR} The TCR deployed
 */
export async function deployTcr(tcrId) {
  const response = await ax.post(`/${tcrId}/deploy`);
  return response.data;
}

/**
 * Delete the TCR with the given ID.
 * @param {string} tcrId ID of the TCR to delete.
 */
export async function deleteTcr(tcrId) {
  ax.delete(`/${tcrId}/`);
}
