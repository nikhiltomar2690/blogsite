import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs , query, orderBy,where} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyAY-ChTNQK9aqpB4T4uXpG2QMggrZHxHtk",
  authDomain: "cbid-1a433.firebaseapp.com",
  projectId: "cbid-1a433",
  storageBucket: "cbid-1a433.appspot.com",
  messagingSenderId: "271147078204",
  appId: "1:271147078204:web:c6cb62ff447458607a6939",
  measurementId: "G-3K4H36WKBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore reference
const db = getFirestore(app);



// Get the documents from the collection, sorted by timestamp in descending order
const collectionRef = collection(db, 'blogs');
const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'desc')));

// Clear the cards
const cardsEl = document.getElementById("cards");
cardsEl.innerHTML = "";

// Function to open blog.html with the selected blog ID
function openBlogPage(blogId) {
  window.location.href = `blog.html?blogId=${blogId}`;
}

// Loop through the documents and create a card for each one, limiting to top 10
let count = 0;
querySnapshot.forEach((doc) => {
  if (count < 10) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("cards");

     // Add the document data to the card
     cardEl.innerHTML = `
     <p class="date">Last Updated ${doc.data().date}</p>
     <h2 class="card-title">${doc.data().title}</h2>
     <p class="card-text">${doc.data().desc} <a href="#" class="card-link"><strong>read more</strong></a></p>
   `;

   // Attach event listener to the "read more" link
   const readMoreLink = cardEl.querySelector(".card-link");
   readMoreLink.addEventListener("click", (event) => {
     event.preventDefault();
     openBlogPage(doc.id);
   });

    // Add the card to the DOM
    cardsEl.appendChild(cardEl);
  }
  count++;
});


async function search() {
  // Get the search keyword from the user input
  const searchKeyword = document.getElementById("searchInput").value;

  // Get the documents from the collection matching the search query
  const collectionRef = collection(db, 'blogs');
  const querySnapshot = await getDocs(query(collectionRef, where('title', 'array-contains', searchKeyword)));

  // Clear the search results
  const searchResultsEl = document.getElementById("searchResults");
  searchResultsEl.innerHTML = "";

  // Loop through the documents and create a card for each matching blog
  querySnapshot.forEach((doc) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("cards");
    console.log(`The search result is ${doc.data().title}`);
    // Add the document data to the card
    cardEl.innerHTML = `
      <p class="date">${doc.data().date}</p>
      <h2 class="card-title">${doc.data().title}</h2>
      <p class="card-text">${doc.data().desc} <a href="https://youtube.com" class="card-link"><strong>read more</strong></a></p>
    `;

    // Add the card to the search results
    searchResultsEl.appendChild(cardEl);
  });
}
// telling js about the search function
// document.getElementById("searchButton").addEventListener("click", search);
document.addEventListener("DOMContentLoaded", function() {
  const navbarMenu = document.querySelector(".navbar-menu");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navbarToggler.addEventListener("click", function() {
    navbarMenu.classList.toggle("active");
  });
});
