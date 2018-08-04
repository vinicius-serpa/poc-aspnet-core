
// class: ECMAScript 6
class Carrinho {

    clickIncremento(btn) {
        let data = this.getData(btn);
        data.Quantidade++;
        this.postQuantidade(data);
    }

    clickDecremento(btn) {
        let data = this.getData(btn);
        data.Quantidade--;
        this.postQuantidade(data);
    }

    getData(elemento) {

        let linhaDoItem = $(elemento).parents('[item-id]'); // busca para cima
        let itemId = linhaDoItem.attr("item-id");
        let novaQtde = $(linhaDoItem).find('input').val(); // busca para baixo

        return {
            Id: itemId,
            Quantidade: novaQtde
        }
    }

    updateQuantidade(input) {
        let data = this.getData(input);        
        this.postQuantidade(data);
    }

    postQuantidade(data) {

        // get generated token from taghelper
        token = $('[name=__RequestVerificationToken]').val();
        let headers = {};
        headers['requestVerificationToken'] = token;

        $.ajax({
            url: '/pedido/updatequantidade',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: headers
        }).done(function (response) {

            let itemPedido = response.itemPedido;
            let carrinhoViewModel = response.carrinhoViewModel;

            let linhaDoItem = $('[item-id=' + itemPedido.id + ']');
            linhaDoItem.find('input').val(itemPedido.quantidade);
            linhaDoItem.find('[subtotal]').html((itemPedido.subtotal).duasCasas());

            $('[numero-itens]').html('Total: ' + carrinhoViewModel.itens.length + ' itens');
            $('[total]').html((carrinhoViewModel.total).duasCasas());

            if (itemPedido.quantidade == 0) {
                linhaDoItem.remove();
            }
        });
    }
}

var carrinho = new Carrinho();

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}