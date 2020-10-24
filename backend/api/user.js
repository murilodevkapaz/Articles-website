const bcrypt = require('bcrypt-nodejs');

module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validator;

    const encryptPassword = password =>{

        //gera "salt" que diferencia a senha (um "tempero" para incrementar a senha)
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    const save = async(req, res)=>{
        const user = {...req.body};
        if(req.params.id) user.id = req.params.id;

        try{
            existsOrError(user.name, "Nome não informado");
            existsOrError(user.email, "E-mail não informado");
            existsOrError(user.password, "Senha não informada");
            existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
            equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

            const userFromDB = await app.db('users')
                .where({email: user.email}).first();
            if(!user.id){
                //não deixa cadastrar um usuário já existente
                notExistsOrError(userFromDB, "Usuário já cadastrado");
            }
        }
        catch(msg){
            //erro do lado do cliente (erro 400) caso ele tenha feito alguma coisa errada
            //erro 500, quando o erro ocorre do lado do servidor
            return res.status(400).send(msg);
        }

        user.password = encryptPassword(user.password);
        delete user.confirmPassword;

        if(user.id){
            app.db('users')
                .update(user)
                .where({id: user.id})
                .then(_=>res.status(204).send())//204 tudo certo mas não retornou nada
                .catch(err=>res.status(500).send(err))
        }
        else{
            app.db('users')
                .insert(user)
                .then(_=> res.status(204).send())
                .catch(err=> res.status(500).send(err));
        }
    }

    //obtem todos os usuários do sistema
    const get = (req, res)=>{
        app.db('users')
            .select('id', 'name', 'email', 'admin') 
            .then(users=> res.json(users))
            .catch(err=> res.status(500).send(err));
    }

    //obtém por usuário
    const getById = (req, res)=>{
        app.db('users')
            .select('id', 'name', 'email', 'admin') 
            .where({id: req.params.id})
            .first()
            .then(user=> res.json(user))
            .catch(err=> res.status(500).send(err));
    }

    return {save, get, getById}
}