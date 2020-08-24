import { Component } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pessoas: any;

  constructor(private servico: PessoaService) {}

  remover(id){
    this.servico.excluir(id);
  }

  ngOnInit(){
    this.servico.listar().subscribe(data => {
      this.pessoas = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email']
        };
      }
      
      );
       
      console.log(this.pessoas);
    }

    );
  }
}


/*
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pessoas: any;

  constructor(private servico: PessoaService) {}

  
  ngOnInit(){
    this.servico.listar().subscribe(data => {
      this.pessoas = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome']
        };
      }

      );
    }

    );
  }
  

  
}
*/