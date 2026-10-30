
document.addEventListener("DOMContentLoaded", function () {
    const textSizeButtons = document.querySelectorAll("[data-text-size]");
    const contrastButton = document.getElementById("contrastToggle");

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

        localStorage.setItem("portfolioTextSize", textSize);
        localStorage.setItem(
            "portfolioHighContrast",
            String(highContrast)
        );
    }

    const savedSize = localStorage.getItem("portfolioTextSize");
    const savedContrast = localStorage.getItem("portfolioHighContrast");

    let currentSize = ["small", "medium", "large"].includes(savedSize)
        ? savedSize
        : "medium";

    let currentContrast = savedContrast === "true";

    textSizeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            currentSize = button.dataset.textSize;
            applySettings(currentSize, currentContrast);
        });
    });

    if (contrastButton) {
        contrastButton.addEventListener("click", function () {
            currentContrast = !currentContrast;
            applySettings(currentSize, currentContrast);
        });
    }

    applySettings(currentSize, currentContrast);
});
