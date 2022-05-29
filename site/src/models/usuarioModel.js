var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, telefone) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (Nome, Telefone, Email, Senha, fkChefe, isEmpregado, dtCriacao, dtAtualizacao) VALUES ('${nome}', '${telefone}', '${email}', '${senha}' , null, 1, now() , now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarFuncionario(nome,email,telefone, senha, chefe) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucao = `
        INSERT INTO Usuario (Nome, Telefone, Email, Senha, fkChefe, isEmpregado, dtCriacao, dtAtualizacao) VALUES ('${nome}', '${telefone}', '${email}', '${senha}' , ${chefe}, 1, now() , now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
var sensor_atual = 0
function cadastrarPrimeiraFazenda(estado, cidade, bairro, rua, numero, cep, user) {
    sensor_atual++
    var fkUsuario = user
    var instrucao = `
    INSERT INTO Fazenda VALUES (${user},${sensor_atual}, ${fkUsuario}, '${estado}', '${cidade}', '${bairro}', '${rua}' , '${numero}','${cep}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarNovaFazenda(user) {
    var fkUsuario = user
        sensor_atual++
        var instrucao = 
        instrucao =`INSERT INTO Fazenda (idFazenda, fkSensor, fkUsuario) VALUES (${user},${sensor_atual}, ${fkUsuario});`
            console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
        }

function obterdadosfuncionario(idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Nome, idUsuario,
                        Email
                    from Usuario
                    where fkChefe = ${idUsuario}`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select Nome, idUsuario,
                        Email
                    from Usuario
                    where fkChefe = ${idUsuario}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function obterdadosfazenda(idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `Select count(fkSensor), Rua, Bairro, Estado
        from Fazenda
         where idFazenda = ${idUsuario} limit 1;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `Select count(fkSensor) as Colmeias, Rua, Bairro, Estado
        from Fazenda
         where idFazenda = ${idUsuario} limit 1;`;
         
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrarSensores(qtd_sensores){
    console.log(qtd_sensores)
    for(i = 0 ; i < qtd_sensores; i++){
    var instrucao = `
    INSERT INTO Sensor VALUES (null, '33.5', '29', '38' ,'32','35');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
} 


module.exports = {
    entrar,
    cadastrar,
    cadastrarFuncionario,
    cadastrarPrimeiraFazenda,
    cadastrarNovaFazenda,
    obterdadosfuncionario,
    obterdadosfazenda,
    cadastrarSensores,
    listar,
};