let textFoundCounter = {};
let i = 0;
export async function saveResults(result, saveToDB, bufferSize = 1000) {
    i++;

    result.forEach(res => {
        const key = res.foundText + '#' + res.startingIndex;
        textFoundCounter[key] = (textFoundCounter[key] || 0) + 1;
    });
    if(i>=bufferSize){
        await saveToDB(textFoundCounter);
        textFoundCounter = {};
        i=0;
    }
}
