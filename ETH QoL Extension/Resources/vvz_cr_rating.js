const API_RATING_URL = 'https://rubberducky.vsos.ethz.ch:1855/rating/';

function addTableHeaders(row, descriptions) {
    descriptions.forEach(description => {
        const th = document.createElement("th");
        th.textContent = description;
        row.appendChild(th);
    });
}

async function addCourseRatings(row, courseNr) {
    try {
        const response = await fetch(`${API_RATING_URL}${courseNr}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = JSON.parse(JSON.parse(await response.text()));
        
        Object.values(data[0]).forEach(value => {
            const td = document.createElement("td");
            if (value !== null) {
                td.textContent = parseFloat(value).toFixed(2);
            }
            row.appendChild(td);
        });
    } catch (error) {
        console.error("Error fetching course ratings:", error);
    }
}

async function addCourseReviewRating() {
    const levels = document.getElementsByClassName("td-level");
    Array.from(levels).forEach(td => td.colSpan = 12);
    
    const RATING_DESCRIPTIONS = [
        "Would recommend it",
        "Interesting content",
        "Appropriate difficulty",
        "Appropriate amount of effort",
        "Amount and quality of resources"
    ];
    
    const trs = document.querySelectorAll("tr");
    for (const row of trs) {
        const tds = row.getElementsByTagName("td");
        const ths = row.getElementsByTagName("th");

        if (ths.length > 1) {
            addTableHeaders(row, RATING_DESCRIPTIONS);
        }

        if (tds.length > 5 && tds[0].className === "border-no") {
            await addCourseRatings(row, tds[0].textContent);
        }
    }
}

// Call the main function
addCourseReviewRating();
