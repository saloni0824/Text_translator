document.addEventListener("DOMContentLoaded", () => {
  const fromText = document.querySelector(".from-text");
  const toText = document.querySelector(".to-text");
  const exchangeIcon = document.querySelector(".exchange");
  const selectTags = document.querySelectorAll("select");
  const icons = document.querySelectorAll(".row i");
  const translateBtn = document.querySelector("button");

  // Populate select options
  selectTags.forEach((tag, id) => {
    for (let country_code in countries) {
      let selected =
        id == 0
          ? country_code == "en-GB"
            ? "selected"
            : ""
          : country_code == "hi-IN"
          ? "selected"
          : "";
      let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);
    }
  });

  // Swap text and languages
  exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectTags[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTags[0].value = selectTags[1].value;
    selectTags[1].value = tempLang;
  });

  // Clear translation when typing in fromText
  fromText.addEventListener("keyup", () => {
    if (!fromText.value) {
      toText.value = "";
    }
  });

  // Translate text
  translateBtn.addEventListener("click", async () => {
    let text = fromText.value.trim();
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");

    const options = {
      method: "POST",
      url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "b89cfddb31mshe31e62fe84f4b33p1e7773jsn4ffadbe2ddbd",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
      data: new URLSearchParams({
        from: selectTags[0].value,
        to: selectTags[1].value,
        text: text,
      }).toString(),
    };

    try {
      const response = await axios(options);
      console.log(response); // Log the entire response object
      const translatedText = response.data.trans;
      toText.value = translatedText;
      toText.setAttribute("placeholder", "Translation");
    } catch (error) {
      console.error(error);
    }
  });

  // Handle icon click events
  icons.forEach((icon) => {
    icon.addEventListener("click", ({ target }) => {
      if (!fromText.value || !toText.value) return;
      if (target.classList.contains("fa-copy")) {
        if (target.id == "from") {
          navigator.clipboard.writeText(fromText.value);
        } else {
          navigator.clipboard.writeText(toText.value);
        }
      } else {
        let utterance;
        if (target.id == "from") {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTags[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTags[1].value;
        }
        speechSynthesis.speak(utterance);
      }
    });
  });
});
