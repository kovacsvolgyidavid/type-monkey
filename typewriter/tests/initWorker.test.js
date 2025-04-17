import { initWorker } from "../initWorker";

test('basic initWorker', ()=>{
    const text = 'aBcD';
    const result = initWorker([4,8], 'asdf', 'asdfasdf');
    expect(result('a')).toBe(false);
    expect(result('s')).toBe(false);
    expect(result('a')).toStrictEqual([{
        foundText: 'asdfas',
        startingIndex: 4,
    },
    {
        foundText: 'asdf',
        startingIndex: 8,
    },
])
})