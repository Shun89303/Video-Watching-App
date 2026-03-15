// --- Login Page Logic ---
const loginForm = document.getElementById(
	"loginForm",
) as HTMLFormElement | null;
if (loginForm) {
	const errorDiv = document.getElementById("error") as HTMLDivElement;

	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		const phone = (document.getElementById("phone") as HTMLInputElement).value;
		const password = (document.getElementById("password") as HTMLInputElement)
			.value;

		try {
			const res = await fetch(
				"https://video-watching-app.onrender.com/api/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ phone, password }),
				},
			);

			const data = await res.json();
			if (data.success) {
				localStorage.setItem("loggedInUserPhone", phone);
				window.location.href = "videoList.html";
			} else {
				errorDiv.textContent = "Invalid login";
			}
		} catch (err) {
			console.error(err);
			errorDiv.textContent = "Network error. Try again.";
		}
	});
}

// --- Video List Page Logic ---
const searchInput = document.getElementById(
	"searchInput",
) as HTMLInputElement | null;
const findButton = document.getElementById(
	"findButton",
) as HTMLButtonElement | null;
const videoDisplay = document.getElementById(
	"videoDisplay",
) as HTMLDivElement | null;

if (searchInput && findButton && videoDisplay) {
	const loggedInUserPhone = localStorage.getItem("loggedInUserPhone");
	if (!loggedInUserPhone) {
		alert("Please login first!");
		window.location.href = "index.html";
	}

	findButton.addEventListener("click", async () => {
		const searchText = searchInput.value.trim();
		if (!searchText) return;

		videoDisplay.innerHTML = "";

		try {
			const res = await fetch(
				"https://video-watching-app.onrender.com/api/video/search-video",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ search: searchText }),
				},
			);

			const data = await res.json();
			if (!data.success) {
				videoDisplay.textContent = data.message || "Video not found";
				return;
			}

			const capitalizedTitle = searchText.replace(/\b\w/g, (c) =>
				c.toUpperCase(),
			);

			const container = document.createElement("div");
			container.className = "video-container";

			const title = document.createElement("h2");
			title.textContent = capitalizedTitle;
			container.appendChild(title);

			const video = document.createElement("video");
			video.controls = true;
			video.src = await window.electronAPI.getVideoPath(data.url);
			container.appendChild(video);

			const markWatched = document.createElement("button");
			markWatched.className = "mark-watched";
			markWatched.textContent = "Mark as Watched";

			markWatched.onclick = async () => {
				const res = await fetch(
					"https://video-watching-app.onrender.com/api/video/mark-watched",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							phone: loggedInUserPhone,
							metadata_key: searchText,
						}),
					},
				);

				const result = await res.json();
				if (result.success) alert(`${capitalizedTitle} marked as watched!`);
				else alert("Error marking as watched");
			};

			container.appendChild(markWatched);
			videoDisplay.appendChild(container);
		} catch (err) {
			console.error(err);
			videoDisplay.textContent = "Error fetching video";
		}
	});
}
