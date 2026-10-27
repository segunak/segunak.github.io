document.addEventListener('DOMContentLoaded', function () {
    const includeInternalLinks = document.querySelector('script[data-link-targeting="all"]') !== null;

    // Function to determine if the device is likely a mobile
    const isMobileDevice = () => {
        // Set the breakpoint for mobile vs tablet/desktop
        const mobileBreakpoint = 768; // Typical tablet size in portrait mode

        // Access the user-agent string and convert it to lowercase for case-insensitive matching
        const userAgent = navigator.userAgent.toLowerCase();

        // Check if the window's inner width is less than or equal to the breakpoint or if the user agent contains 'mobile'
        // This helps determine if the device is mobile based on screen size or user-agent indications
        const isMobile = window.innerWidth <= mobileBreakpoint || /mobile/i.test(userAgent);

        // Return true if either condition is met (indicating a mobile device), otherwise false
        return isMobile;
    };

    const updateLinkTarget = link => {
        if (link.closest('.visible-links, .hidden-links') || !link.hasAttribute('href') ||
            link.hasAttribute('download') || !['http:', 'https:'].includes(link.protocol)) {
            return;
        }
        if (link.target === '_blank' && !link.hasAttribute('data-dynamic-link-target')) {
            return;
        }

        const samePage = link.origin === window.location.origin &&
            link.pathname === window.location.pathname && link.search === window.location.search;
        link.target = samePage || (!includeInternalLinks && link.hostname === window.location.hostname) ||
            isMobileDevice() ? '_self' : '_blank';
        // Keep automatically assigned targets recognizable when dialogs clone links.
        link.setAttribute('data-dynamic-link-target', '');
        if (link.target === '_blank') {
            link.relList.add('noopener');
        }
    };

    const updateLinkTargets = () => {
        [...document.getElementsByTagName('a')].forEach(updateLinkTarget);
    };

    updateLinkTargets();

    window.addEventListener('resize', updateLinkTargets);

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[href]');
        if (link) {
            updateLinkTarget(link);
        }
    }, true);
});