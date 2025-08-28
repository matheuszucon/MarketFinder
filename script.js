// --- script.js ---

document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS ---
    const services = [
        { name: "Limpeza Residencial", description: "Limpeza completa e detalhada para deixar sua casa brilhando.", category: "Limpeza", price: 250, sales: 187, icon: "fa-broom" },
        { name: "Aula Particular de Matemática", description: "Aulas de reforço personalizadas para todas as idades e níveis.", category: "Educação", price: 80, sales: 342, icon: "fa-calculator" },
        { name: "Design de Logotipo", description: "Criação de logotipos únicos e memoráveis para sua marca.", category: "Design", price: 450, sales: 76, icon: "fa-palette" },
        { name: "Desenvolvimento de Site", description: "Construção de sites responsivos e modernos do zero.", category: "Tecnologia", price: 2800, sales: 23, icon: "fa-code" },
        { name: "Passeio com Cães", description: "Passeios seguros e divertidos para o seu melhor amigo.", category: "Pets", price: 50, sales: 456, icon: "fa-dog" },
        { name: "Consultoria Financeira", description: "Ajuda profissional para organizar suas finanças e investimentos.", category: "Finanças", price: 350, sales: 89, icon: "fa-chart-line" },
        { name: "Fotografia de Eventos", description: "Cobertura fotográfica completa para casamentos e festas.", category: "Eventos", price: 1500, sales: 134, icon: "fa-camera-retro" },
        { name: "Tradução de Documentos", description: "Traduções precisas para documentos oficiais e técnicos.", category: "Escrita", price: 180, sales: 267, icon: "fa-file-alt" },
        { name: "Conserto de Computadores", description: "Manutenção e reparo de desktops e notebooks com agilidade.", category: "Tecnologia", price: 200, sales: 198, icon: "fa-laptop-code" },
        { name: "Personal Trainer", description: "Treinamento físico personalizado para atingir seus objetivos.", category: "Saúde", price: 120, sales: 298, icon: "fa-dumbbell" },
        { name: "Manicure e Pedicure", description: "Cuidados completos para unhas das mãos e dos pés.", category: "Beleza", price: 70, sales: 423, icon: "fa-hand-sparkles" },
        { name: "Aulas de Violão", description: "Aprenda a tocar violão do zero ou aprimore suas habilidades.", category: "Música", price: 90, sales: 156, icon: "fa-guitar" },
        { name: "Organização de Armários", description: "Otimize espaços e organize seus armários de forma prática.", category: "Organização", price: 300, sales: 112, icon: "fa-box-open" },
        { name: "Edição de Vídeo", description: "Edição profissional de vídeos para redes sociais e eventos.", category: "Audiovisual", price: 500, sales: 87, icon: "fa-video" },
        { name: "Instalação de Ar Condicionado", description: "Instalação segura e eficiente de aparelhos de ar condicionado.", category: "Instalação", price: 400, sales: 203, icon: "fa-fan" },
        { name: "Catering para Festas", description: "Serviço de buffet completo para seu evento ser inesquecível.", category: "Eventos", price: 2200, sales: 45, icon: "fa-utensils" }
    ];

    // --- ELEMENTOS DOM ---
    const servicesGrid = document.getElementById('services-grid');
    const searchBar = document.getElementById('search-bar');
    const searchBarMobile = document.getElementById('search-bar-mobile');
    const filterContainer = document.getElementById('filter-container');
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const categoryDropdown = document.getElementById('category-dropdown');
    const filterBtnText = document.getElementById('filter-btn-text');
    const filterBtnIcon = document.getElementById('filter-btn-icon');
    const clearFilterBtn = document.getElementById('clear-filter-btn');

    let currentFilter = 'Todos';
    let currentSearchTerm = '';
    let isDropdownOpen = false;

    // --- FUNÇÕES ---

    /**
     * Renderiza os cards de serviço no DOM com base nos filtros atuais.
     */
    const renderServices = () => {
        servicesGrid.innerHTML = ''; // Limpa os cards existentes

        const filteredServices = services.filter(service => {
            const matchesCategory = currentFilter === 'Todos' || service.category === currentFilter;
            const matchesSearch = service.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredServices.length === 0) {
            servicesGrid.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">Nenhum serviço encontrado com os seus critérios.</p>`;
            return;
        }

        filteredServices.forEach((service, index) => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card-enter';
            // Staggered animation delay
            card.style.animationDelay = `${index * 50}ms`;


            if (currentSearchTerm && service.name.toLowerCase().includes(currentSearchTerm.toLowerCase())) {
                card.classList.add('highlight');
            }

            card.innerHTML = `
                <div class="p-6 card-content">
                    <div class="card-body">
                        <div class="flex items-start space-x-4">
                            <div class="flex-shrink-0">
                                <i class="fas ${service.icon} text-3xl text-blue-600 w-8 text-center"></i>
                            </div>
                            <div class="flex-grow">
                                <div class="text-xl font-bold text-gray-800 leading-tight">${service.name}</div>
                                <p class="text-sm text-gray-500">${service.category}</p>
                            </div>
                        </div>
                        <div class="mt-4 flex items-center text-sm text-emerald-600">
                            <i class="fas fa-star mr-2"></i>
                            <span>${service.sales} vendas realizadas</span>
                        </div>
                        <p class="text-gray-500 mt-4 text-sm leading-relaxed">${service.description}</p>
                    </div>
                    <div class="card-footer mt-5 pt-4 border-t border-gray-100">
                        <div class="text-center text-2xl font-bold text-gray-900 mb-3">
                            R$${service.price.toFixed(2).replace('.', ',')}
                        </div>
                        <button class="w-full px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 transform active:scale-95">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            `;
            servicesGrid.appendChild(card);
        });
    };

    /**
     * Populates the category dropdown menu.
     */
    const populateCategoryDropdown = () => {
        categoryDropdown.innerHTML = ''; // Clear existing items
        const categories = ['Todos', ...new Set(services.map(s => s.category).sort())];

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.className = 'category-item';
            if (category === currentFilter) {
                button.classList.add('active');
            }
            button.dataset.category = category;
            categoryDropdown.appendChild(button);
        });
    };

    /**
     * Updates the main filter button's appearance based on the current filter.
     */
    const updateFilterButton = () => {
        if (currentFilter === 'Todos') {
            // Reset to default state
            filterToggleBtn.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
            filterToggleBtn.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
            filterBtnIcon.className = 'fas fa-filter text-gray-500';
            clearFilterBtn.classList.add('hidden');
        } else {
            // Apply active state
            filterToggleBtn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
            filterToggleBtn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
            const service = services.find(s => s.category === currentFilter);
            if (service) {
                filterBtnIcon.className = `fas ${service.icon} text-white`;
            }
            clearFilterBtn.classList.remove('hidden');
            clearFilterBtn.classList.add('fade-in');
        }
        filterBtnText.textContent = currentFilter;
    };

    /**
     * Toggles the category dropdown with animation.
     */
    const toggleDropdown = (forceClose = false) => {
        if (!isDropdownOpen && !forceClose) {
            isDropdownOpen = true;
            categoryDropdown.classList.remove('hidden', 'dropdown-leave');
            categoryDropdown.classList.add('dropdown-enter');
        } else if (isDropdownOpen) {
            isDropdownOpen = false;
            categoryDropdown.classList.remove('dropdown-enter');
            categoryDropdown.classList.add('dropdown-leave');
            categoryDropdown.addEventListener('animationend', () => categoryDropdown.classList.add('hidden'), { once: true });
        }
    };

    // --- EVENT LISTENERS ---

    filterToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });

    clearFilterBtn.addEventListener('click', () => {
        currentFilter = 'Todos';
        updateFilterButton();
        renderServices();
        populateCategoryDropdown();
    });



    categoryDropdown.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            currentFilter = e.target.dataset.category;
            updateFilterButton();
            renderServices();
            populateCategoryDropdown();
            toggleDropdown(true); // Force close
        }
    });

    const handleSearch = (e) => {
        currentSearchTerm = e.target.value;
        if (e.target.id === 'search-bar') searchBarMobile.value = currentSearchTerm;
        else searchBar.value = currentSearchTerm;
        renderServices();
    };

    searchBar.addEventListener('input', handleSearch);
    searchBarMobile.addEventListener('input', handleSearch);

    window.addEventListener('click', (e) => {
        if (!filterContainer.contains(e.target) && isDropdownOpen) {
            toggleDropdown(true); // Force close
        }
    });

    // --- INICIALIZAÇÃO ---
    populateCategoryDropdown();
    renderServices();
});
