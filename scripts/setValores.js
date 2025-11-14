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


function setCustos(newValue) {
    newValue = newValue.toFixed(2);
    const remessas = getRemessas();
    if (isConsulta()) {
        remessas.forEach(remessa => {
            document.getElementById(`custo_${remessa}`).value = newValue
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

const qntLinhas = null;

console.clear();
setCustos(7.65);

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
