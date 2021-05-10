# VapeAware
A log app for WWU NEAT Lab's vaping study.

We currently deploy this project with [Expo](https://docs.expo.io). Expo is currently required build, run, and deploy the app. Details about stopping the use of Expo as a workflow manager can be found [here](https://docs.expo.io/bare/customizing/) and [here](https://docs.expo.io/bare/exploring-bare-workflow/).

## Dependencies
Expo has [requirements](https://docs.expo.io/get-started/installation/) that must be installed before the project is run:
- [NodeJS](https://nodejs.org/en/) (LTS or later)
- [git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall) (only if on MacOS)

## Setup
Within the project directory, run `npm install` to install local dependencies. Before running the project, a .env file needs to be created at the root with the enviroment variables (only applicable during development).

## Running the Project
1. Run the expo development server with `npm start`
1. Test on a local device, OR
    1. Download on Phone the [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) app
    1. Scan the QR displayed in the development portal
1. Test on a simulator
    1. Install [Xcode](https://developer.apple.com/xcode/) or [Android Studios](https://developer.android.com/studio)
    1. Run `npm run ios` or `npm run android`

## Debugging
1. Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger/releases)
2. Set the port to 19001
3. Select Debug Remote JS after running `npm start`