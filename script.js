const searchBtn = document.getElementById("button");
const searchInput = document.querySelector("#searchFollowers");

const cardsDiv = document.querySelector("#cards");

//!  https://api.github.com/users/brucehillwalley/followers?per_page=100

let followers = [];

const getFollowers = async (username) => {
  cardsDiv.innerHTML = "";
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/followers?per_page=100`
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      followers = data;
      searchInput.style.display = "flex";

      data.forEach((element) => createElem(element));
    } else {
      cardsDiv.innerHTML = `<h1>kullanıcı bulunamadı</h1>`;
    }
  } catch (error) {}
};

// getFollowers("esin")

const createElem = (user) => {
  // console.log(user);
  const { login, html_url, avatar_url } = user;
  // console.log(login);
  const newElem = `
    <div class="col">
        <div class="card">
        <img src="${avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <a href="${html_url}" target="_blank" class="btn btn-dark">View Profile</a>
        </div>
        </div>
    </div>
    `;
  cardsDiv.innerHTML += newElem;
};

searchBtn.addEventListener("click", () => {
  const value = document.getElementById("searchText").value.trim();
  console.log(value);
  // value.trim()&&getFollowers(value)
  if (value) {
    getFollowers(value);
  } else {
    alert("lütfen kullanıcı adı giriniz");
  }
});

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  console.log(followers);
  cardsDiv.innerHTML = "";
  followers
    .filter((item) => item.login.includes(e.target.value))
    .forEach((user) => createElem(user));
});

window.addEventListener("load", () => {
  searchInput.style.display = "none";
});
