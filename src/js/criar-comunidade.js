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

        function toggleHashtag(element) {
            element.classList.toggle('selected');
        }

        function selectPrivacy(element, level) {
            document.querySelectorAll('.privacy-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            element.classList.add('selected');
            document.getElementById('privacyLevel').value = level;
        }

        function handleSubmit(event) {
            event.preventDefault();
            
            const title = document.getElementById('postTitle').value;
            const description = document.getElementById('postDescription').value;
            const imageInput = document.getElementById('imageInput');

            if (!title || !description) {
                alert('Por favor, preencha o título e a descrição!');
                return;
            }

            if (!imageInput.files || imageInput.files.length === 0) {
                alert('Por favor, adicione uma foto!');
                return;
            }

            // Coletar hashtags selecionadas
            const selectedHashtags = [];
            document.querySelectorAll('.hashtag-chip.selected').forEach(chip => {
                selectedHashtags.push(chip.textContent);
            });

            alert('Postagem publicada com sucesso na comunidade!');
            window.location.href = 'index.html';
        }

        // Mostrar mapa quando houver dados de localização
        document.getElementById('city').addEventListener('input', function() {
            if (this.value) {
                document.getElementById('mapContainer').style.display = 'flex';
            } else {
                document.getElementById('mapContainer').style.display = 'none';
            }
        });

        // Auto-completar coordenadas (simulado)
        document.getElementById('postalCode').addEventListener('blur', function() {
            if (this.value) {
                document.getElementById('latitude').value = '-23.' + Math.floor(Math.random() * 900000 + 100000);
                document.getElementById('longitude').value = '-46.' + Math.floor(Math.random() * 900000 + 100000);
                document.getElementById('mapContainer').style.display = 'flex';
            }
        });