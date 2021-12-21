const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const createPostButton = document.getElementById("create-post");
const postModal = document.getElementById("post-modal");
const overlay = document.getElementById("overlay");
const postModalButton = document.getElementById("post-modal-button");
const likeIcon = document.getElementById("like-icon");
const likesCount = document.getElementById("likes-count");
const likesOrlike = document.getElementById("likes-pronounciation");

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

// remove create post modal and add overlay on clicking post button and the overlay itself
postModalButton.addEventListener("click", () => {
	postModal.classList.remove("active");
	overlay.classList.remove("active");
	createPostButton.classList.remove("active");
});

overlay.addEventListener("click", () => {
	postModal.classList.remove("active");
	overlay.classList.remove("active");
	createPostButton.classList.remove("active");
});

// count likes

let totalLikes = 0;

likeIcon.addEventListener("click", () => {
	totalLikes += 1;
	likesCount.textContent = totalLikes;
	// change pronounciation to likes if it is liked more than once
	if (totalLikes > 1) {
		likesOrlike.textContent = `likes`;
	}
});
