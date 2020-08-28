const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// SHOW LOADING
function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// HIDE LOADING
function hideLoading(){
    if( !loader.hidden ){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Random quote

// GET QUOTE FROM API
async function getQuote(){
    showLoading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // IF AUTHOR IS BLANK CREDIT TO UNKNOWN
        if(data.quoteAuthor === '' ){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // IF QUOTE IS TOO LONG REDUCE FONT SIZE
        if( data.quoteText.length > 120 ){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }        
        
        quoteText.innerText = data.quoteText;

        // STOP LOADER AND SHOW BOX
        hideLoading();

    }catch(error){
        getQuote();
    }
}

// TWEET QUOTE
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//ON LOAD
getQuote();