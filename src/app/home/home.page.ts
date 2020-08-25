import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { PessoaService } from '../service/pessoa.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pessoas: any;

  constructor(private servico: PessoaService,
              private route: ActivatedRoute,
              private nav: NavController) {}

  remover(id){
    this.servico.excluir(id);
  }

  inicioAlteracao(registro){
    console.log(registro);
    console.log(registro.id);
    this.nav.navigateForward( ['formulario', 
            { id: registro.id, 
              nome: registro.nome,
              email: registro.email,
              telefone: registro.telefone  }] );
  }

  ngOnInit(){
    this.servico.listar().subscribe(data => {
      this.pessoas = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          telefone: e.payload.doc.data()['telefone']
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