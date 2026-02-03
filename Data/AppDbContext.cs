using Microsoft.EntityFrameworkCore;
using Nama_Travel_Agency3_0.Models;

namespace Nama_Travel_Agency3_0.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Reservation> Reservations => Set<Reservation>();
    }
}
