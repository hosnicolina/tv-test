/**
 * Configuración para entorno de TV
 * Detecta si la aplicación se está ejecutando en un entorno de TV
 * y proporciona configuraciones optimizadas para navegación por control remoto
 */

/**
 * Detecta si la aplicación se está ejecutando en un entorno de TV
 * basándose en el user agent y otras características del dispositivo
 */
export function isTVEnvironment(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();

  // Detectar Smart TVs y dispositivos de TV
  const tvKeywords = [
    'smart-tv',
    'smarttv',
    'tizen',
    'webos',
    'roku',
    'chromecast',
    'firetv',
    'android tv',
    'tv'
  ];

  // Detectar por user agent
  const isTVByUserAgent = tvKeywords.some(keyword =>
    userAgent.includes(keyword)
  );

  // Detectar por características del dispositivo
  const hasTouch = 'ontouchstart' in window;
  const hasMouse = 'onmousemove' in window;
  const hasKeyboard = 'onkeydown' in window;

  // Si no tiene mouse ni touch pero sí teclado, probablemente es TV
  const isTVByCapabilities = !hasMouse && !hasTouch && hasKeyboard;

  // Detectar por resolución (TVs típicamente tienen resoluciones específicas)
  const isHighResolution = window.screen.width >= 1920 && window.screen.height >= 1080;

  return isTVByUserAgent || isTVByCapabilities || isHighResolution;
}

/**
 * Configura el entorno para TV
 * Aplica configuraciones específicas para dispositivos de TV
 */
export function configureTVEnvironment(): void {
  if (typeof window === 'undefined' || !isTVEnvironment()) {
    return;
  }

  // Ocultar cursor
  document.body.style.cursor = 'none';

  // Prevenir selección de texto
  document.body.style.userSelect = 'none';
  (document.body.style as any).webkitUserSelect = 'none';
  (document.body.style as any).mozUserSelect = 'none';
  (document.body.style as any).msUserSelect = 'none';

  // Prevenir zoom
  document.documentElement.style.touchAction = 'manipulation';

  // Configurar viewport para TV
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    );
  }

  // Prevenir eventos de contexto (click derecho)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, false);

  // Prevenir arrastrar y soltar
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  }, false);

  // Prevenir selección de texto
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
  }, false);

  console.log('Entorno de TV configurado correctamente');
}

/**
 * Obtiene la configuración optimizada para TV
 */
export function getTVOptimizedConfig() {
  return {
    // Configuración de navegación espacial optimizada para TV
    throttle: 16, // 60fps
    shouldUseNativeEvents: true,
    distanceCalculationMethod: 'center' as const,

    // Configuración de teclas específicas para TV
    tvKeys: {
      enter: ['Enter', ' '],
      back: ['Escape', 'Backspace'],
      up: ['ArrowUp'],
      down: ['ArrowDown'],
      left: ['ArrowLeft'],
      right: ['ArrowRight'],
      home: ['Home'],
      menu: ['Menu', 'F12']
    }
  };
}
