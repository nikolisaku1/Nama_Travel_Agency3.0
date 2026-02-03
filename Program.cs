using Microsoft.EntityFrameworkCore;
using Nama_Travel_Agency3_0.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=travel.db"));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowFrontend", p =>
        p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var dbPath = Path.Combine(builder.Environment.ContentRootPath, "travel.db");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllers();

app.Run();
