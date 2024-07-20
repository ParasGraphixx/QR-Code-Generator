document.getElementById('qrForm').addEventListener('submit', function(event) {
            event.preventDefault();
            var name = document.getElementById('name').value;
            var contact = document.getElementById('contact').value;
            var email = document.getElementById('email').value;
            var company = document.getElementById('company').value;
        
            var vCard = `BEGIN:VCARD
VERSION:3.0
N:${name};;;;
FN:${name} (${company})
ORG:${company}
TEL;TYPE=CELL:${contact}
EMAIL;TYPE=INTERNET:${email}
END:VCARD`;

            document.getElementById('qrcode').innerHTML = '';

            var qrcode = new QRCode(document.getElementById("qrcode"), {
                text: vCard.trim(),
                width: 160,
                height: 160,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });

            setTimeout(function() {
                var qrCanvas = document.querySelector('#qrcode canvas');
                if (qrCanvas) {
                    var qrImg = qrCanvas.toDataURL("image/png");
                    var downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = qrImg;
                    downloadLink.download = `${name} (${company}).png`;
                    downloadLink.textContent = 'Download QR Code';
                    downloadLink.style.display = 'block';
                } else {
                    console.error('QR code generation failed.');
                }
            }, 500);
        });