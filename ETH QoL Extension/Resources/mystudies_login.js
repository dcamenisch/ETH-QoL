// Handle myStudies login page
const handleMyStudiesLogin = () => {
    const startButton = document.querySelector('input[value="Start"]');
    if (startButton) startButton.click();
};

// Handle invalid session on myStudies
const handleInvalidSession = () => {
    if (location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/studSessionException.view")) {
        location.href = "https://www.lehrbetrieb.ethz.ch/myStudies/login.view";
    }
};

// Main function to handle auto-login
async function autoLogin() {
    if (location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/login.view")) {
        handleMyStudiesLogin();
    } else if (location.href.includes("https://www.lehrbetrieb.ethz.ch/myStudies/studSessionException.view")) {
        handleInvalidSession();
    }
}

// Run the auto-login script when the page is fully loaded
window.addEventListener('load', autoLogin);
