# NewsFlow — histórias de usuário (US01–US04)

**Dupla:** Bruna Furtado e Izadora Galarza.

**Situação:** US01–US04 implementadas e validadas com `npm test` em 05/11/2026.

Enunciado: exercicio-newsflow.pdf (fornecido à parte; não incluído no repositório). Capítulos 02–04 e 07; o recorte desta suíte organiza quatro histórias.  
**Escopo implementado:** rascunho, histórico e restauração de versões (RN01); submissão e decisão da revisão editorial (parte da RN02). Os critérios abaixo correspondem às quatro [features](../features/). Evidências de Cucumber.js: [`../relatorios/execucao.txt`](../relatorios/execucao.txt), [`../relatorios/cucumber-report.json`](../relatorios/cucumber-report.json) e [`../relatorios/cucumber-report.html`](../relatorios/cucumber-report.html): **23 cenários e 149 passos aprovados**.

## US01 — Criar e salvar rascunho

**Como** redatora que inicia uma edição, **quero** criar um rascunho que seja salvo automaticamente, **para** não perder o conteúdo que estou escrevendo.  
**Prioridade sugerida:** Alta — a perda do trabalho interrompe a preparação da edição.

**Regra coberta:** RN01.  
**Cenários implementados:** [`../features/us01-rascunho.feature`](../features/us01-rascunho.feature) (7 casos executáveis; US01-CA01–CA04).

**Critérios de aceitação**

- **US01-CA01:** Ao criar uma edição, ela fica em `rascunho` e registra a autora.
- **US01-CA02:** Antes do primeiro ciclo de 30 segundos desde a criação, nenhum salvamento automático é registrado.
- **US01-CA03:** Ao completar o primeiro ciclo de 30 segundos, o conteúdo corrente é salvo automaticamente como a primeira versão.
- **US01-CA04:** Após uma edição do texto, o próximo ciclo periódico de 30 segundos registra o conteúdo atualizado em uma nova versão, sem reiniciar a contagem por inatividade.

## US02 — Controlar versões da edição

**Como** autora que acompanha o histórico de uma edição, **quero** que os salvamentos gerem versões numeradas e limitadas, **para** localizar alterações recentes sem perder a sequência do trabalho.  
**Prioridade sugerida:** Alta — o limite e a identificação correta são pré-requisitos para recuperar conteúdo recente.

**Regra coberta:** RN01.  
**Cenários implementados:** [`../features/us02-versoes.feature`](../features/us02-versoes.feature) (6 casos executáveis; US02-CA01–CA04).

**Critérios de aceitação**

- **US02-CA01:** Cada salvamento automático recebe número inteiro crescente, sem reutilizar números após a remoção de versões antigas.
- **US02-CA02:** Uma versão conserva a fotografia do título e do corpo daquele salvamento mesmo depois que o rascunho muda.
- **US02-CA03:** Com até 20 salvamentos, todas as versões permanecem no histórico.
- **US02-CA04:** No 21º salvamento, somente as versões 2 a 21 permanecem; a versão 1 deixa o histórico.

## US03 — Restaurar uma versão mantida

**Como** redatora que precisa desfazer uma alteração, **quero** restaurar uma versão anterior ainda disponível, **para** recuperar o conteúdo útil sem destruir mudanças posteriores.  
**Prioridade sugerida:** Média — depende de histórico íntegro e resolve a recuperação de trabalho já salvo.

**Regra coberta:** RN01.  
**Cenários implementados:** [`../features/us03-restauracao.feature`](../features/us03-restauracao.feature) (4 casos executáveis; US03-CA01–CA03).

**Critérios de aceitação**

- **US03-CA01:** Restaurar uma versão mantida repõe seu título e corpo como conteúdo corrente.
- **US03-CA02:** A restauração preserva todas as versões posteriores e não cria uma nova versão imediatamente; o próximo ciclo de salvamento recebe o próximo número.
- **US03-CA03:** Tentar restaurar uma versão que saiu das últimas 20 informa indisponibilidade e não altera conteúdo nem histórico.

## US04 — Realizar revisão editorial

**Como** revisor editorial diferente da autora, **quero** aprovar ou devolver uma edição com justificativa, **para** assegurar uma decisão editorial independente e permitir correções rastreáveis.  
**Prioridade sugerida:** Alta — a aprovação independente é condição da RN02 para que o conteúdo possa seguir no fluxo.

**Regra coberta:** RN02, somente submissão e decisão editorial; agendar/enviar e seu bloqueio sem aprovação não são implementados neste recorte.  
**Cenários implementados:** [`../features/us04-revisao.feature`](../features/us04-revisao.feature) (6 casos executáveis; US04-CA01–CA05).

**Critérios de aceitação**

- **US04-CA01:** Submeter um rascunho à revisão muda o estado para `em_revisao`.
- **US04-CA02:** Um revisor diferente da autora aprova a edição em revisão, que passa a `aprovada` e registra quem aprovou.
- **US04-CA03:** A própria autora não pode aprovar sua edição mesmo quando tem papel de revisora; a tentativa mantém `em_revisao` e nenhuma aprovação.
- **US04-CA04:** A reprovação com comentário não vazio devolve a edição ao rascunho e registra o comentário.
- **US04-CA05:** A reprovação sem comentário significativo (vazio ou só espaços) é recusada; estado e comentário anterior não mudam.

## Regras aplicadas neste recorte

| Regra / origem | Comportamento e exceção cobertos | Componentes e critérios | Cobertura |
| --- | --- | --- | --- |
| **RN01**, quadro de regras do PDF | Salvar o rascunho a cada 30 s; numerar versões e manter as 20 mais recentes; recuperar versões disponíveis sem eliminar posteriores. Antes de 30 s não há salvamento; versão descartada não pode ser restaurada. | [`../src/newsflow.js`](../src/newsflow.js), [`../features/us01-rascunho.feature`](../features/us01-rascunho.feature)–[`../features/us03-restauracao.feature`](../features/us03-restauracao.feature); US01-CA01–CA04, US02-CA01–CA04, US03-CA01–CA03. | `delivered` no fluxo de rascunho testado; outros estados de restauração não especificados/validados. |
| **RN02**, quadro de regras do PDF | Submeter à revisão e registrar decisão: revisor distinto aprova, própria autora não aprova; reprovação exige comentário não vazio. O bloqueio de agendamento/envio sem aprovação fica fora deste recorte. | [`../src/newsflow.js`](../src/newsflow.js), [`../features/us04-revisao.feature`](../features/us04-revisao.feature); US04-CA01–CA05. | **Parcial**: decisão editorial entregue; agendamento/envio fora de escopo. |

## Notas de rastreabilidade e limites

- RN01 no quadro de regras do PDF exige salvamento **a cada 30 segundos**. O modelo de história do mesmo PDF menciona “30 segundos de inatividade”; a usuária confirmou para este recorte **ciclos periódicos de 30 segundos**, não debounce nem contagem reiniciada por inatividade. A feature US01 testa a fronteira 29/30/31 segundos e uma edição intermediária antes do ciclo.
- O PDF não restringe restauração ao estado de rascunho. [`../src/newsflow.js`](../src/newsflow.js) permite restaurar apenas nesse estado, e as features cobrem restauração de rascunhos. A restauração em outros estados requer definição de produto antes de integrar os critérios de aceite.
- RN02 também exige aprovação para agendar ou enviar. Esta suíte cobre a decisão editorial, não o bloqueio de disparo. RN03–RN08, autenticação real, persistência externa, interface e envio efetivo ficam fora deste recorte didático.
- As três primeiras histórias atendem à redatora/autora — iniciar sem perder texto, consultar o histórico e recuperar conteúdo. US04 atende ao revisor editorial.
- Consulte o [plano de cobertura](../tasks/plan.md) e a [lista de verificação](../tasks/todo.md) para a relação entre histórias, critérios e relatórios.
