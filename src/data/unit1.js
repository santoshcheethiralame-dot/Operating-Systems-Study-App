// Auto-extracted from unit1.jsx
export const groups = [
  { name: "🖥️ OS Fundamentals", ids: ["os-overview","os-goals","os-definition"] },
  { name: "🔌 Computer Organization", ids: ["bootstrap-interrupts","storage-struct","io-dma"] },
  { name: "🏗️ System Architecture", ids: ["multiprocessor","multicore-cluster","dual-mode-timer"] },
  { name: "⚙️ OS Structure", ids: ["multiprog-multitask","os-services","syscalls","policy-mechanism"] },
  { name: "📊 Kernel Data Structures", ids: ["arrays-lists","stacks-queues-trees","hash-bitmap"] },
  { name: "🌐 Computing Environments", ids: ["trad-mobile","client-server-p2p","virt-cloud"] },
  { name: "🔄 Process Concept", ids: ["process-concept","pcb-states","schedulers-types","context-switch"] },
  { name: "🛠️ Process Operations", ids: ["process-creation","process-termination","io-lifecycle"] },
  { name: "📅 CPU Scheduling Basics", ids: ["sched-criteria","preemptive-dispatcher"] },
  { name: "🗓️ Scheduling Algorithms", ids: ["fcfs-sched","sjf-srtf","priority-sched","round-robin","multilevel-q"] },
  { name: "🖧 Advanced Scheduling", ids: ["multiproc-sched","affinity-loadbal","linux-cfs","windows-sched"] },
  { name: "🐚 Shell & Cron", ids: ["shell-intro","env-vars","shell-basics","cron"] },
];

export const topics = {
  "os-overview": {
    title: "Need for OS & Overview", emoji: "🖥️",
    tldr: "OS = intermediary between user and hardware. Without it, programmers would need hardware knowledge to run any program.",
    explanation: `Without an OS, every application developer would need to directly program hardware — writing low-level code to control the CPU, memory, disk, and I/O devices manually. This is impractical and error-prone.

The OS solves this by acting as an intermediary — it sits between the user/application and the raw hardware, providing a clean, safe, and convenient interface.

4 components of a Computer System (abstract view):
1. Hardware — provides basic computing resources (CPU, memory, I/O devices)
2. Operating System — controls and coordinates hardware use among applications and users
3. Application Programs — use system resources to solve user problems (word processors, browsers, games)
4. Users — people, machines, or other computers

The OS has two perspectives: User View (convenience, ease of use, performance) and System View (resource allocator, control program, efficiency).`,
    keyPoints: [
      "OS = intermediary between user and hardware",
      "Without OS: hardware knowledge mandatory for any programming",
      "4 components: Hardware → OS → Application Programs → Users",
      "User view: convenience, ease of use, performance",
      "System view: OS is a resource allocator AND a control program",
      "Resource allocator: manages CPU, memory, I/O; decides conflicting requests",
      "Control program: controls execution to prevent errors and improper use",
      "Mainframe/shared systems: maximize resource utilization (keep all users happy)",
      "Embedded systems: little or no user interface, optimized for specific task",
    ],
    formula: null,
    examTips: [
      "OS = intermediary — this exact phrase comes up in exams",
      "Two roles: Resource Allocator + Control Program (know both)",
      "4 components: Hardware, OS, Application Programs, Users — memorize the order",
      "Shared system goal = maximize utilization. Personal system goal = maximize convenience",
    ],
    questions: [
      { q: "What are the two main roles of an OS from the system's perspective?", a: "1. Resource Allocator: manages all hardware resources (CPU, memory, I/O), decides between conflicting requests for efficient and fair use. 2. Control Program: controls execution of programs to prevent errors and improper/unauthorized use of the computer." },
      { q: "Why do we need an OS at all?", a: "Without an OS, every programmer would need direct hardware knowledge to write programs. The OS abstracts hardware complexity, provides a convenient interface, ensures security, and manages resources so applications can run without worrying about hardware details." },
    ],
  },

  "os-goals": {
    title: "OS Goals & Why Study It", emoji: "🎯",
    tldr: "OS goals: execute programs, convenient to use, efficient hardware use. Study it because ALL code runs on top of an OS.",
    explanation: `Operating System Goals:
1. Execute user programs and make solving user problems easier
2. Make the computer system convenient to use
3. Use the computer hardware in an efficient manner
4. Manage resources: Memory, Processor(s), I/O Devices

Why Study OS?
Only a small percentage of people will create or modify operating systems. However, ALMOST ALL CODE runs on top of an OS — so understanding how OSes work is crucial for proper, efficient, effective, and secure programming.

Understanding the fundamentals helps you write better programs, debug system-level issues, understand performance bottlenecks, and work with concurrency and security correctly.`,
    keyPoints: [
      "Goal 1: Execute user programs, make problem-solving easier",
      "Goal 2: Make the computer convenient to use",
      "Goal 3: Use hardware efficiently",
      "Goal 4: Manage resources (Memory, CPU, I/O)",
      "Why study: all code runs ON TOP of an OS — understanding it = better programming",
      "OS knowledge → proper, efficient, effective, and secure programming",
    ],
    formula: null,
    examTips: [
      "OS Goals: Execute programs, Convenience, Efficiency, Resource management — all 4",
      "'All code runs on top of an OS' — classic exam justification for studying OS",
      "Efficiency + convenience are often in conflict — OS must balance both",
    ],
    questions: [
      { q: "List the 4 main goals of an Operating System.", a: "1. Execute user programs and make solving user problems easier. 2. Make the computer system convenient to use. 3. Use computer hardware in an efficient manner. 4. Manage resources: Memory, Processor(s), I/O Devices." },
    ],
  },

  "os-definition": {
    title: "Defining OS — Kernel, System Programs", emoji: "🧠",
    tldr: "Kernel = the ONE program always running. System programs ship WITH the OS. Everything else = application programs.",
    explanation: `The OS has many roles and functions, making it hard to define precisely. The common functions of controlling and allocating resources are brought together into one piece of software.

The KERNEL is the core of the OS — it is the one program running at all times on the computer. Everything else is either:
- A system program: ships with the OS (shells, compilers, utilities like ls, cp, grep)
- An application program: installed by the user (browsers, games, word processors)

The OS serves as the foundation — all other software runs on top of it.

Key OS concept: Policy vs Mechanism
Policy: WHAT will be done (e.g., which process gets CPU next)
Mechanism: HOW to do it (e.g., the timer, the ready queue)
Separating them allows maximum flexibility — you can change the policy without changing the mechanism.`,
    keyPoints: [
      "Kernel = 'the one program running at all times' — heart of the OS",
      "System programs: ship with OS (ls, cp, shells, compilers)",
      "Application programs: installed separately (browsers, games)",
      "OS common functions = controlling + allocating resources",
      "Policy: WHAT to do. Mechanism: HOW to do it.",
      "Separation of Policy and Mechanism = maximum flexibility",
      "Example: timer is a mechanism. 'Limit user to 30 min' is a policy.",
    ],
    formula: {
      code: `Software Layer Model:
  ┌─────────────────────────────┐
  │      User Applications      │  ← MS Word, Chrome, Games
  ├─────────────────────────────┤
  │      System Programs        │  ← ls, cp, bash, gcc (ship with OS)
  ├─────────────────────────────┤
  │         KERNEL              │  ← THE one always-running program
  ├─────────────────────────────┤
  │         Hardware            │  ← CPU, RAM, Disk, I/O
  └─────────────────────────────┘

Policy vs Mechanism Example:
  Timer mechanism: hardware that generates interrupt after N ms
  Policy A: "Interrupt every 10ms" (interactive system)
  Policy B: "Interrupt every 1000ms" (batch system)
  Changing policy does NOT require changing the timer hardware.`,
      explanation: "Kernel is always running. Changing policy ≠ changing mechanism — they're independent.",
    },
    examTips: [
      "Kernel = the ONE program always running (not the whole OS, just the kernel)",
      "Policy = WHAT. Mechanism = HOW. They are SEPARATE by design.",
      "System programs ship WITH the OS. Application programs are separate.",
      "'Separation of policy from mechanism allows maximum flexibility' — quote this in exams",
    ],
    questions: [
      { q: "What is the kernel?", a: "The kernel is the one program running at all times on the computer. It is the core of the OS. Everything else is either a system program (ships with OS) or an application program (installed separately)." },
      { q: "Give an example of Policy vs Mechanism.", a: "Mechanism: a timer that can be set to any interval. Policy: 'interrupt every 10ms for interactive users' or 'interrupt every 100ms for batch jobs'. The timer (mechanism) is the same — only the setting (policy) changes." },
    ],
  },

  "bootstrap-interrupts": {
    title: "Bootstrap, Interrupts & I/O Operation", emoji: "🔌",
    tldr: "Bootstrap = first program at boot, stored in ROM/EEPROM. Interrupts = OS is interrupt-driven. Interrupt vector = lookup table for ISRs.",
    explanation: `Bootstrap Program:
When the system is powered on or rebooted, the first program that runs is the Bootstrap (also called firmware). It is stored in ROM (Read-Only Memory) or EEPROM — non-volatile memory, so it survives power-off. It initializes all system components (CPU registers, device controllers, memory) and loads the OS kernel into memory. After the OS loads, the first process created is init (in Linux).

Computer System Operation:
I/O devices and the CPU can execute concurrently. Each device has its own controller with a local buffer. The CPU moves data between main memory and device buffers. I/O is from device to controller's local buffer. The device controller tells the CPU it finished by raising an interrupt.

Interrupts:
The OS is interrupt-driven — it reacts to events (interrupts) rather than polling. An interrupt transfers control to an Interrupt Service Routine (ISR) via the interrupt vector (a table of ISR addresses). The OS saves CPU state (registers + PC) before handling the interrupt, then restores it after.

Trap/Exception = a software-generated interrupt caused by an error (divide by zero) or a system call.`,
    keyPoints: [
      "Bootstrap: first program at boot, stored in ROM/EEPROM (firmware)",
      "Bootstrap: initializes CPU registers, device controllers, memory",
      "Bootstrap: locates and loads OS kernel into memory",
      "First process after OS boot: init (Linux)",
      "OS is interrupt-driven (reacts to events, doesn't poll)",
      "Interrupt vector: table containing addresses of all ISRs",
      "ISR (Interrupt Service Routine): the code that handles each interrupt type",
      "OS must save CPU state (registers + PC) before handling interrupt",
      "Trap/Exception: software-generated interrupt (error or system call)",
      "Device controller notifies CPU via interrupt when I/O completes",
    ],
    formula: {
      code: `Boot Sequence:
  Power ON
    → ROM Bootstrap program executes
    → Initializes CPU registers, memory, device controllers
    → Loads OS Kernel from disk into RAM
    → OS starts; creates 'init' process
    → System ready for use

Interrupt Flow:
  Device finishes I/O
    → Device controller raises interrupt signal
    → CPU completes current instruction
    → CPU saves state (registers + PC) to stack/PCB
    → CPU reads interrupt vector → gets ISR address
    → Jumps to ISR → handles interrupt
    → Restores CPU state → resumes original program

Interrupt Vector (conceptual):
  [0] → ISR for timer interrupt
  [1] → ISR for keyboard interrupt
  [2] → ISR for disk interrupt
  [14] → ISR for page fault (x86)`,
      explanation: "Interrupt vector = lookup table. Interrupt number → ISR address. Saves context first, always.",
    },
    examTips: [
      "Bootstrap stored in ROM/EEPROM — NOT on hard disk (it survives power-off)",
      "Interrupt vector = table of ISR addresses (NOT the ISR itself)",
      "Trap = software interrupt. Hardware interrupt = from device.",
      "OS saves state BEFORE handling interrupt (otherwise current process is corrupted)",
      "'The OS is interrupt-driven' — this exact phrase is exam material",
    ],
    questions: [
      { q: "Why is the bootstrap program stored in ROM/EEPROM?", a: "ROM/EEPROM is non-volatile — it retains its contents even when power is off. The bootstrap must be available immediately at power-on before any disk I/O can occur, so it can't be on the hard drive." },
      { q: "What is the difference between an interrupt and a trap?", a: "An interrupt is a hardware signal from a device (e.g., I/O completion, timer expiry). A trap (or exception) is a software-generated interrupt caused by a program error (divide by zero, invalid memory access) or an explicit system call request." },
    ],
  },

  "storage-struct": {
    title: "Storage Structure & Caching", emoji: "💾",
    tldr: "Storage hierarchy: Registers → Cache → RAM → SSD → HDD → Tape. Faster = smaller + costlier. Caching = copy to faster storage temporarily.",
    explanation: `Main Memory: The only large storage the CPU can directly access. Implemented with DRAM — volatile (loses content on power off). Also uses ROM and EEPROM for firmware.

Von Neumann Model: Fetch instruction from memory → Decode → Execute → repeat. This fetch-decode-execute cycle is the fundamental operation of all modern computers.

Storage Hierarchy (from fastest/smallest/most expensive to slowest/largest/cheapest):
Registers → Cache → Main Memory (RAM) → SSD → Hard Disk → Magnetic Tape

Secondary Storage: Extension of main memory. Provides large non-volatile storage. HDDs use magnetic platters (tracks → sectors). SSDs use flash memory. Disk controller manages interaction between disk and computer.

Caching: Copying frequently used data from slower to faster storage temporarily. The cache is always checked first — if data is there (cache hit), use it directly. If not (cache miss), copy from slower storage to cache, then use it. Cache management (size and replacement policy) is a critical design problem.`,
    keyPoints: [
      "Main memory = only storage CPU accesses directly. DRAM = volatile.",
      "Von Neumann: Fetch → Decode → Execute → repeat (instruction cycle)",
      "Storage hierarchy: Registers > Cache > RAM > SSD > HDD > Tape",
      "Hierarchy tradeoff: faster = smaller, more expensive, more volatile",
      "Cache: copy of data from slower storage in faster storage",
      "Cache hit: data found in cache → fast. Cache miss: go to slower storage.",
      "Secondary storage: non-volatile, large capacity (HDD/SSD)",
      "HDD: platters → tracks → sectors. Disk controller manages access.",
    ],
    formula: {
      code: `Storage Hierarchy (fastest → slowest):
  ┌────────────────────────────────────────────┐
  │ Registers    │ < 1ns  │ KBs     │ Volatile │
  │ Cache (L1-3) │ 1-10ns │ MBs     │ Volatile │
  │ Main Memory  │ 50-100ns│ GBs    │ Volatile │
  │ SSD          │ 0.1ms  │ GBs-TBs │ Non-vol  │
  │ Hard Disk    │ 5-20ms │ TBs     │ Non-vol  │
  │ Magnetic Tape│ minutes│ PBs     │ Non-vol  │
  └────────────────────────────────────────────┘

Von Neumann Cycle:
  PC → fetch instruction from memory
       → decode instruction
       → execute instruction
       → update PC
       → repeat

Caching Strategy:
  1. Check cache for data X
  2. Hit? → Use it (fast!)
  3. Miss? → Load from RAM/disk into cache → use it`,
      explanation: "Cache is smaller than storage being cached. Always a subset of slower storage.",
    },
    examTips: [
      "DRAM = main memory = volatile. ROM/EEPROM = non-volatile (firmware)",
      "Registers → Cache → RAM → SSD → HDD → Tape: know this order cold",
      "Von Neumann: Fetch, Decode, Execute — the instruction cycle",
      "Cache hit = data found in fast storage. Cache miss = must go to slow storage.",
      "Cache management = size + replacement policy (LRU, FIFO, etc.)",
    ],
    questions: [
      { q: "Why is main memory described as volatile?", a: "Main memory (DRAM) loses all its contents when power is removed. Data must be saved to non-volatile secondary storage (HDD/SSD) to persist across power cycles." },
      { q: "What is the Von Neumann model?", a: "The fundamental instruction execution cycle: the processor fetches an instruction from memory, decodes it, executes it, then repeats. This Fetch-Decode-Execute cycle continues until the program terminates. It is the basis of modern computer operation." },
    ],
  },

  "io-dma": {
    title: "I/O Structure & DMA", emoji: "📡",
    tldr: "Each device has a controller with local buffer. DMA: controller transfers full blocks to RAM without CPU. One interrupt per block (not per byte).",
    explanation: `I/O Structure:
A large portion of OS code manages I/O. A computer has CPUs + multiple device controllers connected via a common bus. Each device controller manages a specific device type (disk, keyboard, printer) and has local buffer storage + registers. A device driver provides a uniform interface between the controller and the OS kernel.

Two modes of I/O:
Synchronous I/O: after I/O starts, control returns to user only after I/O completes. CPU waits (idles) — only one I/O at a time.
Asynchronous I/O: after I/O starts, control returns to user WITHOUT waiting. System call lets user wait for I/O completion if needed. Device-status table tracks all I/O devices and their states.

Direct Memory Access (DMA):
Used for high-speed I/O (disks, network cards). The device controller transfers entire BLOCKS of data directly from its buffer to main memory WITHOUT CPU involvement. The CPU sets up the DMA transfer, then goes off and does other work. When done, only ONE interrupt is generated per block (not one per byte → massive reduction in interrupts).`,
    keyPoints: [
      "Device controller = manages specific device type + has local buffer",
      "Device driver = software interface between controller and OS kernel",
      "Synchronous I/O: CPU waits for I/O to complete before returning",
      "Asynchronous I/O: control returns immediately; process can do other work",
      "Device-status table: OS tracks state of every I/O device",
      "DMA: controller transfers block directly to RAM, NO CPU per byte",
      "DMA: ONE interrupt per block (not per byte) — huge efficiency gain",
      "DMA used for high-speed devices: disk, network, graphics",
    ],
    formula: {
      code: `Without DMA (Programmed I/O):
  CPU reads 1 byte → puts in RAM → reads next byte → ...
  → One interrupt (or polling) per byte → CPU very busy!

With DMA:
  CPU: "DMA controller, read 4096 bytes from disk to RAM@0x5000"
  DMA: transfers all 4096 bytes directly → RAM
  CPU: continues doing other work
  DMA: done! → generates ONE interrupt
  CPU: handles the one interrupt → continues

I/O Life cycle (simplified):
  Process → system call → kernel validates → device driver
  → device controller starts I/O → process BLOCKED
  → context switch (CPU runs another process)
  → device done → interrupt → ISR → process READY
  → scheduler → process RESUMES`,
      explanation: "DMA = device controller bypasses CPU to write to RAM. 1 interrupt per block = N×8 bytes of data with just 1 interrupt.",
    },
    examTips: [
      "DMA: ONE interrupt per BLOCK (not per byte) — this is the key advantage",
      "DMA: CPU not involved in data transfer (just setup + final interrupt)",
      "Without DMA: one interrupt per byte = CPU is overwhelmed for large transfers",
      "Device driver = software. Device controller = hardware.",
    ],
    questions: [
      { q: "What is the key advantage of DMA over regular programmed I/O?", a: "With regular I/O, the CPU handles data byte-by-byte and gets interrupted for each byte (or polls continuously). With DMA, the device controller transfers entire blocks of data directly to RAM without CPU involvement. Only ONE interrupt is generated per block — dramatically reducing CPU overhead for large data transfers." },
    ],
  },

  "multiprocessor": {
    title: "Multiprocessor Systems", emoji: "🔢",
    tldr: "SMP: all processors equal, all run all tasks. AMP: boss-worker, one master. Multi-core: multiple CPUs on one chip.",
    explanation: `Most systems use a single general-purpose processor. But many also have special-purpose processors (disk controllers, keyboard controllers, GPU cores) — these are managed by the OS but run limited instruction sets.

Multiprocessor Systems (parallel/tightly-coupled systems):
Advantages: Increased throughput, Economy of scale, Increased reliability (graceful degradation / fault tolerance).

Two types:
1. Asymmetric Multiprocessing (AMP): one master processor handles scheduling, I/O, and OS decisions. Other processors execute only user code. Simple — no data sharing needed between processors.

2. Symmetric Multiprocessing (SMP): all processors are equal peers. Each has its own registers and local cache. All share physical memory. All processors can run any task. Modern systems use SMP.

Clustered Systems: Multiple complete systems working together, sharing storage via SAN (Storage Area Network). Provides high availability. Asymmetric clustering = one machine in hot-standby. Symmetric clustering = multiple nodes, all active, monitoring each other.`,
    keyPoints: [
      "AMP: one master processor, others run user code only",
      "SMP: all processors are equal peers, share memory, all run any task",
      "SMP: each processor has own registers + local cache",
      "Multiprocessor advantages: throughput, economy of scale, reliability",
      "Graceful degradation: system continues even if some hardware fails",
      "Clustered system: multiple complete systems sharing SAN storage",
      "Asymmetric cluster: one hot-standby machine. Symmetric: all active.",
      "DLM (Distributed Lock Manager): prevents conflicting operations on shared storage",
    ],
    formula: {
      code: `AMP (Asymmetric):
  [Master CPU] ← runs OS, scheduling, I/O decisions
  [Slave CPU1] ← runs user code only
  [Slave CPU2] ← runs user code only
  Simple: only master touches system data structures

SMP (Symmetric):
  [CPU0] ←─┐
  [CPU1] ←─┤── All share main memory
  [CPU2] ←─┤── All can run any task
  [CPU3] ←─┘── Each has private L1/L2 cache
  Complex: need synchronization for shared data

Clustered System:
  [Node1] ─┐
  [Node2] ─┤── SAN (Storage Area Network)
  [Node3] ─┘   (shared disk pool)`,
      explanation: "SMP = all processors equal. AMP = boss-worker. Modern systems are all SMP.",
    },
    examTips: [
      "SMP: processors are PEERS (no master-slave). AMP: one master.",
      "SMP: each CPU has own cache. ALL share physical memory.",
      "SMP requires synchronization. AMP is simpler (only master accesses shared OS data).",
      "Clustered = multiple systems + SAN. High availability via failover.",
    ],
    questions: [
      { q: "What is the difference between AMP and SMP?", a: "AMP (Asymmetric): one master processor handles all OS decisions (scheduling, I/O); other processors execute only user code. SMP (Symmetric): all processors are equal peers — each can run any task, all share physical memory, each has its own cache. SMP is more complex but more powerful and used in modern systems." },
    ],
  },

  "multicore-cluster": {
    title: "Multi-Core & Clustered Systems", emoji: "🧩",
    tldr: "Multi-core: multiple CPUs on one chip (faster inter-CPU comms, less power). Blade servers: multiple boards in one chassis.",
    explanation: `Multi-Core Design:
Recent CPUs include multiple computing cores on a single chip. More efficient than multiple single-core chips because:
1. On-chip communication is faster than between-chip communication
2. One chip with multiple cores uses significantly less power than multiple single-core chips

A dual-core chip has two complete CPUs sharing the same die. You can check core info on Linux with: cat /proc/cpuinfo

Blade Servers:
Multiple processor boards, I/O boards, and networking boards in the same chassis. Each blade boots independently with its own OS. Some blades are themselves multiprocessor. Essentially: multiple independent multiprocessor systems in one box.

Command to see CPU/core info: $cat /proc/cpuinfo | more or $more /proc/cpuinfo`,
    keyPoints: [
      "Multi-core: multiple CPU cores on single chip",
      "On-chip communication faster than between-chip communication",
      "Multi-core uses less power than multiple single-core chips",
      "Linux command: cat /proc/cpuinfo — shows core count, cache info",
      "Blade server: multiple processor boards in one chassis",
      "Each blade board boots independently with its own OS",
      "Blade servers = multiple independent multiprocessor systems in one enclosure",
    ],
    formula: {
      code: `Multi-core chip (dual-core example):
  ┌───────────────────────────────────────┐
  │              Single Chip              │
  │  ┌──────────┐        ┌──────────┐    │
  │  │  Core 0  │        │  Core 1  │    │
  │  │  (CPU)   │        │  (CPU)   │    │
  │  └────┬─────┘        └─────┬────┘    │
  │       └──── Shared L3 Cache ─────┘   │
  │              │                        │
  └──────────────┼────────────────────────┘
                 │
           Main Memory (RAM)

Linux Commands:
  cat /proc/cpuinfo | more    → shows each CPU core details
  nproc                       → count of logical CPUs
  lscpu                       → detailed CPU architecture info`,
      explanation: "Cores share L3 cache on same chip → fast communication. Multiple chips = separate buses → slower.",
    },
    examTips: [
      "Multi-core advantage: on-chip comms FASTER + less POWER than multi-chip",
      "cat /proc/cpuinfo — the Linux command to see CPU/core details",
      "Each blade server board = independent OS boot (not like a cluster sharing one OS)",
    ],
    questions: [
      { q: "Why are multi-core chips more efficient than multiple single-core chips?", a: "Two reasons: (1) On-chip communication between cores is much faster than between separate chips (no external bus needed). (2) A single multi-core chip consumes significantly less power than multiple single-core chips providing the same total computing power." },
    ],
  },

  "dual-mode-timer": {
    title: "Dual-Mode Operation & Timer", emoji: "🔐",
    tldr: "Two modes: User mode (mode bit=1) and Kernel mode (mode bit=0). System call switches to kernel mode. Timer prevents infinite loops.",
    explanation: `Dual-Mode Operation:
To protect the OS from user programs (and users from each other), modern hardware supports at least two modes: User Mode and Kernel Mode. A hardware mode bit indicates current mode: 0 = Kernel mode, 1 = User mode.

Privileged instructions can ONLY execute in kernel mode (e.g., I/O instructions, modifying mode bit, disabling interrupts). If a user program tries a privileged instruction, hardware causes a trap (exception).

Transition: User program makes a system call → hardware switches mode bit to 0 (kernel mode) → OS handles request → returns to user mode (mode bit = 1).

Why? This prevents user programs from directly controlling hardware, corrupting OS data, or accessing other processes' memory.

Timer:
Prevents a process from hogging the CPU (infinite loop or malicious code). A timer generates an interrupt after a specified period (fixed: 1/60 sec, or variable: 1ms to 1sec). A variable timer uses a fixed-rate clock + a counter: OS sets the counter (privileged instruction). Each clock tick decrements counter. When counter = 0 → interrupt → OS regains control.`,
    keyPoints: [
      "User mode: mode bit = 1. Kernel mode: mode bit = 0.",
      "Privileged instructions: ONLY executable in kernel mode",
      "System call: switches from user mode → kernel mode",
      "Return from system call: switches kernel mode → user mode",
      "Trap: user program tries privileged instruction → hardware exception",
      "Timer: generates interrupt after set period — prevents infinite loops",
      "Variable timer: fixed clock + counter (OS sets counter, privileged)",
      "Counter reaches 0 → interrupt → OS takes back CPU",
    ],
    formula: {
      code: `Mode Bit Transitions:
  User Program (mode=1)
    → makes system call (e.g., read())
    → hardware sets mode bit to 0 (kernel mode)
    → OS kernel handles request
    → sets mode bit to 1 (user mode)
    → returns to user program

  Privileged instruction attempt by user program:
    → hardware detects mode bit = 1
    → generates TRAP (exception)
    → OS handles trap (usually terminates program)

Timer Operation:
  OS loads counter = 1000 (privileged instruction)
  clock tick: counter = 999
  clock tick: counter = 998
  ...
  clock tick: counter = 0
  → INTERRUPT → OS regains control
  → OS decides: give more time or switch process`,
      explanation: "Mode bit = 1 means user mode (restricted). Mode bit = 0 means kernel mode (privileged). Hardware enforces this.",
    },
    examTips: [
      "Mode bit: 0 = kernel mode (privileged). 1 = user mode (restricted). MEMORIZE.",
      "System call → user→kernel. Return → kernel→user.",
      "Timer is a MECHANISM. The time limit policy is set by OS (privileged).",
      "Without timer: one malicious/buggy program could freeze the entire system",
    ],
    questions: [
      { q: "What is the purpose of the dual-mode operation in OS design?", a: "Dual-mode (user/kernel) protects the OS and hardware from user programs. Privileged instructions (I/O, memory management, interrupt handling) can only run in kernel mode. User programs run in user mode — if they try privileged operations, hardware generates a trap and the OS handles it. This prevents accidental or malicious damage." },
      { q: "How does the timer prevent a process from monopolizing the CPU?", a: "The OS sets a hardware counter (privileged instruction). Each clock tick decrements it. When it reaches 0, a hardware interrupt fires, transferring control to the OS. The OS can then preempt the process, schedule another, or give more time — preventing any single process from running forever." },
    ],
  },

  "multiprog-multitask": {
    title: "Multiprogramming & Multitasking", emoji: "⚡",
    tldr: "Multiprogramming: keep CPU always busy by switching when process waits. Multitasking (timesharing): switch so fast users can interact with each job.",
    explanation: `Multiprogramming (Batch):
A single user cannot keep both CPU and I/O devices busy at all times. Multiprogramming organizes multiple jobs in memory so the CPU always has something to execute. When one job waits for I/O, the OS switches the CPU to another job — keeping CPU utilization high.

A subset of all jobs is kept in memory. One job is selected and run. When it has to wait (for I/O), OS switches to another job. This is job scheduling.

Multitasking (Timesharing):
Logical extension of multiprogramming. The CPU switches between jobs so frequently that users can interact with each job while it runs — creating interactive computing. Response time should be < 1 second.

Each user has at least one program in memory (called a process). If several jobs are ready → CPU scheduling decides which runs. If processes don't fit in memory → swapping (move some to disk temporarily). Virtual memory: allows execution of processes not completely in memory.`,
    keyPoints: [
      "Multiprogramming: keep CPU busy by switching when process waits for I/O",
      "Multiprogramming = batch system. Jobs organized in memory.",
      "Multitasking = timesharing. Switch fast enough for interactive use.",
      "Response time in timesharing: < 1 second",
      "CPU scheduling: decides which process gets CPU when multiple are ready",
      "Swapping: move processes between memory and disk when memory full",
      "Virtual memory: run processes not entirely loaded in memory",
      "Multiprogramming → CPU utilization. Multitasking → user interactivity.",
    ],
    formula: {
      code: `Multiprogramming (no interaction):
  [Job1: running] → waits for I/O
  [Job2: running] → waits for I/O
  [Job3: running] → ...
  CPU always busy! (no idle time)

Multitasking (timesharing):
  t=0ms:  Job1 runs
  t=10ms: Job1 timer fires → Job2 runs
  t=20ms: Job2 timer fires → Job3 runs
  t=30ms: Job3 timer fires → Job1 runs
  User sees: all 3 running "simultaneously"
  Response time: <1 second ← KEY METRIC

Virtual Memory:
  Physical RAM: 4GB
  Sum of all process sizes: 10GB
  → Virtual memory maps what's NEEDED into RAM
  → Rest stays on disk (demand paging)`,
      explanation: "Multiprogramming = efficiency. Multitasking = responsiveness. Virtual memory = run bigger-than-RAM processes.",
    },
    examTips: [
      "Multiprogramming ≠ multitasking: batch efficiency vs interactive responsiveness",
      "Timesharing response time: < 1 second (this number matters in exams)",
      "Virtual memory: allows running processes LARGER than physical RAM",
      "Swapping: entire process in/out of memory (different from virtual memory paging)",
    ],
    questions: [
      { q: "What is the difference between multiprogramming and multitasking (timesharing)?", a: "Multiprogramming: multiple jobs kept in memory; when one waits for I/O, CPU switches to another. Goal = maximize CPU utilization. Multitasking (timesharing): CPU switches so rapidly between jobs that users can interact with each. Goal = response time < 1 second. Multitasking is an interactive extension of multiprogramming." },
    ],
  },

  "os-services": {
    title: "OS Services", emoji: "🛎️",
    tldr: "OS provides: UI, program execution, I/O ops, file system manipulation, communications, error detection, resource allocation, accounting, protection & security.",
    explanation: `OS services fall into two categories:

Services that help the USER:
1. User Interface (UI): Command-Line (CLI/shell), GUI, Batch
2. Program Execution: load into memory, run, end (normal or abnormal)
3. I/O Operations: programs need I/O — OS provides safe access
4. File-system Manipulation: read/write files and directories, create/delete, search, permissions
5. Communications: processes exchange information — via shared memory OR message passing
6. Error Detection: CPU/memory errors, I/O device errors, user program errors — OS responds appropriately

Services for EFFICIENT SYSTEM OPERATION:
7. Resource Allocation: when multiple users/jobs run concurrently, allocate CPU, memory, I/O fairly
8. Accounting: track who uses what resources (for billing or statistics)
9. Protection & Security: control access to resources; authenticate users; defend from external attacks`,
    keyPoints: [
      "UI: CLI (shell), GUI, or Batch — almost all OSes have some UI",
      "Program execution: OS loads program → runs → handles termination",
      "I/O operations: OS provides safe interface — programs don't access hardware directly",
      "File system: read/write/create/delete/search/permissions",
      "Communications: shared memory OR message passing (2 mechanisms)",
      "Error detection: responds to hardware faults, software errors consistently",
      "Resource allocation: CPU cycles, memory, I/O devices — allocated fairly",
      "Accounting: tracks resource usage (CPU time, memory used)",
      "Protection: control access to resources. Security: user authentication, external threats.",
    ],
    formula: null,
    examTips: [
      "9 OS services — categorize into user-facing (6) and efficiency-focused (3)",
      "Communications: 2 methods — shared memory AND message passing",
      "Protection = internal (access control). Security = external (authentication, attacks).",
      "Error detection is DIFFERENT from protection — it's about reliability",
    ],
    questions: [
      { q: "List the 9 main OS services and categorize them.", a: "User-facing: (1) UI, (2) Program execution, (3) I/O operations, (4) File-system manipulation, (5) Communications, (6) Error detection. Efficiency-focused: (7) Resource allocation, (8) Accounting, (9) Protection and security." },
    ],
  },

  "syscalls": {
    title: "System Calls", emoji: "📞",
    tldr: "System calls = interface to OS services. Written in C/C++. 6 categories: Process control, File, Device, Information, Communications, Protection.",
    explanation: `System calls provide the programmatic interface between user programs and the OS kernel. They are generally available as routines written in C/C++ (or assembly for low-level). 

When a user program calls printf(), the C library intercepts it and invokes the write() system call → OS kernel executes it → returns result to C library → returns to user.

6 categories of system calls:
1. Process Control: create/terminate process (fork, exit, wait), load/execute (exec), get/set attributes
2. File Manipulation: create/delete file, open/close, read/write/reposition, get/set attributes
3. Device Manipulation: request/release device, read/write/reposition, get/set attributes
4. Information Maintenance: get/set time, date, system data, process/file/device attributes
5. Communications: create/delete connection, send/receive messages, transfer status info
6. Protection: get/set permissions, allow/deny resource access

System call interface: user program → library call → system call (trap) → kernel → returns.`,
    keyPoints: [
      "System call = the interface between user programs and OS services",
      "Written in C/C++ (or assembly for low-level access)",
      "6 categories: Process, File, Device, Information, Communications, Protection",
      "printf() → C library → write() system call → OS kernel",
      "System call causes mode switch: user mode → kernel mode",
      "Return from system call: kernel mode → user mode",
      "fork(): creates new process. exec(): replaces process image. exit(): terminates.",
      "open(), read(), write(), close() — file manipulation system calls",
    ],
    formula: {
      code: `System Call Flow (printf example):
  User program calls printf("Hello")
    → C Library: formats string, calls write()
    → write() issues TRAP instruction
    → Hardware: mode bit 1→0 (user→kernel)
    → Kernel: handles write to stdout (screen)
    → Returns result to C library
    → Mode bit 0→1 (kernel→user)
    → C library returns to user program

6 Categories:
  1. Process Control:  fork, exit, wait, exec, getpid
  2. File Manipulation: open, read, write, close, unlink
  3. Device Manipulation: ioctl, read, write (device)
  4. Information: getpid, alarm, sleep, time
  5. Communications: socket, send, recv, pipe
  6. Protection: chmod, chown, setuid`,
      explanation: "Every system call crosses the user→kernel boundary via a software trap (INT instruction on x86).",
    },
    examTips: [
      "6 categories — memorize: Process, File, Device, Information, Communications, Protection",
      "printf() is NOT a system call — it's a C library function that CALLS write()",
      "System call = software trap = mode switch from user to kernel",
      "fork() return: child gets 0, parent gets child's PID, error gets -1",
    ],
    questions: [
      { q: "What are the 6 categories of system calls? Give one example each.", a: "1. Process Control: fork(). 2. File Manipulation: open(). 3. Device Manipulation: ioctl(). 4. Information Maintenance: getpid(). 5. Communications: socket(). 6. Protection: chmod()." },
      { q: "Is printf() a system call?", a: "No. printf() is a C standard library function. It formats the string and then internally calls the write() system call to actually send data to the output device. The system call is write(), not printf()." },
    ],
  },

  "policy-mechanism": {
    title: "Policy vs Mechanism & OS Implementation", emoji: "⚙️",
    tldr: "Policy = WHAT to do. Mechanism = HOW to do it. Separate them for flexibility. OS mostly in C, lowest level in assembly.",
    explanation: `Policy vs Mechanism — the most important design principle in OS:
Policy: What will be done? (decision-making) Example: "Allow user program to run for at most 30 minutes"
Mechanism: How to do it? (implementation) Example: The timer hardware + counter system

Separation of policy from mechanism = maximum flexibility. If someone wants a different policy (e.g., "limit to 1 hour"), you don't need to change the timer (mechanism) — just change the setting.

OS Implementation:
Early OSes: entirely in assembly language. Then: system programming languages (Algol, PL/1). Now: mostly C/C++.

Typical mix: lowest-level code in assembly (performance-critical, hardware-specific), main body in C, system programs in C/C++/scripting (Python, shell scripts, PERL).

More high-level language → easier to port to other hardware, but potentially slower. Emulation: allows OS to run on non-native hardware.`,
    keyPoints: [
      "Policy = WHAT to do. Mechanism = HOW to do it. They must be SEPARATE.",
      "Separation allows: change policy without changing mechanism",
      "Example: timer mechanism stays same; time limit policy can change",
      "OS implementation: mostly C/C++",
      "Lowest levels: assembly. Main body: C. System programs: C/C++/scripts",
      "High-level language → easier portability, potentially slower",
      "Emulation: run OS on non-native hardware (e.g., PowerPC code on Intel)",
    ],
    formula: null,
    examTips: [
      "Policy = WHAT. Mechanism = HOW. This distinction = always examinable",
      "'Separation of policy from mechanism = maximum flexibility' — quote this",
      "Timer: policy = time limit value. Mechanism = the counter + clock hardware.",
      "OS written in C = easier to PORT (compile for ARM, x86, etc.)",
    ],
    questions: [
      { q: "Why is separating policy from mechanism important?", a: "Separation allows the policy to change without modifying the underlying mechanism. For example, the timer mechanism (hardware counter + clock) stays the same whether the policy is '10ms timeslice' or '100ms timeslice'. This flexibility allows OS designers to tune behavior without rebuilding core components." },
    ],
  },

  "arrays-lists": {
    title: "Kernel Data Structures — Arrays & Lists", emoji: "📋",
    tldr: "Array: O(1) direct access, fixed size. Linked list: O(n) traversal, dynamic size, easy insert/delete.",
    explanation: `The OS kernel uses standard data structures extensively to manage resources.

Array: simplest data structure — each element accessed directly by index. Main memory is implemented as an array (item number × item size = address). Problem: fixed size, can't store variable-size items, removing while preserving order is expensive.

Linked Lists: items accessed in order, connected by pointers.
Singly linked list: each item points to its successor (one direction only).
Doubly linked list: each item points to both predecessor and successor.
Circular linked list: last element points back to first (not null).

Advantages of linked lists: accommodate variable-sized items, easy insertion/deletion.
Disadvantage: O(n) search — must traverse up to n elements to find specific item.
Usage: kernel algorithms, building stacks and queues.`,
    keyPoints: [
      "Array: O(1) direct access by index. Fixed size. Main memory uses array model.",
      "Array problem: variable sizes, maintaining order on deletion is expensive",
      "Singly linked: each item → successor. O(n) traversal.",
      "Doubly linked: each item ← → predecessor AND successor",
      "Circular linked: last → first (not null). No end pointer needed.",
      "Linked list advantages: variable sizes, easy insert/delete",
      "Linked list disadvantage: O(n) search (no direct access)",
      "Kernel uses linked lists for: process lists, file descriptors, I/O queues",
    ],
    formula: {
      code: `Array access: address = base + (index × item_size)
  Example: int arr[10] at address 0x1000, item=4B
  arr[3] = 0x1000 + (3 × 4) = 0x100C  ← O(1) direct!

Singly Linked List:
  [data|next] → [data|next] → [data|next] → NULL
  Search: must traverse from head → O(n)
  Insert/Delete at known position: O(1) (just update pointers)

Doubly Linked List (Linux uses this for task list):
  NULL ← [prev|data|next] ↔ [prev|data|next] → NULL

Circular List:
  [data|next] → [data|next] → [data|next] ─┐
       ↑────────────────────────────────────┘`,
      explanation: "Linux kernel represents process list as a doubly-linked circular list of task_struct nodes.",
    },
    examTips: [
      "Array: O(1) access. Linked list: O(n) search.",
      "Doubly linked: can go forward AND backward (singly: only forward)",
      "Circular: last element points to FIRST (not null)",
      "Linked lists used in kernel for variable-size items and frequent insert/delete",
    ],
    questions: [
      { q: "What are the advantages and disadvantages of linked lists over arrays in OS context?", a: "Advantages: (1) Accommodate items of varying sizes. (2) Allow easy O(1) insertion and deletion at known positions. Disadvantages: (1) O(n) retrieval of a specific item (must traverse from head). (2) Extra memory per node for pointer storage." },
    ],
  },

  "stacks-queues-trees": {
    title: "Stacks, Queues, Trees", emoji: "🌳",
    tldr: "Stack: LIFO (function calls). Queue: FIFO (ready queue, printer). BST: O(log n) search. Linux uses balanced BST for CPU scheduling.",
    explanation: `Stack: LIFO (Last In, First Out). OS uses stacks for function calls — parameters, local variables, and return addresses are pushed when a function is called and popped on return.

Queue: FIFO (First In, First Out). Processes waiting for CPU are in ready queues. Print jobs are printed in order of submission.

Trees: hierarchical data structure. Nodes connected by parent-child relationships.
Binary Search Tree (BST): left child ≤ right child. O(n) worst case search.
Balanced BST: tree of n items has ≤ log n levels. O(log n) search, insert, delete.
Linux CFS (Completely Fair Scheduler) uses a balanced BST (red-black tree) to select which task to run next — leftmost node (lowest vruntime) is always the next task.`,
    keyPoints: [
      "Stack: LIFO. OS: function call frames (parameters, local vars, return addr)",
      "Queue: FIFO. OS: ready queue (CPU), device queues, print spooler",
      "BST: left ≤ right. O(n) worst case. Balanced BST: O(log n).",
      "Balanced BST: n items → at most log n levels → O(log n) search",
      "Linux CFS uses red-black tree (balanced BST): leftmost = next to run",
      "Each tree operation (insert, delete, find min) = O(log n) in balanced BST",
    ],
    formula: {
      code: `Stack (LIFO - function calls):
  void foo() {
    int x = 5;      // pushed to stack
    bar();          // return address pushed
  }                 // all popped on return

Queue (FIFO - ready queue):
  [P1]→[P2]→[P3]→[P4]
   ↑                 ↑
  dequeue (run)   enqueue (new arrival)

BST Search Performance:
  Unbalanced BST (worst case):
    1 → 2 → 3 → 4 → 5    ← just a linked list! O(n)
  Balanced BST (AVL or Red-Black):
         3
        / \\
       2   4
      /     \\
     1       5          O(log n) guaranteed

Linux CFS: balanced BST (Red-Black tree)
  leftmost node = task with lowest vruntime = next to run
  Insertion/deletion: O(log N), N = runnable tasks`,
      explanation: "Balanced BST guarantees O(log n). Linux CFS leftmost node selection = O(1) with cached pointer.",
    },
    examTips: [
      "Stack = LIFO. Queue = FIFO. Both used heavily in OS.",
      "BST search: O(n) worst. Balanced BST: O(log n) guaranteed.",
      "Linux CFS uses balanced BST (red-black tree) — leftmost = next process to run",
      "Function calls: stack-based (parameters, locals, return address all on stack)",
    ],
    questions: [
      { q: "Why does Linux CFS use a balanced BST instead of a simple queue?", a: "CFS needs to find the task with the minimum vruntime efficiently. A balanced BST provides O(log n) insertion and O(1) minimum lookup (cached leftmost node), making scheduling decisions fast even with many runnable tasks. A simple queue would be O(n) to find the minimum." },
    ],
  },

  "hash-bitmap": {
    title: "Hash Functions, Maps & Bitmaps", emoji: "#️⃣",
    tldr: "Hash map: O(1) key-value lookup. Bitmap: 1 bit per resource (0=available, 1=unavailable). Used for disk block tracking.",
    explanation: `Hash Functions and Hash Maps:
A hash function maps a key to a hash value (table index). This allows O(1) average-case lookup. Problem: hash collisions (two different keys map to same output value). Handled by chaining or open addressing.

Hash Map: maps key-value pairs using a hash function. Example: OS uses hash maps to look up process IDs, file descriptor tables, etc. Search performance: O(1) average case.

Bitmaps:
A bitmap is a string of n binary digits representing the status of n items. Each bit = one resource.
0 = resource is AVAILABLE (Note: different from file protection bit convention!)
1 = resource is UNAVAILABLE

Example: bitmap 001011101 means:
Positions 0,1,3,6 are available (bit=0). Positions 2,4,5,7,8 are unavailable (bit=1).

Commonly used to track disk block availability, memory page allocation, and other large resource sets.`,
    keyPoints: [
      "Hash function: key → hash value (table index). O(1) lookup average.",
      "Hash collision: two keys map to same output → handled by chaining",
      "Hash map: O(1) key-value lookup. Used for PID tables, file descriptors.",
      "Bitmap: n bits representing n resources. 1 bit per resource.",
      "Bitmap: 0 = AVAILABLE. 1 = UNAVAILABLE. (memorize this!)",
      "Bitmap example: 001011101 → positions 0,1,3,6 available; 2,4,5,7,8 unavailable",
      "Bitmap used for: disk blocks, memory pages, any large set of resources",
    ],
    formula: {
      code: `Hash Map (O(1) lookup):
  key: "process_name"
  hash("process_name") = 42
  table[42] = {pid: 1234, state: "running", ...}
  
  Lookup: O(1) average (collision = O(n) worst)

Bitmap (resource tracking):
  9 resources: 0 0 1 0 1 1 1 0 1
  Position:    0 1 2 3 4 5 6 7 8
  
  0 = AVAILABLE: positions 0, 1, 3, 7 are free
  1 = UNAVAILABLE: positions 2, 4, 5, 6, 8 are in use
  
  To find free resource: scan for first 0 → position 0
  To allocate: set bit to 1
  To free: set bit to 0

Disk Block Bitmap (1TB disk, 4KB blocks):
  256M blocks → 256M bits → 32MB bitmap in memory`,
      explanation: "Bitmap bit=0 means available. Opposite of some other conventions — memorize carefully.",
    },
    examTips: [
      "Bitmap: 0 = AVAILABLE, 1 = UNAVAILABLE (note: opposite of file protection bitmap!)",
      "Hash map: O(1) search (best for large lookup tables in OS)",
      "Example: bitmap 001011101 — positions 2,4,5,6,8 unavailable (bit=1)",
      "OS uses bitmaps for disk block tracking and memory page tracking",
    ],
    questions: [
      { q: "In a kernel bitmap, what does a 0 bit represent?", a: "In kernel resource bitmaps, 0 means the resource is AVAILABLE and 1 means UNAVAILABLE. Example: bitmap 001011101 → positions with 0 (0,1,3,7) are free resources; positions with 1 (2,4,5,6,8) are currently in use." },
    ],
  },

  "trad-mobile": {
    title: "Computing Environments: Traditional, Mobile, Distributed", emoji: "🌍",
    tldr: "Traditional: standalone PCs. Mobile: iOS/Android, GPS/gyro. Distributed: LAN/WAN, TCP/IP, illusion of single system.",
    explanation: `Traditional Computing: Stand-alone general-purpose machines. Now interconnected via Internet. Portals provide web access to internal systems. Network computers (thin clients) like web terminals. Mobile computers use wireless. Home systems use firewalls.

Mobile Computing: Handheld smartphones and tablets. Extra hardware features (GPS, gyroscope, accelerometer) enable new app types (AR, navigation). Use IEEE 802.11 WiFi or cellular data. Leaders: Apple iOS, Google Android.

Distributed Computing: Collection of separate, possibly heterogeneous systems networked together. Network = communications path (TCP/IP most common). Types of networks: LAN (Local Area Network), WAN (Wide Area Network), MAN (Metropolitan), PAN (Personal). Network OS provides features across the network. Key goal: illusion of a single unified system.`,
    keyPoints: [
      "Traditional: standalone PCs, firewalls protect home systems",
      "Mobile: smartphones/tablets, GPS+gyroscope, IEEE 802.11, iOS/Android",
      "Distributed: separate systems on TCP/IP network, heterogeneous OK",
      "LAN: local. WAN: wide area. MAN: city. PAN: personal (Bluetooth range)",
      "Network OS: provides interface/features between distributed systems",
      "Distributed goal: illusion of a single unified system",
      "TCP/IP: most common network protocol",
    ],
    formula: null,
    examTips: [
      "Mobile: extra sensors (GPS, gyroscope) = new app types (AR, navigation)",
      "Distributed = heterogeneous systems on TCP/IP. Goal = single system illusion.",
      "LAN vs WAN vs MAN vs PAN — know the geographic scale of each",
      "iOS and Android are the two mobile OS leaders (exam fact)",
    ],
    questions: [
      { q: "What is a distributed computing environment?", a: "A collection of separate, possibly heterogeneous (different hardware/software) systems networked together via TCP/IP. A Network OS provides features across systems. The goal is to create an illusion of a single unified system where users and programs can access resources anywhere on the network transparently." },
    ],
  },

  "client-server-p2p": {
    title: "Client-Server, P2P, Virtualization & Cloud", emoji: "☁️",
    tldr: "Client-server: servers respond to client requests. P2P: all nodes equal (no clients/servers). Cloud: IaaS/PaaS/SaaS. VM: run OS inside OS.",
    explanation: `Client-Server Computing: Dumb terminals replaced by smart PCs. Many systems now act as servers responding to client requests. Compute-server: provides computation services (databases). File-server: clients store/retrieve files.

Peer-to-Peer (P2P): All nodes are equal peers — no distinction between client and server. Each node may act as client, server, or both. To join: register with central lookup service OR broadcast and use discovery protocol. Examples: Napster, Gnutella, Skype (VoIP).

Virtualization: Allows OSes to run applications within other OSes. VMM (Virtual Machine Manager) provides virtualization services. Emulation: source CPU ≠ target CPU (e.g., PowerPC → x86). Interpretation: language not compiled to native code. Use cases: running multiple OSes, QA testing, compatibility.

Cloud Computing: Logical extension of virtualization. Delivers computing/storage/apps as a service over Internet. Amazon EC2: thousands of servers, millions of VMs. Types: Public (anyone, pay-per-use), Private (company internal), Hybrid (both). Service models: SaaS (apps), PaaS (software stack), IaaS (servers/storage).`,
    keyPoints: [
      "Client-server: compute-server (computation) + file-server (storage)",
      "P2P: all nodes are peers. No dedicated clients or servers.",
      "P2P: join via central lookup OR broadcast/discovery protocol",
      "P2P examples: Napster, Gnutella, Skype",
      "Virtualization: OS runs inside another OS via VMM",
      "Emulation: different CPU architectures (slow). Interpretation: non-native code.",
      "Cloud: IaaS (servers/storage), PaaS (software stack), SaaS (apps)",
      "Cloud types: Public, Private, Hybrid",
    ],
    formula: {
      code: `Client-Server:
  [Client: browser] → request → [Web Server]
  [Client: app]     → query  → [Database Server]

P2P (e.g., BitTorrent):
  NodeA ↔ NodeB ↔ NodeC ↔ NodeD
  Any node can upload (server) or download (client)

Virtualization Stack:
  [App A] [App B]  ← guest apps
  [Guest OS]       ← Windows XP (guest)
  [VMM/Hypervisor] ← VMware, VirtualBox
  [Host OS]        ← Windows 11 (host)
  [Hardware]       ← actual CPU + RAM

Cloud Service Models:
  SaaS: Google Docs (you use the app, manage nothing)
  PaaS: Google App Engine (you write code, they manage OS/DB)
  IaaS: Amazon EC2 (you manage OS+apps, they manage hardware)`,
      explanation: "IaaS = most control. PaaS = middleware control. SaaS = just use the app, no control over infrastructure.",
    },
    examTips: [
      "P2P: ALL nodes are peers. No dedicated server. Examples: Napster, Skype.",
      "Cloud types: Public/Private/Hybrid. Service models: IaaS/PaaS/SaaS — know all 6.",
      "Emulation = different CPU architectures (slowest). Virtualization = same CPU (fast).",
      "VMM = Virtual Machine Manager = hypervisor. Manages guest OSes.",
    ],
    questions: [
      { q: "What is the difference between IaaS, PaaS, and SaaS?", a: "IaaS (Infrastructure as a Service): provides servers/storage over internet; user manages OS and applications (e.g., Amazon EC2). PaaS (Platform as a Service): provides a software stack ready for application use; user writes code, provider manages OS/DB (e.g., Google App Engine). SaaS (Software as a Service): one or more applications available via internet; user just uses the app (e.g., Google Docs)." },
    ],
  },

  "virt-cloud": {
    title: "Real-Time Embedded Systems & OS Design", emoji: "⏱️",
    tldr: "Real-time OS: hard time constraints. Processing must complete within constraint. Correct operation requires constraint met.",
    explanation: `Real-Time Embedded Systems: the most prevalent form of computers overall (cars, appliances, industrial controllers, medical devices). They have special-purpose, limited OS, or no OS at all. Use expanding rapidly.

Real-Time OS: has well-defined, fixed time constraints. Processing MUST be done within the constraint. Correct operation = processing completed within time constraint. (If not done in time = WRONG, even if correct result.)

Two types of real-time systems:
Hard real-time: missing a deadline = system failure. Used in flight control, pacemakers, nuclear reactor control.
Soft real-time: missing a deadline = degraded performance but not catastrophic. Used in multimedia, video streaming.

OS Design Considerations for Embedded/Real-time:
- Must be lean and fast (no unnecessary features)
- Predictable response times (no unbounded delays)
- Often use priority-based preemptive scheduling
- Memory management may be simplified or absent`,
    keyPoints: [
      "Real-time embedded = most prevalent type of computer",
      "Real-time OS: hard, well-defined time constraints",
      "Correct operation = processing DONE within time constraint",
      "Hard real-time: missing deadline = system failure (pacemaker, flight control)",
      "Soft real-time: missing deadline = degraded performance only (video streaming)",
      "Embedded systems: special-purpose, limited/no OS",
    ],
    formula: null,
    examTips: [
      "Real-time: correct result + on TIME. Late result = wrong result in hard real-time.",
      "Hard real-time: deadline miss = FAILURE. Soft: deadline miss = degraded quality.",
      "Embedded systems = most prevalent computers (more than PCs/phones combined)",
    ],
    questions: [
      { q: "What defines a real-time operating system?", a: "A real-time OS has well-defined, fixed time constraints. Processing must be done within the constraint — correctness is defined as producing the right result AND delivering it within the time limit. In hard real-time systems, missing a deadline is considered a system failure. In soft real-time systems, missing a deadline causes degraded performance but is not catastrophic." },
    ],
  },

  "process-concept": {
    title: "Process Concept", emoji: "🔄",
    tldr: "Process = program in execution. Program = passive (disk). Process = active (memory). Memory layout: text, data, heap, stack.",
    explanation: `A program is a passive entity stored on disk (an executable file). A process is an active entity — a program loaded into memory and executing. One program can become multiple processes (e.g., multiple users running the same editor).

Process memory layout (bottom to top in address space):
- Text section: the program code (machine instructions)
- Data section: global variables
- Heap: memory dynamically allocated at runtime (malloc/new)
- Stack: temporary data — function parameters, local variables, return addresses

Program counter (PC): holds address of next instruction to execute.
CPU registers: hold current working values.

Process = code + data + heap + stack + CPU state (PC + registers)

Process States:
- New: being created
- Running: instructions executing on CPU (only ONE process running at a time on single CPU)
- Waiting: waiting for an event (I/O completion, signal)
- Ready: in memory, waiting to be assigned to CPU
- Terminated: finished execution`,
    keyPoints: [
      "Program = passive (stored on disk). Process = active (in execution in memory).",
      "Process memory: Text (code) + Data (globals) + Heap (dynamic) + Stack (local/params)",
      "Stack: grows downward. Heap: grows upward. They can collide.",
      "5 process states: New → Ready → Running → Waiting → Terminated",
      "New: being created. Ready: in memory, waiting for CPU. Running: on CPU.",
      "Waiting: waiting for I/O or event. Terminated: finished.",
      "Single CPU: only ONE process in RUNNING state at a time",
      "Multiple processes can be in READY or WAITING simultaneously",
    ],
    formula: {
      code: `Process Memory Layout (high → low addresses):
  ┌─────────────────┐ High address
  │     Stack       │  ← function frames, local vars
  │        ↓        │
  │   (free space)  │
  │        ↑        │
  │      Heap       │  ← malloc(), new()
  ├─────────────────┤
  │      Data       │  ← global variables
  ├─────────────────┤
  │      Text       │  ← program code (read-only)
  └─────────────────┘ Low address (e.g., 0x400000)

Process State Diagram:
  new ──────admit──────→ ready
                           ↑↓ scheduler/interrupt
                        running ──I/O/event──→ waiting
                           │                      │
                        exit↓            I/O done→ ready
                       terminated`,
      explanation: "Text (code) at low addresses. Stack grows DOWN. Heap grows UP. They can meet and cause overflow.",
    },
    examTips: [
      "Program ≠ Process: program is passive (file). Process is active (executing).",
      "5 states: New, Ready, Running, Waiting, Terminated — know all transitions",
      "Only ONE process RUNNING at a time on single-core CPU",
      "Stack: LIFO, grows downward. Heap: grows upward. Both share same memory space.",
    ],
    questions: [
      { q: "What are the 5 states of a process and when does each transition occur?", a: "New: being created. Ready: in memory, waiting for CPU (transitions to Running when scheduler picks it). Running: instructions executing (transitions to Waiting on I/O, to Ready on interrupt/preemption, to Terminated on exit). Waiting: awaiting event like I/O (transitions to Ready when event completes). Terminated: finished execution." },
      { q: "What are the 4 sections of a process in memory?", a: "Text section: program code/instructions. Data section: global variables. Heap: dynamically allocated memory (grows upward at runtime). Stack: temporary data — function parameters, local variables, return addresses (grows downward)." },
    ],
  },

  "pcb-states": {
    title: "PCB & Process Scheduling Queues", emoji: "📁",
    tldr: "PCB = the OS data structure representing a process. Contains all state. 3 queues: Job queue, Ready queue, Device queues.",
    explanation: `Process Control Block (PCB) — also called Task Control Block:
Every process in the OS is represented by a PCB. It stores all information the OS needs to manage the process:
- Process state: running, waiting, ready, etc.
- Program counter: address of next instruction
- CPU registers: all register values (saves context on switch)
- CPU scheduling info: priority, queue pointers
- Memory management info: base/limit registers, page tables
- Accounting info: CPU time used, clock time, limits
- I/O status info: devices allocated, open files

Process Scheduling Queues:
Job queue: ALL processes in the system.
Ready queue: processes in main memory, ready and waiting to execute (records are PCBs).
Device queues: processes waiting for a specific I/O device (one queue per device).

Processes migrate between queues based on their state.

Schedulers:
Short-term (CPU scheduler): picks next process from ready queue, allocates CPU. Invoked frequently (milliseconds) → must be fast.
Long-term (job scheduler): picks which processes from disk to bring into memory (ready queue). Invoked infrequently (seconds/minutes) → can be slow. Controls degree of multiprogramming.
Medium-term: swaps processes in/out of memory. Reduces degree of multiprogramming temporarily.`,
    keyPoints: [
      "PCB = OS data structure for ONE process. Contains: state, PC, registers, scheduling info, memory info, accounting, I/O info",
      "Job queue: ALL processes in system. Ready queue: in memory, ready for CPU.",
      "Device queues: one per I/O device. Processes waiting for that device.",
      "Short-term scheduler: fast, invoked every milliseconds, picks from ready queue",
      "Long-term scheduler: slow, invoked every seconds/minutes, picks from disk",
      "Long-term controls DEGREE OF MULTIPROGRAMMING (how many processes in memory)",
      "Medium-term: swapping — moves processes between memory and disk",
      "I/O-bound: many short CPU bursts. CPU-bound: few long CPU bursts.",
      "Long-term aims for good MIX of I/O-bound + CPU-bound processes",
    ],
    formula: {
      code: `PCB Contents:
  ┌─────────────────────────────┐
  │ Process State  (running)    │
  │ Program Counter (0x401234)  │
  │ CPU Registers  (rax, rbx..) │
  │ Scheduling Info (priority=5)│
  │ Memory Info    (page table) │
  │ Accounting     (CPU=0.5s)   │
  │ I/O Status     (files:[fd3])│
  └─────────────────────────────┘

Queue Model:
  [New] → ready queue → [P1][P2][P3] → CPU
                                         ↓
                        device queue ← I/O request
                        [P4][P5]         ↓
                                       I/O done → ready queue

Scheduler Comparison:
  Short-term: invoked every ~10ms. MUST be fast (O(1) preferred)
  Long-term:  invoked every ~seconds. Can afford O(n) work.
  Medium-term: handles swapping (when memory is overloaded)`,
      explanation: "PCB = identity card of a process. Short-term = fast CPU dispatcher. Long-term = memory admission control.",
    },
    examTips: [
      "PCB stores ALL process info — state, PC, registers, scheduling, memory, I/O, accounting",
      "Short-term: FREQUENT (ms), FAST. Long-term: INFREQUENT (s/min), can be slow.",
      "Long-term controls DEGREE OF MULTIPROGRAMMING — how many in memory",
      "I/O-bound vs CPU-bound: long-term scheduler aims to MIX them",
    ],
    questions: [
      { q: "What information does a PCB store?", a: "Process state, Program counter, CPU registers, CPU scheduling information (priority, queue pointers), Memory management information (page tables), Accounting information (CPU time used, time limits), I/O status information (open files, allocated devices)." },
      { q: "What is the difference between short-term and long-term schedulers?", a: "Short-term (CPU) scheduler: selects which process from the ready queue gets the CPU next. Invoked every few milliseconds — must be very fast. Long-term (job) scheduler: selects which processes from disk to admit into memory (ready queue). Invoked every seconds/minutes — can be slower. Controls the degree of multiprogramming (number of processes in memory)." },
    ],
  },

  "schedulers-types": {
    title: "Schedulers & I/O vs CPU-Bound Processes", emoji: "⚖️",
    tldr: "I/O-bound: many short bursts. CPU-bound: few long bursts. Long-term mixes both. CPU-I/O burst cycle is fundamental.",
    explanation: `CPU-I/O Burst Cycle: Process execution alternates between CPU execution (CPU burst) and I/O wait (I/O burst). This cycle repeats until process terminates.

I/O-bound process: spends more time doing I/O than computing. Has many SHORT CPU bursts. Example: text editor, web browser.
CPU-bound process: spends more time computing. Has few VERY LONG CPU bursts. Example: matrix multiplication, video encoding.

CPU burst distribution: most CPU bursts are SHORT (this is important for RR scheduling). A few processes have very long bursts.

Long-term scheduler strategy: maintain a good MIX of I/O-bound and CPU-bound processes. If all CPU-bound → ready queue overloads CPU, I/O devices idle. If all I/O-bound → CPU idles, I/O devices overloaded.

Medium-term scheduler: when degree of multiprogramming needs to decrease, it swaps processes out of memory to disk. Later, swaps back in. This is SWAPPING.`,
    keyPoints: [
      "CPU-I/O burst cycle: alternates CPU burst and I/O wait until termination",
      "I/O-bound: many SHORT CPU bursts. Example: word processor",
      "CPU-bound: few LONG CPU bursts. Example: scientific computation",
      "Long-term scheduler goal: mix I/O-bound + CPU-bound = balance",
      "Medium-term: swapping — process removed from memory to disk and back",
      "Swapping reduces degree of multiprogramming temporarily",
      "Histogram of CPU bursts: mostly short (exponential distribution shape)",
    ],
    formula: {
      code: `CPU-I/O Burst Cycle:
  [CPU burst] → [I/O wait] → [CPU burst] → [I/O wait] → ... → exit

I/O-bound process (word processor):
  CPU:  2ms │ CPU: 1ms │ CPU: 3ms │ CPU: 1ms ...
  I/O:    ────────── 50ms ──────── 100ms ───

CPU-bound process (video encoder):
  CPU:  ───────── 800ms ─────── 1000ms ─── ...
  I/O:  │ 1ms │               │ 2ms │

Good mix on long-term scheduling:
  Process A (I/O-bound):  ████░░░░░░░████░░░░
  Process B (CPU-bound):  ░░░░████████░░░░████
  CPU is NEVER idle! I/O devices are NEVER idle!`,
      explanation: "Mixing I/O and CPU bound processes maximizes both CPU and I/O device utilization simultaneously.",
    },
    examTips: [
      "I/O-bound: MANY SHORT bursts. CPU-bound: FEW LONG bursts.",
      "Long-term scheduler mixes both for maximum system utilization",
      "Medium-term = swapping (process to disk and back). Reduces multiprogramming.",
      "CPU burst histogram: mostly short bursts with exponential tail (important for SJF/RR)",
    ],
    questions: [
      { q: "Why should the long-term scheduler maintain a mix of I/O-bound and CPU-bound processes?", a: "If all processes are CPU-bound: the ready queue overloads, I/O devices sit idle. If all I/O-bound: the CPU sits idle while processes wait for I/O. A good mix keeps both CPU and I/O devices busy simultaneously, maximizing overall system utilization." },
    ],
  },

  "context-switch": {
    title: "Context Switch", emoji: "🔁",
    tldr: "Context switch: save old process state (PCB) + load new process state. PURE OVERHEAD — no useful work done during switch.",
    explanation: `When the CPU switches from one process to another, the OS must save the complete state of the current process and restore the state of the next process. This is called a context switch.

Context of a process = everything stored in its PCB (registers, PC, memory info, etc.)

Context switch steps:
1. Save current process state to its PCB (all registers, PC, memory pointers)
2. Select next process to run
3. Load saved state from new process's PCB
4. Resume execution of new process

Context switch time = PURE OVERHEAD. No useful computation happens while switching. The longer the switch takes, the less time is available for actual work.

Factors affecting context switch time:
- OS complexity and PCB size
- Hardware support (some CPUs have multiple register sets → can load context faster)
- Memory speed

More complex OS = longer context switch. Hardware with multiple register sets per CPU = multiple contexts can be loaded simultaneously → faster switches.`,
    keyPoints: [
      "Context switch: save old PCB + load new PCB + transfer CPU",
      "Context = all process state: registers, PC, memory info",
      "Context switch = PURE OVERHEAD. No useful work done.",
      "More complex OS/PCB = longer switch time",
      "Hardware with multiple register sets → faster context switches",
      "Time dependent on hardware support and OS complexity",
      "Minimize context switch frequency for better performance (use larger time quantum in RR)",
    ],
    formula: {
      code: `Context Switch Timeline:
  Process P0 running
    |
    | ← interrupt or system call
    ↓
  Save P0 state → PCB0
  (OS runs: selects P1 from ready queue)
  Load P1 state ← PCB1
    |
    | ← P1 executes
    ↓
  Save P1 state → PCB1
  (OS runs: selects P0 from ready queue)
  Load P0 state ← PCB0
    |
    | ← P0 resumes where it left off
    
  ← idle (overhead) →← useful work →← idle →`,
      explanation: "The time saving/restoring state = wasted time. Minimizing context switch time = key performance goal.",
    },
    examTips: [
      "Context switch = PURE OVERHEAD (zero useful computation during switch)",
      "Save state to PCB → select new process → load state from PCB",
      "More complex OS = longer switch. Hardware support = shorter switch.",
      "Context switch time: hardware dependent. Typically < 10 microseconds.",
    ],
    questions: [
      { q: "Why is context switch time considered overhead?", a: "During a context switch, the CPU is neither running the old process nor the new process — it is saving and restoring state (PCB). No useful computation occurs during this time. Therefore, context switches represent pure overhead — the more frequent they are, the less time is spent on actual work." },
    ],
  },

  "process-creation": {
    title: "Process Creation — fork, exec, vfork", emoji: "🌱",
    tldr: "fork(): duplicate parent process (child gets PID 0, parent gets child PID). exec(): replace process image. vfork(): no copy, child runs first.",
    explanation: `Process Creation:
Parent processes create child processes, forming a tree (with init/systemd at the root in Linux). Each process has a unique PID (Process ID).

Resource sharing options: parent and children share all, children share subset, or no sharing.
Execution options: parent and children execute concurrently, OR parent waits for children.

fork():
Creates a new process — the child is a duplicate of the parent (same code, data, heap, stack — but separate copy).
Return values: 0 in the child, child's PID in the parent, -1 on error.
After fork(), both parent and child continue from the next instruction.

exec():
Replaces the calling process's memory (text, data, heap, stack) with a new program loaded from disk. PID does NOT change. Typical pattern: fork() → exec() in child to run a new program.

vfork():
Like fork() but does NOT copy the parent's address space (child uses parent's memory directly until exec/exit). Guarantees child runs FIRST. Much faster for fork-then-exec pattern.

getpid(): returns current process's PID.
getppid(): returns parent process's PID.`,
    keyPoints: [
      "fork(): create duplicate child. Child gets 0, parent gets child's PID.",
      "exec(): replace process image with new program. PID unchanged.",
      "vfork(): no copy of address space. Child runs FIRST. Faster than fork.",
      "Typical Unix pattern: fork() → exec() in child",
      "Process tree: init → login shell → user programs",
      "getpid(): my PID. getppid(): my parent's PID.",
      "fork() returns -1 on error. exec() never returns on success.",
      "exec() replaces: text, data, heap, stack — everything (PID stays same)",
    ],
    formula: {
      code: `fork() code pattern:
  pid_t pid = fork();
  
  if (pid < 0) {
    // error: fork failed
    perror("fork");
  } else if (pid == 0) {
    // CHILD process
    // pid == 0 in child
    execlp("/bin/ls", "ls", NULL);  // exec replaces child image
  } else {
    // PARENT process
    // pid = child's PID
    wait(NULL);  // parent waits for child to finish
  }

Return values:
  Parent: fork() returns child's PID (e.g., 1234)
  Child:  fork() returns 0
  Error:  fork() returns -1

vfork() vs fork():
  fork():  copies parent's address space → safe but slower
  vfork(): shares parent's memory → child runs FIRST → faster
           (must call exec() or exit() immediately!)`,
      explanation: "fork() = duplicate. exec() = transform. vfork() = share + child first. These 3 are the foundation of Unix process creation.",
    },
    examTips: [
      "fork() child returns 0. Parent returns child PID. Error returns -1. MEMORIZE.",
      "exec() does NOT change PID. Replaces text+data+heap+stack.",
      "vfork(): NO address space copy. Child runs FIRST until exec/exit.",
      "Process tree root in Linux: init (PID 1) or systemd",
    ],
    questions: [
      { q: "What is the difference between fork() and exec()?", a: "fork() creates a new process by duplicating the calling process — both parent and child then run the same code from the same point, with separate memory copies. exec() does NOT create a new process — it replaces the calling process's memory (text, data, heap, stack) with a completely new program. PID stays the same after exec(). The typical pattern is fork() followed by exec() in the child to create a child running a different program." },
      { q: "What does fork() return in the child vs the parent?", a: "In the child process: 0. In the parent process: the PID (process ID) of the newly created child. On error: -1 (no child created)." },
    ],
  },

  "process-termination": {
    title: "Process Termination — exit, wait, zombie, orphan", emoji: "💀",
    tldr: "exit(): normal termination. Zombie: child terminated, parent hasn't waited. Orphan: parent terminated first. Cascading termination: OS kills all children.",
    explanation: `Process Termination:
Normal exit: process executes last statement → calls exit(). Returns status data to parent via wait(). OS deallocates all resources.

5 ways to terminate normally:
1. Return from main() 2. Call exit() 3. Call _exit() or _Exit() 4. Return from last thread's start routine 5. pthread_exit() from last thread

3 abnormal termination ways:
1. Call abort() 2. Receive a signal 3. Last thread responds to cancellation

Parent can terminate child using abort(). Reasons: child exceeded resources, task no longer needed, parent is exiting.

Cascading termination: if parent exits and OS doesn't allow orphans, ALL children are terminated too (recursively including grandchildren).

Zombie: A child has terminated but its parent has NOT yet called wait(). The process still exists as a "zombie" entry in the process table — its exit status is stored there until the parent reads it.

Orphan: Parent terminated WITHOUT calling wait(). The orphaned child is re-parented to init (PID 1), which periodically calls wait() to clean up.

wait() / waitpid(): parent waits for child. Returns child's PID and exit status. Can block (if child still running) or return immediately (if child already done).`,
    keyPoints: [
      "exit(): normal termination. Returns exit status to parent via wait().",
      "Zombie: child exited, parent NOT yet called wait(). Still in process table.",
      "Orphan: parent exited without wait(). Child re-parented to init (PID 1).",
      "Cascading termination: parent exits → OS kills all descendants",
      "wait(): parent gets child's exit status + PID. Blocks if child running.",
      "waitpid(): wait for specific child (not just any child).",
      "pid = wait(&status) returns: child PID on success, 0 if no change, -1 on error",
      "exec(): same PID, returns -1 on error, NO return on success",
    ],
    formula: {
      code: `Process Termination Flow:
  Child: executes exit(0)
    → OS closes all file descriptors
    → Releases memory
    → Keeps minimal entry in process table (zombie)
    → Sends SIGCHLD to parent
  
  Parent: calls wait(&status)
    → Gets child's exit status
    → OS removes zombie from process table
    → Returns child's PID

Zombie State:
  Child exits → still in table as zombie
  Parent ignores → zombie accumulates
  (memory leak in process table!)

Orphan Handling:
  Parent exits without wait()
    → OS re-parents child to init (PID=1)
    → init periodically calls wait() for all orphans
    → Properly cleans up

Race Condition Example:
  fork() → who runs first? (undefined)
  Solution: parent calls wait() to synchronize`,
      explanation: "Zombie = dead but not cleaned up. Orphan = parent died first, adopted by init. Both use process table entry.",
    },
    examTips: [
      "Zombie: child DONE, parent NOT called wait() yet. Still in process table.",
      "Orphan: parent DONE first. Child re-parented to init (PID 1).",
      "Cascading termination: some OSes kill ALL children when parent exits.",
      "wait() removes zombie. If parent never calls wait() → zombie accumulates (memory leak).",
    ],
    questions: [
      { q: "What is a zombie process?", a: "A zombie process is a child that has terminated (called exit()) but whose parent has not yet called wait() to collect its exit status. The OS keeps a minimal entry for it in the process table to preserve the exit status for the parent. Once the parent calls wait(), the zombie is fully cleaned up." },
      { q: "What happens when a parent process exits before its child?", a: "The child becomes an orphan. The OS re-parents it to init (PID 1). The init process periodically calls wait() to clean up any orphaned children that have terminated, preventing zombies from accumulating." },
    ],
  },

  "io-lifecycle": {
    title: "Life Cycle of an I/O Request", emoji: "📤",
    tldr: "Process → syscall → kernel validates → device driver → controller → process BLOCKED → context switch → interrupt → ISR → process READY → resume.",
    explanation: `The I/O Life Cycle defines the complete sequence from a process requesting I/O to resuming execution.

Phase 1 — Initiation:
Process calls read()/write()/open(). System call switches user→kernel mode. Kernel validates parameters, file descriptors, access permissions. Identifies target device and device driver. Encapsulates request into kernel data structure. Places request in device's I/O queue. May be blocking or non-blocking.

Phase 2 — Execution:
Device driver converts kernel request to hardware-specific commands. Programs the device controller to start operation. Requesting process is BLOCKED and moved to waiting state. OS performs context switch → another process runs. (CPU and I/O work in parallel → better throughput)

Phase 3 — Completion:
Device generates an interrupt when done. CPU executes ISR (Interrupt Service Routine). ISR verifies completion, handles errors. Blocked process moved from waiting → ready state. Scheduler eventually picks process → resumes execution. System call completes, returns to user mode.`,
    keyPoints: [
      "I/O starts with system call (read/write/open) → mode switch to kernel",
      "Kernel validates request, identifies device driver, queues request",
      "Process goes BLOCKED (waiting state) while I/O executes",
      "Context switch: another process uses CPU while I/O runs — key efficiency!",
      "Device finishes → interrupt → ISR handles completion",
      "ISR moves process from waiting → ready state",
      "Scheduler eventually runs the process again → execution resumes",
      "System call returns → back to user mode",
    ],
    formula: {
      code: `I/O Request Lifecycle:
  Process A: read(fd, buf, 1024)
    │
    ↓ [1] System call → user mode → kernel mode
    ↓ [2] Kernel validates fd, permissions, etc.
    ↓ [3] Identifies disk device driver
    ↓ [4] Creates I/O request data structure
    ↓ [5] Queues request in disk I/O queue
    ↓ [6] Process A → BLOCKED (moves to waiting)
    ↓ [7] Context switch → Process B runs on CPU
         
  [Disk controller executes the I/O]
         
    ↓ [8] Disk done → raises INTERRUPT
    ↓ [9] CPU handles interrupt → ISR runs
    ↓ [10] ISR: data copied to Process A's buffer
    ↓ [11] Process A → READY (moves to ready queue)
    ↓ [12] Scheduler picks Process A
    ↓ [13] read() returns 1024 (bytes read)
    ↓ [14] User mode resumed`,
      explanation: "Steps 7-8: CPU runs other processes while I/O executes = true parallel utilization.",
    },
    examTips: [
      "Process is BLOCKED during I/O — NOT running, NOT ready",
      "Context switch during I/O: another process gets CPU (key efficiency gain)",
      "Interrupt = how device signals completion to CPU",
      "ISR: runs in kernel mode, moves process from waiting → ready",
    ],
    questions: [
      { q: "What happens to a process that initiates a blocking I/O request?", a: "The process moves from running → waiting state (blocked). The OS performs a context switch, allowing another process to use the CPU. When the I/O completes, the device generates an interrupt. The ISR handles it and moves the blocked process from waiting → ready state. The scheduler eventually assigns the CPU back to the process." },
    ],
  },

  "sched-criteria": {
    title: "Scheduling Criteria & Goals", emoji: "📊",
    tldr: "5 criteria: CPU utilization, Throughput, Turnaround time, Waiting time, Response time. Maximize first 2, minimize last 3.",
    explanation: `CPU Scheduling goals: decide which process in the ready queue gets the CPU next. This is the most important resource allocation decision.

5 Scheduling Criteria:
1. CPU Utilization: keep CPU as busy as possible (maximize). Range: 40% (lightly loaded) to 90% (heavily loaded).
2. Throughput: number of processes completing execution per time unit (maximize).
3. Turnaround Time: total time to execute a process from submission to completion (minimize).
4. Waiting Time: total time a process spends waiting in the ready queue (minimize). Scheduling affects only waiting time, not I/O time.
5. Response Time: time from request submission until first response is produced (minimize). Important for interactive/timesharing systems.

Key formulas:
Turnaround Time = Completion Time − Arrival Time
Waiting Time = Turnaround Time − Burst Time
Response Time = Time of First CPU − Arrival Time
Average values = sum / number of processes`,
    keyPoints: [
      "CPU Utilization: maximize (keep CPU busy, range 40-90%)",
      "Throughput: processes/second — maximize",
      "Turnaround time: submission → completion — minimize",
      "Waiting time: time in READY QUEUE only — minimize",
      "Response time: first response time — minimize (for interactive systems)",
      "Turnaround = Completion - Arrival",
      "Waiting = Turnaround - Burst time",
      "Scheduling only affects waiting time (not I/O time)",
    ],
    formula: {
      code: `Key Formulas:
  Turnaround Time = Completion Time − Arrival Time
  Waiting Time    = Turnaround Time − Burst Time
                  = Completion Time − Arrival Time − Burst Time
  Response Time   = First CPU Time − Arrival Time

Example: P1 arrives at 0, burst=10, finishes at 15
  Turnaround = 15 − 0 = 15
  Waiting    = 15 − 10 = 5  (waited 5ms in ready queue)
  Response   = time first got CPU − 0

Average Waiting Time Example (FCFS: P1=24, P2=3, P3=3):
  P1: 0ms wait. P2: 24ms wait. P3: 27ms wait.
  Avg = (0+24+27)/3 = 17ms

Optimization Goals:
  MAX: CPU utilization, throughput
  MIN: turnaround, waiting, response time`,
      explanation: "Waiting time = turnaround − burst. It measures only time spent idle in queue, not running or doing I/O.",
    },
    examTips: [
      "Maximize: CPU utilization + throughput. Minimize: turnaround + waiting + response.",
      "Waiting = Turnaround − Burst time. Turnaround = Completion − Arrival.",
      "Scheduling ONLY affects waiting time (not I/O wait time or actual execution time)",
      "Response time: for interactive systems. Turnaround: for batch systems.",
    ],
    questions: [
      { q: "Calculate turnaround and waiting time: P1 arrives at t=0, burst=8. Starts at t=5, finishes at t=13.", a: "Turnaround = 13 - 0 = 13ms. Waiting = 13 - 8 = 5ms (or: started at 5, arrived at 0, so waited 5ms in ready queue before first getting CPU)." },
      { q: "What is the difference between waiting time and response time?", a: "Waiting time = total time spent waiting in the ready queue across all time slices (complete execution). Response time = time from submission until the FIRST response is produced (first time process gets CPU). For batch systems, minimize turnaround/waiting. For interactive systems, minimize response time." },
    ],
  },

  "preemptive-dispatcher": {
    title: "Preemptive Scheduling & Dispatcher", emoji: "🚦",
    tldr: "Preemptive: OS can take CPU away. Non-preemptive: process keeps CPU until done/blocked. Dispatcher latency = time to perform context switch.",
    explanation: `CPU scheduling decisions occur when:
1. Process switches from running → waiting (e.g., I/O request) — NON-preemptive
2. Process switches from running → ready (e.g., timer interrupt) — PREEMPTIVE
3. Process switches from waiting → ready (e.g., I/O completion) — PREEMPTIVE
4. Process terminates — NON-preemptive

Cases 1 and 4: non-preemptive (process voluntarily gives up CPU).
Cases 2 and 3: preemptive (OS forcibly takes CPU from process).

Non-preemptive scheduling: once CPU allocated, process keeps it until it terminates or waits. Simpler, no race conditions from preemption. Used in early Windows (3.x). Problem: long processes block short ones.

Preemptive scheduling: OS can take CPU away at any time. More complex (race conditions possible when shared data is being updated). Used in modern OSes (Windows 95+, Linux, macOS). Requires mutex locks to protect shared kernel data.

Dispatcher: the module that actually gives the CPU to the selected process. Does:
1. Context switch (save old state, load new state)
2. Switch to user mode
3. Jump to correct location in user program

Dispatch latency = time dispatcher takes to stop one process and start another. Must be minimized.`,
    keyPoints: [
      "Non-preemptive (4 conditions 1+4): process gives up CPU voluntarily",
      "Preemptive (conditions 2+3): OS forcibly reclaims CPU",
      "Cases 1 (running→waiting) + 4 (terminate): always non-preemptive",
      "Cases 2 (running→ready) + 3 (waiting→ready): preemptive",
      "Non-preemptive: simpler, no race conditions. Problem: convoy effect",
      "Preemptive: requires mutex locks for shared data. Used in modern OSes.",
      "Dispatcher: does context switch + mode switch + jump to user program",
      "Dispatch latency: time to switch processes. Must be minimized.",
    ],
    formula: {
      code: `4 Scheduling Decision Points:
  1. running → waiting   (I/O request)      → NON-PREEMPTIVE
  2. running → ready     (timer interrupt)  → PREEMPTIVE
  3. waiting → ready     (I/O complete)     → PREEMPTIVE
  4. terminates                              → NON-PREEMPTIVE

Dispatch Latency Timeline:
  [Process P1 running]
   ← dispatcher saves P1 context →
   ← dispatcher loads P2 context →
  [Process P2 running]
  ←── dispatch latency ──→ (pure overhead!)

Preemption Race Condition:
  P1: reading shared_var (halfway through)
  Timer fires → P1 preempted
  P2: reads shared_var → gets PARTIAL/CORRUPT data!
  Solution: mutex lock before reading shared_var`,
      explanation: "Dispatcher ≠ scheduler. Scheduler DECIDES. Dispatcher EXECUTES the switch.",
    },
    examTips: [
      "Non-preemptive: running→waiting (I/O) and terminate. These 2 ONLY.",
      "Preemptive: running→ready (timer) and waiting→ready (I/O done). These 2.",
      "Dispatcher ≠ scheduler. Scheduler picks. Dispatcher does the switch.",
      "Dispatch latency = overhead. Minimize it.",
      "Preemptive scheduling needs mutex locks for shared kernel data",
    ],
    questions: [
      { q: "What are the 4 conditions under which scheduling decisions are made? Which are preemptive?", a: "1. Running→Waiting: I/O request (NON-preemptive). 2. Running→Ready: timer interrupt (PREEMPTIVE). 3. Waiting→Ready: I/O completion (PREEMPTIVE). 4. Terminates (NON-preemptive). Cases 1 and 4 are non-preemptive. Cases 2 and 3 are preemptive." },
    ],
  },

  "fcfs-sched": {
    title: "FCFS Scheduling", emoji: "🚂",
    tldr: "First Come First Served = non-preemptive FIFO. Simple but suffers convoy effect. Average waiting time highly variable.",
    explanation: `FCFS (First Come, First Served): the simplest scheduling algorithm. Processes are assigned the CPU in the order they arrive. Implemented with a FIFO queue. Non-preemptive — once a process starts, it runs to completion.

Convoy Effect: a short process gets stuck waiting behind a long process. Example: one CPU-bound process + many I/O-bound processes. CPU-bound hogs CPU → I/O-bound processes wait → I/O devices go idle → when I/O-bound finally gets CPU, it quickly goes to I/O → CPU now idle. Very inefficient.

FCFS Example:
Processes arrive in order P1(24ms), P2(3ms), P3(3ms):
Order: P1→P2→P3. Waits: P1=0, P2=24, P3=27. Avg wait = 17ms.

If arrival order is P2, P3, P1:
Order: P2→P3→P1. Waits: P2=0, P3=3, P1=6. Avg wait = 3ms.

Same processes, very different waiting times — FCFS is highly dependent on arrival order. Not suitable for time-sharing systems where response time matters.`,
    keyPoints: [
      "FCFS = FIFO queue. Non-preemptive. Simplest algorithm.",
      "Process keeps CPU until it terminates or waits for I/O.",
      "Convoy effect: short process stuck behind long process",
      "Average waiting time HIGHLY variable — depends on arrival order",
      "Not suitable for timesharing systems",
      "P1=24, P2=3, P3=3 arriving in P1,P2,P3 order: avg wait = 17ms",
      "Same processes arriving P2,P3,P1: avg wait = 3ms (5.7× better!)",
    ],
    formula: {
      code: `FCFS Example 1: P1=24, P2=3, P3=3 (arrive in order)
  Gantt: |P1        |P2 |P3 |
          0         24  27  30
  
  Waiting: P1=0, P2=24-0=24, P3=27-0=27
  Avg wait = (0+24+27)/3 = 17ms  ← BAD

FCFS Example 2: P2=3, P3=3, P1=24 (arrive in order)
  Gantt: |P2|P3|P1        |
          0  3  6          30
  
  Waiting: P2=0, P3=3, P1=6
  Avg wait = (0+3+6)/3 = 3ms  ← MUCH BETTER

Convoy Effect:
  [P1: CPU-bound 100ms] → [P2: 2ms] → [P3: 2ms] → [P4: 2ms]
   P2, P3, P4 all wait 100ms for P1 to finish
   During that 100ms: I/O devices IDLE (P2,P3,P4 can't go to I/O)`,
      explanation: "Convoy = long job creates a train of waiting short jobs. Kills both CPU and I/O utilization.",
    },
    examTips: [
      "FCFS is non-preemptive — no preemption ever",
      "Convoy effect: short processes stuck behind long ones",
      "FCFS bad for time-sharing (response time too high)",
      "Average wait = sum of waits / n. Remember the formulas.",
    ],
    questions: [
      { q: "What is the convoy effect in FCFS scheduling?", a: "The convoy effect occurs when short processes are stuck waiting behind a long CPU-bound process. The long process monopolizes the CPU, causing I/O devices to become idle (the short I/O-bound processes can't run). When the short processes finally get the CPU, they quickly go to I/O and the CPU sits idle. This severely reduces system efficiency." },
      { q: "P1=6ms, P2=8ms, P3=7ms, P4=3ms arrive at t=0. Calculate FCFS average waiting time.", a: "Order: P1,P2,P3,P4. Waits: P1=0, P2=6, P3=14, P4=21. Avg = (0+6+14+21)/4 = 41/4 = 10.25ms." },
    ],
  },

  "sjf-srtf": {
    title: "SJF & SRTF Scheduling", emoji: "⚡",
    tldr: "SJF: schedule shortest burst first. OPTIMAL average wait. SRTF = preemptive SJF. Burst predicted by exponential averaging: τ(n+1) = α·t(n) + (1-α)·τ(n).",
    explanation: `Shortest Job First (SJF): associate each process with the length of its next CPU burst. Schedule the process with the shortest burst next. SJF is provably OPTIMAL — gives minimum average waiting time for a given set of processes.

Problem: can't know the exact next CPU burst length in advance. Solution: PREDICT it using exponential averaging of past bursts.

Exponential Averaging Formula:
τ(n+1) = α × t(n) + (1-α) × τ(n)
- τ(n+1): predicted next burst
- t(n): actual last burst (most recent data)
- τ(n): previous prediction (history)
- α: weight (0 < α ≤ 1). Typically α = 1/2.

If α=0: τ(n+1) = τ(n) — only history, recent data ignored.
If α=1: τ(n+1) = t(n) — only most recent burst, history ignored.

SRTF (Shortest Remaining Time First) = preemptive version of SJF. When a new process arrives with burst shorter than remaining time of current process → preempt and run new one.

SJF Example: P1=6, P2=8, P3=7, P4=3. Avg wait = (3+16+9+0)/4 = 7ms. (vs FCFS: 10.25ms)

SRTF Example: P1(0,8), P2(1,4), P3(2,9), P4(3,5). Avg wait = 6.5ms.`,
    keyPoints: [
      "SJF: schedule process with SHORTEST next CPU burst first",
      "SJF is OPTIMAL — minimum average waiting time guaranteed",
      "Problem: can't know next burst exactly → predict with exponential averaging",
      "τ(n+1) = α·t(n) + (1-α)·τ(n). Typically α = 0.5",
      "α=0: ignore recent. α=1: only recent burst counts.",
      "SRTF = preemptive SJF. Preempt if new arrival has shorter remaining time.",
      "SJF avg wait example: 7ms. FCFS same processes: 10.25ms.",
      "Starvation possible in SJF — long processes may never run (solution: aging)",
    ],
    formula: {
      code: `SJF Example: P1=6, P2=8, P3=7, P4=3 (all arrive t=0)
  Order: P4(3) → P1(6) → P3(7) → P2(8)
  Gantt: |P4|P1     |P3      |P2      |
          0  3       9       16       24
  
  Waiting: P4=0, P1=3, P3=9, P2=16
  Avg wait = (0+3+9+16)/4 = 28/4 = 7ms  ← OPTIMAL

Exponential Averaging (α=0.5):
  Given past bursts: 6, 4, 6, 4 with τ0=6
  τ1 = 0.5×6 + 0.5×6 = 6
  τ2 = 0.5×4 + 0.5×6 = 5
  τ3 = 0.5×6 + 0.5×5 = 5.5
  τ4 = 0.5×4 + 0.5×5.5 = 4.75

SRTF Example: P1(arr=0,burst=8), P2(1,4), P3(2,9), P4(3,5)
  t=0:  P1 starts (only process)
  t=1:  P2 arrives. P2 remaining=4 < P1 remaining=7 → preempt P1
  t=5:  P2 done. Check: P1=7, P3=9, P4=5 → P4 starts
  t=10: P4 done. Check: P1=7, P3=9 → P1 starts
  t=17: P1 done. P3 starts → finishes at t=26
  
  Waiting: P1=(10-1)=9, P2=(1-1)=0, P3=(17-2)=15, P4=(5-3)=2
  Avg = (9+0+15+2)/4 = 26/4 = 6.5ms`,
      explanation: "SRTF: compare NEW arrival's burst with REMAINING time of current process (not original burst).",
    },
    examTips: [
      "SJF = OPTIMAL average waiting time (memorize this)",
      "τ(n+1) = α·t(n) + (1-α)·τ(n). α=0.5 most common.",
      "SRTF: compare new arrival with REMAINING time (not original burst)",
      "SJF can starve long processes (solution: aging = increase priority over time)",
    ],
    questions: [
      { q: "Why is SJF considered optimal?", a: "SJF gives the minimum average waiting time for any given set of processes with the same arrival time. Moving a shorter burst before a longer one always reduces or maintains average waiting time. This can be proven mathematically — no other algorithm achieves a lower average waiting time than SJF for the same workload." },
      { q: "Predict next burst: τ(n)=10, t(n)=6, α=0.5.", a: "τ(n+1) = 0.5 × 6 + 0.5 × 10 = 3 + 5 = 8ms." },
    ],
  },

  "priority-sched": {
    title: "Priority Scheduling", emoji: "👑",
    tldr: "Each process has priority. Highest priority (lowest number) runs first. Problem: starvation. Solution: aging (increase priority over time).",
    explanation: `Priority Scheduling: each process gets a priority number (integer). CPU is allocated to the process with the highest priority. Convention: LOWER number = HIGHER priority (priority 1 > priority 5).

Can be preemptive or non-preemptive:
Preemptive: if a new process arrives with higher priority than current, preempt immediately.
Non-preemptive: new high-priority process waits until current process finishes or blocks.

SJF is a special case of priority scheduling where priority = inverse of predicted next CPU burst (shortest burst → highest priority).

Problem: Starvation (indefinite blocking). Low-priority processes may never execute if high-priority processes keep arriving. A process can wait indefinitely.

Solution: Aging. As time progresses, gradually increase the priority of waiting processes. Example: increase priority by 1 every 15 minutes. Eventually, even a low-priority process gets high enough priority to run.

Example: P1(10ms, priority=3), P2(1ms, p=1), P3(2ms, p=4), P4(1ms, p=5), P5(5ms, p=2).
Order: P2(1) → P5(2) → P1(3) → P3(4) → P4(5). Avg wait = 8.2ms.`,
    keyPoints: [
      "Lower priority NUMBER = higher priority (P1 > P5)",
      "Preemptive: higher-priority arrival preempts current. Non-preemptive: waits.",
      "SJF = priority scheduling with priority = 1/burst_time",
      "Starvation: low-priority processes may NEVER execute",
      "Aging: solution to starvation — increase priority with waiting time",
      "Aging example: add 1 to priority every 15 minutes of waiting",
    ],
    formula: {
      code: `Priority Scheduling Example:
  Process  Burst  Priority
  P1       10     3
  P2        1     1     ← highest priority
  P3        2     4
  P4        1     5     ← lowest priority
  P5        5     2
  
  Order: P2→P5→P1→P3→P4
  Gantt: |P2|P5    |P1          |P3  |P4|
          0  1      6           16   18  19
  
  Waiting: P2=0, P5=1, P1=6, P3=16, P4=18
  Avg wait = (0+1+6+16+18)/5 = 41/5 = 8.2ms

Aging (starvation fix):
  t=0:    P_lowpriority arrives at priority 40
  t=15min: priority bumped to 39
  t=30min: priority bumped to 38
  ...
  t=10hr: priority = 0 (highest!) → FINALLY gets CPU`,
      explanation: "Lower number = higher priority. Aging prevents starvation by slowly promoting long-waiting processes.",
    },
    examTips: [
      "Lower number = higher priority. Priority 1 > priority 5.",
      "SJF is a special case of priority scheduling (priority = 1/burst)",
      "Starvation problem + aging solution — both always examinable together",
      "Aging: increase priority as a function of wait time (prevent indefinite blocking)",
    ],
    questions: [
      { q: "What is starvation in priority scheduling and how is it solved?", a: "Starvation: low-priority processes may wait indefinitely if high-priority processes keep arriving. They never get CPU time. Solution: Aging — as time passes, gradually increase the priority of waiting processes. Eventually, even a very low-priority process gets high enough priority to run." },
    ],
  },

  "round-robin": {
    title: "Round Robin Scheduling", emoji: "🔃",
    tldr: "Preemptive FCFS with time quantum q. Each process gets ≤q time. Max wait = (n-1)×q. q too small → too many switches. q too large → like FCFS.",
    explanation: `Round Robin (RR): designed for timesharing systems. Similar to FCFS but preemptive — each process gets a small unit of CPU time called a time quantum (or time slice), typically 10-100ms. The ready queue is treated as a circular queue. CPU scheduler goes around the queue, giving each process up to q time units.

If process finishes within q: releases CPU voluntarily.
If process doesn't finish within q: timer interrupt fires → process moved to END of ready queue.

Performance:
n processes, time quantum q: each process gets 1/n of CPU in chunks of ≤q units.
Maximum wait = (n-1) × q (before getting CPU back).
Example: 5 processes, q=20ms → each process gets up to 20ms every 100ms.

Effect of q size:
q very large → same as FCFS (no preemption occurs).
q very small → huge number of context switches (overhead dominates useful work).
Rule of thumb: 80% of CPU bursts should be shorter than q.
In practice: most modern systems use q = 10-100ms. Context switch ≈ 10μs (< 1% overhead).

RR Example: P1=24, P2=3, P3=3. q=4.
Gantt: P1(4)→P2(3)→P3(3)→P1(4)→P1(4)→P1(4)→P1(4)→P1(4)
Waits: P1=6, P2=4, P3=7. Avg = 5.67ms.`,
    keyPoints: [
      "RR: preemptive FCFS with time quantum q. Circular ready queue.",
      "Each process gets ≤ q time. If not done, goes to END of queue.",
      "Max wait before getting CPU: (n-1) × q",
      "q too large = FCFS. q too small = too many context switches.",
      "80% of CPU bursts should be shorter than q (rule of thumb)",
      "Modern systems: q = 10-100ms. Context switch ≈ 10μs.",
      "RR better response time than FCFS. Good for timesharing.",
      "No starvation in RR (every process gets CPU eventually)",
    ],
    formula: {
      code: `RR Example: P1=24ms, P2=3ms, P3=3ms. q=4ms. All arrive t=0.
  Gantt:
  |P1(4)|P2(3)|P3(3)|P1(4)|P1(4)|P1(4)|P1(4)|P1(4)|
   0     4    7    10    14    18    22    26    30

  P2 finishes at t=7. P3 finishes at t=10. P1 finishes at t=30.
  
  Waiting times:
  P1: ran at 0-4, 10-14, 14-18, 18-22, 22-26, 26-30
      waited: 10-4=6ms  (time between 1st and 2nd burst)
  P2: arrived t=0, got CPU at t=4 → waited 4ms
  P3: arrived t=0, got CPU at t=7 → waited 7ms
  Avg wait = (6+4+7)/3 = 17/3 = 5.67ms

Max wait formula:
  n=5 processes, q=20ms
  Max wait = (5-1) × 20 = 80ms before getting CPU again

q size effect:
  q=∞: same as FCFS (run to completion)
  q=1ms: near-instantaneous switching = lots of overhead
  q=10-100ms: practical sweet spot`,
      explanation: "RR: fairness guaranteed (no starvation). Response time good. Turnaround may be worse than SJF.",
    },
    examTips: [
      "Max wait = (n-1) × q — MEMORIZE this formula",
      "RR turnaround: often worse than SJF but better response time",
      "q → ∞: behaves like FCFS. q → 0: processor sharing (overhead explosion).",
      "80% of bursts should be shorter than q (practical rule)",
      "RR = no starvation (every process gets CPU in at most (n-1)×q time)",
    ],
    questions: [
      { q: "With n=4 processes and time quantum q=10ms, what is the maximum time a process waits before getting the CPU again?", a: "Max wait = (n-1) × q = (4-1) × 10 = 30ms. In the worst case, after using its quantum, a process must wait for all 3 other processes to each use their quantum before it gets another turn." },
      { q: "What happens when the time quantum is set too small in Round Robin?", a: "Too many context switches occur. If q=1ms and context switch takes 1ms, then 50% of time is spent on context switching (overhead) and only 50% on actual work. The system overhead dominates useful computation. Response time appears fast but actual throughput plummets." },
    ],
  },

  "multilevel-q": {
    title: "Multilevel & Feedback Queue Scheduling", emoji: "🏗️",
    tldr: "MLQ: processes permanently assigned to queues. MLFQ: processes CAN MOVE between queues (aging). Best algorithm in practice.",
    explanation: `Multilevel Queue (MLQ): ready queue partitioned into multiple separate queues based on process type. Each queue has its own scheduling algorithm. Scheduling must also be done between queues.

Typical queues (highest to lowest priority):
1. System processes → RR
2. Interactive (foreground) processes → RR  
3. Interactive editing processes → RR
4. Batch (background) processes → FCFS
5. Student processes → FCFS

Each queue has absolute priority over lower-priority queues. No batch process runs while any foreground process exists. Starvation possible for lower queues.

Time slicing between queues: e.g., 80% to foreground (RR), 20% to background (FCFS).

Multilevel Feedback Queue (MLFQ): processes CAN MOVE between queues based on behavior. Aging implemented this way. Defined by: number of queues, scheduling per queue, upgrade criteria, downgrade criteria, entry queue rule.

Classic example (3 queues):
Q0: RR q=8ms. Q1: RR q=16ms. Q2: FCFS.
New process → Q0. Gets 8ms. If doesn't finish → demoted to Q1 (gets 16ms). Still doesn't finish → demoted to Q2 (FCFS, runs until done).
MLFQ = most general and most commonly used algorithm in practice.`,
    keyPoints: [
      "MLQ: processes PERMANENTLY assigned to a queue. No movement.",
      "Each queue has own algorithm (foreground=RR, background=FCFS)",
      "MLQ: fixed priority between queues OR time slice (80/20%)",
      "MLFQ: processes CAN MOVE between queues based on behavior",
      "MLFQ: new process → highest queue. CPU-hungry → demoted down.",
      "MLFQ 3 queues: Q0(RR,8ms) → Q1(RR,16ms) → Q2(FCFS)",
      "MLFQ implements aging (long-waiting processes can move up)",
      "MLFQ = most general scheduling algorithm. Used in practice.",
    ],
    formula: {
      code: `MLQ Structure:
  Priority 1: [System processes] ── RR, q=4ms ──┐
  Priority 2: [Interactive    ] ── RR, q=8ms ──┤ strict priority
  Priority 3: [Batch          ] ── FCFS ────────┘
  
  No batch process runs while ANY interactive process exists.
  
  OR Time-slice: 80% CPU → foreground (RR)
                 20% CPU → background (FCFS)

MLFQ Example (3 queues):
  New process P arrives
    ↓ enters Q0 (RR, q=8ms)
  P uses 8ms, not done
    ↓ DEMOTED to Q1 (RR, q=16ms)
  P uses 16ms, still not done
    ↓ DEMOTED to Q2 (FCFS, run to completion)
  
  Short interactive process: finishes in Q0 → fast response
  Long CPU-bound process: ends up in Q2 → efficiency
  
  Q0 always preempts Q1.
  Q1 always preempts Q2.
  Process arrives in Q1 → preempts Q2 process immediately.`,
      explanation: "MLFQ: short jobs stay in high-priority queues. Long CPU-hungry jobs fall to FCFS at bottom.",
    },
    examTips: [
      "MLQ: permanent assignment. MLFQ: processes MOVE between queues.",
      "MLFQ: new → high queue. Not finishing → demoted to lower queue.",
      "MLFQ: Q0(8ms) → Q1(16ms) → Q2(FCFS) — this specific example is exam material",
      "MLFQ defined by 5 parameters: #queues, algo per queue, upgrade/demote criteria, entry rule",
    ],
    questions: [
      { q: "What is the key difference between MLQ and MLFQ?", a: "In MLQ (Multilevel Queue), processes are permanently assigned to a queue based on type (foreground/background) and never move. In MLFQ (Multilevel Feedback Queue), processes CAN move between queues based on their behavior — a CPU-hungry process gets demoted to lower priority, while a long-waiting process can be promoted (aging). MLFQ is more flexible and the most commonly used approach." },
    ],
  },

  "multiproc-sched": {
    title: "Multiple-Processor Scheduling", emoji: "🖧",
    tldr: "SMP: each processor self-scheduling. AMP: one master schedules all. Common ready queue or per-CPU private queues.",
    explanation: `With multiple CPUs, scheduling becomes more complex — but load sharing becomes possible.

Asymmetric Multiprocessing (AMP) Scheduling: one master processor handles ALL scheduling decisions, I/O processing, and OS activities. Other processors execute only user code. Simple — only master accesses system data structures, no synchronization needed for scheduler.

Symmetric Multiprocessing (SMP) Scheduling: each processor is self-scheduling. Either: all processes in a single common ready queue (simple, but need synchronization/locking), OR each processor has its own private ready queue (complex, but no lock contention). All modern OSes support SMP.

Scheduling approaches for SMP:
1. Common ready queue: simple, load automatically balanced, but queue access needs locking.
2. Per-processor private queues: each CPU has own queue, need load balancing mechanisms.

Both approaches have tradeoffs — the common queue is simpler but has lock contention; private queues avoid contention but need explicit load balancing.`,
    keyPoints: [
      "AMP: one master handles all scheduling. Others run user code only.",
      "SMP: each processor self-scheduling. All modern OSes use SMP.",
      "SMP option 1: common ready queue (simple but needs locking)",
      "SMP option 2: per-processor private queues (no lock contention, needs load balancing)",
      "AMP: no data sharing problem. SMP: needs synchronization for shared queue.",
    ],
    formula: {
      code: `AMP Scheduling:
  [Master CPU] ← handles all scheduler decisions
  [CPU1, CPU2, CPU3] ← run user code, request work from master
  Simple: no shared data structure contention

SMP - Common Ready Queue:
  ┌─────────────────────┐
  │  Ready Queue        │  ← shared, needs mutex lock
  └─────────────────────┘
     ↓     ↓     ↓
   CPU0  CPU1  CPU2
  Any CPU pulls from queue. Auto-balanced but lock overhead.

SMP - Private Queues:
  CPU0: [P1][P2]    CPU1: [P3]    CPU2: [P4][P5][P6]
  Fast (no locking) but CPU1 idle while CPU2 overloaded!
  Need: load balancing (push/pull migration)`,
      explanation: "Common queue = simple balance. Private queues = no contention but need explicit balancing.",
    },
    examTips: [
      "AMP: one master. SMP: all self-schedule. Modern OSes = SMP.",
      "SMP common queue needs locking (bottleneck). Private queues need load balancing.",
      "Both push and pull migration can happen simultaneously in SMP.",
    ],
    questions: [
      { q: "What are the two approaches for the ready queue in SMP scheduling?", a: "1. Common ready queue: all processors share one queue. Simple and automatically load-balanced, but accessing the queue requires locking which can become a bottleneck. 2. Per-processor private queues: each processor has its own queue. No lock contention but requires explicit load balancing (push/pull migration) to prevent some CPUs from being idle while others are overloaded." },
    ],
  },

  "affinity-loadbal": {
    title: "Processor Affinity & Load Balancing", emoji: "🧲",
    tldr: "Affinity: keep process on same CPU (cache warm). Soft affinity = try. Hard affinity = force. Load balancing: push (periodic check) or pull (idle CPU steals).",
    explanation: `Processor Affinity:
When a process runs on CPU0, the data it accesses gets cached in CPU0's cache. If the process migrates to CPU1, CPU0's cache must be invalidated and CPU1's cache repopulated — expensive!

To avoid this: OSes try to keep a process on the same CPU (processor affinity). The process's data stays warm in that CPU's cache.

Soft Affinity: OS tries to keep process on same processor but may migrate if necessary (e.g., for load balancing). No guarantee.
Hard Affinity: process specifies a subset of CPUs it must run on via system call. OS guarantees no migration outside that set.

Load Balancing:
On SMP systems with per-CPU private queues, load balancing keeps work distributed evenly. Necessary to prevent idle CPUs while others are overloaded.

Push Migration: a dedicated task periodically checks load on each processor. If imbalanced, it pushes processes from overloaded CPUs to idle/less-busy CPUs.

Pull Migration: when a CPU becomes idle, it pulls (steals) a waiting process from another busy CPU.

Push and pull migration are NOT mutually exclusive — both can operate simultaneously.`,
    keyPoints: [
      "Processor affinity: keep process on same CPU to preserve cache warmth",
      "Cache migration cost: invalidate old cache + repopulate new cache (expensive)",
      "Soft affinity: OS tries but can migrate (no guarantee)",
      "Hard affinity: system call specifies which CPUs process may use (guaranteed)",
      "Load balancing: distribute work evenly across all CPUs in SMP",
      "Push migration: periodic task checks and pushes work from overloaded CPUs",
      "Pull migration: idle CPU pulls tasks from busy CPUs",
      "Push and pull can work simultaneously (not mutually exclusive)",
    ],
    formula: {
      code: `Processor Affinity Example:
  Process P running on CPU0
    → P's data in CPU0 cache (L1/L2/L3)
  Migrate P to CPU1:
    → CPU0 cache: invalidate P's data (wasted!)
    → CPU1 cache: reload P's data from RAM (slow!)
  Keep P on CPU0 (affinity):
    → Cache stays warm → fast memory access!

Soft vs Hard Affinity:
  Soft: OS "tries" to keep P on CPU0
        But load balancer may move P to CPU1 if needed
  Hard: sched_setaffinity(pid, cpumask={CPU0,CPU1})
        P will ONLY run on CPU0 or CPU1, guaranteed

Load Balancing Methods:
  Push: every 200ms, checker task runs:
        CPU0: 8 processes (overloaded)
        CPU1: 0 processes (idle)
        → push 4 processes from CPU0 to CPU1

  Pull: CPU1 becomes idle
        → steal 2 processes from CPU0's queue
        → immediate response to idleness`,
      explanation: "Affinity vs load balance = tension: affinity wants to stay put, load balance wants to move. OS balances both.",
    },
    examTips: [
      "Soft affinity: OS tries, no guarantee. Hard affinity: system call, guaranteed.",
      "Cache warm = process stays on same CPU. Migration = cold cache = slow.",
      "Push: checker pushes FROM overloaded. Pull: idle CPU pulls TO itself.",
      "Push and pull can operate simultaneously (both at once is fine).",
    ],
    questions: [
      { q: "What is the difference between soft and hard processor affinity?", a: "Soft affinity: the OS attempts to keep a process running on the same processor, but it is possible for the process to migrate between processors (e.g., if load balancing requires it). Hard affinity: the process uses a system call to specify a subset of processors it is allowed to run on. The OS guarantees the process will never be scheduled outside that subset." },
    ],
  },

  "linux-cfs": {
    title: "Linux CFS Scheduler", emoji: "🐧",
    tldr: "CFS: proportional CPU time via nice values (-20 to +19). vruntime per task. Lowest vruntime = next to run. Red-black tree. O(log N).",
    explanation: `Linux CFS (Completely Fair Scheduler) — default since kernel 2.6.23.

CFS assigns proportional CPU time based on nice values (-20 = highest priority, +19 = lowest). Nice value controls how much CPU time each task gets relative to others.

Key concept: virtual runtime (vruntime). Each task has a vruntime counter that increases as it runs. Tasks with lower priority (higher nice value) have a higher decay rate — their vruntime increases faster. Normal priority task: vruntime = actual run time.

The scheduler ALWAYS picks the task with LOWEST vruntime (i.e., the task that has received the least CPU time relative to its fair share).

Data structure: all runnable tasks stored in a red-black tree (balanced BST) keyed by vruntime. Leftmost node = task with lowest vruntime = next to run. Tree operations: O(log N). The leftmost node is cached → O(1) to find next task.

I/O vs CPU bound fairness: I/O-bound task sleeps waiting for I/O → vruntime doesn't increase while sleeping → when it wakes up, it has a LOW vruntime → gets CPU priority over CPU-bound task that was running.

Target latency: interval during which every runnable task should run at least once. CFS divides target latency proportionally.

Linux historical schedulers:
- Pre-2.5: standard UNIX scheduler, no SMP support
- 2.5: O(1) scheduler (SMP support, good) but poor interactive response
- 2.6.23+: CFS (current default)

Real-time scheduling: POSIX.1b compliant. Static priorities 0-99. Nice -20 maps to global priority 100. Nice +19 maps to global priority 139.`,
    keyPoints: [
      "CFS: Completely Fair Scheduler. Default in Linux since 2.6.23.",
      "Nice values: -20 (highest priority) to +19 (lowest priority)",
      "vruntime: virtual runtime per task. Lowest vruntime = next to run.",
      "Lower priority → higher vruntime decay rate (increases faster)",
      "Red-black tree: all runnable tasks sorted by vruntime. O(log N).",
      "Leftmost node = lowest vruntime = next task. Cached → O(1) lookup.",
      "I/O-bound tasks: vruntime low while sleeping → higher priority when they wake",
      "Target latency: interval where every task runs at least once",
    ],
    formula: {
      code: `CFS vruntime concept:
  Task A (nice=0, normal):     vruntime grows at 1:1 with real time
  Task B (nice=+5, lower pri): vruntime grows FASTER (1.5:1 or more)
  → B's vruntime overtakes A's → A runs more CPU time

  Next task = leftmost in red-black tree (lowest vruntime)

Red-Black Tree (simplified):
  vruntime: 10        ← leftmost = next to run
            / \\
          10   20
               \\
               30

I/O-bound vs CPU-bound with same nice value:
  CPU-bound: runs constantly → vruntime grows fast
  I/O-bound: sleeps for I/O → vruntime barely grows
  When I/O-bound wakes: its vruntime << CPU-bound's
  → I/O-bound PREEMPTS CPU-bound immediately!

Linux priority range:
  nice -20 → global priority 100  (high)
  nice   0 → global priority 120  (normal)
  nice +19 → global priority 139  (low)
  Real-time: static priorities 0-99 (above all CFS tasks)`,
      explanation: "CFS: fair via vruntime. I/O tasks get priority when waking because they missed CPU time while sleeping.",
    },
    examTips: [
      "CFS: lowest vruntime = next to run (always!)",
      "Nice -20 = highest priority, +19 = lowest. (confusingly: lower nice = higher priority)",
      "Red-black tree: runnable tasks keyed by vruntime. O(log N) insert/delete.",
      "I/O-bound wakes with low vruntime → immediately preempts CPU-bound tasks",
      "nice -20 → global 100. nice +19 → global 139. Know these mappings.",
    ],
    questions: [
      { q: "How does CFS ensure fairness between I/O-bound and CPU-bound tasks with the same nice value?", a: "An I/O-bound task spends most of its time sleeping (waiting for I/O), so its vruntime increases very slowly. A CPU-bound task runs constantly, so its vruntime grows quickly. When the I/O-bound task wakes up, its vruntime is much lower than the CPU-bound task's. The scheduler always picks the lowest vruntime → the I/O-bound task preempts the CPU-bound task immediately, giving it priority." },
    ],
  },

  "windows-sched": {
    title: "Windows Scheduling", emoji: "🪟",
    tldr: "Windows: priority-based preemptive. Dispatcher picks highest-priority thread. 32-level scheme: variable (1-15) and real-time (16-31).",
    explanation: `Windows uses a priority-based preemptive scheduling algorithm. The kernel component that handles scheduling is called the dispatcher. The highest-priority ready thread ALWAYS runs.

A thread runs until:
- A higher-priority thread preempts it, OR
- It terminates, OR
- Its time quantum ends, OR
- It calls a blocking system call

32-level priority scheme:
- Priority 0: memory-management thread
- Priorities 1-15: variable class (can change dynamically)
- Priorities 16-31: real-time class (must be admin to set)
- A queue exists for each priority level. If no runnable thread → idle thread runs.

Priority Classes (Windows API):
REALTIME_PRIORITY_CLASS > HIGH_PRIORITY_CLASS > ABOVE_NORMAL > NORMAL > BELOW_NORMAL > IDLE_PRIORITY_CLASS.

All except REALTIME are variable class.

Relative priorities within a class:
TIME_CRITICAL, HIGHEST, ABOVE_NORMAL, NORMAL, BELOW_NORMAL, LOWEST, IDLE.

Base priority = NORMAL within the class. If quantum expires, priority lowered (never below base). If wait occurs, priority boosted depending on what was waited for.

Foreground vs Background: Windows distinguishes them. Foreground process gets 3× priority boost — runs 3× longer before timesharing preemption.`,
    keyPoints: [
      "Windows dispatcher = kernel scheduler. Highest-priority thread always runs.",
      "32-level priorities: 0 (memory-mgmt), 1-15 (variable), 16-31 (real-time)",
      "Variable class 1-15: priority can change. Real-time 16-31: static.",
      "Queue per priority level. No runnable thread → idle thread.",
      "Priority boost: after wait, priority raised based on wait type",
      "Quantum expires → priority lowered (but never below base priority)",
      "Foreground process: 3× priority boost over background",
      "Priority classes: REALTIME > HIGH > ABOVE_NORMAL > NORMAL > BELOW_NORMAL > IDLE",
    ],
    formula: {
      code: `Windows 32-level Priority Scheme:
  31: Real-time (highest) ─┐
  ...                      ├── Real-time class (16-31): admin required
  16: Real-time (low)    ──┘
  15: Variable (high)    ──┐
  ...                      ├── Variable class (1-15): can change
  1:  Variable (low)     ──┘
  0:  Memory management thread

Priority computation:
  Process Priority Class + Thread Relative Priority = Numeric Priority

Example: NORMAL class (base=8) + ABOVE_NORMAL relative = priority 9
         HIGH class (base=13) + NORMAL relative = priority 13

Boosts:
  After keyboard I/O: large boost (foreground interactivity)
  After disk I/O: moderate boost
  After quantum expires: small decrease (never below base)
  Foreground process: quantum × 3 (3× longer before preemption)`,
      explanation: "Windows uses two separate concepts: priority class (process-level) + relative priority (thread-level) → final numeric priority.",
    },
    examTips: [
      "Windows scheduler = dispatcher. 32-level priority scheme.",
      "1-15 = variable (can change). 16-31 = real-time (admin only). 0 = memory mgmt.",
      "Quantum expires → priority DECREASES (never below base). Wait → priority INCREASES.",
      "Foreground process = 3× quantum (priority boost for active window).",
    ],
    questions: [
      { q: "How does Windows handle priority in its 32-level scheme?", a: "Priority 0: memory management thread. 1-15: variable class — priority can be dynamically changed by boosts (after I/O waits) and decrements (after quantum expires, never below base). 16-31: real-time class — requires admin privileges, static priorities. The dispatcher always runs the highest-priority ready thread. If no runnable thread, the idle thread runs." },
    ],
  },

  "shell-intro": {
    title: "Shell — Introduction & Types", emoji: "🐚",
    tldr: "Shell = Linux command-line interpreter. Interface between user and kernel. Parses command [arg1] [arg2]. Searches PATH for executable.",
    explanation: `The shell is the Linux command-line interpreter. It provides an interface between the user and the kernel. When a user enters a command (like ls), the shell executes it. The shell can also run applications, scripts, and user programs.

Syntax: command [arg1] [arg2] ... [argn]
Brackets [] indicate optional arguments. Many commands work without arguments.

How shell works:
1. User types command and presses Enter
2. Shell parses the line: identifies command name, options, filenames
3. Shell asks kernel to execute the command
4. If a specific path given (./mycommand): runs that. Otherwise: searches directories in $PATH variable.

Various Shells available in Linux:
- sh: Bourne Shell — the original shell
- csh, tcsh: derivatives of Bourne shell
- ksh: Korn shell (popular)
- bash: Bourne Again SHell — most popular, developed by GNU. Default in most Linux distros.

Command to check current shell: echo $SHELL
Command to see shell type: cat /etc/shells`,
    keyPoints: [
      "Shell = command-line interpreter. Interface between user and kernel.",
      "Syntax: command [arg1] [arg2]... (brackets = optional arguments)",
      "Shell parses: command name + options + filenames",
      "Shell searches $PATH variable for command executable",
      "sh: original Bourne shell. bash: most popular (GNU, default Linux).",
      "csh/tcsh: Bourne derivatives. ksh: Korn shell.",
      "echo $SHELL: shows current shell. Typical value: /bin/bash",
      "./mycommand: run specific file. No path: search $PATH directories.",
    ],
    formula: {
      code: `Shell command syntax:
  command [option1] [option2] [filename]
  
  Examples:
  ls                    → list current directory
  ls -la /home          → list /home with details
  cp file1.txt file2.txt → copy file
  grep -i "error" log.txt → search in file

PATH-based search:
  echo $PATH
  /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  
  When you type "ls":
  1. Not starting with ./ → search PATH
  2. Check /usr/local/sbin/ls → not found
  3. Check /usr/local/bin/ls → not found
  4. Check /usr/bin/ls → FOUND → execute it!

Various Shells:
  sh      → /bin/sh   (original, minimal)
  bash    → /bin/bash (most common, feature-rich)
  csh     → /bin/csh  (C-like syntax)
  ksh     → /bin/ksh  (Korn shell)
  
  Check: echo $SHELL  → /bin/bash`,
      explanation: "Shell acts as the middleman: user types → shell interprets → kernel executes. PATH determines where to look for commands.",
    },
    examTips: [
      "Shell = interface between USER and KERNEL",
      "bash = Bourne Again SHell. Most popular Linux shell. GNU project.",
      "$PATH: ordered list of directories searched for commands",
      "echo $SHELL shows current shell. cat /etc/shells shows all installed shells.",
    ],
    questions: [
      { q: "What is the shell and what is its role?", a: "The shell is the Linux command-line interpreter. It provides an interface between the user and the kernel. When a user enters a command, the shell parses it (identifies command name, options, arguments), searches the $PATH for the executable, and asks the kernel to execute it. It can run commands, scripts, and user programs." },
    ],
  },

  "env-vars": {
    title: "Environment Variables & Shell Variables", emoji: "📦",
    tldr: "Environment vars: inherited by child processes. Shell vars: shell-only, NOT inherited. export = promote shell var → env var.",
    explanation: `Environment Variables: defined for the current shell AND inherited by any child shells or processes. Used to pass information to spawned processes. By convention, UPPERCASE names (e.g., PATH, HOME, USER).

Shell Variables: contained exclusively within the shell where they're set. NOT inherited by child shells. Used for ephemeral/temporary data (like tracking current directory).

Common Environment Variables:
- SHELL: current shell interpreter (/bin/bash)
- TERM: terminal type to emulate
- USER: current logged-in user
- PWD: current working directory
- OLDPWD: previous working directory (used by cd -)
- PATH: directories searched for commands (colon-separated)
- HOME: current user's home directory

Common Shell Variables:
- BASHOPTS: bash options used when started
- BASH_VERSION: bash version (human-readable)
- BASH_VERSINFO: bash version (machine-readable)

Commands: env or printenv → list all environment variables.`,
    keyPoints: [
      "Environment variables: inherited by ALL child processes",
      "Shell variables: local to current shell only, NOT inherited",
      "By convention: UPPERCASE names for both types",
      "SHELL: current shell. USER: logged in user. HOME: home dir. PWD: cwd.",
      "PATH: directories searched for commands (colon-separated list)",
      "OLDPWD: previous directory (enables cd - to switch back)",
      "env / printenv: list environment variables",
      "export: promote shell variable to environment variable",
    ],
    formula: {
      code: `Creating shell variables:
  MY_VAR="hello"           # Create shell variable
  echo $MY_VAR             # Access: prints "hello"
  
Spawning child shell:
  bash                     # start new child shell
  echo $MY_VAR             # prints nothing! (not inherited)
  exit                     # return to parent shell

Exporting (making it an env var):
  export MY_VAR            # now child shells can see it
  # OR in one step:
  export MY_VAR="hello"
  
  bash                     # new child shell
  echo $MY_VAR             # now prints "hello"!

Removing a variable:
  unset MY_VAR             # removes the variable

Persistent env vars (survive login):
  Edit ~/.profile or ~/.bashrc
  Add: export MY_VAR="value"
  
Listing all env vars:
  env                      # or: printenv
  
Key variables:
  echo $HOME    → /home/santosh
  echo $PATH    → /usr/bin:/bin:/usr/local/bin:...
  echo $USER    → santosh
  echo $PWD     → /home/santosh/projects
  echo $SHELL   → /bin/bash`,
      explanation: "Shell var = local (dies with shell). Export = env var = passed to children. edit .profile for persistence.",
    },
    examTips: [
      "Environment var = inherited by children. Shell var = NOT inherited.",
      "export = convert shell variable into environment variable",
      "PATH = colon-separated. First match wins when searching for commands.",
      "OLDPWD: previous directory. cd - = switch back to it.",
      "unset removes a variable. echo $VAR accesses it.",
    ],
    questions: [
      { q: "What is the difference between a shell variable and an environment variable?", a: "Shell variable: defined in current shell only. NOT inherited by child processes or shells. Lost when the shell exits. Environment variable: defined in current shell AND inherited by all child processes/shells. Used to pass configuration info to spawned processes. You convert a shell variable to an environment variable using export." },
    ],
  },

  "shell-basics": {
    title: "Shell Control Flow — if, loops, break/continue", emoji: "🔀",
    tldr: "if [ condition ]; then ... fi. for/while loops. break exits loop. continue skips to next iteration. Nested loops OK.",
    explanation: `Shell scripting allows control flow — the shell processes commands conditionally and repeatedly.

if Statement:
if [ condition ]; then
    commands
elif [ condition ]; then
    commands
else
    commands
fi

Test conditions: -f file (file exists), -d dir (directory exists), -z string (string empty), -eq (numeric equal), -ne (not equal), -lt (less than), -gt (greater than).

Loops:
for loop: iterate over list. for i in 1 2 3; do ... done
while loop: repeat while condition true. while [ condition ]; do ... done

Nested loops: fully supported.

Loop control:
break: exit the CURRENT loop entirely
continue: skip rest of CURRENT iteration, go to next

Variables in loops: $i, $1, $2 (positional params), $# (arg count), $@ (all args), $? (exit status of last command).`,
    keyPoints: [
      "if [ condition ]; then ... elif ... else ... fi",
      "for i in list; do ... done",
      "while [ condition ]; do ... done",
      "break: exit current loop. continue: skip to next iteration.",
      "-f: file exists. -d: dir exists. -z: string empty. -eq: numeric equal.",
      "$?: exit status of last command (0 = success, non-zero = error)",
      "$#: number of arguments. $@: all arguments. $1,$2,...: positional params.",
      "Nested loops work fine in shell",
    ],
    formula: {
      code: `if statement:
  if [ -f "myfile.txt" ]; then
      echo "file exists!"
  else
      echo "file not found"
  fi

for loop:
  for i in 1 2 3 4 5; do
      echo "Count: $i"
  done
  
  # Range:
  for i in $(seq 1 10); do
      echo $i
  done

while loop:
  count=1
  while [ $count -le 5 ]; do
      echo "Count: $count"
      count=$((count + 1))
  done

Nested loop with break/continue:
  for i in 1 2 3; do
      for j in 1 2 3; do
          if [ $j -eq 2 ]; then
              continue    # skip j=2, not j=3
          fi
          if [ $i -eq 3 ]; then
              break       # exit inner loop when i=3
          fi
          echo "$i $j"
      done
  done

Test operators:
  -f file    → file exists and is regular file
  -d dir     → directory exists
  -z str     → string is empty
  -eq        → numeric equal
  -ne        → not equal
  -lt        → less than
  -gt        → greater than`,
      explanation: "break exits the INNER loop. continue skips the REST of the current iteration in the inner loop.",
    },
    examTips: [
      "if uses [ ] (square brackets = test command). Spaces inside brackets are mandatory.",
      "fi = end of if. done = end of loop. These are REVERSED keywords.",
      "break: exits loop. continue: skips to next iteration.",
      "$? = exit code of last command. 0 = success.",
    ],
    questions: [
      { q: "What is the difference between break and continue in shell loops?", a: "break: immediately exits the current loop entirely — no more iterations run. continue: skips the remaining commands in the current iteration and jumps to the next iteration of the loop. In nested loops, both break and continue affect only the innermost loop they're in." },
    ],
  },

  "cron": {
    title: "cron — Job Scheduling", emoji: "⏰",
    tldr: "cron = daemon that runs scheduled jobs. crontab syntax: min hour day month weekday command. crontab -e to edit. 5 time fields.",
    explanation: `cron is a daemon in Unix/Linux that runs continuously in the background, waking up to handle periodic service requests. The daemon (crond) starts when the system boots.

cron reads crontab (cron tables) files — each user has their own crontab. You can schedule scripts or commands to run automatically at specified times/intervals.

crontab command:
crontab -e: edit your crontab (add/remove/edit jobs)
crontab -l: list current scheduled jobs
crontab -r: remove your crontab

cron Syntax — 5 time fields + command:
* * * * * command
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)

* = any/every value. */n = every n units. Specific number = at that time.

Starting/checking cron:
service crond start / service crond status`,
    keyPoints: [
      "cron = daemon, starts at boot, runs in background",
      "crond = the cron daemon process",
      "crontab = file containing scheduled jobs (one per user)",
      "crontab -e: edit. crontab -l: list. crontab -r: remove.",
      "Syntax: minute hour day-of-month month day-of-week command",
      "* = every value. */n = every n units. 0 = specific value.",
      "0-59 for minutes. 0-23 for hours. 1-31 for days. 1-12 for months. 0-7 for weekday.",
      "* * * * * = every minute. 0 * * * * = every hour on the hour.",
    ],
    formula: {
      code: `crontab syntax:
  MIN HOUR DOM MON DOW COMMAND
  │    │    │   │   │
  │    │    │   │   └── Day of week: 0=Sun,1=Mon,...,7=Sun
  │    │    │   └────── Month: 1-12
  │    │    └────────── Day of month: 1-31
  │    └─────────────── Hour: 0-23
  └──────────────────── Minute: 0-59

cron examples:
  * * * * * /path/to/script.sh       # every minute
  0 * * * * /path/to/script.sh       # every hour (at :00)
  0 0 * * * /path/to/backup.sh       # every day at midnight
  0 2 * * 0 /path/to/weeklyjob.sh    # every Sunday at 2am
  30 9 1 * * /path/to/monthly.sh     # 1st of each month at 9:30
  */5 * * * * /path/to/monitor.sh    # every 5 minutes
  0 9-17 * * 1-5 /path/to/work.sh   # every hour 9am-5pm, Mon-Fri
  0 0 * * 1,3,5 /path/to/mwf.sh     # Mon, Wed, Fri at midnight

Common commands:
  crontab -e           → edit (opens in vi/nano)
  crontab -l           → list all jobs
  crontab -r           → remove ALL your jobs
  service crond start  → start cron daemon
  service crond status → check if running`,
      explanation: "5 fields: min(0-59), hour(0-23), day(1-31), month(1-12), weekday(0-7). * = any. */n = every n.",
    },
    examTips: [
      "5 cron time fields: minute, hour, day-of-month, month, day-of-week — in that order",
      "* = every. */5 = every 5. 0 = at the zero (e.g., hour 0 = midnight).",
      "crontab -e to edit. crontab -l to list. crontab -r to remove.",
      "crond = the daemon. crontab = the file/command. cron = the concept.",
      "0 * * * * = every hour at minute 0 (top of the hour)",
    ],
    questions: [
      { q: "Write a crontab entry to run /scripts/backup.sh every day at 2:30am.", a: "30 2 * * * /scripts/backup.sh  (minute=30, hour=2, day-of-month=*, month=*, weekday=*)" },
      { q: "What does this crontab entry do: */10 9-17 * * 1-5 /scripts/check.sh", a: "Runs /scripts/check.sh every 10 minutes, between 9am and 5pm, Monday through Friday. (*/10=every 10 min, 9-17=hours 9 to 17, *=any day, *=any month, 1-5=Mon-Fri)" },
    ],
  },
};
