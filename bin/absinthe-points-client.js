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
  const url = `${BASE_URL}/api/points/${address}`;
  const token = `Bearer ${api_key}`;
  const headers = {
    Authorization: token,
    'User-Agent': 'absinthe-client',
  };
  const params = {
    eventName: event || undefined,
  };
  try {
    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    // match different errors
    /**
     * @type {import('axios').AxiosError}
     */
    const _error = error;
    if (_error.response?.status == 401) {
      console.log(chalk.red(`401 Auth Error: Please confirm your token is valid`));
    }
    console.log(chalk.red(_error.message));
  }
};

const setPoints = async (points, address, event, api_key) => {
  const url = `${BASE_URL}/api/points`;
  const token = `Bearer ${api_key}`;
  const headers = {
    Authorization: token,
    'User-Agent': 'absinthe-client',
  };
  try {
    const response = await axios.post(
      url,
      {
        address,
        eventName: event,
        points,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    /**
     * @type {import('axios').AxiosError}
     */
    const _error = error;
    if (_error.response?.status == 401) {
      console.log(chalk.red(`401 Auth Error: Please confirm your token is valid`));
    }
    console.log(chalk.red(_error.message));
  }
};

const register = async (name) => {
  const url = `${BASE_URL}/api/register`;
  try {
    const response = await axios.post(url, {
      name,
    });
    return response.data;
  } catch (error) {
    /**
     * @type {import('axios').AxiosError}
     */
    const _error = error;
    console.log(chalk.red(_error.message));
    console.log(error);
  }
};

(async () => {
  // check if the api_key is already set via --api-key
  program.option('-k, --apiKey <apiKey>', 'The api key to use for the absinthe client');
  program.option('-a, --address <address>', 'The address to use for the absinthe client');
  program.option('-e, --event <event>', 'The event to use for the absinthe client');
  program.option('-m, --amount <amount>', 'The amount to use for the absinthe client');
  program.option('-q, --quiet <quiet>', 'Do not display any helpful text just request and response');
  program.option('-n, --name <name>', 'Name to use while registering');
  const getKey = async () => {
    const options = program.opts();
    // GET API KEY
    if (options.apiKey) {
      api_key = options.apiKey;
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
    // key must be uuid
    if (!api_key) {
      console.log(chalk.red('API Key is required'));
      options.apiKey = null;
      return getKey();
    }
    if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(api_key)) {
      console.log(chalk.red('API Key must be valid'));
      options.apiKey = null;
      return getKey();
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
    if (!address) {
      console.log(chalk.red('Address is required'));
      options.address = null;
      return getAddress();
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

      event = answers.event;
    }
    // validate if required
    if (required && !event) {
      console.log(chalk.red('Event name is required'));
      options.event = null;
      return getEvent(true);
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
    if (!amount) {
      console.log(chalk.red('Amount is required'));
      options.amount = null;
      return getAmount();
    }
    // amount must be a number
    if (Number.isNaN(Number(amount))) {
      console.log(chalk.red('Amount must be a number'));
      options.amount = null;
      return getAmount();
    }
    return Number(amount);
  };
  const getName = async (required = false) => {
    const options = program.opts();
    // GET Name
    if (options.name) {
      name = options.name;
    } else {
      const q = "What's the name of your business?";
      const answers = await inquirer.prompt([
        {
          // make it optional
          type: 'input',
          name: 'name',
          message: q,
        },
      ]);

      name = answers.name;
    }
    // validate if required
    if (!name) {
      console.log(chalk.red('Name is required to register'));
      options.name = null;
      return getName(true);
    }
    return name;
  };
  const options = program.opts();
  // DECLARE ACTIONS
  program
    .command('getPointsByCampaign')
    .description('View points for an address in a campaign')
    .action(async () => {
      const key = await getKey();
      const addr = await getAddress();
      const evt = await getEvent(true);
      // const pts = await getAmount()

      const points = await getPoints(addr, evt, key);
      if (points?.points?.length) {
        const displayPoints = (points.points || []).map((p) => ({
          event: p.event.name,
          points: p.points,
          address: p.address,
          created_at: p.created_at,
        }))[0];
        if (options.quiet) {
          return console.log(displayPoints);
        }
        console.table(displayPoints);
      }
    });

  program
    .command('getPoints')
    .description('View all points for an address in all campaigns')
    .action(async () => {
      const key = await getKey();
      const addr = await getAddress();
      const points = await getPoints(addr, null, key);
      if (points) {
        const displayPoints = (points.points || []).map((p) => ({
          event: p.event.name,
          points: p.points,
          address: p.address,
          created_at: p.created_at,
        }));
        if (options.quiet) {
          return console.log(displayPoints);
        }
        console.table(displayPoints);
      }
    });

  program
    .command('distribute')
    .description('Distribute points for an address in a campaign')
    .action(async () => {
      const key = await getKey();
      const addr = await getAddress();
      const evt = await getEvent(true);
      const pts = await getAmount();

      const result = await setPoints(pts, addr, evt, key);
      if (result?.points) {
        const displayPoints = {
          event: evt,
          points: result.points.points,
          address: result.points.address,
          created_at: result.points.created_at,
        };
        if (options.quiet) {
          return console.log(displayPoints);
        }
        console.table(displayPoints);
      }
    });

  program
    .command('register')
    .description('Distribute points for an address in a campaign')
    .action(async () => {
      const name = await getName();
      const result = await register(name);
      if (result?.business) {
        const displayPoints = result.business;
        if (options.quiet) {
          return console.log(displayPoints);
        }
        console.table(displayPoints);
      }
    });

  program.parse(process.argv);
})();
