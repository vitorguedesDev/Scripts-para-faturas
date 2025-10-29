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
    let list = []

    if (isConsulta()) {
        const remessas = getRemessas()
        remessas.forEach(remessa => {
            let custo = Number(document.getElementById(`custo_${remessa}`).value)
            if (custo !== 0) list.push(remessa)
        })
    } else {
        let custos = document.querySelectorAll('#custo')
        custos.forEach(el => {
            let custo = Number(el.value)
            if (custo === 0) list.push(custo)
        })
    }

    return list
}

let custosZerados = getCustos()

console.clear()
custosZerados.forEach(el => console.log(el))
console.info('Total de zeradas:', custosZerados.length)
