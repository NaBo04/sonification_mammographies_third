import("stdfaust.lib");

// ---------------- UI ----------------
mute = checkbox("0.mute"); // 0=audible, 1=silent
gain = hslider("1.gain [unit:lin]", 0.5, 0, 1, 0.001) : si.smooth(0.999);
f0   = hslider("2.f0 [unit:Hz]", 220, 20, 2000, 1) : si.smooth(0.999);
harm = hslider("3.harmonicity [unit:ratio]", 1.0, 0.25, 8.0, 0.001) : si.smooth(0.999);
rep  = hslider("4.repetition_rate [unit:Hz]", 5.0, 0.1, 30.0, 0.01) : si.smooth(0.999);

// Band-pass controls (2 params)
bpF  = hslider("5.bandpass/fc [unit:Hz]", 1000, 20, 10000, 1) : si.smooth(0.999);
bpQ  = hslider("6.bandpass/Q [unit:Q]",   1.0,  0.1, 5.0,   0.001) : si.smooth(0.999);

// ---------------- Core Synthesis (B4-inspired) ----------------
idx   = 2.0;                               // FM index (musical sweet spot)
fc    = max(20.0, f0);
fm    = max(20.0, harm * fc);
mod   = os.osc(fm) * idx * fm;
fmSig = os.osc(max(20.0, fc + mod));

// Gentle low-pass tied to f0 (keeps brightness musical)
cut   = min(8000.0, fc * 3.0);
tone  = fmSig : fi.lowpass(1, cut);

// Repetition component (musical AM/tremolo)
trem  = 0.5 * (1.0 + os.osc(rep));         // 0..1
body  = tone * trem;

// ---------------- Band-Pass (correct arg order!) ----------------
bpf   = body : fi.resonbp(max(20.0, bpF), max(0.1, bpQ), 1.0);

// ---------------- Output ----------------
active = 1.0 - mute;                        // mute=1 => silence
out    = bpf * gain * active;

// Stereo out
process = out <: _,_;