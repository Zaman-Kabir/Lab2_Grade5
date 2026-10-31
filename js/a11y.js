document.addEventListener("DOMContentLoaded", function () {

    const textSizeButtons = document.querySelectorAll("[data-text-size]");
    const contrastButton = document.getElementById("contrastToggle");

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
            // Accessibility settings will still work for the current page.
        }
    }

    function applySettings(textSize, highContrast) {

        document.body.classList.remove(
            "text-small",
            "text-medium",
            "text-large"
        );

        document.body.classList.add("text-" + textSize);

        document.body.classList.toggle("high-contrast", highContrast);

        textSizeButtons.forEach(function (button) {
            button.setAttribute(
                "aria-pressed",
                String(button.dataset.textSize === textSize)
            );
        });

        if (contrastButton) {
            contrastButton.setAttribute(
                "aria-pressed",
                String(highContrast)
            );

            contrastButton.textContent = highContrast
                ? "Turn off High Contrast"
                : "Turn on High Contrast";
        }

        savePreference("portfolioTextSize", textSize);

        savePreference(
            "portfolioHighContrast",
            String(highContrast)
        );
    }

    // Load saved preferences.
    const savedSize = getSavedPreference(
        "portfolioTextSize",
        "medium"
    );

    const savedContrast = getSavedPreference(
        "portfolioHighContrast",
        "false"
    );

    let currentSize = ["small", "medium", "large"].includes(savedSize)
        ? savedSize
        : "medium";

    let currentContrast = savedContrast === "true";

    // Handle text size buttons.
    textSizeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            currentSize = button.dataset.textSize;

            if (!["small", "medium", "large"].includes(currentSize)) {
                currentSize = "medium";
            }

            applySettings(currentSize, currentContrast);
        });
    });

    // Handle contrast button.
    if (contrastButton) {

        contrastButton.addEventListener("click", function () {

            currentContrast = !currentContrast;

            applySettings(currentSize, currentContrast);
        });
    }

    // Apply preferences when the page loads.
    applySettings(currentSize, currentContrast);

});