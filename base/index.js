const express = require('express')
const { obtenerMedicamentos, obtenerPersonal, obtenerMedicamentosPorFiltros, obtenerPersonalPorFiltros } = require('./consultas')



const app = express()
app.listen(3000, console.log('Server ON'))



app.get('/medicamentos', async (req, res) => {
  const limits = req.query

  const medicamentos = await obtenerMedicamentos(limits)

  res.json(medicamentos)
})

app.get('/personal', async (req, res) => {
  const limits = req.query

  const personal = await obtenerPersonal(limits)

  res.json(personal)
})

app.get('/medicamentos/filtros', async (req, res) => {
  const queryStrings = req.query
  const medicamentos = await obtenerMedicamentosPorFiltros(queryStrings)
  res.json(medicamentos)
})

app.get('/personal/filtros', async (req, res) => {
  const queryStrings = req.query
  const personal = await obtenerPersonalPorFiltros(queryStrings)
  res.json(personal)
})



