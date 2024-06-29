// Function to get the URL of the highest resolution video
const getHighestResolutionVideoUrl = () => {
    const videoLink = document.querySelector('div > ul > li.video > a');
    if (!videoLink) throw new Error('Video link not found');
    return videoLink.href;
};

// Function to create a new video player element
const createVideoPlayer = (videoUrl) => {
    return `
        <video id="ethVideoPlayer" width="100%" height="400px" controls>
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
};

// Function to replace the existing video player with our custom one
const replaceVideoPlayer = (videoPlayerHtml) => {
    const iframes = document.querySelectorAll('iframe');
    if (iframes.length === 0) throw new Error('No iframes found to replace');

    iframes.forEach(iframe => {
        const parent = iframe.parentNode;
        parent.removeChild(iframe);
        parent.innerHTML = videoPlayerHtml;
    });
};

// Function to add keyboard controls to the video player
const addKeyboardControls = () => {
    const video = document.getElementById('ethVideoPlayer');
    if (!video) throw new Error('Video player not found');

    document.addEventListener('keydown', (event) => {
        const scrubTime = 10; // Time to scrub in seconds

        switch(event.key) {
            case 'ArrowRight':
                video.currentTime += scrubTime;
                event.preventDefault();
                break;
            case 'ArrowLeft':
                video.currentTime -= scrubTime;
                event.preventDefault();
                break;
            case ' ':
                if (video.paused) video.play();
                else video.pause();
                event.preventDefault();
                break
        }
    });
};

// Main function to handle video player replacement
async function replaceETHVideoPlayer() {
    if (!location.href.includes("https://video.ethz.ch/lectures/")) return;

    try {
        const videoUrl = getHighestResolutionVideoUrl();
        const videoPlayer = createVideoPlayer(videoUrl);
        replaceVideoPlayer(videoPlayer);
        addKeyboardControls();
    } catch (error) {
        console.error("[ETH QoL] Could not replace video player:", error.message);
    }
}

// Run the video player replacement script when the page is fully loaded
window.addEventListener('load', replaceETHVideoPlayer);
