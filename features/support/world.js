'use strict';
const { setWorldConstructor } = require('@cucumber/cucumber');
const { NewsFlow } = require('../../src/newsflow');

class MundoNewsFlow {
  constructor() {
    this.servico = new NewsFlow();
    this.pessoa = null;
    this.papel = null;
    this.edicao = null;
    this.resultado = null;
  }
}
setWorldConstructor(MundoNewsFlow);
