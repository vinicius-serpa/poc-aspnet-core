using CasaDoCodigo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasaDoCodigo.Repositories
{
    public class ProdutoRepository : BaseRepository<Produto>, IProdutoRepository
    {
        
        public ProdutoRepository(ApplicationContext contexto) : base(contexto)
        {

        }

        public List<Produto> GetProdutos()
        {
            return dbSet.ToList();
        }

        public void SaveProdutos(List<Livro> livros)
        {
            foreach (var livro in livros)
            {
                // add data in memory only if not exists
                if (!dbSet.Where(p => p.Codigo == livro.Codigo).Any())
                {                    
                    dbSet.Add(new Produto(livro.Codigo, livro.Nome, livro.Preco));
                }
            }

            // save memory data into database
            contexto.SaveChanges();
        }
    }

    public class Livro
    {
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public Decimal Preco { get; set; }
    }
}
