// Configuration
const MOODLE_URL = '://moodle-app2.let.ethz.ch/';
const MAIN_CONTENT_WRAPPER_CLASS = 'main-inner-wrapper main-inner-outside-none main-inner-outside-nextmaincontent';
const ACTIVITY_ITEM_CLASS = 'activity-item';

// Helper function to check if we're on the correct Moodle page
function isMoodlePage() {
    return location.href.includes(MOODLE_URL);
}

// Adjust the main content wrapper
function adjustMainContentWrapper() {
    const mainWrapper = document.querySelector(`.${MAIN_CONTENT_WRAPPER_CLASS}`);
    if (mainWrapper) {
        mainWrapper.style.maxWidth = '1000px';
        mainWrapper.style.margin = 'auto';
    }
}

// Adjust padding for all activity items
function adjustActivityItems() {
    const activities = document.querySelectorAll(`.${ACTIVITY_ITEM_CLASS}`);
    activities.forEach(activity => {
        activity.style.paddingTop = '0.5rem';
        activity.style.paddingBottom = '0.5rem';
    });
}

// Force scrollbar to always show
function forceScrollbarShow() {
    document.body.style.overflow = 'scroll';
}

// Main function to adjust Moodle layout
function adjustMoodleLayout() {
    // Check if we're on the correct Moodle page
    if (!isMoodlePage()) return;

    try {
        adjustMainContentWrapper();
        adjustActivityItems();
        forceScrollbarShow();
    } catch (error) {
        console.error('Error adjusting Moodle layout:', error);
    }
}

// Run the script
adjustMoodleLayout();
