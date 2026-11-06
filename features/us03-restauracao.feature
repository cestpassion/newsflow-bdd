# language: pt
@US03 @RN01
Funcionalidade: Restaurar uma versão da edição
  Como redatora que precisa desfazer uma alteração
  Quero restaurar uma versão anterior ainda disponível
  Para recuperar o conteúdo sem destruir mudanças posteriores

  Contexto:
    Dado que "Ana" atua como "redatora"
    E que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Texto inicial"

  @feliz @smoke
  Cenário: Recuperar o título e o corpo de uma versão anterior
    Dado que a edição já recebeu 2 salvamentos automáticos com conteúdos diferentes
    Quando a redatora restaura a versão 1
    Então o conteúdo atual deve ter o título "Edição 1" e o corpo "Conteúdo 1"
    E a mensagem deve ser "Versão restaurada"

  @alternativo
  Cenário: Manter as versões posteriores à versão restaurada
    Dado que a edição já recebeu 3 salvamentos automáticos com conteúdos diferentes
    Quando a redatora restaura a versão 1
    Então os números das versões mantidas devem ser "1,2,3"
    E a versão 3 deve conter o título "Edição 3" e o corpo "Conteúdo 3"
    E o conteúdo atual deve ter o título "Edição 1" e o corpo "Conteúdo 1"

  @feliz
  Cenário: Salvar o conteúdo restaurado somente no próximo ciclo e com número novo
    Dado que a edição já recebeu 3 salvamentos automáticos com conteúdos diferentes
    E que a redatora já restaurou a versão 1 sem criar outra versão
    Quando o relógio avança 30 segundos
    Então os números das versões mantidas devem ser "1,2,3,4"
    E a versão 3 deve conter o título "Edição 3" e o corpo "Conteúdo 3"
    E a versão 4 deve conter o título "Edição 1" e o corpo "Conteúdo 1"

  @excecao
  Cenário: Impedir a restauração de uma versão que saiu do histórico
    Dado que a edição já recebeu 21 salvamentos automáticos com conteúdos diferentes
    E que as versões 2 a 21 estão disponíveis antes da tentativa
    Quando a redatora restaura a versão 1
    Então a mensagem deve ser "Versão indisponível para restauração"
    E o conteúdo atual deve ter o título "Edição 21" e o corpo "Conteúdo 21"
    E os números das versões mantidas devem ser "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21"
    E a versão 2 deve conter o título "Edição 2" e o corpo "Conteúdo 2"
    E a versão 21 deve conter o título "Edição 21" e o corpo "Conteúdo 21"
    E o histórico deve permanecer inalterado
