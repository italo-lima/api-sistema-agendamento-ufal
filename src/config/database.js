module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'sistemaufal',
    database: 'agendamento',
    define: {
        timestamps: true,
        underscored: true,   //formato caixa baixa e separado por _
        underscoredAll: true //para as colunas
    }
}