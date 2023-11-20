//*----------------------------------------------

(function () {
  "use strict";

  var carousels = function () {
    $(".owl-carousel1").owlCarousel({
      loop: true,
      center: true,
      margin: 0,
      responsiveClass: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        680: {
          items: 2,
          nav: false,
          loop: false,
        },
        1000: {
          items: 3,
          nav: true,
        },
      },
    });
  };

  (function ($) {
    carousels();
  })(jQuery);
})();

//*----------------------------------------------

//*----------------------------------------------

const cards = document.querySelectorAll(".card");
const projectCard = document.querySelector(".project-card");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const cardImage = card.querySelector("img").cloneNode(true);
    const cardTitle = card.querySelector("h5").textContent;
    const cardDescription = card.querySelector("p").textContent;
    const cardLinks = card.querySelector("a").href;

    projectCard.innerHTML = "";
    projectCard.appendChild(cardImage);
    const cardContent = document.createElement("div");
    cardContent.innerHTML = `<h5>${cardTitle}</h5><p>${cardDescription}</p><a href="${cardLinks}" target="_blank" class="btn2 btn-primary">View Project</a>`;
    projectCard.appendChild(cardContent);
  });
});

//*----------------------------------------------

//*----------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  let stars = document.querySelectorAll(".star");
  let ratingContainer = document.querySelector(".star-rating");

  stars.forEach(function (star, index) {
    star.addEventListener("click", function () {
      removeSelectedFromAll();
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("selected");
      }
    });
  });

  function removeSelectedFromAll() {
    stars.forEach(function (star) {
      star.classList.remove("selected");
    });
  }

  // Yıldızların dışına tıklanıldığında seçimi sıfırla
  document.addEventListener("click", function (event) {
    if (!ratingContainer.contains(event.target)) {
      removeSelectedFromAll();
    }
  });
});

//*----------------------------------------------

//*----------------------------------------------

//*Yorum satırı Ekleme */

function addComment() {
  var name = document.getElementById("commentName").value;
  var email = document.getElementById("commentEmail").value;
  var commentText = document.getElementById("commentInput").value;
  var starRating = getStarRating();

  if (name && email && commentText && starRating) {
    var comment = {
      name: name,
      email: email,
      text: commentText,
      rating: starRating,
    };
    var comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));

    displayComment(comment);

    document.getElementById("commentName").value = "";
    document.getElementById("commentEmail").value = "";
    document.getElementById("commentInput").value = "";
    resetStarRating();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var stars = document.querySelectorAll(".star-rating .star");

  stars.forEach(function (star, index) {
    star.addEventListener("click", function () {
      setStarRating(index + 1);
    });
  });

  var savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(function (comment, index) {
    displayComment(comment, index);
  });
});

function setStarRating(rating) {
  var stars = document.querySelectorAll(".star-rating .star");
  stars.forEach(function (star, index) {
    if (index < rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

function getStarRating() {
  var stars = document.querySelectorAll(".star-rating .star");
  var rating = 0;
  stars.forEach(function (star, index) {
    if (star.classList.contains("selected")) {
      rating = index + 1;
    }
  });
  return rating;
}

function resetStarRating() {
  for (let i = 1; i <= 5; i++) {
    document.getElementById("star" + i).classList.remove("selected");
  }
}

function displayComment(comment, index) {
  var li = document.createElement("li");
  li.className = "inp pb-3 sm:pb-4";
  li.id = "comment-" + index;

  var starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    starsHtml += i <= comment.rating ? "&#9733;" : "&#9734;";
  }

  li.innerHTML = `
    <div class="Comment">
      <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        <li class="inp pb-3 sm:pb-4">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <img class="w-8 h-8 rounded-full" src="img/User_icon_2.svg.png" alt="User image" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">${comment.name}</p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">${comment.email}</p>
              <div class="star-rating">${starsHtml}</div>
            </div>
            <button onclick="deleteComment(${index})"><i class="fa-solid fa-trash"></i></button> <!-- Delete button -->
          </div>
        </li>
      </ul>
      <div class="texting">
        <p>${comment.text}</p>
      </div>
    </div>
  `;

  document.querySelector(".Comment ul").appendChild(li);
}

function deleteComment(index) {
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  if (index > -1) {
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));

    var elementToRemove = document.getElementById("comment-" + index);
    if (elementToRemove) {
      elementToRemove.parentNode.removeChild(elementToRemove);
    }
  }

  // Re-display comments to update IDs
  document.querySelector(".Comment ul").innerHTML = "";
  comments.forEach(displayComment);
}

displayComment(comment, comments.length - 1);

//*----------------------------------------------
