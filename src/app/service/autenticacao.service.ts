import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor( private autorizacao: AngularFireAuth) { }

  registrar(valor){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.auth.createUserWithEmailAndPassword(valor.email, valor.senha).then(
        res => resolve(res),
        err => reject(err)
      )
    })
    
  }

  autenticar(valor){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.auth.signInWithEmailAndPassword(valor.email, valor.senha).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  logout(){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.auth.signOut().then(() => {
        resolve();
      }).catch((error) => {
        reject();
      })
    })
  }

}
