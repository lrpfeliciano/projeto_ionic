import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { PessoaService } from '../service/pessoa.service';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  nome: string;
  email: string;
  telefone: string;

  idPessoa = null;

  constructor(private servico: PessoaService,
              private route: ActivatedRoute,
              private nav: NavController) { }

  ngOnInit() {
    this.idPessoa = this.route.snapshot.params['id'];
    console.log(this.idPessoa);
    if (this.idPessoa){
      this.nome = this.route.snapshot.params['nome'];
      this.email = this.route.snapshot.params['email'];
      this.telefone = this.route.snapshot.params['telefone'];
    }
  }

  salvar(){
    let registro = {};
    registro['nome'] = this.nome;
    registro['email'] = this.email;
    registro['telefone'] = this.telefone;

    if (this.idPessoa){
      this.servico.alterar(this.idPessoa, registro).then(resp => {
        this.nome = "";
        this.email = "";
        this.telefone = "";
        
        this.nav.navigateForward('home');
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      this.servico.cadastrar(registro).then(resp => {
        this.nome = "";
        this.email = "";
        this.telefone = "";

        this.nav.navigateForward('home');
      })
      .catch(error => {
        console.log(error);
      });

   }
  }








}
