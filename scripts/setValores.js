/** 
 * Verifica se é uma já emitida 
 * (os identificadores HTML mudam entre as
 * emitidas e as emissões em andamento)
 * @returns {Boolean}
*/
function isConsulta() {
    return window.location.pathname.includes('consultaFatura');
}


/**
 * Obtém cada linha da tabela
 * que contém os serviços
 * @returns {Array<Element>}
*/
function getRows(qntLinhas) {
    const rows = document.querySelectorAll("#users > tbody > tr");
    return qntLinhas > 0 ? Array.from(rows).slice(0, qntLinhas) : Array.from(rows);
}


/**
 * Obtém o identificador de cada
 * serviço, independente do seu tipo
 * @returns {Array<String>}
*/
function getRemessas() {
    const rows = getRows(qntLinhas);
    let list = rows.map(el => el.getAttribute('remessa'));
    return list;
}


/**
 * Soma todos os valores,
 * considerando os inputs de custo
 * @returns {String}
 */
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


/**
 * Verifica conflitos nas configurações
 * @returns  {Number || null}
 */
function validateData() {
    if (typeof valorIndividual === typeof valorTotal) return false;
    return valorIndividual !== null ? valorIndividual : null;
}


/**
 * Função principal. Altera o valor dos]
 * serviços conforme a configuração informada
 */
function setCustos() {
    if (validateData() === false) {
        console.error('Verifique os valores informados.');
        return;
    }

    let newValue = validateData();

    if (newValue === null) {
        newValue = valorTotal / getRows(null).length;
    }

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


/**
 * Reconfigura variáveis para ajustar
 * diferença no valor total, usando 1
 * centavo por remessa para não gerar
 * custos desnivelados
 */
function switchValues() {
    let result = getTotal();
    qntLinhas = Math.round(Math.abs(valorTotal - result) * 100);
    remessas = getRemessas();
    valorIndividual = (valorTotal / getRows(null).length) + (Math.sign(valorTotal - result) * 0.01);
    valorTotal = null;
}


// Configurações
let qntLinhas = null;
let valorTotal = null;
let valorIndividual = null;

// Inicialização
let remessas = getRemessas();
console.clear();
setCustos();

// Verificação final
if (valorTotal && getTotal() !== valorTotal) {
    switchValues();
    setCustos();
}

// Aviso de finalização
console.info('Operação realizada');
console.log('Valor total: ', getTotal());
