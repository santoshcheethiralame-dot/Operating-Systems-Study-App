// Auto-extracted from unit3.jsx
export const groups = [
  { name: "🏗️ Foundations", ids: ["memory-basics","uniprogramming","base-limit","address-binding","logical-physical","mmu-relocation","dynamic-loading","swapping"] },
  { name: "📦 Allocation & Fragmentation", ids: ["contiguous-allocation","fragmentation","segmentation"] },
  { name: "📄 Paging", ids: ["paging-concept","tlb-eat","valid-invalid","shared-pages"] },
  { name: "🌳 Advanced Page Tables", ids: ["hierarchical","hashed-inverted"] },
  { name: "💫 Virtual Memory", ids: ["virtual-memory","demand-paging","page-fault-steps","demand-eat","copy-on-write"] },
  { name: "🔄 Page Replacement", ids: ["fifo","opt","lru","clock"] },
  { name: "⚖️ Frames & Thrashing", ids: ["frame-allocation","global-local","thrashing","pff-workingset"] },
];

export const topics = {
  "memory-basics": {
    title: "Memory Basics", emoji: "🧠",
    tldr: "Memory = large byte array. CPU only accesses registers + RAM. Cache is hardware-managed — OS has zero control.",
    explanation: `Memory is a large array of bytes, each with its own unique address. When you run a program, it must first be loaded from disk into main memory and placed in the ready queue before the CPU can execute it.

The CPU can ONLY directly access two storage types: Registers (ultra-fast, 1 CPU clock cycle) and Main Memory (slower, can cause stalls). Cache sits between CPU and RAM, managed entirely by hardware — the OS has zero involvement in cache management.

The memory unit is fundamentally "dumb" — it sees a stream of addresses and serves data, but has no idea how those addresses were generated (whether by your C code, the compiler, or an OS kernel).`,
    keyPoints: [
      "CPU directly accesses ONLY: Registers + Main Memory (not cache, not disk)",
      "Register access = 1 CPU clock. RAM access = many cycles → causes stalls",
      "Cache: hardware-managed, sits between CPU and RAM — zero OS control",
      "Program must be loaded into RAM (placed in ready queue) before CPU runs it",
      "Memory unit sees stream of addresses but does NOT know how they were generated",
      "Instruction cycle: Fetch → Decode → Fetch Operands → Execute → Store Result",
    ],
    formula: null,
    examTips: [
      "CPU directly accesses REGISTERS and MAIN MEMORY only — not cache, not disk",
      "Cache is hardware-managed (OS has no control over it)",
      "Memory unit is passive — it receives addresses and serves data, nothing more",
    ],
    questions: [
      { q: "What storage can the CPU access directly?", a: "Registers and Main Memory only. Cache and disk are NOT directly accessible." },
      { q: "What causes a 'stall' in CPU execution?", a: "Main memory taking many clock cycles to respond to a request." },
      { q: "Who manages the cache?", a: "Hardware only. The OS has zero control over cache." },
    ],
  },
  "uniprogramming": {
    title: "Uniprogramming", emoji: "1️⃣",
    tldr: "One app at a time, same physical location always, can access any address. Protection must be in hardware.",
    explanation: `Uniprogramming means only ONE process runs at a time. The application always gets loaded at the same fixed physical memory address. Since there's only one process, it can access any physical address freely — no inter-process protection needed.

The application literally IS the dedicated machine — not an illusion. However, we still need to protect the OS from the user process.

On multi-user systems, processes must be protected from each other. This protection MUST be done in hardware — the OS cannot intercept and check every single memory access (far too slow).`,
    keyPoints: [
      "Only ONE application runs at a time",
      "App always runs at same fixed physical memory location",
      "App can access ANY physical address (no inter-process protection needed)",
      "OS still needs protection from user processes",
      "On multi-user systems: processes must be isolated from each other",
      "Protection MUST be in hardware — OS does not check every memory access",
    ],
    formula: null,
    examTips: [
      "Memory protection MUST be in HARDWARE — OS doesn't intercept every access",
      "In uniprogramming, app can access ANY physical address",
      "No address translation or protection between processes (only one exists)",
    ],
    questions: [
      { q: "Why must memory protection be in hardware?", a: "The OS doesn't intervene on every memory access — it would be too slow. Hardware checks are automatic on every access." },
      { q: "In uniprogramming, can one process access another process's memory?", a: "N/A — there's only one process. But it can access any physical address including OS space, hence OS protection is still needed." },
    ],
  },
  "base-limit": {
    title: "Base & Limit Registers", emoji: "🔐",
    tldr: "Base = start address. Limit = size. Hardware checks: base ≤ addr < base+limit on EVERY access.",
    explanation: `Two hardware registers protect memory: the Base register holds the starting physical address of a process, and the Limit register holds the SIZE of the process's memory region (not the end address).

On every memory access in user mode, the hardware checks: is the address ≥ base? AND is it < (base + limit)? If either check fails → trap to OS (addressing error). This protects both the OS and other user processes.

Critically, base and limit registers can ONLY be loaded by the OS using special privileged instructions (kernel mode). User programs cannot touch these registers — that's the whole protection mechanism.`,
    keyPoints: [
      "Base register: starting PHYSICAL address of process",
      "Limit register: SIZE of process memory region (not end address!)",
      "Check: base ≤ address AND address < (base + limit) → else: TRAP",
      "Both registers loaded ONLY by OS via privileged instructions (kernel mode)",
      "User processes CANNOT modify these registers",
      "Hardware checks happen on EVERY memory access in user mode",
      "Base register also called 'relocation register' when used for translation",
    ],
    formula: {
      code: `Hardware check (every access):
  if (address >= base) AND (address < base + limit):
      → ACCESS GRANTED → use address
  else:
      → TRAP to OS (addressing error)

Address Translation (Base & Bound):
  Physical = Logical + Base

Example:
  base = 300,040 | limit = 120,900
  Valid range: 300,040 → 420,939
  If process tries to access 500,000 → TRAP!`,
      explanation: "Limit = SIZE (not end address). End address = base + limit - 1.",
    },
    examTips: [
      "Limit = SIZE of region, NOT the end address. End = base + limit",
      "Registers loaded ONLY by OS (kernel mode, privileged instruction)",
      "Hardware does the check on EVERY memory access — not software",
      "Example: base=300040, limit=120900 → valid range 300040 to 420939",
    ],
    questions: [
      { q: "A process has base=5000, limit=3000. Is address 7999 valid?", a: "Yes. 7999 ≥ 5000 ✓ AND 7999 < 5000+3000=8000 ✓. Valid." },
      { q: "A process has base=5000, limit=3000. Is address 8000 valid?", a: "No. 8000 is NOT < 8000 (equal, not less than). → TRAP." },
      { q: "Can a user program change its own base register?", a: "No. Only OS can change base/limit registers (privileged instruction, kernel mode only)." },
    ],
  },
  "address-binding": {
    title: "Address Binding", emoji: "🔗",
    tldr: "Symbolic → Relocatable → Absolute. Three binding times: Compile, Load, Execution.",
    explanation: `Address binding is the process of mapping from symbolic names (like variable 'count') to actual memory addresses. This happens in three stages.

Compile time: If you know exactly where the process will be in memory, generate absolute addresses directly. If the location ever changes, you must recompile everything. (Example: MS-DOS .COM files — fixed at address 0x100.)

Load time: Compiler generates relocatable code ("14 bytes from module start"). Final addresses resolved when the program is loaded into memory. If location changes, just reload.

Execution time: Binding is delayed until runtime. The process can move during execution. Requires special hardware (MMU). Used in ALL modern operating systems.`,
    keyPoints: [
      "Symbolic → Relocatable (compiler) → Absolute (loader/runtime)",
      "Compile time: absolute code generated; must recompile if location changes (MS-DOS .COM)",
      "Load time: relocatable code; rebind if location changes; just reload",
      "Execution time: binding at runtime; process can move; needs MMU hardware",
      "Modern OS = execution-time binding",
      "Linkage editor: combines object modules, resolves inter-module references",
      "Loader: places load module into memory and handles final binding",
    ],
    formula: {
      code: `Source code → [Compiler/Assembler] → Object Module
Object Modules + Libraries → [Linkage Editor] → Load Module
Load Module → [Loader] → In-Memory Binary Image

Compile time:  symbolic → ABSOLUTE (knows location ahead of time)
Load time:     symbolic → relocatable → ABSOLUTE (resolved at load)
Execution time: symbolic → relocatable → ABSOLUTE at runtime (MMU)

MS-DOS .COM files: compile-time binding (always loaded at 0x100)`,
      explanation: "Pipeline from source to running process. Modern systems use execution-time binding.",
    },
    examTips: [
      "Execution-time binding = ALL modern systems. Requires MMU hardware.",
      "Compile-time: MS-DOS .COM format (historical, not used today)",
      "Load-time: must reload (not recompile) if location changes",
      "Linker resolves BETWEEN-module references; Loader places in memory",
    ],
    questions: [
      { q: "What is the difference between a linker and a loader?", a: "Linker: combines object modules and resolves inter-module references → creates load module. Loader: places load module into physical memory." },
      { q: "Which binding time requires special hardware support?", a: "Execution-time binding. Requires the MMU (Memory Management Unit)." },
      { q: "Why does MS-DOS .COM format use compile-time binding?", a: "Because the program always loads at the same fixed address (0x100), so absolute addresses can be baked in at compile time." },
    ],
  },
  "logical-physical": {
    title: "Logical vs Physical Address", emoji: "🗺️",
    tldr: "Logical = CPU-generated (virtual). Physical = what RAM sees. MMU translates between them at runtime.",
    explanation: `A logical address (also called virtual address) is what the CPU generates when executing a program. A physical address is what the actual memory hardware (RAM chips) sees and uses.

At compile time and load time, logical addresses equal physical addresses — there's no translation. But at execution time (modern systems), they differ: the MMU (Memory Management Unit) translates every logical address to a physical address automatically.

The user program only ever sees and works with logical addresses. It has no idea what physical address its data actually lives at — this is a fundamental abstraction.`,
    keyPoints: [
      "Logical address = Virtual address = generated by CPU",
      "Physical address = seen by memory hardware (RAM)",
      "Compile-time / Load-time: logical = physical (no translation)",
      "Execution-time: logical ≠ physical → MMU translates",
      "Logical address space: all logical addresses a program generates",
      "Physical address space: corresponding physical addresses",
      "MMU (Memory Management Unit): hardware device that translates",
      "User program NEVER sees real physical addresses",
    ],
    formula: {
      code: `CPU → [logical address] → MMU → [physical address] → RAM

With Relocation Register (simplest form):
  Physical = Logical + Relocation_Register

Example:
  Relocation Register = 14,000
  CPU generates logical address = 346
  MMU produces physical address = 346 + 14,000 = 14,346`,
      explanation: "The MMU adds the base register to every logical address to get physical address.",
    },
    examTips: [
      "Logical = Virtual = CPU-generated. Physical = what RAM sees.",
      "Compile/Load time: logical = physical. Execution time: logical ≠ physical",
      "User program works with LOGICAL addresses ONLY — never sees physical",
      "MMU is HARDWARE (not software/OS)",
    ],
    questions: [
      { q: "When are logical and physical addresses the same?", a: "At compile-time and load-time address binding (not execution-time)." },
      { q: "If relocation register = 14000 and logical address = 346, what is physical?", a: "Physical = 346 + 14000 = 14346." },
    ],
  },
  "mmu-relocation": {
    title: "MMU & Relocation Register", emoji: "⚙️",
    tldr: "Physical = Logical + Base. Limit check FIRST, then add base. Dispatcher loads registers on context switch.",
    explanation: `The relocation register (base register) is the heart of runtime address translation. The MMU adds its value to every logical address the CPU generates to produce the physical address.

The check happens in order: (1) check if logical address < limit register (otherwise trap), THEN (2) add the base register to get the physical address. This order matters — check first, translate second.

When the CPU scheduler selects a new process to run, the dispatcher loads the relocation and limit registers with the correct values for that process as part of the context switch. Every memory access is then automatically protected and translated.`,
    keyPoints: [
      "Base register = Relocation register (same register, two names)",
      "Physical address = Logical address + Relocation register",
      "Order: check logical < limit FIRST (trap if not), THEN add base",
      "Dispatcher loads base+limit registers during context switch",
      "User program only works with logical addresses — never sees physical",
      "Allows OS to load a process anywhere in physical memory",
      "MMU flexibility: OS can adjust its own size (load/unload device drivers)",
    ],
    formula: {
      code: `MMU Translation Process:
1. CPU generates logical address L
2. Check: if L >= limit register → TRAP (addressing error)
3. Physical = L + base_register
4. Access physical memory at computed address

Example:
  base = 14,000 | limit = 100,000
  
  Logical = 346:
    346 < 100,000 ✓ → Physical = 346 + 14,000 = 14,346 ✓
    
  Logical = 100,000:
    100,000 < 100,000 ✗ → TRAP!`,
      explanation: "Limit check before addition. This prevents access outside the process's region.",
    },
    examTips: [
      "Physical = Logical + Base — memorize this formula",
      "Limit check happens BEFORE addition — check first, translate second",
      "Registers updated on EVERY context switch (by dispatcher)",
      "Context switch overhead includes loading these two registers",
    ],
    questions: [
      { q: "Base=5000, Limit=10000. Logical=9999. Physical address?", a: "9999 < 10000 ✓. Physical = 9999 + 5000 = 14999." },
      { q: "Base=5000, Limit=10000. Logical=10001. What happens?", a: "10001 >= 10000 → TRAP to OS (addressing error)." },
    ],
  },
  "dynamic-loading": {
    title: "Dynamic Loading & Linking", emoji: "📚",
    tldr: "Dynamic Loading: load routine ONLY when called (no OS needed). Dynamic Linking: stub + shared library (OS needed).",
    explanation: `Dynamic Loading: A routine is NOT loaded until it is actually called. Unused routines are never loaded at all. This is implemented as a program design pattern — no OS support required. Great for large programs with rarely-used code paths (error handlers, edge-case routines).

Dynamic Linking: Linking is postponed to execution time. A small 'stub' is placed where the library call is. When the stub runs, it finds the library in memory (loading it if needed), replaces itself with the real function address, and executes. This is how DLLs (Windows) and .so files (Linux) work. OS support IS required.

Static Linking: Library code is embedded directly into every executable. Multiple programs using the same library each have their own copy → wasted memory.`,
    keyPoints: [
      "Dynamic Loading: load routine ONLY when called; unused = never loaded",
      "Dynamic Loading: NO OS support needed (it's a programming technique)",
      "Dynamic Linking: stub code → finds library → replaces itself → executes",
      "Dynamic Linking: one copy of library in RAM shared by ALL processes",
      "Dynamic Linking = DLLs (Windows) / .so shared libraries (Linux)",
      "OS support IS required for dynamic linking",
      "Static Linking: library embedded in every executable → memory waste",
    ],
    formula: null,
    examTips: [
      "Dynamic Loading = NO OS support needed (programmer implements it)",
      "Dynamic Linking = OS support IS needed (loading/managing shared libs)",
      "Stub: small placeholder code that loads and jumps to the real routine",
      "Difference: Loading = when to load. Linking = how to connect to library.",
    ],
    questions: [
      { q: "Does dynamic loading require OS support?", a: "No. It's purely a programming technique — the programmer implements it." },
      { q: "What is a stub in dynamic linking?", a: "A small piece of code placed at the library call site. It locates the library in memory, replaces itself with the real function address, and calls the function." },
    ],
  },
  "swapping": {
    title: "Swapping", emoji: "🔄",
    tldr: "Move entire process to disk (backing store). Transfer time ∝ process size. 100MB@50MB/s = 4s total.",
    explanation: `Swapping temporarily moves an entire process from main memory to a backing store (disk), then brings it back later when needed. This allows the total virtual memory of all processes to exceed physical RAM.

Roll out / Roll in: A priority-based swapping variant. Lower-priority processes are swapped out so higher-priority ones can run.

The main bottleneck is transfer time (proportional to process size). A 100MB process at 50MB/sec takes 2 sec out + 2 sec in = 4 sec just for the swap! A 3GB process would take 120 seconds — completely impractical.

Modern Linux doesn't swap whole processes. It swaps individual 4KB pages (demand paging) — much more granular and efficient.`,
    keyPoints: [
      "Swap out: move entire process from RAM to backing store (disk)",
      "Swap in: bring process back from disk to RAM",
      "Backing store: fast disk large enough to hold all process images",
      "Transfer time ∝ amount of memory swapped (main bottleneck)",
      "Roll out/Roll in: priority-based — swap low-priority for high-priority",
      "Cannot swap process with PENDING I/O (I/O would go to wrong process)",
      "Solution to pending I/O: use kernel buffers (double buffering)",
      "Modern Linux: swaps individual PAGES (4KB), not whole processes",
      "Standard whole-process swapping NOT used in modern OSes",
    ],
    formula: {
      code: `Swap Time Calculation:
  Transfer rate = 50 MB/sec
  Process size  = 100 MB

  Swap out time = 100 / 50 = 2 seconds
  Swap in  time = 100 / 50 = 2 seconds
  Total context-switch swap time = 4 seconds

  For a 3 GB process:
    3000 / 50 × 2 = 120 seconds! (impractical)`,
      explanation: "Swap time = size ÷ rate. Full context switch = swap out + swap in.",
    },
    examTips: [
      "Transfer time = size ÷ rate (both directions for full context switch)",
      "Cannot swap process with pending I/O (I/O would corrupt another process's data)",
      "Modern OSes: swap PAGES (4KB each), not whole processes",
      "Standard whole-process swapping is NOT used in modern systems",
    ],
    questions: [
      { q: "Process=200MB, transfer rate=100MB/sec. What is total swap time?", a: "Swap out = 200/100 = 2s. Swap in = 2s. Total = 4 seconds." },
      { q: "Why can't you swap out a process with pending I/O?", a: "The I/O would complete and write data to the physical address that might now belong to a different process — corrupting that process's memory." },
    ],
  },
  "contiguous-allocation": {
    title: "Contiguous Memory Allocation", emoji: "📦",
    tldr: "Process gets ONE contiguous block. Three strategies: First Fit (fastest), Best Fit (smallest leftover), Worst Fit (worst).",
    explanation: `In contiguous allocation, each process occupies a single contiguous block of physical memory. The OS maintains a list of free memory "holes" and allocates from them when a process needs memory.

Three strategies for choosing which hole to allocate:
- First Fit: scan from beginning, use FIRST hole big enough. Fastest.
- Best Fit: find the SMALLEST hole that's big enough. Leaves smallest leftover fragment. Must scan all.
- Worst Fit: find the LARGEST hole. Leaves largest leftover. Generally worst performance.

First Fit and Best Fit both outperform Worst Fit in practice. First Fit is generally fastest overall.`,
    keyPoints: [
      "Each process gets ONE contiguous block of physical memory",
      "OS maintains free-hole list; allocates holes to processes",
      "First Fit: first hole big enough → FASTEST, generally best performance",
      "Best Fit: smallest hole that fits → smallest leftover; must search ALL holes",
      "Worst Fit: largest hole → largest leftover; worst performance",
      "First Fit and Best Fit both better than Worst Fit",
    ],
    formula: null,
    examTips: [
      "First Fit = fastest (stops searching at first fit)",
      "Best Fit = smallest remaining fragment after allocation",
      "Worst Fit = generally worst (produces useless small holes)",
      "First Fit: best overall performance in practice",
    ],
    questions: [
      { q: "Holes: 100, 500, 200, 300 (in order). Process needs 212KB. Which hole does Best Fit use?", a: "Best Fit picks the SMALLEST hole that fits: 300KB (smallest ≥ 212). Leftover = 88KB." },
      { q: "Same holes. First Fit picks which?", a: "First Fit picks the first hole ≥ 212KB: 500KB (skip 100, use 500). Leftover = 288KB." },
    ],
  },
  "fragmentation": {
    title: "Fragmentation", emoji: "🧩",
    tldr: "External: free space non-contiguous (BETWEEN blocks). Internal: wasted space INSIDE allocated block.",
    explanation: `External Fragmentation: Total free memory is enough to satisfy a request, but it's scattered in non-contiguous chunks. A contiguous allocation can't be made even though sufficient total memory exists. Solution: Compaction (shuffle processes around to consolidate free space) — expensive but effective.

Internal Fragmentation: A process is given a slightly larger block than it requested (e.g., to simplify allocation into fixed-size units). The wasted space inside the allocated block is internal fragmentation.

Key insight: Paging eliminates external fragmentation (pages can go anywhere) but INTRODUCES internal fragmentation (last page is usually not full).`,
    keyPoints: [
      "External fragmentation: free space exists but non-contiguous → can't use it",
      "Internal fragmentation: wasted space INSIDE an allocated block",
      "External: solved by Compaction (move processes) or Paging/Segmentation",
      "Internal: unavoidable in fixed-size allocation (paging's last page)",
      "50% Rule (First Fit): ~1/3 of total memory lost to external fragmentation",
      "Paging: eliminates external, introduces internal fragmentation",
      "Average internal fragmentation in paging = page_size / 2",
    ],
    formula: {
      code: `Internal Fragmentation (Paging Example):
  Page size = 2,048 bytes
  Process size = 72,766 bytes

  Pages needed = ⌈72,766 / 2,048⌉ = 36 pages
  Last page used = 72,766 - (35 × 2,048) = 72,766 - 71,680 = 1,086 bytes
  Internal fragmentation = 2,048 - 1,086 = 962 bytes wasted

  Worst case: page_size - 1 bytes wasted
  Average: page_size / 2 bytes wasted`,
      explanation: "Only the LAST page of a process has internal fragmentation (partial fill).",
    },
    examTips: [
      "External = BETWEEN allocated blocks (solved by paging or compaction)",
      "Internal = INSIDE allocated block (caused by fixed-size allocation)",
      "Paging: NO external fragmentation; YES internal fragmentation",
      "Average internal fragmentation per process = ½ × page size",
    ],
    questions: [
      { q: "A process of 13,000 bytes uses 4KB (4096B) pages. How much internal fragmentation?", a: "Pages = ⌈13000/4096⌉ = 4 pages. Last page used = 13000 - (3×4096) = 13000 - 12288 = 712B. Internal frag = 4096 - 712 = 3384 bytes." },
    ],
  },
  "segmentation": {
    title: "Segmentation", emoji: "📑",
    tldr: "Logical addr = (segment#, offset). Segment table has base+limit per segment. Offset ≥ limit → TRAP.",
    explanation: `Segmentation matches how programmers think: a program has distinct logical parts — code, data, stack, heap — each of variable size. Each part is a segment.

A logical address has TWO parts: (segment number s, offset d). The segment table maps each segment number to a base (starting physical address) and limit (size of that segment). Physical address = base[s] + d.

The hardware checks: if d ≥ limit[s] → trap (segmentation fault). Segments can be placed independently anywhere in physical memory, so there's no need for the whole program to be contiguous. But since segments are variable-size, external fragmentation still occurs.`,
    keyPoints: [
      "Logical address = (segment number s, offset d)",
      "Segment table: each entry has base (physical start) + limit (size)",
      "Physical = base[s] + d, BUT only if d < limit[s]",
      "If d ≥ limit[s] → TRAP (segmentation fault!)",
      "Segments can be placed anywhere in physical memory (non-contiguous)",
      "Still has EXTERNAL fragmentation (variable-size segments)",
      "Code segment can be marked read-only for protection",
      "Modern x86-64 Linux: flat memory model (effectively ignores segmentation)",
    ],
    formula: {
      code: `Logical address: [s | d]

Segment Table:
  Segment 0: base=1400, limit=1000
  Segment 1: base=6300, limit=400
  Segment 2: base=4300, limit=400

Translation for (2, 100):
  1. Look up segment 2: base=4300, limit=400
  2. Check: 100 < 400 ✓
  3. Physical = 4300 + 100 = 4400

Translation for (1, 500):
  1. Look up segment 1: limit=400
  2. Check: 500 < 400 ✗ → TRAP! (Segmentation Fault)`,
      explanation: "d must be strictly less than limit. Equal or greater → trap.",
    },
    examTips: [
      "Check d < limit BEFORE computing physical (d ≥ limit → segfault)",
      "Limit = SIZE of segment (not end address)",
      "External fragmentation STILL occurs in segmentation (variable sizes)",
      "Modern Linux x86-64: base=0, limit=max for all segments (flat model)",
    ],
    questions: [
      { q: "Seg 0: base=219, limit=600. Access (0, 430). Valid?", a: "430 < 600 ✓. Physical = 219 + 430 = 649. Valid." },
      { q: "Seg 1: base=2300, limit=14. Access (1, 14). Valid?", a: "14 < 14 is FALSE. 14 ≥ 14 → TRAP (segmentation fault)." },
    ],
  },
  "paging-concept": {
    title: "Paging — Concept & Translation", emoji: "📄",
    tldr: "Fixed-size pages ↔ frames. Page table maps page# → frame#. No external fragmentation. Two memory accesses.",
    explanation: `Paging divides physical memory into fixed-size blocks called frames and logical memory into same-size blocks called pages. A page table maps each page number to its frame number in physical memory. Pages can be placed in any available frames — no need for contiguous physical allocation.

A logical address consists of two parts: page number p (used to index the page table and get frame number f) + offset d (stays unchanged). Physical address = [frame f | offset d].

Key win: Paging eliminates external fragmentation completely (pages fit anywhere). Trade-off: introduces internal fragmentation (last page of a process is often partially filled).`,
    keyPoints: [
      "Physical memory: fixed-size FRAMES. Logical: same-size PAGES",
      "Page size = frame size = power of 2 (commonly 4KB)",
      "Page table: maps page number p → frame number f",
      "Logical address = [page# p | offset d]",
      "Physical address = [frame# f | offset d] (d unchanged)",
      "NO external fragmentation (pages fit anywhere)",
      "YES internal fragmentation (partial last page)",
      "PTBR: Page Table Base Register. PTLR: Page Table Length Register",
      "Without TLB: every access = 2 memory reads (page table + data)",
    ],
    formula: {
      code: `Given: page size = 2^n bytes, address space = 2^m bits

Logical address breakdown:
  [ page number p  |  offset d ]
  [ m-n bits       |  n bits   ]

  Page table: p → frame f
  Physical = f × (page_size) + d = [f | d]

Example: page size = 4KB = 2^12
  32-bit address: 20 bits page number, 12 bits offset
  
  Logical = 0x12345 = page 0x12, offset 0x345
  Page table[0x12] = frame 0x35
  Physical = [0x35 | 0x345] = 0x35345

Internal fragmentation:
  Page size = 2048B, Process = 72766B
  Pages = ⌈72766/2048⌉ = 36 pages
  Last page used = 72766 mod 2048 = 1086B
  Wasted = 2048 - 1086 = 962 bytes`,
      explanation: "n = log₂(page_size). Offset bits = n, page number bits = m-n.",
    },
    examTips: [
      "Offset bits = log₂(page_size). 4KB → 12 bits offset",
      "Without TLB: EVERY access requires 2 memory reads → performance penalty",
      "NO external fragmentation in paging (key advantage!)",
      "Internal fragmentation = wasted space in LAST page of process",
    ],
    questions: [
      { q: "Page size = 1KB. Logical address = 3072. What page and offset?", a: "1KB = 2^10. Offset bits = 10. Page = 3072 ÷ 1024 = 3. Offset = 3072 mod 1024 = 0. → Page 3, offset 0." },
      { q: "Process size = 5000 bytes, page size = 2048. How many pages? Internal fragmentation?", a: "Pages = ⌈5000/2048⌉ = 3 pages. Last page used = 5000 - (2×2048) = 904B. Internal frag = 2048 - 904 = 1144B." },
    ],
  },
  "tlb-eat": {
    title: "TLB & Effective Access Time", emoji: "⚡",
    tldr: "TLB = fast cache for page table. EAT = α×mem + (1-α)×2×mem. 80% hit → 12ns from 10ns base.",
    explanation: `Without a TLB, every memory access requires two memory reads: one for the page table, one for the actual data. This doubles memory access time — unacceptable.

The Translation Lookaside Buffer (TLB) is a small, ultra-fast hardware cache (inside the CPU) storing recent page→frame mappings. A TLB Hit means the mapping is cached → only 1 memory access needed. A TLB Miss means we look up the page table in RAM → 2 accesses, and update the TLB.

Modern TLBs achieve 99%+ hit ratios with 64–1024 entries. At 99% hit rate, the overhead is only ~1%. The TLB is flushed on context switch (or uses ASIDs to avoid flushing).`,
    keyPoints: [
      "TLB = Translation Lookaside Buffer = fast hardware cache for page table entries",
      "TLB Hit: mapping found → 1 memory access only",
      "TLB Miss: not found → 2 memory accesses; TLB updated with new entry",
      "Hit ratio (α): fraction of accesses that hit in TLB",
      "Modern TLBs: 99%+ hit ratio, 64–1024 entries",
      "TLB flushed on context switch (or use ASID tags to avoid flushing)",
      "Associative memory: TLB searches all entries simultaneously (parallel)",
    ],
    formula: {
      code: `EAT = α × (mem) + (1 - α) × (2 × mem)
     = mem × (2 - α)

Where:
  α   = TLB hit ratio
  mem = memory access time

Example 1: mem = 10 ns, α = 0.80 (80% hit rate)
  EAT = 0.80 × 10 + 0.20 × 20
      = 8 + 4 = 12 ns
  (20% overhead vs ideal 10 ns)

Example 2: mem = 10 ns, α = 0.99 (99% hit rate)
  EAT = 0.99 × 10 + 0.01 × 20
      = 9.9 + 0.2 = 10.1 ns
  (only 1% overhead)`,
      explanation: "Hit = 1 access. Miss = 2 accesses. EAT = weighted average.",
    },
    examTips: [
      "EAT = α×mem + (1-α)×2×mem = mem×(2-α) — MEMORIZE THIS",
      "80% hit: EAT = 12ns from 10ns base (20% overhead)",
      "99% hit: EAT = 10.1ns (only 1% overhead)",
      "TLB is HARDWARE, searches all entries in PARALLEL (associative memory)",
    ],
    questions: [
      { q: "Memory access = 100ns, TLB hit ratio = 90%. Calculate EAT.", a: "EAT = 0.90×100 + 0.10×200 = 90 + 20 = 110 ns. (10% overhead)" },
      { q: "Memory = 200ns, TLB = 20ns (non-zero), hit ratio = 80%. EAT?", a: "EAT = 0.80×(20+200) + 0.20×(20+200+200) = 0.80×220 + 0.20×420 = 176 + 84 = 260 ns." },
    ],
  },
  "valid-invalid": {
    title: "Valid–Invalid Bit", emoji: "✅",
    tldr: "v = in memory + valid. i = not in RAM (page fault) OR not in address space (trap). Starts as i.",
    explanation: `Every page table entry has a valid–invalid (v/i) bit. When set to v (valid), the page is in the process's logical address space AND currently in physical memory — safe to access. When set to i (invalid), it means one of two things: (1) the page is in the process's address space but currently not in RAM → triggers a page fault (OS will load it), or (2) the page is not in the address space at all → illegal access → trap/error.

In demand paging, ALL entries start as i. As pages are loaded into RAM, their bits flip to v.

Protection bits are also stored per page entry (read/write/execute permissions).`,
    keyPoints: [
      "v = valid: page is in address space AND in physical memory → OK",
      "i = invalid: page not in RAM (page fault) OR not in address space (error)",
      "All entries start as i in demand paging (pure demand paging)",
      "Page fault: i because not in RAM → OS loads from disk → set to v",
      "Illegal access: i because not in address space → error, no fix",
      "PTLR enforces bounds: access beyond table size → trap",
      "Protection bits also in entry: R/W/Execute per page",
    ],
    formula: {
      code: `Page Table Entry:
  [Frame Number | V/I bit | Protection | Dirty | Reference]

  v → use frame number for translation (page is in RAM)
  i → page fault interrupt (if in address space, not in RAM)
     or trap/error (if not in address space)

Process has pages 0–5 in address space:
  Page 0: frame=2, v   ← accessible
  Page 1: frame=3, v   ← accessible
  Page 6: frame=0, i   ← accessing this = TRAP (not in address space)
  Page 3: ---, i       ← accessing this = PAGE FAULT (in space, not in RAM)`,
      explanation: "i bit = either 'not yet loaded' (fix with page fault) or 'illegal access' (error).",
    },
    examTips: [
      "i bit ≠ always illegal. It might just mean 'not loaded yet' → page fault → fixable",
      "Page fault → OS loads page from disk, sets bit to v, RESTARTS instruction",
      "Protection violation (write to read-only) → trap even if bit = v",
      "All pages start as i in demand/pure demand paging",
    ],
    questions: [
      { q: "What's the difference between a page fault and a protection fault?", a: "Page fault: valid/invalid bit = i (page not in RAM) → fixable by loading from disk. Protection fault: access type not permitted (e.g., write to read-only page) → error, even if page is in RAM." },
    ],
  },
  "shared-pages": {
    title: "Shared Pages", emoji: "🤝",
    tldr: "Multiple processes' page tables point to same physical frames. Code must be reentrant (read-only).",
    explanation: `Shared pages allow multiple processes to map their page table entries to the same physical frames. One copy of the code exists in physical memory, shared by all processes using it.

Requirement: shared code must be reentrant — non-self-modifying, read-only. Each process has its own private data pages; only code pages are shared.

Classic example: 3 processes all using a text editor (3 code pages + 1 data page each). Without sharing: 3 × 4 = 12 frames. With sharing: 3 shared code frames + 3 private data frames = 6 frames. This is the mechanism behind shared libraries.`,
    keyPoints: [
      "Multiple processes map their page table entries to the SAME physical frames",
      "Shared code must be REENTRANT (read-only, non-self-modifying)",
      "Each process has its OWN private data pages",
      "One physical copy of library/code for all processes",
      "Saves significant physical memory for common libraries (libc, etc.)",
      "Editor example: 3 processes × (3 code pages + 1 data page) → 3+3=6 frames needed (not 12)",
    ],
    formula: null,
    examTips: [
      "Shared pages = reentrant code ONLY (read-only)",
      "All sharing processes have SAME frame numbers for shared pages in their page tables",
      "Data pages are NEVER shared (private per process)",
      "Fundamental mechanism behind shared libraries (.so / .dll)",
    ],
    questions: [
      { q: "Why can only reentrant code be shared?", a: "Reentrant code never modifies itself during execution. If code could be modified, one process's change would affect all other sharing processes." },
    ],
  },
  "hierarchical": {
    title: "Hierarchical (Multi-Level) Paging", emoji: "🌳",
    tldr: "32-bit: 2-level [p1|p2|d]. 64-bit needs 3-4 levels. Each level adds 1 memory access.",
    explanation: `Problem: A 32-bit address space with 4KB pages needs a page table with 2^20 = 1 million entries × 4 bytes = 4MB per process, and it must be contiguous! Unacceptable.

Solution: Page the page table itself. Create a two-level hierarchy: an outer page table containing pointers to inner page tables, which contain the actual frame numbers.

For 32-bit with 4KB pages: the 20 remaining bits split as [p1: 10 bits | p2: 10 bits]. p1 indexes the outer table, p2 indexes the inner table. For 64-bit systems, even 2-level is insufficient — need 3 or 4 levels.`,
    keyPoints: [
      "Problem: page table too large and must be contiguous in memory",
      "32-bit/4KB: 2^20 entries × 4B = 4MB page table per process",
      "Solution: page the page table (2-level hierarchy)",
      "2-level: logical = [p1 (10b) | p2 (10b) | d (12b)]",
      "p1 → outer page table → inner table base; p2 → frame number f",
      "2-level paging: 3 memory accesses per data access (without TLB)",
      "64-bit: 2-level outer table would have 2^42 entries → need 3-4 levels",
    ],
    formula: {
      code: `32-bit address, 4KB page (2^12):
  Offset = 12 bits
  Remaining = 32 - 12 = 20 bits
  Split: p1 = 10 bits, p2 = 10 bits

  Logical: [p1 (10) | p2 (10) | d (12)]

  Translation (3 memory accesses without TLB):
    Step 1: outer_table = memory[PTBR + p1]  → base of inner table
    Step 2: frame f     = memory[outer + p2] → frame number
    Step 3: data        = memory[f × 4096 + d]

n-level paging: n+1 memory accesses without TLB`,
      explanation: "Each level of paging adds one memory access. TLB reduces this to ~1 access.",
    },
    examTips: [
      "2-level: 3 memory accesses per data reference (without TLB)",
      "Logical address for 32-bit: [p1(10)|p2(10)|d(12)]",
      "64-bit: 2-level insufficient → need 3+ levels (x86-64 uses 4-level)",
      "PTBR always points to OUTERMOST (first-level) page table",
    ],
    questions: [
      { q: "Why doesn't 2-level paging work well for 64-bit address spaces?", a: "With 64-bit and 4KB pages (12-bit offset), remaining 52 bits for page table. If split as 2-level: outer table has 2^26 entries × 4B = 256MB just for the outer table! Need 3-4 levels." },
    ],
  },
  "hashed-inverted": {
    title: "Hashed & Inverted Page Tables", emoji: "🔍",
    tldr: "Hashed: for >32-bit, hash(vpage)→chain. Inverted: ONE global table, one entry per FRAME.",
    explanation: `Hashed Page Tables: Used for sparse address spaces larger than 32 bits. Hash the virtual page number to find a bucket, then search the chain for a matching entry. Used in 64-bit UltraSPARC and PowerPC.

Inverted Page Tables: Instead of one table per process, ONE global table with one entry per physical frame. Each entry stores (pid, page_number). To translate, search for matching (pid, page) — the row index i equals the frame number.

Inverted saves massive memory (one entry per frame, not per virtual page), but search is O(n). Solution: combine with a hash table for O(1) average lookup. Shared memory is difficult (one physical → can only map to one virtual).`,
    keyPoints: [
      "Hashed: hash(virtual_page) → bucket → chain search for matching entry",
      "Hashed: used for address spaces >32 bits",
      "Inverted: ONE global table; one entry per PHYSICAL FRAME",
      "Inverted entry: (pid, page_number) pair",
      "Inverted search: find (pid, p) at row i → physical = (i, offset d)",
      "Inverted: saves memory; disadvantage: O(n) search without hash table",
      "Inverted: shared memory is DIFFICULT (one virtual → one physical mapping)",
      "Hashed: 64-bit UltraSPARC, PowerPC. Inverted: IBM Power CPUs",
    ],
    formula: {
      code: `Hashed Page Table:
  Logical: (pid, virtual_page p, offset d)
  hash(p) → bucket → search chain for matching (pid, p)
  found entry: frame r
  Physical = r × page_size + d

Inverted Page Table:
  Global table: row i = (pid_i, page_i)
  Logical: (pid, page p, offset d)
  Search: find i where table[i] = (pid, p)
  Physical = (i, d)  →  frame number = i

Memory comparison:
  Per-process table: n_virtual_pages × n_processes entries
  Inverted table:    n_physical_frames entries (much smaller!)`,
      explanation: "Inverted table size = physical memory size, not virtual space size.",
    },
    examTips: [
      "Inverted: ONE entry per PHYSICAL FRAME (not per virtual page)",
      "Inverted: saves memory but O(n) search → use hash table for speed",
      "Inverted: shared memory HARD (two virtual addresses can't easily share one physical)",
      "Hashed: designed for SPARSE 64-bit address spaces",
    ],
    questions: [
      { q: "Why does an inverted page table save memory compared to per-process tables?", a: "Per-process tables: one entry per virtual page × number of processes = huge. Inverted: one entry per PHYSICAL FRAME = fixed, small. Physical memory is much smaller than virtual address space." },
    ],
  },
  "virtual-memory": {
    title: "Virtual Memory", emoji: "🌌",
    tldr: "Run programs larger than RAM. Only needed pages in memory. Stack↓, Heap↑, gap needs no RAM.",
    explanation: `Virtual memory creates the illusion that each process has a massive, contiguous address space, even though actual RAM is much smaller. Only the pages currently needed are in physical memory; the rest sit on disk.

The virtual address space is typically laid out with code+data+heap at the bottom (growing upward) and stack at the top (growing downward). The gap between heap and stack needs no physical memory allocated until they actually grow into it.

Benefits: programs larger than physical RAM, more processes run concurrently, efficient fork() via CoW, sparse address spaces, shared libraries.`,
    keyPoints: [
      "Only needed pages in RAM; rest on disk (backing store)",
      "Programs can be LARGER than physical memory",
      "More processes can run concurrently (each uses only needed pages)",
      "Virtual address space: code/data/heap at bottom, stack at top",
      "Heap grows UP, stack grows DOWN; gap needs no physical memory",
      "Implemented via demand paging (most common) or demand segmentation",
      "System libraries shared via virtual address space mapping",
      "fork() efficient: parent/child share pages until write (CoW)",
    ],
    formula: {
      code: `Virtual address space layout:
  MAX ┌──────────────────┐
      │      stack       │ ↓ grows downward
      │   (free hole)    │ ← no physical pages allocated here
      │      heap        │ ↑ grows upward
      │      data        │
      │      code        │
    0 └──────────────────┘

Example: Virtual = 4GB, Physical RAM = 512MB, Disk = 500GB
  Only pages currently in use occupy physical RAM
  Rest reside on disk (swap space / backing store)`,
      explanation: "Gap between heap and stack takes no physical memory until pages are accessed.",
    },
    examTips: [
      "Virtual memory benefits: programs > RAM, more concurrency, efficient fork()",
      "Stack grows DOWN (from high addresses), heap grows UP",
      "Hole between stack and heap: NO physical memory needed until accessed",
      "Demand paging = most common implementation of virtual memory",
    ],
    questions: [
      { q: "What are two benefits of virtual memory?", a: "1. Programs can be larger than physical RAM. 2. More processes can run concurrently (each only loads needed pages)." },
    ],
  },
  "demand-paging": {
    title: "Demand Paging", emoji: "📥",
    tldr: "Load pages ONLY when accessed. Lazy swapper (pager). All entries start as i. Access i → page fault.",
    explanation: `Demand paging loads pages from disk only when they're actually needed — "lazy" loading. The pager (lazy swapper) never loads a page until the process actually accesses it.

Initially all page table entries are marked invalid (i). When the CPU accesses a page marked i, the hardware triggers a page fault (trap to OS). The OS loads the missing page from disk into a free frame, updates the page table entry to v, and restarts the faulting instruction.

Pure demand paging: the process starts with ZERO pages in memory. Every page is faulted in on first access. This maximizes memory efficiency but has high initial fault rate.`,
    keyPoints: [
      "Load pages ONLY when accessed (not at process load time)",
      "Lazy swapper = pager: never loads a page until it's needed",
      "All page table entries start as i (invalid) initially",
      "Access to i page → PAGE FAULT → OS loads from disk",
      "Pure demand paging: process starts with NO pages in RAM",
      "Benefits: less I/O, less memory used, faster startup, more concurrent users",
      "Hardware needed: valid/invalid bits, secondary memory, instruction restart",
    ],
    formula: null,
    examTips: [
      "Pure demand paging = start process with ZERO pages in RAM",
      "Page fault ≠ error — page just not in RAM yet (OS will fix it)",
      "Hardware must support instruction RESTART (not resume) after fault",
      "Instruction restart is architecturally tricky (partial execution problem)",
    ],
    questions: [
      { q: "What is the difference between a 'pager' and a 'swapper'?", a: "Swapper: moves entire processes to/from disk. Pager: moves individual pages to/from disk (demand paging). A pager is a lazy swapper." },
    ],
  },
  "page-fault-steps": {
    title: "Page Fault Handling — 6 Steps", emoji: "🚨",
    tldr: "Reference→Trap→Check backing store→Load page→Update table→Restart instruction.",
    explanation: `When a page fault occurs, the OS must handle it precisely. The six steps are: (1) CPU references page → page table shows i (invalid). (2) Hardware trap to OS (page fault interrupt). (3) OS checks: is this a legal access? Is the page on backing store? (4) Issue a disk read to bring page into a free frame. (5) Disk I/O completes → update page table (frame number + set v). (6) Restart the faulting instruction from the beginning.

While waiting for disk I/O (step 4→5), the CPU can run other processes. This overlapping of I/O and CPU is key to performance.

Instruction restart challenge: an instruction might have partially modified memory before the fault. Solutions: microcode pre-checks or temporary rollback registers.`,
    keyPoints: [
      "1. Reference → page table entry = i",
      "2. Hardware trap to OS (page fault interrupt)",
      "3. OS validates: legal access? Find page on backing store",
      "4. Bring page to free frame (disk read; if no free frame → page replacement first)",
      "5. Disk I/O done → update page table: set frame#, flip to v",
      "6. RESTART the faulting instruction (from beginning, not from middle)",
      "CPU runs other processes while waiting for disk (overlap I/O with CPU)",
    ],
    formula: {
      code: `6 Steps (MEMORIZE IN ORDER):
  1. reference → page table shows i (invalid)
  2. TRAP to OS (hardware page fault interrupt)
  3. OS validates: legal page? find page on disk
  4. bring page to FREE FRAME from backing store (disk I/O)
     → if no free frame: run PAGE REPLACEMENT ALGORITHM first
  5. disk I/O complete → update page table (frame#, set v)
  6. RESTART the faulting instruction (not resume — restart!)

During step 4→5: CPU runs other processes (overlap)`,
      explanation: "Step 4 is the most expensive (disk I/O). Step 6: RESTART not resume.",
    },
    examTips: [
      "Step 6 = RESTART instruction (from beginning, not resume from where it was)",
      "Step 4 may require page replacement if no free frames exist",
      "Page fault service time ≈ 8 milliseconds (disk I/O dominates)",
      "CPU productive during I/O wait (multiprogramming benefit)",
    ],
    questions: [
      { q: "In step 6, why do we RESTART the instruction instead of resuming it?", a: "Because the instruction may have been partially executed (modified some memory) before the fault. Restarting ensures a clean, correct execution from the beginning." },
      { q: "What if no free frame is available in step 4?", a: "The OS must run a page replacement algorithm to evict an existing page first, then use that frame for the new page." },
    ],
  },
  "demand-eat": {
    title: "Demand Paging EAT", emoji: "📊",
    tldr: "EAT = (1-p)×200ns + p×8ms. p=0.001 → 40× slowdown! For <10% degradation: p < 1/400000.",
    explanation: `Demand paging has a massive performance cost when page faults occur. The formula accounts for the probability p of a page fault on any given access.

Memory access = 200 nanoseconds. Page fault service = ~8 milliseconds = 8,000,000 ns. That's a 40,000× difference! Even p = 0.001 (1 fault per 1000 accesses) gives EAT = 8200 ns — 40× slower than ideal.

For less than 10% performance degradation, you need p < 0.0000025 — fewer than 1 page fault per 400,000 accesses. This is why locality of reference is so critical for demand paging performance.`,
    keyPoints: [
      "EAT = (1-p) × mem_access + p × page_fault_service_time",
      "p = page fault probability (0 to 1)",
      "Typical values: mem = 200ns, page fault service = 8ms (8,000,000 ns!)",
      "p = 0.001 → EAT ≈ 8200 ns → 40× slowdown!",
      "For <10% degradation: p < 0.0000025 (1 per 400,000 accesses)",
      "Major fault: page on disk (expensive, hard fault)",
      "Minor fault: page in memory but not in page table (soft fault, cheap)",
    ],
    formula: {
      code: `EAT = (1 – p) × mem + p × page_fault_service

Given: mem = 200 ns, fault_service = 8,000,000 ns

EAT = (1-p) × 200 + p × 8,000,000
    = 200 + p × 7,999,800

p = 0:        EAT = 200 ns (no faults, ideal)
p = 0.001:    EAT = 200 + 0.001 × 7,999,800 ≈ 8,200 ns (41× slower!)
p = 0.0000025: EAT ≈ 220 ns (<10% degradation)

For <10% slowdown: EAT < 220 ns
  200 + p × 7,999,800 < 220
  p < 20 / 7,999,800 ≈ 0.0000025`,
      explanation: "Even 0.1% fault rate causes 40× slowdown. Keep p extremely low!",
    },
    examTips: [
      "EAT = (1-p)×200 + p×8,000,000 — standard numbers for exam problems",
      "p=0.001 → EAT ≈ 8200ns → approximately 40× slowdown",
      "For <10% degradation: p < 1/400,000 accesses",
      "Major fault = hard fault (disk I/O). Minor = soft fault (in memory, not in table)",
    ],
    questions: [
      { q: "mem=200ns, fault service=8ms, p=0.002. What is EAT?", a: "EAT = (1-0.002)×200 + 0.002×8,000,000 = 0.998×200 + 16,000 = 199.6 + 16,000 ≈ 16,200 ns." },
      { q: "How much does a 0.1% fault rate (p=0.001) slow down memory access?", a: "Ideal EAT = 200ns. Actual EAT = 200 + 0.001×7,999,800 ≈ 8,200ns. Slowdown ≈ 41×." },
    ],
  },
  "copy-on-write": {
    title: "Copy-on-Write (CoW)", emoji: "✂️",
    tldr: "fork() shares ALL parent's pages initially. First write to a page → copy that page only.",
    explanation: `Copy-on-Write makes fork() extremely efficient. When a process forks, instead of copying all the parent's pages immediately (which could be gigabytes), the child initially shares ALL the parent's physical pages.

Pages are marked as CoW in the page table. When EITHER the parent or child writes to a CoW-marked page, ONLY THEN is a copy of that specific page made. Pages that are never written remain shared indefinitely.

Result: fork() is O(1) regardless of process size. Only modified pages consume extra physical memory. Pages shared read-only stay shared. New free pages come from a zero-fill-on-demand pool (zeroed before use for security).`,
    keyPoints: [
      "Parent and child share ALL pages immediately after fork()",
      "Shared pages marked CoW (Copy-on-Write) in page table",
      "First WRITE to CoW page by either parent or child → copy that page",
      "Only modified pages are actually copied",
      "Read-only pages stay shared forever (never copied)",
      "fork() becomes O(1) regardless of process size",
      "New pages come from zero-fill-on-demand pool (security: zero before use)",
      "vfork(): even more extreme — child runs IN parent's address space",
    ],
    formula: null,
    examTips: [
      "CoW: copy on WRITE, not on fork()",
      "Both parent AND child can trigger the copy (whoever writes first)",
      "Pages never written = never copied = true sharing throughout process lifetime",
      "Zero-fill-on-demand: new pages zeroed out before allocation (prevents data leaks)",
    ],
    questions: [
      { q: "After fork(), parent writes to page A, child writes to page B. How many physical copies?", a: "2 copies. Page A: parent triggered a copy → 2 copies of page A. Page B: child triggered a copy → 2 copies of page B. Any pages neither wrote remain shared (1 copy)." },
    ],
  },
  "fifo": {
    title: "FIFO Page Replacement", emoji: "🚶",
    tldr: "Evict oldest page. Simple. Suffers Belady's Anomaly: more frames → MORE page faults!",
    explanation: `FIFO (First In, First Out) page replacement evicts the page that has been in memory the longest — the oldest one. Implementation: maintain a queue; new pages enter at the rear, victims leave from the front.

The problem: old age doesn't mean unused. A page loaded at startup (like global variables) stays old but might be frequently needed. FIFO ignores usage completely.

Belady's Anomaly: With FIFO, giving a process MORE frames can actually INCREASE the number of page faults! This is bizarre and counterintuitive. It's a famous anomaly unique to FIFO — LRU and OPT are immune.`,
    keyPoints: [
      "Evict the page that has been in memory LONGEST (oldest)",
      "Implementation: FIFO queue; new pages at rear, evict from front",
      "Does NOT consider how often or recently pages are used",
      "Belady's Anomaly: more frames can → MORE page faults (FIFO only!)",
      "Simple to implement but generally poor performance",
      "Used as a baseline comparison for other algorithms",
    ],
    formula: {
      code: `FIFO with 3 frames: reference = 7 0 1 2 0 3 0 4 2 3 0 3 2 1 2 0 1 7

Step by step:
  7 → [7, -, -] FAULT    (3 faults so far)
  0 → [7, 0, -] FAULT
  1 → [7, 0, 1] FAULT
  2 → [2, 0, 1] FAULT    (evict 7, oldest)
  0 → [2, 0, 1] HIT
  3 → [2, 3, 1] FAULT    (evict 0)
  0 → [2, 3, 0] FAULT    (evict 1)
  4 → [4, 3, 0] FAULT    (evict 2)
  ...

BELADY'S ANOMALY:
  3 frames → 9 page faults
  4 frames → 10 page faults (MORE with more frames!)`,
      explanation: "Track arrival order. Evict whichever arrived first among the loaded pages.",
    },
    examTips: [
      "FIFO = ONLY algorithm with Belady's Anomaly",
      "Belady's: more frames → more faults (exam favorite — very counterintuitive)",
      "Evict OLDEST page, not least-used page",
      "LRU and OPT are 'stack algorithms' — immune to Belady's Anomaly",
    ],
    questions: [
      { q: "What is Belady's Anomaly? Which algorithm exhibits it?", a: "Belady's Anomaly: adding more frames causes MORE page faults instead of fewer. Only FIFO exhibits this. LRU and OPT do not." },
    ],
  },
  "opt": {
    title: "Optimal (OPT) Page Replacement", emoji: "🏆",
    tldr: "Evict page used FURTHEST in future. Minimum faults guaranteed. Not implementable — requires future knowledge.",
    explanation: `The Optimal algorithm always evicts the page whose next use is furthest away in the future. This guarantees the minimum possible number of page faults — it's provably optimal.

Why can't we implement it? You'd need to know the future — what pages will be referenced next, in what order. That's impossible during actual execution. We only know the reference history, not the future.

OPT is used exclusively as a benchmark. When you design a new page replacement algorithm, you compare its page fault count to OPT to see how close you've gotten. OPT is a "stack algorithm" — immune to Belady's Anomaly.`,
    keyPoints: [
      "Evict the page whose NEXT USE is furthest in the future",
      "Guarantees MINIMUM number of page faults possible",
      "NOT implementable (requires future reference string knowledge)",
      "Used ONLY as a benchmark to evaluate other algorithms",
      "Also called OPT, MIN, or Optimal",
      "Stack algorithm: immune to Belady's Anomaly",
      "If a page is NEVER used again → it's the perfect victim",
    ],
    formula: {
      code: `OPT with 3 frames: reference = 7 0 1 2 0 3 0 4 2 3 0 3 2

  7 → [7,-,-] FAULT
  0 → [7,0,-] FAULT
  1 → [7,0,1] FAULT
  2 → look ahead: 7 used at pos 17, 0 at pos 4, 1 at pos 13
     → evict 7 (furthest next use) → [2,0,1] FAULT
  0 → [2,0,1] HIT
  3 → look ahead: 2 at pos 12, 0 at pos 10, 1 at pos 13
     → evict 1 (furthest) → [2,0,3] FAULT
  0 → HIT
  4 → look ahead: 2 at pos 8, 0 at pos 10, 3 at pos 9
     → evict 0 (pos 10, furthest) → [2,4,3] FAULT
  ...

OPT gives FEWEST faults → use as benchmark`,
      explanation: "Look ahead in reference string. Evict page with furthest next reference.",
    },
    examTips: [
      "OPT = not implementable. Used as benchmark ONLY.",
      "If a page never appears again in future → definitely evict it",
      "OPT gives minimum page faults for ANY reference string",
      "Stack algorithm → no Belady's Anomaly",
    ],
    questions: [
      { q: "Why is OPT not used in real operating systems?", a: "It requires knowing the future reference string — which pages will be accessed and in what order. This information is not available during actual execution." },
    ],
  },
  "lru": {
    title: "LRU Page Replacement", emoji: "⏱️",
    tldr: "Evict LEAST RECENTLY USED page. Good OPT approximation. Expensive to implement purely in hardware.",
    explanation: `LRU (Least Recently Used) evicts the page that has NOT been used for the longest time — the one that was used least recently. It's based on the locality principle: if you used a page recently, you'll likely use it again soon.

LRU is an excellent approximation of OPT — it uses the past as a predictor of the future. It's a stack algorithm, so no Belady's Anomaly.

Two implementations: (1) Counter: timestamp each page access, evict smallest counter — O(n) search on fault. (2) Stack: move referenced page to top, evict from bottom — O(1) find but O(n) update per access. Both are hardware-expensive. Real systems use the Clock algorithm (approximation) instead.`,
    keyPoints: [
      "Evict the page NOT used for the LONGEST time (least recently used)",
      "Based on locality principle: recent = will be used again",
      "Good approximation of OPT; stack algorithm (no Belady's Anomaly)",
      "Counter: each page has last-use timestamp → evict smallest; O(n) search",
      "Stack: move to top on reference → bottom = LRU; O(1) find but O(n) update per access",
      "Pure LRU: hardware too expensive (update on EVERY memory reference)",
      "Real systems: approximate LRU with Clock algorithm",
    ],
    formula: {
      code: `LRU with 3 frames: reference = 7 0 1 2 0 3 0 4 2 3 0 3 2

  7 → [7,-,-] FAULT
  0 → [7,0,-] FAULT
  1 → [7,0,1] FAULT
  2 → LRU is 7 (used longest ago) → evict 7 → [2,0,1] FAULT
  0 → HIT → [2,0,1] (0 now most recent)
  3 → LRU is 1 (used at step 3, oldest) → evict 1 → [2,0,3] FAULT
  0 → HIT
  4 → LRU is 2 → evict 2 → [4,0,3] FAULT
  2 → LRU is 3 → evict 3 → [4,0,2] FAULT
  3 → LRU is 4 → evict 4 → [3,0,2] FAULT
  0 → HIT
  3 → HIT
  2 → HIT → 8 faults total (better than FIFO's ~12)`,
      explanation: "Track when each page was last used. Evict the one used longest ago.",
    },
    examTips: [
      "LRU = stack algorithm → NO Belady's Anomaly",
      "Pure LRU: too expensive for hardware (update on every single access)",
      "Counter: O(n) to find min. Stack: O(1) to find LRU but O(n) to update each reference",
      "Real OS: Clock algorithm (approximates LRU with low overhead)",
    ],
    questions: [
      { q: "Why is pure LRU rarely used in modern operating systems?", a: "Updating the LRU counter or stack on EVERY memory reference is too expensive. Hardware would need to do O(n) work on every memory access, significantly slowing the system." },
    ],
  },
  "clock": {
    title: "Clock Algorithm (Second-Chance)", emoji: "🕐",
    tldr: "Use bit per page. On fault: advance hand. Bit=1→ clear+skip (second chance). Bit=0→ evict.",
    explanation: `The Clock algorithm efficiently approximates LRU. Pages are arranged in a circular list with a clock hand. Each page has a use bit (reference bit) set to 1 by hardware on every access.

On a page fault: advance the clock hand. Check the current page's use bit. If it's 1: clear it to 0 (give it a "second chance") and advance. If it's 0: this page gets evicted — load new page here.

If ALL pages have use bit = 1, the hand loops all the way around, clearing all bits, and eventually evicts the page it started at → behaves like FIFO in this worst case. The algorithm is "brilliant, low-overhead LRU approximation that powers operating systems today."`,
    keyPoints: [
      "Pages arranged in circle; single clock hand",
      "Hardware use bit: automatically set to 1 on every page access",
      "On page fault: advance clock hand → check use bit",
      "Use bit = 1: CLEAR to 0 (second chance!), advance to next page",
      "Use bit = 0: EVICT this page, load new page here",
      "If all bits = 1: loops around → behaves like FIFO (worst case)",
      "Fast clock hand = many page faults. Slow hand = few faults (good sign)",
      "Used in REAL OSes — low overhead LRU approximation",
    ],
    formula: {
      code: `Clock Algorithm Trace:
  Pages in circle: A(1) → B(0) → C(1) → D(1) → E(0) → ...
                        ↑
                  clock hand starts here on page fault

  Check B: use=0 → EVICT B, put new page here
  Clock hand now at new page (use=1 after loading)

  Next fault:
  Check C: use=1 → clear to 0, advance
  Check D: use=1 → clear to 0, advance
  Check E: use=0 → EVICT E

Worst case (all bits = 1):
  Hand clears each bit as it passes
  Completes full circle → all bits now 0
  Next page checked (starting page) → use=0 → evict it
  → Same as FIFO (evicts "oldest" by position)`,
      explanation: "Second chance = clear use bit + skip. Only evict pages that haven't been used recently.",
    },
    examTips: [
      "Clock = Second-Chance algorithm (same thing, two names)",
      "Use bit set by HARDWARE on access; cleared by OS; evict only 0-bit pages",
      "Worst case: all bits=1 → loops around → FIFO behavior",
      "Fast hand = BAD (too many faults). Slow hand = GOOD (few faults).",
    ],
    questions: [
      { q: "Frames: A(use=1), B(use=1), C(use=0), D(use=1). Hand points to A. Page fault. What gets evicted?", a: "A: bit=1 → clear, advance. B: bit=1 → clear, advance. C: bit=0 → EVICT C." },
    ],
  },
  "frame-allocation": {
    title: "Frame Allocation", emoji: "⚖️",
    tldr: "Equal: m/n per process. Proportional: aᵢ=(sᵢ/S)×m. Fewer frames → more faults.",
    explanation: `The OS must decide how many physical frames each process gets. Fewer frames means more page faults means slower execution.

Equal allocation: divide total frames equally among processes. Simple but ignores that different processes have very different memory needs.

Proportional allocation: give each process frames proportional to its size. A large process gets more frames than a small one. Formula: aᵢ = (sᵢ/S) × m where sᵢ is process size, S is total of all sizes, m is total frames.

Minimum frames: defined by architecture (must hold all pages one instruction can reference). Maximum: physical memory limit.`,
    keyPoints: [
      "Fewer frames → higher page fault rate → slower process execution",
      "Equal: each process gets m/n frames (m=total, n=process count)",
      "Proportional: aᵢ = (sᵢ / S) × m",
      "Each aᵢ must be integer ≥ architecture minimum, and Σaᵢ ≤ m",
      "Minimum frames: architecture-defined (worst-case single instruction references)",
      "Maximum frames: limited by total physical memory",
    ],
    formula: {
      code: `Equal Allocation:
  m = 93 frames, n = 5 processes
  Each gets = ⌊93/5⌋ = 18 frames
  Leftover = 93 - (18×5) = 3 frames → free-frame buffer pool

Proportional Allocation:
  aᵢ = (sᵢ / S) × m
  S = Σ sᵢ (sum of all process sizes)

Example: p1=10 pages, p2=127 pages, m=62 frames
  S = 10 + 127 = 137
  a1 = (10/137) × 62 = 0.073 × 62 ≈ 4 frames
  a2 = (127/137) × 62 = 0.927 × 62 ≈ 57 frames
  Check: 4 + 57 = 61 ≤ 62 ✓`,
      explanation: "Proportional allocation is fairer — larger processes get proportionally more frames.",
    },
    examTips: [
      "Proportional: aᵢ = (sᵢ/S) × m — memorize this formula",
      "Round each aᵢ to integer, check sum ≤ m",
      "Equal allocation: leftover frames → free-frame buffer pool",
      "Priority allocation: higher-priority process gets more frames (variant)",
    ],
    questions: [
      { q: "p1=40 pages, p2=60 pages. Total 50 frames. Proportional allocation?", a: "S=100. a1=(40/100)×50=20 frames. a2=(60/100)×50=30 frames. Total=50 ✓." },
    ],
  },
  "global-local": {
    title: "Global vs Local Replacement", emoji: "🌍",
    tldr: "Global: steal from any process (higher throughput, Linux default). Local: own frames only (limits thrashing).",
    explanation: `Global replacement: a process can evict a frame from ANY other process in the system. High-priority processes can steal frames from low-priority ones. Results in higher overall system throughput. Used by default in Linux and most modern OSes.

Local replacement: a process can only evict pages from its OWN allocated frames. Frame count stays constant for each process. This limits thrashing — a thrashing process can't steal from others.

Trade-off: global maximizes throughput (better overall performance) but one process can hurt another. Local is more predictable per-process but less efficient overall. Linux uses global by default; cgroups can enforce local boundaries for containers.`,
    keyPoints: [
      "Global: replace from ANY frame in system → higher system throughput",
      "Local: replace from own frames ONLY → frame count stays constant",
      "Global: high-priority can steal frames from low-priority processes",
      "Local: thrashing process can't steal from others (limits thrashing spread)",
      "Global: more commonly used (higher overall throughput)",
      "Linux: Global by default; cgroups for Local boundaries in containers",
    ],
    formula: null,
    examTips: [
      "Global = higher throughput = more common in practice (Linux default)",
      "Local = limits thrashing spread = more predictable per-process",
      "With Local: frame count per process is CONSTANT",
      "cgroups in Linux: enforce Local replacement for containers",
    ],
    questions: [
      { q: "Which replacement type generally gives higher system throughput, and why?", a: "Global replacement. It allows high-priority processes to claim more frames from low-priority ones, maximizing CPU utilization and overall throughput." },
    ],
  },
  "thrashing": {
    title: "Thrashing", emoji: "🔥",
    tldr: "Process busy swapping pages in/out. OS adds more processes thinking CPU is idle → disaster.",
    explanation: `Thrashing happens when a process doesn't have enough frames for its "working set" — the pages it actively uses. It page faults, evicts a page, then immediately needs that page again → constant swapping with no useful work.

The vicious cycle: many page faults → low CPU utilization → OS thinks "CPU idle, need more processes" → adds another process → even less memory per process → even more page faults → CPU utilization drops further → OS adds yet another process → complete system collapse.

Solution: detect thrashing early and fix it. Local replacement limits spread. PFF-based allocation adjusts frames dynamically. Linux OOM Killer terminates the largest memory hog as a last resort.`,
    keyPoints: [
      "Thrashing = process constantly swapping pages in and out",
      "Cause: not enough frames for a process's working set",
      "Vicious cycle: ↑ page faults → ↓ CPU use → OS adds processes → ↑ thrashing",
      "Locality model: process actively uses a 'locality' (set of related pages)",
      "Thrashing condition: Σ(locality sizes) > total available frames",
      "Fix with local replacement: thrashing process can't steal from others",
      "PFF too high → give more frames; too low → take frames",
      "Linux OOM Killer: kills largest memory hog when no free frames left",
    ],
    formula: {
      code: `Thrashing Condition:
  Σ(size of locality for each process) > total physical frames

CPU Utilization Graph:
  Utilization ↑ as multiprogramming increases
  → CLIFF: Utilization drops sharply = THRASHING
  
OS makes it WORSE:
  Low CPU use → OS adds more processes
  → even LESS memory per process → more thrashing → lower CPU use
  → OS adds MORE processes → total system collapse!

Why OS makes it worse:
  OS sees: "CPU utilization is low → I should schedule more processes"
  Reality: "CPU is waiting for page faults — don't add processes!"`,
      explanation: "The OS's response to thrashing (add more processes) is exactly the wrong thing to do.",
    },
    examTips: [
      "Thrashing exact definition: 'a process is busy swapping pages in and out'",
      "OS makes it WORSE by adding more processes (thinking CPU is idle)",
      "Fix: local replacement, reduce multiprogramming, PFF-based allocation",
      "Linux OOM Killer: kills largest memory-hogging process as last resort",
    ],
    questions: [
      { q: "Why does the OS mistakenly make thrashing worse?", a: "When thrashing occurs, page faults keep the CPU busy waiting for disk I/O, causing LOW CPU utilization. The OS sees low CPU utilization and concludes it needs to add MORE processes — which makes memory even more scarce and worsens thrashing." },
    ],
  },
  "pff-workingset": {
    title: "PFF & Working Set Model", emoji: "📈",
    tldr: "Working Set = pages used in last Δ references. PFF: high rate → +frames, low rate → -frames.",
    explanation: `The Working Set Model tracks the set of distinct pages actively used in the last Δ reference accesses (the working set window). If a process's full working set is in memory → smooth execution. If not → thrashing.

The Page Fault Frequency (PFF) approach is more direct and practical: establish an acceptable page fault rate range. If actual rate > upper bound → give more frames. If actual rate < lower bound → take frames away. If no free frames available → suspend a process.

Δ (delta) is the critical parameter of the working set model. Too small: misses the working set. Too large: includes multiple localities. It must be chosen carefully.`,
    keyPoints: [
      "Working Set WSSᵢ(Δ) = distinct pages referenced in last Δ accesses",
      "Δ = working set window (key parameter to tune)",
      "If Σ WSSᵢ > total frames → thrashing → must suspend a process",
      "PFF = Page Fault Frequency (more direct/practical than working set)",
      "PFF too high → process needs MORE frames",
      "PFF too low → process can give UP frames to others",
      "PFF = zero free frames → SUSPEND a process entirely",
      "macOS: memory compression (ZRAM) before swapping to extend thrashing cliff",
    ],
    formula: {
      code: `Working Set Model:
  WSSᵢ(Δ) = {pages referenced in last Δ time units for process i}
  
  Total demand D = Σ WSSᵢ
  if D > m (total frames) → thrashing → suspend a process

  Δ too small → doesn't capture full locality
  Δ too large → spans multiple localities, too many pages

PFF Control:
  ┌─ PFF > upper_bound → GIVE process more frames
  ├─ PFF < lower_bound → TAKE frames from process
  └─ in range → maintain current allocation
  
  If no free frames at all → SUSPEND a process, reclaim its frames

Linux OOM Killer:
  When critical memory pressure → kernel terminates
  the largest memory-consuming process instantly`,
      explanation: "Δ determines working set window size. PFF gives direct frame control.",
    },
    examTips: [
      "Δ (delta) = working set window — crucial parameter, know its role",
      "WSSᵢ = number of DISTINCT pages referenced in last Δ accesses",
      "PFF too high → +frames. PFF too low → -frames. No frames → suspend process",
      "Working set ≠ just pages allocated; it's the ACTIVELY USED subset",
    ],
    questions: [
      { q: "What does parameter Δ represent in the Working Set Model?", a: "Δ (delta) is the working set window — it defines how far back in the reference history we look to determine which pages are in the working set. Pages referenced in the last Δ accesses constitute the working set." },
      { q: "In PFF, if a process's page fault rate is BELOW the lower bound, what happens?", a: "The OS takes away frames from this process (reduces its allocation). The extra frames go to processes with higher fault rates or to a free pool." },
    ],
  },
};
