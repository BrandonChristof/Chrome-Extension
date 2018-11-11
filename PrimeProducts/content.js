/*
    Written by: Brandon Christof
    Last Modified: 2018-10-6
    This application will take most numbers in a webpage, and print it
    either as it's product of primes in red, or a prime number in cyan
*/
chrome.runtime.onMessage.addListener(gotMessage);

//Prime numbers are Cyan
//Composite numbers are Red
var primeColour = "cyan";
var compColour = "red";

function gotMessage(message, sender, sendResponse){
    
    //Gets most of the content on webpage
    let p = document.getElementsByTagName('p');
    let t = document.getElementsByTagName('time');
    let h = document.getElementsByTagName('h1');
    let h2 = document.getElementsByTagName('h2');
    let h3 = document.getElementsByTagName('h3');
    let h4 = document.getElementsByTagName('h4');
    let s = document.getElementsByTagName('span');
    
    if (message === "clicked"){
        
        checkElements(p);
        checkElements(t);
        checkElements(h);
        checkElements(h2);
        checkElements(h3);
        checkElements(h4);
        checkElements(s);
    }
}

function checkElements(doc){
    
    for (let item of doc){
        
        let arr = item.textContent.split(' ');
        let modText = '';
            
        for (let c of arr){
            
            //Checks each element if it's a number
            if (!isNaN(c)){
                
                //If a number is prime, colours it Cyan
                //If a number is composite, gets the prime factorizations and colours it Red
                if(c != 1 & isPrime(c) || c == 2) modText += '<font color="' + primeColour + '">' + c + '</font>' + ' ';
                else modText += '<font color="' + compColour + '">' + getPrimeProducts(c) + '</font>' + ' ';
                
                continue;
            }
            else{
                
                var counter = 1;
                var counter2 = 0;
                var addText = true;
                
                //Checks each element if it contains a number, and determines whether it's prime or composite
                while(counter2 < c.length){
                    
                    while(counter < c.slice(counter2, c.length).length){
                        
                        if (!isNaN(c.slice(counter2, c.length))){
                            
                            if(isPrime(c.slice(counter2, c.length))) modText += addTextNum(c, primeColour, 0, counter2);
                            else modText += addTextNum(c, compColour, 0, counter2);
                            
                            addText = false;
                            counter, counter2 = c.length;
                        }
                        else if (!isNaN(c.slice(counter2, 0-counter))){
                            
                            if(isPrime(c.slice(counter2, 0-counter))) modText += addTextNum(c, primeColour, counter, counter2);
                            else modText += addTextNum(c, compColour, counter, counter2);
                            
                            c = c.slice(0-counter, c.length);
                            counter, counter2 = 0;
                        }
                        counter += 1; 
                    }
                    counter = 1;
                    counter2 += 1;
                }
                if(addText || c.length == 1) modText += c + ' ';
            } 
        }
        item.innerHTML = modText;
    }
}

//Returns True if num is prime, return false otherwise
function isPrime(num){
    
    if(!(Number.isInteger(parseFloat(num))) || num <= 1) return false;
    else if (num == 2) return true;
    
    var count = 2;
    
    while (count <= Math.ceil((Math.sqrt(num)))){
        
        if(num % count == 0) return false;
        
        count += 1;
    }
    return true;
}

//Returns string of prime factorizations of x
function getPrimeProducts(x){
    
    if(!(Number.isInteger(parseFloat(x))) || x <= 1) return x;
    
    var primeNums = '';
    var count = 2;
    
    while (count <= x){
        if(x % count === 0 && isPrime(count)){
            primeNums += count + "*";
            x = x / count;
            continue;
        }
        else if(isPrime(x)) return (primeNums += x);
        count += 1;
    }
    return primeNums.slice(0, -1);
}

//Takes a string that contains a number, returns it with a cyan prime, or red composite
function addTextNum(str, col, ctr1, ctr2){
    
    if(ctr1 == 0) return str.slice(0, ctr2) + '<font color="' + col + '">' + getPrimeProducts(str.slice(ctr2, str.length)) + '</font>' + ' ';
    else return str.slice(0, ctr2) + '<font color="' + col + '">' + getPrimeProducts(str.slice(ctr2, 0-ctr1)) + '</font>';
}