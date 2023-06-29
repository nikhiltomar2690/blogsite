import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
// import { initializeApp } from 'firebase/app';

      // Add Firebase products that you want to use
      import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'
      // import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

// Get the documents from the collection
// const collectionRef = db.collection("blogs");
// db.collection("blogs").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
      
//   });
// });
// Listen for changes to the collection
// db.collection("blogs").onSnapshot((snapshot) => {
// // Clear the cards
// const cardsEl = document.getElementById("cards");
// cardsEl.innerHTML = "";

// // Loop through the documents and create a card for each one
// snapshot.forEach((doc) => {
// const cardEl = document.createElement("div");
// cardEl.classList.add("article");

// // Add the document data to the card
// cardEl.innerHTML = `
// <p class="date">${doc.data().date}</p>
// <h2 class="title">${doc.data().title}</h2>
// <p class="bio">${doc.data().desc}</p>
// <a href="#" class="read-more"><strong>read more</strong></a>
// `;

// // Add the card to the DOM
// cardsEl.appendChild(cardEl);
// });
// });

const citiesRef = db.collection('blogs');
const snapshot = await citiesRef.get();

// Clear the cards
const cardsEl = document.getElementById("cards");
cardsEl.innerHTML = "";

// Loop through the documents and create a card for each one
snapshot.forEach((doc) => {
const cardEl = document.createElement("div");
cardEl.classList.add("card");

// Add the document data to the card
cardEl.innerHTML = `
<h2 class="card-title">${doc.data().name}</h2>
<p class="card-text">${doc.data().population}</p>
<a href="https://youtube.com" class="card-link">read more</a>
`;

// Add the card to the DOM
cardsEl.appendChild(cardEl);
});