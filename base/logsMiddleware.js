const HandleDatabaseLogs = (req, res, next) => {
    const time = new Date()
    const url = req.url
    const queries = req.query
    const params = req.params
    /**
     * const filtros = {
     *  limits: 5, 
     *  order_by: id_DESC, 
     *  page: 1
     * }
     * 
     * Object.entries(filtros) ==>  [limits, 5, order_by, id_DESC, page, 1]
     */

    console.log(
        `
        Hola Admin el día ${time} se ejecutó una consulta al servidor.\n

        Los datos son: \n
        URL:  --> ${url}\n
        Queries: --> ${Object.entries(queries)}\n
        Params: --> ${Object.entries(params)}\n 

        Saludos 👏👏;
        `
    )

    next();

}




module.exports = HandleDatabaseLogs


