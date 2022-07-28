using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BooksLibrary.Models
{
    public class BooksModel
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public DateTime DateOfPublication { get; set; }
    }
}
