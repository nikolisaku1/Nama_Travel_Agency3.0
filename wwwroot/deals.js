document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const destinationName = card.querySelector(".card-title").textContent;

        // save selected deal
        localStorage.setItem("selectedDeal", destinationName);

        // redirect to dashboard
        window.location.href = "dashboard.html";
    });
});