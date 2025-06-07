function expand() {
    const wrapper = document.getElementById('wrapper');
    wrapper.style.maxWidth = '1200px';
    wrapper.style.width = '100%';
    
    const footer = document.getElementById('footer')
    footer.style.maxWidth = '1200px';
    footer.style.width = '100%';
    
    const firstCellsInRows = document.querySelectorAll('td:first-child');
    firstCellsInRows.forEach(function(cell) {
        cell.style.width = '120px';
    });
    
    // Override colgroup and col elements
    const colWidths = [
        '120px', 'auto', '30px', '50px', '40px', '100px', '170px',
        'auto', 'auto', 'auto', 'auto', 'auto'
    ];

    // Function to set col widths
    function setColWidths(cols) {
        cols.forEach((col, index) => {
            if (index < colWidths.length) {
                col.style.width = colWidths[index];
            }
        });
    }

    // Override colgroup elements
    const colgroups = document.querySelectorAll('colgroup');
    colgroups.forEach(colgroup => {
        const cols = colgroup.querySelectorAll('col');
        setColWidths(cols);
    });
}

expand()
