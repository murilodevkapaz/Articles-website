module.exports = app=>{
    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)


    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/categories')
        .get(app.api.category.get)
        .post(app.api.category.save)

    //cuidado! a rota categories/tree tem de ser declarada antes da :id, senão o express entende que tree é um parametro
    
    app.route('/categories/tree')
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)
}

//com consign usa-se essa estrutura app.<pasta>.<arquivo>.<metodo>