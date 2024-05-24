#!/usr/bin/env node

import { Command } from 'commander';
import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
const program = new Command();

let api_key = '';
let address = '';
let event = '';
let amount = 0;

const BASE_URL = 'https://localhost:3000/';
const getPoints = async (address, event, api_key) => {
  const url = `${BASE_URL}/api/points/${address}&eventName=${event}`;
  const token = `Bearer ${api_key}`;
  const headers = {
    Authorization: token,
    'User-Agent': 'absinthe-client',
  };
  try {
    const response = await axios.get(url, { headers });
    console.log(response.data);
  } catch (error) {
    // match different errors
    /**
     * @type {import('axios').AxiosError}
     */
    const _error = error;
    if (_error.response.status == 401) {
      console.log(chalk.red(`401 Auth Error: Please confirm your token is valid`));
    }
    console.log(chalk.red(_error.message));
  }
};

(async () => {
  // check if the api_key is already set via --api-key
  program.option('-k, --apiKey <apiKey>', 'The api key to use for the absinthe client');
  program.option('-a, --address <address>', 'The address to use for the absinthe client');
  program.option('-e, --event <event>', 'The event to use for the absinthe client');
  program.option('-m, --amount <amount>', 'The amount to use for the absinthe client');
  const getKey = async () => {
    const options = program.opts();
    // GET API KEY
    if (options.apiKey) {
      api_key = options.apiKey;
      console.log(options);
    } else {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'api_key',
          message: "What's the api key for the absinthe client?",
        },
      ]);

      api_key = answers.api_key;
    }
    return api_key;
  };
  const getAddress = async () => {
    const options = program.opts();
    // GET ADDRESS
    if (options.address) {
      address = options.address;
    } else {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'address',
          message: "What's the address for the user?",
        },
      ]);

      address = answers.address;
    }
    return address;
  };
  const getEvent = async (required = false) => {
    const options = program.opts();
    // GET EVENT
    if (options.event) {
      event = options.event;
    } else {
      const q = required ? "What's the event name for the points you want to distribute?" : "What's the event name for the points you want to view? Leave blank if you want to view all points.";
      const answers = await inquirer.prompt([
        {
          // make it optional
          type: 'input',
          name: 'event',
          message: q,
        },
      ]);
      // validate if required
      if (required && !answers.event) {
        console.log(chalk.red('Event name is required'));
        return getEvent(true);
      }

      event = answers.event;
    }
    return event;
  };
  const getAmount = async () => {
    const options = program.opts();
    // GET AMOUNT
    if (options.amount) {
      amount = options.amount;
    } else {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'amount',
          message: "What's the amount of points you want to distribute?",
        },
      ]);

      amount = answers.amount;
    }
    return amount;
  };
  // DECLARE ACTIONS
  program
    .command('view-points')
    .description('View points for an address in a campaign')
    .action(async () => {
      let key = await getKey();
      console.log('Viewing a point :', key);
      let addr = await getAddress();
      console.log('Viewing a point :', addr);
      let evt = await getEvent(true);
      console.log('Viewing a point :', evt);

      await getPoints(address, event, api_key);
    });

  program.parse(process.argv);
})();
