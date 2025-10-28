// Pega os custos zerados

function startScript() {
    const custos = document.querySelectorAll("#custo")
    let custosEncontrados = new Set()

    console.clear()

    for (let custo of custos) {
        custo.value == "0.00" ? console.log(custo.getAttribute("minuta")) : null
        if (Number(custo.value) > 0) {
            custosEncontrados.add(Number(custo.value))
        }
    }


    custosEncontradosConverted = [...custosEncontrados].sort((a, b) => a - b)

    console.log("Custos encontrados (diferentes de zero):")
    custosEncontradosConverted.forEach(element => {
        console.log('R$', element.toFixed(2))
    })
}

console.clear()
startScript()
