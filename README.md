# ServisBot Tech Test

## Setup
Setup can be done via the Makefile, which contains commands for running the services separately or within Docker

### Running Locally
Execute these commands in separate terminals:
```make
make server # installs server npm packages, then starts ExpressJS server
make client # installs client npm packages, exports variables and starts Vite
```

### Running with Docker
Simply run:
```make
make docker # builds and starts containers with docker-compose
```

## Architecture
### Client
The client consists of some of the following tools/packages
- React
- Vite
- Material UI
- React Query
- React Router Dom

The frontend is setup in such a way that very little internal state is held within any component. Instead, the UI is largely driven by URL params via React Router Dom. A query hook from React Query in each of the 'pages' listens for any changes to the URL query params and will refetch accordingly. The UI supports drilling down on bot > worker > log though each of these items can be viewed separately also.

  ### Server
  The server consists of a basic API built using ExpressJS. The API itself does little more than reading the contents of the files within the `mock_data` folder in an effort to immitate reading from a DB, but does support some additional features such as searching and pagination (in a 'mocked' implementation).


## Omissions
Items that were not implemented due to time constraints
- Frontend tests
- JSDoc comments on utils and controller functions in server
- Sorting & extended filtering (being able to sort alphabetically, by date and filtering based on additional fields e.g. a given bot, or status)
- GitHub actions for running lint rules and tests when opening PRs
- Mobile responsiveness
