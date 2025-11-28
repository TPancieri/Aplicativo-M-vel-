document.getElementById("back-btn").addEventListener("click", () => {
            window.location.href = "index.html";
        });

        /* Add Flashcard (não sai da página)*/
        document.getElementById("add-btn").addEventListener("click", function () {

            const blockName = document.getElementById("blockName").value.trim();
            const blockDescription = document.getElementById("blockDescription").value.trim();
            const front = document.getElementById("frontText").value.trim();
            const back = document.getElementById("backText").value.trim();

            if (!blockName) {
                alert("Digite o nome do bloco antes de adicionar flashcards.");
                return;
            }

            if (!front || !back) {
                alert("Preencha os dois lados do flashcard.");
                return;
            }

            // Pega bloco existente ou cria novo
            let blockData = JSON.parse(localStorage.getItem(blockName)) || {
                nome: blockName,
                descricao: blockDescription,
                cards: []
            };

            // Atualiza descrição (mesmo que o bloco já exista)
            blockData.descricao = blockDescription;

            // Adiciona card ao bloco
            blockData.cards.push({
                frente: front,
                tras: back,
                correct: 0,
                wrong: 0,
                studied: false
            });

            // Salva no localStorage
            localStorage.setItem(blockName, JSON.stringify(blockData));

            // Limpa os campos para mais cadastros
            document.getElementById("frontText").value = "";
            document.getElementById("backText").value = "";

            alert("Flashcard adicionado ao bloco!");
        });

        /* salva o bloco e retorna ao dashboard*/
        document.getElementById("finish-btn").addEventListener("click", function () {

            const blockName = document.getElementById("blockName").value.trim();
            const blockDescription = document.getElementById("blockDescription").value.trim();

            if (!blockName) {
                alert("O bloco precisa ter um nome para ser salvo.");
                return;
            }

            let blockData = JSON.parse(localStorage.getItem(blockName)) || {
                nome: blockName,
                descricao: blockDescription,
                cards: []
            };

            blockData.descricao = blockDescription;

            // Salva bloco completo
            localStorage.setItem(blockName, JSON.stringify(blockData));

            // Vai para o dashboard
            window.location.href = "index.html";
        });