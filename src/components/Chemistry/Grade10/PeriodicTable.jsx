import React, { useState, useEffect } from "react";

const PeriodicTableTrends = () => {
  // Experiment states
  const [activeTab, setActiveTab] = useState("trends");
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedTrend, setSelectedTrend] = useState("atomicRadius");
  const [highlightedGroup, setHighlightedGroup] = useState(null);
  const [highlightedPeriod, setHighlightedPeriod] = useState(null);
  const [showProperties, setShowProperties] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");
  const [colorScale, setColorScale] = useState({ min: 0, max: 1 });

  // Complete periodic table data (all 118 elements)
  const elements = [
    // Period 1
    { atomicNumber: 1, symbol: "H", name: "Hydrogen", group: 1, period: 1, atomicRadius: 53, electronegativity: 2.20, ionizationEnergy: 1312, electronAffinity: 73 },
    { atomicNumber: 2, symbol: "He", name: "Helium", group: 18, period: 1, atomicRadius: 31, electronegativity: null, ionizationEnergy: 2372, electronAffinity: 0 },

    // Period 2
    { atomicNumber: 3, symbol: "Li", name: "Lithium", group: 1, period: 2, atomicRadius: 167, electronegativity: 0.98, ionizationEnergy: 520, electronAffinity: 60 },
    { atomicNumber: 4, symbol: "Be", name: "Beryllium", group: 2, period: 2, atomicRadius: 112, electronegativity: 1.57, ionizationEnergy: 899, electronAffinity: 0 },
    { atomicNumber: 5, symbol: "B", name: "Boron", group: 13, period: 2, atomicRadius: 87, electronegativity: 2.04, ionizationEnergy: 801, electronAffinity: 27 },
    { atomicNumber: 6, symbol: "C", name: "Carbon", group: 14, period: 2, atomicRadius: 67, electronegativity: 2.55, ionizationEnergy: 1086, electronAffinity: 122 },
    { atomicNumber: 7, symbol: "N", name: "Nitrogen", group: 15, period: 2, atomicRadius: 56, electronegativity: 3.04, ionizationEnergy: 1402, electronAffinity: 0 },
    { atomicNumber: 8, symbol: "O", name: "Oxygen", group: 16, period: 2, atomicRadius: 48, electronegativity: 3.44, ionizationEnergy: 1314, electronAffinity: 141 },
    { atomicNumber: 9, symbol: "F", name: "Fluorine", group: 17, period: 2, atomicRadius: 42, electronegativity: 3.98, ionizationEnergy: 1681, electronAffinity: 328 },
    { atomicNumber: 10, symbol: "Ne", name: "Neon", group: 18, period: 2, atomicRadius: 38, electronegativity: null, ionizationEnergy: 2081, electronAffinity: 0 },

    // Period 3
    { atomicNumber: 11, symbol: "Na", name: "Sodium", group: 1, period: 3, atomicRadius: 190, electronegativity: 0.93, ionizationEnergy: 496, electronAffinity: 53 },
    { atomicNumber: 12, symbol: "Mg", name: "Magnesium", group: 2, period: 3, atomicRadius: 145, electronegativity: 1.31, ionizationEnergy: 738, electronAffinity: 0 },
    { atomicNumber: 13, symbol: "Al", name: "Aluminum", group: 13, period: 3, atomicRadius: 118, electronegativity: 1.61, ionizationEnergy: 578, electronAffinity: 42 },
    { atomicNumber: 14, symbol: "Si", name: "Silicon", group: 14, period: 3, atomicRadius: 111, electronegativity: 1.90, ionizationEnergy: 786, electronAffinity: 134 },
    { atomicNumber: 15, symbol: "P", name: "Phosphorus", group: 15, period: 3, atomicRadius: 98, electronegativity: 2.19, ionizationEnergy: 1012, electronAffinity: 72 },
    { atomicNumber: 16, symbol: "S", name: "Sulfur", group: 16, period: 3, atomicRadius: 88, electronegativity: 2.58, ionizationEnergy: 1000, electronAffinity: 200 },
    { atomicNumber: 17, symbol: "Cl", name: "Chlorine", group: 17, period: 3, atomicRadius: 79, electronegativity: 3.16, ionizationEnergy: 1251, electronAffinity: 349 },
    { atomicNumber: 18, symbol: "Ar", name: "Argon", group: 18, period: 3, atomicRadius: 71, electronegativity: null, ionizationEnergy: 1521, electronAffinity: 0 },

    // Period 4
    { atomicNumber: 19, symbol: "K", name: "Potassium", group: 1, period: 4, atomicRadius: 243, electronegativity: 0.82, ionizationEnergy: 419, electronAffinity: 48 },
    { atomicNumber: 20, symbol: "Ca", name: "Calcium", group: 2, period: 4, atomicRadius: 194, electronegativity: 1.00, ionizationEnergy: 590, electronAffinity: 0 },
    { atomicNumber: 21, symbol: "Sc", name: "Scandium", group: 3, period: 4, atomicRadius: 184, electronegativity: 1.36, ionizationEnergy: 633, electronAffinity: 18 },
    { atomicNumber: 22, symbol: "Ti", name: "Titanium", group: 4, period: 4, atomicRadius: 176, electronegativity: 1.54, ionizationEnergy: 659, electronAffinity: 8 },
    { atomicNumber: 23, symbol: "V", name: "Vanadium", group: 5, period: 4, atomicRadius: 171, electronegativity: 1.63, ionizationEnergy: 651, electronAffinity: 51 },
    { atomicNumber: 24, symbol: "Cr", name: "Chromium", group: 6, period: 4, atomicRadius: 166, electronegativity: 1.66, ionizationEnergy: 653, electronAffinity: 65 },
    { atomicNumber: 25, symbol: "Mn", name: "Manganese", group: 7, period: 4, atomicRadius: 161, electronegativity: 1.55, ionizationEnergy: 717, electronAffinity: 0 },
    { atomicNumber: 26, symbol: "Fe", name: "Iron", group: 8, period: 4, atomicRadius: 156, electronegativity: 1.83, ionizationEnergy: 762, electronAffinity: 15 },
    { atomicNumber: 27, symbol: "Co", name: "Cobalt", group: 9, period: 4, atomicRadius: 152, electronegativity: 1.88, ionizationEnergy: 760, electronAffinity: 64 },
    { atomicNumber: 28, symbol: "Ni", name: "Nickel", group: 10, period: 4, atomicRadius: 149, electronegativity: 1.91, ionizationEnergy: 737, electronAffinity: 112 },
    { atomicNumber: 29, symbol: "Cu", name: "Copper", group: 11, period: 4, atomicRadius: 145, electronegativity: 1.90, ionizationEnergy: 745, electronAffinity: 119 },
    { atomicNumber: 30, symbol: "Zn", name: "Zinc", group: 12, period: 4, atomicRadius: 142, electronegativity: 1.65, ionizationEnergy: 906, electronAffinity: 0 },
    { atomicNumber: 31, symbol: "Ga", name: "Gallium", group: 13, period: 4, atomicRadius: 136, electronegativity: 1.81, ionizationEnergy: 579, electronAffinity: 29 },
    { atomicNumber: 32, symbol: "Ge", name: "Germanium", group: 14, period: 4, atomicRadius: 125, electronegativity: 2.01, ionizationEnergy: 762, electronAffinity: 119 },
    { atomicNumber: 33, symbol: "As", name: "Arsenic", group: 15, period: 4, atomicRadius: 114, electronegativity: 2.18, ionizationEnergy: 947, electronAffinity: 78 },
    { atomicNumber: 34, symbol: "Se", name: "Selenium", group: 16, period: 4, atomicRadius: 103, electronegativity: 2.55, ionizationEnergy: 941, electronAffinity: 195 },
    { atomicNumber: 35, symbol: "Br", name: "Bromine", group: 17, period: 4, atomicRadius: 94, electronegativity: 2.96, ionizationEnergy: 1140, electronAffinity: 325 },
    { atomicNumber: 36, symbol: "Kr", name: "Krypton", group: 18, period: 4, atomicRadius: 88, electronegativity: 3.00, ionizationEnergy: 1351, electronAffinity: 0 },

    // Period 5
    { atomicNumber: 37, symbol: "Rb", name: "Rubidium", group: 1, period: 5, atomicRadius: 265, electronegativity: 0.82, ionizationEnergy: 403, electronAffinity: 47 },
    { atomicNumber: 38, symbol: "Sr", name: "Strontium", group: 2, period: 5, atomicRadius: 219, electronegativity: 0.95, ionizationEnergy: 550, electronAffinity: 0 },
    { atomicNumber: 39, symbol: "Y", name: "Yttrium", group: 3, period: 5, atomicRadius: 212, electronegativity: 1.22, ionizationEnergy: 600, electronAffinity: 29 },
    { atomicNumber: 40, symbol: "Zr", name: "Zirconium", group: 4, period: 5, atomicRadius: 206, electronegativity: 1.33, ionizationEnergy: 640, electronAffinity: 41 },
    { atomicNumber: 41, symbol: "Nb", name: "Niobium", group: 5, period: 5, atomicRadius: 198, electronegativity: 1.60, ionizationEnergy: 652, electronAffinity: 88 },
    { atomicNumber: 42, symbol: "Mo", name: "Molybdenum", group: 6, period: 5, atomicRadius: 190, electronegativity: 2.16, ionizationEnergy: 684, electronAffinity: 72 },
    { atomicNumber: 43, symbol: "Tc", name: "Technetium", group: 7, period: 5, atomicRadius: 183, electronegativity: 1.90, ionizationEnergy: 702, electronAffinity: 53 },
    { atomicNumber: 44, symbol: "Ru", name: "Ruthenium", group: 8, period: 5, atomicRadius: 178, electronegativity: 2.20, ionizationEnergy: 710, electronAffinity: 101 },
    { atomicNumber: 45, symbol: "Rh", name: "Rhodium", group: 9, period: 5, atomicRadius: 173, electronegativity: 2.28, ionizationEnergy: 719, electronAffinity: 110 },
    { atomicNumber: 46, symbol: "Pd", name: "Palladium", group: 10, period: 5, atomicRadius: 169, electronegativity: 2.20, ionizationEnergy: 804, electronAffinity: 54 },
    { atomicNumber: 47, symbol: "Ag", name: "Silver", group: 11, period: 5, atomicRadius: 165, electronegativity: 1.93, ionizationEnergy: 731, electronAffinity: 126 },
    { atomicNumber: 48, symbol: "Cd", name: "Cadmium", group: 12, period: 5, atomicRadius: 161, electronegativity: 1.69, ionizationEnergy: 868, electronAffinity: 0 },
    { atomicNumber: 49, symbol: "In", name: "Indium", group: 13, period: 5, atomicRadius: 156, electronegativity: 1.78, ionizationEnergy: 558, electronAffinity: 28 },
    { atomicNumber: 50, symbol: "Sn", name: "Tin", group: 14, period: 5, atomicRadius: 145, electronegativity: 1.96, ionizationEnergy: 708, electronAffinity: 107 },
    { atomicNumber: 51, symbol: "Sb", name: "Antimony", group: 15, period: 5, atomicRadius: 133, electronegativity: 2.05, ionizationEnergy: 834, electronAffinity: 103 },
    { atomicNumber: 52, symbol: "Te", name: "Tellurium", group: 16, period: 5, atomicRadius: 123, electronegativity: 2.10, ionizationEnergy: 869, electronAffinity: 190 },
    { atomicNumber: 53, symbol: "I", name: "Iodine", group: 17, period: 5, atomicRadius: 115, electronegativity: 2.66, ionizationEnergy: 1008, electronAffinity: 295 },
    { atomicNumber: 54, symbol: "Xe", name: "Xenon", group: 18, period: 5, atomicRadius: 108, electronegativity: null, ionizationEnergy: 1170, electronAffinity: 0 },

    // Period 6 (including Lanthanides)
    { atomicNumber: 55, symbol: "Cs", name: "Cesium", group: 1, period: 6, atomicRadius: 298, electronegativity: 0.79, ionizationEnergy: 376, electronAffinity: 46 },
    { atomicNumber: 56, symbol: "Ba", name: "Barium", group: 2, period: 6, atomicRadius: 253, electronegativity: 0.89, ionizationEnergy: 503, electronAffinity: 0 },
    
    // Lanthanides (57-71)
    { atomicNumber: 57, symbol: "La", name: "Lanthanum", group: 3, period: 6, atomicRadius: 195, electronegativity: 1.10, ionizationEnergy: 538, electronAffinity: 48 },
    { atomicNumber: 58, symbol: "Ce", name: "Cerium", group: null, period: 6, atomicRadius: 185, electronegativity: 1.12, ionizationEnergy: 534, electronAffinity: 50 },
    { atomicNumber: 59, symbol: "Pr", name: "Praseodymium", group: null, period: 6, atomicRadius: 185, electronegativity: 1.13, ionizationEnergy: 527, electronAffinity: 54 },
    { atomicNumber: 60, symbol: "Nd", name: "Neodymium", group: null, period: 6, atomicRadius: 182, electronegativity: 1.14, ionizationEnergy: 533, electronAffinity: 0 },
    { atomicNumber: 61, symbol: "Pm", name: "Promethium", group: null, period: 6, atomicRadius: 183, electronegativity: null, ionizationEnergy: 540, electronAffinity: null },
    { atomicNumber: 62, symbol: "Sm", name: "Samarium", group: null, period: 6, atomicRadius: 180, electronegativity: 1.17, ionizationEnergy: 544, electronAffinity: 0 },
    { atomicNumber: 63, symbol: "Eu", name: "Europium", group: null, period: 6, atomicRadius: 204, electronegativity: 1.20, ionizationEnergy: 547, electronAffinity: 0 },
    { atomicNumber: 64, symbol: "Gd", name: "Gadolinium", group: null, period: 6, atomicRadius: 180, electronegativity: 1.20, ionizationEnergy: 593, electronAffinity: 0 },
    { atomicNumber: 65, symbol: "Tb", name: "Terbium", group: null, period: 6, atomicRadius: 177, electronegativity: 1.20, ionizationEnergy: 565, electronAffinity: 0 },
    { atomicNumber: 66, symbol: "Dy", name: "Dysprosium", group: null, period: 6, atomicRadius: 178, electronegativity: 1.22, ionizationEnergy: 573, electronAffinity: 0 },
    { atomicNumber: 67, symbol: "Ho", name: "Holmium", group: null, period: 6, atomicRadius: 176, electronegativity: 1.23, ionizationEnergy: 581, electronAffinity: 0 },
    { atomicNumber: 68, symbol: "Er", name: "Erbium", group: null, period: 6, atomicRadius: 175, electronegativity: 1.24, ionizationEnergy: 589, electronAffinity: 0 },
    { atomicNumber: 69, symbol: "Tm", name: "Thulium", group: null, period: 6, atomicRadius: 173, electronegativity: 1.25, ionizationEnergy: 597, electronAffinity: 0 },
    { atomicNumber: 70, symbol: "Yb", name: "Ytterbium", group: null, period: 6, atomicRadius: 222, electronegativity: 1.10, ionizationEnergy: 603, electronAffinity: 0 },
    { atomicNumber: 71, symbol: "Lu", name: "Lutetium", group: 3, period: 6, atomicRadius: 174, electronegativity: 1.27, ionizationEnergy: 523, electronAffinity: 31 },

    { atomicNumber: 72, symbol: "Hf", name: "Hafnium", group: 4, period: 6, atomicRadius: 159, electronegativity: 1.30, ionizationEnergy: 658, electronAffinity: 0 },
    { atomicNumber: 73, symbol: "Ta", name: "Tantalum", group: 5, period: 6, atomicRadius: 146, electronegativity: 1.50, ionizationEnergy: 761, electronAffinity: 31 },
    { atomicNumber: 74, symbol: "W", name: "Tungsten", group: 6, period: 6, atomicRadius: 139, electronegativity: 2.36, ionizationEnergy: 770, electronAffinity: 78 },
    { atomicNumber: 75, symbol: "Re", name: "Rhenium", group: 7, period: 6, atomicRadius: 137, electronegativity: 1.90, ionizationEnergy: 760, electronAffinity: 5 },
    { atomicNumber: 76, symbol: "Os", name: "Osmium", group: 8, period: 6, atomicRadius: 135, electronegativity: 2.20, ionizationEnergy: 840, electronAffinity: 103 },
    { atomicNumber: 77, symbol: "Ir", name: "Iridium", group: 9, period: 6, atomicRadius: 135, electronegativity: 2.20, ionizationEnergy: 880, electronAffinity: 151 },
    { atomicNumber: 78, symbol: "Pt", name: "Platinum", group: 10, period: 6, atomicRadius: 139, electronegativity: 2.28, ionizationEnergy: 870, electronAffinity: 205 },
    { atomicNumber: 79, symbol: "Au", name: "Gold", group: 11, period: 6, atomicRadius: 144, electronegativity: 2.54, ionizationEnergy: 890, electronAffinity: 223 },
    { atomicNumber: 80, symbol: "Hg", name: "Mercury", group: 12, period: 6, atomicRadius: 149, electronegativity: 2.00, ionizationEnergy: 1007, electronAffinity: 0 },
    { atomicNumber: 81, symbol: "Tl", name: "Thallium", group: 13, period: 6, atomicRadius: 148, electronegativity: 1.62, ionizationEnergy: 589, electronAffinity: 36 },
    { atomicNumber: 82, symbol: "Pb", name: "Lead", group: 14, period: 6, atomicRadius: 154, electronegativity: 2.33, ionizationEnergy: 715, electronAffinity: 35 },
    { atomicNumber: 83, symbol: "Bi", name: "Bismuth", group: 15, period: 6, atomicRadius: 143, electronegativity: 2.02, ionizationEnergy: 703, electronAffinity: 91 },
    { atomicNumber: 84, symbol: "Po", name: "Polonium", group: 16, period: 6, atomicRadius: 135, electronegativity: 2.00, ionizationEnergy: 812, electronAffinity: 0 },
    { atomicNumber: 85, symbol: "At", name: "Astatine", group: 17, period: 6, atomicRadius: 127, electronegativity: 2.20, ionizationEnergy: 920, electronAffinity: 270 },
    { atomicNumber: 86, symbol: "Rn", name: "Radon", group: 18, period: 6, atomicRadius: 120, electronegativity: null, ionizationEnergy: 1037, electronAffinity: 0 },

    // Period 7 (including Actinides)
    { atomicNumber: 87, symbol: "Fr", name: "Francium", group: 1, period: 7, atomicRadius: 348, electronegativity: 0.70, ionizationEnergy: 380, electronAffinity: 46 },
    { atomicNumber: 88, symbol: "Ra", name: "Radium", group: 2, period: 7, atomicRadius: 283, electronegativity: 0.90, ionizationEnergy: 509, electronAffinity: 0 },

    // Actinides (89-103)
    { atomicNumber: 89, symbol: "Ac", name: "Actinium", group: 3, period: 7, atomicRadius: 195, electronegativity: 1.10, ionizationEnergy: 499, electronAffinity: 33 },
    { atomicNumber: 90, symbol: "Th", name: "Thorium", group: null, period: 7, atomicRadius: 180, electronegativity: 1.30, ionizationEnergy: 587, electronAffinity: 0 },
    { atomicNumber: 91, symbol: "Pa", name: "Protactinium", group: null, period: 7, atomicRadius: 180, electronegativity: 1.50, ionizationEnergy: 568, electronAffinity: 0 },
    { atomicNumber: 92, symbol: "U", name: "Uranium", group: null, period: 7, atomicRadius: 175, electronegativity: 1.38, ionizationEnergy: 597, electronAffinity: 0 },
    { atomicNumber: 93, symbol: "Np", name: "Neptunium", group: null, period: 7, atomicRadius: 175, electronegativity: 1.36, ionizationEnergy: 604, electronAffinity: 0 },
    { atomicNumber: 94, symbol: "Pu", name: "Plutonium", group: null, period: 7, atomicRadius: 175, electronegativity: 1.28, ionizationEnergy: 584, electronAffinity: 0 },
    { atomicNumber: 95, symbol: "Am", name: "Americium", group: null, period: 7, atomicRadius: 175, electronegativity: 1.13, ionizationEnergy: 578, electronAffinity: 0 },
    { atomicNumber: 96, symbol: "Cm", name: "Curium", group: null, period: 7, atomicRadius: 173, electronegativity: 1.28, ionizationEnergy: 581, electronAffinity: 0 },
    { atomicNumber: 97, symbol: "Bk", name: "Berkelium", group: null, period: 7, atomicRadius: 170, electronegativity: 1.30, ionizationEnergy: 601, electronAffinity: 0 },
    { atomicNumber: 98, symbol: "Cf", name: "Californium", group: null, period: 7, atomicRadius: 169, electronegativity: 1.30, ionizationEnergy: 608, electronAffinity: 0 },
    { atomicNumber: 99, symbol: "Es", name: "Einsteinium", group: null, period: 7, atomicRadius: 168, electronegativity: 1.30, ionizationEnergy: 619, electronAffinity: 0 },
    { atomicNumber: 100, symbol: "Fm", name: "Fermium", group: null, period: 7, atomicRadius: 168, electronegativity: 1.30, ionizationEnergy: 627, electronAffinity: 0 },
    { atomicNumber: 101, symbol: "Md", name: "Mendelevium", group: null, period: 7, atomicRadius: 168, electronegativity: 1.30, ionizationEnergy: 635, electronAffinity: 0 },
    { atomicNumber: 102, symbol: "No", name: "Nobelium", group: null, period: 7, atomicRadius: 168, electronegativity: 1.30, ionizationEnergy: 642, electronAffinity: 0 },
    { atomicNumber: 103, symbol: "Lr", name: "Lawrencium", group: null, period: 7, atomicRadius: 170, electronegativity: 1.30, ionizationEnergy: 470, electronAffinity: 0 },

    // Post-actinides
    { atomicNumber: 104, symbol: "Rf", name: "Rutherfordium", group: 4, period: 7, atomicRadius: 157, electronegativity: null, ionizationEnergy: 580, electronAffinity: 0 },
    { atomicNumber: 105, symbol: "Db", name: "Dubnium", group: 5, period: 7, atomicRadius: 149, electronegativity: null, ionizationEnergy: 665, electronAffinity: 0 },
    { atomicNumber: 106, symbol: "Sg", name: "Seaborgium", group: 6, period: 7, atomicRadius: 143, electronegativity: null, ionizationEnergy: 757, electronAffinity: 0 },
    { atomicNumber: 107, symbol: "Bh", name: "Bohrium", group: 7, period: 7, atomicRadius: 141, electronegativity: null, ionizationEnergy: 740, electronAffinity: 0 },
    { atomicNumber: 108, symbol: "Hs", name: "Hassium", group: 8, period: 7, atomicRadius: 134, electronegativity: null, ionizationEnergy: 730, electronAffinity: 0 },
    { atomicNumber: 109, symbol: "Mt", name: "Meitnerium", group: 9, period: 7, atomicRadius: 129, electronegativity: null, ionizationEnergy: 800, electronAffinity: 0 },
    { atomicNumber: 110, symbol: "Ds", name: "Darmstadtium", group: 10, period: 7, atomicRadius: 128, electronegativity: null, ionizationEnergy: 960, electronAffinity: 0 },
    { atomicNumber: 111, symbol: "Rg", name: "Roentgenium", group: 11, period: 7, atomicRadius: 121, electronegativity: null, ionizationEnergy: 1020, electronAffinity: 0 },
    { atomicNumber: 112, symbol: "Cn", name: "Copernicium", group: 12, period: 7, atomicRadius: 122, electronegativity: null, ionizationEnergy: 1154, electronAffinity: 0 },
    { atomicNumber: 113, symbol: "Nh", name: "Nihonium", group: 13, period: 7, atomicRadius: 136, electronegativity: null, ionizationEnergy: 704, electronAffinity: 0 },
    { atomicNumber: 114, symbol: "Fl", name: "Flerovium", group: 14, period: 7, atomicRadius: 143, electronegativity: null, ionizationEnergy: 823, electronAffinity: 0 },
    { atomicNumber: 115, symbol: "Mc", name: "Moscovium", group: 15, period: 7, atomicRadius: 162, electronegativity: null, ionizationEnergy: 538, electronAffinity: 0 },
    { atomicNumber: 116, symbol: "Lv", name: "Livermorium", group: 16, period: 7, atomicRadius: 175, electronegativity: null, ionizationEnergy: 723, electronAffinity: 0 },
    { atomicNumber: 117, symbol: "Ts", name: "Tennessine", group: 17, period: 7, atomicRadius: 165, electronegativity: null, ionizationEnergy: 743, electronAffinity: 0 },
    { atomicNumber: 118, symbol: "Og", name: "Oganesson", group: 18, period: 7, atomicRadius: 152, electronegativity: null, ionizationEnergy: 860, electronAffinity: 0 }
  ];

  // Trend options
  const trends = {
    atomicRadius: {
      name: "Atomic Radius",
      unit: "pm",
      direction: "Decreases across a period, increases down a group"
    },
    electronegativity: {
      name: "Electronegativity",
      unit: "Pauling scale",
      direction: "Increases across a period, decreases down a group"
    },
    ionizationEnergy: {
      name: "Ionization Energy",
      unit: "kJ/mol",
      direction: "Increases across a period, decreases down a group"
    },
    electronAffinity: {
      name: "Electron Affinity",
      unit: "kJ/mol",
      direction: "Generally increases across a period, decreases down a group"
    }
  };

  // Group information
  const groups = {
    1: { name: "Alkali Metals", color: "#FF6666" },
    2: { name: "Alkaline Earth Metals", color: "#FFDEAD" },
    3: { name: "Scandium Group", color: "#FFB347" },
    4: { name: "Titanium Group", color: "#CFCFC4" },
    5: { name: "Vanadium Group", color: "#A2ADD0" },
    6: { name: "Chromium Group", color: "#FFA07A" },
    7: { name: "Manganese Group", color: "#B39EB5" },
    8: { name: "Iron Group", color: "#FDDDE6" },
    9: { name: "Cobalt Group", color: "#C3B091" },
    10: { name: "Nickel Group", color: "#B5D8EB" },
    11: { name: "Copper Group", color: "#FFD700" },
    12: { name: "Zinc Group", color: "#C4D4E0" },
    13: { name: "Boron Group", color: "#FFA500" },
    14: { name: "Carbon Group", color: "#D3D3D3" },
    15: { name: "Nitrogen Group", color: "#FF6347" },
    16: { name: "Oxygen Group", color: "#90EE90" },
    17: { name: "Halogens", color: "#7FFFD4" },
    18: { name: "Noble Gases", color: "#C0C0C0" }
  };

  // Update color scale when trend changes
  useEffect(() => {
    if (!selectedTrend) return;
    
    const values = elements.map(el => el[selectedTrend]).filter(val => val !== null);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    setColorScale({ min, max });
  }, [selectedTrend]);

  // Handle element selection
  const handleElementClick = (element) => {
    setSelectedElement(element);
    if (activeTab !== "properties") {
      setShowProperties(true);
    }
  };

  // Get color for element based on selected trend
  const getElementColor = (value) => {
    if (value === null || value === undefined) return "#cccccc";
    
    const { min, max } = colorScale;
    if (min === max) return "#3498db";
    
    const intensity = (value - min) / (max - min);
    const hue = (1 - intensity) * 240; // Blue (high) to red (low)
    return `hsl(${hue}, 100%, 50%)`;
  };

  // Visualize trends
  const visualizeTrend = () => {
    return elements.map(element => {
      const value = element[selectedTrend];
      const color = getElementColor(value);
      
      // Skip elements that don't have a group (lanthanides/actinides in main table)
      if (element.group === null) return null;
      
      return (
        <div 
          key={element.atomicNumber}
          className={`element ${element.group === highlightedGroup ? 'highlight-group' : ''} ${element.period === highlightedPeriod ? 'highlight-period' : ''}`}
          style={{ 
            gridColumn: element.group,
            gridRow: element.period + 1,
            backgroundColor: color
          }}
          onClick={() => handleElementClick(element)}
          title={`${element.name} (${element.symbol})`}
        >
          <div className="symbol">{element.symbol}</div>
          <div className="atomic-number">{element.atomicNumber}</div>
          {showProperties && selectedElement?.atomicNumber === element.atomicNumber && (
            <div className="property-value">
              {value !== null ? `${value} ${trends[selectedTrend].unit}` : 'N/A'}
            </div>
          )}
        </div>
      );
    });
  };

  // Generate quiz question
  const generateQuizQuestion = () => {
    const trendKeys = Object.keys(trends);
    const randomTrend = trendKeys[Math.floor(Math.random() * trendKeys.length)];
    
    // Randomly choose between direction question or element comparison
    const questionTypes = ["direction", "comparison"];
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question, answer;
    
    if (questionType === "direction") {
      question = `What is the general trend for ${trends[randomTrend].name} across the periodic table?`;
      answer = trends[randomTrend].direction;
    } else {
      // Comparison question
      const filteredElements = elements.filter(el => el[randomTrend] !== null);
      const element1 = filteredElements[Math.floor(Math.random() * filteredElements.length)];
      let element2;
      
      // Ensure we get two different elements
      do {
        element2 = filteredElements[Math.floor(Math.random() * filteredElements.length)];
      } while (element1.atomicNumber === element2.atomicNumber);
      
      const higherValue = element1[randomTrend] > element2[randomTrend] ? element1 : element2;
      
      question = `Which element has a higher ${trends[randomTrend].name}: ${element1.name} (${element1.symbol}) or ${element2.name} (${element2.symbol})?`;
      answer = higherValue.name;
    }
    
    setQuizQuestion({
      type: questionType,
      question,
      answer,
      trend: randomTrend
    });
    setQuizAnswer("");
    setQuizFeedback("");
  };

  // Check quiz answer
  const checkQuizAnswer = () => {
    if (!quizQuestion) return;
    
    const normalizedAnswer = quizAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = quizQuestion.answer.toLowerCase();
    
    if (normalizedAnswer === normalizedCorrectAnswer || 
        (quizQuestion.type === "direction" && normalizedAnswer.includes(normalizedCorrectAnswer))) {
      setQuizFeedback("Correct! Well done!");
    } else {
      setQuizFeedback(`Incorrect. The correct answer is: ${quizQuestion.answer}`);
    }
  };

  // Render properties section
  const renderPropertiesSection = () => {
    if (!selectedElement) {
      return (
        <div className="properties-section">
          <h2>No Element Selected</h2>
          <p>Click on an element in the periodic table to view its properties.</p>
        </div>
      );
    }
    
    return (
      <div className="properties-section">
        <h2>{selectedElement.name} ({selectedElement.symbol})</h2>
        <div className="element-details">
          <div className="detail">
            <span className="label">Atomic Number:</span>
            <span className="value">{selectedElement.atomicNumber}</span>
          </div>
          <div className="detail">
            <span className="label">Group:</span>
            <span className="value">
              {selectedElement.group} ({groups[selectedElement.group]?.name || 'Other'})
            </span>
          </div>
          <div className="detail">
            <span className="label">Period:</span>
            <span className="value">{selectedElement.period}</span>
          </div>
          {Object.keys(trends).map(trend => (
            <div className="detail" key={trend}>
              <span className="label">{trends[trend].name}:</span>
              <span className="value">
                {selectedElement[trend] !== null ? 
                  `${selectedElement[trend]} ${trends[trend].unit}` : 
                  'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="periodic-table-lab">
      <header>
        <h1>Periodic Table Trends Laboratory</h1>
        <p className="subtitle">Interactive Digital Simulation • Ethiopian Science Academy</p>
      </header>

      <div className="tabs">
        <button 
          className={activeTab === "trends" ? "active" : ""}
          onClick={() => setActiveTab("trends")}
        >
          Visualize Trends
        </button>
        <button 
          className={activeTab === "properties" ? "active" : ""}
          onClick={() => {
            setActiveTab("properties");
            if (!selectedElement) {
              setSelectedElement(elements[0]); // Default to first element
            }
          }}
        >
          Element Properties
        </button>
        <button 
          className={activeTab === "quiz" ? "active" : ""}
          onClick={() => {
            setActiveTab("quiz");
            generateQuizQuestion();
          }}
        >
          Trend Quiz
        </button>
      </div>

      {activeTab === "trends" && (
        <div className="trends-section">
          <div className="controls">
            <div className="control-group">
              <label>Select Trend:</label>
              <select 
                value={selectedTrend}
                onChange={(e) => {
                  setSelectedTrend(e.target.value);
                  setShowProperties(false);
                }}
              >
                {Object.keys(trends).map(trend => (
                  <option key={trend} value={trend}>
                    {trends[trend].name}
                  </option>
                ))}
              </select>
              <p className="trend-direction">
                <strong>Trend Direction:</strong> {trends[selectedTrend].direction}
              </p>
            </div>

            <div className="control-group">
              <label>Highlight Group:</label>
              <select 
                value={highlightedGroup || ""}
                onChange={(e) => setHighlightedGroup(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">None</option>
                {Object.keys(groups).map(group => (
                  <option key={group} value={group}>
                    Group {group}: {groups[group].name}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label>Highlight Period:</label>
              <select 
                value={highlightedPeriod || ""}
                onChange={(e) => setHighlightedPeriod(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">None</option>
                {[1, 2, 3, 4, 5, 6, 7].map(period => (
                  <option key={period} value={period}>
                    Period {period}
                  </option>
                ))}
              </select>
            </div>

            <button 
              className="toggle-properties"
              onClick={() => setShowProperties(!showProperties)}
            >
              {showProperties ? "Hide Values" : "Show Values"}
            </button>
          </div>

          <div className="periodic-table-container">
            <div className="periodic-table">
              {/* Group labels */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(group => (
                <div 
                  key={`group-${group}`} 
                  className="group-label"
                  style={{ gridColumn: group, gridRow: 1 }}
                >
                  {group}
                </div>
              ))}
              
              {/* Period labels */}
              {[1, 2, 3, 4, 5, 6, 7].map(period => (
                <div 
                  key={`period-${period}`} 
                  className="period-label"
                  style={{ gridColumn: 0, gridRow: period + 1 }}
                >
                  {period}
                </div>
              ))}
              
              {/* Elements */}
              {visualizeTrend()}
            </div>

            {/* Lanthanides and Actinides */}
            <div className="lanthanides-actinides">
              <div className="inner-transition-series">
                <h4>Lanthanides</h4>
                <div className="lanthanides">
                  {elements.filter(e => e.atomicNumber >= 57 && e.atomicNumber <= 71).map(element => {
                    const value = element[selectedTrend];
                    const color = getElementColor(value);
                    
                    return (
                      <div 
                        key={element.atomicNumber}
                        className="element"
                        style={{ backgroundColor: color }}
                        onClick={() => handleElementClick(element)}
                        title={`${element.name} (${element.symbol})`}
                      >
                        <div className="symbol">{element.symbol}</div>
                        <div className="atomic-number">{element.atomicNumber}</div>
                        {showProperties && selectedElement?.atomicNumber === element.atomicNumber && (
                          <div className="property-value">
                            {value !== null ? `${value} ${trends[selectedTrend].unit}` : 'N/A'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="inner-transition-series">
                <h4>Actinides</h4>
                <div className="actinides">
                  {elements.filter(e => e.atomicNumber >= 89 && e.atomicNumber <= 103).map(element => {
                    const value = element[selectedTrend];
                    const color = getElementColor(value);
                    
                    return (
                      <div 
                        key={element.atomicNumber}
                        className="element"
                        style={{ backgroundColor: color }}
                        onClick={() => handleElementClick(element)}
                        title={`${element.name} (${element.symbol})`}
                      >
                        <div className="symbol">{element.symbol}</div>
                        <div className="atomic-number">{element.atomicNumber}</div>
                        {showProperties && selectedElement?.atomicNumber === element.atomicNumber && (
                          <div className="property-value">
                            {value !== null ? `${value} ${trends[selectedTrend].unit}` : 'N/A'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Color scale legend */}
            <div className="color-scale">
              <div className="color-scale-label">Low</div>
              <div className="color-scale-gradient" style={{
                background: "linear-gradient(to right, hsl(0, 100%, 50%), hsl(240, 100%, 50%))"
              }}></div>
              <div className="color-scale-label">High</div>
              <div className="color-scale-values">
                <span>{colorScale.min.toFixed(1)}</span>
                <span>{colorScale.max.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "properties" && renderPropertiesSection()}

      {activeTab === "quiz" && (
        <div className="quiz-section">
          <h2>Periodic Trends Quiz</h2>
          
          {quizQuestion ? (
            <>
              <div className="quiz-question">
                <p>{quizQuestion.question}</p>
                {quizQuestion.type === "comparison" && (
                  <p>Current trend: {trends[quizQuestion.trend].name}</p>
                )}
              </div>
              
              <div className="quiz-answer">
                <input
                  type="text"
                  value={quizAnswer}
                  onChange={(e) => setQuizAnswer(e.target.value)}
                  placeholder="Your answer..."
                  onKeyPress={(e) => e.key === 'Enter' && checkQuizAnswer()}
                />
                <button onClick={checkQuizAnswer}>Submit</button>
              </div>
              
              {quizFeedback && (
                <div className={`quiz-feedback ${quizFeedback.startsWith("Correct") ? "correct" : "incorrect"}`}>
                  {quizFeedback}
                </div>
              )}
            </>
          ) : (
            <p>Click "Generate Question" to start the quiz</p>
          )}
          
          <button className="new-question" onClick={generateQuizQuestion}>
            Generate New Question
          </button>
        </div>
      )}

      <style jsx>{`
        .periodic-table-lab {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        h1 {
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .subtitle {
          color: #7f8c8d;
          font-style: italic;
          margin-top: 0;
        }
        
        .tabs {
          display: flex;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        
        .tabs button {
          padding: 10px 20px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s;
          color: #555;
        }
        
        .tabs button:hover {
          color: #3498db;
        }
        
        .tabs button.active {
          border-bottom: 3px solid #3498db;
          color: #3498db;
          font-weight: bold;
        }
        
        .trends-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .control-group label {
          font-weight: bold;
          font-size: 14px;
        }
        
        .control-group select {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        
        .trend-direction {
          margin: 5px 0 0;
          font-size: 14px;
          color: #555;
        }
        
        .periodic-table-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .periodic-table {
          display: grid;
          grid-template-columns: 30px repeat(18, 1fr);
          grid-template-rows: 30px repeat(7, 60px);
          gap: 5px;
          position: relative;
        }
        
        .element {
          border: 1px solid #ddd;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          color: white;
          text-shadow: 0 0 2px rgba(0,0,0,0.5);
          font-size: 0.8rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .element:hover {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          z-index: 1;
        }
        
        .highlight-group {
          box-shadow: 0 0 0 2px ${groups[highlightedGroup]?.color || '#3498db'};
          z-index: 1;
        }
        
        .highlight-period {
          box-shadow: 0 0 0 2px #e74c3c;
          z-index: 1;
        }
        
        .symbol {
          font-weight: bold;
          font-size: 1rem;
        }
        
        .atomic-number {
          font-size: 0.6rem;
          position: absolute;
          top: 2px;
          right: 2px;
        }
        
        .property-value {
          font-size: 0.5rem;
          margin-top: 2px;
          background: rgba(0,0,0,0.7);
          padding: 1px 3px;
          border-radius: 3px;
        }
        
        .group-label, .period-label {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          cursor: default;
          background: #f0f0f0;
          border-radius: 4px;
        }
        
        .lanthanides-actinides {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        
        .inner-transition-series {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .inner-transition-series h4 {
          margin: 0;
          padding: 5px;
          background: #f0f0f0;
          border-radius: 4px;
        }
        
        .lanthanides, .actinides {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }
        
        .lanthanides .element, .actinides .element {
          width: 50px;
          height: 50px;
        }
        
        .color-scale {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 4px;
          max-width: 400px;
        }
        
        .color-scale-gradient {
          height: 20px;
          flex-grow: 1;
          border-radius: 4px;
        }
        
        .color-scale-label {
          font-size: 0.9rem;
          font-weight: bold;
        }
        
        .color-scale-values {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 5px;
          font-size: 0.8rem;
        }
        
        .quiz-section {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .quiz-question {
          background: white;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .quiz-question p {
          margin: 0 0 10px;
        }
        
        .quiz-answer {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }
        
        .quiz-answer input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .quiz-answer button {
          padding: 8px 15px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .quiz-feedback {
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }
        
        .quiz-feedback.correct {
          background: #d4edda;
          color: #155724;
        }
        
        .quiz-feedback.incorrect {
          background: #f8d7da;
          color: #721c24;
        }
        
        .new-question {
          background: #2ecc71;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .new-question:hover {
          background: #27ae60;
        }
        
        .properties-section {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .element-details {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }
        
        .detail {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          background: white;
          border-radius: 4px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .detail .label {
          font-weight: bold;
        }
        
        .toggle-properties {
          background: #3498db;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          align-self: flex-end;
          transition: background 0.3s;
        }
        
        .toggle-properties:hover {
          background: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default PeriodicTableTrends;