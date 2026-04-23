/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Target, 
  ShieldAlert, 
  Zap, 
  Coins, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Download,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  LogOut,
  Clock,
  ShieldCheck,
  MousePointer2,
  Lock,
  Star,
  Banknote,
  MessageSquareQuote
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { CanvasBackground } from './components/CanvasBackground';
import { SECTORS, INITIAL_PROTOCOL, Activity, Sector, SubLevel, CHARACTER_CAST, CharacterInfo } from './gameData';
import { AuraIcon, LeonIcon, BankerIcon, MonsterIcon, CriticIcon, MusaIcon, GuardianIcon, OracleIcon } from './components/Characters';

type GameScreen = 'login' | 'intro-cinema' | 'initial-test' | 'sector-select' | 'level-intro' | 'gameplay' | 'summary' | 'vault-deposit';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('login');
  const [playerName, setPlayerName] = useState('');
  const [currentSectorIndex, setCurrentSectorIndex] = useState(0);
  const [currentLevelId, setCurrentLevelId] = useState<'learning' | 'intermediate' | 'expert'>('learning');
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [money, setMoney] = useState(0);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [wellbeing, setWellbeing] = useState(100);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string, tip?: string } | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [shaking, setShaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [unlockedLevelKeys, setUnlockedLevelKeys] = useState<string[]>(['sector-0-learning']);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [showBrief, setShowBrief] = useState(true);
  const [hasPersistence, setHasPersistence] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  const lastInteractionRef = useRef(Date.now());

  // Check for persistence on load
  useEffect(() => {
    const saved = localStorage.getItem('aura_vault');
    if (saved) {
      setHasPersistence(true);
    }
  }, []);

  const handlePersistentLogin = () => {
    const saved = localStorage.getItem('aura_vault');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.name && data.name === playerName) {
        setVaultBalance(data.vaultBalance || 0);
        setUnlockedLevelKeys(data.unlockedLevelKeys || ['sector-0-learning']);
        setXp(data.xp || 0);
        setScreen('sector-select');
        return true;
      }
    }
    return false;
  };

  // Logic to determine current activity set
  const getActivities = () => {
    if (screen === 'initial-test') return INITIAL_PROTOCOL;
    if (isDemoMode) return INITIAL_PROTOCOL.slice(0, 5); // Simple demo
    const sector = SECTORS[currentSectorIndex];
    const level = sector.subLevels.find(l => l.id === currentLevelId);
    return level?.activities || [];
  };

  const currentActivities = getActivities();
  const currentActivity = currentActivities[currentActivityIndex];

  // Session Timeout logic (30 mins)
  useEffect(() => {
    const checkTimeout = setInterval(() => {
      if (Date.now() - lastInteractionRef.current > 30 * 60 * 1000) {
        localStorage.clear();
        window.location.reload();
      }
    }, 60000);
    return () => clearInterval(checkTimeout);
  }, []);

  const updateInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  // Timer logic
  useEffect(() => {
    if (screen !== 'gameplay' || timeLeft === null || feedback !== null) return;
    if (timeLeft <= 0) {
      triggerError('SISTEMA BLOQUEADO - TIEMPO AGOTADO');
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, screen, feedback]);

  const saveProgress = () => {
    localStorage.setItem('aura_vault', JSON.stringify({ name: playerName, vaultBalance, unlockedLevelKeys, xp }));
  };

  const nextActivity = useCallback(() => {
    setAttempts(0);
    setManualInput('');
    setFeedback(null);
    setShowBrief(true);
    if (currentActivityIndex < currentActivities.length - 1) {
      setCurrentActivityIndex(prev => prev + 1);
    } else {
      // Logic for passing level
      const accuracy = (score / (currentActivities.length * 100)) * 100;
      if (accuracy >= 80) {
        setScreen('vault-deposit');
      } else {
        setFeedback({ 
          type: 'error', 
          message: `PRECISIÓN INSUFICIENTE (${Math.round(accuracy)}%). REINICIANDO PROTOCOLO.` 
        });
        setTimeout(() => {
          setCurrentActivityIndex(0);
          setScore(0);
          setMoney(0);
          setFeedback(null);
        }, 4000);
      }
    }
  }, [currentActivityIndex, currentActivities, score, screen]);

  const triggerSuccess = (option?: any) => {
    updateInteraction();
    const bonus = timeLeft ? timeLeft * 2 : 10;
    
    let charMsg = "¡SISTEMA OPTIMIZADO!";
    if (currentActivity?.character === 'musa') charMsg = "✨ ¡BRILANTE! Tu energía financiera es imparable.";
    if (currentActivity?.character === 'leon') charMsg = "🦁 Rugido de éxito. Sabia decisión, Agente.";
    if (currentActivity?.character === 'critic') charMsg = "😒 Supongo que cualquiera podría haber acertado eso...";
    if (currentActivity?.character === 'guardian') charMsg = "🛡️ Bóveda asegurada. Has demostrado criterio de soberano.";
    if (currentActivity?.character === 'oracle') charMsg = "👁️ Veo un futuro de abundancia en tus decisiones.";
    
    setFeedback({ 
      type: 'success', 
      message: `${charMsg} +${bonus} CRÉDITOS`,
      tip: "BONO POR GESTIÓN RÁPIDA APLICADO."
    });
    
    setScore(prev => prev + 100);
    setMoney(prev => prev + 100 + bonus);
    setXp(prev => prev + 50);
    setTimeout(nextActivity, 2000);
  };

  const triggerError = (msg?: string) => {
    updateInteraction();
    setShaking(true);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let charMsg = "¡ERROR CRÍTICO!";
    if (currentActivity?.character === 'monster') charMsg = "😈 ¡JA! TU DINERO AHORA ES MÍO. ¡OTRO ERROR Y TE DEVORO!";
    if (currentActivity?.character === 'critic') charMsg = "🤦‍♂️ ¿En serio? Mi gato tiene mejor criterio financiero.";
    if (currentActivity?.character === 'leon') charMsg = "⚠️ Mantén la calma, Agente. Un error es solo una lección cara.";
    if (currentActivity?.character === 'guardian') charMsg = "🛡️ ¡ALERTA! La bóveda está en riesgo por tu negligencia.";
    if (currentActivity?.character === 'oracle') charMsg = "👁️ Las sombras de la pobreza se acercan con cada error.";
    
    let displayMsg = msg || charMsg;
    let tip = currentActivity?.explanation;

    if (newAttempts >= 3) {
      const correctAns = currentActivity.type === 'calculator' ? currentActivity.correctValue : currentActivity.options?.find(o => o.correct)?.text;
      displayMsg = `ASISTENCIA: La solución es ${correctAns}`;
    }

    setFeedback({ type: 'error', message: displayMsg, tip });
    setWellbeing(prev => Math.max(0, prev - 10));

    if (newAttempts < 3) {
      setTimeout(() => { setShaking(false); setFeedback(null); }, 3000);
    } else {
      setTimeout(() => { setShaking(false); nextActivity(); }, 5000);
    }
  };

  const renderCharacter = (char?: string) => {
    switch (char) {
      case 'aura': return <AuraIcon className="w-full h-full" />;
      case 'leon': return <LeonIcon className="w-full h-full" />;
      case 'banker': return <BankerIcon className="w-full h-full" />;
      case 'monster': return <MonsterIcon className="w-full h-full" />;
      case 'critic': return <CriticIcon className="w-full h-full" />;
      case 'musa': return <MusaIcon className="w-full h-full" />;
      case 'guardian': return <GuardianIcon className="w-full h-full" />;
      case 'oracle': return <OracleIcon className="w-full h-full" />;
      default: return <AuraIcon className="w-full h-full" />;
    }
  };

  const unlockNextLevel = () => {
    // Determine the next level to unlock based on current progress
    let nextKeys = [...unlockedLevelKeys];
    
    if (screen === 'initial-test') {
      // Protocol finished: unlock first real level
      nextKeys.push('sector-0-learning');
    } else {
      const levelsOrder: ('learning' | 'intermediate' | 'expert')[] = ['learning', 'intermediate', 'expert'];
      const currentLevelIdx = levelsOrder.indexOf(currentLevelId);
      
      if (currentLevelIdx < 2) {
        // Unlock next sub-level in same sector
        nextKeys.push(`sector-${currentSectorIndex}-${levelsOrder[currentLevelIdx + 1]}`);
      } else if (currentSectorIndex < SECTORS.length - 1) {
        // Unlock first level of next sector
        nextKeys.push(`sector-${currentSectorIndex + 1}-learning`);
      }
    }

    setUnlockedLevelKeys(Array.from(new Set(nextKeys))); // Deduplicate
    setVaultBalance(prev => prev + money);
    setMoney(0);
    setScreen('sector-select');
  };

  return (
    <div className="relative min-h-screen w-full bg-nexus-bg text-white font-sans overflow-hidden" onMouseMove={updateInteraction}>
      <CanvasBackground />
      
      <AnimatePresence mode="wait">
        {screen === 'login' && (
          <motion.div key="login" className="flex flex-col items-center justify-center min-h-screen p-8 z-50 relative overflow-visible">
            {/* Realistic Character Background Presence */}
            <div className="absolute inset-0 flex justify-around items-center opacity-10 pointer-events-none">
              {[LeonIcon, BankerIcon, MonsterIcon, OracleIcon].map((Icon, i) => (
                <motion.div 
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 5 + i, ease: "easeInOut" }}
                  className="w-64 h-64 blur-[2px]"
                >
                  <Icon />
                </motion.div>
              ))}
            </div>

            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="w-56 h-56 mb-8 relative"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
              <AuraIcon />
            </motion.div>
            
            <h1 className="text-9xl font-display font-bold mb-2 tracking-tighter text-glow-cyan">AURA</h1>
            <p className="font-mono text-cyan-400/50 tracking-[0.8em] mb-12 uppercase text-sm">Fintech Sovereignty Engine</p>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full max-w-sm"
            >
              <input 
                type="text" 
                placeholder="IDENTIFÍCATE, AGENTE..." 
                value={playerName}
                onChange={e => setPlayerName(e.target.value.toUpperCase())}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 w-full text-center text-2xl font-mono mb-8 focus:border-cyan-500 outline-none transition-all focus:bg-cyan-500/5"
              />
              
              <button 
                onClick={() => { 
                  const resumed = handlePersistentLogin();
                  if (!resumed) setScreen('intro-cinema'); 
                }}
                className="neon-button neon-cyan px-12 py-6 text-2xl mb-4 w-full"
              >
                {hasPersistence ? 'CONTINUAR MISIÓN' : 'INGRESAR AL NEXUS'}
              </button>
              <button 
                onClick={() => { setIsDemoMode(true); setScreen('gameplay'); }}
                className="w-full text-xs font-mono text-white/20 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                Accionando Modo Demo
              </button>
            </motion.div>
          </motion.div>
        )}

        {screen === 'intro-cinema' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black p-12 flex items-center justify-center"
          >
            <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {introStep === 0 ? (
                  <motion.div 
                    key="step0"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex flex-col items-center text-center max-w-3xl"
                  >
                    <div className="w-80 h-80 mb-12">
                      <AuraIcon />
                    </div>
                    <h2 className="text-5xl font-display text-cyan-400 mb-8 uppercase tracking-widest">Hola, {playerName}</h2>
                    <p className="text-2xl leading-relaxed opacity-80 italic mb-12">
                      "Soy AURA. Seré tu compañera técnica en este viaje. El sistema financiero tradicional ha sido diseñado para retener tu tiempo. Mi misión es ayudarte a recuperarlo."
                    </p>
                    <button 
                      onClick={() => setIntroStep(1)}
                      className="neon-button neon-cyan px-16 py-6 text-xl flex items-center gap-4"
                    >
                      PRESENTAR EL NEXUS <ArrowRight />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full"
                  >
                    <h2 className="text-3xl font-display text-center mb-12 text-cyan-400">LOS GUARDIANES DEL NEXUS</h2>
                    <div className="grid grid-cols-4 gap-8">
                      {CHARACTER_CAST.filter(c => c.id !== 'aura').map((char, i) => (
                        <motion.div 
                          key={char.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.3 }}
                          className="glass-card p-8 flex flex-col items-center text-center group hover:border-cyan-500/50 transition-all"
                        >
                          <div className="w-32 h-32 mb-6 pointer-events-none">
                            {renderCharacter(char.id)}
                          </div>
                          <h3 className="text-xl font-display text-cyan-400 mb-2">{char.name}</h3>
                          <p className="text-[10px] font-mono opacity-60 mb-4">{char.role}</p>
                          <p className="text-xs opacity-40 leading-relaxed h-20 overflow-hidden">{char.description}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-16 flex flex-col items-center">
                      <p className="text-sm font-mono opacity-50 mb-8 uppercase tracking-[0.3em]">Calibrando protocolo inicial de 8 retos esenciales</p>
                      <button 
                        onClick={() => { setScreen('initial-test'); setIntroStep(0); }}
                        className="neon-button neon-cyan px-24 py-8 text-3xl"
                      >
                        INICIAR PROTOCOLO <ArrowRight />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {(screen === 'gameplay' || screen === 'initial-test') && (
          <div className="w-full h-screen p-8 flex flex-col gap-6 relative z-50">
            {/* HUD */}
            <div className="flex justify-between items-center glass-card px-12 py-4 border-cyan-500/20">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => {
                    if (screen === 'initial-test') setScreen('login');
                    else setScreen('sector-select');
                  }}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group flex items-center gap-2"
                  title="VOLVER ATRÁS"
                >
                  <ArrowLeft className="text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-[10px] font-mono opacity-40 group-hover:opacity-100 uppercase">VOLVER</span>
                </button>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex items-center gap-4">
                  <User className="text-cyan-400" />
                  <span className="font-mono">{playerName}</span>
                </div>
              </div>
              <div className="flex gap-12 text-center">
                <div>
                  <div className="text-royal-gold text-3xl font-display">${money}</div>
                  <div className="text-[10px] font-mono opacity-40">CARTERA ACTUAL</div>
                </div>
                <div>
                  <div className="text-cyan-400 text-3xl font-display">{xp}</div>
                  <div className="text-[10px] font-mono opacity-40">NEXUS IQ</div>
                </div>
                <div>
                  <div className="text-white text-3xl font-display">${vaultBalance}</div>
                  <div className="text-[10px] font-mono opacity-40">BÓVEDA TOTAL</div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 grid grid-cols-12 gap-6">
              <div className="col-span-4 flex flex-col gap-6">
                <div className="flex-1 glass-card p-0 relative overflow-hidden group">
                  {renderCharacter(currentActivity?.character)}
                  {feedback?.tip && (
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute inset-x-0 bottom-0 p-6 bg-black/80 backdrop-blur-md">
                      <div className="flex gap-3 text-cyan-400 mb-2">
                        <MessageSquareQuote size={16} />
                        <span className="text-[10px] font-bold">CONSEJO TÁCTICO</span>
                      </div>
                      <p className="text-xs italic text-white/70">{feedback.tip}</p>
                    </motion.div>
                  )}
                </div>
                {timeLeft !== null && (
                  <div className="glass-card p-6 border-red-500/30 flex justify-between items-center">
                    <Clock className="text-red-500" />
                    <span className="text-4xl font-display text-red-500">{timeLeft}s</span>
                  </div>
                )}
              </div>

              <div className="col-span-8 glass-card p-12 flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                  {showBrief ? (
                    <motion.div 
                      key="brief"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col h-full"
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <span className="px-4 py-1 rounded-full bg-cyan-500/20 text-[10px] text-cyan-400 font-mono animate-pulse">
                          TRANSMISIÓN DE CONOCIMIENTO
                        </span>
                      </div>
                      <h3 className="text-2xl font-mono text-cyan-400 mb-6 uppercase tracking-widest flex items-center gap-3">
                        <BrainCircuit size={24} /> {currentActivity?.title}
                      </h3>
                      <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-12 flex-1">
                        <p className="text-2xl leading-relaxed opacity-90 italic">
                          "{currentActivity?.learningBrief}"
                        </p>
                      </div>
                      <button 
                        onClick={() => setShowBrief(false)}
                        className="neon-button neon-cyan py-6 text-xl flex items-center justify-center gap-4"
                      >
                        COMPRENDIDO. INICIAR RETO <ArrowRight />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="question"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col h-full"
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <span className="px-4 py-1 rounded-full bg-white/5 text-[10px] text-cyan-400 font-mono">
                          {currentActivity?.category}
                        </span>
                        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-cyan-500" 
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentActivityIndex + 1) / currentActivities.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono opacity-40">{currentActivityIndex + 1}/{currentActivities.length}</span>
                      </div>
                      
                      <h2 className="text-5xl font-bold mb-12 leading-tight">{currentActivity?.question}</h2>
                      
                      <div className="grid gap-4 mt-auto">
                        {currentActivity?.options?.map(opt => (
                          <button 
                            key={opt.id}
                            onClick={() => {
                              if (opt.correct || (opt.impact && opt.impact.money > 0)) triggerSuccess(opt);
                              else triggerError();
                            }}
                            className="w-full p-6 rounded-2xl border border-white/5 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all text-left group flex justify-between items-center"
                          >
                            <span className="text-xl group-hover:translate-x-2 transition-transform uppercase">{opt.text}</span>
                            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                        {currentActivity?.type === 'calculator' && (
                           <div className="flex flex-col gap-6">
                             <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-4 items-center">
                               <AlertCircle className="text-yellow-500" size={20} />
                               <span className="text-sm font-mono text-yellow-500 uppercase">INGRESA EL RESULTADO NUMÉRICO O LA RESPUESTA EXACTA</span>
                             </div>
                             <div className="flex gap-4">
                               <input 
                                 type="text" 
                                 value={manualInput}
                                 onChange={e => setManualInput(e.target.value)}
                                 onKeyDown={e => e.key === 'Enter' && (manualInput == currentActivity.correctValue ? triggerSuccess() : triggerError())}
                                 className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-3xl font-mono text-center focus:border-cyan-500 outline-none"
                                 placeholder="CALCULANDO RESULTADO..."
                                 autoFocus
                               />
                               <button 
                                 onClick={() => {
                                   if (manualInput == currentActivity.correctValue) triggerSuccess();
                                   else triggerError();
                                 }}
                                 className="neon-button neon-cyan px-12"
                               >
                                 EJECUTAR
                               </button>
                             </div>
                           </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {screen === 'sector-select' && (
          <motion.div key="sectors" className="p-12 z-50 relative min-h-screen flex flex-col items-center">
             <div className="flex justify-between w-full max-w-6xl mb-12 items-center bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5">
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => setScreen('login')}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-red-500/20 hover:border-red-500/50 transition-all group"
                    title="DESCONECTAR"
                  >
                    <LogOut className="text-white/40 group-hover:text-red-500 transition-colors" />
                  </button>
                  <div>
                    <h1 className="text-5xl font-display text-glow-cyan uppercase">CITADEL NEXUS</h1>
                    <p className="text-[10px] font-mono text-cyan-400/40 tracking-[0.4em]">SISTEMA ORBITAL DE SOBERANÍA</p>
                  </div>
                </div>
                <div className="flex gap-8">
                   <StatBlock label="Bóveda" value={`$${vaultBalance}`} color="text-royal-gold" />
                   <StatBlock label="Nexus IQ" value={`${xp}`} color="text-cyan-400" />
                </div>
             </div>

             <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center">
                {/* Orbital Rings decoration */}
                <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full animate-spin-slow" />
                <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-reverse-spin" />
                
                <div className="grid grid-cols-5 gap-12 w-full relative z-10">
                   {SECTORS.map((sector, sIdx) => {
                     const isSectorUnlocked = unlockedLevelKeys.some(k => k.startsWith(`sector-${sIdx}`));
                     return (
                       <motion.div 
                         key={sector.id} 
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ delay: sIdx * 0.1 }}
                         className={`flex flex-col gap-6 p-6 rounded-[2.5rem] border-2 transition-all ${
                            isSectorUnlocked ? 'border-cyan-500/20 bg-black/40 backdrop-blur-md' : 'border-white/5 bg-transparent opacity-40'
                         }`}
                       >
                         <div className="text-center group-hover:scale-110 transition-transform">
                           <div className="text-[10px] font-mono text-cyan-400/60 mb-1">0{sector.id}</div>
                           <h3 className="font-display text-xl text-white tracking-tight">{sector.name.toUpperCase()}</h3>
                           <p className="text-[9px] font-mono opacity-40 uppercase">{sector.subtitle}</p>
                         </div>

                         <div className="flex flex-col gap-3">
                           {sector.subLevels.map((level) => {
                             const levelKey = `sector-${sIdx}-${level.id}`;
                             const isUnlocked = unlockedLevelKeys.includes(levelKey);
                             return (
                               <button
                                 key={levelKey}
                                 disabled={!isUnlocked}
                                 onClick={() => {
                                   setCurrentSectorIndex(sIdx);
                                   setCurrentLevelId(level.id);
                                   setCurrentActivityIndex(0);
                                   setScreen('gameplay');
                                 }}
                                 className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all relative group ${
                                   isUnlocked ? 'border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/20 hover:border-cyan-400' : 'border-white/5 bg-white/2 opacity-20 cursor-not-allowed'
                                 }`}
                               >
                                 <div className="flex flex-col items-start">
                                    <span className="text-[8px] font-mono opacity-40 uppercase tracking-tighter">Nivel</span>
                                    <span className="text-[10px] font-bold text-white group-hover:text-cyan-400 transition-colors">{level.id.toUpperCase()}</span>
                                 </div>
                                 {isUnlocked ? (
                                   <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
                                 ) : (
                                   <Lock size={12} className="opacity-20" />
                                 )}
                               </button>
                             );
                           })}
                         </div>
                       </motion.div>
                     );
                   })}
                </div>
             </div>
             
             <div className="absolute bottom-12 flex items-center gap-4 px-8 py-3 bg-white/5 rounded-full border border-white/10 opacity-60">
                <Zap size={14} className="text-royal-gold animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Calibración de Soberanía Requerida: 80% Precisión</span>
             </div>
          </motion.div>
        )}

        {screen === 'vault-deposit' && (
          <motion.div key="vault" className="text-center z-50">
            <div className="mb-12">
               <Banknote size={120} className="text-royal-gold mx-auto animate-bounce" />
            </div>
            <h1 className="text-8xl font-display text-glow-gold mb-4">TRANSFIRIENDO FONDOS</h1>
            <p className="text-2xl text-white/40 mb-16 uppercase tracking-widest">Acreditando ${money} a tu Bóveda de Soberanía</p>
            <button onClick={unlockNextLevel} className="neon-button neon-gold text-2xl px-16">
              RECLAMAR PATRIMONIO
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FEEDBACK OVERLAYS */}
      <AnimatePresence>
        {feedback && (
           <motion.div 
             initial={{ x: 300, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: 300, opacity: 0 }}
             className={`fixed right-12 top-1/2 -translate-y-1/2 w-96 p-8 glass-card border-l-4 z-[100] ${feedback.type === 'success' ? 'border-cyan-500 bg-cyan-500/10' : 'border-red-500 bg-red-500/10'}`}
           >
              <h3 className={`text-4xl font-display mb-4 uppercase ${feedback.type === 'success' ? 'text-cyan-400' : 'text-red-500'}`}>
                {feedback.message}
              </h3>
              <p className="text-sm opacity-70">{currentActivity?.description}</p>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatBlock({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="glass-card p-6 border-white/5">
      <div className={`text-4xl font-display mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] font-mono uppercase opacity-40 tracking-widest">{label}</div>
    </div>
  );
}
