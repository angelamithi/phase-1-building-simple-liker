const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

function loadDom() {
  const errorModal = document.querySelector("div#modal");
  errorModal.classList.add("hidden");
  const mediaPosts = document.querySelectorAll(".media-post");

  mediaPosts.forEach(post => {
    const heart = post.querySelector(".like-glyph");
    heart.addEventListener("click", function() {
      if (heart.textContent === EMPTY_HEART) {
        mimicServerCall()
          .then(() => {
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          })
          .catch(error => {
            errorModal.classList.remove("hidden");
            errorModal.textContent = error;
            setTimeout(() => {
              errorModal.classList.add("hidden")
            }, 3000);
          });
      } else {
        mimicServerCall()
          .then(() => {
            heart.textContent = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          })
          .catch(error => {
            errorModal.classList.remove("hidden");
            errorModal.textContent = error;
            setTimeout(() => {
              errorModal.classList.add("hidden");
            }, 3000);
          });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadDom);

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
