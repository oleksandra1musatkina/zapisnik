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


//len nastavenie komponentu
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
  // lists: Observable<Details[]>;
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
    //zo service pre login je ziskany user
    this.login.getusers().subscribe(auth => {
      this.user = auth;
    });
    //z firestoru sa vytiahnu vstky zaznami kde je uid rovnake ako id prihlaseneho pouzivatela
    this.uid = new BehaviorSubject(localStorage.getItem("token"));
    var a = this.uid.pipe(
      switchMap(uid =>
        this.afs
          .collection<Details>("dailydiary", ref => ref.where("uid", "==", uid))
          .snapshotChanges()
      )
    );
    //a ma  typ AnonymousSubject
    console.log(a)
//prihlasime sa na pozorovanie dokoncenia zyskavania dat. spravim map aby smr skazdeho zaznamu dostali data a id   
//data a id vlozime do premennej typu DetailsId a tu vlozime do premennej list22
    var b = a.subscribe(value => value.map(dd => 
      {const dataFromServer = dd.payload.doc.data() as Details;
        const id = dd.payload.doc.id;
        const di:DetailsId = { id, ...dataFromServer };        
        this.lists2.push(di)
      }
        ))



  }
  
/**
 * odstrani zaznam dennika na zaklade id, cez priklad firestoru -> treba ziskat kolekciu v nej dokuments konkretnym id a ten odstranik
 * @param id 
 */
  deleteDoc(id){
    this.afs
          .collection<Details>("dailydiary").doc(id).delete().catch(error => {console.log(error); })
          .then(() => this.show=true);
  }

 
/**
 * 
 * zobrazenie detailu o zazname v denniku. Funkcia sa zavola ked sa klikne na riadok s napisom teda datumom
 * v premennej details su data ktore sa maju zobrazit
 * prenna show akje false, zmizne zoznam a zobrazi sa konkretna sprava
 */
  getdetails(details) {
    this.details = details;
    this.show = false;
  }
}
