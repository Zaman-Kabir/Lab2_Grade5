document.addEventListener("DOMContentLoaded", function () {

    const skillsContainer = document.getElementById("skillsContainer");
    const categoryFilter = document.getElementById("categoryFilter");
    const skillSort = document.getElementById("skillSort");
    const skillCount = document.getElementById("skillCount");
    const noSkillsMessage = document.getElementById("noSkillsMessage");

    // All skills stored as JavaScript objects
    const allSkills = [
        {
            name: "HTML",
            description: "Learning to structure webpages with semantic HTML elements.",
            category: "web",
            categoryName: "Web Development"
        },
        {
            name: "CSS",
            description: "Learning to style webpages with colors, spacing and layouts.",
            category: "web",
            categoryName: "Web Development"
        },
        {
            name: "JavaScript",
            description: "Learning to make webpages interactive with programming.",
            category: "programming",
            categoryName: "Programming"
        },
        {
            name: "Python",
            description: "Practising beginner programming exercises and logical thinking.",
            category: "programming",
            categoryName: "Programming"
        },
        {
            name: "Responsive Design",
            description: "Learning to adapt webpage layouts to different screen sizes.",
            category: "web",
            categoryName: "Web Development"
        },
        {
            name: "Problem Solving",
            description: "Practising how to break a problem into smaller steps.",
            category: "programming",
            categoryName: "Programming"
        },
        {
            name: "Communication",
            description: "Developing the ability to explain ideas clearly and work with others.",
            category: "professional",
            categoryName: "Professional Skills"
        },
        {
            name: "Continuous Learning",
            description: "Building knowledge through practice, feedback and reflection.",
            category: "professional",
            categoryName: "Professional Skills"
        }
    ];

    function updateSkills() {

        const selectedCategory = categoryFilter.value;
        const selectedSort = skillSort.value;

        // Filter skills by category
        let visibleSkills = allSkills.filter(function (skill) {
            return selectedCategory === "all" ||
                skill.category === selectedCategory;
        });

        // Sort skills by name
        if (selectedSort === "az") {
            visibleSkills.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        } else if (selectedSort === "za") {
            visibleSkills.sort(function (a, b) {
                return b.name.localeCompare(a.name);
            });
        }

        // Create skill cards dynamically
        skillsContainer.innerHTML = "";

        visibleSkills.forEach(function (skill) {

            const card = document.createElement("article");
            card.className = "skill-card";

            const heading = document.createElement("h3");
            heading.textContent = skill.name;

            const description = document.createElement("p");
            description.textContent = skill.description;

            const category = document.createElement("span");
            category.textContent = skill.categoryName;

            card.appendChild(heading);
            card.appendChild(description);
            card.appendChild(category);

            skillsContainer.appendChild(card);
        });

        // Update skill count
        skillCount.textContent =
            `Showing ${visibleSkills.length} of ${allSkills.length} skills`;

        // Show message when no skills match
        noSkillsMessage.hidden = visibleSkills.length !== 0;
    }

    categoryFilter.addEventListener("change", updateSkills);
    skillSort.addEventListener("change", updateSkills);

    // Display all skills when the page loads
    updateSkills();

});