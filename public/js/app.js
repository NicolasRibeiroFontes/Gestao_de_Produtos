var nicolasfontes = angular.module('gestaodeprodutos',[]);

nicolasfontes.controller('produtos', function($scope,$http){

    //mudança de div's
    $scope.divAlert = false;
    $scope.divCadastro = false;
    $scope.mudarDivCadastro = function(){
        $scope.divCadastro = !$scope.divCadastro;
    }

    //gestao do produto
    $scope.listaProdutos = [];
    $scope.lista10Produtos = [];
    $scope.respostaFormulario = '';
    $scope.mensagemListaProdutos = '';
    $scope.mensagemAlert = 'Olá Nicolas';
    $scope.produto = {
        nome:'',
        categoria:'',
        valor:'',
        fornecedor:'',
        descricao:'',
        estoque:''
    };
    $scope.cadastrarProduto = function(){
        if (($scope.produto.nome==='')||($scope.produto.valor==='')){
            $scope.respostaFormulario = 'Campo Nome e Valor são obrigatórios!';
        }else{
            var cat = document.getElementById('categoria').value;
            var forn = document.getElementById('fornecedor').value;
            $scope.produto.categoria = cat;
            $scope.produto.fornecedor = forn
            $http.post('/cadastrarProduto',$scope.produto)
                .success(function(resposta){
                    var lista = [];
                    $scope.respostaFormulario = resposta.resposta;
                    if (resposta.status){
                        $scope.listaProdutos.push(resposta.objeto);
                        lista.push(resposta.objeto);
                        $scope.lista10Produtos.forEach(function(item){
                            if (lista.length<10){
                                lista.push(item);
                            }
                        });

                        $scope.lista10Produtos = lista;
                    }
                })
        }
    };
    $scope.listarProdutos = function(){
        $http.get('/listarProdutos')
            .success(function(resposta){
                if (resposta.length==0){
                    $scope.mensagemListaProdutos = 'Não há produtos cadastrados';
                }else{
                    for(var i=resposta.length-1;$scope.lista10Produtos.length<10;i--){
                        $scope.lista10Produtos.push(resposta[i]);
                        if (i==0){
                            break;
                        }
                    }
                    $scope.listaProdutos = resposta.sort(function (a, b) {
                        return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
                    });
                    //Colocar lista10Produtos aqui. Ordem decrescente da lista e pegar apenas 10;
                }
            })
    };
    $scope.editarProduto = function(){
        if (($scope.produto.nome==='')||($scope.produto.valor==='')){
            $scope.respostaFormulario = 'Campo Nome e Valor são obrigatórios!';
        }else{
            $http.post('/editarProduto',$scope.produto)
                .success(function(resposta){
                    $scope.respostaFormulario = resposta.resposta;
                    if (resposta.status){
                        location.reload();
                        //colocar alert bootstrap aqui!;
                    }
                })
        }
    };
    $scope.excluirProduto = function(prod){
        $http.get('/excluirProduto/'+prod+_id)
            .success(function(resposta){
                location.reload();
                //colocar alert bootstrap aqui!
            })
    };
    $scope.enviarProdutoFormulario = function(prod){
        $scope.produto = prod;
    };
    $scope.fecharAlert = function(){
        $scope.divAlert = false;
    }

    //gestao de estoque
    $scope.estoque = {
        produto:'',
        movimentacao:'',
        quantidade:0
    };
    $scope.respostaEstoque = '';
    $scope.editarEstoque = function(){
        $scope.estoque.produto = document.getElementById('produto').value;
        $scope.estoque.movimentacao = document.getElementById('movimentacao').value;
        if (($scope.estoque.produto=='? undefined:undefined ?')||($scope.estoque.movimentacao=='')||($scope.estoque.quantidade==0)||($scope.estoque.quantidade=='')){
            $scope.respostaEstoque = 'Todos campos são obrigatórios';
        }else{
            $http.post('/editarEstoque',$scope.estoque)
                .success(function(resposta){
                    if (resposta.status){
                        location.reload();
                    }else{
                        $scope.respostaEstoque = resposta.resposta;
                    }
                })
        }
    }
});

nicolasfontes.controller('categorias', function($scope,$http){

    $scope.respostaCategoria = '';
    $scope.categorias = [];
    $scope.categoria = {
        nome:''
    };

    $scope.cadastrarCategoria = function(){
        if ($scope.categoria.nome===''){
            $scope.respostaCategoria = 'Digite o nome da categoria';
        }else{
            $http.post('/cadastrarCategoria',$scope.categoria)
                .success(function(resposta){
                    $scope.respostaCategoria = resposta.resposta;
                    if (resposta.status){
                        location.reload();
                    }
                })
        }
    };

    $scope.listarCategorias = function(){
        $http.get('/listarCategorias')
            .success(function(resposta){
                $scope.categorias = resposta.sort(function (a, b) {
                    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
                });
            })
    };

});

nicolasfontes.controller('fornecedores', function($scope,$http){

    $scope.respostaFornecedor = '';
    $scope.fornecedores = [];
    $scope.fornecedor = {
        nome:''
    };

    $scope.cadastrarFornecedor = function(){
        if ($scope.fornecedor.nome===''){
            $scope.respostaFornecedor = 'Digite o nome da categoria';
        }else{
            $http.post('/cadastrarFornecedor',$scope.fornecedor)
                .success(function(resposta){
                    $scope.respostaFornecedor = resposta.resposta;
                    if (resposta.status){
                        location.reload();
                    }
                })
        }
    };

    $scope.listarFornecedores = function(){
        $http.get('/listarFornecedores')
            .success(function(resposta){
                $scope.fornecedores = resposta.sort(function (a, b) {
                    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
                });
            })
    };

});