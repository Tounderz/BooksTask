using Books.Data;
using Books.Data.Repositories;
using BooksLibrary.Abstract;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDBContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("Default")
    ));

builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddScoped<IBooks, BooksRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(options => options
   .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
   .AllowAnyHeader()
   .AllowAnyMethod()
);

/*using (var scope = app.ApplicationServices.CreateScope())
{
    AppDBContext context = scope.ServiceProvider.GetRequiredService<AppDBContext>();
    DBObjects.Initial(context);
}*/

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();