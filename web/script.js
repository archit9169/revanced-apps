function getRepoDetails() {
    const parts = window.location.hostname.split(".");
    if (parts.length >= 3 && parts[1] === "github" && parts[2] === "io") {
        const owner = parts[0];
        const repo = window.location.pathname.split("/")[1];
        return { owner, repo };
    }
    return null;
}

function fetchReleases() {
    const repoDetails = getRepoDetails();
    if (!repoDetails) {
        document.getElementById("repo-title").innerText = "Unknown Repository";
        return;
    }

    document.getElementById("repo-title").innerText = repoDetails.repo;

    fetch(`https://api.github.com/repos/${repoDetails.owner}/${repoDetails.repo}/releases`)
        .then(response => response.json())
        .then(releases => {
            if (!Array.isArray(releases) || releases.length === 0) {
                document.getElementById("latest-release").innerText = "No releases found.";
                document.getElementById("older-releases-header").style.display = "none";
                return;
            }

            document.getElementById("latest-release").innerHTML = formatReleaseHTML(releases[0]);

            if (releases.length > 1) {
                document.getElementById("older-releases").innerHTML = `
                    <p class="expandable" onclick="toggleOlderReleases()">Show older releases ▼</p>
                    <div id="older-releases-container" class="hidden">
                        ${releases.slice(1).map(formatReleaseHTML).join("")}
                    </div>`;
            } else {
                document.getElementById("older-releases").innerHTML = "<p>No older releases available.</p>";
            }
        })
        .catch(error => {
            document.getElementById("latest-release").innerText = "Failed to load releases.";
        });
}

function formatReleaseHTML(release) {
    return `<div class="release">
        <span class="release-date">${dateFns.formatDistanceToNow(new Date(release.published_at), { addSuffix: true })}</span>
        <div class="markdown-content">${marked.parse(release.body || "No description available.")}</div>
        <div class="assets">
            <h4>Assets:</h4>
            <ul>
                ${release.assets.length > 0 ? release.assets.map(asset => `<li><a href="${asset.browser_download_url}" target="_blank">${asset.name}</a></li>`).join("") : "<li>No assets available.</li>"}
            </ul>
        </div>
    </div>`;
}

function toggleOlderReleases() {
    const container = document.getElementById("older-releases-container");
    const toggleText = document.querySelector(".expandable");

    if (container.classList.contains("hidden")) {
        container.classList.remove("hidden");
        toggleText.innerText = "Hide older releases ▲";
    } else {
        container.classList.add("hidden");
        toggleText.innerText = "Show older releases ▼";
    }
}

fetchReleases();
