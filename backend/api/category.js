module.exports= app=>{
    const {existsOrError, notExistsOrError} = app.api.validator

    const save = (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }

        if(req.params.id) category.id = req.params.id;

        try{
            existsOrError(category.name, 'Nome não informado');
        }
        catch(msg){
            return res.status(400).send(msg);
        }

        if(category.id){
            app.db('categories')
                .update(category)
                .where({id: category.id})
                .then(_=>res.status(204).send())
                .catch(err=>res.status(500).send(err));
        }
        else{
            app.db('categories')
                .insert(category)
                .then(_=> res.status(204).send())
                .catch(err=>res.status(500).send(err));
        }
    }

    const remove = async(req, res)=>{
        //só pode excluir se as filhas já tiverem sido removidas
        try{
            existsOrError(req.params.id, 'Código da Categoria não informado.');

            //existe subcategoria?
            const subcategory = await app.db('categories')
                .where({parentId: req.params.id})
            notExistsOrError(subcategory, 'Categoria possui subcategorias.');

            const articles = await app.db('articles')
                .where({categoryId: req.params.id})
            notExistsOrError(articles, 'Categoria possui artigos.');

            const rowsDeleted = await app.db('categories')
                .where({id: req.params.id})
                .del()
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send();
        }
        catch(msg){
            res.status(400).send(msg);
        }
    }

    const withPath = categories =>{
        const getParent = (categories, parentId)=>{
            let parent = categories.filter(parent=> parent.id == parentId );
            return parent.length ? parent[0] : null;
        }
        const categoriesWithPath = categories.map(category=>{
            let path = category.name;
            let parent = getParent(categories, category.parentId)

            //até parent igual a null
            while(parent){
                path = `${parent.name} > ${path}`;
                parent = getParent(categories, parent.parentId);
            }

            return {...category, path}
        })

        //ordenar categorias
        categoriesWithPath.sort((a,b)=>{
            if(a.path < b.path) return - 1;
            if(a.path > b.path) return 1;
            return 0;
        })

        return categoriesWithPath
    }

    //retorna a lista de todas as categorias
    const get = (req, res)=>{
        //um tipo de select
        app.db('categories')
            .then(categories=> res.json(withPath(categories)))
            .catch(err=> res.status(500).send(err));
    }

    const getById = (req, res)=>{
        app.db('categories')
            .where({id: req.params.id})
            .first()
            .then(category=> res.json(category))
            .catch(err=>res.status(500).send(err));
    }
    //obs quando se retorna todas as colunas não é necessário o select

    //cria arvore de categorias para apresentar na pagina
    const toTree = (categories, tree)=>{
        if(!tree) tree = categories.filter(c=> !c.parentId);
        tree = tree.map(parentNode=>{
            const isChild = node=>node.parentId == parentNode.id;
            parentNode.children = toTree(categories, categories.filter(isChild));
            return parentNode;
        })
        return tree;
    }

    const getTree = (req, res)=>{
        app.db('categories')
            .then(categories=>res.json(toTree(categories)))
            .catch(err=> res.status(500).send(err));
    }

    return {save, remove, get, getById, getTree};
}