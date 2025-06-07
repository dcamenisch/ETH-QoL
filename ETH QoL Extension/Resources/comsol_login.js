// Main function to handle auto-login
async function autoLogin() {
    const signInButton = document.querySelector('button[class*="mantine-Button-root"][data-variant="outline"][data-size="lg"]');
        
    if (signInButton) {
        signInButton.click();
    }
}

// Run the auto-login script when the page is fully loaded
window.addEventListener('load', autoLogin);
setTimeout(autoLogin, 2000);
