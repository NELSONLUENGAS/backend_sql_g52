const express = require('express')

const HandleDatabaseLogs = require('./logsMiddleware');

const { obtenerMedicamentos, obtenerPersonal, obtenerMedicamentosPorFiltros, obtenerPersonalPorFiltros } = require('./consultas')



const app = express()
app.listen(3000, console.log('Server ON'))


const OrdenarDatos = (data) => {

  const stockTotal = data.reduce((stock, medicamento) => stock += medicamento.stock, 0)

  const totalMedicamentos = data.length

  const results = data.map(medicamento => ({
    nombre: medicamento.nombre,
    link: `/api/medicamentos/${medicamento.id}`
  }))

  return { totalMedicamentos, stockTotal, results }
}


app.get('/medicamentos', HandleDatabaseLogs, async (req, res) => {
  const limits = req.query

  const medicamentos = await obtenerMedicamentos(limits)

  const medicamentosHATEOS = OrdenarDatos(medicamentos)

  res.json(medicamentosHATEOS)
})

app.get('/personal', HandleDatabaseLogs, async (req, res) => {
  const limits = req.query

  const personal = await obtenerPersonal(limits)


  res.json(personal)
})

app.get('/medicamentos/filtros', HandleDatabaseLogs, async (req, res) => {
  const queryStrings = req.query
  const medicamentos = await obtenerMedicamentosPorFiltros(queryStrings)

  const medicamentosHATEOS = OrdenarDatos(medicamentos)

  res.json(medicamentosHATEOS)
})

app.get('/personal/filtros', HandleDatabaseLogs, async (req, res) => {
  const queryStrings = req.query
  const personal = await obtenerPersonalPorFiltros(queryStrings)

  res.json(personal)
})



