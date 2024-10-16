// Working add and delete function

const animeTitleForm = document.querySelector('#add-anime-title'); 
const animeArtistForm = document.querySelector('#add-artist'); 
const addButton = document.querySelector('#add-button');

let animeTitleValue = '';
let animeArtistValue = '';

// Handle anime title input
animeTitleForm.addEventListener('input', function(e) {
    animeTitleValue = e.target.value;
});

// Handle anime artist input
animeArtistForm.addEventListener('input', function(e) {
    animeArtistValue = e.target.value;
});

// Add button click event
addButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Check if both title and artist are filled
    if (animeTitleValue && animeArtistValue) {
        addAnimeToPlaylist(animeTitleValue, animeArtistValue);
    } else {
        alert('Both fields are required!');
    }
});

// Function to add the anime to the playlist
function addAnimeToPlaylist(title, artist) {
    // Create new list item
    const li = document.createElement('li');
    li.classList.add('list-searchpart'); // Add class for styling

    const animetitle = document.createElement('p');
    const animeartist = document.createElement('small');
    const deleteBtn = document.createElement('button');
    const hr = document.createElement('hr');

    
    animetitle.textContent = title;
    animeartist.textContent = artist;
    deleteBtn.textContent = 'Delete';

    
    deleteBtn.classList.add('delete');
    animetitle.classList.add('anime-title');
    animeartist.classList.add('artist');

    // Create a wrapper div for title and artist
    const animeInfoDiv = document.createElement('div');
    animeInfoDiv.classList.add('anime-info'); // Add class for styling
    animeInfoDiv.appendChild(animetitle);
    animeInfoDiv.appendChild(animeartist);

    // Append elements to the <li>
    li.appendChild(animeInfoDiv);  
    li.appendChild(deleteBtn);

    
    const list = document.querySelector('#anime-list ul');
    list.appendChild(li);
    list.appendChild(hr);

    // Reset the forms after adding
    animeTitleForm.reset();
    animeArtistForm.reset();

    // Clear the stored values
    animeTitleValue = '';
    animeArtistValue = '';
}

// Handle the delete functionality
const list = document.querySelector('#anime-list ul');

list.addEventListener('click', function(e) {
    if (e.target.className === 'delete') {
        const li = e.target.parentElement;
        const hr = li.nextElementSibling;

        if (hr && hr.tagName === 'HR') {
            hr.parentNode.removeChild(hr);
        }
        list.removeChild(li);
    }
});



// searchbar function
const searchBar = document.querySelector('.search-anime-part'); 
const List = document.querySelector('#anime-list ul');

searchBar.addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase(); 
    const animeItems = list.getElementsByTagName('li'); 

    Array.from(animeItems).forEach(function(animeItem) {
        const title = animeItem.querySelector('.anime-title').textContent; 

        // Check if the title contains the search term
        if (title.toLowerCase().indexOf(term) !== -1) {
            animeItem.style.display = 'flex'; // Show the item with flex layout
        } else {
            animeItem.style.display = 'none'; // Hide if it doesn't match
        }
    });

    // Ensure HRs remain visible
    const hrElements = list.querySelectorAll('hr');
    hrElements.forEach(hr => {
        // Control visibility of HR based on previous and next li visibility
        const prevLiVisible = hr.previousElementSibling && hr.previousElementSibling.style.display !== 'none';
        const nextLiVisible = hr.nextElementSibling && hr.nextElementSibling.style.display !== 'none';
        hr.style.display = (prevLiVisible || nextLiVisible) ? 'block' : 'none'; // Show/hide based on visibility of adjacent <li>
    });
});