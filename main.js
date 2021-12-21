const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const createPostButton = document.getElementById("create-post");
const postModal = document.getElementById("post-modal");
const overlay = document.getElementById("overlay");
const postModalButton = document.getElementById("post-modal-button");
const likeIcon = document.getElementById("like-icon");
const likesCount = document.getElementById("likes-count");
const likesOrlike = document.getElementById("likes-pronounciation");
const postsContainer = document.getElementById("posts");

console.log(postsContainer);

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

// likeIcon.addEventListener("click", () => {
// 	totalLikes += 1;
// 	likesCount.textContent = totalLikes;
// 	// change pronounciation to likes if it is liked more than once
// 	if (totalLikes > 1) {
// 		likesOrlike.textContent = `likes`;
// 	}
// });

// Fetch posts,comments and photos from api JSON placeholder and insert into index file

async function fetchData() {
	// simultaneously make fetch request
	const response = await Promise.all([
		fetch("https://jsonplaceholder.typicode.com/posts"),
		fetch("https://jsonplaceholder.typicode.com/comments"),
		fetch("https://jsonplaceholder.typicode.com/photos"),
		fetch("https://jsonplaceholder.typicode.com/users"),
	]);
	// resolve the json reponses into regular js objects
	const data = await Promise.all(
		response.map((response) => {
			return response.json();
		})
	);
	//destructure the js objects
	const [posts, comments, photos, users] = [...data];

	const first10Posts = posts.slice(0, 10);
	console.log(first10Posts);

	// invoke the below function to display data into the UI
	displayData(posts, comments, photos, users);
}

fetchData();

// display data arrow function
const displayData = (posts, comments, photos, users) => {
	posts.map((post) => {
		// gets comments relating to each post
		const commentsPost = comments.filter((comment) => {
			return comment.postId == post.id;
		});

		// gets photo relating to each post
		const photo = photos.find((photo) => photo.id == post.id);

		// gets user relating to each post
		const user = users.find((user) => user.id == post.id);

		// create a string of html elements that will mapped to the comments section of each post
		const commentsHtmlString = commentsPost.map((comment) => {
			return `
			<div class="comment">
							   <div class="commentor-info">
								   <img class="commentor-img" src="./IMG-20210313-WA0051.jpg" alt="profile-img">
								   <div class="name-time">
									   <strong class="name">${comment.email}</strong>
									   <small class="time-posted">${comment.postId} ${
				comment.postId > 1 ? "days" : "day"
			} ago</small></small>
								   </div>
							   </div>

							   <p class="comment-text">${comment.body}</p>
						   </div> `;
		});

		// create a string of html elements that will mapped to post section for each post
		const postHtml = `
	<div class="post">
                    <h4 class="post-title">${post.title}</h4>
                    <div class="blogger-info">
                        <img class="profile-img" src=${
													photo.thumbnailUrl
												} alt="profile-img">
                        <div class="name-time">
                            <strong class="name">${user.name}</strong>
                            <small class="time-posted">${post.id} ${
			post.id > 1 ? "days" : "day"
		} ago</small>
                        </div>
                    </div>
                    <p class="post-text">${post.body}</p>

                    <div class="like-share">
                        <div class="likes-component">
                            <ion-icon name="heart-outline" id="like-icon"></ion-icon>
                            <small><span id="likes-count"></span> <span id="likes-pronounciation">like</span></small>
                        </div>

                        <div class="share-component">
                            <ion-icon name="share-social-outline"></ion-icon>
                            <small>share</small>

                        </div>
                    </div>


                    <div class="comments-section">

                        <h5 class="add-new-post">Add new comment on this post</h5>

                        <textarea class="new-comment-text" name="comment" id="comment" cols="20" rows="10"
                            placeholder="Add your comments"></textarea>

                        <div class="comments-counter-container">
                            <span class="comments-counter">${
															commentsPost.length
														}</span>
                            <span class="comments-counter-text">Comments</span>
                        </div>

                        <div class="comments">
                          ${commentsHtmlString}
                        </div>
                    </div>
                </div>
	`;

		postsContainer.insertAdjacentHTML("beforeend", postHtml);
	});
};
