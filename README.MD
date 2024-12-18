# House Price Prediction API

API para previsão de preços de casas usando Machine Learning.

## Estrutura do Projeto
```
projeto/
├── server.js         # Servidor Express
├── database.js       # Configuração do banco de dados
├── predict.py        # Modelo de ML para previsões
├── train_model.py    # Script para treinar o modelo
├── data/            
│   └── housing.csv   # Dataset
└── models/           # Pasta para modelos salvos
```

## Instalação

1. Clone o repositório
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd [NOME_DO_REPOSITORIO]
```

2. Instale as dependências
```bash
npm install
pip install -r requirements.txt
```

3. Treine o modelo
```bash
python train_model.py
```

4. Inicie o servidor
```bash
node server.js
```

## Endpoints

### GET /houses
Retorna todos os dados de casas do banco.

### POST /predict
Faz uma previsão de preço baseado nas características da casa.

Exemplo de body:
```json
{
    "area": 7420,
    "bedrooms": 4,
    "bathrooms": 2,
    "stories": 3,
    "mainroad": 1,
    "guestroom": 0,
    "basement": 0,
    "hotwaterheating": 0,
    "airconditioning": 1,
    "parking": 2,
    "prefarea": 1,
    "furnishingstatus": 1
}
```

## Tecnologias Utilizadas
- Node.js
- Express
- SQLite
- Python
- scikit-learn