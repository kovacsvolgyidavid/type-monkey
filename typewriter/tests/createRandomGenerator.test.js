import { createRandomGenerator } from "../createRandomGenerator";

test('basic initWorker', ()=>{
    const text = 'aBcD';
    const gen = createRandomGenerator([...'aBcD ']);
    const expectedResults = ['a', 'b', 'c', 'd', ' '];

    for(let i = 0; i<1000; i++){
        expect(expectedResults.includes(gen.getRandomChar())).toBe(true);
    }

})