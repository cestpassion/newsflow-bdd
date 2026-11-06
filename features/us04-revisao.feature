# language: pt
@US04 @RN02 @parcial
Funcionalidade: Avaliar a edição na revisão editorial
  Como revisor editorial diferente da autora
  Quero aprovar ou devolver uma edição com justificativa
  Para assegurar uma decisão editorial independente e permitir correções rastreáveis

  Contexto:
    Dado que existe uma edição da autora "Ana" com título "News de novembro" e corpo "Novidades da Vértice"

  @feliz
  Cenário: Submeter um rascunho à revisão
    Quando a redatora submete a edição à revisão
    Então a edição deve estar no estado "em_revisao"
    E a edição não deve possuir aprovação registrada

  @feliz @smoke
  Cenário: Aprovar a edição por um revisor diferente da autora
    Dado que "Bruno" atua como "revisor"
    E que a edição foi submetida à revisão
    Quando o revisor aprova a edição
    Então a edição deve estar no estado "aprovada"
    E a aprovação deve identificar o revisor "Bruno"
    E a mensagem deve ser "Edição aprovada"

  @excecao
  Cenário: Bloquear a aprovação pelo próprio autor mesmo que tenha papel de revisor
    Dado que "Ana" atua como "revisor"
    E que a edição foi submetida à revisão
    Quando o revisor aprova a edição
    Então a mensagem deve ser "O autor não pode aprovar a própria edição"
    E a edição deve estar no estado "em_revisao"
    E a edição não deve possuir aprovação

  @alternativo
  Cenário: Devolver a edição ao rascunho com comentário de reprovação
    Dado que "Bruno" atua como "revisor"
    E que a edição foi submetida à revisão
    Quando o revisor reprova a edição com o comentário "Corrigir a data do evento"
    Então a edição deve estar no estado "rascunho"
    E o comentário de reprovação deve ser "Corrigir a data do evento"
    E a mensagem deve ser "Edição devolvida ao rascunho"

  @excecao
  Cenário: Bloquear a reprovação sem comentário
    Dado que "Bruno" atua como "revisor"
    E que a edição foi submetida à revisão
    Quando o revisor reprova a edição com o comentário "   "
    Então a mensagem deve ser "Comentário de reprovação obrigatório"
    E a edição deve estar no estado "em_revisao"
    E a edição não deve possuir comentário de reprovação

  @excecao
  Cenário: Rejeitar comentário vazio sem apagar uma justificativa anterior
    Dado que "Bruno" atua como "revisor"
    E que a edição foi devolvida com o comentário "Corrigir a data do evento" e submetida novamente
    Quando o revisor reprova a edição com o comentário ""
    Então a mensagem deve ser "Comentário de reprovação obrigatório"
    E a edição deve estar no estado "em_revisao"
    E o comentário de reprovação deve ser "Corrigir a data do evento"
    E a revisão deve ser recusada
