var produtos = [];
exports.cadastrarProduto = function(req,res){
    if ((req.body.nome=='')||(req.body.valor=='')||(req.body.categoria=='? string: ?')||(req.body.fornecedor=='? string: ?')){
        res.send({status:false,resposta:'Há campos obrigatórios em branco'});
    }else{
        req.body['_id'] = produtos.length;
        req.body['estoque'] = 0;
        produtos.push(req.body);
        res.send({status:true,resposta:'Produto cadastrado com sucesso',objeto:req.body});
    }
};

exports.listarProdutos = function(req,res){
    res.send(produtos);
};

exports.editarProduto = function(req,res){
    produtos.forEach(function(item){
        if(item._id==req.body._id){
            item = req.body;
        }
    })
    res.send({status:true,resposta:'Produto atualizado com sucesso',lista:produtos});
};


exports.excluirProduto = function(req,res){
    var novaLista = [];
    produtos.forEach(function(item){
        if (item._id!=req.params.id){
            novaLista.push(item);
        }
    });
    res.send({status:true,resposta:'Produto excluido com sucesso',lista:produtos});
};

exports.editarEstoque = function(req,res){
    if ((req.body.quantidade=='')||(req.body.quantidade==0)){
        res.send({status:false,resposta:'Valor de Estoque Inválido!'});
    }else {
        produtos.forEach(function (item) {
            if (item._id == req.body.produto) {
                if (req.body.movimentacao == 'Entrada') {
                    item.estoque = req.body.quantidade + item.estoque;
                    res.send({status: true, lista: produtos});
                } else if (req.body.movimentacao == 'Saída') {
                    var estoque = item.estoque - req.body.quantidade;
                    if (estoque <= 0) {
                        res.send({status: false, resposta: 'Estoque não pode ficar negativo'});
                    } else {
                        item.estoque = estoque;
                        res.send({status: true, lista: produtos});
                    }
                } else {
                    res.send({status: false, resposta: 'Movimentação Inválida!'});
                }
            }
        });
    }
};