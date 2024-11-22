const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('input[type="search"]'); 
const profileCard = document.querySelector('.card');
const darkBtn = document.getElementById('dark-light');
const whiteBtn = document.getElementById('white-light');

searchButton.addEventListener('click', async () => {
    const username = searchInput.value.trim();
  
    if (!username) {
      alert('Veuillez entrer un nom d\'utilisateur GitHub.');
      return;
    }
  
    const apiUrl = `https://api.github.com/users/${username}`;
    
    try {
      const response = await axios.get(apiUrl);
      const userData = response.data;
    
      updateProfileCard(userData);
    } catch (error) {
      console.error('Erreur lors de la requête API :', error);
      profileCard.innerHTML = `
        <div class="text-center text-red-500 font-semibold">
          Utilisateur introuvable. Veuillez vérifier le nom d'utilisateur.
        </div>
      `;
    }
  });


  function updateProfileCard(data) {
    profileCard.innerHTML = `
    <div class="card1 w-[90%] h-96 pt-5 bg-white shadow-xl shadow-gray-300 rounded-md">
        <div class="flex pl-4">
        <div class="img rounded-[50%] w-20 h-20" style="background-image: url('${data.avatar_url}'); background-size: cover; background-position: center;"></div>
        <div class="ml-4 mt-2">
            <h2 class="font-bold text-2xl text-gray-500">${data.name || 'Nom indisponible'}</h2>
            <h3 class="text-blue-400 font-semibold"><a href="${data.html_url}">@${data.login}</a></h3>
            <h4 class="text-gray-400 font-semibold md:hidden">Joined ${new Date(data.created_at).toLocaleDateString()}</h4>
            <span class="bio text-gray-400 font-semibold hidden md:block">${data.bio || 'Pas de bio disponible.'}</span>
        </div>
        </div>
        <div class="pt-4 pl-5">
        <div class="md:pl-20">
            <div class="stats-container flex justify-around md:justify-evenly w-[94%] md:w-[75%] bg-slate-100 rounded-md mt-5 mb-4 md:h-20 md:items-center">
            <div>
                <h1 class="title text-gray-500 font-semibold">Repos</h1>
                <span class="stats flex justify-center items-center text-gray-500 ">${data.public_repos}</span>
            </div>
            <div>
                <h1 class="title text-gray-500 font-semibold">Followers</h1>
                <span class="stats flex justify-center items-center text-gray-500 ">${data.followers}</span>
            </div>
            <div>
                <h1 class="title text-gray-500 font-semibold">Following</h1>
                <span class="stats flex justify-center items-center text-gray-500 ">${data.following}</span>
            </div>
            </div>
        </div>
        <div class="flex flex-col items-start gap-2 md:gap-10 pt-4 md:items-center">
            <div class="flex flex-col gap-2 md:w-[80%] md:flex-row md:gap-44">
            <div class="flex gap-5">
                <img src="../github-user-search-app-icons/icon-location.svg" alt="">
                <h2 class="text-blue-950">${data.location || 'Non disponible'}</h2>
            </div>
            <div class="flex gap-4">
                <img src="../github-user-search-app-icons/icon-website.svg" alt="">
                <h2 class=" text-gray-500 ">
                <a href="${data.blog || '#'}" target="_blank">${data.blog || 'Non disponible'}</a>
                </h2>
            </div>
            </div>
            <div class="flex flex-col gap-2 md:w-[80%] md:flex-row md:gap-44">
            <div class="flex gap-4">
                <img src="../github-user-search-app-icons/icon-twitter.svg" alt="">
                <h2 class=" text-gray-500 ">
                <a href="https://twitter.com/${data.twitter_username || ''}" target="_blank">${data.twitter_username || 'Non disponible'}</a>
                </h2>
            </div>
            <div class="flex gap-4">
                <img src="../github-user-search-app-icons/icon-company.svg" alt="">
                <h2 class=" text-gray-500 ">${data.company || 'Non disponible'}</h2>
            </div>
            </div>
        </div>
        </div>
    </div>
    `; 
}

darkBtn.addEventListener('click', function () {
    isDarkMode = true;

    darkBtn.classList.add('hidden');
    whiteBtn.classList.remove('hidden')
    whiteBtn.classList.add('block');
    
    body.classList.remove('bg-gray-100');
    body.classList.add('bg-gray-700', 'text-white');
});

whiteBtn.addEventListener('click', function () {
    isDarkMode = false;

    whiteBtn.classList.add('hidden');
    darkBtn.classList.remove('hidden')
    darkBtn.classList.add('block');

    body.classList.remove('bg-gray-700', 'text-white');
    body.classList.add('bg-gray-100');
});