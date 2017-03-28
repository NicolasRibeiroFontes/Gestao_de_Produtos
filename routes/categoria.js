var categorias = [];

exports.cadastrarCategoria = function(req,res){
    if (req.body.nome===''){
        res.send({status:false,resposta:'Digite o nome da categoria'});
    }else{
        req.body['_id'] = categorias.length;
        categorias.push(req.body);
        res.send({status:true,objeto:req.body,resposta: 'Categoria cadastrada com sucesso!'});
    }
};

exports.listarCategorias = function(req,res){
    res.send(categorias);
};