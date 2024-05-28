const { Pool } = require("pg");
const format = require('pg-format');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "12345",
    database: "farmacia",
    port: 5432,
    allowExitOnIdle: true
});


// const obtenerMedicamentos = async ({ limits = 10 }) => {
//     let consulta = "SELECT * FROM medicamentos LIMIT $1"
//     const { rows: medicamentos } = await pool.query(consulta,
//         [limits])
//     return medicamentos
// }


const obtenerMedicamentos = async ({ limits = 10, order_by = "id_ASC", page = 0 }) => {

    const [campo, direccion] = order_by.split("_")
    const offset = page * limits

    const formattedQuery = format(
        `SELECT * FROM medicamentos order by %s %s LIMIT %s OFFSET %s`,
        campo,
        direccion,
        limits,
        offset
    );

    const { rows: medicamentos } = await pool.query(formattedQuery)
    return medicamentos
}

// const obtenerPersonal = async ({ limits = 9 }) => {
//     let consulta = "SELECT * FROM personal LIMIT $1"
//     const { rows: personal } = await pool.query(consulta,
//         [limits])
//     return personal
// }

const obtenerPersonal = async ({ limits = 9, order_by = "id_ASC", page = 0 }) => {

    const [campo, direccion] = order_by.split("_")
    const offset = page * limits

    const formattedQuery = format(
        `SELECT * FROM personal order by %s %s LIMIT %s OFFSET %s`,
        campo,
        direccion,
        limits,
        offset
    );

    const { rows: [{ count }] } = await pool.query('SELECT count(*) FROM personal;');
    const totalPages = Math.floor(count / limits)


    const { rows: personal } = await pool.query(formattedQuery)
    return {
        personal,
        pageCount: totalPages
    }
}



const obtenerMedicamentosPorFiltros = async ({ stock_min, precio_max }) => {
    let filtros = []
    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (stock_min) filtros.push(`stock >= ${stock_min}`)
    let consulta = "SELECT * FROM medicamentos"
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ")

        consulta += ` WHERE ${filtros}`
    }
    const { rows: medicamentos } = await pool.query(consulta)
    return medicamentos
}


const obtenerPersonalPorFiltros = async ({ salario_min, salario_max, rol }) => {
    let filtros = []
    if (salario_max) filtros.push(`salario <= ${salario_max}`)
    if (salario_min) filtros.push(`salario >= ${salario_min}`)
    if (rol) filtros.push(`rol ILIKE '${rol}'`)


    let consulta = "SELECT * FROM personal"
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ")

        consulta += ` WHERE ${filtros}`
    }
    console.log(consulta)
    const { rows: personal } = await pool.query(consulta)
    return personal
}

module.exports = { obtenerMedicamentos, obtenerPersonal, obtenerMedicamentosPorFiltros, obtenerPersonalPorFiltros }