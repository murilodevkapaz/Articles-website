module.exports = app=>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)


    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)
}

//com consign usa-se essa estrutura app.<pasta>.<arquivo>.<metodo>