import { Problem } from '../types/contest';

export const problemsData: Problem[] = [
  {
    id: "P1",
    code: "ACM-101",
    title: "Array Balancing Equilibrium",
    difficulty: "Easy",
    points: 100,
    timeLimit: "1.0s",
    memoryLimit: "256 MB",
    description: "Given an array of N integers, find the minimal prefix/suffix balance index such that the sum of elements to the left equals the sum of elements to the right after at most one scalar operation.",
    tags: ["Prefix Sums", "Arrays", "Two Pointers"],
    inputSpec: "First line contains integer T (test cases). Each test case has integer N followed by N space-separated integers.",
    outputSpec: "Output the zero-indexed equilibrium position or -1 if no such balance can be achieved."
  },
  {
    id: "P2",
    code: "ACM-102",
    title: "Binary Tree Reconstruction",
    difficulty: "Easy",
    points: 100,
    timeLimit: "1.0s",
    memoryLimit: "256 MB",
    description: "Reconstruct a binary tree given its in-order and post-order traversal arrays, then compute the level-order zigzag traversal sum modulo 1,000,000,007.",
    tags: ["Trees", "Recursion", "Divide & Conquer"],
    inputSpec: "First line contains N (node count). Second line contains in-order traversal. Third line contains post-order traversal.",
    outputSpec: "Print the zigzag traversal hash integer."
  },
  {
    id: "P3",
    code: "ACM-201",
    title: "Metro Network Bottleneck Optimization",
    difficulty: "Medium",
    points: 150,
    timeLimit: "1.5s",
    memoryLimit: "256 MB",
    description: "You are given a connected weighted undirected graph representing an intercity rail grid. Calculate the minimum spanning bottleneck capacity required to guarantee all nodes remain connected with at least two edge-disjoint paths.",
    tags: ["Graphs", "MST", "Bridges & Articulation", "Binary Search"],
    inputSpec: "Integers N and M denoting stations and tracks, followed by M lines containing (u, v, weight).",
    outputSpec: "Single integer denoting the minimum bottleneck weight."
  },
  {
    id: "P4",
    code: "ACM-202",
    title: "Lexicographical Matrix Paths",
    difficulty: "Medium",
    points: 150,
    timeLimit: "1.5s",
    memoryLimit: "256 MB",
    description: "Navigate an N x M grid where each cell contains a lowercase Latin character. Find the lexicographically smallest path string from top-left (0, 0) to bottom-right (N-1, M-1) avoiding dynamically generated obstacle cells.",
    tags: ["Dynamic Programming", "Strings", "BFS"],
    inputSpec: "First line has N and M. Following N lines contain M characters each.",
    outputSpec: "Print the lexicographically smallest concatenated path string."
  },
  {
    id: "P5",
    code: "ACM-301",
    title: "Hyper-Dimensional Knapsack",
    difficulty: "Hard",
    points: 200,
    timeLimit: "2.0s",
    memoryLimit: "512 MB",
    description: "Solve a multi-capacity generalized knapsack problem with K simultaneous resource constraints (weight, volume, thermal flux) and dependencies modeled as a directed acyclic tree.",
    tags: ["Multi-dimensional DP", "Bitmask", "Branch & Bound"],
    inputSpec: "N items, K dimensions, followed by item values and constraint vectors.",
    outputSpec: "Maximum achievable aggregate value without violating any resource bound."
  },
  {
    id: "P6",
    code: "ACM-302",
    title: "Quantum Bit Flip Queries",
    difficulty: "Hard",
    points: 250,
    timeLimit: "2.0s",
    memoryLimit: "512 MB",
    description: "Given a 0/1 array of length 200,000, process Q online queries of three types: range bitwise inversion, prefix palindromic state query, and historical state rollback using persistent segment trees.",
    tags: ["Persistent Segment Tree", "Range Queries", "Hashing"],
    inputSpec: "First line N and Q. Second line initial bitstring. Next Q lines contain query specifications.",
    outputSpec: "For each state inspection query, print the corresponding verification code."
  }
];
