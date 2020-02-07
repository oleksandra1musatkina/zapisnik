import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoginService } from "src/app/service/login.service";
import { Router, ActivatedRoute } from "@angular/router";
import * as admin from "firebase-admin";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Details, DetailsId } from "src/app/shared/details.module";
import { BehaviorSubject, Observable, pipe } from "rxjs";
import { switchMap, map } from "rxjs/operators";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})



export class HomeComponent implements OnInit {
  public user = null;
  public details: DetailsId;
  public detailsCollection: any;
  public show: boolean = true;
  lists2: DetailsId[]=[];

  uid: BehaviorSubject<string>;
  constructor(
    
    private afauth: AngularFireAuth,
    private login: LoginService,
    private route: Router,
    private activatedroute: ActivatedRoute,
    private afs: AngularFirestore
  ) {
  }


  

  ngOnInit() {
    this.login.getusers().subscribe(auth => {
      this.user = auth;
    });
    this.uid = new BehaviorSubject(localStorage.getItem("token"));
    var a = this.uid.pipe(
      switchMap(uid =>
        this.afs
          .collection<Details>("dailydiary", ref => ref.where("uid", "==", uid))
          .snapshotChanges()
      )
    );
    console.log(a)

    var b = a.subscribe(value => value.map(dd => 
      {const dataFromServer = dd.payload.doc.data() as Details;
        const id = dd.payload.doc.id;
        const di:DetailsId = { id, ...dataFromServer };        
        this.lists2.push(di)
      }
        ))



  }
  

  deleteDoc(id){
    this.afs
          .collection<Details>("dailydiary").doc(id).delete().catch(error => {console.log(error); })
          .then(() => this.show=true);
  }

 

  getdetails(details) {
    this.details = details;
    this.show = false;
  }
}
