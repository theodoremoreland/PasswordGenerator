export default class Criteria {
    constructor(characterSets) {
        this.characterSets = characterSets;
    }

    promptUserForPasswordLength(minValue = 8, maxValue = 128, defaultValue) {
        const validateResponse = (response) => {
            if (isNaN(response)) return false;
            else return (response >= minValue && response <= maxValue);
        };

        const promptText = `Choose password length (must be between ${minValue}-${maxValue})` + (defaultValue ? `\nDefault value = ${defaultValue}` : "");
        const userResponse = prompt(promptText, defaultValue).trim();
        const userResponseIsValid = validateResponse(userResponse);

        if (userResponseIsValid) {
            this.length = +userResponse;
            return;
        }

        alert(`Invalid response: "${userResponse}". Password length must be between ${minValue} and ${maxValue}`);

        return this.promptUserForPasswordLength(minValue, maxValue, defaultValue);
    }

    characterSetPrompt(characterSet) {
        const validateResponse = (response) => {
            const regex = /^(yes|y|no|n|1|0)$/i;
            return regex.test(response);
        }
        const audioElement = document.querySelector("audio#sfx");
        const defaultValue = characterSet.approved ? "yes" : "no";
        const promptText = `Include ${characterSet.name} (yes/no)?` + (defaultValue ? `\nDefault value = ${defaultValue}` : "");
        const userResponse = prompt(promptText, defaultValue).trim();
        const userResponseIsValid = validateResponse(userResponse);
    
        if (userResponseIsValid) {
            if (["yes", "y", "1"].includes(userResponse.toLowerCase())) {
                if (audioElement) {
                    audioElement.src ="/assets/sounds/confirm.mp3";

                    audioElement
                        .play()
                        .catch(e => {
                            // AbortError occurs when one sound interrupts another via .play() on the same audio element
                            // This is expected and intentional, so this will suppress the error.
                            if (e.name !== "AbortError") console.error(e);
                        });
                }

                characterSet.approved = true;
            }
            else {
                if (audioElement) {
                    audioElement.src ="/assets/sounds/deny.mp3";
                    audioElement
                        .play()
                        .catch(e => {
                            // AbortError occurs when one sound interrupts another via .play() on the same audio element
                            // This is expected and intentional, so this will suppress the error.
                            if (e.name !== "AbortError") console.error(e);
                        });
                }

                characterSet.approved = false;
            }

            return;
        }
        
        alert(`Invalid response "${userResponse}". Response must be a "yes" or "no".`);
        
        return this.characterSetPrompt(characterSet);
    }

    promptUserToApproveEachCharacterSet() {
        for (const characterSet of this.characterSets) {
            this.characterSetPrompt(characterSet);
        }
    }

    extractApprovedChracterSets() {
        const approvedCharacterSets = {};

        for (const characterSet of this.characterSets) {
            if (characterSet.approved) {
                approvedCharacterSets[characterSet.name] = characterSet.characters;
            }
        }

        return approvedCharacterSets;
    }
}