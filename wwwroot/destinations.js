const searchInput = document.getElementById("searchDest");
const destinationCards = document.querySelectorAll(".cards .card");

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();

    destinationCards.forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const country = card.querySelector(".card-value").textContent.toLowerCase();

        if (title.includes(query) || country.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});