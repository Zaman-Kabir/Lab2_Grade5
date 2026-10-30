
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("feedbackForm");

    if (!form) {
        return;
    }

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const topic = document.getElementById("topic");
    const comments = document.getElementById("comments");
    const website = document.getElementById("website");

    const commentsCounter = document.getElementById("commentsCounter");
    const formStatus = document.getElementById("formStatus");

    let successMessageTimer;
    let preserveSuccessMessage = false;

    const fields = [
        { input: fullName, error: document.getElementById("fullNameError") },
        { input: email, error: document.getElementById("emailError") },
        { input: topic, error: document.getElementById("topicError") },
        { input: comments, error: document.getElementById("commentsError") },
        { input: website, error: document.getElementById("websiteError") }
    ];

    function showError(input, message) {
        const field = fields.find(function (item) {
            return item.input === input;
        });

        if (field && field.error) {
            field.error.textContent = message;
        }

        input.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function validateField(input) {
        const value = input.value.trim();

        if (input === fullName) {
            if (value === "") {
                showError(input, "Please enter your full name.");
                return false;
            }

            if (value.length < 2) {
                showError(input, "Name must contain at least 2 characters.");
                return false;
            }
        }

        if (input === email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value === "") {
                showError(input, "Please enter your email address.");
                return false;
            }

            if (!emailPattern.test(value)) {
                showError(input, "Please enter a valid email address.");
                return false;
            }
        }

        if (input === topic && value === "") {
            showError(input, "Please choose a topic.");
            return false;
        }

        if (input === comments && value.length < 15) {
            showError(input, "Please write at least 15 characters.");
            return false;
        }

        if (input === website && value !== "") {
            try {
                const url = new URL(value);

                if (url.protocol !== "http:" && url.protocol !== "https:") {
                    showError(
                        input,
                        "Website must start with http:// or https://."
                    );
                    return false;
                }
            } catch {
                showError(input, "Please enter a valid website URL.");
                return false;
            }
        }

        showError(input, "");
        return true;
    }

    function updateCommentsCounter() {
        const count = comments.value.length;

        commentsCounter.textContent =
            `${count} characters (minimum 15)`;

        commentsCounter.style.color =
            count < 15 ? "#b00020" : "#2f4f3a";
    }

    function clearSuccessMessage() {
        clearTimeout(successMessageTimer);
        successMessageTimer = undefined;
        formStatus.textContent = "";
    }

    comments.addEventListener("input", function () {
        updateCommentsCounter();

        if (comments.value.trim().length >= 15) {
            validateField(comments);
        } else {
            showError(comments, "");
        }
    });

    fields.forEach(function ({ input }) {
        input.addEventListener("blur", function () {
            if (input === website && input.value.trim() === "") {
                showError(input, "");
            } else {
                validateField(input);
            }
        });

        input.addEventListener("input", function () {
            if (!preserveSuccessMessage) {
                clearSuccessMessage();
            }

            if (input === website && input.value.trim() === "") {
                showError(input, "");
            } else if (input.getAttribute("aria-invalid") === "true") {
                validateField(input);
            }
        });

        input.addEventListener("change", function () {
            if (input === topic) {
                validateField(input);
            }
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearSuccessMessage();

        const requiredFields = [fullName, email, topic, comments];

        const results = requiredFields.map(function (input) {
            return validateField(input);
        });

        if (website.value.trim() !== "") {
            results.push(validateField(website));
        } else {
            showError(website, "");
        }

        const isValid = results.every(Boolean);

        if (!isValid) {
            formStatus.textContent =
                "Please correct the errors above and try again.";

            const firstInvalidField = requiredFields
                .concat(website.value.trim() !== "" ? [website] : [])
                .find(function (input) {
                    return input.getAttribute("aria-invalid") === "true";
                });

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }

        const submittedName = fullName.value.trim();

        // Show the success message before resetting the form.
        formStatus.textContent =
            `Thanks for your feedback, ${submittedName}!`;

        formStatus.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Keep the success message when the form resets.
        preserveSuccessMessage = true;
        form.reset();
        preserveSuccessMessage = false;

        fields.forEach(function ({ input, error }) {
            error.textContent = "";
            input.setAttribute("aria-invalid", "false");
        });

        updateCommentsCounter();

        successMessageTimer = setTimeout(function () {
            formStatus.textContent = "";
            successMessageTimer = undefined;
        }, 5000);
    });

    form.addEventListener("reset", function () {
        const shouldKeepMessage = preserveSuccessMessage;

        if (!shouldKeepMessage) {
            clearSuccessMessage();
        }

        setTimeout(function () {
            fields.forEach(function ({ input, error }) {
                error.textContent = "";
                input.setAttribute("aria-invalid", "false");
            });

            if (!shouldKeepMessage) {
                formStatus.textContent = "";
            }

            updateCommentsCounter();
        }, 0);
    });

    updateCommentsCounter();
});
