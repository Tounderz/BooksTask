using BooksLibrary.Abstract;
using BooksLibrary.Const;
using BooksLibrary.Models;
using BooksLibrary.Models.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Books.Controllers
{
    [Route("books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBooks _books;
        public BooksController(IBooks books)
        {
            _books = books;
        }

        [HttpGet("list")]
        public IActionResult GetBooks()
        {
            var books = _books.GetBooks();
            if (books == null || books.Count == 0)
            {
                return BadRequest();
            }

            var fieldNames = ConstParameters.FieldName;

            return Ok( new { fieldNames = fieldNames, books = books });
        }

        [HttpPost("create")]
        public IActionResult CreateBook(BooksModel model)
        {
            var books = _books.CreateBook(model);
            if (books == null)
            {
                return BadRequest(new { message = "There is already a book with this title!" });
            }

            return Ok(new { books = books });
        }

        [HttpPost("sort")]
        public IActionResult SortBooks(SortParametersDto dto)
        {
            var sort = _books.SortBooks(dto);
            if (sort == null || sort.Count == 0)
            {
                return BadRequest();
            }

            return Ok(new {books = sort });
        }

        [HttpPost("search")]
        public IActionResult SearchBooks(SearchParametersDto dto)
        {
            var books = _books.SearchBooks(dto);
            if (books == null || books.Count == 0)
            {
                return BadRequest( new { message = "Nothing was found according to the specified criteria!" });
            }

            return Ok(new { books = books });
        }

        [HttpGet("buy")]
        public IActionResult BuyBook(int id)
        {
            var books = _books.BuyBook(id);
            if (books == null || books.Count == 0)
            {
                return BadRequest();
            }

            return Ok(new { books = books });
        }
    }
}
