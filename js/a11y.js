document.addEventListener("DOMContentLoaded", function () {

    const textSizeButtons = document.querySelectorAll("[data-text-size]");
    const contrastButton = document.getElementById("contrastToggle");

    // Available text sizes.
    const validTextSizes = ["small", "medium", "large"];

    // Preference storage keys.
    const TEXT_SIZE_KEY = "portfolioTextSize";
    const CONTRAST_KEY = "portfolioHighContrast";

    // Safely read saved preferences.
    function getSavedPreference(key, defaultValue) {
        try {
            return localStorage.getItem(key) || defaultValue;
        } catch (error) {
            return defaultValue;
        }
    }

    // Safely save user preferences.
    function savePreference(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // Settings will still work for the current page.
        }
    }

    // Apply accessibility settings.
    function applySettings(textSize, highContrast, shouldSave = true) {

        document.body.classList.remove(
            "text-small",
            "text-medium",
            "text-large"
        );

        document.body.classList.add("text-" + textSize);

        document.body.classList.toggle("high-contrast", highContrast);

        // Update text size button states.
        textSizeButtons.forEach(function (button) {
            button.setAttribute(
                "aria-pressed",
                String(button.dataset.textSize === textSize)
            );
        });

        // Update contrast button state and label.
        if (contrastButton) {
            contrastButton.setAttribute(
                "aria-pressed",
                String(highContrast)
            );

            contrastButton.textContent = highContrast
                ? "Turn off High Contrast"
                : "Turn on High Contrast";
        }

        // Save preferences only when requested.
        if (shouldSave) {
            savePreference(TEXT_SIZE_KEY, textSize);
            savePreference(CONTRAST_KEY, String(highContrast));
        }
    }

    // Load saved preferences.
    const savedSize = getSavedPreference(TEXT_SIZE_KEY, "medium");

    const savedContrast = getSavedPreference(CONTRAST_KEY, "false");

    // Validate saved text size.
    let currentSize = validTextSizes.includes(savedSize)
        ? savedSize
        : "medium";

    // Validate saved contrast preference.
    let currentContrast = savedContrast === "true";

    // Handle text size buttons.
    textSizeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedSize = button.dataset.textSize;

            if (validTextSizes.includes(selectedSize)) {
                currentSize = selectedSize;
                applySettings(currentSize, currentContrast);
            }
        });
    });

    // Handle contrast button.
    if (contrastButton) {

        contrastButton.addEventListener("click", function () {

            currentContrast = !currentContrast;

            applySettings(currentSize, currentContrast);
        });
    }

    // Synchronize accessibility preferences across browser tabs.
    window.addEventListener("storage", function (event) {

        if (
            event.key !== TEXT_SIZE_KEY &&
            event.key !== CONTRAST_KEY &&
            event.key !== null
        ) {
            return;
        }

        if (event.key === TEXT_SIZE_KEY) {
            const newSize = event.newValue;

            currentSize = validTextSizes.includes(newSize)
                ? newSize
                : "medium";
        }

        if (event.key === CONTRAST_KEY) {
            currentContrast = event.newValue === "true";
        }

        // Handle localStorage being cleared.
        if (event.key === null) {
            const updatedSize = getSavedPreference(
                TEXT_SIZE_KEY,
                "medium"
            );

            const updatedContrast = getSavedPreference(
                CONTRAST_KEY,
                "false"
            );

            currentSize = validTextSizes.includes(updatedSize)
                ? updatedSize
                : "medium";

            currentContrast = updatedContrast === "true";
        }

        // Update this tab without writing back to localStorage.
        applySettings(currentSize, currentContrast, false);
    });

    // Apply preferences when the page loads.
    applySettings(currentSize, currentContrast);

});