export default class Criteria {
    constructor(defaultLength = 16, characterSets) {
        this.length = defaultLength;
        this.characterSets = characterSets;
    }

    promptUserForPasswordLength(minValue = 8, maxValue = 128) {
        const validateResponse = (response) => {
            if (isNaN(response)) return false;
            else return (response >= minValue && response <= maxValue);
        };

        const defaultValue = this.length;
        const promptText = `Choose password length (must be between ${minValue}-${maxValue})` + (defaultValue ? `\nDefault value = ${defaultValue}` : "");
        const userResponse = prompt(promptText, defaultValue).trim();
        const userResponseIsValid = validateResponse(userResponse);

        if (userResponseIsValid) {
            this.length = +userResponse;
            return;
        }

        alert(`Invalid response: "${userResponse}". Password length must be between ${minValue} and ${maxValue}`);

        return this.promptUserForPasswordLength(minValue, maxValue);
    }

    characterSetPrompt(characterSet) {
        const validateResponse = (response) => {
            const regex = /^(yes|y|no|n|1|0)$/i;
            return regex.test(response);
        }
        const defaultValue = characterSet.approved ? "yes" : "no";
        const promptText = `Include ${characterSet.name} (yes/no)?` + (defaultValue ? `\nDefault value = ${defaultValue}` : "");
        const userResponse = prompt(promptText, defaultValue).trim();
        const userResponseIsValid = validateResponse(userResponse);
    
        if (userResponseIsValid) {
            if (["yes", "y", "1"].includes(userResponse.toLowerCase())) characterSet.approved = true;
            else characterSet.approved = false;
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