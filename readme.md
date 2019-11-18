# Prox

Prox is a mobile web app that aims to improve your daily life by providing some
basic automation, reminders, and notifications about your travel.

## Prerequisites

You must have node.js installed to build and run this project.

run `npm install` to install all required dependencies.

This project runs off of Cordova which can be installed with `npm install -g cordova`

You must have the android SDK to build an android APK, the SDK can also be used to
run android emulators.  The SDK comes with [android studio](https://developer.android.com/studio)

Make sure to install the android build tools from the SDK manager.

If you do not want to install android studio, you can also use Cordova to test the application
on a browser.

## Build and Run

### Browser

Ensure the Cordova browser platform is added `cordova platform add browser`

Run the Cordova app on your browser with `cordova run browser`

You will need to resize your browser to be the aspect ratio of a phone screen so
that the hamburger menu appears.

### Android

Add the Cordova android platform with `cordova platform add android`

Plug in your android device or run an emulator, if you are using a physical device,
developer mode must be enabled.

Run the cordova app for android `cordova run android`