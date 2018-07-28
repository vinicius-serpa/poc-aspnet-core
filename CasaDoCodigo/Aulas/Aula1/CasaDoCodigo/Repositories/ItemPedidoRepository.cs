using CasaDoCodigo.Models;
using CasaDoCodigo.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasaDoCodigo.Repositories
{
    public interface IItemPedidoRepository
    {
        ItemPedido GetItemPedido(int id);
    }

    public class ItemPedidoRepository : BaseRepository<ItemPedido>, IItemPedidoRepository
    {
        public ItemPedidoRepository(ApplicationContext contexto) : base(contexto)
        {

        }

        public ItemPedido GetItemPedido(int itemPedidoId)
        {
            return dbSet.Where(ip => ip.Id == itemPedidoId).SingleOrDefault();
        }
    }
}
