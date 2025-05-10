-- Criação da tabela de usuário
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(50) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Criação da tabela de evento
CREATE TABLE IF NOT EXISTS evento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome_evento VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    local VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Criação da tabela de inscrição
CREATE TABLE inscricao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data DATE NOT NULL,
    status VARCHAR(50) NOT NULL, 
    id_usuario UUID NOT NULL,
    id_evento UUID NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_evento) REFERENCES evento(id)
);
