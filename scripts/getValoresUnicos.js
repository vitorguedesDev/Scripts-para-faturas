function isConsulta() {
    return window.location.pathname.includes('consultaFatura')
}

function getRows() {
    return document.querySelectorAll("#users > tbody > tr")
}

function getRemessas() {
    const rows = getRows()
    let list = []
    for (let row of rows) {
        list.push(row.getAttribute('remessa'))
    }
    return list
}

function getCustos() {
    let list = new Set()

    if (isConsulta()) {
        const remessas = getRemessas()
        remessas.forEach(remessa => list.add(
            document.getElementById(`custo_${remessa}`).value))
    } else {
        document.querySelectorAll('#custo')
            .forEach(el => list.add(el.value))
    }

    return new Set([...list].sort((a, b) => a - b))
}

let custos = getCustos()

console.clear()
console.log('Valores encontrados:')
custos.forEach(el => console.log(el))
