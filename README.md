
# Project Jeera

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@jeera/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.






## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.


## Client GH pages deployment

### Dependency

npm i angular-cli-ghpages --save-dev

### Steps

ng build --prod --base-href "https://GitHubUserName.github.io/GitHubfolderName/"

angular-cli-ghpages --dir=dist/client

or use script: `npm run deploy:gh`

## To do

- [ ] general
  - [ ] [research] what is the function of lib `api-interfaces`, if it's usefull, and if you should move api and client interfaces to corresponding libs
  - [ ] [research] create custom mat-input component to reduce code repetition in form templates
  - [ ] dockerize the whole application 
  - [ ] add loaders when:
    - [ ] ticket is created
    - [ ] tickets are loaded
    - [ ] users are loaded
    - [ ] email is validated
    - [ ] user signs-in
    - [ ] user signs-up
    - [ ] user signs-out
  - [ ] ...

- [ ] write api test:
  - [ ] ...

- [ ] write client tests:
  - [ ] ...

- [ ] better error handling:
  - [x] error interceptor
  - [ ] separate error pages for 404 and 400
- [ ] separate sign-out page (?)
- [ ] sign-up view
  - [ ] validation should not be triggered on submitting
  - [ ] email uniqueness checked only on submit
  - [ ] separate "show password" buttons for "password" and "password confirmation"
  - [ ] password mismatch error visible only under password confirmation
- [ ] sign-in
  - [ ] show email/password errors below corresponding input field
- [ ] tickets
  - [x] tickets resolver
  - [x] disabled author field in "create ticket" modal filled with currently signed-in user's name
  - [x] editing existing tickets
  - [x] enable table pagination
  - [x] drag & drop breaks pagination
  - [ ] additional fields on ticket form/ticket model:
    - [ ] due to
    - [ ] environment
    - [ ] ticket type: epic, story, ticket, bug (initially they just labels)
    - [ ] labels (creating, changing colors and names)
  - [ ] user can create own statuses/board columns
  - [ ] user can rearrange columns in the board
  - [ ] user can create multiple projects with separate backlogs and boards
  - [ ] hide input frames on blurred input fields
  - [ ] ticket modal should be scrollable or resize in smaller viewports
  - [ ] rearrange ticket form fields - move most dropdowns to the right side (similar to Trello or Jira)
  - [ ] add "environment" field (FE and BE)
  - [ ] implement sorting tickets table (by default sort by createdAt desc)
  - [ ] include ticket id in details modal when updating
  - [ ] change formatting for priority and status in table (remove underscore and add title case)
  - [ ] removing tickets (only soft delete)
  - [ ] "Done" and "Cancelled" should be hidden by default (but searchable)
  - [ ] correctly sort tickets by position (if not null) or by createdAt date
  - [ ] store new tickets positions in the Database
  - [ ] comments visible under corresponding tickets
  - [ ] adding new comments
  - [ ] editing (only) own comments
  - [ ] adding attachments to tickets (uploads)
  - [ ] adding attachments to comments (uploads) (?)
  - [ ] WYSIWYG editor in ticket description
  - [ ] WYSIWYG editor in comment field
  - [ ] board view
  - [ ] adding/removing tickets categories
  - [ ] move inline styles to scss files
- [ ] users
  - [x] users resolver
  - [ ] admin can see both active and inactive users in users management page
  - [ ] users management page is accessible only for admins
  - [ ] editing users data, changing role and active state
  - [ ] adding users
  - [ ] deleting users (soft delete)
  - [ ] move inline styles to scss files
  - [ ] user profiles
  - [ ] avatars
- [ ] implement authorisation/roles management
- [ ] events logging (audit)
- [ ] sending messages between users
- [ ] SSO with Gmail?
- [ ] use websockets
  - [ ] show user online status
  - [ ] add chat
- [ ] color themes (light, dark, etc.)
- [ ] add more languages (i18n)

- [ ] known bugs and issues
  - [ ] show password button on signIn page is pluralised (should be in the singular form)
  - [ ] email should be validated only when user submits signUp form
  - [ ] inactive users are not visible on "manage users" page
