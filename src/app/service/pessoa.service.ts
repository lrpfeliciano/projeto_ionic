import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, 
    AngularFirestoreModule } 
      from 'angularfire2/firestore';
/*
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
*/
@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private firestore: AngularFirestore ) { }

  listar(){
    return this.firestore.collection('pessoa').snapshotChanges();
  }

  excluir(id){
    console.log(id);
    this.firestore.doc('pessoa/'+id).delete();
  }

  cadastrar(registro) {
    return this.firestore.collection('pessoa').add(registro);
  }  

  alterar(id, registro) { 
    return this.firestore.doc('pessoa/'+id).update(registro);
  }













}
