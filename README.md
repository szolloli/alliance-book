# Alliance book

This is a proposed solution of a interview task assigned by Brackets by Triads.

## Structure

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

App is using Expo Router for simple navigation. App consists of two main screens one with a list of all characters and another with details about a specific character.

App is using react query + fetch api for data fetching and caching. 

For animations Reanimated has been used in two places. 1. Animation of image as well as textual information on the details screen. 2. Quirky header animation on the list screen - mimicking the famous "binary sunset" scene from the Star Wars movies.

Possiblity of searching and filtering chracters by gender has also been implemented. It is done through a floating button in the right bottom corner which opens a modal with search field and checkboxes for gender.

The whole app is in a dark "starwarsy" theme.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

