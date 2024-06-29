// Collect grade information from the table
function collectGradeInfo() {
    let totalGrade = 0;
    let totalWeight = 0;
    let weightedTotal = 0;
    let count = 0;

    const rows = document.querySelectorAll('table tr');
    for (const row of rows) {
        const firstTd = row.querySelector('td');
        if (!firstTd) continue;

        if (firstTd.textContent.includes('Additional Requirements')) {
            break;
        }

        const courseInfo = extractCourseInfo(row, firstTd);
        if (!courseInfo) continue;

        const { courseName, grade, weight } = courseInfo;

        if (isNaN(grade)) continue; // Skip courses without grades

        totalGrade += grade;
        weightedTotal += grade * weight;
        totalWeight += weight;
        count++;
    }

    return { totalGrade, totalWeight, weightedTotal, count };
}

// Extract course information from a table row
function extractCourseInfo(row, firstTd) {
    if (firstTd.textContent.endsWith(' S') && row.children[4].textContent === "") {
        return {
            courseName: row.children[1].textContent.trim(),
            grade: parseFloat(row.children[3].textContent.trim()),
            weight: parseInt(row.children[5].textContent.trim(), 10)
        };
    } else if (firstTd.getAttribute('colspan') == '2') {
        return {
            courseName: firstTd.textContent.trim(),
            grade: parseFloat(row.children[2].textContent.trim()),
            weight: parseInt(row.children[4].textContent.trim(), 10)
        };
    }
    return null;
}

// Calculate average and weighted average
function calculateAverages({ totalGrade, totalWeight, weightedTotal, count }) {
    const average = totalGrade / count;
    const weightedAverage = weightedTotal / totalWeight;
    return { average, weightedAverage };
}

// Display results in the DOM
function displayResults({ average, weightedAverage }) {
    const existingElement = document.querySelector('.grade-averages-content');
    
    if (existingElement) {
        existingElement.querySelector('.average-text').textContent = `Average: ${average.toFixed(2)}`;
        existingElement.querySelector('.weighted-average-text').textContent = `Weighted Average: ${weightedAverage.toFixed(2)}`;
        return;
    }

    const wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'tablemargin print-no';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'grade-averages-content';
    contentDiv.style.border = '1px solid #ccc';
    contentDiv.style.backgroundColor = '#f9f9f9';
    contentDiv.style.width = '99%';

    const header = document.createElement('p');
    header.textContent = 'Grade Averages';
    header.style.fontWeight = 'bold';
    header.style.margin = '5px 5px';

    const averageText = document.createElement('p');
    averageText.className = 'average-text';
    averageText.textContent = `Average: ${average.toFixed(2)}`;
    averageText.style.margin = '5px 5px';

    const weightedAverageText = document.createElement('p');
    weightedAverageText.className = 'weighted-average-text';
    weightedAverageText.textContent = `Weighted Average: ${weightedAverage.toFixed(2)}`;
    weightedAverageText.style.margin = '5px 5px';

    // Assemble the elements
    contentDiv.appendChild(header);
    contentDiv.appendChild(averageText);
    contentDiv.appendChild(weightedAverageText);
    wrapperDiv.appendChild(document.createElement('br'))
    wrapperDiv.appendChild(contentDiv);

    // Insert grade information
    const contentBlock = document.querySelector('.contentblock-1col');
    if (contentBlock && contentBlock.children.length >= 3) {
        contentBlock.insertBefore(wrapperDiv, contentBlock.children[3]);
    }
}

// Main function to calculate grades
async function calculateGrades() {
    const gradeInfo = collectGradeInfo();
    const averages = calculateAverages(gradeInfo);
    displayResults(averages);
}

calculateGrades()
