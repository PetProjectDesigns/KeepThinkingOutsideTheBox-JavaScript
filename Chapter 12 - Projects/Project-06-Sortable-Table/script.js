function sortTable(columnIndex) {
    const table = document.getElementById("sortableTable");
    // Get rows, excluding the header
    const rows = Array.from(table.rows).slice(1);
    // Detect if the column is numeric
    const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText);

    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText.toLowerCase();
        const cellB = b.cells[columnIndex].innerText.toLowerCase();

    if (isNumeric) {
    // Numeric comparison for numbers
        return Number(cellA) - Number(cellB);
    }
    // Alphabetic comparison for text
    return cellA.localeCompare(cellB);
});

// Reorder rows in the table
rows.forEach(row => table.tBodies[0].appendChild(row));
}