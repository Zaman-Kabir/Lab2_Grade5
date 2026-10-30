
const skillsContainer = document.getElementById("skillsContainer");
const categoryFilter = document.getElementById("categoryFilter");
const skillSort = document.getElementById("skillSort");
const skillCount = document.getElementById("skillCount");
const noSkillsMessage = document.getElementById("noSkillsMessage");

const allSkills = Array.from(
    skillsContainer.querySelectorAll(".skill-card")
);

function updateSkills() {
    const selectedCategory = categoryFilter.value;
    const selectedSort = skillSort.value;

    let visibleSkills = allSkills.filter(skill => {
        return selectedCategory === "all" ||
            skill.dataset.category === selectedCategory;
    });

    if (selectedSort === "az") {
        visibleSkills.sort((a, b) =>
            a.dataset.name.localeCompare(b.dataset.name)
        );
    } else if (selectedSort === "za") {
        visibleSkills.sort((a, b) =>
            b.dataset.name.localeCompare(a.dataset.name)
        );
    }

    allSkills.forEach(skill => {
        skill.hidden = !visibleSkills.includes(skill);
    });

    visibleSkills.forEach(skill => {
        skillsContainer.appendChild(skill);
    });

    skillCount.textContent =
        `Showing ${visibleSkills.length} of ${allSkills.length} skills`;

    noSkillsMessage.hidden = visibleSkills.length !== 0;
}

categoryFilter.addEventListener("change", updateSkills);
skillSort.addEventListener("change", updateSkills);

updateSkills();
