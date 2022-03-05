const ADMIN = true;

const isAdmin = (res, req, next) => {
    if (ADMIN) {
        next();
    } else {
        res
            .status(401)
            .json({
                error: -1,
                description: `Ruta ${req.path} metodo ${req.method} no autorizda`
            })
    }
};

module.exports = isAdmin;