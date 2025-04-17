export function createRandomGenerator(alphabet) {
    return {
        getRandomChar: ()=>{
            return alphabet[Math.floor(Math.random()*alphabet.length)].toLowerCase();
        }
    }
}
