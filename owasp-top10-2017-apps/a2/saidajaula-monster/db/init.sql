CREATE TABLE tb_users(
    Id VARCHAR(36) NOT NULL,
    Login VARCHAR(20) NOT NULL,
    Hash_Senha VARCHAR(100) NOT NULL,
    Dt_Cookie DATE,
    Permissao INT NOT NULL,
    PRIMARY KEY(Id)
);

INSERT INTO tb_users (Id, Login, Hash_Senha, Dt_Cookie, Permissao) VALUES ('99016fcb-b4f7-48fe-9fed-5729265ce393', 'admin', '245a4cba5219e282178d46263a7e7cce1ed64006dc93aae9819645c6f6bc5c9d', NULL, 1);
