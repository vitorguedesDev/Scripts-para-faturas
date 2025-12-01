
/** Gera um array de todas as linhas da tabela de remessas
 * @returns {Array<Element>}
*/
function getShipmentList() {
    return Array.from(document.querySelectorAll("tr [remessa]"));
}


/** Obtém todas as datas na fatura
 * @returns {Array<string>}
*/
function getAllDates() {
    const elementsList = Array.from(document.querySelectorAll('tr [remessa] > :nth-child(6)'));
    const stringDates = elementsList.map(el => el.textContent);

    return stringDates;
}


/** Itera em cada data e define o valor por remessa
 * @returns {Array<object>}
*/
function getDateObjects() {
    let dateObjects = [];
    const stringDates = getAllDates();
    const uniqueDates = new Set(stringDates);

    uniqueDates.forEach(
        date => dateObjects.push({
            "date": date,
            "price": (dailyPrice / stringDates.filter(el => el === date).length).toFixed(2)
        }));
    return dateObjects;
}


/** Itera em cada remessa e gera um objeto com minuta e data
 * @returns {Array<object>}
*/
function getShipmentObjects() {
    const shipmentObjects = shipmentList.map(
        el => ({
            "shipment": el.getAttribute('remessa'),
            "date": el.children[5].textContent
        }));

    return shipmentObjects;
}


/** Altera os valores das remessas
 * @returns {null}
*/
function setPrices() {
    shipmentObjects.forEach(obj => {
        let inputValue = document.querySelector(`tr [remessa="${obj.shipment}"] [name="minuta[]"]`);
        let inputVisualValue = document.querySelector(`[minuta='${obj.shipment}']`);

        let price = '0.00';
        try {
            price = dateObjects.find(el => el.date === obj.date).price;
        }
        catch (e) {
            console.error(e)
        }
        finally {
            inputValue.setAttribute('frete', price);
            inputVisualValue.setAttribute('value', price);
        }
    });
}


const dailyPrice = 1200;

const shipmentList = getShipmentList();
const dateObjects = getDateObjects();
const shipmentObjects = getShipmentObjects();


setPrices();
