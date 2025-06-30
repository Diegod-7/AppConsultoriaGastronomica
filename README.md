# 🍽️ Sistema de Consultoría Gastronómica - Javier Valenzuela

Un sistema web completo para la gestión y evaluación de restaurantes y food trucks, diseñado específicamente para consultoría gastronómica profesional.

## 🌟 Características Principales

### ✨ Dashboard Inteligente
- **KPIs en tiempo real**: Total de empresas, cumplimiento promedio, áreas críticas
- **Gráficos interactivos**: Cumplimiento por área y distribución de empresas
- **Sistema de semáforos**: Indicadores visuales de estado (🟢 Verde ≥80%, 🟡 Amarillo ≥50%, 🔴 Rojo <50%)
- **Resumen de empresas**: Vista rápida del estado de cada cliente

### 🏢 Gestión de Empresas
- **Registro completo**: Información detallada de cada empresa
- **Tipos de negocio**: Restaurante, Food Truck, Cafetería, Bar/Pub, Catering
- **Planes de consultoría**: Lite, Pro, Premium
- **Edición y eliminación**: Gestión completa del portafolio de clientes

### 📋 Sistema de Evaluaciones
- **10 Áreas especializadas** basadas en las mejores prácticas gastronómicas:
  1. **Eficiencia Operacional Cocina** - Layout, fichas técnicas, mise en place
  2. **Gestión de Costos y Rentabilidad** - Control de costos, márgenes, punto de equilibrio
  3. **Control de Inventarios** - Stock, FIFO, mermas
  4. **Experiencia del Cliente** - Protocolos de atención, hospitalidad
  5. **Marketing Digital** - Redes sociales, Google My Business, fidelización
  6. **Gestión de Talento** - Organigrama, capacitación, evaluaciones
  7. **Gestión Financiera** - Flujo de caja, proyecciones, rentabilidad
  8. **Innovación de Carta** - Desarrollo de productos, tendencias
  9. **Sostenibilidad** - Eficiencia energética, gestión de residuos
  10. **Escalabilidad** - Expansión, nuevos canales, franquicias

### 📊 Métricas y Reportes
- **Cálculo automático** de porcentajes de cumplimiento
- **Reportes imprimibles** con formato profesional
- **Seguimiento histórico** de evaluaciones
- **Identificación de áreas críticas** automática

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Diseño responsive con gradientes y animaciones
- **JavaScript ES6**: Funcionalidad interactiva y gestión de datos
- **Chart.js**: Gráficos dinámicos e interactivos
- **Font Awesome**: Iconografía profesional
- **LocalStorage**: Persistencia de datos local

## 🎨 Diseño y UX

### Colores Principales
- **Primario**: Gradiente azul-violeta (#667eea → #764ba2)
- **Éxito**: Verde (#4CAF50)
- **Advertencia**: Naranja (#FF9800)
- **Peligro**: Rojo (#f44336)
- **Fondo**: Gradiente suave (#f5f7fa → #c3cfe2)

### Características de Diseño
- **Responsive Design**: Optimizado para todos los dispositivos
- **Animaciones suaves**: Transiciones y efectos visuales profesionales
- **Cards modernas**: Diseño de tarjetas con sombras y bordes redondeados
- **Sistema de notificaciones**: Feedback visual para todas las acciones
- **Modales elegantes**: Formularios en ventanas emergentes

## 📱 Funcionalidades Técnicas

### Gestión de Datos
```javascript
// Almacenamiento local persistente
localStorage.setItem('empresas', JSON.stringify(empresas));
localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
```

### Sistema de Evaluación
- **Checklist interactivos** para cada área
- **Cálculo automático** de porcentajes
- **Actualización en tiempo real** de métricas
- **Sistema de semáforos** basado en umbrales

### Navegación SPA
- **Single Page Application** con navegación fluida
- **Secciones dinámicas** sin recarga de página
- **Estado persistente** entre sesiones

## 🛠️ Instalación y Uso

### Instalación
1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo para usar!

### Primer Uso
1. **Agregar empresa**: Haz clic en "Nueva Empresa" y completa el formulario
2. **Realizar evaluación**: Selecciona una empresa y haz clic en "Evaluar"
3. **Ver métricas**: Navega al Dashboard para ver KPIs y gráficos
4. **Generar reportes**: Usa la función "Imprimir Reporte" para documentar evaluaciones

## 📋 Estructura de Evaluación

### Criterios de Calificación
- **🟢 Excelente (≥80%)**: Cumplimiento óptimo
- **🟨 Bueno (60-79%)**: Buen nivel, mejoras menores
- **🟡 Regular (40-59%)**: Nivel aceptable, requiere atención
- **🔴 Crítico (<40%)**: Requiere intervención inmediata

### Áreas de Evaluación
Cada área contiene 6 items específicos basados en:
- **Mejores prácticas** de la industria gastronómica
- **Estándares profesionales** de consultoría
- **KPIs medibles** y verificables
- **Metodología probada** en el campo

## 🎯 Casos de Uso

### Para Consultores Gastronómicos
- **Evaluación inicial** de nuevos clientes
- **Seguimiento de progreso** a lo largo del tiempo
- **Identificación de áreas** de mejora prioritarias
- **Generación de reportes** profesionales

### Para Dueños de Restaurantes
- **Autoevaluación** de su negocio
- **Identificación de brechas** operativas
- **Seguimiento de mejoras** implementadas
- **Comparación** con estándares de la industria

## 🔧 Personalización

### Modificar Áreas de Evaluación
```javascript
// En script.js, línea ~4
const areas = {
    nueva_area: {
        nombre: 'Nueva Área',
        icon: 'fa-icon',
        items: [
            'Pregunta 1',
            'Pregunta 2',
            // ... más preguntas
        ]
    }
};
```

### Cambiar Colores del Tema
```css
/* En styles.css */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #4CAF50;
    --warning-color: #FF9800;
    --danger-color: #f44336;
}
```

## 📈 Roadmap de Desarrollo

### Versión 2.0 (Próximamente)
- [ ] Exportación a PDF nativa
- [ ] Base de datos en la nube
- [ ] Autenticación de usuarios
- [ ] Comparativas entre empresas
- [ ] Planificación de acciones correctivas
- [ ] Integración con APIs de terceros

### Versión 3.0 (Futuro)
- [ ] Aplicación móvil nativa
- [ ] Análisis predictivo con IA
- [ ] Marketplace de consultores
- [ ] Sistema de certificaciones

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:
1. Fork el proyecto
2. Crea una branch para tu feature
3. Commit tus cambios
4. Push a la branch
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍🍳 Autor

**Javier Valenzuela** - Consultor Gastronómico Profesional

- 📧 Email: [contacto@consultoriagastronomica.com]
- 🌐 Web: [www.consultoriagastronomica.com]
- 📱 WhatsApp: [+56 9 XXXX XXXX]

---

## 🎉 ¡Gracias por usar nuestro sistema!

Este sistema ha sido desarrollado con pasión y experiencia real en el campo de la consultoría gastronómica. Cada feature ha sido pensada para resolver problemas reales que enfrentan los profesionales del sector.

**¡Transforma la gestión de tu consultoría gastronómica hoy mismo!** 🚀 