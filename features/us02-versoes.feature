# language: pt
@US02 @RN01
Funcionalidade: Controlar as versões da edição
  Como autora que acompanha o histórico de uma edição
  Quero salvamentos numerados e limitados às 20 versões mais recentes
  Para localizar alterações recentes sem perder a sequência do trabalho

  Contexto:
    Dado que "Ana" atua como "redatora"
    E que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Texto inicial"

  @feliz @smoke
  Cenário: Numerar consecutivamente cada salvamento
    Dado que a edição já recebeu 2 salvamentos automáticos com conteúdos diferentes
    Quando o relógio avança 30 segundos
    Então os números das versões mantidas devem ser "1,2,3"

  @excecao
  Cenário: Não reutilizar números mesmo depois de descartar a primeira versão
    Dado que a edição já recebeu 21 salvamentos automáticos com conteúdos diferentes
    Quando o relógio avança 30 segundos
    Então a quantidade de versões salvas deve ser 20
    E a primeira versão mantida deve ser 3
    E a última versão mantida deve ser 22
    E a versão 22 deve conter o título "Edição 21" e o corpo "Conteúdo 21"

  @limite @excecao
  Esquema do Cenário: Manter somente as 20 versões mais recentes
    Dado que a edição já recebeu <anteriores> salvamentos automáticos com conteúdos diferentes
    Quando o relógio avança 30 segundos
    Então a quantidade de versões salvas deve ser <mantidas>
    E a primeira versão mantida deve ser <primeira>
    E a última versão mantida deve ser <ultima>

    Exemplos:
      | anteriores | mantidas | primeira | ultima |
      | 18         | 19       | 1        | 19     |
      | 19         | 20       | 1        | 20     |
      | 20         | 20       | 2        | 21     |

  @alternativo
  Cenário: Preservar o conteúdo de uma versão ao editar o rascunho
    Dado que o relógio já avançou 30 segundos
    Quando a redatora altera o título para "Título revisado" e o corpo para "Texto revisado"
    Então a versão 1 deve conter o título "News de novembro" e o corpo "Texto inicial"
    E o conteúdo atual deve ter o título "Título revisado" e o corpo "Texto revisado"
