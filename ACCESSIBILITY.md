# Accessibility Features

## 1. Overview

The portfolio website includes an accessibility panel that allows users to customize the appearance of the website according to their reading preferences.

The panel provides text size and contrast settings to improve readability and usability.

## 2. Text Size Options

Users can choose between three text size options:

- Small
- Medium
- Large

The selected text size is applied across the website.

## 3. Contrast Options

The accessibility panel provides two contrast modes:

- Normal Contrast
- High Contrast

High Contrast improves the visual distinction between text and background, making website content easier to read.

## 4. Saving User Preferences

The website uses JavaScript `localStorage` to save accessibility preferences.

The selected text size and contrast settings remain active after the browser page is refreshed.

The JavaScript implementation also validates saved preference values before applying them.

## 5. Keyboard Accessibility

Users can navigate the accessibility controls using the keyboard.

- **Tab key:** Move between controls.
- **Enter key:** Activate the selected control.

The accessibility controls include labels to make their purpose clear.

## 6. Testing

The following accessibility features were tested manually:

- [x] Small text size
- [x] Medium text size
- [x] Large text size
- [x] Normal Contrast
- [x] High Contrast
- [x] All six text size and contrast combinations
- [x] Keyboard navigation using Tab
- [x] Keyboard activation using Enter
- [x] Preference persistence after refreshing the page

## 7. Implementation Details

Accessibility preferences are handled using JavaScript.

The website uses:

- HTML buttons for accessibility controls.
- CSS classes to apply text size and contrast changes.
- JavaScript event listeners to handle user interactions.
- `localStorage` to preserve preferences between page refreshes.

## 8. Conclusion

The accessibility panel provides users with options to customize text size and contrast.

These features improve readability, support keyboard interaction, and allow user preferences to remain available after refreshing the page.