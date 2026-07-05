document.addEventListener('DOMContentLoaded', function () {
    function setupQuoteButtons() {
        const randomBtn = document.querySelector('#random-quote-btn');
        const twitterShareButton = document.querySelector('#twitter-share-button');
        const quoteDisplay = document.querySelector('#random-quote-display');
        const quoteButtonsExist = randomBtn !== null && twitterShareButton !== null && quoteDisplay !== null;
        let quoteDeck = [];
        let currentQuoteKey = getQuoteKey(quoteDisplay);

        function getQuoteKey(quoteElement) {
            if (quoteElement === null) {
                return '';
            }

            return quoteElement.innerText.trim().replace(/\s+/g, ' ');
        }

        function getRandomIndex(maxExclusive) {
            const maxUint32 = 0x100000000;

            if (maxExclusive <= 0) {
                return 0;
            }

            const cryptoObject = window.crypto || window.msCrypto;
            if (maxExclusive <= maxUint32 && cryptoObject !== undefined && typeof cryptoObject.getRandomValues === 'function') {
                const randomValues = new Uint32Array(1);
                const limit = maxUint32 - (maxUint32 % maxExclusive);

                do {
                    cryptoObject.getRandomValues(randomValues);
                } while (randomValues[0] >= limit);

                return randomValues[0] % maxExclusive;
            }

            return Math.floor(Math.random() * maxExclusive);
        }

        function shuffleQuotes(quotes) {
            const shuffledQuotes = quotes.slice();

            for (let index = shuffledQuotes.length - 1; index > 0; index--) {
                const randomIndex = getRandomIndex(index + 1);
                const currentQuote = shuffledQuotes[index];
                shuffledQuotes[index] = shuffledQuotes[randomIndex];
                shuffledQuotes[randomIndex] = currentQuote;
            }

            return shuffledQuotes;
        }

        function collectQuotes() {
            const quoteContainers = Array.from(document.querySelectorAll('.quote-container'));

            return quoteContainers.flatMap(container => Array.from(container.querySelectorAll('blockquote')))
                .map(quote => ({ html: quote.innerHTML, key: getQuoteKey(quote) }))
                .filter(quote => quote.key.length > 0);
        }

        function refillQuoteDeck() {
            quoteDeck = shuffleQuotes(collectQuotes());

            if (quoteDeck.length <= 1 || currentQuoteKey.length === 0 || quoteDeck[0].key !== currentQuoteKey) {
                return;
            }

            const replacementQuoteIndex = quoteDeck.findIndex((quote, index) => index > 0 && quote.key !== currentQuoteKey);
            if (replacementQuoteIndex === -1) {
                return;
            }

            const repeatedQuote = quoteDeck[0];
            quoteDeck[0] = quoteDeck[replacementQuoteIndex];
            quoteDeck[replacementQuoteIndex] = repeatedQuote;
        }

        function updateQuoteWrapperState() {
            const quoteWrapper = document.querySelector('#random-quote-wrapper');

            if (quoteWrapper === null) {
                return;
            }

            quoteWrapper.classList.add('random-quote-wrapper--scrollable');
            quoteWrapper.scrollTop = 0;

            const quoteOverflows = quoteWrapper.scrollHeight > quoteWrapper.clientHeight;
            quoteWrapper.classList.toggle('random-quote-wrapper--scrollable', quoteOverflows);
            quoteWrapper.scrollTop = 0;
        }

        if (quoteButtonsExist) {
            updateQuoteWrapperState();

            randomBtn.addEventListener('click', () => {
                if (quoteDeck.length === 0) {
                    refillQuoteDeck();
                }

                const nextQuote = quoteDeck.shift();
                if (nextQuote === undefined) {
                    return;
                }

                quoteDisplay.innerHTML = nextQuote.html;
                currentQuoteKey = nextQuote.key;
                updateQuoteWrapperState();
            });

            twitterShareButton.addEventListener('click', () => {
                const quoteElement = document.querySelector('#random-quote-display p');
                const quoteText = quoteElement.innerText;
                const authorElement = document.querySelector('#random-quote-display cite');
                const authorName = authorElement.innerText;
                const encodedQuoteText = encodeURIComponent(`${quoteText}\n\n-${authorName}`);
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedQuoteText}`;
                window.open(twitterUrl);
            });
        }
    }

    setupQuoteButtons();
});