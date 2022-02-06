let splitTexts = [];

function checkChars() {
    document.getElementById('word-count').innerText = 'Chars Count: ' + document.getElementById('type-here').value.length;
}

function split() {
    const limiter = document.getElementById('input-limit').value;
    const LIMIT = (limiter.length > 0)?parseInt(limiter):2000;
    const textToSplit = document.getElementById('type-here').value;

    splitTexts.length = 0;

    if (textToSplit.length > LIMIT) {
        for (let i = 0; i<textToSplit.length; i += LIMIT) {
            if (i + LIMIT < textToSplit.length) {
                splitTexts.push(textToSplit.substring(i, i + LIMIT));
            }
            else {
                splitTexts.push(textToSplit.substring(i, textToSplit.length));
            }
        }
    }
    else {
        splitTexts.push(textToSplit);
    }
    
    const splitHtml = splitTexts.map((element, index) => {
        return `<p id='para-${index}'>${element}</p>
        <button onclick="copyText(${index}, 'copybtn-${index}')" id="copybtn-${index}">Copy Paragraph ${index + 1}</button>
        `;
    });
    document.getElementById("text-here").innerHTML = splitHtml.join('');
}

async function copyText(identity = 'type-here', btnId = 'copy-button') {
    if (typeof identity === 'string') {
        await navigator.clipboard.writeText(document.getElementById(identity).value);
    }
    else {
        await navigator.clipboard.writeText(splitTexts[identity]);
    }
    document.getElementById(btnId).innerText = 'Copied!';
    setTimeout(() => {
        document.getElementById(btnId).innerText = 'Copy Again!';
    }, 1000);
}