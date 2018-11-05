/**
 * Get all TCRs in the backend.
 * @return {array} A list of all TCRs present in the backend.
 */
export async function getAllTcrs() {
  return [];
}

/**
 * Gets the TCR associated with a specific ID.
 * @param {string} tcrId TCR identifier
 * @return {TCR} TCR with the given ID, null if it doesn't exist
 */
export async function getTcrById(tcrId) {
  return null;
}

/**
 * Create a new TCR with a specific name and specific parameters. Note that this does not deploy
 * the TCR after its creation. Use deployTcr() after TCR is successfully created.
 * @param {string} name The name of the new TCR
 * @param {array} parameters The parameters of the new TCR
 * @return {TCR} The TCR created, null if creation fails
 */
export async function createTcr(name, parameters) {
  return null;
}

/**
 * Deploy the TCR with the given ID.
 * @param {string} tcrId ID of the TCR to deploy.
 * @return {TCR} The TCR deployed
 */
export async function deployTcr(tcrId) {
  return null;
}

/**
 * Delete the TCR with the given ID.
 * @param {string} tcrId ID of the TCR to delete.
 */
export async function deleteTcr(tcrId) {

}
