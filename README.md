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
- -e, --event <event> The event to use for the absinthe client
- -m, --amount <amount> The amount to use for the absinthe client
- -q, --quiet <quiet> Do not display any helpful text just request and response
- -n, --name <name> Name to use while registering
- -h, --help display help for command

Commands:

- getPointsByCampaign View points for an address in a campaign
- getPoints View all points for an address in all campaigns
- distribute Distribute points for an address in a campaign
- register Distribute points for an address in a campaign
- help [command] display help for command

## Commands

#### 1. Register

```bash
npx @waliba/absinthe-points-sdk register -n "Project Name" or --name "Project Name"
```

This command registers a project with the given name and returns the address.

##### Screenshots

![Register](

)

#### 2. Distribute

```bash
npx @waliba/absinthe-points-sdk -a "0x1234567890" -e "Event Name" -m 100
```

This command distributes points to the given address for the given event.

##### Screenshots

![Distribute](

)

#### 3. Get Points

```bash
npx @waliba/absinthe-points-sdk getPoints -a "0x1234567890" -k "d8c263fc-c820-49b7-af31-cafe95720322"
```

This command gets all the points for the given address.

#### 4. Get Points By Campaign

```bash
npx @waliba/absinthe-points-sdk getPointsByCampaign -a "0x1234567890" -k "d8c263fc-c820-49b7-af31-cafe95720322"
```

This command gets all the points for the given address in the given campaign.

## Extra

Any key that is not passed will be asked again by the cli. So feel free to just paste the command.
Also --help command shows all info about the CLI

## Contributing

We welcome contributions to improve absinthe-points-sdk. If you find a bug or have a feature request, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
