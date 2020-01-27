var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var svg = require("./svg");

module.exports = function (data, client) {

    // Start by getting item data from tackboard, and converting it into a getting array of objects for the table code.
    // Initialize qty object.
    let qty = {};
    data.forEach((item, i) => {
        // Update the qty object with the item's SKU
        // If the SKU exists, the value becomes 1 + the current value of the SKU
        // Otherwise, add 0, creating the SKU in the process and setting the value to 1 (1 + 0).
        qty[item.item.sku] = 1 + (qty[item.item.sku] || 0);
    })
    // Initalize Final Table data.
    let tableData = [];
    // Loop through the qty object, via an array of it's keys
    Object.keys(qty).forEach(item => {
        // Loop through the data again, this time, we are comparing SKUs.
        data.forEach(subItem => {
            // If the SKU matches, make a new object, with the item's qty, and the item data.
            if (subItem.item.sku === item) {
                let obj = {
                    qty: qty[item],
                    item: subItem.item
                };
                // .some is an Array method that checks if an element passes a test (true or false).  Here, we are checking if the new object's SKU already exists in our tableData Array.
                if (!tableData.some(row => row.item.sku === obj.item.sku))
                    //  If it doesn't exist, add to the array
                    tableData.push(obj);
            }
        })
    })

    // Create the tableBody array.  Default row is the "Header" row, stylized by the "tableHeader" style.
    let tableBody = [[
        { text: "Qty", style: 'tableHeader', alignment: "center" },
        { text: "Description", style: 'tableHeader', alignment: "center" },
        { text: "Vendor", style: 'tableHeader', alignment: "center" },
        { text: "SKU", style: 'tableHeader', alignment: "center" },
    ]];
    // Using the converted item data, loop through each item, and push a new object to the "row" array.
    // Each "row" of the table is an array of objects.
    tableData.forEach(item => {
        let row = [];
        row.push({ text: item.qty, alignment: "center" });
        row.push({ text: item.item.description, link: item.item.url, style: "linkText" });
        row.push({ text: item.item.vendor, alignment: "center" });
        row.push({ text: item.item.sku, alignment: "center" });
        // Push the row array to the tableBody array.
        tableBody.push(row);
    });

    let dd = {
        pageOrientation: "landscape",
        // Page metadata        
        info: {
            title: "Report for " + client
        },
        //Sets the background layer.
        background: function (currentPage, pageSize) {
            return [
                {
                    svg: svg,
                    alignment: "center",
                    // Dynamically centers the background image.  108 is the height of the SVG, per svg.js
                    margin: [0, (pageSize.height - 108) / 2, 0, 0],
                }
            ]
        },
        content: [
            { text: 'Item List for Client: ' + client, style: 'header', alignment: "center" },
            // Create a column section, with the left and right columns with empty text
            // Center column is the table.  This setup will center a table if it doesn't fully extend to the sides of the page.
            {
                columns: [
                    { width: "*", text: '' },
                    {
                        width: 'auto',
                        table: {
                            headerRows: 1,
                            // Order is the same as the order in tableBody array, listed above.  You must list a width for each entry.
                            widths: ["auto", "*", "*", "auto"],
                            body: tableBody,
                            alignment: "center",
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 2 : 1;
                            },
                            vLineWidth: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                            },
                            hLineColor: function (i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                            },
                            vLineColor: function (i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                            },
                        }
                    },
                    { width: "*", text: '' },
                ]
            }
        ],
        styles: {
            header: {
                fontSize: 24,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 0, 0, 5]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            },
            linkText: {
                color: "blue",
                decoration: "underline"
            }
        },

    }
    // Download PDF.  Default file name is "Item List - <Client Name>.pdf"
    // pdfMake.createPdf(dd).download(`Item List - ${client}`);

    // Open PDF in new tab
    pdfMake.createPdf(dd).open();
    
    // Print PDF in new Window
    // pdfMake.createPdf(dd).print();
}

