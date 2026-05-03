// Unit metadata and data registry
// Data is extracted from the original JSX files as pure JS objects

export const UNITS = [
  {
    id: 1,
    title: "OS Fundamentals, Processes & Scheduling",
    shortTitle: "Fundamentals",
    emoji: "🖥️",
    gradient: "linear-gradient(135deg, #1a1f35 0%, #0d1117 100%)",
    accentColor: "#58a6ff",
    description: "OS overview, computer organization, system architecture, process lifecycle, CPU scheduling, and shell basics",
  },
  {
    id: 2,
    title: "IPC, Threads, Synchronization & Deadlocks",
    shortTitle: "Concurrency",
    emoji: "🧵",
    gradient: "linear-gradient(135deg, #1a2f1a 0%, #0d1117 100%)",
    accentColor: "#3fb950",
    description: "Inter-process communication, threading models, synchronization primitives, classic problems, and deadlock handling",
  },
  {
    id: 3,
    title: "Memory Management & Virtual Memory",
    shortTitle: "Memory",
    emoji: "💾",
    gradient: "linear-gradient(135deg, #2a1a1a 0%, #0d1117 100%)",
    accentColor: "#f85149",
    description: "Address binding, paging, segmentation, TLB, demand paging, page replacement, and thrashing",
  },
  {
    id: 4,
    title: "File Systems, Disk, RAID & Security",
    shortTitle: "Storage & Security",
    emoji: "🔒",
    gradient: "linear-gradient(135deg, #1a1a2f 0%, #0d1117 100%)",
    accentColor: "#bc8cff",
    description: "File concepts, directory structures, disk allocation, scheduling, RAID levels, protection, and security",
  },
];
