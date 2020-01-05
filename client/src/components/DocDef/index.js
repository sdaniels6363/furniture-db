var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var svg = require("./svg");

module.exports = function (data, client) {

    let tableBody = [[
        { text: "Description", style: 'tableHeader', alignment: "center" }, 
        { text: "Vendor", style: 'tableHeader', alignment: "center" }, 
        { text: "SKU", style: 'tableHeader', alignment: "center" }]];
    data.forEach(item => {
        let row = [];
        row.push(item.item.description);
        row.push(item.item.vendor);
        row.push(item.item.sku);
        tableBody.push(row);
    });

    let dd = {
        pageOrientation: "landscape",
        background: {
            svg: svg,
            alignment:"center",
            margin: [0, 244],
            opacity: .5
        },
        info: {
            title: "Report for " + client
        },
        content: [
            { text: 'Selected Items for Client: ' + client, style: 'header', alignment: "center" },
            {
                table: {
                    alignment: "center",
                    headerRows: 1,
                    widths: ["*","*","*"],
                    body: tableBody
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
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
            }
        },

    }
    pdfMake.createPdf(dd).open({}, window);
}

