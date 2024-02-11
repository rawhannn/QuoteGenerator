'use strict'
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeloading(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function newQuote(){
    showLoading();
    const quote = apiQuotes[Math.trunc(Math.random()*apiQuotes.length)];
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.textContent = quote.text;
    completeloading();
}

async function getQuotes(){
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(error) {
        alert('Error occured', error);
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_black');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();