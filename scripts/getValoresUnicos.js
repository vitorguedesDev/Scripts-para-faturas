//Demonstra valores unicos das remessas calculadas

function isConsulta() {
    return window.location.pathname.includes('consultaFatura');
}


function getRows() {
    return document.querySelectorAll("#users > tbody > tr");
}


function getRemessas() {
    const rows = getRows();
    let list = [];
    for (let row of rows) {
        list.push(row.getAttribute('remessa'));
    }
    return list;
}


function addToMap(map, value) {
    if (map.has(value)) {
        map.get(value).quantity++;
        return;
    }
    map.set(value, { price: value, quantity: 1 });
}


function getCustos() {
    const priceMap = new Map();

    if (isConsulta()) {
        const remessas = getRemessas();
        remessas.forEach(remessa => addToMap(
            priceMap, document.getElementById(`custo_${remessa}`).value));
    } else {
        document.querySelectorAll('#custo')
            .forEach(el => addToMap(priceMap, el.value));
    }

    return new Map(
        [...priceMap.entries()].sort((a, b) => b[1].quantity - a[1].quantity));
}


function showMapResults(map) {
    for (let [key, value] of map) {
        console.log(`${((value.quantity / rowsCount) * 100)}% -> R$ ${parseFloat(key).toFixed(2)}`);
    }
}

const rowsCount = getRows().length;
let custos = getCustos();

console.clear();

showMapResults(custos);
