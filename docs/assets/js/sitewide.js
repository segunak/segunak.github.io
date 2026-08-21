function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to set the desired theme (light or dark)
const setDesiredTheme = (desiredTheme) => {
    // Get references to the light and dark theme stylesheets
    const lightTheme = document.getElementById('light-theme');
    const darkTheme = document.getElementById('dark-theme');
    const currentTheme = lightTheme.getAttribute('rel') === 'stylesheet' ? 'light' : 'dark';

    if (currentTheme === desiredTheme) {
        localStorage.setItem('theme', desiredTheme);
        return;
    }

    // Check if the desired theme is "light"
    if (desiredTheme === "light") {
        // Set the light theme as the active stylesheet by setting its 'rel' attribute to 'stylesheet'
        lightTheme.setAttribute('rel', 'stylesheet');

        setTimeout(function () {
            // Set the dark theme as the alternate stylesheet by setting its 'rel' attribute to 'stylesheet alternate'
            darkTheme.setAttribute('rel', 'stylesheet alternate');
        }, 10); // Adjust the delay duration as needed
    }
    // Check if the desired theme is "dark"
    else if (desiredTheme === "dark") {
        // Set the dark theme as the active stylesheet by setting its 'rel' attribute to 'stylesheet'
        darkTheme.setAttribute('rel', 'stylesheet');

        setTimeout(function () {
            // Set the light theme as the alternate stylesheet by setting its 'rel' attribute to 'stylesheet alternate'
            lightTheme.setAttribute('rel', 'stylesheet alternate');
        }, 10); // Adjust the delay duration as needed
    }
    // If the desired theme is neither "light" nor "dark", log an error message
    else {
        console.log("setDesiredTheme(): Something is wrong with the theme logic. The provided desiredTheme value is neither light nor dark.")
    }

    // Store the desired theme in the browser's local storage for future reference
    localStorage.setItem('theme', desiredTheme);
}

const setSiteThemeOnLoad = () => {
    const savedTheme = localStorage.getItem('theme');
    const userSetTheme = localStorage.getItem('userSetTheme');

    if (userSetTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setDesiredTheme(savedTheme);
    }
}

// Function to switch the site theme between light and dark
const switchSiteTheme = () => {
    // Get a reference to the light theme stylesheet
    const lightTheme = document.getElementById('light-theme');
    // Set a flag in the browser's local storage to indicate that the user has manually set the theme
    localStorage.setItem('userSetTheme', 'true');

    // Check the current state of the light theme stylesheet
    if (lightTheme.getAttribute('rel') === 'stylesheet') {
        // If the light theme is currently active (its 'rel' attribute is 'stylesheet'),
        // switch to the dark theme by calling the setDesiredTheme function with "dark" as the argument
        setDesiredTheme("dark");
    } else {
        // If the dark theme is currently active (the light theme's 'rel' attribute is not 'stylesheet'),
        // switch to the light theme by calling the setDesiredTheme function with "light" as the argument
        setDesiredTheme("light");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the theme-switcher element and add the event listener to the theme-switcher element
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.addEventListener('click', switchSiteTheme);

    // Dynamically set the theme of the site.
    setSiteThemeOnLoad();
});
