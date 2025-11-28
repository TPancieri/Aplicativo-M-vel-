document.addEventListener("DOMContentLoaded", () => {

            // Pega o parâmetro ?id=NomeDoBloco da URL
            const params = new URLSearchParams(window.location.search);
            const blocoNome = params.get("id");

            if (!blocoNome) {
                console.warn("Nenhum ID de bloco foi informado.");
                return;
            }

            // Busca o bloco diretamente no localStorage
            const bloco = JSON.parse(localStorage.getItem(blocoNome) || "null");

            if (!bloco) {
                document.getElementById("deck-title").textContent = "Bloco não encontrado";
                document.getElementById("deck-description").textContent =
                    "Este bloco não existe ou foi removido.";
                return;
            }

            // Preenche título e descrição da tela
            document.getElementById("deck-title").textContent = bloco.nome;
            document.getElementById("deck-description").textContent =
                bloco.descricao || "Adicione uma descrição na página de edição.";

            // Cálculo do progresso de estudo
            const total = bloco.cards.length;

            // Considera estudado quem tem pelo menos 1 acerto
            const estudados = bloco.cards.filter(c => c.correct > 0).length;

            const percentual = total > 0 ? (estudados / total) * 100 : 0;

            document.getElementById("deck-progress-text").textContent =
                `${estudados}/${total}`;

            document.getElementById("deck-progress-bar").style.width =
                percentual + "%";

            //  Botão voltar retorna à página inicial
            document.getElementById("back-btn").addEventListener("click", () => {
                window.location.href = "index.html";
            });

            // Botão estudar abre a tela de estudo
            document.getElementById("study-btn").addEventListener("click", () => {
                window.location.href = `study.html?id=${encodeURIComponent(blocoNome)}`;
            });

            // Abre tela de edição do bloco
            document.getElementById("edit-tab").addEventListener("click", () => {
                window.location.href = `edit-deck.html?id=${encodeURIComponent(blocoNome)}`;
            });
        });