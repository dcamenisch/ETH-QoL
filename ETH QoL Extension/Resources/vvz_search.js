// Constants
const STORAGE_KEY = {
    AUTOFILLER: 'autofiller',
};

const SEARCH_FIELDS = [
    'studiengangTyp',
    'deptId',
    'studiengangAbschnittId',
    'bereichAbschnittId',
    'unterbereichAbschnittId'
];

// Utility functions
function showElement(elementId) {
    try {
        document.getElementById(elementId).style.display = 'inline';
    } catch (ex) {
        console.error(`Error showing element ${elementId}:`, ex);
    }
}

// Form submission function
function autoSubmit(formName) {
    const form = document.getElementsByName(formName)[0];
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'refresh';
    hiddenInput.value = 'on';
    form.appendChild(hiddenInput);
    form.submit();
}

// State management functions
function saveState(event) {
    if (localStorage.getItem(STORAGE_KEY.AUTOFILLER) === 'false') return;

    const storage = `${event.target.id}Ext`;
    const target = event.currentTarget;
    localStorage.setItem(storage, target.options[target.selectedIndex].text);
}

function addStateListeners() {
    SEARCH_FIELDS.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener('change', saveState);
        }
    });
}

// Field management functions
async function keepField(id, waitField) {
    const field = document.getElementById(id);
    const storage = `${id}Ext`;
    if (!field) return false;

    const fieldsel = [...field.children].find(element => element.selected);

    if (fieldsel.textContent === '' && localStorage.getItem(storage)) {
        for (const child of field.children) {
            if (child.textContent === localStorage.getItem(storage)) {
                child.selected = true;
                if (waitField) {
                    showElement(waitField);
                    await new Promise(r => setTimeout(r, 350));
                    autoSubmit('sucheLehrangebot');
                }
                return true;
            }
        }
    }
    return false;
}

async function keepSearch() {
    addStateListeners();
    if (localStorage.getItem(STORAGE_KEY.AUTOFILLER) === 'false') return;

    const stud = await keepField('studiengangTyp', '');
    const deptId = await keepField('deptId', '');
    if (stud || deptId) {
        showElement('waitSemester');
        await new Promise(r => setTimeout(r, 300));
        autoSubmit('sucheLehrangebot');
        return;
    }

    if (await keepField('studiengangAbschnittId', 'waitStudiengangId')) return;
    if (await keepField('bereichAbschnittId', 'waitBereich')) return;
    keepField('unterbereichAbschnittId', '');
}

// Main function
function initializeAutofill() {
    if (isSearchPage()) {
        keepSearch();
    }
}

// Helper function
function isSearchPage() {
    return window.location.href.includes('.ethz.ch/Vorlesungsverzeichnis/sucheLehrangebotPre.view') ||
        (window.location.href.includes('.ethz.ch/Vorlesungsverzeichnis/sucheLehrangebot.view?') &&
        document.getElementsByClassName('error').length !== 0);
}

// Initialize the autofill functionality
initializeAutofill();
