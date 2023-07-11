import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection,doc,getDoc} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "",
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
const collectionRef = collection(db, 'blogs');

// Get the blogId and collectionRef from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const selectedBlogId = urlParams.get('blogId');
const collectionRefPath = decodeURIComponent(urlParams.get('collectionRef'));

// Convert collectionRefPath back to a Firestore CollectionReference
// const collectionRef = collection(db, collectionRefPath);

// Fetch the blog content based on the selectedBlogId
fetchBlogData(collectionRef, selectedBlogId)
  .then((blogData) => {
    if (blogData) {
      displayBlogContent(blogData);
    } else {
      displayBlogNotFound();
    }
  })
  .catch((error) => {
    console.error("Error fetching blog data:", error);
    displayBlogNotFound();
  });

async function fetchBlogData(collectionRef, blogId) {
  const blogRef = doc(collectionRef, blogId);
  const docSnapshot = await getDoc(blogRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  }
  return null;
}

function displayBlogContent(blogData) {
  // Update the DOM with the blog content
  const blogContentEl = document.getElementById("blog-content");

  blogContentEl.classList.add("cards");

  blogContentEl.innerHTML = `
    <h1 class="about-title">${blogData.title}</h1>
    <p class="about-p">${blogData.content}</p>
    <p class="about-date">${blogData.date}</p>
    <br>
    <a href="index.html"><strong>Back to Blogs</strong></a>
  `;
}

function displayBlogNotFound() {
  // Update the DOM to display a message for a blog not found
  const blogContentEl = document.getElementById("blog-content");
  blogContentEl.innerHTML = `<p>Blog not found.</p>`;
}
