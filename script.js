const pokemonData = {
    Pikachu: {
        nome: 'Pikachu',
        gif: 'https://64.media.tumblr.com/927365f0bbdd1f3d2f852bac8759f89b/tumblr_mh8a7wx1WG1rfjowdo1_r2_500.gif',
        backgroundImage: 'https://media.giphy.com/media/xVK8NAL9xQNWw/giphy.gif',
    },
    Sylveon: {
        nome: 'Sylveon',
        gif: 'https://i.pinimg.com/originals/d5/8a/df/d58adf5bc33ead140a8a0c707456de91.gif',
        backgroundImage: 'https://i.pinimg.com/originals/1f/6e/b0/1f6eb0db7df4d60f175b0cf9773b137b.gif',
    },
    Growlithe: {
        nome: 'Growlithe',
        gif: 'https://i.pinimg.com/originals/99/e3/b9/99e3b927767054af0f732efcf1ea60d8.gif',
        backgroundImage: 'https://media.giphy.com/media/QwOcmXLWdoWNG/giphy.gif',
    },
};

let selectedPokemon = null;
let stats = {
    saude: 100,
    forca: 50,
    fome: 0,
    cansaco: 0,
    afeto: 50,
    idade: 1,
    nivel: 1,
    genero: Math.random() > 0.5 ? 'Macho' : 'Fêmea',
};

function selectPokemon(pokemon) {
    selectedPokemon = pokemon;
    document.body.style.backgroundImage = `url(${pokemonData[pokemon].backgroundImage})`;
    document.getElementById('pokemon-selection').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    updateGameScreen();
}

function updateGameScreen() {
    document.getElementById('pokemon-name').textContent = pokemonData[selectedPokemon].nome;
    document.getElementById('pokemon-gif').src = pokemonData[selectedPokemon].gif;
    document.getElementById('health-bar').style.width = `${stats.saude}%`;
    document.getElementById('strength-bar').style.width = `${stats.forca}%`;
    document.getElementById('hunger-bar').style.width = `${stats.fome}%`;
    document.getElementById('tiredness-bar').style.width = `${stats.cansaco}%`;
    document.getElementById('affection-bar').style.width = `${stats.afeto}%`;
    document.getElementById('age').textContent = stats.idade;
    document.getElementById('level').textContent = stats.nivel;
    document.getElementById('gender').textContent = stats.genero;
}

function feed() {
    stats.fome = Math.max(0, stats.fome - 20);
    stats.saude = Math.min(100, stats.saude + 5);
    stats.forca = Math.min(100, stats.forca + 2);
    updateGameScreen();
}

function rest() {
    stats.cansaco = Math.max(0, stats.cansaco - 30);
    stats.saude = Math.min(100, stats.saude + 10);
    stats.forca = Math.min(100, stats.forca + 5);
    updateGameScreen();
}

function pet() {
    stats.afeto = Math.min(100, stats.afeto + 15);
    stats.saude = Math.min(100, stats.saude + 3);
    updateGameScreen();
}

function train() {
    stats.idade += 1;
    stats.nivel = Math.floor(stats.idade / 5) + 1;
    stats.forca = Math.min(100, stats.forca + 10);
    updateGameScreen();
}

function returnToHome() {
    selectedPokemon = null;
    document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/4c/ba/94/4cba94ba93998c266c82880fae30a834.gif')";
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('pokemon-selection').classList.remove('hidden');
    resetStats();
}

function resetStats() {
    stats = {
        saude: 100,
        forca: 50,
        fome: 0,
        cansaco: 0,
        afeto: 50,
        idade: 1,
        nivel: 1,
        genero: Math.random() > 0.5 ? 'Macho' : 'Fêmea',
    };
}

function initGame() {
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    pokemonCards.forEach(card => {
        card.querySelector('button').addEventListener('click', () => {
            selectPokemon(card.dataset.pokemon);
        });
    });

    document.getElementById('feed-btn').addEventListener('click', feed);
    document.getElementById('rest-btn').addEventListener('click', rest);
    document.getElementById('pet-btn').addEventListener('click', pet);
    document.getElementById('train-btn').addEventListener('click', train);
    document.getElementById('return-btn').addEventListener('click', returnToHome);

    setInterval(() => {
        if (selectedPokemon) {
            stats.fome = Math.min(100, stats.fome + 2);
            stats.cansaco = Math.min(100, stats.cansaco + 2);
            stats.afeto = Math.max(0, stats.afeto - 1);
            updateGameScreen();
        }
    }, 5000);
}

document.addEventListener('DOMContentLoaded', initGame);

