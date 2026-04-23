/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActivityType = 'quiz' | 'lifesim' | 'calculator' | 'fraud' | 'time-attack' | 'concentration' | 'negotiation' | 'neuro';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  question: string;
  learningBrief: string; // New field for educational context before the challenge
  character?: 'aura' | 'leon' | 'banker' | 'monster' | 'critic' | 'musa' | 'guardian' | 'oracle';
  options?: { 
    id: string; 
    text: string; 
    correct?: boolean; 
    impact?: { money: number; xp: number; wellbeing: number } 
  }[];
  correctValue?: string | number;
  explanation: string;
  category: string;
  timeLimit?: number; // In seconds
}

export interface SubLevel {
  id: 'learning' | 'intermediate' | 'expert';
  name: string;
  activities: Activity[];
}

export interface Sector {
  id: number;
  name: string;
  subtitle: string;
  subLevels: SubLevel[];
}

export interface CharacterInfo {
  id: 'aura' | 'leon' | 'banker' | 'monster' | 'critic' | 'musa' | 'guardian' | 'oracle';
  name: string;
  role: string;
  description: string;
  motivation: string;
}

export const CHARACTER_CAST: CharacterInfo[] = [
  {
    id: 'aura',
    name: 'AURA',
    role: 'Tu Guía y Compañera',
    description: 'Inteligencia Etherea diseñada para proteger tu soberanía. Ella transformará tu visión de la escasez en abundancia técnica.',
    motivation: 'Liberarte de la esclavitud del sistema fiat.'
  },
  {
    id: 'leon',
    name: 'LEÓN',
    role: 'Defensa de Capital',
    description: 'El guardián de tus raíces y el hogar. Representa la fuerza necesaria para proteger lo que has construido.',
    motivation: 'La seguridad inquebrantable de tu familia.'
  },
  {
    id: 'banker',
    name: 'EL BANQUERO',
    role: 'Mente Corporativa',
    description: 'Sleek, frío y calculador. Él conoce todas las reglas del sistema que fueron diseñadas para que pierdas.',
    motivation: 'Maximizar el ROI a cualquier costo emocional.'
  },
  {
    id: 'monster',
    name: 'EL MONSTRUO DE LA DEUDA',
    role: 'Sombra del Nexus',
    description: 'Una entidad distorsionada por los intereses y los préstamos predatorios. Se alimenta de tus miedos y del tiempo que pierdes trabajando para otros.',
    motivation: 'Mantenerte en el ciclo de deuda perpetua.'
  },
  {
    id: 'oracle',
    name: 'EL ORÁCULO',
    role: 'Entidad de Riqueza Final',
    description: 'Una consciencia pura que ve el futuro de los mercados. Solo los soberanos absolutos logran hablar con él.',
    motivation: 'El legado y la eternidad financiera.'
  }
];

// PROTOCOLO INICIAL: Reducido a 8 preguntas esenciales
export const INITIAL_PROTOCOL: Activity[] = Array.from({ length: 8 }).map((_, i) => {
  const questionsData: { q: string, brief: string, a: string, b: string, exp: string, type?: ActivityType, correctVal?: string }[] = [
    { 
      q: '¿Qué es la inflación?', 
      brief: 'La inflación es el fenómeno económico donde el precio de los bienes sube con el tiempo. Esto significa que con la misma cantidad de dinero, mañana podrás comprar menos cosas que hoy.',
      a: 'El aumento generalizado de los precios y pérdida de poder adquisitivo', 
      b: 'Cuando el dinero vale más y los precios bajan drásticamente',
      exp: 'La inflación drena tus ahorros si no los inviertes adecuadamente.'
    },
    { 
      q: '¿Para qué sirve un fondo de emergencia?', 
      brief: 'La vida es impredecible. Un fondo de emergencia es dinero guardado exclusivamente para eventos inesperados (salud, reparaciones, desempleo) para no endeudarte.',
      a: 'Pagar imprevistos sin tocar tus ahorros de inversión', 
      b: 'Comprar regalos o ir de vacaciones en oferta',
      exp: 'Tu tranquilidad mental depende de tener este respaldo.'
    },
    { 
      q: '¿Qué es un activo según la filosofía AURA?', 
      brief: 'Tradicionalmente un activo es lo que posees. Para AURA, un activo REAL es solo aquello que genera un flujo de dinero hacia tu cuenta sin que tengas que trabajar por ello.',
      a: 'Cualquier cosa que pone dinero en tu bolsillo periódicamente', 
      b: 'Cualquier cosa que posees, aunque te cueste mantenerla',
      exp: 'Un coche para uso personal es un pasivo; una propiedad alquilada es un activo.'
    },
    { 
      q: 'Interés Compuesto: ¿Cómo afecta tu patrimonio?', 
      brief: 'A diferencia del interés simple, el compuesto reinvierte las ganancias. Así, los intereses de hoy generan más intereses mañana, creando un crecimiento exponencial.',
      a: 'Genera intereses sobre el capital y sobre los intereses acumulados', 
      b: 'Mantiene el interés fijo solo sobre el depósito inicial',
      exp: 'Es conocido como la octava maravilla del mundo financiero.'
    },
    { 
      q: 'Fórmula del Patrimonio Neto Total:', 
      brief: 'Tu Patrimonio Neto es tu valor financiero real. Se calcula sumando todo lo que tienes (Activos) y restando todo lo que debes (Pasivos).',
      a: 'ACTIVOS - PASIVOS', 
      b: 'INGRESOS + GASTOS',
      exp: 'Incrementar este número es tu objetivo principal en el Nexus.'
    },
    { 
      q: '¿Qué es la diversificación estratégica?', 
      brief: 'La diversificación es la regla de oro: "No pongas todos los huevos en la misma canasta". Repartir tu dinero en diferentes sectores reduce el riesgo de perderlo todo.',
      a: 'Distribuir el riesgo en diferentes tipos de activos', 
      b: 'Invertir todo en la empresa más famosa del momento',
      exp: 'Si un sector cae, los otros protegen tu patrimonio.'
    },
    { 
      q: '¿Cómo detectas un Phishing bancario?', 
      brief: 'El Phishing es un fraude digital donde se suplantan identidades (como tu banco) para robar tus datos mediante correos o SMS de "emergencia".',
      a: 'Correos urgentes pidiendo claves o enlaces sospechosos', 
      b: 'Mensajes oficiales de tu banco en la app certificada',
      exp: 'Tus claves son sagradas; nunca las compartas por enlaces externos.'
    },
    { 
      q: '¿Qué define tu "Libertad Financiera"?', 
      brief: 'La libertad financiera no es ser millonario; es el punto donde tus activos generan suficiente dinero para pagar tu estilo de vida sin que tengas que trabajar.',
      a: 'Cuando tus ingresos pasivos cubren tus gastos de vida', 
      b: 'Tener un millón de dólares en el banco',
      exp: 'Es el objetivo final de AURA: comprar tu tiempo de vuelta.'
    }
  ];

  const current = questionsData[i];

  return {
    id: `init-${i}`,
    type: current.type || 'quiz',
    title: 'Protocolo de Entrada AURA',
    description: 'Validación de conceptos base',
    question: current.q,
    learningBrief: current.brief || 'Concepto fundamental de soberanía financiera.',
    character: 'aura',
    correctValue: current.correctVal,
    options: current.type !== 'calculator' ? [
      { id: 'a', text: current.a, correct: true },
      { id: 'b', text: current.b, correct: false }
    ] : undefined,
    explanation: current.exp,
    category: 'Filtro Inicial'
  };
});

const generateActivities = (sectorId: number, levelId: string, count: number): Activity[] => {
  const types: ActivityType[] = ['quiz', 'calculator', 'lifesim', 'fraud', 'time-attack', 'negotiation', 'neuro'];
  const characters: any[] = ['aura', 'leon', 'banker', 'monster', 'critic', 'musa', 'guardian', 'oracle'];
  
  return Array.from({ length: count }).map((_, i) => {
    const type = types[i % types.length];
    const char = (sectorId === 5 && levelId === 'expert') ? 'oracle' : characters[(i + sectorId) % characters.length];
    const category = ['Neurofinanzas', 'Macroeconomía', 'Soberanía Digital', 'Neuromarketing'][i % 4];
    
    // Scenarios based on Sector and Level
    const scenarios = [
      { q: `¿Cómo afecta un interés del 15% a una deuda de $1000 en el Sector ${sectorId}?`, brief: 'El interés es el costo del alquiler del dinero. Cuanto más alta la tasa, más "caro" es el dinero que pediste.', a: 'Aumenta el balance total a pagar', b: 'Reduce la deuda con el tiempo' },
      { q: `Detección de Fraude: Un mensaje pide tu token para "Asegurar tu Bóveda".`, brief: 'Seguridad AURA: Ningún agente legítimo te pedirá claves o tokens de seguridad por canales no oficiales.', a: 'IGNORAR Y BLOQUEAR', b: 'PROPORCIONAR PARA EVITAR BLOQUEO' },
      { q: `Oportunidad en el Sector ${sectorId}: Invertir en Activos Productivos.`, brief: 'Inversión: Es poner tu capital a trabajar en proyectos que generen valor a largo plazo, no solo ahorro estático.', a: 'ANALIZAR ROI Y RIESGO', b: 'ESPERAR A QUE SEA SEGURO AL 100%' },
      { q: `Neuromarketing: Una oferta dice "Solo quedan 2 piezas". ¿Qué sesgo están usando?`, brief: 'Sesgo de Escasez: Nuestra mente valora más lo que percibe como limitado o difícil de conseguir, forzando decisiones impulsivas.', a: 'SESGO DE ESCASEZ / URGENCIA', b: 'PRUEBA SOCIAL DE MERCADO' },
      { q: `Neuromarketing: El precio termina en ,99. ¿Cuál es el objetivo cerebral?`, brief: 'Efecto del Dígito Izquierdo: El cerebro procesa el primer dígito más rápido, haciendo que $9.99 parezca significativamente menor a $10.00.', a: 'REDUCIR LA PERCEPCIÓN DE COSTO', b: 'AUMENTAR EL VALOR PERCIBIDO' }
    ];

    const currentScenario = scenarios[i % scenarios.length];
    
    return {
      id: `s${sectorId}-${levelId}-${i}`,
      type,
      title: `Estrategia Sectorial ${sectorId}.${i + 1}`,
      description: `SECTOR ${sectorId} | NIVEL ${levelId.toUpperCase()}`,
      question: currentScenario.q,
      learningBrief: currentScenario.brief,
      character: char,
      options: type !== 'calculator' ? [
        { id: 'a', text: currentScenario.a, correct: true, impact: { money: 250, xp: 100, wellbeing: 30 } },
        { id: 'b', text: currentScenario.b, correct: false, impact: { money: -500, xp: -50, wellbeing: -50 } }
      ] : undefined,
      correctValue: i % 2 === 0 ? "200" : "75", 
      explanation: `Tip de AURA: ${['Tu mente es el mejor software de inversión', 'El riesgo viene de no saber lo que estás haciendo', 'La paciencia es un activo financiero'][i % 3]}`,
      category: category,
      timeLimit: type === 'time-attack' ? 10 : undefined
    };
  });
};

export const SECTORS: Sector[] = [
  {
    id: 1,
    name: 'El Refugio',
    subtitle: 'Hogar y Raíces',
    subLevels: [
      { id: 'learning', name: 'Aprendiz de Hogar', activities: generateActivities(1, 'learning', 15) },
      { id: 'intermediate', name: 'Gestor del Techo', activities: generateActivities(1, 'intermediate', 15) },
      { id: 'expert', name: 'Arquitecto Financiero', activities: generateActivities(1, 'expert', 15) }
    ]
  },
  {
    id: 2,
    name: 'La Lanzadera',
    subtitle: 'Capital Humano',
    subLevels: [
      { id: 'learning', name: 'Primer Empleo', activities: generateActivities(2, 'learning', 15) },
      { id: 'intermediate', name: 'Estratega ROI', activities: generateActivities(2, 'intermediate', 15) },
      { id: 'expert', name: 'Líder del Nexus', activities: generateActivities(2, 'expert', 15) }
    ]
  },
  {
    id: 3,
    name: 'La Jungla',
    subtitle: 'Inversión y Riesgo',
    subLevels: [
      { id: 'learning', name: 'Ahorrador Activo', activities: generateActivities(3, 'learning', 15) },
      { id: 'intermediate', name: 'Inversionista', activities: generateActivities(3, 'intermediate', 15) },
      { id: 'expert', name: 'Lobo del Nexus', activities: generateActivities(3, 'expert', 15) }
    ]
  },
  {
    id: 4,
    name: 'El Engranaje',
    subtitle: 'Macro y Fiscalidad',
    subLevels: [
      { id: 'learning', name: 'Ciudadano Fiscal', activities: generateActivities(4, 'learning', 15) },
      { id: 'intermediate', name: 'Estratega Impositivo', activities: generateActivities(4, 'intermediate', 15) },
      { id: 'expert', name: 'Maestro de la Inflación', activities: generateActivities(4, 'expert', 15) }
    ]
  },
  {
    id: 5,
    name: 'El Oráculo',
    subtitle: 'Patrimonio y Legado',
    subLevels: [
      { id: 'learning', name: 'Constructor de Riqueza', activities: generateActivities(5, 'learning', 15) },
      { id: 'intermediate', name: 'Gestor de Activos', activities: generateActivities(5, 'intermediate', 15) },
      { id: 'expert', name: 'Soberano Absoluto', activities: generateActivities(5, 'expert', 15) }
    ]
  }
];
