function computeVD(body: string): string {
    let sum = 0
    let factor = 2
    for ( let i = body.length - 1; i >= 0; i--) {
        const digit = body[i]
        const numDigit = Number(digit)
        sum += factor * numDigit
        if (factor < 7) factor ++
        else factor = 2
    }
    const rawDigit = 11 - (sum % 11)
    if (rawDigit === 11) return "0"
    if (rawDigit === 10) return "K"
    return String(rawDigit)
}

function rutVerify(rut: string) {
    const [body, vD] = rut.split('-')
    return vD === computeVD(body)
}

export default rutVerify