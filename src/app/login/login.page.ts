import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController} from '@ionic/angular';

import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validacao: FormGroup;
  mensagemErro: string = '';

  constructor( private nav: NavController,
               private formulario: FormBuilder,
               private servico: AutenticacaoService ) { }

  ngOnInit() {
    this.validacao = this.formulario.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      senha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))

    });
  }

  mensagem_validacao = {
    'email': [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'pattern', message: 'E-mail inválido'}
    ],
    'senha': [
      {type: 'required', message: 'Senha é obrigatória'},
      {type: 'minlength', message: 'Senha deve ter no mínimo seis caracteres'}
    ]
  };

  login (valor) {
    this.servico.autenticar(valor).then(res => {
      this.mensagemErro = "";
      this.nav.navigateForward('/home');

    }, err => {
      this.mensagemErro = err;
    });
  }
}
