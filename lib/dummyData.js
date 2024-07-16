// Dummy Data
const diamondShapes = [
  { name: "All Shape", icon: "💎" },
  { name: "RBC", icon: "♦" },
  { name: "PEAR", icon: "🍐" },
  { name: "OVAL", icon: "⬭" },
  { name: "MQ", icon: "🢥" },
  { name: "PR", icon: "🞁" },
  { name: "HRT", icon: "❤" },
  { name: "EME", icon: "⬬" },
  { name: "SEM", icon: "⬪" },
  { name: "RAD", icon: "☢" },
  { name: "EC", icon: "🍽️" },
  { name: "CU", icon: "🥛" },
  { name: "TR", icon: "▲" },
  { name: "BGT", icon: "▯" },
  { name: "OMC", icon: "⬭" },
  { name: "PMC", icon: "💧" },
  { name: "MMC", icon: "⬫" },
];

// Filter Options
const caratOptions = [
  { value: "0.30-0.49", label: "0.30-0.49" },
  { value: "0.50-0.69", label: "0.50-0.69" },
  { value: "0.70-0.89", label: "0.70-0.89" },
  { value: "0.90-0.99", label: "0.90-0.99" },
  { value: "1.00-1.19", label: "1.00-1.19" },
  { value: "1.20-1.49", label: "1.20-1.49" },
  { value: "1.50-1.99", label: "1.50-1.99" },
  { value: "2.00-2.99", label: "2.00-2.99" },
];

const fluorOptions = [
  { value: "ALL", label: "ALL" },
  { value: "NON", label: "NON" },
  { value: "VSL", label: "VSL" },
  { value: "SL", label: "SL" },
  { value: "FNT", label: "FNT" },
  { value: "MED", label: "MED" },
  { value: "STG", label: "STG" },
  { value: "VST", label: "VST" },
];

const cutOptions = [
  { value: "ALL", label: "ALL" },
  { value: "EX", label: "EX" },
  { value: "VG", label: "VG" },
  { value: "G", label: "G" },
  { value: "F", label: "F" },
];

const polishOptions = [
  { value: "ALL", label: "ALL" },
  { value: "EX", label: "EX" },
  { value: "VG", label: "VG" },
  { value: "G", label: "G" },
  { value: "F", label: "F" },
];

const colorOptions = [
  { value: "ALL", label: "ALL" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
  { value: "G", label: "G" },
  { value: "H", label: "H" },
  { value: "I", label: "I" },
  { value: "J", label: "J" },
  { value: "K", label: "K" },
];

const clarityOptions = [
  { value: "ALL", label: "ALL" },
  { value: "FL", label: "FL" },
  { value: "IF", label: "IF" },
  { value: "WS1", label: "WS1" },
  { value: "WS2", label: "WS2" },
  { value: "VS1", label: "VS1" },
  { value: "VS2", label: "VS2" },
  { value: "SI1", label: "SI1" },
  { value: "SI2", label: "SI2" },
];

const labOptions = [
  { value: "ALL", label: "ALL" },
  { value: "GIA", label: "GIA" },
  { value: "IGI", label: "IGI" },
  { value: "HRD", label: "HRD" },
  { value: "NON", label: "NON" },
];

const symmOptions = [
  { value: "ALL", label: "ALL" },
  { value: "EX", label: "EX" },
  { value: "VG", label: "VG" },
  { value: "G", label: "G" },
  { value: "F", label: "F" },
];

const locationOptions = [
  { value: "ALL", label: "ALL" },
  { value: "MUM", label: "MUM" },
  { value: "HK", label: "HK" },
  { value: "NY", label: "NY" },
];

export {
  diamondShapes,
  caratOptions,
  fluorOptions,
  cutOptions,
  polishOptions,
  colorOptions,
  clarityOptions,
  labOptions,
  symmOptions,
  locationOptions,
};
