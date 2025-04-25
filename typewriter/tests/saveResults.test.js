import { saveResults } from "../saveResults";


test('basics', async()=>{
    let result = [
        {
            foundText: 'asdfdif',
            startingIndex: 4,
        },
        {
            foundText: 'asdfd',
            startingIndex: 12,
        },
    ]
    const saveMock = jest.fn(()=>{})
    await saveResults(result, saveMock, 2);
    expect(saveMock.mock.calls.length).toBe(0);
    await saveResults(result, saveMock, 2);
    expect(saveMock.mock.calls.length).toBe(1);
    expect(saveMock.mock.calls[0][0]).toStrictEqual({
        'asdfdif#4': 2,
        'asdfd#12': 2
    })
    await saveResults(result, saveMock, 2);
    expect(saveMock.mock.calls.length).toBe(1);
    await saveResults(result, saveMock, 2);
    expect(saveMock.mock.calls.length).toBe(2);
    expect(saveMock.mock.calls[1][0]).toStrictEqual({
        'asdfdif#4': 2,
        'asdfd#12': 2
    })
})