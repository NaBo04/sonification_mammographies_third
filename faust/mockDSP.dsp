declare filename "untitled.dsp";
declare name "untitled";
import("stdfaust.lib");

mute = checkbox("mute");  
mean = hslider("mean", 0.05, 0, 0.1, 0.001); // hslider(nombre, valor inicial, mínimo, máximo, intervalo de cambio)
std_dev = hslider("std_dev", 0.05, 0, 0.1, 0.001);  
skewness = hslider("skewness", 0.05, 0, 0.1, 0.001);  
kurtosis = hslider("kurtosis", 0.05, 0, 0.1, 0.001); 
volume = hslider("volume", 2, 1, 10, 0.01); 

process = volume * (1 - mute) * (os.osc(130) * mean + os.osc(240) * std_dev + os.osc(370) * skewness + os.osc(500) * kurtosis);
