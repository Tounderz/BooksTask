using BooksLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace Books.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) :
            base(options)
        {
        }

        public DbSet<BooksModel> Books { get; set; }
    }
}
