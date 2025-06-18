declare filename "untitled.dsp";
declare name "untitled";
import("stdfaust.lib");

mute = checkbox("mute");  
mean = hslider("mean", 50, 25, 75, 0.05); // hslider(nombre, valor inicial, mínimo, máximo, intervalo de cambio)
std_dev = hslider("std_dev", 150, 100, 200, 0.1);  
skewness = hslider("skewness", 350, 250, 450, 0.2);  
kurtosis = hslider("kurtosis", 800, 600, 1000, 0.4); 
volume = hslider("volume", 0.05, 0.02, 0.3, 0.0001); 

process = volume * (1 - mute) * (os.osc(mean) + os.osc(std_dev) + os.osc(skewness) + os.osc(kurtosis));
