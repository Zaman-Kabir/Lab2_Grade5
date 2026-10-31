# Skills Showcase Documentation

## 1. Overview

The portfolio website includes a dynamic skills showcase built using Vanilla JavaScript.

Skills are displayed in an organized card layout and can be filtered and sorted by users.

## 2. Skills Data Structure

The skills are stored as JavaScript objects inside an array.

Each skill object contains information such as:

- Skill name
- Skill category

The showcase includes eight skills across three categories:

- Web Development
- Programming
- Professional Skills

Using an array of objects makes the skills data easier to organize and maintain.

## 3. Dynamic Rendering

JavaScript dynamically generates skill cards from the skills array.

The cards are created based on the available data rather than being individually written in HTML.

This approach makes it easier to add, update, or manage skills.

## 4. Category Filtering

Users can filter skills by category.

The available categories are:

- Web
- Programming
- Professional

Only skills belonging to the selected category are displayed.

The displayed skill count updates when the category changes.

## 5. Sorting

Users can sort skills alphabetically in two ways:

- Name: A to Z
- Name: Z to A

Sorting changes the display order of the skills.

## 6. Combined Filtering and Sorting

Users can apply category filtering and alphabetical sorting together.

For example, users can select the Programming category and sort the matching skills from A to Z.

The skill count reflects the filtered results.

## 7. Testing

The following features were tested manually:

- [x] Web category filtering
- [x] Programming category filtering
- [x] Professional category filtering
- [x] A to Z sorting
- [x] Z to A sorting
- [x] Filtering and sorting together
- [x] Dynamic skill count

## 8. Conclusion

The skills showcase demonstrates JavaScript arrays, objects, dynamic DOM rendering, category filtering, alphabetical sorting, and combined operations using Vanilla JavaScript.