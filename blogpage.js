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
const querySnapshot = await getDocs(query(collectionRef, orderBy('timestamp', 'asc')));
// const querySnapshot = await getDocs(collectionRef);

// Clear the cards
const cardsE2 = document.getElementById("cards");
cardsE2.innerHTML = "";

// Function to open blog.html with the selected blog ID
function openBlogPage(blogId) {
  window.location.href = `blog.html?blogId=${blogId}`;
}

querySnapshot.forEach((doc) => {
    const cardE2 = document.createElement("div");
    cardE2.classList.add("cards");

     // Add the document data to the card
     cardE2.innerHTML = `
     <p class="date">Last Updated ${doc.data().date}</p>
     <h2 class="card-title card-link ">${doc.data().title}</h2>
     <p class="card-text">${doc.data().desc} <a href="#" class="card-link"><strong>read more</strong></a></p>
   `;

   // Attach event listener to the "read more" link
   const readMoreLink = cardE2.querySelector(".card-link");
   readMoreLink.addEventListener("click", (event) => {
     event.preventDefault();
     openBlogPage(doc.id);
   });
    // Add the card to the DOM
    cardsE2.appendChild(cardE2);
  }
);

// telling js about the search function
// document.getElementById("searchButton").addEventListener("click", search);
document.addEventListener("DOMContentLoaded", function() {
  const navbarMenu = document.querySelector(".navbar-menu");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navbarToggler.addEventListener("click", function() {
    navbarMenu.classList.toggle("active");
  });
});
