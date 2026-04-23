/**
 * @license
 * PROPERTY OF AURA FINANCIAL. ALL RIGHTS RESERVED.
 * UNAUTHORIZED COPYING OR DISTRIBUTION IS STRICTLY PROHIBITED.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ArrowRight, 
  MessageSquareQuote,
  ShieldCheck,
  Lock
} from 'lucide-react';

import { CanvasBackground } from './components/CanvasBackground';
import { AuraIcon, LeonIcon, BankerIcon, MonsterIcon, CriticIcon, MusaIcon } from './components/Characters';

// DATA BLINDADA (Solo para la demo)
const DEMO_SEQUENCE = [
  {
    id: 'd1',
    type: 'quiz',
    question: '¿Qué es un activo según la filosofía de AURA?',
    character: 'aura',
    options: [
      { id: 'a', text: 'Algo que pone dinero en tu bolsillo cada mes', correct: true },
      { id: 'b', text: 'Tener una casa propia con hipoteca', correct: false }
    ],
    explanation: 'Un activo real genera flujo de caja. Si solo drena dinero, es una pasivo disfrazado.',
    learningBrief: '¿Diferencia entre Activo y Pasivo? El activo te paga, el pasivo te quita. Tu casa donde vives no es un activo si no genera rentas.'
  },
  {
    id: 'd2',
    type: 'calculator',
    question: 'Si ahorras $100/mes al 10% anual, en 30 años tienes $226k. ¿Cuánto de eso pusiste tú?',
    character: 'banker',
    correctValue: '36000',
    explanation: 'La magia del Nexus es el Interés Compuesto. El tiempo trabaja para ti.',
    learningBrief: 'El interés compuesto convierte el tiempo en dinero. Si ahorras $100 al mes por 30 años, depositas $36,000, ¡pero los intereses te dan casi $200k más!'
  },
  {
    id: 'd3',
    question: '¡ALERTA! El Monstruo de la Deuda intenta hackear tu cuenta. ¡Pulsa el escudo!',
    character: 'monster',
    type: 'action',
    explanation: 'La ciberseguridad financiera es parte de tu soberanía.',
    learningBrief: 'Tus credenciales financieras son la llave de tu libertad. Protégelas como el tesoro más valioso de la Ciudadela.'
  }
];

export default function DemoApp() {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<any>(null);
  const [manualInput, setManualInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showBrief, setShowBrief] = useState(true);

  // BLINDAJE: Desactivar Inspección Básica
  useEffect(() => {
    const prevent = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    return () => document.removeEventListener('contextmenu', prevent);
  }, []);

  const current = DEMO_SEQUENCE[step];

  const handleNext = () => {
    setFeedback(null);
    setManualInput('');
    setAttempts(0);
    setShowBrief(true);
    if (step < DEMO_SEQUENCE.length - 1) setStep(step + 1);
    else alert("DEMO FINALIZADA - CONTACTE CON AURA FINANCIAL PARA EL ACCESO COMPLETO.");
  };

  const triggerSuccess = () => {
    setFeedback({ type: 'success', msg: '¡SISTEMA OPTIMIZADO!' });
    setTimeout(handleNext, 2000);
  };

  const triggerError = () => {
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= 3) {
      setFeedback({ type: 'error', msg: `SOLUCIÓN: ${current.correctValue || 'La opción correcta'}` });
      setTimeout(handleNext, 4000);
    } else {
      setFeedback({ type: 'error', msg: 'ERROR DE CÁLCULO' });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans select-none">
      <CanvasBackground />
      
      {/* MARCA DE AGUA (Blindaje Visual) */}
      <div className="fixed inset-0 pointer-events-none z-[100] grid grid-cols-3 grid-rows-3 opacity-[0.03]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center -rotate-45 text-2xl font-bold whitespace-nowrap">
            AURA FINANCIAL - PROPIEDAD PRIVADA
          </div>
        ))}
      </div>

      <div className="relative z-50 p-8 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <AuraIcon className="w-10 h-10" />
            <div>
              <h2 className="text-xl font-display text-cyan-400">DEMO INTERACTIVA</h2>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest text-[#00FFCC]">Nexus Prototype v2.1</p>
            </div>
          </div>
          <div className="px-4 py-2 border border-cyan-500/30 rounded text-[10px] font-mono text-cyan-400">
            MODO: SOBERANÍA LIMITADA
          </div>
        </header>

        <main className="grid grid-cols-12 gap-8">
          <div className="col-span-4 aspect-square glass-card p-0 overflow-hidden bg-black/40 border-cyan-500/20">
             {current.character === 'aura' && <AuraIcon className="w-full h-full" />}
             {current.character === 'banker' && <BankerIcon className="w-full h-full" />}
             {current.character === 'monster' && <MonsterIcon className="w-full h-full" />}
          </div>

          <div className="col-span-8 flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              {showBrief ? (
                <motion.div 
                  key="brief" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -20 }}
                >
                   <span className="text-cyan-400 font-mono text-[10px] mb-4 block uppercase tracking-widest">Lección Previa</span>
                   <p className="text-2xl italic opacity-80 mb-8 leading-relaxed">
                     "{current.learningBrief}"
                   </p>
                   <button 
                     onClick={() => setShowBrief(false)}
                     className="w-full bg-cyan-500 text-black font-bold p-6 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-4"
                   >
                     EMPEZAR RETO <ArrowRight />
                   </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="question"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <h1 className="text-4xl font-bold mb-8 leading-tight">{current.question}</h1>
                  
                  <div className="space-y-4">
                    {current.options?.map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => opt.correct ? triggerSuccess() : triggerError()}
                        className="w-full text-left p-6 rounded-xl border border-white/5 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all flex justify-between items-center group"
                      >
                        <span className="text-lg group-hover:translate-x-2 transition-transform">{opt.text}</span>
                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}

                    {current.type === 'calculator' && (
                      <div className="flex flex-col gap-4">
                        <div className="text-[10px] text-yellow-500 font-mono uppercase">Ingresa el valor numérico exacto</div>
                        <div className="flex gap-4">
                          <input 
                            type="text"
                            value={manualInput}
                            onChange={e => setManualInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && (manualInput === current.correctValue ? triggerSuccess() : triggerError())}
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-2xl font-mono text-center"
                            placeholder="INGRESAR VALOR..."
                            autoFocus
                          />
                          <button 
                            onClick={() => manualInput === current.correctValue ? triggerSuccess() : triggerError()}
                            className="bg-cyan-500 text-black font-bold px-8 rounded-xl hover:bg-white transition-colors"
                          >
                            VALIDAR
                          </button>
                        </div>
                      </div>
                    )}

                    {current.type === 'action' && (
                      <button 
                        onClick={triggerSuccess}
                        className="w-full p-12 glass-card border-red-500/50 flex flex-col items-center gap-4 hover:bg-red-500/10 transition-colors"
                      >
                        <ShieldCheck size={64} className="text-red-500 animate-pulse" />
                        <span className="font-display text-red-500 text-2xl">ACTIVAR PROTOCOLO</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <footer className="mt-12 flex justify-between items-end border-t border-white/5 pt-6">
           <div className="flex gap-8">
             <div className="text-[10px] font-mono">
                <div className="opacity-30">PROPIETARIO</div>
                <div>AURA FINANCIAL</div>
             </div>
             <div className="text-[10px] font-mono">
                <div className="opacity-30">ESTADO</div>
                <div className="text-green-500">ENCRIPTADO</div>
             </div>
           </div>
           <Lock size={16} className="opacity-20" />
        </footer>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-12 glass-card border-2 z-[200] text-center min-w-[400px] ${feedback.type === 'success' ? 'border-cyan-500' : 'border-red-500'}`}
          >
            <h3 className={`text-4xl font-display mb-4 ${feedback.type === 'success' ? 'text-cyan-400' : 'text-red-500'}`}>
              {feedback.msg}
            </h3>
            <p className="text-sm opacity-70 italic">{current.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
