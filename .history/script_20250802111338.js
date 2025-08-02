// Datos globales
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];
let evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || {};

// Credenciales de acceso (en un entorno real, esto estaría en el servidor)
const CREDENTIALS = {
    username: 'javier.valenzuela',
    password: 'ConsultorGastro2024!'
};

// Configuración de áreas de evaluación con los checklists profesionales actualizados
const areas = {
    disenoOptimizacion: {
        nombre: 'Diseño y Optimización de Espacios',
        icon: 'fa-cogs',
        items: [
            '¿El diseño de la cocina maximiza el uso de cada metro cuadrado?',
            '¿Existen zonas subutilizadas que podrían ser operativas?',
            '¿Los pasillos permiten un tránsito fluido y sin interrupciones?',
            '¿El layout actual evita cuellos de botella en la circulación?',
            '¿La cocina permite operar cómodamente en horas punta?',
            '¿Hay espacio suficiente para almacenamiento temporal de productos prealistados?',
            '¿El equipamiento está alineado contra las paredes de forma eficiente?',
            '¿El equipamiento está organizado en islas operativas donde es necesario?',
            '¿La cocina está diseñada acorde al volumen de producción esperado?',
            '¿Las distancias entre equipos clave son las mínimas necesarias y operativas?'
        ]
    },
    estacionesTrabajo: {
        nombre: 'Estaciones de Trabajo y Ergonomía',
        icon: 'fa-users',
        items: [
            '¿Cada estación de trabajo tiene espacio suficiente para mise en place?',
            '¿Las mesas de trabajo están distribuidas funcionalmente?',
            '¿El área de emplatado está separada de la zona de cocción?',
            '¿Se ha considerado la ergonomía del personal en la ubicación del equipamiento?',
            '¿Las zonas de paso son seguras y libres de obstáculos?',
            '¿Los utensilios son accesibles desde cada estación de trabajo?',
            '¿Se usan carros, estantes móviles o superficies abatibles para optimizar espacio?',
            '¿El tamaño de los muebles es adecuado sin ocupar espacio innecesario?',
            '¿Las estanterías aprovechan la altura disponible sin generar riesgos?',
            '¿Las paredes se utilizan para colgar utensilios, bandejas u otros elementos?'
        ]
    },
    flexibilidadAdaptacion: {
        nombre: 'Flexibilidad y Adaptación Operativa',
        icon: 'fa-expand-arrows-alt',
        items: [
            '¿Existen superficies auxiliares móviles para uso en horas punta?',
            '¿Las zonas de preparación están cercanas a las zonas de cocción?',
            '¿La bodega o cámara de frío está cerca de la recepción y preparación inicial?',
            '¿Existen equipos duplicados o redundantes que podrían eliminarse?',
            '¿El diseño contempla una posible expansión futura?',
            '¿Hay zonas muertas o espacios ciegos sin uso eficiente?',
            '¿Hornos, freidoras y planchas están ubicados según su secuencia lógica de uso?',
            '¿Las líneas caliente y fría están correctamente separadas?',
            '¿El área de despacho está ubicada cerca de la línea de cocción?',
            '¿Existe suficiente espacio para montaje de pedidos tanto de salón como delivery?'
        ]
    },
    flujosCirculacion: {
        nombre: 'Flujos y Circulación Operativa',
        icon: 'fa-route',
        items: [
            '¿El flujo de platos sucios y platos limpios está correctamente separado?',
            '¿La recepción de materias primas no interfiere con la producción?',
            '¿Existen zonas flexibles que permiten realizar tareas múltiples?',
            '¿Las zonas de almacenamiento intermedio están cerca de la producción?',
            '¿El flujo de ingredientes es lógico desde almacenamiento hasta producción?',
            '¿La cocina cuenta con equipamiento modular y optimizado?',
            '¿La facilidad de limpieza fue considerada en el diseño?',
            '¿Las cocinas permiten operaciones simultáneas sin colisiones entre personal?',
            '¿Hay espacio suficiente para el tránsito de carros, bandejas o equipos móviles?',
            '¿El mobiliario cumple con normas de seguridad y accesibilidad?'
        ]
    },
    refrigeracionAccesos: {
        nombre: 'Refrigeración, Accesos y Seguridad',
        icon: 'fa-shield-alt',
        items: [
            '¿Las cámaras refrigeradas tienen acceso directo desde las zonas de preparación?',
            '¿Existen obstáculos que generen riesgo cerca de la cocina caliente?',
            '¿Las puertas de refrigeradores, hornos o cámaras abren sin bloquear el paso?',
            '¿Se han considerado estaciones satélite externas si son necesarias?',
            '¿El área de retiro de delivery está separada del salón y de la cocina?',
            '¿Se han evaluado planos alternativos que podrían ser más eficientes?',
            '¿La iluminación favorece la productividad y seguridad del equipo?',
            '¿Los espacios permiten adaptarse fácilmente a cambios de menú o procesos?',
            '¿Hay superficies específicas para manipular alérgenos de forma segura?',
            '¿El espacio cumple con las normativas sanitarias chilenas vigentes?'
        ]
    },
    layoutFuncional: {
        nombre: 'Layout Funcional y Distribución Operativa',
        icon: 'fa-sitemap',
        items: [
            '¿Las zonas frías están claramente delimitadas?',
            '¿Las zonas calientes están claramente delimitadas?',
            '¿Las zonas de postres están claramente delimitadas?',
            '¿Las zonas de pizzas están claramente delimitadas?',
            '¿Las zonas de montaje están claramente delimitadas?',
            '¿Cada estación tiene acceso directo a los equipos que necesita?',
            '¿Las cocinas calientes están ubicadas cerca de las salidas de extracción?',
            '¿La pastelería está ubicada lejos de fuentes de humedad o calor?',
            '¿La cocina fría cuenta con refrigeración inmediata como bajo mesones o vitrinas?',
            '¿Existe una estación específica para mise en place claramente definida?',
            '¿El área de ensaladas está separada del área de carnes y proteínas?',
            '¿El área de emplatado está diseñada para ser eficiente y operativa?',
            '¿Los puntos de entrega están claramente definidos?',
            '¿Las estaciones de fritura están alejadas de hornos de pastelería?',
            '¿Las estaciones de fritura tienen extintor cerca?'
        ]
    },
    almacenamientoFrios: {
        nombre: 'Almacenamiento de Fríos, Secos y Húmedos',
        icon: 'fa-snowflake',
        items: [
            '¿Los productos fríos están almacenados en refrigeradores cercanos a su estación?',
            '¿Carnes, pescados y vegetales están separados dentro de la cámara de frío?',
            '¿Las estaciones calientes tienen almacenamiento intermedio para productos listos?',
            '¿Los ingredientes de postres están alejados de fuentes de calor y humedad?',
            '¿Existe un espacio específico para masas, salsas y toppings?',
            '¿Cada estación tiene un refrigerador o bajo mesada para productos de uso inmediato?',
            '¿Se aplican normas para evitar contaminación cruzada en el almacenamiento?',
            '¿Los postres refrigerados están almacenados en cámaras o vitrinas específicas?',
            '¿El almacenamiento permite un flujo lógico desde refrigeración hasta producción?',
            '¿Los productos calientes listos se mantienen a temperatura adecuada en zona de pase?',
            '¿Se aplican normas para etiquetado con fecha y peso en el almacenamiento?'
        ]
    },
    bodegaLimpieza: {
        nombre: 'Bodega, Limpieza y Bioseguridad',
        icon: 'fa-broom',
        items: [
            '¿El área de secos está separada de la cocina y protegida de humedad?',
            '¿Las estanterías están elevadas del piso para cumplir normas sanitarias?',
            '¿Los secos están organizados por familia de productos (harinas, aceites, especias)?',
            '¿Existen límites definidos de stock mínimo y máximo?',
            '¿La bodega de secos cuenta con ventilación adecuada y control de temperatura?',
            '¿Se usan etiquetas con fecha de ingreso y vencimiento visibles en todos los productos?',
            '¿El acceso permite tomar productos rápidamente y sin desorden?',
            '¿Las áreas de bodega permiten reposición sin generar desorden?',
            '¿La bodega está ubicada estratégicamente para acceso eficiente desde producción?',
            '¿La bodega de húmedos está separada de la de secos y de la cocina?'
        ]
    },
    limpiezaSeguridad: {
        nombre: 'Limpieza, Seguridad y Normativa Sanitaria',
        icon: 'fa-shield-alt',
        items: [
            '¿La zona de lavado y limpieza está físicamente separada de la cocina?',
            '¿Los productos químicos están rotulados y almacenados en estantes separados?',
            '¿El área de limpieza tiene ventilación adecuada?',
            '¿Traperos, mopas y baldes están organizados y colgados adecuadamente?',
            '¿Existe un lavadero exclusivo para utensilios de limpieza?',
            '¿Los químicos están almacenados lejos de zonas de alimentos?',
            '¿El área incluye espacios para almacenamiento de basura, guantes y paños?',
            '¿Se realizan chequeos diarios del área de limpieza?',
            '¿El área permite acceso cómodo sin interferir la operación productiva?',
            '¿Cumple con la normativa sanitaria chilena vigente?'
        ]
    },
    organizacionRoles: {
        nombre: 'Organización de Roles y Personal',
        icon: 'fa-users-cog',
        items: [
            '¿Cada miembro del equipo conoce claramente su rol operativo?',
            '¿Existe un organigrama funcional o visible para todo el equipo?',
            '¿Se evita la rotación innecesaria de personal entre estaciones?',
            '¿Cada estación tiene un responsable designado y claro?',
            '¿Los roles (chef, grill, frío, postres, despacho, limpieza) están claramente definidos?',
            '¿Las tareas están asignadas según habilidades y experiencia del personal?',
            '¿Existen manuales o protocolos de funciones?',
            '¿Se realizan reuniones operativas diarias para alineación del equipo?',
            '¿Los reemplazos o ausencias tienen protocolos claros y establecidos?',
            '¿La distribución de roles permite mantener la productividad y eficiencia?'
        ]
    },
    extrasValidacion: {
        nombre: 'Extras de Validación de Oferta (Opcional)',
        icon: 'fa-star',
        items: [
            '¿Tiene en su carta el postre Volcán de Chocolate?',
            '¿Tiene en su carta el postre Helado de Vainilla?'
        ]
    }
};

// Variables para gráficos
let areaChart, distributionChart;

// Inicialización del sistema
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema iniciado');
    
    // Verificar si ya está logueado
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        showMainApp();
    } else {
        showLoginScreen();
    }
    
    // Configurar formulario de login
    setupLoginForm();
});

// Configurar sistema de login
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

// Manejar el proceso de login
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginBtn = document.querySelector('.login-btn');
    const loginError = document.getElementById('loginError');
    
    // Mostrar estado de carga
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
    loginBtn.disabled = true;
    loginError.style.display = 'none';
    
    // Simular verificación (en un entorno real sería una llamada al servidor)
    setTimeout(() => {
        if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
            // Login exitoso
            loginBtn.classList.add('login-success');
            loginBtn.innerHTML = '<i class="fas fa-check"></i> ¡Bienvenido!';
            
            // Guardar estado de login
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Mostrar aplicación después de animación
            setTimeout(() => {
                showMainApp();
            }, 1000);
            
        } else {
            // Login fallido
            loginError.style.display = 'block';
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            loginBtn.disabled = false;
            loginBtn.classList.remove('login-success');
            
            // Limpiar campos
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            
            // Animación de error
            const loginContainer = document.querySelector('.login-container');
            loginContainer.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginContainer.style.animation = '';
            }, 500);
        }
    }, 1500); // Simular tiempo de verificación
}

// Mostrar pantalla de login
function showLoginScreen() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    if (loginScreen && mainApp) {
        loginScreen.style.display = 'flex';
        mainApp.style.display = 'none';
        
        // Focus en el campo de usuario
        setTimeout(() => {
            const usernameField = document.getElementById('username');
            if (usernameField) usernameField.focus();
        }, 500);
    }
}

// Mostrar aplicación principal
function showMainApp() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    if (loginScreen && mainApp) {
        // Animación de transición
        loginScreen.classList.add('fadeOut');
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainApp.style.display = 'block';
            mainApp.classList.add('fadeIn');
            
            // Inicializar aplicación
            initializeApp();
        }, 500);
    }
}

// Inicializar la aplicación principal
function initializeApp() {
    console.log('Inicializando aplicación principal...');
    
    // Cargar datos guardados primero
    loadData();
    
    // Inicializar componentes
    initializeNavigation();
    setupForms();
    setupFilters();
    
    // Cargar vistas
    loadDashboard();
    loadEmpresas();
    
    // Auto-guardar cada 30 segundos
    setInterval(saveData, 30000);
    
    console.log('Sistema completamente inicializado');
    showNotification('¡Bienvenido Javier! Sistema cargado correctamente', 'success');
}

// Función de logout
function logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Limpiar estado de login
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('loginTime');
        
        // Mostrar pantalla de login
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen && mainApp) {
            mainApp.classList.add('fadeOut');
            
            setTimeout(() => {
                mainApp.style.display = 'none';
                loginScreen.style.display = 'flex';
                loginScreen.classList.remove('fadeOut');
                loginScreen.classList.add('fadeIn');
                
                // Limpiar formulario
                document.getElementById('loginForm').reset();
                document.getElementById('loginError').style.display = 'none';
                
                // Reset botón de login
                const loginBtn = document.querySelector('.login-btn');
                loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
                loginBtn.disabled = false;
                loginBtn.classList.remove('login-success');
            }, 500);
        }
        
        showNotification('Sesión cerrada correctamente', 'info');
    }
}

// Sistema de navegación
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Agregar clase active al link clickeado
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Cargar datos específicos de la sección
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'empresas':
            loadEmpresas();
            break;
        case 'evaluaciones':
            loadEvaluaciones();
            break;
    }
}

// Dashboard principal
function loadDashboard() {
    updateKPIs();
    updateCharts();
    updateEmpresasOverview();
}

function updateKPIs() {
    const totalEmpresas = empresas.length;
    let totalCumplimiento = 0;
    let areasCriticas = 0;
    let mejorEmpresa = '';
    let mejorPuntaje = 0;
    
    if (totalEmpresas > 0) {
        empresas.forEach(empresa => {
            const evaluacion = evaluaciones[empresa.id];
            if (evaluacion) {
                const cumplimiento = calcularCumplimientoGeneral(evaluacion);
                totalCumplimiento += cumplimiento;
                
                if (cumplimiento > mejorPuntaje) {
                    mejorPuntaje = cumplimiento;
                    mejorEmpresa = empresa.nombre;
                }
                
                // Contar áreas críticas (< 50%)
                Object.keys(areas).forEach(areaKey => {
                    const areaCumplimiento = calcularCumplimientoArea(evaluacion, areaKey);
                    if (areaCumplimiento < 50) {
                        areasCriticas++;
                    }
                });
            }
        });
    }
    
    const promedioCumplimiento = totalEmpresas > 0 ? Math.round(totalCumplimiento / totalEmpresas) : 0;
    
    document.getElementById('total-empresas').textContent = totalEmpresas;
    document.getElementById('promedio-cumplimiento').textContent = promedioCumplimiento + '%';
    document.getElementById('areas-criticas').textContent = areasCriticas;
    document.getElementById('mejor-empresa').textContent = mejorEmpresa || '-';
}

function updateCharts() {
    updateAreaChart();
    updateDistributionChart();
}

function updateAreaChart() {
    const canvas = document.getElementById('areaChart');
    if (!canvas) return;
    
    // Calcular cumplimiento promedio por área
    const areaData = {};
    const areaLabels = [];
    
    Object.keys(areas).forEach(areaKey => {
        let totalCumplimiento = 0;
        let empresasConEvaluacion = 0;
        
        empresas.forEach(empresa => {
            const evaluacion = evaluaciones[empresa.id];
            if (evaluacion && evaluacion[areaKey]) {
                totalCumplimiento += calcularCumplimientoArea(evaluacion, areaKey);
                empresasConEvaluacion++;
            }
        });
        
        const promedio = empresasConEvaluacion > 0 ? 
            Math.round(totalCumplimiento / empresasConEvaluacion) : 0;
        
        // Usar nombres más cortos para las etiquetas
        const nombreCorto = areas[areaKey].nombre.split(' ').slice(0, 2).join(' ');
        areaLabels.push(nombreCorto);
        areaData[nombreCorto] = promedio;
    });
    
    if (areaChart) {
        areaChart.destroy();
        areaChart = null;
    }
    
    // Redimensionar canvas
    canvas.width = 400;
    canvas.height = 300;
    
    const ctx = canvas.getContext('2d');
    
    areaChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: areaLabels,
            datasets: [{
                label: 'Cumplimiento (%)',
                data: Object.values(areaData),
                backgroundColor: [
                    '#4CAF50', '#8BC34A', '#CDDC39', '#FF9800',
                    '#FF5722', '#E91E63', '#9C27B0', '#673AB7',
                    '#3F51B5', '#2196F3'
                ],
                borderColor: '#fff',
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 20,
                    left: 10,
                    right: 10
                }
            }
        }
    });
}

function updateDistributionChart() {
    const canvas = document.getElementById('distributionChart');
    if (!canvas) return;
    
    // Calcular distribución por nivel de cumplimiento
    const distribution = { excellent: 0, good: 0, average: 0, poor: 0 };
    
    empresas.forEach(empresa => {
        const evaluacion = evaluaciones[empresa.id];
        if (evaluacion && Object.keys(evaluacion).length > 0) {
            const cumplimiento = calcularCumplimientoGeneral(evaluacion);
            if (cumplimiento >= 80) distribution.excellent++;
            else if (cumplimiento >= 60) distribution.good++;
            else if (cumplimiento >= 40) distribution.average++;
            else distribution.poor++;
        }
    });
    
    if (distributionChart) {
        distributionChart.destroy();
        distributionChart = null;
    }
    
    // Redimensionar canvas
    canvas.width = 400;
    canvas.height = 300;
    
    const ctx = canvas.getContext('2d');
    
    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Excelente (≥80%)', 'Bueno (60-79%)', 'Regular (40-59%)', 'Crítico (<40%)'],
            datasets: [{
                data: [distribution.excellent, distribution.good, distribution.average, distribution.poor],
                backgroundColor: ['#4CAF50', '#8BC34A', '#FF9800', '#f44336'],
                borderColor: '#fff',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12
                        },
                        padding: 15
                    }
                }
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            }
        }
    });
}

function updateEmpresasOverview() {
    const container = document.getElementById('empresas-list');
    if (!container) return;
    
    if (empresas.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-plus-circle"></i>
                <p>Agrega tu primera empresa para ver el dashboard</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = empresas.map(empresa => {
        const evaluacion = evaluaciones[empresa.id];
        const cumplimiento = evaluacion ? calcularCumplimientoGeneral(evaluacion) : 0;
        const semaforoClass = getSemaforoClass(cumplimiento);
        
        return `
            <div class="empresa-card">
                <h4>${empresa.nombre}</h4>
                <div class="empresa-info">
                    <span>${empresa.tipo}</span>
                    <span>Plan ${empresa.plan}</span>
                </div>
                <div class="semaforo">
                    <div class="semaforo-light ${semaforoClass}"></div>
                    <span>${cumplimiento}% cumplimiento</span>
                </div>
                <div class="empresa-actions">
                    <button class="btn btn-small btn-primary" onclick="openEvaluacion('${empresa.id}')">
                        <i class="fas fa-clipboard-check"></i> Evaluar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Gestión de empresas
function loadEmpresas() {
    const container = document.getElementById('empresas-grid');
    if (!container) return;
    
    if (empresas.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-building"></i>
                <p>No hay empresas registradas</p>
                <button class="btn btn-primary" onclick="showModal('empresaModal')">
                    <i class="fas fa-plus"></i> Agregar Primera Empresa
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = empresas.map(empresa => {
        const evaluacion = evaluaciones[empresa.id];
        const cumplimiento = evaluacion ? calcularCumplimientoGeneral(evaluacion) : 0;
        const areasEvaluadas = evaluacion ? Object.keys(evaluacion).length : 0;
        const semaforoClass = getSemaforoClass(cumplimiento);
        
        return `
            <div class="empresa-card-detailed">
                <div class="empresa-header">
                    <div class="empresa-title">
                        <h3>${empresa.nombre}</h3>
                        <span class="tipo">${empresa.tipo}</span>
                    </div>
                    <div class="semaforo">
                        <div class="semaforo-light ${semaforoClass}"></div>
                    </div>
                </div>
                
                <div class="empresa-stats">
                    <div class="stat">
                        <div class="number">${cumplimiento}%</div>
                        <div class="label">Cumplimiento</div>
                    </div>
                    <div class="stat">
                        <div class="number">${areasEvaluadas}/10</div>
                        <div class="label">Áreas Evaluadas</div>
                    </div>
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${cumplimiento}%"></div>
                </div>
                
                <div class="empresa-info" style="margin: 1rem 0; font-size: 0.9rem; color: #666;">
                    <p><i class="fas fa-map-marker-alt"></i> ${empresa.ubicacion}</p>
                    <p><i class="fas fa-user"></i> ${empresa.contacto}</p>
                    <p><i class="fas fa-crown"></i> Plan ${empresa.plan}</p>
                </div>
                
                <div class="empresa-actions">
                    <button class="btn btn-primary" onclick="openEvaluacion('${empresa.id}')">
                        <i class="fas fa-clipboard-check"></i> Evaluar
                    </button>
                    <button class="btn btn-secondary" onclick="editEmpresa('${empresa.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-success btn-small" onclick="downloadPDF('${empresa.id}')" title="Descargar PDF">
                        <i class="fas fa-file-pdf"></i> PDF
                    </button>
                    <button class="btn btn-danger" onclick="deleteEmpresa('${empresa.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Configuración de formularios
function setupForms() {
    const empresaForm = document.getElementById('empresaForm');
    if (empresaForm) {
        empresaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEmpresa();
        });
    }
}

function saveEmpresa() {
    const formData = new FormData(document.getElementById('empresaForm'));
    const empresa = {
        id: Date.now().toString(),
        nombre: formData.get('nombre'),
        tipo: formData.get('tipo'),
        ubicacion: formData.get('ubicacion'),
        contacto: formData.get('contacto'),
        telefono: formData.get('telefono') || '',
        email: formData.get('email') || '',
        plan: formData.get('plan'),
        fechaCreacion: new Date().toISOString()
    };
    
    empresas.push(empresa);
    saveData();
    hideModal('empresaModal');
    document.getElementById('empresaForm').reset();
    loadEmpresas();
    loadDashboard();
    
    // Agregar empresa al filtro
    updateEmpresaFilter();
    
    // Mostrar mensaje de éxito
    showNotification('Empresa agregada exitosamente', 'success');
}

function editEmpresa(id) {
    const empresa = empresas.find(e => e.id === id);
    if (!empresa) return;
    
    // Llenar formulario con datos existentes
    document.getElementById('nombre').value = empresa.nombre;
    document.getElementById('tipo').value = empresa.tipo;
    document.getElementById('ubicacion').value = empresa.ubicacion;
    document.getElementById('contacto').value = empresa.contacto;
    document.getElementById('telefono').value = empresa.telefono || '';
    document.getElementById('email').value = empresa.email || '';
    document.getElementById('plan').value = empresa.plan;
    
    // Cambiar comportamiento del formulario para edición
    const form = document.getElementById('empresaForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        updateEmpresa(id);
    };
    
    showModal('empresaModal');
}

function updateEmpresa(id) {
    const formData = new FormData(document.getElementById('empresaForm'));
    const empresaIndex = empresas.findIndex(e => e.id === id);
    
    if (empresaIndex !== -1) {
        empresas[empresaIndex] = {
            ...empresas[empresaIndex],
            nombre: formData.get('nombre'),
            tipo: formData.get('tipo'),
            ubicacion: formData.get('ubicacion'),
            contacto: formData.get('contacto'),
            telefono: formData.get('telefono') || '',
            email: formData.get('email') || '',
            plan: formData.get('plan')
        };
        
        saveData();
        hideModal('empresaModal');
        document.getElementById('empresaForm').reset();
        loadEmpresas();
        loadDashboard();
        updateEmpresaFilter();
        
        // Restaurar comportamiento original del formulario
        document.getElementById('empresaForm').onsubmit = function(e) {
            e.preventDefault();
            saveEmpresa();
        };
        
        showNotification('Empresa actualizada exitosamente', 'success');
    }
}

function deleteEmpresa(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta empresa? Esta acción no se puede deshacer.')) {
        empresas = empresas.filter(e => e.id !== id);
        delete evaluaciones[id];
        saveData();
        loadEmpresas();
        loadDashboard();
        updateEmpresaFilter();
        showNotification('Empresa eliminada exitosamente', 'warning');
    }
}

// Sistema de evaluaciones
function loadEvaluaciones() {
    updateEmpresaFilter();
    showEvaluacionesContent();
}

function setupFilters() {
    const empresaFilter = document.getElementById('empresa-filter');
    const areaFilter = document.getElementById('area-filter');
    
    if (empresaFilter && areaFilter) {
        empresaFilter.addEventListener('change', showEvaluacionesContent);
        areaFilter.addEventListener('change', showEvaluacionesContent);
    }
}

function updateEmpresaFilter() {
    const filter = document.getElementById('empresa-filter');
    if (!filter) return;
    
    filter.innerHTML = '<option value="">Todas las empresas</option>';
    
    empresas.forEach(empresa => {
        filter.innerHTML += `<option value="${empresa.id}">${empresa.nombre}</option>`;
    });
}

function showEvaluacionesContent() {
    const empresaFilter = document.getElementById('empresa-filter');
    const areaFilterElement = document.getElementById('area-filter');
    const container = document.getElementById('evaluaciones-content');
    
    if (!empresaFilter || !container) return;
    
    const empresaId = empresaFilter.value;
    const areaFilter = areaFilterElement ? areaFilterElement.value : '';
    
    if (!empresaId) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-check"></i>
                <p>Selecciona una empresa para ver sus evaluaciones</p>
            </div>
        `;
        return;
    }
    
    const empresa = empresas.find(e => e.id === empresaId);
    const evaluacion = evaluaciones[empresaId];
    
    if (!evaluacion) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-check"></i>
                <p>Esta empresa aún no tiene evaluaciones</p>
                <button class="btn btn-primary" onclick="openEvaluacion('${empresaId}')">
                    <i class="fas fa-plus"></i> Crear Primera Evaluación
                </button>
            </div>
        `;
        return;
    }
    
    // Mostrar resultados de evaluación
    showEvaluacionResults(empresa, evaluacion, areaFilter);
}

function showEvaluacionResults(empresa, evaluacion, areaFilter) {
    const container = document.getElementById('evaluaciones-content');
    const cumplimientoGeneral = calcularCumplimientoGeneral(evaluacion);
    const scoreClass = getScoreClass(cumplimientoGeneral);
    
    let areasToShow = Object.keys(areas);
    if (areaFilter) {
        areasToShow = [areaFilter];
    }
    
    const areasBreakdown = areasToShow.map(areaKey => {
        const areaCumplimiento = calcularCumplimientoArea(evaluacion, areaKey);
        const areaScoreClass = getScoreClass(areaCumplimiento);
        
        return `
            <div class="area-result ${areaScoreClass}">
                <h4><i class="fas ${areas[areaKey].icon}"></i> ${areas[areaKey].nombre}</h4>
                <div class="percentage">${areaCumplimiento}%</div>
                <div class="items">${calcularItemsCumplidos(evaluacion, areaKey)}/${areas[areaKey].items.length} items cumplidos</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="evaluacion-results">
            <div class="results-header">
                <div>
                    <h2>${empresa.nombre}</h2>
                    <p>Última evaluación: ${new Date().toLocaleDateString()}</p>
                </div>
                <div class="overall-score">
                    <div class="score-circle ${scoreClass}">
                        ${cumplimientoGeneral}%
                    </div>
                    <p>Cumplimiento General</p>
                </div>
            </div>
            
            <div class="areas-breakdown">
                ${areasBreakdown}
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-primary" onclick="openEvaluacion('${empresa.id}')">
                    <i class="fas fa-edit"></i> Actualizar Evaluación
                </button>
                <button class="btn btn-secondary" onclick="printEvaluacion('${empresa.id}')">
                    <i class="fas fa-print"></i> Imprimir Reporte
                </button>
                <button class="btn btn-success" onclick="downloadPDF('${empresa.id}')">
                    <i class="fas fa-file-pdf"></i> Descargar PDF
                </button>
            </div>
        </div>
    `;
}

function openEvaluacion(empresaId) {
    const empresa = empresas.find(e => e.id === empresaId);
    if (!empresa) return;
    
    const evaluacionActual = evaluaciones[empresaId] || {};
    
    document.getElementById('evaluacion-title').innerHTML = 
        `<i class="fas fa-clipboard-check"></i> Evaluación - ${empresa.nombre}`;
    
    const content = document.getElementById('evaluacion-content');
    
    const areasHtml = Object.keys(areas).map(areaKey => {
        const area = areas[areaKey];
        const evaluacionArea = evaluacionActual[areaKey] || {};
        
        const itemsHtml = area.items.map((item, index) => {
            const isChecked = evaluacionArea[index] ? 'checked' : '';
            return `
                <div class="checklist-item">
                    <input type="checkbox" id="${areaKey}-${index}" ${isChecked} 
                           onchange="updateAreaProgress('${areaKey}')">
                    <label for="${areaKey}-${index}">${item}</label>
                </div>
            `;
        }).join('');
        
        const cumplimiento = calcularCumplimientoArea(evaluacionActual, areaKey);
        const semaforoClass = getSemaforoClass(cumplimiento);
        
        return `
            <div class="area-section" data-area="${areaKey}">
                <h3><i class="fas ${area.icon}"></i> ${area.nombre}</h3>
                ${itemsHtml}
                <div class="area-progress">
                    <div class="semaforo">
                        <div class="semaforo-light ${semaforoClass}"></div>
                    </div>
                    <div class="area-percentage">${cumplimiento}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${cumplimiento}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = `
        ${areasHtml}
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="hideModal('evaluacionModal')">
                Cancelar
            </button>
            <button type="button" class="btn btn-primary" onclick="saveEvaluacion('${empresaId}')">
                <i class="fas fa-save"></i> Guardar Evaluación
            </button>
        </div>
    `;
    
    showModal('evaluacionModal');
}

function updateAreaProgress(areaKey) {
    const areaSection = document.querySelector(`[data-area="${areaKey}"]`);
    if (!areaSection) return;
    
    const checkboxes = areaSection.querySelectorAll('input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);
    
    const percentageElement = areaSection.querySelector('.area-percentage');
    const progressFill = areaSection.querySelector('.progress-fill');
    const semaforoLight = areaSection.querySelector('.semaforo-light');
    
    if (percentageElement) percentageElement.textContent = percentage + '%';
    if (progressFill) progressFill.style.width = percentage + '%';
    
    // Actualizar semáforo
    if (semaforoLight) {
        semaforoLight.className = 'semaforo-light ' + getSemaforoClass(percentage);
    }
}

function saveEvaluacion(empresaId) {
    const evaluacion = {};
    let totalItems = 0;
    let itemsCompletos = 0;
    
    // Recopilar datos de todas las áreas
    Object.keys(areas).forEach(areaKey => {
        const areaSection = document.querySelector(`[data-area="${areaKey}"]`);
        if (areaSection) {
            const checkboxes = areaSection.querySelectorAll('input[type="checkbox"]');
            
            evaluacion[areaKey] = {};
            checkboxes.forEach((checkbox, index) => {
                evaluacion[areaKey][index] = checkbox.checked;
                totalItems++;
                if (checkbox.checked) itemsCompletos++;
            });
        }
    });
    
    // Agregar metadatos de la evaluación
    evaluacion._metadata = {
        fechaEvaluacion: new Date().toISOString(),
        totalItems: totalItems,
        itemsCompletos: itemsCompletos,
        porcentajeGeneral: Math.round((itemsCompletos / totalItems) * 100),
        version: '1.0'
    };
    
    // Guardar en el objeto global y localStorage
    evaluaciones[empresaId] = evaluacion;
    saveData();
    
    // Verificar que se guardó correctamente
    const verificacion = JSON.parse(localStorage.getItem('evaluaciones'));
    if (verificacion && verificacion[empresaId]) {
        console.log('Evaluación guardada correctamente:', verificacion[empresaId]);
        hideModal('evaluacionModal');
        
        // Actualizar todas las vistas
        setTimeout(() => {
            loadDashboard();
            showEvaluacionesContent();
            loadEmpresas();
        }, 100);
        
        showNotification(`Evaluación guardada exitosamente - ${evaluacion._metadata.porcentajeGeneral}% cumplimiento`, 'success');
    } else {
        console.error('Error al guardar la evaluación');
        showNotification('Error al guardar la evaluación', 'error');
    }
}

// Funciones de cálculo mejoradas
function calcularCumplimientoArea(evaluacion, areaKey) {
    if (!evaluacion || !evaluacion[areaKey]) return 0;
    
    // Filtrar solo las propiedades que no sean metadata
    const items = Object.entries(evaluacion[areaKey])
        .filter(([key, value]) => !key.startsWith('_'))
        .map(([key, value]) => value);
    
    if (items.length === 0) return 0;
    
    const cumplidos = items.filter(item => item === true).length;
    return Math.round((cumplidos / items.length) * 100);
}

function calcularCumplimientoGeneral(evaluacion) {
    if (!evaluacion || Object.keys(evaluacion).length === 0) return 0;
    
    // Usar metadata si está disponible
    if (evaluacion._metadata && evaluacion._metadata.porcentajeGeneral) {
        return evaluacion._metadata.porcentajeGeneral;
    }
    
    // Calcular manualmente
    const areaKeys = Object.keys(areas);
    let totalCumplimiento = 0;
    let areasConDatos = 0;
    
    areaKeys.forEach(areaKey => {
        if (evaluacion[areaKey] && Object.keys(evaluacion[areaKey]).length > 0) {
            totalCumplimiento += calcularCumplimientoArea(evaluacion, areaKey);
            areasConDatos++;
        }
    });
    
    return areasConDatos > 0 ? Math.round(totalCumplimiento / areasConDatos) : 0;
}

function calcularItemsCumplidos(evaluacion, areaKey) {
    if (!evaluacion || !evaluacion[areaKey]) return 0;
    
    // Filtrar solo las propiedades que no sean metadata
    const items = Object.entries(evaluacion[areaKey])
        .filter(([key, value]) => !key.startsWith('_'))
        .map(([key, value]) => value);
    
    return items.filter(item => item === true).length;
}

// Funciones de utilidad
function getSemaforoClass(percentage) {
    if (percentage >= 80) return 'green';
    if (percentage >= 50) return 'yellow';
    return 'red';
}

function getScoreClass(percentage) {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'average';
    return 'poor';
}

// Sistema de modales
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        hideModal(modalId);
    }
});

// Persistencia de datos mejorada
function saveData() {
    try {
        // Guardar con timestamp para debugging
        const timestamp = new Date().toISOString();
        
        // Preparar datos para guardar
        const dataToSave = {
            empresas: empresas,
            evaluaciones: evaluaciones,
            lastSaved: timestamp,
            version: '1.0'
        };
        
        // Guardar en localStorage
        localStorage.setItem('empresas', JSON.stringify(empresas));
        localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
        localStorage.setItem('consultoria_backup', JSON.stringify(dataToSave));
        
        console.log(`Datos guardados exitosamente a las ${timestamp}`);
        console.log('Total empresas:', empresas.length);
        console.log('Total evaluaciones:', Object.keys(evaluaciones).length);
        
        return true;
    } catch (error) {
        console.error('Error al guardar datos:', error);
        showNotification('Error al guardar datos', 'error');
        return false;
    }
}

// Función para cargar datos al iniciar
function loadData() {
    try {
        // Cargar empresas
        const empresasGuardadas = localStorage.getItem('empresas');
        if (empresasGuardadas) {
            empresas = JSON.parse(empresasGuardadas);
        }
        
        // Cargar evaluaciones
        const evaluacionesGuardadas = localStorage.getItem('evaluaciones');
        if (evaluacionesGuardadas) {
            evaluaciones = JSON.parse(evaluacionesGuardadas);
        }
        
        console.log('Datos cargados exitosamente');
        console.log('Empresas cargadas:', empresas.length);
        console.log('Evaluaciones cargadas:', Object.keys(evaluaciones).length);
        
        return true;
    } catch (error) {
        console.error('Error al cargar datos:', error);
        showNotification('Error al cargar datos guardados', 'warning');
        return false;
    }
}

// Función para exportar datos
function exportData() {
    try {
        const dataToExport = {
            empresas: empresas,
            evaluaciones: evaluaciones,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `consultoria_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showNotification('Datos exportados exitosamente', 'success');
    } catch (error) {
        console.error('Error al exportar datos:', error);
        showNotification('Error al exportar datos', 'error');
    }
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        border-left: 4px solid #667eea;
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.borderLeftColor = '#4CAF50';
    } else if (type === 'warning') {
        notification.style.borderLeftColor = '#FF9800';
    } else if (type === 'error') {
        notification.style.borderLeftColor = '#f44336';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para descargar PDF profesional
function downloadPDF(empresaId) {
    const empresa = empresas.find(e => e.id === empresaId);
    const evaluacion = evaluaciones[empresaId];
    
    if (!empresa) {
        showNotification('Empresa no encontrada', 'error');
        return;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configuración de colores
        const primaryColor = [102, 126, 234];  // #667eea
        const secondaryColor = [118, 75, 162]; // #764ba2
        const greenColor = [76, 175, 80];      // #4CAF50
        const orangeColor = [255, 152, 0];     // #FF9800
        const redColor = [244, 67, 54];        // #f44336
        const grayColor = [128, 128, 128];     // #808080
        
        let yPosition = 20;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        
        // ENCABEZADO
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 30, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('REPORTE DE EVALUACIÓN GASTRONÓMICA', pageWidth/2, 15, { align: 'center' });
        doc.setFontSize(12);
        doc.text('Javier Valenzuela - Consultor Gastronómico', pageWidth/2, 25, { align: 'center' });
        
        yPosition = 45;
        
        // INFORMACIÓN DE LA EMPRESA
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('INFORMACIÓN DE LA EMPRESA', margin, yPosition);
        
        yPosition += 15;
        
        // Cuadro con información de la empresa
        doc.setFillColor(248, 249, 250);
        doc.rect(margin, yPosition - 5, contentWidth, 35, 'F');
        doc.setDrawColor(...primaryColor);
        doc.rect(margin, yPosition - 5, contentWidth, 35, 'S');
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('Empresa:', margin + 5, yPosition + 5);
        doc.setFont(undefined, 'normal');
        doc.text(empresa.nombre, margin + 30, yPosition + 5);
        
        doc.setFont(undefined, 'bold');
        doc.text('Tipo:', margin + 5, yPosition + 12);
        doc.setFont(undefined, 'normal');
        doc.text(empresa.tipo, margin + 30, yPosition + 12);
        
        doc.setFont(undefined, 'bold');
        doc.text('Plan:', margin + 5, yPosition + 19);
        doc.setFont(undefined, 'normal');
        doc.text(empresa.plan, margin + 30, yPosition + 19);
        
        doc.setFont(undefined, 'bold');
        doc.text('Ubicación:', margin + 100, yPosition + 5);
        doc.setFont(undefined, 'normal');
        doc.text(empresa.ubicacion, margin + 130, yPosition + 5);
        
        doc.setFont(undefined, 'bold');
        doc.text('Contacto:', margin + 100, yPosition + 12);
        doc.setFont(undefined, 'normal');
        doc.text(empresa.contacto, margin + 130, yPosition + 12);
        
        doc.setFont(undefined, 'bold');
        doc.text('Fecha:', margin + 100, yPosition + 19);
        doc.setFont(undefined, 'normal');
        doc.text(new Date().toLocaleDateString('es-ES'), margin + 130, yPosition + 19);
        
        yPosition += 50;
        
        // CUMPLIMIENTO GENERAL
        if (evaluacion) {
            const cumplimientoGeneral = calcularCumplimientoGeneral(evaluacion);
            
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('RESUMEN EJECUTIVO', margin, yPosition);
            
            yPosition += 15;
            
            // Cuadro de puntuación general
            const scoreColor = cumplimientoGeneral >= 80 ? greenColor : 
                              cumplimientoGeneral >= 50 ? orangeColor : redColor;
            
            doc.setFillColor(...scoreColor);
            doc.rect(margin, yPosition - 5, contentWidth, 20, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(`CUMPLIMIENTO GENERAL: ${cumplimientoGeneral}%`, pageWidth/2, yPosition + 7, { align: 'center' });
            
            yPosition += 30;
            
            // DESGLOSE POR ÁREAS
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('EVALUACIÓN POR ÁREAS', margin, yPosition);
            
            yPosition += 15;
            
            // Tabla de áreas
            Object.keys(areas).forEach((areaKey, index) => {
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }
                
                const area = areas[areaKey];
                const areaCumplimiento = calcularCumplimientoArea(evaluacion, areaKey);
                const itemsCumplidos = calcularItemsCumplidos(evaluacion, areaKey);
                const totalItems = area.items.length;
                
                // Color según cumplimiento
                const areaColor = areaCumplimiento >= 80 ? greenColor : 
                                 areaCumplimiento >= 50 ? orangeColor : redColor;
                
                // Fila de área
                doc.setFillColor(245, 245, 245);
                doc.rect(margin, yPosition, contentWidth, 8, 'F');
                
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(area.nombre, margin + 2, yPosition + 5);
                
                // Barra de progreso
                const barWidth = 40;
                const barX = pageWidth - margin - barWidth - 30;
                doc.setDrawColor(200, 200, 200);
                doc.rect(barX, yPosition + 1, barWidth, 6, 'S');
                
                const fillWidth = (areaCumplimiento / 100) * barWidth;
                doc.setFillColor(...areaColor);
                doc.rect(barX, yPosition + 1, fillWidth, 6, 'F');
                
                // Porcentaje
                doc.setFont(undefined, 'bold');
                doc.text(`${areaCumplimiento}%`, barX + barWidth + 5, yPosition + 5);
                
                // Items cumplidos
                doc.setFont(undefined, 'normal');
                doc.setFontSize(9);
                doc.text(`(${itemsCumplidos}/${totalItems})`, barX + barWidth + 20, yPosition + 5);
                
                yPosition += 12;
            });
            
            yPosition += 10;
            
            // RECOMENDACIONES
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text('RECOMENDACIONES', margin, yPosition);
            
            yPosition += 15;
            
            // Identificar áreas críticas
            const areasCriticas = Object.keys(areas).filter(areaKey => {
                return calcularCumplimientoArea(evaluacion, areaKey) < 50;
            });
            
            const areasExcelentes = Object.keys(areas).filter(areaKey => {
                return calcularCumplimientoArea(evaluacion, areaKey) >= 80;
            });
            
            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            
            if (areasCriticas.length > 0) {
                doc.setTextColor(...redColor);
                doc.text('• ATENCIÓN INMEDIATA:', margin, yPosition);
                doc.setTextColor(0, 0, 0);
                areasCriticas.forEach(areaKey => {
                    yPosition += 7;
                    doc.text(`  - ${areas[areaKey].nombre}`, margin + 5, yPosition);
                });
                yPosition += 10;
            }
            
            if (areasExcelentes.length > 0) {
                doc.setTextColor(...greenColor);
                doc.text('• FORTALEZAS IDENTIFICADAS:', margin, yPosition);
                doc.setTextColor(0, 0, 0);
                areasExcelentes.forEach(areaKey => {
                    yPosition += 7;
                    doc.text(`  - ${areas[areaKey].nombre}`, margin + 5, yPosition);
                });
                yPosition += 10;
            }
            
        } else {
            // Sin evaluación
            doc.setFillColor(255, 243, 224);
            doc.rect(margin, yPosition - 5, contentWidth, 20, 'F');
            
            doc.setTextColor(255, 152, 0);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text('EVALUACIÓN PENDIENTE', pageWidth/2, yPosition + 7, { align: 'center' });
            
            yPosition += 30;
            
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            doc.text('Esta empresa aún no ha sido evaluada.', margin, yPosition);
            doc.text('Se recomienda realizar la evaluación inicial para identificar', margin, yPosition + 7);
            doc.text('áreas de mejora y oportunidades de crecimiento.', margin, yPosition + 14);
        }
        
        // PIE DE PÁGINA
        const pageHeight = doc.internal.pageSize.height;
        doc.setFillColor(...primaryColor);
        doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text('Consultoría Gastronómica Profesional | contacto@consultoriagastronomica.com', pageWidth/2, pageHeight - 7, { align: 'center' });
        doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}`, pageWidth/2, pageHeight - 3, { align: 'center' });
        
        // Guardar PDF
        const fileName = `Evaluacion_${empresa.nombre.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(fileName);
        
        showNotification('PDF generado exitosamente', 'success');
        
    } catch (error) {
        console.error('Error al generar PDF:', error);
        showNotification('Error al generar el PDF', 'error');
    }
}

// Función para imprimir evaluación (mantenida para compatibilidad)
function printEvaluacion(empresaId) {
    const empresa = empresas.find(e => e.id === empresaId);
    const evaluacion = evaluaciones[empresaId];
    
    if (!empresa || !evaluacion) return;
    
    const printWindow = window.open('', '_blank');
    const cumplimientoGeneral = calcularCumplimientoGeneral(evaluacion);
    
    const areasContent = Object.keys(areas).map(areaKey => {
        const area = areas[areaKey];
        const areaCumplimiento = calcularCumplimientoArea(evaluacion, areaKey);
        const itemsCumplidos = calcularItemsCumplidos(evaluacion, areaKey);
        
        const itemsHtml = area.items.map((item, index) => {
            const status = evaluacion[areaKey] && evaluacion[areaKey][index] ? '✅' : '❌';
            return `<li>${status} ${item}</li>`;
        }).join('');
        
        return `
            <div style="margin-bottom: 2rem; page-break-inside: avoid;">
                <h3 style="color: #667eea; border-bottom: 2px solid #f0f0f0; padding-bottom: 0.5rem;">
                    ${area.nombre} - ${areaCumplimiento}% (${itemsCumplidos}/${area.items.length})
                </h3>
                <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                    ${itemsHtml}
                </ul>
            </div>
        `;
    }).join('');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Reporte de Evaluación - ${empresa.nombre}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 2rem; }
                .header { text-align: center; border-bottom: 3px solid #667eea; padding-bottom: 1rem; margin-bottom: 2rem; }
                .score { background: #f8f9fa; padding: 1rem; border-radius: 10px; text-align: center; margin: 1rem 0; }
                ul li { margin: 0.5rem 0; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Reporte de Evaluación</h1>
                <h2>${empresa.nombre}</h2>
                <p>Fecha: ${new Date().toLocaleDateString()}</p>
                <p>Tipo: ${empresa.tipo} | Plan: ${empresa.plan}</p>
            </div>
            
            <div class="score">
                <h2>Cumplimiento General: ${cumplimientoGeneral}%</h2>
            </div>
            
            ${areasContent}
            
            <div style="margin-top: 3rem; text-align: center; border-top: 2px solid #f0f0f0; padding-top: 1rem;">
                <p><strong>Consultoría Gastronómica - Javier Valenzuela</strong></p>
                <p>Reporte generado automáticamente</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 