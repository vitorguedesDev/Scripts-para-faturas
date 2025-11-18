// Recalcula os valores de custo nas minutas que possuem múltiplas NFs

const tableRows = document.querySelectorAll("#users > tbody > tr");

function recalcValues() {
    let multiNfElements = [];
    let nfBiggerFive = [];
    for (let row of tableRows) {
        let nfCount = row.children[7].children.length + 1;
        if (nfCount > 1) {
            multiNfElements.push(row.getAttribute('remessa'));
        }
        if (nfCount >= 5) {
            nfBiggerFive.push(row.getAttribute('remessa'));
        }

        let inputCusto = row.children[17].children[1];

        inputCusto.value *= nfCount.toFixed(2);
        inputCusto.value = Number(inputCusto.value).toFixed(2);
        row.children[0].firstChild.setAttribute('frete', inputCusto.value);
    }

    if (multiNfElements.Length === 0) {
        alert("Nenhuma minuta com mais de uma NF foi encontrada.");
        return;
    }

    if (nfBiggerFive.length > 0) {
        console.warn(`Minutas com mais de 5 NF's encontradas:`);
        console.log(nfBiggerFive.join(', '));
    }
    console.log(`Minutas com mais de uma NF encontradas: ${multiNfElements.length}`);
    console.log(`Minutas: ${multiNfElements.join(", ")}`);
}

console.clear();
recalcValues();

