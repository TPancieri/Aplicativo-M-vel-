document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const blocoNome = params.get("id");

    if (!blocoNome) {
        alert("Nenhum bloco selecionado!");
        window.location.href = "index.html";
        return;
    }

    const bloco = JSON.parse(localStorage.getItem(blocoNome) || "null");
    if (!bloco) {
        alert("Bloco não encontrado!");
        window.location.href = "index.html";
        return;
    }

    const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", () => window.location.href = `deck.html?id=${encodeURIComponent(blocoNome)}`);

    const blockNameInput = document.getElementById("edit-block-name");
    const blockDescInput = document.getElementById("edit-block-description");
    const cardsContainer = document.getElementById("cards-container");

    // Preencher campos
    blockNameInput.value = bloco.nome;
    blockDescInput.value = bloco.descricao || "";

    function renderCards() {
        cardsContainer.innerHTML = "";
        bloco.cards.forEach((card, index) => {
            const div = document.createElement("div");
            div.classList.add("flash-input");
            div.innerHTML = `
                <label>Frente</label>
                <input type="text" class="card-front" value="${card.frente}">
                <label>Trás</label>
                <input type="text" class="card-back" value="${card.tras}">
                <button class="delete-card" data-index="${index}">Excluir</button>
            `;
            cardsContainer.appendChild(div);
        });

        // Botões excluir
        document.querySelectorAll(".delete-card").forEach(btn => {
            btn.addEventListener("click", e => {
                const i = parseInt(e.target.dataset.index);
                bloco.cards.splice(i, 1);
                renderCards();
            });
        });
    }

    renderCards();

    // Adicionar novo cartão
    document.getElementById("add-card-btn").addEventListener("click", () => {
        bloco.cards.push({ frente: "", tras: "", correct: 0, wrong: 0, studied: false });
        renderCards();
    });

    // Salvar alterações
    document.getElementById("save-block-btn").addEventListener("click", () => {
        bloco.nome = blockNameInput.value.trim();
        bloco.descricao = blockDescInput.value.trim();

        // Atualizar valores dos cartões
        const fronts = document.querySelectorAll(".card-front");
        const backs = document.querySelectorAll(".card-back");

        bloco.cards.forEach((card, i) => {
            card.frente = fronts[i].value.trim();
            card.tras = backs[i].value.trim();
        });

        // Salvar no localStorage
        localStorage.removeItem(blocoNome); // remove antiga key
        localStorage.setItem(bloco.nome, JSON.stringify(bloco));

        alert("Bloco atualizado com sucesso!");
        window.location.href = `deck.html?id=${encodeURIComponent(bloco.nome)}`;
    });
});
