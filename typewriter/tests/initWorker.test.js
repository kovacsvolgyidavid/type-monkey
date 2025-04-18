import { initWorker } from "../initWorker";

test('basic initWorker', ()=>{
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
test('basic initWorker', ()=>{
    const result = initWorker([4,12], 'asdf', 'asdfdiffasdfdff');
    expect(result('d')).toBe(false);
    expect(result('i')).toBe(false);
    expect(result('f')).toBe(false);
    expect(result('h')).toStrictEqual([{
        foundText: 'asdfdif',
        startingIndex: 4,
    },
    {
        foundText: 'asdfd',
        startingIndex: 12,
    },
])
})