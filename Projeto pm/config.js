 // Global Variables
        let currentTab = 'report';
        let reportData = {};
        let analysisComplete = false;
        let selectedFiles = [];
        let selectedTree = null;
        let selectedPriority = null;

        // Tab Navigation
        function switchTab(tabName) {
            // Remove active classes
            document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active classes
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
            document.getElementById(tabName).classList.add('active');
            
            currentTab = tabName;
        }

        // Event Listeners
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                switchTab(tabName);
            });
        });

        // Priority Selection
        document.querySelectorAll('.priority-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.priority-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedPriority = option.dataset.priority;
            });
        });

        // File Upload Handling
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('fileInput');
        const filePreview = document.getElementById('filePreview');

        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.classList.add('dragover');
        });

        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.classList.remove('dragover');
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/') && selectedFiles.length < 10) {
                    selectedFiles.push(file);
                    
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.className = 'preview-img';
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-file';
                    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                    removeBtn.onclick = () => {
                        selectedFiles = selectedFiles.filter(f => f !== file);
                        previewItem.remove();
                        URL.revokeObjectURL(img.src);
                    };
                    
                    previewItem.appendChild(img);
                    previewItem.appendChild(removeBtn);
                    filePreview.appendChild(previewItem);
                }
            });
        }

        // Form Submission
        function submitReport() {
            // Collect form data
            reportData = {
                problemType: document.getElementById('problemType').value,
                timeOccurred: document.getElementById('timeOccurred').value,
                streetAddress: document.getElementById('streetAddress').value,
                description: document.getElementById('description').value,
                treeSpecies: document.getElementById('treeSpecies').value,
                estimatedHeight: document.getElementById('estimatedHeight').value,
                reporterName: document.getElementById('reporterName').value,
                reporterEmail: document.getElementById('reporterEmail').value,
                reporterPhone: document.getElementById('reporterPhone').value,
                reporterCPF: document.getElementById('reporterCPF').value,
                priority: selectedPriority,
                files: selectedFiles,
                timestamp: new Date().toISOString()
            };

            // Validation
            if (!reportData.problemType || !reportData.streetAddress || !reportData.description || 
                !reportData.reporterName || !reportData.reporterEmail || !reportData.reporterPhone || !selectedPriority) {
                showNotification('Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }

            if (selectedFiles.length === 0) {
                if (!confirm('Nenhuma foto foi adicionada. Isso pode reduzir a precisão da análise IA. Deseja continuar?')) {
                    return;
                }
            }

            // Generate protocol number
            const protocolNumber = '#ARV-2024-' + String(Math.floor(Math.random() * 999999) + 100000).padStart(6, '0');
            document.getElementById('protocolNumber').textContent = protocolNumber;

            showNotification('Denúncia enviada com sucesso! Iniciando análise IA...', 'success');
            
            // Switch to analysis tab and start AI analysis
            switchTab('analysis');
            startAIAnalysis();
        }

        // AI Analysis Simulation
        function startAIAnalysis() {
            const imageProgress = document.getElementById('imageProgress');
            const imageStatus = document.getElementById('imageStatus');
            const envProgress = document.getElementById('envProgress');
            const envStatus = document.getElementById('envStatus');
            const imageResults = document.getElementById('imageResults');
            const envResults = document.getElementById('envResults');
            const continueBtn = document.getElementById('continueToRecommendations');

            let imageProgressValue = 0;
            let envProgressValue = 0;

            // Image analysis simulation
            const imageInterval = setInterval(() => {
                imageProgressValue += Math.random() * 12;
                imageProgress.style.width = Math.min(imageProgressValue, 100) + '%';
                
                if (imageProgressValue < 30) {
                    imageStatus.textContent = 'Processando imagens enviadas...';
                } else if (imageProgressValue < 60) {
                    imageStatus.textContent = 'Identificando espécie da árvore...';
                } else if (imageProgressValue < 90) {
                    imageStatus.textContent = 'Avaliando estado de saúde...';
                } else if (imageProgressValue >= 100) {
                    imageStatus.textContent = 'Análise de imagens concluída! ✅';
                    clearInterval(imageInterval);
                    imageResults.classList.remove('hidden');
                    showImageResults();
                }
            }, 400);

            // Environmental analysis simulation
            setTimeout(() => {
                const envInterval = setInterval(() => {
                    envProgressValue += Math.random() * 15;
                    envProgress.style.width = Math.min(envProgressValue, 100) + '%';
                    
                    if (envProgressValue < 25) {
                        envStatus.textContent = 'Consultando base de dados geológicos...';
                    } else if (envProgressValue < 50) {
                        envStatus.textContent = 'Analisando condições climáticas...';
                    } else if (envProgressValue < 75) {
                        envStatus.textContent = 'Calculando espaço disponível...';
                    } else if (envProgressValue >= 100) {
                        envStatus.textContent = 'Análise ambiental concluída! ✅';
                        clearInterval(envInterval);
                        envResults.classList.remove('hidden');
                        showEnvironmentalResults();
                        continueBtn.disabled = false;
                        analysisComplete = true;
                    }
                }, 500);
            }, 1000);
        }

        function showImageResults() {
            // Simulate species identification
            setTimeout(() => {
                document.getElementById('speciesIdentification').textContent = 
                    'Ficus benjamina (Figueira-benjamim) identificada com alta confiança. Árvore ornamental comum em áreas urbanas.';
                animateConfidence('speciesConfidence', 'speciesPercentage', 94);
            }, 500);

            // Simulate health assessment
            setTimeout(() => {
                document.getElementById('healthStatus').textContent = 
                    'Estado crítico detectado: sinais de podridão no tronco, galhos secos, possível ataque de fungos. Remoção recomendada.';
                animateConfidence('healthConfidence', 'healthPercentage', 89);
            }, 1000);

            // Simulate risk assessment
            setTimeout(() => {
                document.getElementById('riskAssessment').textContent = 
                    'Risco ALTO identificado: estrutura comprometida, proximidade com fiação elétrica, potencial de queda em área de circulação.';
                animateConfidence('riskConfidence', 'riskPercentage', 91);
            }, 1500);
        }

        function showEnvironmentalResults() {
            setTimeout(() => {
                document.getElementById('soilAnalysis').textContent = 
                    'Solo argiloso com boa capacidade de retenção de água. pH 6.2 (ligeiramente ácido). Drenagem adequada. Ideal para maioria das espécies nativas.';
            }, 300);

            setTimeout(() => {
                document.getElementById('climateAnalysis').textContent = 
                    'Clima subtropical úmido, temperatura média 22°C. Precipitação anual 1400mm. Exposição solar plena 6-8h/dia. Ventos moderados.';
            }, 600);

            setTimeout(() => {
                document.getElementById('spaceAnalysis').textContent = 
                    'Área disponível: 18m² aproximadamente. Distância adequada de construções (4m), fiação elétrica (3m) e outras árvores (5m).';
            }, 900);

            setTimeout(() => {
                document.getElementById('urbanContext').textContent = 
                    'Zona residencial de densidade média, calçada de 3m de largura, tráfego moderado. Presença de ciclovia. Área adequada para arborização.';
            }, 1200);
        }

        function animateConfidence(barId, percentId, value) {
            const bar = document.getElementById(barId);
            const percent = document.getElementById(percentId);
            
            let current = 0;
            const increment = value / 50;
            const interval = setInterval(() => {
                current += increment;
                if (current >= value) {
                    current = value;
                    clearInterval(interval);
                }
                bar.style.width = current + '%';
                percent.textContent = Math.round(current) + '%';
            }, 30);
        }

        // Tree Selection
        function selectTree(card, treeId) {
            document.querySelectorAll('.tree-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedTree = treeId;
            
            showTreeDetails(treeId);
            showNotification('Árvore selecionada! Veja os detalhes abaixo.', 'success');
        }

        function showTreeDetails(treeId) {
            const detailsPanel = document.getElementById('selectedTreeDetails');
            const detailsContent = document.getElementById('treeDetails');
            
            const treeData = {
                'ipe-amarelo': {
                    name: 'Ipê Amarelo',
                    latin: 'Handroanthus albus',
                    height: '8-15 metros',
                    lifespan: '50-80 anos',
                    growth: 'Moderado (30-50cm/ano)',
                    flowering: 'Julho-Setembro',
                    maintenance: 'Baixa',
                    benefits: 'Floração espetacular, resistente à seca, madeira de qualidade',
                    care: 'Rega moderada, poda anual de formação, proteção contra ventos fortes nos primeiros anos'
                }
            };
            
            const data = treeData[treeId] || treeData['ipe-amarelo'];
            
            detailsContent.innerHTML = `
                <div class="form-grid">
                    <div class="location-item">
                        <div class="location-label">Altura Adulta</div>
                        <div class="location-value">${data.height}</div>
                    </div>
                    <div class="location-item">
                        <div class="location-label">Longevidade</div>
                        <div class="location-value">${data.lifespan}</div>
                    </div>
                    <div class="location-item">
                        <div class="location-label">Crescimento</div>
                        <div class="location-value">${data.growth}</div>
                    </div>
                    <div class="location-item">
                        <div class="location-label">Floração</div>
                        <div class="location-value">${data.flowering}</div>
                    </div>
                </div>
                <div class="result-content">
                    <strong>Principais Benefícios:</strong> ${data.benefits}<br>
                    <strong>Cuidados Necessários:</strong> ${data.care}
                </div>
            `;
            
            detailsPanel.style.display = 'block';
        }

        // Chat System
        function sendChatMessage() {
            const chatInput = document.getElementById('chatInput');
            const chatMessages = document.getElementById('chatMessages');
            const message = chatInput.value.trim();
            
            if (!message) return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user';
            userMessage.innerHTML = `<strong>👤 Você:</strong> ${message}`;
            chatMessages.appendChild(userMessage);
            
            chatInput.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                const aiMessage = document.createElement('div');
                aiMessage.className = 'chat-message ai';
                aiMessage.innerHTML = `<strong>🤖 ÁrvoreIA:</strong> ${aiResponse}`;
                chatMessages.appendChild(aiMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }

        function generateAIResponse(message) {
            const responses = {
                'plantio': 'A melhor época para plantio é durante o início do período chuvoso (outubro-dezembro), quando há maior umidade natural para estabelecimento das raízes.',
                'cuidados': 'Nos primeiros 6 meses, regue 3x por semana, use tutor para apoio e faça proteção contra ventos. Após 1 ano, realize poda de formação.',
                'especies': 'Para seu local, recomendo especialmente o Ipê Amarelo devido à alta compatibilidade (95%) com as condições de solo e clima identificadas.',
                'custo': 'O custo estimado varia entre R$ 450-800, incluindo muda, preparo do solo, plantio e cuidados iniciais. Investimento que se paga com os benefícios ambientais.',
                'tempo': 'O tempo de crescimento varia, mas em média um Ipê Amarelo atinge a maturidade em 10-15 anos.'
            };