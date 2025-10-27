let password = document.getElementById('pass');
let key = document.getElementById('key');
let output = document.getElementById('password');
const unsafeChars = new Set([32, 34, 37, 38, 39, 47, 58, 59, 60, 61, 62, 63, 64,
    91, 92, 93, 96, 123, 124, 125, 126, 127]);

function passHash(pass, key) {
    // Init of total var
    let keyNumTotal = 0;
    // Split key string by character and add character ascii values to totalnum
    key.split('').forEach(letter => {
        keyNumTotal += letter.charCodeAt(0);
    });
    // Loop through each ascii num in pass and times by (keyNumTotal - 2(on each it(number of characters)))
    let numString = '';
    pass.split('').forEach(letter => {
        numString += String(letter.charCodeAt(0) * keyNumTotal);
        keyNumTotal -= (key.length * 2);
    })
    // Use if (x * 1.5) % 2 = 0 == True (is odd or even) to decide whether to use 1 or 2 nums with odd being one and ev being 2
    // Init of finallpass str
    let finalPass = '';
    // Get base to work off in loop
    let oddEvenBase = pass.length + key.length;
    for (let i = 0; i < numString.length; i++) {
        // Set current char as blank for input
        currentCharInt = '';
        // If even
        if (oddEvenBase % 2 == 0) {
            currentCharInt += numString[i];
            i++;
            currentCharInt += numString[i];
        }
        else {
            currentCharInt = numString[i];
        }
        // Convert currentCharInt to Int
        currentCharInt = parseInt(currentCharInt) + 32;
        // Problematic Character sort
        while (unsafeChars.has(currentCharInt)) {
            currentCharInt = ((currentCharInt * currentCharInt) % 94) + 33;
            if (unsafeChars.has(currentCharInt)) {
                currentCharInt++;
                if (currentCharInt > 126) currentCharInt = 33;
            }
        }
        finalPass += String.fromCharCode(Math.trunc(currentCharInt));
        // Do math for oddEvenBase
        oddEvenBase = Math.trunc(oddEvenBase * 1.5);
    }
    return finalPass;
}

document.getElementById('submit').addEventListener('click', () => {
    let hashedPass = passHash(password.value, key.value);
    document.getElementById('password').textContent = hashedPass;
})
// (sum of ascii values of key word) * (ascii value of each letter of pass) = x
// password = (ascii conv. of two digits of x) + (ascii conv. of 1 digit of x)... until one or two digits are left, convert final digit/two digits