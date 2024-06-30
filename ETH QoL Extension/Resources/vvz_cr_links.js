// Constants
const COURSE_CODE_REGEX = /(\d{3}-\d{4}-[0-9A-Z]{3})/g;
const COURSE_REVIEW_BASE_URL = 'https://n.ethz.ch/~lteufelbe/coursereview/?course=';
const API_BASE_URL = 'https://rubberducky.vsos.ethz.ch:1855/course/';

// Helper function
const createLink = (courseCode) => `<a href="${COURSE_REVIEW_BASE_URL}${courseCode}" target="_blank">${courseCode}</a>`;

// Recursively traverses the DOM tree and replaces course codes with clickable links
function addUrlsRecursively(element) {
    if (element.childElementCount === 0 && element.tagName !== 'A') {
        element.innerHTML = element.innerHTML.replace(COURSE_CODE_REGEX, createLink);
    } else {
        Array.from(element.children).forEach(addUrlsRecursively);
    }
}

// Adds review indicators (stars) next to course code links
async function addReviewIcons() {
    const courseLinks = document.querySelectorAll(`a[href^='${COURSE_REVIEW_BASE_URL}']`);

    for (const link of courseLinks) {
        if (link.querySelector('span')) continue;

        const span = document.createElement('span');
        link.appendChild(span);

        const courseCode = new URL(link.href).searchParams.get('course');
        
        try {
            const response = await fetch(`${API_BASE_URL}${courseCode}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = JSON.parse(JSON.parse(await response.text()));
            if (data.length > 0) {
                span.textContent = '★';
                span.style.color = 'goldenrod';
            }
        } catch (error) {
            console.error('Error fetching review data:', error);
        }
    }
}

// Main function to handle course review enhancements
async function enhanceCourseReviews() {
    addUrlsRecursively(document.body);
    await addReviewIcons();
}

// Run the course review enhancement script when the page is fully loaded
window.addEventListener('load', enhanceCourseReviews);
