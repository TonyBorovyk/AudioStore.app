const Knex = require('knex');
const path = require('path');
const fsp = require('fs').promises;

const {
  db: {
    config: { knex: knexConfig },
  },
} = require('../../config');

const knex = new Knex(knexConfig);

async function plantSeeds() {
  try {
    // const seedsSQL = await fsp.readFile('./seeds.sql').toString();
    const seedsSQL = (
      await fsp.readFile(
        path.join(process.cwd(), 'api', 'db', 'seeds', 'seeds.sql')
      )
    ).toString();
    await knex.raw(seedsSQL);
  } catch (err) {
    // console.error('Cannot plant seeds');
  }
  console.log('Seeds planted');
}

module.exports = plantSeeds;
