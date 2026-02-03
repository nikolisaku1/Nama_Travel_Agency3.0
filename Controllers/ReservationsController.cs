using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nama_Travel_Agency3_0.Data;
using Nama_Travel_Agency3_0.Models;

namespace Nama_Travel_Agency3_0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ReservationsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetAll()
            => await _db.Reservations.ToListAsync();

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Reservation>> GetOne(int id)
        {
            var r = await _db.Reservations.FindAsync(id);
            return r == null ? NotFound() : Ok(r);
        }

        [HttpPost]
        public async Task<ActionResult<Reservation>> Create(Reservation r)
        {
            _db.Reservations.Add(r);
            await _db.SaveChangesAsync();
            return Ok(r);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, Reservation r)
        {
            if (id != r.Id) return BadRequest("Id mismatch");

            var exists = await _db.Reservations.AnyAsync(x => x.Id == id);
            if (!exists) return NotFound();

            _db.Entry(r).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var r = await _db.Reservations.FindAsync(id);
            if (r == null) return NotFound();

            _db.Reservations.Remove(r);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
