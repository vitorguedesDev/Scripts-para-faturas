// Atualiza valor personalizado em faturas novas

const tableRows = document.querySelectorAll("#users > tbody > tr")



function validateNumberInput(value) {
    if (value === null || value.trim() === "") {
        throw new Error("Nenhum valor informado!")
    }

    const convertedValue = Number(value.replace(',', '.'))

    if (isNaN(convertedValue)) {
        throw new Error("Valor informado é inválido!")
    }

    return convertedValue
}


function setValuesToUpdate() {
    let currentValue, newValue

    const currentValuePrompt = window.prompt("Informe o valor atual: ")
    try {
        currentValue = validateNumberInput(currentValuePrompt)
    } catch (e) {
        alert(e.message)
        console.error(e.message)
        throw "Operação cancelada: Valor atual inválido."
    }

    let newValueIsValid = false
    do {
        const newValuePrompt = window.prompt("Informe o novo valor: ")
        try {
            newValue = validateNumberInput(newValuePrompt)
            newValueIsValid = true
        } catch (e) {
            alert(e.message)
            console.error(e.message)
            if (newValuePrompt === null) {
                throw "Operação cancelada pelo usuário."
            }
        }
    } while (!newValueIsValid)


    if (!confirm(`Alterar valores ${currentValue.toFixed(2)} para ${newValue.toFixed(2)}?`)) {
        alert("Operação cancelada pelo usuário.")
        throw "Operação cancelada pelo usuário."
    }

    return { currentValue, newValue }
}


function updateValues() {
    let values
    try {
        values = setValuesToUpdate()
    } catch (e) {
        console.log(e)
    }

    const { currentValue, newValue } = values
    let updatedRemessas = []

    for (let row of tableRows) {
        let inputCusto = row.children[17].children[1]

        if (Number(inputCusto.value) === currentValue) {
            inputCusto.value = newValue.toFixed(2)
            updatedRemessas.push(row.getAttribute('remessa'))
        }
    }

    if (updatedRemessas.length === 0) {
        alert(`Nenhuma remessa encontrada com o valor ${currentValue.toFixed(2)}.`)
        return "Nenhuma remessa encontrada com o valor especificado."
    }

    alert(`Valores atualizados para ${newValue.toFixed(2)} em ${updatedRemessas.length} remessas.`)
    return updatedRemessas
}

console.clear()
updateValues()
