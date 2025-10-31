function isConsulta() {
    return window.location.pathname.includes('consultaFatura')
}

function getRows(qntLinhas) {
    const rows = document.querySelectorAll("#users > tbody > tr")
    return qntLinhas > 0 ? Array.from(rows).slice(0, qntLinhas) : rows
}

function getRemessas() {
    const rows = getRows(qntLinhas)

    let list = []
    for (let row of rows) {
        list.push(row.getAttribute('remessa'))
    }
    return list
}

function setCustos(newValue) {
    newValue = newValue.toFixed(2)
    if (isConsulta()) {
        const remessas = getRemessas()
        remessas.forEach(remessa => document.getElementById(`custo_${remessa}`).value = newValue)
    } else {
        document.querySelectorAll('#custo')
            .forEach(el => el.value = newValue)
    }
}

const qntLinhas = null

console.clear()
setCustos(7.65)

qntLinhas > 0 ? console.log(`${qntLinhas} linhas alteradas.`) : console.log('Todos os valores foram alterados.')
