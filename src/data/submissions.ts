import { Submission } from '../types/contest';

export const initialSubmissionsData: Submission[] = [
  // Aarav Sharma (usr_01) - 6 solved (Perfect run!)
  { id: "sub_101", participantId: "usr_01", problemId: "P1", status: "AC", timestampMinutes: 14, language: "C++20", executionTimeMs: 42, memoryKb: 1420 },
  { id: "sub_102", participantId: "usr_01", problemId: "P2", status: "AC", timestampMinutes: 38, language: "C++20", executionTimeMs: 88, memoryKb: 2100 },
  { id: "sub_103", participantId: "usr_01", problemId: "P3", status: "WA", timestampMinutes: 72, language: "C++20", executionTimeMs: 120, memoryKb: 4300 },
  { id: "sub_104", participantId: "usr_01", problemId: "P3", status: "AC", timestampMinutes: 91, language: "C++20", executionTimeMs: 95, memoryKb: 4200 },
  { id: "sub_105", participantId: "usr_01", problemId: "P4", status: "AC", timestampMinutes: 140, language: "Java 17", executionTimeMs: 310, memoryKb: 18400 },
  { id: "sub_106", participantId: "usr_01", problemId: "P5", status: "TLE", timestampMinutes: 195, language: "C++20", executionTimeMs: 2010, memoryKb: 32000 },
  { id: "sub_107", participantId: "usr_01", problemId: "P5", status: "AC", timestampMinutes: 215, language: "C++20", executionTimeMs: 450, memoryKb: 28400 },
  { id: "sub_108", participantId: "usr_01", problemId: "P6", status: "AC", timestampMinutes: 284, language: "C++20", executionTimeMs: 620, memoryKb: 41000 },

  // Sophia Zhang (usr_02) - 5 solved
  { id: "sub_201", participantId: "usr_02", problemId: "P1", status: "AC", timestampMinutes: 18, language: "Python 3.11", executionTimeMs: 110, memoryKb: 8900 },
  { id: "sub_202", participantId: "usr_02", problemId: "P2", status: "AC", timestampMinutes: 44, language: "Python 3.11", executionTimeMs: 145, memoryKb: 11200 },
  { id: "sub_203", participantId: "usr_02", problemId: "P3", status: "AC", timestampMinutes: 98, language: "C++20", executionTimeMs: 104, memoryKb: 4100 },
  { id: "sub_204", participantId: "usr_02", problemId: "P4", status: "AC", timestampMinutes: 135, language: "C++20", executionTimeMs: 180, memoryKb: 9800 },
  { id: "sub_205", participantId: "usr_02", problemId: "P5", status: "WA", timestampMinutes: 210, language: "C++20", executionTimeMs: 390, memoryKb: 26000 },
  { id: "sub_206", participantId: "usr_02", problemId: "P5", status: "AC", timestampMinutes: 232, language: "C++20", executionTimeMs: 340, memoryKb: 25800 },
  { id: "sub_207", participantId: "usr_02", problemId: "P6", status: "WA", timestampMinutes: 288, language: "C++20", executionTimeMs: 710, memoryKb: 44000 },

  // Devansh Patel (usr_03 - current user) - 5 solved
  { id: "sub_301", participantId: "usr_03", problemId: "P1", status: "AC", timestampMinutes: 22, language: "Java 17", executionTimeMs: 190, memoryKb: 14500 },
  { id: "sub_302", participantId: "usr_03", problemId: "P2", status: "WA", timestampMinutes: 40, language: "Java 17", executionTimeMs: 220, memoryKb: 16000 },
  { id: "sub_303", participantId: "usr_03", problemId: "P2", status: "AC", timestampMinutes: 52, language: "Java 17", executionTimeMs: 198, memoryKb: 15400 },
  { id: "sub_304", participantId: "usr_03", problemId: "P3", status: "AC", timestampMinutes: 104, language: "Java 17", executionTimeMs: 280, memoryKb: 18200 },
  { id: "sub_305", participantId: "usr_03", problemId: "P4", status: "AC", timestampMinutes: 160, language: "Java 17", executionTimeMs: 340, memoryKb: 21000 },
  { id: "sub_306", participantId: "usr_03", problemId: "P5", status: "AC", timestampMinutes: 245, language: "Java 17", executionTimeMs: 480, memoryKb: 34000 },

  // Elena Rostova (usr_04) - 4 solved
  { id: "sub_401", participantId: "usr_04", problemId: "P1", status: "AC", timestampMinutes: 19, language: "C++20", executionTimeMs: 38, memoryKb: 1380 },
  { id: "sub_402", participantId: "usr_04", problemId: "P2", status: "AC", timestampMinutes: 47, language: "C++20", executionTimeMs: 76, memoryKb: 1950 },
  { id: "sub_403", participantId: "usr_04", problemId: "P3", status: "AC", timestampMinutes: 115, language: "C++20", executionTimeMs: 112, memoryKb: 4600 },
  { id: "sub_404", participantId: "usr_04", problemId: "P4", status: "AC", timestampMinutes: 178, language: "C++20", executionTimeMs: 165, memoryKb: 8900 },
  { id: "sub_405", participantId: "usr_04", problemId: "P5", status: "TLE", timestampMinutes: 260, language: "C++20", executionTimeMs: 2005, memoryKb: 31000 },

  // Rohan Verma (usr_05) - 4 solved
  { id: "sub_501", participantId: "usr_05", problemId: "P1", status: "AC", timestampMinutes: 25, language: "C++20", executionTimeMs: 45, memoryKb: 1400 },
  { id: "sub_502", participantId: "usr_05", problemId: "P2", status: "WA", timestampMinutes: 55, language: "C++20", executionTimeMs: 82, memoryKb: 2200 },
  { id: "sub_503", participantId: "usr_05", problemId: "P2", status: "AC", timestampMinutes: 68, language: "C++20", executionTimeMs: 79, memoryKb: 2150 },
  { id: "sub_504", participantId: "usr_05", problemId: "P3", status: "AC", timestampMinutes: 125, language: "C++20", executionTimeMs: 108, memoryKb: 4300 },
  { id: "sub_505", participantId: "usr_05", problemId: "P4", status: "AC", timestampMinutes: 190, language: "C++20", executionTimeMs: 170, memoryKb: 9200 },

  // Mei Ling (usr_06) - 4 solved
  { id: "sub_601", participantId: "usr_06", problemId: "P1", status: "AC", timestampMinutes: 28, language: "Python 3.11", executionTimeMs: 115, memoryKb: 8800 },
  { id: "sub_602", participantId: "usr_06", problemId: "P2", status: "AC", timestampMinutes: 62, language: "Python 3.11", executionTimeMs: 130, memoryKb: 10500 },
  { id: "sub_603", participantId: "usr_06", problemId: "P3", status: "AC", timestampMinutes: 130, language: "C++20", executionTimeMs: 98, memoryKb: 4100 },
  { id: "sub_604", participantId: "usr_06", problemId: "P4", status: "WA", timestampMinutes: 185, language: "C++20", executionTimeMs: 190, memoryKb: 9400 },
  { id: "sub_605", participantId: "usr_06", problemId: "P4", status: "AC", timestampMinutes: 202, language: "C++20", executionTimeMs: 160, memoryKb: 9100 },

  // Lucas Vance (usr_07) - 3 solved
  { id: "sub_701", participantId: "usr_07", problemId: "P1", status: "AC", timestampMinutes: 32, language: "C++20", executionTimeMs: 50, memoryKb: 1450 },
  { id: "sub_702", participantId: "usr_07", problemId: "P2", status: "AC", timestampMinutes: 70, language: "C++20", executionTimeMs: 85, memoryKb: 2050 },
  { id: "sub_703", participantId: "usr_07", problemId: "P3", status: "AC", timestampMinutes: 145, language: "C++20", executionTimeMs: 115, memoryKb: 4500 },
  { id: "sub_704", participantId: "usr_07", problemId: "P4", status: "RTE", timestampMinutes: 220, language: "C++20", executionTimeMs: 75, memoryKb: 3800 },

  // Priya Sundaram (usr_08) - 3 solved
  { id: "sub_801", participantId: "usr_08", problemId: "P1", status: "AC", timestampMinutes: 30, language: "Java 17", executionTimeMs: 205, memoryKb: 15200 },
  { id: "sub_802", participantId: "usr_08", problemId: "P2", status: "AC", timestampMinutes: 75, language: "Java 17", executionTimeMs: 215, memoryKb: 16100 },
  { id: "sub_803", participantId: "usr_08", problemId: "P3", status: "AC", timestampMinutes: 155, language: "Java 17", executionTimeMs: 290, memoryKb: 19400 },
  { id: "sub_804", participantId: "usr_08", problemId: "P4", status: "WA", timestampMinutes: 230, language: "Java 17", executionTimeMs: 310, memoryKb: 20200 },

  // Kavya Menon (usr_09) - 3 solved
  { id: "sub_901", participantId: "usr_09", problemId: "P1", status: "AC", timestampMinutes: 35, language: "C++20", executionTimeMs: 48, memoryKb: 1410 },
  { id: "sub_902", participantId: "usr_09", problemId: "P2", status: "WA", timestampMinutes: 70, language: "C++20", executionTimeMs: 80, memoryKb: 2100 },
  { id: "sub_903", participantId: "usr_09", problemId: "P2", status: "AC", timestampMinutes: 82, language: "C++20", executionTimeMs: 76, memoryKb: 2080 },
  { id: "sub_904", participantId: "usr_09", problemId: "P3", status: "AC", timestampMinutes: 168, language: "C++20", executionTimeMs: 122, memoryKb: 4400 },

  // Mateo Silva (usr_10) - 3 solved
  { id: "sub_1001", participantId: "usr_10", problemId: "P1", status: "AC", timestampMinutes: 36, language: "Python 3.11", executionTimeMs: 120, memoryKb: 9100 },
  { id: "sub_1002", participantId: "usr_10", problemId: "P2", status: "AC", timestampMinutes: 89, language: "Python 3.11", executionTimeMs: 140, memoryKb: 11400 },
  { id: "sub_1003", participantId: "usr_10", problemId: "P4", status: "AC", timestampMinutes: 198, language: "Python 3.11", executionTimeMs: 290, memoryKb: 14200 },

  // Arjun Nambiar (usr_11) - 2 solved
  { id: "sub_1101", participantId: "usr_11", problemId: "P1", status: "AC", timestampMinutes: 40, language: "C++20", executionTimeMs: 46, memoryKb: 1400 },
  { id: "sub_1102", participantId: "usr_11", problemId: "P2", status: "AC", timestampMinutes: 94, language: "C++20", executionTimeMs: 81, memoryKb: 2120 },
  { id: "sub_1103", participantId: "usr_11", problemId: "P3", status: "WA", timestampMinutes: 180, language: "C++20", executionTimeMs: 118, memoryKb: 4350 },

  // Chloe Dupont (usr_12) - 2 solved
  { id: "sub_1201", participantId: "usr_12", problemId: "P1", status: "AC", timestampMinutes: 45, language: "Java 17", executionTimeMs: 210, memoryKb: 15100 },
  { id: "sub_1202", participantId: "usr_12", problemId: "P2", status: "WA", timestampMinutes: 88, language: "Java 17", executionTimeMs: 240, memoryKb: 16500 },
  { id: "sub_1203", participantId: "usr_12", problemId: "P2", status: "AC", timestampMinutes: 105, language: "Java 17", executionTimeMs: 218, memoryKb: 15800 },

  // Vikram Rathore (usr_13) - 2 solved
  { id: "sub_1301", participantId: "usr_13", problemId: "P1", status: "AC", timestampMinutes: 48, language: "C++20", executionTimeMs: 52, memoryKb: 1470 },
  { id: "sub_1302", participantId: "usr_13", problemId: "P2", status: "AC", timestampMinutes: 112, language: "C++20", executionTimeMs: 84, memoryKb: 2150 },

  // Fatima Al-Sayed (usr_14) - 2 solved
  { id: "sub_1401", participantId: "usr_14", problemId: "P1", status: "WA", timestampMinutes: 30, language: "Python 3.11", executionTimeMs: 125, memoryKb: 9050 },
  { id: "sub_1402", participantId: "usr_14", problemId: "P1", status: "AC", timestampMinutes: 52, language: "Python 3.11", executionTimeMs: 118, memoryKb: 8900 },
  { id: "sub_1403", participantId: "usr_14", problemId: "P2", status: "AC", timestampMinutes: 120, language: "Python 3.11", executionTimeMs: 135, memoryKb: 10800 },

  // Noah Campbell (usr_15) - 2 solved
  { id: "sub_1501", participantId: "usr_15", problemId: "P1", status: "AC", timestampMinutes: 55, language: "C++20", executionTimeMs: 44, memoryKb: 1410 },
  { id: "sub_1502", participantId: "usr_15", problemId: "P2", status: "AC", timestampMinutes: 132, language: "C++20", executionTimeMs: 86, memoryKb: 2140 },

  // Aditi Rao (usr_16) - 1 solved
  { id: "sub_1601", participantId: "usr_16", problemId: "P1", status: "AC", timestampMinutes: 42, language: "Java 17", executionTimeMs: 195, memoryKb: 14900 },
  { id: "sub_1602", participantId: "usr_16", problemId: "P2", status: "WA", timestampMinutes: 110, language: "Java 17", executionTimeMs: 230, memoryKb: 16200 },
  { id: "sub_1603", participantId: "usr_16", problemId: "P2", status: "TLE", timestampMinutes: 170, language: "Java 17", executionTimeMs: 1850, memoryKb: 17000 },

  // Kenji Sato (usr_17) - 1 solved
  { id: "sub_1701", participantId: "usr_17", problemId: "P1", status: "AC", timestampMinutes: 50, language: "C++20", executionTimeMs: 49, memoryKb: 1430 },
  { id: "sub_1702", participantId: "usr_17", problemId: "P3", status: "WA", timestampMinutes: 140, language: "C++20", executionTimeMs: 125, memoryKb: 4450 },

  // Zaid Khan (usr_18) - 1 solved
  { id: "sub_1801", participantId: "usr_18", problemId: "P1", status: "WA", timestampMinutes: 35, language: "C++20", executionTimeMs: 50, memoryKb: 1450 },
  { id: "sub_1802", participantId: "usr_18", problemId: "P1", status: "AC", timestampMinutes: 60, language: "C++20", executionTimeMs: 43, memoryKb: 1390 },

  // Tara Deshmukh (usr_19) - 1 solved
  { id: "sub_1901", participantId: "usr_19", problemId: "P1", status: "AC", timestampMinutes: 65, language: "Python 3.11", executionTimeMs: 122, memoryKb: 9020 },

  // Liam O'Connor (usr_20) - 0 solved, 2 attempts
  { id: "sub_2001", participantId: "usr_20", problemId: "P1", status: "WA", timestampMinutes: 45, language: "C++20", executionTimeMs: 55, memoryKb: 1460 },
  { id: "sub_2002", participantId: "usr_20", problemId: "P1", status: "TLE", timestampMinutes: 95, language: "C++20", executionTimeMs: 1100, memoryKb: 2200 }
];
