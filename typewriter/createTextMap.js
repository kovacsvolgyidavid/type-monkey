export function createTextMap(text) {
    if(text.length<4){
        throw new Error('Text is not long enough')
    }
    const textMap = {};
    for (let pos1 = 0; pos1 < text.length - 3; pos1++) {
        const pos2 = pos1 + 1;
        const pos3 = pos1 + 2;
        const pos4 = pos1 + 3;
        const textShard = text[pos1] + text[pos2] + text[pos3] + text[pos4];
        const key = textShard.toLowerCase();
        if (!textMap[key]) {
            textMap[key] = [];
        }
        textMap[key].push(pos4 + 1);
    }
    return textMap;
}
