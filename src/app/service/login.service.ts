import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { Router, ActivatedRoute } from "@angular/router";
import { resolve } from "path";
import { reject } from "q";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(
    private afauth: AngularFireAuth,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  // zavola sa funkcia firebasu GoogleAuthProvider
  googlelogin() {
    return new Promise(resolve => {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          resolve();
        });
    });
  }
// zavola logout nad firebase kniznicou. Odstrani token z localstoru a presmeruje na stranku login
  logout() {
    this.afauth.auth
      .signOut()
      .then(res => {
        localStorage.removeItem("token");
        this.router.navigate(["../login"], { relativeTo: this.activatedroute });
      })
      .catch(error => console.log(error.message));
  }

  // vrati prihlaseneho pouzivatela
  getusers() {
    return this.afauth.user;
  }
// vytvori sa ucet vlozenim emailu a hesla do databaxy
  createuser(user: { email: any; password: any }) {
    return new Promise((resolve, reject) => {
      this.afauth.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(user => {
          this.afauth.user.subscribe(
            x => {
              if (x) {
                x.sendEmailVerification()
                  .then(() => {
                    console.log("Email verification sent");
                  })
                  .catch(err => {
                    console.log("Error: ", err);
                  });
              }
              resolve(user);
            },
            error => {
              reject(error);
            }
          );
        });
    });
  }

  // pomocou firebase autentifikacie sa overi meno a heslo
  signinwithemail(user: { email: any; password: any }) {
    return new Promise((resolve, reject) => {
      this.afauth.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(
          () => {
            resolve();
          },
          error => {
            reject(error);
          }
        );
    });
  }

  // vrati token ulozeny v localstorage
  gettoken() {
    return !!localStorage.getItem("token");
  }
}
