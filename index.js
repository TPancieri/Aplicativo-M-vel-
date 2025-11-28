document.addEventListener("DOMContentLoaded", () => {

    /* POPUP */
    const openButton = document.querySelector(".nav-center");
    const popupOverlay = document.getElementById("popup-overlay");
    const closeButton = document.querySelector(".close-popup");

    // abre popup clicando no botão redondo 
    openButton.addEventListener("click", () => popupOverlay.classList.remove("hidden"));

    // fecha popup no X
    closeButton.addEventListener("click", () => popupOverlay.classList.add("hidden"));

    // fecha ao clicar fora da caixa
    popupOverlay.addEventListener("click", e => {
        if (e.target === popupOverlay) popupOverlay.classList.add("hidden");
    });


    /* Botão de cadastrar */
    document.querySelector(".popup-btn")
            .addEventListener("click", () => location.href = "novo-bloco.html");


    /* Importar o JSON */
    document.querySelector(".popup-btn.outline").addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json";

        fileInput.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = evt => {
                try {
                    const data = JSON.parse(evt.target.result);

                    // validação rápida
                    if (!data.nome || !Array.isArray(data.cards)) {
                        alert("JSON inválido.");
                        return;
                    }

                    // salva bloco
                    localStorage.setItem(
                        data.nome,
                        JSON.stringify({
                            nome: data.nome,
                            descricao: data.descricao || "",
                            cards: data.cards.map(c => ({
                                frente: c.frente || "",
                                tras: c.tras || "",
                                correct: c.correct || 0,
                                wrong: c.wrong || 0,
                                studied: c.studied || false
                            }))
                        })
                    );

                    alert(`Bloco '${data.nome}' importado!`);
                    location.reload();

                } catch (e) {
                    alert("Erro ao ler arquivo JSON.");
                }
            };

            reader.readAsText(file);
        };

        fileInput.click();
    });


    /* Carega os blocos salvos */
    const container = document.getElementById("blocks-container");
    const stats = document.querySelectorAll(".stat h2");

    let blocos = {};

    // Lê todas as chaves do localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        try {
            const parsed = JSON.parse(localStorage.getItem(key));
            if (parsed && parsed.cards) blocos[key] = parsed;
        } catch {}
    }

    const nomes = Object.keys(blocos);

    // Se não houver blocos
    if (nomes.length === 0) {
        container.innerHTML = `<div class="card"><h3>Nenhum bloco encontrado</h3></div>`;
        stats[0].textContent = 0;
        stats[1].textContent = 0;
        return;
    }

    // Renderiza cada bloco
    let totalStudied = 0;

    nomes.forEach(nome => {
        const bloco = blocos[nome];
        const qtd = bloco.cards.length;

        totalStudied += bloco.cards.filter(c => c.studied).length;

        const el = document.createElement("div");
        el.classList.add("card");
        el.innerHTML = `
            <p class="category">${qtd} cards</p>
            <h3>${bloco.nome}</h3>
            <p>${bloco.descricao || ""}</p>
        `;

        el.onclick = () => location.href = `deck.html?id=${encodeURIComponent(nome)}`;
        container.appendChild(el);
    });

    // Atualiza estatísticas
    stats[0].textContent = totalStudied;
    stats[1].textContent = nomes.length;
});