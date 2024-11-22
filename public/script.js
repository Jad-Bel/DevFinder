const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('input[type="search"]'); 
const profileCard = document.querySelector('.card');

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