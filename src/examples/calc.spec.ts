export function add(number1: number, number2: number ) {
    return number1 + number2
}

describe('Initial test', () => {
    it('add function', () => {
        const result = add(1,2)
        expect(result).toEqual(3)
    })
})