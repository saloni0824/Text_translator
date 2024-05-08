# Text_translator
This project utilizes the Google Translate API to translate text between different languages. It includes a simple web interface where users can enter text, select the source and target languages, and view the translated text.

## Files Included

- `countries.js`: JavaScript file containing an object mapping language codes to language names. Used to populate select options for source and target languages.
- `scripts.js`: JavaScript file containing client-side code for the web interface. Handles user interactions such as input, translation, and button clicks.
- `index.html`: HTML file defining the structure of the web page. Includes text input fields, select dropdowns for languages, and buttons for translation.
- `styles.css`: CSS file containing styles for the web page layout and design.

## Usage

1. Open `index.html` in a web browser to access the language translator web interface.
2. Enter text in the input field labeled "Enter text".
3. Select the source language from the dropdown Left.
4. Select the target language from the dropdown Right.
5. Click the "Translate Text" button to initiate the translation process.
6. View the translated text in the output field labeled "Translation".

## Dependencies
Axios: Used for making HTTP requests to the Google Translate API.
