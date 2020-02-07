// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCk4Oelo4krTUONUCgwvIlDr0WduE8mskY",
    authDomain: "kiaradiary-bcdcb.firebaseapp.com",
    databaseURL: "https://kiaradiary-bcdcb.firebaseio.com/",
    projectId: "kiaradiary-bcdcb",
    storageBucket: "kiaradiary-bcdcb.appspot.com",
    messagingSenderId: "117946593384",
    appId: "1:117946593384:web:ad703208f524ddcd0a4bdd"
  },
  dialogflow: {
    kiaraBot: '48feabadd6044f54a742a79c32e471f1'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
