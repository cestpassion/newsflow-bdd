# language: pt
@US01 @RN01
Funcionalidade: Criar e salvar o rascunho da edição
  Como redatora que inicia uma edição
  Quero criar um rascunho que seja salvo automaticamente
  Para não perder o conteúdo que estou escrevendo

  Contexto:
    Dado que "Ana" atua como "redatora"

  @feliz @smoke
  Cenário: Criar uma edição como rascunho
    Quando a redatora cria a edição "News de novembro" com o corpo "Novidades da Vértice"
    Então a edição deve estar no estado "rascunho"
    E a autora da edição deve ser "Ana"
    E a quantidade de versões salvas deve ser 0

  @feliz
  Cenário: Salvar automaticamente o conteúdo após 30 segundos
    Dado que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Novidades da Vértice"
    Quando o relógio avança 30 segundos
    Então a última versão deve conter o título "News de novembro" e o corpo "Novidades da Vértice"
    E a quantidade de versões salvas deve ser 1

  @feliz
  Cenário: Salvar a alteração no próximo ciclo periódico sem esperar 30 segundos de inatividade
    Dado que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Texto inicial"
    E que o relógio já avançou 45 segundos
    E que a redatora já alterou o título para "Título revisado" e o corpo para "Texto revisado"
    Quando o relógio avança 15 segundos
    Então os números das versões mantidas devem ser "1,2"
    E a versão 1 deve conter o título "News de novembro" e o corpo "Texto inicial"
    E a versão 2 deve conter o título "Título revisado" e o corpo "Texto revisado"

  @feliz
  Cenário: A primeira edição do texto não reinicia a contagem do primeiro ciclo
    Dado que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Texto inicial"
    E que o relógio já avançou 15 segundos
    E que a redatora já alterou o título para "Título revisado" e o corpo para "Texto revisado"
    Quando o relógio avança 15 segundos
    Então a quantidade de versões salvas deve ser 1
    E a última versão deve conter o título "Título revisado" e o corpo "Texto revisado"

  @limite @excecao
  Esquema do Cenário: Respeitar o intervalo do salvamento automático
    Dado que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Novidades da Vértice"
    Quando o relógio avança <segundos> segundos
    Então a quantidade de versões salvas deve ser <quantidade>

    Exemplos:
      | segundos | quantidade |
      | 29       | 0          |
      | 30       | 1          |
      | 31       | 1          |
