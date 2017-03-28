var fornecedores = [];

exports.cadastrarFornecedor = function(req,res){
    if (req.body.nome===''){
        res.send({status:false,resposta:'Digite o nome do fornecedor'});
    }else{
        fornecedores.push(req.body);
        res.send({status:true,lista:fornecedores});
    }
};

exports.listarFornecedores = function(req,res){
    res.send(fornecedores);
};