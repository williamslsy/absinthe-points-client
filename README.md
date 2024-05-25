# Absinthe Points SDK

`absinthe-points-sdk` is a command-line tool that helps you manage your campaigns and distribute points to your user addresses.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [What's Included](#whats-included)
- [Contributing](#contributing)
- [License](#license)

## Installation

Before using `absinthe-points-sdk`, make sure you have Node.js and npm installed on your system. You can install it globally using npm:

```bash
npm install -g @waliba/absinthe-points-sdk
```

Alternatively, you can use npx to run it without installing it globally:

```bash
npx @waliba/absinthe-points-sdk
```

## Usage

Usage: absinthe-points-sdk [options] [command]

Options:

- -k, --apiKey <apiKey> The api key to use for the absinthe client
- -a, --address <address> The address to use for the absinthe client
- -e, --event <event> The event name to use for the absinthe client
- -m, --amount <amount> The amount of points to use for the absinthe client
- -q, --quiet <quiet> Do not display any helpful text just request and response
- -n, --name <name> Name to use while registering a campaign
- -h, --help display help for command

Commands:

- register -- Registers a campaign with a given name and returns an API key and identifier for that campaign
- distribute -- Distribute points for an address for a specific event in a campaign
- getPointsByEvent -- View points for an address for a specific event in a campaign
- getPoints -- View all points for an address for all the events in a campaign
- help -- display help for command

## Commands

#### 1. Register

```bash
npx @waliba/absinthe-points-sdk register -n "Project/Campaign Name" or --name "Project/Campaign Name"
```

This command registers a project/campaign with the given name and returns the API key and an Identifier for the campaign.

##### Screenshot

![Register](https://i.postimg.cc/tCmSjKgj/screenshot1-absinthe-points-client.png)

#### 2. Distribute

```bash
npx @waliba/absinthe-points-sdk -a "0x1234567890" -e "Event Name" -m 100
```

This command distributes points to the specified address for the specified event.

##### Screenshot

![Distribute](https://i.postimg.cc/KvdPQxzR/screenshot2-absinthe-points-client.png)

#### 3. Get Points

```bash
npx @waliba/absinthe-points-sdk getPoints -a "0x1234567890" -k "d8c263fc-c820-49b7-af31-cafe95720322"
```

This command gets all the points for the given address.

##### Screenshot

![GetPoints](https://i.postimg.cc/8CSF3CMn/screenshot3-absinthe-points-client.png)

#### 4. Get Points By Event

```bash
npx @waliba/absinthe-points-sdk getPointsByCampaign -a "0x1234567890" -k "d8c263fc-c820-49b7-af31-cafe95720322"
```

This command gets all the points for the specified address in the specified campaign.

## Extra

Any key that is not passed will be requested by the cli. You can just paste the command.
Also --help command shows all info about the CLI

## Contributing

We welcome contributions to improve absinthe-points-sdk. If you find a bug or have a feature request, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
