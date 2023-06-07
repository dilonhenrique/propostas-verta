Em desenvolvimento...

# Gerenciador de propostas comerciais Vertá
_v2_

## Features
- Criação de propostas com: escopo, custos fixos e configurações financeiras;
- Cálculo automático de hora técnica, impostos, custos fixos, variáveis e valor final da proposta;
- Versionamento e clonagem de propostas;
- Exportação de propostas para pdf;
- Assinatura digital das propostas com conexão a Api dos sistemas internos da empresa;
- Mudança de configurações padrão para novas propostas criadas;
- Api lambda para conexão com banco de dados.

## Linguagens e Frameworks
- Javascript
- Reactjs
- Nextjs
- Sass

## Telas e funções
Cada uma das telas tem suas próprias funcionalidades:

### Lista de propostas
_Lista todas as propostas salvas no banco dados, agrupando-as por versão. Aqui é possível alterar o status da proposta, bem como ordenar, filtrar e buscar palavras-chave. Também é possível acessar ações rápidas para cada proposta como Versionar, Clonar, Assinar e Excluir._
| Desktop | Mobile |
| ------- | ------ |
| <img alt="Lista de propostas no desktop" src="https://iili.io/H4GylKx.png" style="display:inline-block;height: 300px" /> | <img alt="Lista de propostas no mobile" src="https://iili.io/H4Gy1SV.png" style="display:inline-block;height: 300px" /> |

### Edição da proposta
_Clicando em uma determinada proposta, é possível editá-la: escopo do projeto (definindo as etapas, com tempo e quantidade de pessoas trabalhando em cada), custos fixos do projeto e configurações financeiras (como desconto por pagamento à vista, quantidade máxima de parcelas, imposto, custo de boleto, etc). As informações básicas como nome da marca, cliente, nome do projeto também estão disponíveis._
<img alt="Edição de propostas no desktop" src="https://iili.io/H4Gy0cQ.png" style="display:inline-block;height: 400px" />

### Assinatura da proposta
_Quando o cliente recebe a proposta, ele tem a possibilidade de assiná-la, aprovodando-a em nosso sistema. O sistema de assinatura envolve 3 etapas: Pagamento (escolha forma de pagamento à vista ou parcelado e data de vencimento), Cadastro (vinculado ao sistema Asaas de cobrança) e Contrato (conferência e aceite do contrato). Ao assinar, o sistema seta o status da proposta, gera as faturas e Notas fiscais no Asaas, cria as tarefas no Clickup e envia e-mail de notificação para o setor financeiro da Vertá._
<img alt="Assinatura de propostas no desktop" src="https://iili.io/H4GyaPj.png" style="display:inline-block;height: 400px" />
