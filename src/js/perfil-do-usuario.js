let currentStatusElement = null;

        function switchTab(tab) {
            // Remove active from all tabs and content
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Add active to clicked tab
            event.target.classList.add('active');

            // Show corresponding content
            if (tab === 'posts') {
                document.getElementById('postsTab').classList.add('active');
            } else if (tab === 'plantio') {
                document.getElementById('plantioTab').classList.add('active');
            } else if (tab === 'denuncia') {
                document.getElementById('denunciaTab').classList.add('active');
            } else if (tab === 'comunidade') {
                document.getElementById('comunidadeTab').classList.add('active');
            }
        }

        function openEditModal() {
            document.getElementById('editModal').classList.add('active');
        }

        function closeEditModal() {
            document.getElementById('editModal').classList.remove('active');
        }

        function saveProfile(event) {
            event.preventDefault();
            const name = document.getElementById('editName').value;
            const username = document.getElementById('editUsername').value;
            const bio = document.getElementById('editBio').value;

            // Update profile display
            document.querySelector('.profile-name-section h1').textContent = name;
            document.querySelector('.profile-username').textContent = '@' + username;
            document.querySelector('.profile-bio').textContent = bio;

            alert('Perfil atualizado com sucesso!');
            closeEditModal();
        }

        function openStatusModal(button) {
            currentStatusElement = button.previousElementSibling;
            document.getElementById('statusModal').classList.add('active');
        }

        function closeStatusModal() {
            document.getElementById('statusModal').classList.remove('active');
            currentStatusElement = null;
        }

        function changeStatus(status) {
            if (!currentStatusElement) return;

            // Remove all status classes
            currentStatusElement.classList.remove('status-nao-resolvido', 'status-progresso', 'status-resolvido');

            // Add new status class and update content
            let icon, text;
            if (status === 'nao-resolvido') {
                currentStatusElement.classList.add('status-nao-resolvido');
                icon = '<i class="fas fa-clock"></i>';
                text = 'Não Resolvido';
            } else if (status === 'progresso') {
                currentStatusElement.classList.add('status-progresso');
                icon = '<i class="fas fa-spinner"></i>';
                text = 'Em Progresso';
            } else if (status === 'resolvido') {
                currentStatusElement.classList.add('status-resolvido');
                icon = '<i class="fas fa-check-circle"></i>';
                text = 'Resolvido';
            }

            currentStatusElement.innerHTML = icon + ' ' + text;
            
            alert('Status atualizado com sucesso!');
            closeStatusModal();
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            const editModal = document.getElementById('editModal');
            const statusModal = document.getElementById('statusModal');
            
            if (event.target === editModal) {
                closeEditModal();
            }
            if (event.target === statusModal) {
                closeStatusModal();
            }
        }