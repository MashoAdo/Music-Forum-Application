const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");

// show/remove menu on click
menuBtn.addEventListener("click", () => {
	menu.classList.toggle("show");
});
