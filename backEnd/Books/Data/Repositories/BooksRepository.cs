using BooksLibrary.Abstract;
using BooksLibrary.Models;
using BooksLibrary.Models.Dtos;

namespace Books.Data.Repositories
{
    public class BooksRepository : IBooks
    {
        private readonly AppDBContext _dbContext;
        private static List<BooksModel> _books;

        public BooksRepository(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<BooksModel> CreateBook(BooksModel model)
        {
            var book = _dbContext.Books.FirstOrDefault(i => i.Title.ToLower() == model.Title.ToLower());
            if (book != null)
            {
                return null;
            }

            var year = model.DateOfPublication.Year;
            var month = model.DateOfPublication.Month;
            var day = model.DateOfPublication.Day;
            var date = new DateTime(year / month / day);

            book = new BooksModel
            {
                Title = model.Title,
                Author = model.Author,
                DateOfPublication = date
            };

            _books.Add(book);
            _dbContext.Add(book);
            _dbContext.SaveChanges();
            return _books;
        }

        public List<BooksModel> BuyBook(int id)
        {
            var book = _books.FirstOrDefault(i => i.Id == id);
            if (book == null)
            {
                return null;
            }

            _books.Remove(book);
            return _books;
        }

        public List<BooksModel> SearchBooks(SearchParametersDto dto)
        {
            var books = new List<BooksModel>();
            switch (dto.FieldName)
            {
                case "Id":
                    var book = _books.FirstOrDefault(i => i.Id == int.Parse(dto.Parameter));
                    if (book == null)
                    {
                        return null;
                    }

                    books.Add(book);
                    break;
                case "Author":
                    books = _books.Where(i => i.Author.Contains(dto.Parameter, StringComparison.OrdinalIgnoreCase)).ToList();
                    break;
                case "Title":
                    books = _books.Where(i => i.Title.Contains(dto.Parameter, StringComparison.OrdinalIgnoreCase)).ToList();
                    break;
                case "Date Of Publication":
                    var value = dto.Parameter.Length > 4 ? DateTime.Parse(dto.Parameter.Replace("/", ".")) : new DateTime(int.Parse(dto.Parameter), 1, 1);
                    books = _books.Where(i => i.DateOfPublication.Year == value.Year).ToList();
                    break;
                default:
                    break;
            }

            return books;
        }

        public List<BooksModel> SortBooks(SortParametersDto dto)
        {
            var books = new List<BooksModel>();
            switch (dto.FieldName)
            {
                case "Id":
                    books = SortById(dto.SortType);
                    break;
                case "Author":
                    books = SortByAuthor(dto.SortType);
                    break;
                case "Title":
                    books = SortByTitle(dto.SortType);
                    break;
                case "Date Of Publication":
                    books = SortByDateOfPublication(dto.SortType);
                    break;
                default:
                    break;
            }

            return books;
        }

        private List<BooksModel> SortById(string type)
        {
            var books = new List<BooksModel>();
            if (type.ToLower() == "down")
            {
                books = _books.OrderByDescending(i => i.Id).ToList();
                return books;
            }

            books = _books.OrderBy(i => i.Id).ToList();
            return books;
        }
        private List<BooksModel> SortByAuthor(string type)
        {
            var books = new List<BooksModel>();
            if (type.ToLower() == "down")
            {
                books = _books.OrderByDescending(i => i.Author).ToList();
                return books;
            }

            books = _books.OrderBy(i => i.Author).ToList();
            return books;
        }

        private List<BooksModel> SortByTitle(string type)
        {
            var books = new List<BooksModel>();
            if (type.ToLower() == "down")
            {
                books = _books.OrderByDescending(i => i.Title).ToList();
                return books;
            }

            books = _books.OrderBy(i => i.Title).ToList();
            return books;
        }

        private List<BooksModel> SortByDateOfPublication(string type)
        {
            var books = new List<BooksModel>();
            if (type.ToLower() == "down")
            {
                books = _books.OrderByDescending(i => i.DateOfPublication).ToList();
                return books;
            }

            books = _books.OrderBy(i => i.DateOfPublication).ToList();
            return books;
        }

        public List<BooksModel> GetBooks()
        {
            
            _books = _dbContext.Books.ToList();
            return _books;
        }
    }
}
