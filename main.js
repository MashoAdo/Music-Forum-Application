const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const createPostButton = document.getElementById("create-post");
const postModal = document.getElementById("post-modal");
const overlay = document.getElementById("overlay");
const postModalButton = document.getElementById("post-modal-button");

// show/remove menu on click
menuBtn.addEventListener("click", () => {
	menu.classList.toggle("show");
});

// add create post modal and add overlay
createPostButton.addEventListener("click", () => {
	postModal.classList.toggle("active");
	overlay.classList.toggle("active");
	createPostButton.classList.toggle("active");
});

// remove create post modal and add overlay
postModalButton.addEventListener("click", () => {
	postModal.classList.remove("active");
	overlay.classList.remove("active");
});
