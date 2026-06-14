# n8n-nodes-api-cmdeb (API CMDEB 2.0 - SEDUC - CE)

Node n8n personalizado (Community Node) para integração e autenticação nativa com a API CMDEB 2.0 (Gestão Presente MEC) - SEDUC CE.

## Principais Funcionalidades

- **Autenticação Nativa Integrada:** O node cuida da geração e injeção do Bearer Token por baixo dos panos a partir de usuário e senha.
- **Múltiplos Ambientes:** Suporte pronto para **Produção** (`api-cmde2.gestaopresente.mec.gov.br`) e **Homologação** (`api-cmde2.hmg.gestaopresente.mec.gov.br`).
- **Endpoints Mapeados:** Interface robusta para o consumo de todos os módulos da v2.0 da API:
  - Avaliação de Desempenho
  - Componentes Curriculares
  - Estudantes (Listagem, Edição e Criação com/sem Turma)
  - Frequência Mensal (Criação, Edição, Listagem e Faltantes)
  - Instituições de Ensino
  - Lotes (Status, Erros, Listagem)
  - Matrículas (Conclusões, Enturmações, Movimentações, Edição)
  - Pé-de-Meia (Elegibilidades, Incentivos)
  - Pessoas (Solicitações de Alterações, Validações Cadastrais)
  - Profissionais (Criação, Edição, Formações, Funções)
  - Termos de Autorização
  - Turmas (Criação, Edição, Componentes Curriculares)

## Estrutura do Projeto

```text
n8n-nodes-api-cmdeb/
├── credentials/
│   ├── ApiCmdeb2.credentials.ts        # Lida com a criação da sessão e tokens
├── nodes/
│   └── Cmdeb2/
│       ├── Cmdeb2.node.ts              # Definição central do Node N8N
│       ├── Services.ts                 # Direcionador de endpoints
│       ├── properties/                 # Definição UI/Campos do node no N8N
│       ├── services/                   # Intermediadores de regras e serviços
│       └── endpoints/                  # Ações HTTP individuais mapeadas da API
└── package.json
```

## Como Instalar e Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Compile o node:**
   ```bash
   npm run build
   ```
3. **Inicie para desenvolvimento contínuo (Watch):**
   ```bash
   npm run dev
   ```

## Como Utilizar no n8n

1. Instale este pacote como um **Community Node** dentro da sua instância do n8n.
2. Na interface do n8n, procure e adicione o node **CMDEB 2.0**.
3. Crie uma nova Credencial (tipo **API CMDEB 2.0**) informando:
   - **Ambiente** (Produção ou Homologação)
   - **Usuário**
   - **Senha**
4. Escolha no painel o Recurso (`Resource`) e a Operação (`Operation`) que deseja executar na API. Preencha os campos obrigatórios e execute seu workflow!

## Tecnologias Usadas

- TypeScript
- Framework SDK N8N (`n8n-workflow`)
- Gulp (para build de ícones)
- Eslint & Prettier

## Autor
Guilherme Nepomuceno de Carvalho - guilhermenepomuceno46@gmail.com