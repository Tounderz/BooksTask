using BooksLibrary.Models;
using BooksLibrary.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BooksLibrary.Abstract
{
    public interface IBooks
    {
        List<BooksModel> GetBooks();
        List<BooksModel> CreateBook(BooksModel model);
        List<BooksModel> BuyBook(int id);
        List<BooksModel> SortBooks(SortParametersDto dto);
        List<BooksModel> SearchBooks(SearchParametersDto dto);
    }
}
