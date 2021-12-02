// make all the action disable before search
document.getElementById('book-numbers').style.display = 'none'
document.getElementById('spinner').style.display = 'none'
document.getElementById('error-message').style.display = 'none'
document.getElementById('error-message2').style.display = 'none';
const searchField = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';

    // empty input
    if (searchText === "") {
        displayError();
    } else {
        document.getElementById('error-message').style.display = 'none'
        document.getElementById('spinner').style.display = 'block'

        const url = `https://openlibrary.org/search.json?q=${searchText}`
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.docs, data.numFound))
    }

}
//  Error handling
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none'
    document.getElementById('book-numbers').style.display = 'none';
    document.getElementById('display-result').textContent = '';
}

// Display Search Result is here/
const displaySearchResult = (books, bookNumber) => {
    const displayResult = document.getElementById('display-result');

    document.getElementById('spinner').style.display = 'none'

    // clear privious  data 
    document.getElementById('display-result').textContent = "";

//    if user input invalid name


    if (bookNumber === 0) {
        displayError();
        document.getElementById('error-message2').style.display = 'block';
        document.getElementById('book-numbers').style.display = 'none'


    } else {
        // when everything is ok then remove the error
        document.getElementById('error-message2').style.display = 'none';
        document.getElementById('error-message').style.display = 'none'
        document.getElementById('book-numbers').style.display = 'block'

        // book counter
        document.getElementById('book-numbers').innerText = `You have found ${bookNumber} Books! `;

        books.forEach(book => {
            const resultDiv = document.createElement('div');

            resultDiv.classList.add('col');
            resultDiv.innerHTML = `
            <div class="card h-100">
                            <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Title : ${book.title}</h5>
                                <p class="card-text">Author Name : ${book.author_name ? book.author_name : 'N/A'} </p>
                                <p class="card-text">Publisher : ${book.publisher ? book.publisher : 'N/A'} </p>
                                <p class="card-text">First Publish : ${book.first_publish_year ? book.first_publish_year : 'N/A'} </p>
                            </div>
                        </div>
            `;
            displayResult.appendChild(resultDiv);
        })
    }


}
