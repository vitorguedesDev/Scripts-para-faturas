// Recalcula os valores de custo nas minutas que possuem múltiplas NFs

const tableRows = document.querySelectorAll("#users > tbody > tr")

function recalcValues() {
    let multiNfElements = []
    for (let row of tableRows) {
        let nfCount = row.children[7].children.length + 1
        nfCount > 1 ? multiNfElements.push(row.getAttribute('remessa')) : null
        let inputCusto = row.children[17].children[1]
        inputCusto.value *= nfCount.toFixed(2)
        inputCusto.value = Number(inputCusto.value).toFixed(2)
    }

    if(multiNfElements.Length === 0) {
        alert("Nenhuma minuta com mais de uma NF foi encontrada.")
        return
    }

    console.log(`Minutas com mais de uma NF encontradas: ${multiNfElements.length}`)
    console.log(`Minutas: ${multiNfElements.join(", ")}`)

}

console.clear()
recalcValues()
