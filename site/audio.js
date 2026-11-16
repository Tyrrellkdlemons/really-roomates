/**
 * REALLY ROOMATES — Grace & Strings
 * Pure Web Audio API Acoustic Guitar Chord Synthesizer
 * Simulates physical acoustic guitar string pluck harmonics & resonance chamber
 * Zero external audio files, works 100% offline and instantly.
 */

class AcousticGuitarEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.convolver = null;
    this.isPlayingArpeggio = false;
    this.arpeggioTimer = null;

    // Guitar Chord Frequencies (Hz) for standard acoustic voicing
    this.chords = {
      'Cmaj9': [
        { note: 'C3', freq: 130.81, delay: 0.00 },
        { note: 'G3', freq: 196.00, delay: 0.03 },
        { note: 'D4', freq: 293.66, delay: 0.06 },
        { note: 'E4', freq: 329.63, delay: 0.09 },
        { note: 'B4', freq: 493.88, delay: 0.12 }
      ],
      'Gadd9': [
        { note: 'G2', freq: 98.00,  delay: 0.00 },
        { note: 'D3', freq: 146.83, delay: 0.03 },
        { note: 'G3', freq: 196.00, delay: 0.06 },
        { note: 'A3', freq: 220.00, delay: 0.09 },
        { note: 'B3', freq: 246.94, delay: 0.12 },
        { note: 'D4', freq: 293.66, delay: 0.15 }
      ],
      'Dadd9': [
        { note: 'D3', freq: 146.83, delay: 0.00 },
        { note: 'A3', freq: 220.00, delay: 0.03 },
        { note: 'D4', freq: 293.66, delay: 0.06 },
        { note: 'F#4', freq: 369.99, delay: 0.09 },
        { note: 'E4', freq: 329.63, delay: 0.12 }
      ],
      'Em7': [
        { note: 'E2', freq: 82.41,  delay: 0.00 },
        { note: 'B2', freq: 123.47, delay: 0.03 },
        { note: 'E3', freq: 164.81, delay: 0.06 },
        { note: 'G3', freq: 196.00, delay: 0.09 },
        { note: 'D4', freq: 293.66, delay: 0.12 }
      ],
      'Am7': [
        { note: 'A2', freq: 110.00, delay: 0.00 },
        { note: 'E3', freq: 164.81, delay: 0.03 },
        { note: 'A3', freq: 220.00, delay: 0.06 },
        { note: 'C4', freq: 261.63, delay: 0.09 },
        { note: 'G4', freq: 392.00, delay: 0.12 }
      ],
      'Cadd9': [
        { note: 'C3', freq: 130.81, delay: 0.00 },
        { note: 'E3', freq: 164.81, delay: 0.03 },
        { note: 'G3', freq: 196.00, delay: 0.06 },
        { note: 'D4', freq: 293.66, delay: 0.09 },
        { note: 'G4', freq: 392.00, delay: 0.12 }
      ]
    };
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return false;
      this.ctx = new AudioContextClass();

      // Master output stage
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

      // Acoustic wood body cabinet resonance filter (peaking around 220Hz and 850Hz)
      this.bodyFilter = this.ctx.createBiquadFilter();
      this.bodyFilter.type = 'peaking';
      this.bodyFilter.frequency.setValueAtTime(240, this.ctx.currentTime);
      this.bodyFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      this.bodyFilter.gain.setValueAtTime(3.5, this.ctx.currentTime);

      // Warm high cut to simulate nylon/bronze string warmth
      this.warmFilter = this.ctx.createBiquadFilter();
      this.warmFilter.type = 'lowpass';
      this.warmFilter.frequency.setValueAtTime(3800, this.ctx.currentTime);

      // Connect filters to master
      this.bodyFilter.connect(this.warmFilter);
      this.warmFilter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  // Synthesize an individual acoustic guitar string pluck
  pluckString(frequency, startTime, duration = 3.2, velocity = 0.8) {
    if (!this.ctx) return;

    // Harmonic partials that give acoustic steel/bronze string resonance
    const harmonics = [
      { ratio: 1.0,  gain: 1.00, decay: 1.0 },
      { ratio: 2.0,  gain: 0.55, decay: 0.8 },
      { ratio: 3.0,  gain: 0.28, decay: 0.6 },
      { ratio: 4.0,  gain: 0.14, decay: 0.4 },
      { ratio: 5.0,  gain: 0.07, decay: 0.3 }
    ];

    harmonics.forEach(h => {
      const osc = this.ctx.createOscillator();
      const stringGain = this.ctx.createGain();

      // Triangle wave with slight harmonics provides the warmest acoustic pluck
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency * h.ratio, startTime);

      // Slight initial attack 'pick' transient noise
      const peakVolume = (velocity * h.gain * 0.22);
      stringGain.gain.setValueAtTime(0.0001, startTime);
      stringGain.gain.exponentialRampToValueAtTime(peakVolume, startTime + 0.008);
      // Long resonant decay
      stringGain.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * h.decay));

      osc.connect(stringGain);
      stringGain.connect(this.bodyFilter);

      osc.start(startTime);
      osc.stop(startTime + (duration * h.decay) + 0.1);
    });
  }

  // Strum a full chord with authentic micro-delay strum timing
  strumChord(chordName, speed = 'natural') {
    if (!this.init()) return;

    const chord = this.chords[chordName] || this.chords['Cmaj9'];
    const now = this.ctx.currentTime;
    const delayMultiplier = speed === 'slow' ? 0.05 : 0.025;

    chord.forEach((string, idx) => {
      const stringTime = now + (idx * delayMultiplier);
      const stringDuration = 3.2 - (idx * 0.15);
      const velocity = 0.75 + (Math.random() * 0.15); // Humanize
      this.pluckString(string.freq, stringTime, stringDuration, velocity);
    });
  }

  // Gentle acoustic reflection sequence (peaceful 4-chord progression)
  playPeacefulProgression(onStepChange = null) {
    if (!this.init()) return;

    if (this.isPlayingArpeggio) {
      this.stopPeacefulProgression();
      return false;
    }

    this.isPlayingArpeggio = true;
    const progression = ['Cmaj9', 'Gadd9', 'Em7', 'Cadd9'];
    let step = 0;

    const playNext = () => {
      if (!this.isPlayingArpeggio) return;
      const currentChord = progression[step % progression.length];
      this.strumChord(currentChord, 'slow');
      if (onStepChange) onStepChange(currentChord, step % progression.length);
      step++;
      this.arpeggioTimer = setTimeout(playNext, 3800);
    };

    playNext();
    return true;
  }

  stopPeacefulProgression() {
    this.isPlayingArpeggio = false;
    if (this.arpeggioTimer) {
      clearTimeout(this.arpeggioTimer);
      this.arpeggioTimer = null;
    }
  }
}

export const guitarEngine = new AcousticGuitarEngine();
