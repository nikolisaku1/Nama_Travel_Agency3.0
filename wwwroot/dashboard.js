// Keep this part: coming from deals page
const selectedDeal = localStorage.getItem("selectedDeal");
if (selectedDeal) {
    document.getElementById("destination").value = selectedDeal;
    localStorage.removeItem("selectedDeal");
}

// DOM elements
const bookingForm = document.getElementById("bookingForm");
const tableBody = document.getElementById("bookingTableBody");

const totalBookingsEl = document.getElementById("totalBookings");
const totalTravelersEl = document.getElementById("totalTravelers");
const lastDestinationEl = document.getElementById("lastDestination");

// Data in memory (comes from DB)
let bookings = [];

// ---------- API HELPERS ----------
async function api(path, options = {}) {
    const res = await fetch(path, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }

    if (res.status === 204) return null;
    return res.json();
}

// ---------- UI RENDER ----------
function updateDashboard() {
    const totalBookings = bookings.length;
    const totalTravelers = bookings.reduce((sum, b) => sum + b.travelers, 0);
    const lastDestination = bookings.length ? bookings[bookings.length - 1].destination : "-";

    totalBookingsEl.textContent = totalBookings;
    totalTravelersEl.textContent = totalTravelers;
    lastDestinationEl.textContent = lastDestination;
}

function loadTable() {
    tableBody.innerHTML = "";

    bookings.forEach(b => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${b.clientName}</td>
      <td>${b.destination}</td>
      <td>${b.travelDate}</td>
      <td>${b.travelers}</td>
      <td><button class="delete-btn" data-id="${b.id}">Delete</button></td>
    `;
        tableBody.appendChild(row);
    });
}

// ---------- LOAD FROM DB ----------
async function loadBookingsFromDb() {
    bookings = await api("/api/reservations"); // GET
    updateDashboard();
    loadTable();
}

// ---------- CREATE (POST) ----------
bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newBooking = {
        clientName: document.getElementById("clientName").value,
        destination: document.getElementById("destination").value,
        travelDate: document.getElementById("travelDate").value, // yyyy-mm-dd
        travelers: Number(document.getElementById("travelers").value)
    };

    try {
        await api("/api/reservations", {
            method: "POST",
            body: JSON.stringify(newBooking)
        });

        bookingForm.reset();
        await loadBookingsFromDb();
    } catch (err) {
        alert("Error saving reservation: " + err.message);
    }
});

// ---------- DELETE ----------
tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;

    const id = btn.dataset.id;

    try {
        await api(`/api/reservations/${id}`, { method: "DELETE" });
        await loadBookingsFromDb();
    } catch (err) {
        alert("Error deleting reservation: " + err.message);
    }
});

// Initial load
loadBookingsFromDb().catch(err => alert("Error loading reservations: " + err.message));
