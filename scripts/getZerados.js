// Pega os custos zerados

function startScript() {
    const custos = document.querySelectorAll("#custo")
    let custosEncontrados = new Set()

    console.clear()
    let zerados = []

    for (let custo of custos) {
        if (Number(custo.value) !== 0) {
            custosEncontrados.add(Number(custo.value))
        } else zerados.push(custo.getAttribute("minuta"))
    }

    if (zerados.length > 0) {
        console.log("Minutas com custo zerado:")
        zerados.forEach(element => {
            console.log(element)
        })
    } else console.log("Nenhuma minuta com custo zerado encontrada.")

    custosEncontradosConverted = [...custosEncontrados].sort((a, b) => a - b)

    console.log("Custos encontrados (diferentes de zero):")
    custosEncontradosConverted.forEach(element => {
        console.log('R$', element.toFixed(2))
    })
}

console.clear()
startScript()
