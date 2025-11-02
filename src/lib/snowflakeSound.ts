/**
 * Génère un son de cloche/ding agréable avec Web Audio API
 * Parfait pour la collecte de flocons magiques
 */
export function playSnowflakeCollectSound() {
  // Vérifier si Web Audio API est disponible
  if (typeof window === 'undefined' || !window.AudioContext) {
    return;
  }

  try {
    const audioContext = new AudioContext();
    
    // Créer un oscillateur pour la note principale
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Créer un second oscillateur pour l'harmonie
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    // Connexions
    oscillator.connect(gainNode);
    oscillator2.connect(gainNode2);
    gainNode.connect(audioContext.destination);
    gainNode2.connect(audioContext.destination);
    
    // Configuration de la note principale (C6 - Do aigu)
    oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime);
    oscillator.type = 'sine';
    
    // Configuration de l'harmonie (E6 - Mi aigu, tierce majeure)
    oscillator2.frequency.setValueAtTime(1318.5, audioContext.currentTime);
    oscillator2.type = 'sine';
    
    // Envelope ADSR pour un son de cloche
    // Attack
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    
    gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
    
    // Decay + Sustain + Release
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    // Démarrer et arrêter
    const now = audioContext.currentTime;
    oscillator.start(now);
    oscillator2.start(now);
    oscillator.stop(now + 0.5);
    oscillator2.stop(now + 0.5);
    
    // Nettoyer après la lecture
    setTimeout(() => {
      audioContext.close();
    }, 600);
  } catch (error) {
    // Silencieux en cas d'erreur (ex: autoplay bloqué)
    console.debug('Audio playback prevented:', error);
  }
}

/**
 * Son de victoire (tous les flocons trouvés)
 * Arpège ascendant festif
 */
export function playVictorySound() {
  if (typeof window === 'undefined' || !window.AudioContext) {
    return;
  }

  try {
    const audioContext = new AudioContext();
    
    // Notes de l'arpège (accord de Do Majeur)
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    const duration = 0.15;
    
    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'triangle';
      
      const startTime = audioContext.currentTime + (index * duration);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration * 2);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration * 2);
    });
    
    // Nettoyer
    setTimeout(() => {
      audioContext.close();
    }, 1000);
  } catch (error) {
    console.debug('Audio playback prevented:', error);
  }
}

