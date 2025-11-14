// Dados de exemplo de notificações
        let notifications = [
            {
                id: 1,
                type: 'like',
                user: 'Maria Oliveira',
                text: 'curtiu sua postagem',
                post: 'Ipê Amarelo Florescendo',
                time: new Date(Date.now() - 5 * 60000), // 5 minutos atrás
                unread: true
            },
            {
                id: 2,
                type: 'comment',
                user: 'Carlos Santos',
                text: 'comentou:',
                comment: '"Que árvore linda! Onde fica esse local?"',
                time: new Date(Date.now() - 15 * 60000), // 15 minutos atrás
                unread: true
            },
            {
                id: 3,
                type: 'status',
                text: 'Status atualizado:',
                post: 'Árvore Caída Bloqueando Via',
                status: 'Em Progresso',
                time: new Date(Date.now() - 2 * 3600000), // 2 horas atrás
                unread: true
            },
            {
                id: 4,
                type: 'follow',
                user: 'Ana Paula',
                text: 'começou a seguir você',
                time: new Date(Date.now() - 4 * 3600000), // 4 horas atrás
                unread: true
            },
            {
                id: 5,
                type: 'mention',
                user: 'Pedro Lima',
                text: 'mencionou você em um comentário',
                time: new Date(Date.now() - 6 * 3600000), // 6 horas atrás
                unread: true
            },
            {
                id: 6,
                type: 'system',
                text: 'Sua denúncia foi aprovada pelos moderadores',
                post: 'Área para Reflorestamento',
                time: new Date(Date.now() - 86400000), // 1 dia atrás
                unread: false
            },
            {
                id: 7,
                type: 'like',
                user: 'João Pedro',
                text: 'curtiu sua postagem',
                post: 'Plantio de Mudas Realizado',
                time: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
                unread: false
            }
        ];

        function getTimeAgo(date) {
            const seconds = Math.floor((new Date() - date) / 1000);
            
            if (seconds < 60) return 'Agora mesmo';
            
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
            
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
            
            const days = Math.floor(hours / 24);
            if (days < 7) return `Há ${days} ${days === 1 ? 'dia' : 'dias'}`;
            
            const weeks = Math.floor(days / 7);
            if (weeks < 4) return `Há ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
            
            const months = Math.floor(days / 30);
            return `Há ${months} ${months === 1 ? 'mês' : 'meses'}`;
        }

        function renderNotifications() {
            const notificationList = document.getElementById('notificationList');
            const unreadCount = notifications.filter(n => n.unread).length;
            
            // Update badge
            const badge = document.getElementById('notificationBadge');
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }

            // Render notifications
            if (notifications.length === 0) {
                notificationList.innerHTML = `
                    <div class="notification-empty">
                        <i class="fas fa-bell-slash"></i>
                        <h4>Nenhuma notificação</h4>
                        <p>Você está em dia! Não há notificações no momento.</p>
                    </div>
                `;
                return;
            }

            notificationList.innerHTML = notifications.map(notif => {
                let iconClass, iconType, content;

                switch (notif.type) {
                    case 'like':
                        iconClass = 'icon-like';
                        iconType = 'fa-heart';
                        content = `<strong>${notif.user}</strong> ${notif.text} <strong>"${notif.post}"</strong>`;
                        break;
                    case 'comment':
                        iconClass = 'icon-comment';
                        iconType = 'fa-comment';
                        content = `<strong>${notif.user}</strong> ${notif.text} ${notif.comment}`;
                        break;
                    case 'status':
                        iconClass = 'icon-status';
                        iconType = 'fa-check-circle';
                        content = `${notif.text} <strong>"${notif.post}"</strong> foi alterado para <strong>${notif.status}</strong>`;
                        break;
                    case 'follow':
                        iconClass = 'icon-follow';
                        iconType = 'fa-user-plus';
                        content = `<strong>${notif.user}</strong> ${notif.text}`;
                        break;
                    case 'mention':
                        iconClass = 'icon-mention';
                        iconType = 'fa-at';
                        content = `<strong>${notif.user}</strong> ${notif.text}`;
                        break;
                    case 'system':
                        iconClass = 'icon-system';
                        iconType = 'fa-info-circle';
                        content = notif.text + (notif.post ? ` <strong>"${notif.post}"</strong>` : '');
                        break;
                }

                return `
                    <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="markAsRead(${notif.id})">
                        <div class="notification-icon ${iconClass}">
                            <i class="fas ${iconType}"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-text">${content}</div>
                            <div class="notification-time">
                                <i class="far fa-clock"></i>
                                ${getTimeAgo(notif.time)}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function toggleNotifications() {
            const popup = document.getElementById('notificationPopup');
            const overlay = document.getElementById('notificationOverlay');
            
            popup.classList.toggle('active');
            overlay.classList.toggle('active');

            if (popup.classList.contains('active')) {
                renderNotifications();
            }
        }

        function closeNotifications() {
            document.getElementById('notificationPopup').classList.remove('active');
            document.getElementById('notificationOverlay').classList.remove('active');
        }

        function markAsRead(id) {
            const notification = notifications.find(n => n.id === id);
            if (notification) {
                notification.unread = false;
                renderNotifications();
            }
        }

        function markAllAsRead() {
            notifications.forEach(n => n.unread = false);
            renderNotifications();
        }

        function addDemoNotification() {
            const types = ['like', 'comment', 'status', 'follow', 'mention', 'system'];
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            const newNotif = {
                id: notifications.length + 1,
                type: randomType,
                user: 'Usuário Demo',
                text: 'interagiu com você',
                post: 'Postagem de Teste',
                time: new Date(),
                unread: true
            };

            notifications.unshift(newNotif);
            renderNotifications();
            
            // Show notification popup
            document.getElementById('notificationPopup').classList.add('active');
            document.getElementById('notificationOverlay').classList.add('active');
        }

        // Initial render
        renderNotifications();

        // Update time every minute
        setInterval(renderNotifications, 60000);