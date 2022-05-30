var database = require("../database/config");

function buscarUltimasMedidas(idDados) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select temperaturaAtual,   
                        dtHora,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_Sensor = ${idDados}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select temperaturaAtual, DATE_FORMAT (dtHora,'%H:%i:%s') as dtHora
                    from Dados
                    where fkSensor = ${idDados} limit 7`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idDados) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        lm35_temperatura as temperaturaAtual,   
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_Sensor 
                        from medida where fk_Sensor = ${idDados} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select temperaturaAtual, DATE_FORMAT (dtHora,'%H:%i:%s') as dtHora
            from Dados
            where fkSensor = ${idDados} 
                    order by idDados desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarinfos(idDados) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select temperaturaAtual,   
                        dtHora,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_Sensor = ${idDados}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select max(temperaturaAtual) as Maxima,
         min(temperaturaAtual) as Minima, 
         round(avg(temperaturaAtual)) as Media from dados where fkSensor = ${idDados}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarinfos
}
