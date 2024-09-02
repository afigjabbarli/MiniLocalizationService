const TranslationTextsURL = "./db.json"

document.addEventListener("DOMContentLoaded", function () {
    const languageSelector = document.getElementById("language-selector");
    const languageSelectionObjects = document.querySelectorAll('[localizationKey="localization"]');
   
    languageSelector.addEventListener("change", async function(){
        await Translate(this.value, languageSelectionObjects);
    })

    async function FetchTranslationTexts() {
        let translationTexts = [];
        await fetch(TranslationTextsURL)
            .then(response => {
                if (response && response.status === 200
                    && response.statusText === "OK") { return response.json(); }
            })
            .then(data => { translationTexts = data })
            .catch(error => console.error(`ERROR: ${error}`))
        return translationTexts;
    }

    async function Translate(currentLanguage, nodeList) {
        const data = await FetchTranslationTexts();
        for (const key in data) {
           nodeList.forEach(node => {
               const localizationId = node.getAttribute("localizationId");
               if(key === localizationId)
               {
                   node.innerHTML = data[key][currentLanguage];
               }
           })
        }
    }
})
