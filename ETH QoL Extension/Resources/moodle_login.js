// Check if the current page is a quiz, exam, or similar
const isRestrictedPage = () => {
    const restrictedKeywords = ['quiz', 'feedback', 'test', 'exam', 'prüfung'];
    return restrictedKeywords.some(keyword => location.href.includes(keyword));
};

// Handle Moodle login page
const handleMoodleLogin = () => {
    const selectElement = document.getElementById('idp');
    const ethOption = Array.from(selectElement.options).find(option =>
        option.text === 'ETH Zürich' || option.value === 'https://aai-logon.ethz.ch/idp/shibboleth'
    );

    if (ethOption) {
        ethOption.selected = true;
        const loginButton = document.querySelector('button.btn.btn-primary.btn-block');
        if (loginButton) loginButton.click();
    } else {
        console.log('ETH Zürich option not found');
    }
};

// Main function to handle auto-login
async function autoLogin() {
    if (isRestrictedPage()) return;

    if (location.href.includes("https://moodle-app2.let.ethz.ch/auth/shibboleth/login.php")) {
        handleMoodleLogin();
    }
}

// Run the auto-login script when the page is fully loaded
window.addEventListener('load', autoLogin);
