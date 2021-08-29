export { addRow, populateTable };

function addRow(table,obj) {

    const tr = table.insertRow(-1);

    for (const property in obj) {
        const tabCell = tr.insertCell(-1);
        tabCell.innerHTML = obj[property];
    }
    const tabCell = tr.insertCell(-1);
    tabCell.className = 'table-action';
    tabCell.innerHTML = '<a href="#"><i class="align-middle" data-feather="trash"></i></a>';
}

function populateTable(table, data) {
    // add json data to the table as rows.
    for (const obj of data) {
        addRow(table, obj);
    }
}


// function to delete a row.
function removeRow(tableId, oButton) {
    const table = document.querySelector(`#${tableId}`);
    table.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
}