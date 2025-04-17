export const initWorker = (indexArrays, textShard, text) => {
    let results = indexArrays.map(startingIndex=>({
        startingIndex,
        textIndex:startingIndex,
        foundText: textShard,
    }));
    return (nextChar) => {
        results = results.map((result) => {
            if (nextChar === text.charAt(result.textIndex)) {
                return {
                    ...result,
                    textIndex: result.textIndex + 1,
                    foundText: result.foundText + nextChar,
                };
            }
            return {
                ...result,
                stopped: true,
            };
        });
        if (results.some(i => !i.stopped)) {
            return false;
        }
        return results.map(result=>({
            foundText: result.foundText,
            startingIndex: result.startingIndex
        }));
    };
};
