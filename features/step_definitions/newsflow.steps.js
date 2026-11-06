'use strict';
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('node:assert/strict');

Given('que {string} atua como {string}', function (pessoa, papel) {
  this.pessoa = pessoa;
  this.papel = papel;
});
Given('que existe uma edição da autora {string} com título {string} e corpo {string}', function (autora, titulo, corpo) {
  this.edicao = this.servico.criarEdicao(autora, titulo, corpo);
});
Given('que o relógio já avançou {int} segundos', function (segundos) {
  this.servico.avancarRelogio(segundos);
});
Given('que a redatora já alterou o título para {string} e o corpo para {string}', function (titulo, corpo) {
  this.servico.editar(this.edicao, titulo, corpo);
});
Given('que a edição já recebeu {int} salvamentos automáticos com conteúdos diferentes', function (quantidade) {
  for (let numero = 1; numero <= quantidade; numero++) {
    this.servico.editar(this.edicao, `Edição ${numero}`, `Conteúdo ${numero}`);
    this.servico.avancarRelogio(30);
  }
});
Given('que a edição foi submetida à revisão', function () {
  this.servico.submeterRevisao(this.edicao);
});
Given('que a redatora já restaurou a versão {int} sem criar outra versão', function (numero) {
  const numerosAntes = this.edicao.versoes.map(versao => versao.numero);
  const resultado = this.servico.restaurar(this.edicao, numero);
  assert.equal(resultado.sucesso, true);
  assert.deepEqual(this.edicao.versoes.map(versao => versao.numero), numerosAntes);
});
Given('que as versões 2 a 21 estão disponíveis antes da tentativa', function () {
  assert.deepEqual(this.edicao.versoes.map(versao => versao.numero), Array.from({ length: 20 }, (_, indice) => indice + 2));
  this.historicoAnterior = structuredClone(this.edicao.versoes);
});
Given('que a edição foi devolvida com o comentário {string} e submetida novamente', function (comentario) {
  this.servico.submeterRevisao(this.edicao);
  const resultado = this.servico.revisar(this.edicao, this.pessoa, this.papel, 'reprovar', comentario);
  assert.equal(resultado.sucesso, true);
  this.servico.submeterRevisao(this.edicao);
});

When('a redatora cria a edição {string} com o corpo {string}', function (titulo, corpo) {
  this.edicao = this.servico.criarEdicao(this.pessoa, titulo, corpo);
});
When('o relógio avança {int} segundos', function (segundos) {
  this.servico.avancarRelogio(segundos);
});
When('a redatora altera o título para {string} e o corpo para {string}', function (titulo, corpo) {
  this.servico.editar(this.edicao, titulo, corpo);
});
When('a redatora restaura a versão {int}', function (numero) {
  this.resultado = this.servico.restaurar(this.edicao, numero);
});
When('a redatora submete a edição à revisão', function () {
  this.servico.submeterRevisao(this.edicao);
});
When('o revisor aprova a edição', function () {
  this.resultado = this.servico.revisar(this.edicao, this.pessoa, this.papel, 'aprovar');
});
When('o revisor reprova a edição com o comentário {string}', function (comentario) {
  this.resultado = this.servico.revisar(this.edicao, this.pessoa, this.papel, 'reprovar', comentario);
});

Then('a edição deve estar no estado {string}', function (estado) {
  assert.equal(this.edicao.estado, estado);
});
Then('a autora da edição deve ser {string}', function (autora) {
  assert.equal(this.edicao.autora, autora);
});
Then('a quantidade de versões salvas deve ser {int}', function (quantidade) {
  assert.equal(this.edicao.versoes.length, quantidade);
});
Then('a última versão deve conter o título {string} e o corpo {string}', function (titulo, corpo) {
  const versao = this.edicao.versoes.at(-1);
  assert.ok(versao, 'Deve existir uma versão salva');
  assert.equal(versao.titulo, titulo);
  assert.equal(versao.corpo, corpo);
});
Then('os números das versões mantidas devem ser {string}', function (numeros) {
  const esperados = numeros.split(',').map(Number);
  assert.deepEqual(this.edicao.versoes.map(v => v.numero), esperados);
});
Then('a primeira versão mantida deve ser {int}', function (numero) {
  assert.equal(this.edicao.versoes[0].numero, numero);
});
Then('a última versão mantida deve ser {int}', function (numero) {
  assert.equal(this.edicao.versoes.at(-1).numero, numero);
});
Then('a versão {int} deve conter o título {string} e o corpo {string}', function (numero, titulo, corpo) {
  const versao = this.edicao.versoes.find(v => v.numero === numero);
  assert.ok(versao, `Versão ${numero} deve estar no histórico`);
  assert.equal(versao.titulo, titulo);
  assert.equal(versao.corpo, corpo);
});
Then('o conteúdo atual deve ter o título {string} e o corpo {string}', function (titulo, corpo) {
  assert.equal(this.edicao.titulo, titulo);
  assert.equal(this.edicao.corpo, corpo);
});
Then('a mensagem deve ser {string}', function (mensagem) {
  assert.ok(this.resultado, 'A ação deve produzir um resultado');
  assert.equal(this.resultado.mensagem, mensagem);
});
Then('a aprovação deve identificar o revisor {string}', function (revisor) {
  assert.ok(this.edicao.aprovacao);
  assert.equal(this.edicao.aprovacao.revisor, revisor);
});
Then('a edição não deve possuir aprovação', function () {
  assert.equal(this.edicao.aprovacao, null);
  assert.equal(this.resultado.sucesso, false);
});
Then('a edição não deve possuir aprovação registrada', function () {
  assert.equal(this.edicao.aprovacao, null);
});
Then('o comentário de reprovação deve ser {string}', function (comentario) {
  assert.equal(this.edicao.comentarioReprovacao, comentario);
});
Then('a edição não deve possuir comentário de reprovação', function () {
  assert.equal(this.edicao.comentarioReprovacao, null);
  assert.equal(this.resultado.sucesso, false);
});
Then('a revisão deve ser recusada', function () {
  assert.equal(this.resultado.sucesso, false);
});
Then('o histórico deve permanecer inalterado', function () {
  assert.deepEqual(this.edicao.versoes, this.historicoAnterior);
});
