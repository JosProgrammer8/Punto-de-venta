function errorHandler(err, _req, res, _next) {
    console.error(err.stack)

    return res.status(err.status ?? 500).json({
        status: 'ERR',
        message: err.message ?? 'Internal server error',
        data: null,
    })
}

function notFound(_req, res, _next) {
    return res.status(404).json({
        status: 'ERR',
        message: 'Ruta no encontrada',
        data: null,
    })
}

module.exports = {
    errorHandler,
    notFound,
}
