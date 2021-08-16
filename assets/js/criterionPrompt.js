const validators = {
    range: (res) => {
        res = res.trim();

        if (isNaN(res)) return false;
        return (res >= 8 && res <= 128);
    },
    binary: (res) => {
        const regex = /^(yes|y|no|n|1|0)$/i;
        return regex.test(res.trim());
    }
}

export const criterionPrompt = (criterion) => {
    const userResponse = prompt(`${criterion.description}\nDefault value = ${criterion.defaultValue}`, criterion.defaultValue);
    const userResponseIsValid = validators[criterion.type](userResponse);

    if (userResponseIsValid) {
        criterion.accepted = true;
        return userResponse;
    }

    return criterionPrompt(criterion);
}