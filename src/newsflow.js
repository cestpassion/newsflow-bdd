'use strict';

// Domínio didático em memória. O relógio avança explicitamente, sem sleep real.
class NewsFlow {
  constructor() {
    this.agora = 0;
    this.edicoes = [];
  }

  criarEdicao(autora, titulo, corpo) {
    const edicao = {
      autora, titulo, corpo, estado: 'rascunho', versoes: [],
      proximaVersao: 1, ultimoSalvamento: this.agora,
      aprovacao: null, comentarioReprovacao: null
    };
    this.edicoes.push(edicao);
    return edicao;
  }

  editar(edicao, titulo, corpo) {
    if (edicao.estado !== 'rascunho') throw new Error('Somente rascunhos podem ser editados');
    edicao.titulo = titulo;
    edicao.corpo = corpo;
  }

  avancarRelogio(segundos) {
    if (!Number.isFinite(segundos) || segundos < 0) throw new Error('Intervalo inválido');
    const destino = this.agora + segundos;
    for (const edicao of this.edicoes) {
      if (edicao.estado !== 'rascunho') continue;
      while (edicao.ultimoSalvamento + 30 <= destino) {
        edicao.ultimoSalvamento += 30;
        edicao.versoes.push(Object.freeze({
          numero: edicao.proximaVersao++,
          titulo: edicao.titulo,
          corpo: edicao.corpo,
          salvoEm: edicao.ultimoSalvamento
        }));
        if (edicao.versoes.length > 20) edicao.versoes.shift();
      }
    }
    this.agora = destino;
  }

  restaurar(edicao, numero) {
    const versao = edicao.versoes.find(v => v.numero === numero);
    if (!versao) return { sucesso: false, mensagem: 'Versão indisponível para restauração' };
    if (edicao.estado !== 'rascunho') return { sucesso: false, mensagem: 'A edição precisa estar em rascunho' };
    edicao.titulo = versao.titulo;
    edicao.corpo = versao.corpo;
    // A restauração muda o conteúdo corrente. O próximo ciclo de 30 s cria a nova versão.
    return { sucesso: true, mensagem: 'Versão restaurada' };
  }

  submeterRevisao(edicao) {
    if (edicao.estado !== 'rascunho') throw new Error('A edição precisa estar em rascunho');
    edicao.estado = 'em_revisao';
  }

  revisar(edicao, pessoa, papel, decisao, comentario = '') {
    if (edicao.estado !== 'em_revisao') return { sucesso: false, mensagem: 'A edição precisa estar em revisão' };
    if (papel !== 'revisor') return { sucesso: false, mensagem: 'Somente revisores podem avaliar a edição' };
    if (pessoa === edicao.autora && decisao === 'aprovar') {
      return { sucesso: false, mensagem: 'O autor não pode aprovar a própria edição' };
    }
    if (decisao === 'reprovar') {
      if (!comentario.trim()) return { sucesso: false, mensagem: 'Comentário de reprovação obrigatório' };
      edicao.estado = 'rascunho';
      edicao.comentarioReprovacao = comentario.trim();
      edicao.aprovacao = null;
      edicao.ultimoSalvamento = this.agora;
      return { sucesso: true, mensagem: 'Edição devolvida ao rascunho' };
    }
    if (decisao !== 'aprovar') throw new Error('Decisão inválida');
    edicao.estado = 'aprovada';
    edicao.aprovacao = { revisor: pessoa, aprovadaEm: this.agora };
    return { sucesso: true, mensagem: 'Edição aprovada' };
  }
}

module.exports = { NewsFlow };
