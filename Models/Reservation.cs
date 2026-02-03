using System.ComponentModel.DataAnnotations;

namespace Nama_Travel_Agency3_0.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public string ClientName { get; set; } = "";

        [Required]
        public string Destination { get; set; } = "";

        public DateOnly TravelDate { get; set; }

        public int Travelers { get; set; }
    }
}
