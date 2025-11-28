document.addEventListener("DOMContentLoaded", () => {

    // Carregar bloco pelo parâmetro da URL
    const params = new URLSearchParams(window.location.search);
    const blocoNome = params.get("id");

    const bloco = JSON.parse(localStorage.getItem(blocoNome) || "null");
    if (!bloco) {
        alert("Nenhum bloco selecionado!");
        window.location.href = "index.html";
        return;
    }

    // Elementos da página
    const title = document.querySelector(".study-title");
    const cardNumber = document.querySelector(".card-number");
    const cardText = document.querySelector(".card-text");
    const flashcard = document.querySelector(".flashcard");

    const revealBtn = document.getElementById("reveal-btn");
    const answerActions = document.getElementById("answer-actions");
    const wrongBtn = document.getElementById("wrong-btn");
    const restartBtn = document.getElementById("restart-btn");
    const correctBtn = document.getElementById("correct-btn");

    title.textContent = bloco.nome;

    let cardIndex = 0;


    // Exibir card atual
    function renderCard() {
        const card = bloco.cards[cardIndex];

        // garantir compatibilidade com cards antigos
        if (card.correct === undefined) card.correct = 0;
        if (card.wrong === undefined) card.wrong = 0;
        if (card.studied === undefined) card.studied = false;

        cardNumber.textContent = cardIndex + 1;
        cardText.textContent = card.frente;

        flashcard.classList.remove("show-back");

        revealBtn.style.display = "block";
        answerActions.style.display = "none";
    }

    renderCard();

    // Revelar resposta
    revealBtn.addEventListener("click", () => {
        const card = bloco.cards[cardIndex];

        cardText.textContent = card.tras;
        flashcard.classList.add("show-back");

        revealBtn.style.display = "none";
        answerActions.style.display = "flex";
    });

    // Voltar para pergunta
    restartBtn.addEventListener("click", () => {
        const card = bloco.cards[cardIndex];

        cardText.textContent = card.frente;
        flashcard.classList.remove("show-back");

        revealBtn.style.display = "block";
        answerActions.style.display = "none";
    });

    // Avançar para próximo card
    function nextCard() {
        cardIndex++;

        if (cardIndex >= bloco.cards.length) {
            alert("Você terminou todos os cartões!");
            window.location.href = "deck.html?id=" + encodeURIComponent(blocoNome);
            return;
        }

        renderCard();
    }

    // Botão X — marcar errado
    wrongBtn.addEventListener("click", () => {
        const card = bloco.cards[cardIndex];
        card.wrong++;
        if (card.correct > 0) card.studied = true;

        localStorage.setItem(blocoNome, JSON.stringify(bloco));
        nextCard();
    });

    // Botão Certo — marcar correto
    correctBtn.addEventListener("click", () => {
        const card = bloco.cards[cardIndex];
        card.correct++;
        card.studied = true;

        localStorage.setItem(blocoNome, JSON.stringify(bloco));
        nextCard();
    });

    // Botão de voltar no topo
    document.querySelector(".back-arrow").addEventListener("click", () => {
        window.location.href = "deck.html?id=" + encodeURIComponent(blocoNome);
    });

});
