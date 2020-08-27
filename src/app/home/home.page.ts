import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

import { PessoaService } from '../service/pessoa.service';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pessoas: any;

  constructor(private servico: PessoaService,
              private route: ActivatedRoute,
              private nav: NavController,
              private alerta: AlertController,
              private autServico: AutenticacaoService) {}


  sair (){
    this.autServico.logout().then(res => {
      this.nav.navigateBack('');
    })
    .catch(error => {

    })
  }       
       
  async remover(id){
    const mensagem = await this.alerta.create({
      header: 'Atenção',
      message: 'Deseja excluir esse contato?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.servico.excluir(id);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });

    await mensagem.present();

    //this.servico.excluir(id);
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