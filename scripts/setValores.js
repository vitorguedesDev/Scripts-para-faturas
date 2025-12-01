function isConsulta() {
    return window.location.pathname.includes('consultaFatura');
}


function getRows(qntLinhas) {
    const rows = document.querySelectorAll("#users > tbody > tr");
    return qntLinhas > 0 ? Array.from(rows).slice(0, qntLinhas) : rows;
}


function getRemessas() {
    const rows = getRows(qntLinhas);

    let list = [];
    for (let row of rows) {
        list.push(row.getAttribute('remessa'));
    }
    return list;
}


function getTotal() {
    let somaTotal = 0;
    let lista = [];
    if (isConsulta()) {
        lista = Array.from(document.querySelectorAll('[custo]'));
    }
    else {
        lista = Array.from(document.querySelectorAll('#custo'));
    }
    lista = lista.map(el => Number(el.value));
    somaTotal = lista.reduce((acc, cur) => acc + cur, 0);
    return somaTotal.toFixed(2);
}


function setCustos(newValue) {
    newValue = newValue.toFixed(2);
    if (isConsulta()) {
        remessas.forEach(remessa => {
            document.getElementById(`custo_${remessa}`).value = newValue;
            document.querySelector(`[remessa="${remessa}"]`).children[0].firstChild.setAttribute('frete', newValue);
        });
    } else {
        const custos = Array.from(document.querySelectorAll('#custo')).slice(0, qntLinhas > 0 ? qntLinhas : undefined);
        custos.forEach(el => {
            el.value = newValue;
        });
        remessas.forEach(remessa => document.querySelector(`[remessa="${remessa}"]`).children[0].firstChild.setAttribute('frete', newValue));
    }
}


let qntLinhas = null;
const valorTotal = 800;
const remessas = getRemessas();

console.clear();
setCustos(10.00);

if (getTotal() !== valorTotal) {
    let operacao = Math.sign(valorTotal - getTotal());
    console.log(operacao * Math.abs(valorTotal - getTotal()));
}


// Aviso no console
switch (qntLinhas) {
    case null:
        console.log('Todos os valores foram alterados.');
        break;
    case 1:
        console.log('1 linha alterada.');
        break;
    default:
        console.log(`${qntLinhas} linhas alteradas.`);
}
