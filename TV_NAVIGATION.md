# Configuración de Navegación para TV

Este proyecto está configurado para funcionar correctamente en Smart TVs y navegadores de TV, ocultando el cursor y habilitando la navegación espacial nativa.

## Características Implementadas

### 1. Ocultación del Cursor
- El cursor está completamente oculto en todos los elementos
- Se previenen todos los eventos de mouse
- Se deshabilitan los gestos táctiles

### 2. Navegación Espacial
- Configuración optimizada para control remoto
- Soporte para teclas de dirección (↑↓←→)
- Enter y Espacio para seleccionar
- Escape y Backspace para retroceder

### 3. Detección Automática de TV
El sistema detecta automáticamente si está ejecutándose en:
- Samsung Tizen TV
- LG WebOS TV
- Hisense Vidaa TV
- Sony BRAVIA TV
- Otros Smart TVs

### 4. Configuración de Viewport
- Viewport optimizado para TV
- Zoom deshabilitado
- Escalado fijo

## Cómo Funciona

### Archivos Modificados

1. **`index.html`**
   - Agregado meta viewport para TV
   - Estilos CSS para ocultar cursor
   - Prevención de selección de texto

2. **`src/App.tsx`**
   - Configuración de navegación espacial optimizada
   - Hook para detectar entorno de TV
   - Estilos globales para TV

3. **`src/tvConfig.ts`** (nuevo)
   - Utilidades para detección de TV
   - Configuración automática del entorno
   - Mapeo de teclas para control remoto

### Configuración de Navegación Espacial

```typescript
init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: 'center',
  throttle: 16, // 60fps
  shouldUseNativeEvents: true
});
```

## Controles de Navegación

| Tecla | Acción |
|-------|--------|
| ↑ | Navegar hacia arriba |
| ↓ | Navegar hacia abajo |
| ← | Navegar hacia la izquierda |
| → | Navegar hacia la derecha |
| Enter | Seleccionar elemento |
| Espacio | Seleccionar elemento |
| Escape | Retroceder |
| Backspace | Retroceder |

## Testing

Para probar la navegación:

1. **En navegador de escritorio:**
   - Usa las teclas de dirección del teclado
   - El cursor debe estar oculto
   - No debe funcionar el mouse

2. **En Smart TV:**
   - Usa el control remoto
   - La navegación debe ser fluida
   - No debe aparecer cursor

## Solución de Problemas

### Si el cursor sigue apareciendo:
1. Verifica que el archivo `tvConfig.ts` esté siendo importado
2. Revisa la consola para el mensaje "Entorno de TV detectado"
3. Asegúrate de que los estilos CSS se estén aplicando

### Si la navegación no funciona:
1. Verifica que `init()` se esté llamando correctamente
2. Revisa que los elementos tengan `useFocusable()` configurado
3. Comprueba que no haya errores en la consola

## Compatibilidad

- ✅ Samsung Tizen TV
- ✅ LG WebOS TV
- ✅ Hisense Vidaa TV
- ✅ Sony BRAVIA TV
- ✅ Navegadores de escritorio (para testing)
- ⚠️ React Native (funcionalidad limitada)
