function previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('previewImg').src = e.target.result;
                    document.getElementById('imagePreview').classList.add('active');
                }
                reader.readAsDataURL(file);
            }
        }

        function generateReport() {
            const title = document.getElementById('postTitle').value;
            const description = document.getElementById('postDescription').value;
            const userName = document.getElementById('userName').value;
            const neighborhood = document.getElementById('neighborhood').value;
            const city = document.getElementById('city').value;

            if (!title || !description) {
                alert('Por favor, preencha o nome da postagem e a descrição primeiro!');
                return;
            }

            const report = `
                <strong>RELATÓRIO DE PLANTIO - RAIZIA</strong><br><br>
                
                <strong>Título:</strong> ${title}<br>
                <strong>Responsável:</strong> ${userName}<br>
                <strong>Localização:</strong> ${neighborhood}, ${city}<br><br>
                
                <strong>Descrição do Local:</strong><br>
                ${description}<br><br>
                
                <strong>Análise:</strong><br>
                Com base nas informações fornecidas, este local apresenta características favoráveis para o plantio de árvores. 
                Recomenda-se a avaliação técnica de um engenheiro ambiental para determinar as espécies mais adequadas 
                ao solo e clima da região.<br><br>
                
                <strong>Próximos Passos:</strong><br>
                1. Análise técnica do solo<br>
                2. Aprovação dos órgãos competentes<br>
                3. Seleção de espécies nativas<br>
                4. Execução do plantio<br><br>
                
                <em>Relatório gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')}</em>
            `;

            document.getElementById('reportContent').innerHTML = report;
            document.getElementById('aiOutput').classList.add('active');
            document.getElementById('continueLink').style.display = 'inline-flex';
            document.getElementById('continueLink').href = 'https://relatorio.raizia.com/' + Math.random().toString(36).substr(2, 9);
        }

        function handleSubmit(event) {
            event.preventDefault();
            
            const reportUrl = document.getElementById('reportUrl').value;
            if (!reportUrl) {
                alert('A URL da denúncia é obrigatória!');
                return;
            }

            alert('Postagem de plantio publicada com sucesso!');
            window.location.href = 'index.html';
        }

        // Auto-completar coordenadas (simulado)
        document.getElementById('postalCode').addEventListener('blur', function() {
            if (this.value) {
                document.getElementById('latitude').value = '-23.' + Math.floor(Math.random() * 900000 + 100000);
                document.getElementById('longitude').value = '-46.' + Math.floor(Math.random() * 900000 + 100000);
            }
        });