# CMS project Admin System

## Intro

CMS project is made up of three parts:

- API
- Admin system
- Client

This project is 'Admin system' part. It is developed upon React, along with Redux, React router and Material-UI etc.

## Run on development mode

This system is a front end based on CMS API. Before running it, make sure API is running.

- System requirements: Node.js, NPM
- Install dependencies: `yarn`
- Create file `.env.local` under project directory to specify API URL, as below:

```
REACT_APP_API_URL=http://localhost:3005
```

- Open browser and visit `http://localhost:3001` and you can use the account and password you created to login system

## Functionalities and Features

- Write a new post
- Edit, delete, trash and delete post
- Create, edit, delete and update categories
- Create, edit, delete and update tags
- Censor, delete and set top comments
- Support multiple admins and super admin can create, update, delete, inactivate, activate admins and reset password for other admins.
- Change password

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
