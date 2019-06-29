import { Injectable } from '@angular/core';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';

//eclare var jsPDF: any;

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    constructor() { }

    public CreatePdf() {
        let seft = this;
        this.imgToBase64('/assets/logo.jpg', function (base64) {
            let doc = new jsPDF('p', 'pt', 'letter');
            doc.addImage(base64, 'JPEG', 30, 30, 85, 98);

            doc.setFontSize(25);
            doc.setFontType("bolditalic");
            doc.text('Asociación del Caribe Colombiano', 155, 58);

            doc.setFontSize(12);
            doc.setFontStyle("bold");
            doc.text('NIT: 900.068.024-4', 307, 77);

            doc.setFontSize(11);
            doc.setFontStyle("normal");
            doc.text('Cra 1ra No. 3A - 51 - La Concepción Cartagena', 242, 91);
            doc.text('Teléfonos: 6925257 - 6927878', 283, 104);

            doc.setFont("times");
            doc.setFontStyle("bold");
            doc.setFontSize(21);
            doc.text('LIBRO DE TESORERÍA', 240, 127);

            //doc.rect(38, 130, 500, 15);
            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.setLineWidth(1);
            doc.setDrawColor(0, 0, 0);
            doc.roundedRect(30, 130, 552, 40, 3, 3, 'FD');

            doc.setFont("helvetica");
            doc.setFontSize(10);
            doc.text('IGLASIA:', 33, 164);
            doc.text('SILOE', 80, 164);

            doc.text('MES:', 250, 164);
            doc.text('MARZO', 280, 164);

            doc.text('DE:', 355, 164);
            doc.text('2019', 375, 164);

            doc.text('PAGINA', 440, 164);
            doc.text('1', 490, 164);
            doc.text('DE', 500, 164);
            doc.text('1', 525, 164);

            doc.autoTable({
                startY: 167,
                margin: 30,
                head: [
                    {
                        Nombre: 'NOMBRES',
                        Index: 'Sobre\nNo.',
                        Total: 'TOTAL\nRecibido',
                        Diezmo: 'Diezmo',
                        Ofrenda: 'OFRENDA\nGlobal',
                        Especial: 'OFRENDA\nEspeciales',
                        Observa: 'EXPLICACIÓN'
                    }
                ],
                body: [
                    {
                        Nombre: 'David',
                        Index: '1',
                        Total: 'Sweden',
                        Diezmo: '',
                        Ofrenda: '',
                        Especial: '',
                        Observa: ''
                    },
                    {
                        Nombre: 'Jonny Rojas Del Rio',
                        Index: '1',
                        Total: 'Sweden',
                        Diezmo: '',
                        Ofrenda: '',
                        Especial: '',
                        Observa: ''
                    }
                ],
                tableLineColor: [0, 0, 0],
                tableLineWidth: 1,
                styles: {
                    lineColor: [0, 0, 0],
                    lineWidth: 1
                },
                headStyles: {
                    fillColor: [255, 255, 255],
                    fontSize: 10,
                    textColor: [0, 0, 0],
                    halign: 'center',
                    valign: 'middle'
                },
                bodyStyles: {
                    fontSize: 10,
                    textColor: [0, 0, 0],
                    halign: 'center'
                },
                columnStyles: {
                    Nombre: {
                        minCellWidth: 50,
                    },
                    Index: {
                        minCellWidth: 2,
                    },
                    Observa: {
                        minCellWidth: 50,
                    }
                }
            });

            doc.text('Iglesia Mundial   20%', 35, 718);
            doc.text('Desarrollo Mision    20%', 35, 735);
            doc.text('Desarrollo Zonal ó Distrital   10%', 35, 752);
            doc.text('Total Fondos Asociación', 35, 770);

            doc.text('$', 260, 718);
            doc.text('$', 260, 735);
            doc.text('$', 260, 752);
            doc.text('$', 260, 770);

            doc.setDrawColor(0);
            doc.setFillColor(255, 255, 255);
            doc.setLineWidth(1);
            doc.setDrawColor(0, 0, 0);
            doc.roundedRect(275, 704, 85, 16, 2, 2, 'FD');
            doc.roundedRect(275, 723, 85, 16, 2, 2, 'FD');
            doc.roundedRect(275, 742, 85, 16, 2, 2, 'FD');
            doc.roundedRect(275, 761, 85, 16, 2, 2, 'FD');

            doc.roundedRect(485, 704, 85, 16, 2, 2, 'FD');
            doc.roundedRect(485, 723, 85, 16, 2, 2, 'FD');
            doc.roundedRect(485, 742, 85, 16, 2, 2, 'FD');

            doc.text('Iglesia Local    50%', 390, 718);
            doc.text('Ofrenda Especial', 390, 735);
            doc.text('Total Iglesia Local', 390, 752);

            doc.save("prueba.pdf");
        });
    }

    private readTextFile(file, callback) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    callback(allText);
                }
            }
        }
        rawFile.send(null);
    }

    private imgToBase64(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                let imgVariable = reader.result;
                callback(imgVariable.toString().replace('text/xml', 'image/jpeg'));
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.send();
    }
}
