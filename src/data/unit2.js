// Auto-extracted from unit2.jsx
export const groups = [
  { name: "🔗 IPC Basics", ids: ["ipc-intro","bounded-buffer","shared-memory","message-passing"] },
  { name: "📨 MP Details", ids: ["direct-indirect","mp-sync","buffering"] },
  { name: "🪈 System Calls", ids: ["pipes","fifos","msg-queues","ipc-semaphores"] },
  { name: "🧵 Threads", ids: ["threads-intro","threads-vs-proc","threading-models","pthreads-api"] },
  { name: "⚡ Concurrency", ids: ["amdahls","concurrency-parallelism","thread-scheduling"] },
  { name: "🔒 Synchronization", ids: ["race-condition","critical-section","petersons","hw-sync"] },
  { name: "🔑 Locks & Mutex", ids: ["tsl-cas","mutex-locks","semaphore","semaphore-impl"] },
  { name: "🏛️ Classic Problems", ids: ["bounded-buffer-sem","readers-writers","dining-philosophers"] },
  { name: "💀 Deadlocks", ids: ["deadlock-intro","deadlock-4conditions","rag","deadlock-handling"] },
  { name: "🛡️ DL Prevention/Avoidance", ids: ["deadlock-prevention","safe-state","bankers"] },
  { name: "🔎 Detection & Signals", ids: ["deadlock-detection","signals"] },
];

export const topics = {
  "ipc-intro": {
    title: "IPC — Overview", emoji: "🔗",
    tldr: "Independent vs cooperating processes. Two IPC models: Shared Memory (fast) and Message Passing (safe). 4 reasons to cooperate.",
    explanation: `Processes can be independent (no effect on each other) or cooperating (can affect/be affected by each other, share data).

4 reasons for process cooperation: Information sharing, Computation speedup, Modularity, Convenience.

Two IPC models: Shared Memory — an OS-allocated region of memory accessible by multiple processes; fastest IPC but requires explicit synchronization. Message Passing — processes communicate via send/receive without shared variables; safer, OS manages transfers.`,
    keyPoints: [
      "Independent: no effect on other processes. Cooperating: can share/affect data.",
      "4 reasons: Information sharing, Computation speedup, Modularity, Convenience",
      "Two IPC models: Shared Memory vs Message Passing",
      "Shared Memory: fastest IPC (no copying), but needs synchronization",
      "Message Passing: safer, no shared variables, OS manages it",
    ],
    formula: null,
    examTips: [
      "Shared Memory = FASTEST form of IPC (no copy between processes)",
      "Message Passing = no shared variables, uses send()/receive()",
      "4 reasons for cooperation: Info sharing, Speed, Modularity, Convenience — all 4",
    ],
    questions: [
      { q: "Why is shared memory the fastest form of IPC?", a: "Data is directly accessible by both processes without any copying. Message passing copies data from sender's memory to kernel to receiver's memory — shared memory skips all of this." },
      { q: "What are the 4 reasons for process cooperation?", a: "Information sharing, Computation speedup, Modularity, Convenience." },
    ],
  },
  "bounded-buffer": {
    title: "Producer-Consumer & Bounded Buffer", emoji: "🔄",
    tldr: "Circular array. in=next free, out=first full. Full: ((in+1)%N)==out. Empty: in==out. Only N-1 usable slots.",
    explanation: `The Producer-Consumer problem models cooperating processes: producer generates data, consumer uses it.

Unbounded buffer: no limit on size — producer never waits, consumer waits if empty.
Bounded buffer: fixed size N. Producer waits when buffer full, consumer waits when empty.

Implementation: circular array of size BUFFER_SIZE. Two pointers: in (next free position) and out (first full position). Buffer empty: in == out. Buffer full: ((in+1) % BUFFER_SIZE) == out. Only BUFFER_SIZE-1 elements usable (one slot sacrificed to distinguish full from empty).`,
    keyPoints: [
      "in = next free position, out = first full position",
      "Empty condition: in == out",
      "Full condition: ((in + 1) % BUFFER_SIZE) == out",
      "Only BUFFER_SIZE - 1 elements usable (one slot wasted)",
      "Producer busy-waits when full. Consumer busy-waits when empty.",
      "Circular buffer: modulo arithmetic for wrap-around",
    ],
    formula: {
      code: `#define BUFFER_SIZE 10
item buffer[BUFFER_SIZE];
int in = 0, out = 0;

PRODUCER:
  while (((in + 1) % BUFFER_SIZE) == out)
    ; /* busy wait — buffer full */
  buffer[in] = next_produced;
  in = (in + 1) % BUFFER_SIZE;

CONSUMER:
  while (in == out)
    ; /* busy wait — buffer empty */
  next_consumed = buffer[out];
  out = (out + 1) % BUFFER_SIZE;

BUFFER_SIZE=10 → max 9 items at a time (1 slot wasted)`,
      explanation: "One slot wasted to distinguish full (N-1 items) from empty (0 items).",
    },
    examTips: [
      "Full: ((in+1) % N) == out. Empty: in == out. MEMORIZE both.",
      "Only N-1 slots usable out of N total (exam favorite!)",
      "in points to NEXT FREE. out points to FIRST FULL.",
      "This version has a race condition on 'in' and 'out' — fixed later with semaphores",
    ],
    questions: [
      { q: "BUFFER_SIZE=5. in=3, out=3. Is buffer full or empty?", a: "Empty. in == out → buffer is empty." },
      { q: "BUFFER_SIZE=5. in=2, out=3. Is buffer full?", a: "Full check: (2+1)%5 = 3 == out(3). YES — buffer is full." },
    ],
  },
  "shared-memory": {
    title: "Shared Memory IPC", emoji: "🧠",
    tldr: "Shared region allocated by OS, controlled by USER processes. Fastest IPC. Synchronization is programmer's responsibility.",
    explanation: `Shared memory IPC: the OS allocates a region of memory, then steps aside. After setup, the communication is entirely controlled by user processes (not the OS). This makes it the fastest IPC because there's no kernel involvement during data transfer.

The catch: synchronization is entirely the programmer's job. If two processes access shared memory simultaneously without coordination, data corruption occurs. Typically solved with semaphores or record locking.

Typical pattern: one process (server) writes to the region, another (client) reads. The client must NOT read until the server finishes writing.`,
    keyPoints: [
      "OS allocates shared region → then user processes control it",
      "Fastest IPC: zero copying, no kernel involvement after setup",
      "Synchronization is programmer's responsibility (not OS)",
      "Semaphores typically used to synchronize access",
      "Two+ processes map same physical memory to their virtual address spaces",
      "Major issue: preventing concurrent access (race conditions)",
    ],
    formula: {
      code: `Typical shared memory usage:
  1. shmget() — create/get shared memory segment
  2. shmat() — attach segment to process address space
  3. [use the shared memory directly via pointer]
  4. shmdt() — detach segment
  5. shmctl() — control/destroy segment

Server (writer):            Client (reader):
  sem_wait(&empty)            sem_wait(&full)
  write to shared_buf         read from shared_buf
  sem_post(&full)             sem_post(&empty)`,
      explanation: "After setup, shared memory is accessed like regular memory — no system calls needed.",
    },
    examTips: [
      "Shared memory: OS sets it up, then USER controls it (not OS)",
      "Fastest IPC because NO copying — processes directly access same physical pages",
      "Synchronization NOT handled by OS — programmer must use semaphores/locks",
    ],
    questions: [
      { q: "Why must shared memory access be synchronized?", a: "Without synchronization, two processes could access the shared region simultaneously — e.g., client reads while server is mid-write, getting partially updated (corrupted) data." },
    ],
  },
  "message-passing": {
    title: "Message Passing IPC", emoji: "📨",
    tldr: "No shared variables. OS provides send(msg) and receive(msg). Fixed or variable message sizes.",
    explanation: `Message passing lets processes communicate without shared variables. The IPC facility provides exactly two operations: send(message) and receive(message). The OS manages all data transfer through the kernel.

To communicate, two processes P and Q must: (1) establish a communication link between them, (2) exchange messages via send/receive.

Implementation questions: How are links established? Can a link involve more than 2 processes? How many links between one pair? What is the capacity? Fixed or variable message size? Unidirectional or bidirectional?

Physical: shared memory, hardware bus, network. Logical: direct/indirect, sync/async, automatic/explicit buffering.`,
    keyPoints: [
      "No shared variables — all through OS kernel",
      "Two primitives: send(message) and receive(message)",
      "Message size: fixed (simple implementation) or variable (flexible)",
      "Physical implementation: shared mem, hardware bus, network",
      "Logical: direct vs indirect, synchronous vs asynchronous",
      "Link properties: unidirectional or bidirectional",
    ],
    formula: {
      code: `// Message passing producer-consumer (trivial version):
Producer:
  message next_produced;
  while (true) {
    /* produce item */
    send(next_produced);
  }

Consumer:
  message next_consumed;
  while (true) {
    receive(next_consumed);
    /* consume item */
  }

Much simpler than shared memory! No in/out pointers needed.`,
      explanation: "Message passing hides buffer management from programmer.",
    },
    examTips: [
      "Message passing = NO shared variables (everything through OS)",
      "Two operations ONLY: send() and receive()",
      "Physical vs Logical implementation distinction — know both",
      "Direct: name each other explicitly. Indirect: use mailboxes/ports.",
    ],
    questions: [
      { q: "What are the two operations provided by a message-passing IPC facility?", a: "send(message) and receive(message)." },
    ],
  },
  "direct-indirect": {
    title: "Direct vs Indirect Communication", emoji: "🎯",
    tldr: "Direct: name each other explicitly, 1 link per pair. Indirect: mailboxes/ports with unique IDs, many processes can share.",
    explanation: `Direct Communication: processes name each other explicitly. send(P, msg) → send to process P. receive(Q, msg) → receive from Q. Properties: links established automatically, exactly one link per pair of processes, usually bidirectional.

Indirect Communication: messages go through mailboxes (also called ports). Each mailbox has a unique ID. Processes share a mailbox to communicate. send(A, msg) → send to mailbox A. receive(A, msg) → receive from A. Multiple processes can share a mailbox. A pair can have multiple links.

Mailbox sharing problem: P1 sends to mailbox A, P2 and P3 both try to receive — who gets the message? Solutions: allow only 2 processes per link, allow only 1 receiver at a time, or let OS choose and notify sender.`,
    keyPoints: [
      "Direct: send(P, msg) / receive(Q, msg) — name each other explicitly",
      "Direct: 1 link per pair, auto-established, usually bidirectional",
      "Indirect: send(A, msg) / receive(A, msg) — through mailbox A",
      "Indirect: link exists only if processes share a mailbox",
      "Indirect: 1 link can involve MANY processes",
      "Indirect: 1 pair can have MULTIPLE links (different mailboxes)",
      "Mailbox sharing ambiguity: who receives when multiple processes share?",
    ],
    formula: {
      code: `Direct Communication:
  send(P, "hello")    → directly to process P
  receive(Q, &buf)    → directly from process Q

  Properties:
  - Exactly 1 link per pair (P↔Q)
  - Auto-established when both sides name each other
  - Symmetric: both sides must name each other

Indirect Communication (Mailboxes/Ports):
  send(mailbox_A, "hello")   → to mailbox A
  receive(mailbox_A, &buf)   → from mailbox A

  Mailbox operations:
  - create_mailbox(id)
  - send(mailbox, message)
  - receive(mailbox, message)
  - destroy_mailbox(id)`,
      explanation: "Direct: tight coupling (both know each other). Indirect: loose coupling (share mailbox).",
    },
    examTips: [
      "Direct: exactly 1 link per pair. Indirect: multiple links possible per pair.",
      "Indirect: link only exists if processes SHARE a mailbox",
      "Direct is simpler but less flexible (naming both sides = hard coupling)",
      "Mailbox ambiguity: exam Q about who gets message when 3 processes share",
    ],
    questions: [
      { q: "P1, P2, P3 share mailbox A. P1 sends. P2 and P3 both try to receive. Who gets it?", a: "It's ambiguous. Solutions: (1) allow only 2 processes per link, (2) only 1 can receive at a time, (3) OS picks arbitrarily and notifies sender." },
    ],
  },
  "mp-sync": {
    title: "Message Passing Synchronization", emoji: "⏱️",
    tldr: "Blocking=synchronous. Non-blocking=asynchronous. Both blocking = rendezvous.",
    explanation: `Message passing can be blocking (synchronous) or non-blocking (asynchronous).

Blocking send: sender blocks until the message is received by receiver.
Blocking receive: receiver blocks until a message is available.
Non-blocking send: sender sends and continues immediately (fire-and-forget).
Non-blocking receive: receiver gets a valid message OR null immediately.

Key combination: if BOTH send and receive are blocking, we have a rendezvous — sender and receiver meet and synchronize directly.

Different combinations: blocking send + blocking receive = rendezvous. Non-blocking send + blocking receive = most common in practice.`,
    keyPoints: [
      "Blocking send: sender WAITS until message is received",
      "Blocking receive: receiver WAITS until a message is available",
      "Non-blocking send: sender fires and continues immediately",
      "Non-blocking receive: gets message OR null (never blocks)",
      "Both blocking = RENDEZVOUS (processes synchronize at send/receive point)",
      "Blocking = synchronous. Non-blocking = asynchronous.",
    ],
    formula: {
      code: `Combinations:
  Blocking send    + Blocking receive   = RENDEZVOUS (sync point)
  Blocking send    + Non-blocking recv  = possible
  Non-blocking send + Blocking receive  = most common
  Non-blocking send + Non-blocking recv = fully async

Rendezvous example:
  Sender:   send(P, msg)    ← BLOCKS until P receives
  Receiver: receive(Q, msg) ← BLOCKS until Q sends
  → Both must reach their operation before either proceeds
  → Useful for strict synchronization (Ada language uses this)`,
      explanation: "Rendezvous = both blocking. Like a handshake — both parties must be ready.",
    },
    examTips: [
      "Rendezvous = BOTH send AND receive are blocking",
      "Blocking = synchronous. Non-blocking = asynchronous.",
      "Non-blocking receive: returns valid message OR null (never waits)",
      "Blocking send: sender cannot proceed until receiver gets message",
    ],
    questions: [
      { q: "What is a rendezvous in message passing?", a: "When BOTH send and receive are blocking. The sender blocks until the message is received, and the receiver blocks until a message is available — they 'meet' at the communication point." },
    ],
  },
  "buffering": {
    title: "Message Buffering", emoji: "📦",
    tldr: "Zero capacity: rendezvous (sender waits). Bounded: sender waits if full. Unbounded: sender never waits.",
    explanation: `A link has a queue of messages attached to it. Three buffer capacity schemes:

Zero capacity (no buffering): queue length = 0. Sender MUST wait for receiver to be ready. This forces a rendezvous. Sometimes called "message system with no buffering."

Bounded capacity: finite queue of n messages. Sender waits only if the queue is full. Otherwise, sender can continue after depositing message.

Unbounded capacity: infinite queue. Sender NEVER waits, regardless of how many messages are already queued.

Zero capacity = no buffering. Bounded and unbounded = automatic buffering.`,
    keyPoints: [
      "Zero capacity: queue=0 → sender must wait (rendezvous forced)",
      "Bounded capacity: queue of n → sender waits only when full",
      "Unbounded capacity: infinite queue → sender NEVER waits",
      "Zero capacity = no buffering. Bounded/Unbounded = automatic buffering",
      "Buffer = temporary queue attached to communication link",
    ],
    formula: {
      code: `Buffer Capacity:
  ┌──────────────┬────────────────────────────────┐
  │ Capacity     │ Sender behavior                │
  ├──────────────┼────────────────────────────────┤
  │ Zero (0)     │ Always waits → RENDEZVOUS      │
  │ Bounded (n)  │ Waits only if queue is FULL    │
  │ Unbounded    │ Never waits                    │
  └──────────────┴────────────────────────────────┘

Zero capacity example:
  send(P, msg) → must wait until P calls receive()
  
Bounded (n=3):
  Queue: [msg1][msg2][msg3] → FULL → sender waits
  Queue: [msg1][msg2]       → sender can proceed`,
      explanation: "Zero capacity requires receiver ready before sender can send.",
    },
    examTips: [
      "Zero capacity → rendezvous (sender always waits)",
      "Unbounded capacity → sender NEVER waits (ideal but impractical)",
      "Zero = no buffering. Bounded/Unbounded = automatic buffering.",
    ],
    questions: [
      { q: "When does a sender block in bounded-capacity buffering?", a: "Only when the queue is full (all n slots occupied). If there's at least one free slot, the sender deposits the message and continues." },
    ],
  },
  "pipes": {
    title: "Pipes", emoji: "🪈",
    tldr: "Oldest Unix IPC. Half-duplex (one direction). Only between related processes (parent-child). fd[0]=read, fd[1]=write.",
    explanation: `Pipes are the oldest form of Unix IPC. Two limitations: (1) historically half-duplex (one direction only), (2) only between processes with a common ancestor (usually parent-child via fork).

pipe() system call returns two file descriptors: fd[0] for reading, fd[1] for writing. Data written to fd[1] comes out of fd[0]. Data flows through the kernel.

After fork, for parent→child pipe: parent closes fd[0] (read end), child closes fd[1] (write end). For child→parent: parent closes fd[1], child closes fd[0].

popen()/pclose(): higher-level functions that create a pipe, fork, exec a shell command, and return a FILE pointer. popen("cmd", "r") → read command's output. popen("cmd", "w") → write to command's input.`,
    keyPoints: [
      "Oldest Unix IPC mechanism",
      "Limitation 1: half-duplex (one direction only)",
      "Limitation 2: only between related processes (parent-child via fork)",
      "fd[0] = read end. fd[1] = write end.",
      "Parent→child: parent closes fd[0], child closes fd[1]",
      "Child→parent: parent closes fd[1], child closes fd[0]",
      "popen('cmd','r'): read from command. popen('cmd','w'): write to command.",
      "pclose(): close pipe, wait for command, return exit status",
    ],
    formula: {
      code: `int fd[2];
pipe(fd);   // creates pipe

if (fork() == 0) {
  // CHILD: read from pipe (parent→child direction)
  close(fd[1]);          // child closes write end
  read(fd[0], buf, N);   // child reads
  close(fd[0]);
} else {
  // PARENT: write to pipe
  close(fd[0]);          // parent closes read end
  write(fd[1], msg, N);  // parent writes
  close(fd[1]);
}

fd[1] → [KERNEL BUFFER] → fd[0]
           (pipe)`,
      explanation: "Always close the unused end. Both write and read ends of an unused pipe must be closed.",
    },
    examTips: [
      "fd[0]=read, fd[1]=write — NEVER confuse these",
      "Parent→child: parent closes fd[0] (read), child closes fd[1] (write)",
      "Pipes only work between related processes (common ancestor) — FIFOs fix this",
      "Half-duplex: need TWO pipes for bidirectional communication",
    ],
    questions: [
      { q: "Why does the parent close fd[0] when creating a parent-to-child pipe?", a: "fd[0] is the read end. If the parent is sending (writing), it has no use for the read end. Closing unused ends is essential — otherwise EOF is never signaled on the read end." },
    ],
  },
  "fifos": {
    title: "FIFOs (Named Pipes)", emoji: "📋",
    tldr: "Named pipes. Appear as files in filesystem. Unrelated processes can communicate (unlike anonymous pipes).",
    explanation: `FIFOs (also called named pipes) solve the main limitation of pipes: they allow unrelated processes to communicate.

Unlike anonymous pipes (which exist only in kernel memory), a FIFO appears as a named file in the filesystem. Any process that knows the name can open it with the standard open() system call.

mkfifo() creates a FIFO file. Once created, normal file I/O functions work on it: open(), read(), write(), close(), unlink().

Two main uses: (1) Shell commands — pass data between pipeline stages without temporary files. (2) Client-server rendezvous — clients and servers exchange data using well-known FIFO names.`,
    keyPoints: [
      "Named pipe — appears as a file in the filesystem",
      "Unrelated processes can communicate (unlike anonymous pipes)",
      "mkfifo() creates a FIFO file",
      "Once created: use open(), read(), write(), close(), unlink()",
      "Use 1: shell pipelines without intermediate temp files",
      "Use 2: client-server rendezvous point",
      "Still half-duplex by default (like pipes)",
    ],
    formula: {
      code: `// Create a FIFO:
mkfifo("/tmp/myfifo", 0644);

// Writer process:
int fd = open("/tmp/myfifo", O_WRONLY);
write(fd, "hello", 5);
close(fd);

// Reader process (can be unrelated!):
int fd = open("/tmp/myfifo", O_RDONLY);
read(fd, buf, 5);
close(fd);

// Remove when done:
unlink("/tmp/myfifo");

Key: open() BLOCKS until both ends are connected!
  → Writer blocks until reader opens, and vice versa.`,
      explanation: "FIFO open() blocks until BOTH sides (reader+writer) have opened — natural rendezvous.",
    },
    examTips: [
      "FIFO = named pipe. Anonymous pipe = unnamed pipe.",
      "FIFOs solve: unrelated processes can communicate (pipes can't do this)",
      "mkfifo() creates it. Then use normal file I/O (open, read, write, unlink).",
      "open() on a FIFO blocks until BOTH sides are open (built-in rendezvous).",
    ],
    questions: [
      { q: "What advantage do FIFOs have over pipes?", a: "FIFOs allow unrelated processes to communicate. Pipes require a common ancestor (parent-child). FIFOs have a filesystem name, so any process that knows the name can open and use it." },
    ],
  },
  "msg-queues": {
    title: "Message Queues", emoji: "📬",
    tldr: "Kernel-maintained linked list of messages. Not necessarily FIFO — can fetch by TYPE. msgget/msgsnd/msgrcv.",
    explanation: `A message queue is a linked list of messages stored within the kernel, identified by a message queue ID. Unlike pipes (byte stream), message queues preserve message boundaries and allow selective retrieval.

msgget(): create or open an existing queue → returns queue ID.
msgsnd(): add a message to the end of the queue. Each message has a type (positive long integer), length, and data bytes.
msgrcv(): fetch a message from the queue. Can fetch by type field — not necessarily first-in-first-out! This selective retrieval by type is the key advantage.

Persistent: message queues persist until explicitly deleted or system reboot (unlike pipes which vanish when processes close them).`,
    keyPoints: [
      "Kernel-maintained linked list of typed messages",
      "msgget(): create/open queue → returns ID",
      "msgsnd(): add message (type + length + data) to end of queue",
      "msgrcv(): fetch message — CAN be by type (not necessarily FIFO!)",
      "Type field: positive long integer per message",
      "Persistent: survives process exits (unlike pipes/FIFOs)",
      "Key advantage: selective fetch by message type",
    ],
    formula: {
      code: `Message structure:
  struct msgbuf {
    long mtype;      // type > 0 (e.g., 1=command, 2=data)
    char mtext[100]; // actual message data
  };

// Create/open queue:
int qid = msgget(IPC_PRIVATE, 0666 | IPC_CREAT);

// Send (type=1):
struct msgbuf buf = {1, "hello"};
msgsnd(qid, &buf, strlen("hello")+1, 0);

// Receive type=2 (not necessarily first message!):
msgrcv(qid, &buf, sizeof(buf.mtext), 2, 0);

// If msgtype=0 → get first message in queue (FIFO)
// If msgtype>0 → get first message of that type
// If msgtype<0 → get first msg with lowest type ≤ |msgtype|`,
      explanation: "msgtype in msgrcv controls selective retrieval — key feature vs pipes.",
    },
    examTips: [
      "Message queues: NOT necessarily FIFO (can fetch by type)",
      "Each message has a TYPE field — this enables priority/categorized delivery",
      "Persistent: survives after sender exits (unlike pipes)",
      "msgget → msgsnd → msgrcv → msgctl (to destroy)",
    ],
    questions: [
      { q: "How do message queues differ from pipes in terms of message retrieval?", a: "Pipes are strict byte-stream FIFO. Message queues allow selective retrieval by type field — you can skip messages and get a specific type without removing earlier messages." },
    ],
  },
  "ipc-semaphores": {
    title: "IPC Semaphores (System V)", emoji: "🚦",
    tldr: "Counter for shared resource access. semget/semctl/semop. Test→decrement→use→increment.",
    explanation: `A semaphore is a counter used to control access to shared resources for multiple processes.

To acquire a resource: (1) Test the semaphore. (2) If > 0: decrement and use resource. (3) If = 0: sleep until someone increments it. When done: increment the semaphore, wake any waiting processes.

System V IPC semaphore API: semget() to get a semaphore ID, semctl() for control operations, semop() to atomically perform operations on a semaphore set.

Key: semop is atomic — it performs an entire array of operations as one indivisible unit.`,
    keyPoints: [
      "Counter controlling access to shared resources",
      "To acquire: if > 0 → decrement and use; if = 0 → sleep",
      "To release: increment + wake waiting processes",
      "semget(): obtain semaphore ID",
      "semctl(): control operations (get/set value, remove)",
      "semop(): atomically perform array of operations on semaphore set",
      "POSIX: sem_init, sem_wait (P/down), sem_post (V/up)",
    ],
    formula: {
      code: `System V Semaphore:
  semget() → get semaphore ID
  semctl() → initialize/control
  semop()  → atomic P/V operations

POSIX Semaphore (simpler):
  sem_t s;
  sem_init(&s, 0, 1);   // 0=thread-shared, initial=1
  
  sem_wait(&s);          // P / down / decrement
    // critical section
  sem_post(&s);          // V / up / increment

Algorithm:
  acquire resource:
    if (sem > 0) sem-- then use
    else sleep until sem > 0

  release resource:
    sem++
    if (waiting processes) wake one`,
      explanation: "sem_wait = P = down = decrement. sem_post = V = up = increment.",
    },
    examTips: [
      "sem_wait = P = down = decrement. sem_post = V = up = increment.",
      "semop is ATOMIC — entire array of operations at once",
      "POSIX sem_init(sem, pshared, value): pshared=0 for threads, 1 for processes",
      "Semaphore value > 0: resource available. = 0: blocked.",
    ],
    questions: [
      { q: "What happens when a process calls sem_wait() on a semaphore with value 0?", a: "The process blocks (goes to sleep) and is placed in the waiting queue. It stays there until another process calls sem_post(), which increments the semaphore and wakes one waiting process." },
    ],
  },
  "threads-intro": {
    title: "Threads — Introduction & Benefits", emoji: "🧵",
    tldr: "Thread = CPU unit. Has: ID, PC, registers, stack. Shares: code, data, files, signals. 4 benefits.",
    explanation: `A thread is the fundamental unit of CPU utilization. Unlike processes, threads within the same process share code, data, file descriptors, and signals — they only have their own ID, program counter, register set, and stack.

4 benefits of multithreading:
Responsiveness: even if one thread blocks, others keep running (e.g., browser loads image in background while UI remains responsive).
Resource Sharing: threads share process resources without needing IPC (shared memory or message passing).
Economy: creating a thread is much cheaper than creating a process. In Solaris: process creation ~30× slower; context switch ~5× slower.
Scalability: threads can run truly in parallel on multiple cores.`,
    keyPoints: [
      "Thread = CPU utilization unit. Contains: ID, PC, registers, stack",
      "Shares with other threads: code, data, file descriptors, signals",
      "Benefit 1: Responsiveness (one thread blocks, others continue)",
      "Benefit 2: Resource Sharing (easier than IPC)",
      "Benefit 3: Economy (cheaper than process creation/switching)",
      "Benefit 4: Scalability (parallel on multiple cores)",
      "Solaris: process creation ~30× slower than thread creation",
      "Solaris: context switch ~5× slower for process vs thread",
    ],
    formula: null,
    examTips: [
      "4 benefits: Responsiveness, Resource Sharing, Economy, Scalability — all 4",
      "Thread private: ID, PC, registers, stack. Thread shared: code, data, files, signals",
      "Economy: Solaris numbers (30× and 5×) — popular exam data points",
      "Thread = cheaper than process. Context switch = cheaper than process switch.",
    ],
    questions: [
      { q: "What data does a thread own privately vs share with sibling threads?", a: "Private: thread ID, program counter, register set, stack. Shared with other threads in same process: code segment, data segment, heap, open file descriptors, signals." },
      { q: "How much cheaper is thread creation vs process creation in Solaris?", a: "~30× faster to create a thread than a process. Context switching is ~5× faster for threads." },
    ],
  },
  "threads-vs-proc": {
    title: "Threads vs Processes", emoji: "⚖️",
    tldr: "Process: isolated memory, file descriptors, signals. Thread: shares all of these. Thread = lighter weight.",
    explanation: `Processes are isolated by default — they don't share memory or file descriptors unless explicitly set up with IPC. Threads, being parts of the same process, share everything by default.

Process (doesn't share): memory, most file descriptors, filesystem context (cwd, umask), signal handling.
Thread (shares by default): memory (globals, heap), file descriptors, filesystem context, signal handling.

Thread private state (in TCB — Thread Control Block): CPU registers, program counter, execution stack. The stack is critical — it holds local variables, return addresses, and function call chains for that specific thread.

This sharing makes threads cheaper and more efficient but also means bugs in one thread can affect all others.`,
    keyPoints: [
      "Process: isolated memory, FDs, filesystem context, signals",
      "Thread: shares memory, FDs, filesystem context, signal handling",
      "Thread-private (in TCB): registers, PC, stack",
      "Shared: globals, heap, I/O state, network connections",
      "TCB = Thread Control Block (analogous to PCB for processes)",
      "Shared stack = disaster. Each thread needs its own stack.",
      "Bug in one thread can corrupt shared memory and crash all threads",
    ],
    formula: {
      code: `Process Address Space:
  ┌─────────────────────┐
  │   Stack (Thread 1)  │ ← thread-private
  │   Stack (Thread 2)  │ ← thread-private
  │   Stack (Thread 3)  │ ← thread-private
  ├─────────────────────┤
  │    Heap (shared)    │ ← all threads share
  ├─────────────────────┤
  │   Data (shared)     │ ← global variables
  ├─────────────────────┤
  │   Code (shared)     │ ← same executable
  └─────────────────────┘

TCB (Thread Control Block):
  thread_id, registers, PC, stack_pointer, state`,
      explanation: "Each thread gets its own stack but shares everything else with siblings.",
    },
    examTips: [
      "Thread-private: registers, PC, stack. Everything else = shared.",
      "TCB = Thread Control Block. Stores per-thread state.",
      "One bug in shared memory affects ALL threads in process",
      "Thread creation: no new address space needed → much cheaper than fork()",
    ],
    questions: [
      { q: "Why does each thread need its own stack?", a: "The stack holds local variables, function parameters, and return addresses — these are specific to each thread's execution context. Sharing a stack would corrupt each thread's function call chain." },
    ],
  },
  "threading-models": {
    title: "Multithreading Models", emoji: "🗺️",
    tldr: "Many-to-One: fast but 1 block=all block. One-to-One: most common (Linux/Windows). Many-to-Many: best of both.",
    explanation: `Threads exist at two levels: user threads (managed by thread library, OS-invisible) and kernel threads (OS-managed, can run in parallel).

Many-to-One: many user threads → one kernel thread. Fast (no kernel calls for thread ops). Problem: one thread blocking blocks ALL (kernel sees only 1 thread). No true parallelism. Examples: Solaris Green Threads, GNU Portable Threads.

One-to-One: each user thread → one kernel thread. True parallelism possible. Blocking one thread doesn't block others. Cost: creating a user thread creates a kernel thread (overhead). Limit on thread count sometimes enforced. Examples: Linux, Windows.

Many-to-Many: many user threads → many kernel threads (≤ user count). Best of both worlds. Complex to implement. Examples: Solaris < 9, Windows ThreadFiber.

Two-level model: M:M + allows pinning a user thread to a specific kernel thread.`,
    keyPoints: [
      "Many-to-One: fast, no parallelism, one block = all block",
      "One-to-One: true parallelism, one block doesn't affect others, overhead",
      "Many-to-Many: flexible, OS creates enough kernel threads, complex",
      "Two-level: M:M with optional pinning (binding user→kernel thread)",
      "Linux and Windows: One-to-One",
      "Solaris Green Threads: Many-to-One (legacy)",
      "User thread library: Pthreads, Windows threads, Java threads",
    ],
    formula: {
      code: `Many-to-One:
  [UT1][UT2][UT3][UT4] → [KT1]
  All multiplexed onto ONE kernel thread
  → UT1 blocks in kernel → UT2,UT3,UT4 all blocked!

One-to-One:
  [UT1] → [KT1]
  [UT2] → [KT2]
  [UT3] → [KT3]
  → UT1 blocks → UT2, UT3 still run freely

Many-to-Many (N user, M kernel, M ≤ N):
  [UT1][UT2] → [KT1]
  [UT3][UT4] → [KT2]
  OS chooses M based on system load

Model    | Linux | Windows | True Parallel | One Block = All Block
---------|-------|---------|---------------|---------------------
M:1      |  No   |   No    |      No       |       YES
1:1      | YES   |  YES    |     YES       |        No
M:M      |  No   |  opt    |     YES       |        No`,
      explanation: "Linux/Windows use 1:1. M:1 is obsolete. M:M is complex but flexible.",
    },
    examTips: [
      "Linux = One-to-One. Windows = One-to-One. Solaris old = Many-to-Many.",
      "M:1 problem: one thread blocking blocks ALL (OS sees only 1 thread)",
      "1:1 advantage: true parallelism on multicore. Cost: kernel thread per user thread.",
      "M:M advantage: best of both, but complex implementation",
    ],
    questions: [
      { q: "Why can't Many-to-One model achieve true parallelism on multicore?", a: "All user threads map to ONE kernel thread. The OS only sees and schedules one kernel thread at a time, so only one can run on one CPU core — even if multiple cores are available." },
    ],
  },
  "pthreads-api": {
    title: "Pthreads API", emoji: "🔧",
    tldr: "pthread_create, pthread_join, pthread_exit. Zombie thread if not joined or detached. Don't pass stack variable to create.",
    explanation: `Pthreads (POSIX Threads): a POSIX standard (IEEE 1003.1c) for thread creation and synchronization. Common in Unix systems.

pthread_create(): spawns new thread. Parameters: thread handle, attributes, function pointer (runner), argument. Common mistake: passing a local variable's address — if the creating function returns before the thread uses it, the variable is gone from the stack.

pthread_join(): blocks until target thread terminates. Essential for cleanup. Returns the thread's return value via retval pointer.

pthread_exit(): explicitly terminate a thread. If called from main(), the process stays alive until ALL other threads finish (unlike return from main() which kills everything immediately).

Zombie Thread: if a thread finishes but is never joined or detached, it remains as a zombie consuming kernel resources indefinitely.`,
    keyPoints: [
      "pthread_create(): create thread — needs function pointer and argument",
      "pthread_join(): block until thread finishes — also cleans up resources",
      "pthread_exit(): terminate thread (from main: keeps process alive until others done)",
      "Zombie thread: finished but not joined/detached → resource leak",
      "Common mistake: passing local variable address to pthread_create",
      "Solution: pass global, heap-allocated, or main-stack data",
      "PCS: process-contention scope (user-level scheduling within process)",
      "SCS: system-contention scope (kernel-level scheduling across all processes)",
    ],
    formula: {
      code: `// Create thread:
pthread_t tid;
pthread_create(&tid, NULL, runner_function, (void*)arg);

// runner function signature:
void* runner(void* param) {
  // do work
  pthread_exit(0);  // or just return NULL
}

// Wait for thread to finish:
pthread_join(tid, &retval);

// Fork-Join Pattern:
for (i = 0; i < N; i++)
  pthread_create(&tid[i], NULL, worker, &args[i]);
for (i = 0; i < N; i++)
  pthread_join(tid[i], NULL);
// All N threads done here

// Mutex:
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&lock);
  // critical section
pthread_mutex_unlock(&lock);`,
      explanation: "Fork-Join: create all threads, then join all — classic parallel pattern.",
    },
    examTips: [
      "pthread_join: joins in ORDER of loop, but threads may EXIT in any order",
      "Zombie thread: never joined/detached → resource leak forever",
      "pthread_exit from main(): process alive until ALL threads done",
      "return from main() or exit(): kills ALL threads immediately",
    ],
    questions: [
      { q: "What is a Zombie Thread?", a: "A thread that has finished execution but was never joined (pthread_join) or detached. It consumes kernel resources (TCB, stack) indefinitely because no one claimed its exit status." },
      { q: "What happens if you call exit() instead of pthread_exit() from main()?", a: "exit() (or return from main) immediately terminates the entire process along with all other threads, even if they haven't finished their work." },
    ],
  },
  "amdahls": {
    title: "Amdahl's Law", emoji: "📈",
    tldr: "Speedup = 1 / (S + (1-S)/N). S=serial fraction. As N→∞, speedup → 1/S. Serial part limits gains.",
    explanation: `Amdahl's Law quantifies the speedup gain from adding more cores to a program that has both serial and parallel components.

S = serial fraction of the application (cannot be parallelized). N = number of processing cores. Speedup = 1 / (S + (1-S)/N).

Key insight: the serial portion S disproportionately limits performance. No matter how many cores you add, you can never exceed 1/S speedup. A 5% serial portion (S=0.05) caps maximum speedup at 20×, even with infinite cores.

As N → ∞: Speedup → 1/S.`,
    keyPoints: [
      "Speedup = 1 / (S + (1-S)/N)",
      "S = serial fraction (0 to 1). N = number of cores.",
      "As N → ∞: Speedup → 1/S (hard ceiling!)",
      "Serial portion S limits maximum possible speedup",
      "25% serial (S=0.25): max speedup = 4× (even with ∞ cores)",
      "Data parallelism: same operation on different data subsets",
      "Task parallelism: different operations on different cores",
    ],
    formula: {
      code: `Amdahl's Law:
  Speedup = 1 / (S + (1-S)/N)
  
  S = serial fraction, N = number of cores
  (1-S) = parallel fraction

Example 1: S=0.25 (25% serial), N=4 cores
  Speedup = 1 / (0.25 + 0.75/4)
           = 1 / (0.25 + 0.1875)
           = 1 / 0.4375
           = 2.29×

Example 2: S=0.30, N=4 cores:
  Speedup = 1 / (0.30 + 0.70/4) = 1/0.475 ≈ 2.10×

Max speedup (N→∞):
  S=0.25 → max = 1/0.25 = 4×
  S=0.10 → max = 1/0.10 = 10×
  S=0.05 → max = 1/0.05 = 20×`,
      explanation: "Even with infinite cores, serial fraction S creates an unbeatable ceiling.",
    },
    examTips: [
      "Speedup = 1/(S + (1-S)/N) — MEMORIZE",
      "Max speedup = 1/S (as N→∞). S=0.25 → max 4×.",
      "30% serial, 4 cores → speedup ≈ 2.10× (given in notes)",
      "Adding cores has diminishing returns — serial part always limits you",
    ],
    questions: [
      { q: "S=0.20 (20% serial), N=8 cores. Calculate speedup.", a: "Speedup = 1/(0.20 + 0.80/8) = 1/(0.20 + 0.10) = 1/0.30 ≈ 3.33×." },
      { q: "Program is 90% parallel. What is the maximum possible speedup?", a: "S=0.10. Max speedup = 1/S = 1/0.10 = 10× (with infinite cores)." },
    ],
  },
  "concurrency-parallelism": {
    title: "Concurrency vs Parallelism", emoji: "🔀",
    tldr: "Concurrent: multiple tasks in progress (interleaved on 1 core). Parallel: multiple tasks literally simultaneously (multiple cores).",
    explanation: `Concurrency: multiple tasks making progress, but not necessarily at the same instant. On a single core, the CPU rapidly switches between tasks (context switching), creating an illusion of simultaneous progress.

Parallelism: multiple tasks running literally at the same time on multiple cores/CPUs. True simultaneous execution.

Data parallelism: distribute the same data across multiple cores and apply the same operation to each subset. Example: sum array elements by splitting array across 4 cores.

Task parallelism: distribute different tasks (threads) across cores, each performing a unique operation. Example: one thread handles UI, another handles network, another handles file I/O.

All parallelism is concurrent, but not all concurrency is parallelism.`,
    keyPoints: [
      "Concurrency: tasks progress simultaneously (may interleave, 1 core OK)",
      "Parallelism: tasks run literally at the same time (needs multiple cores)",
      "Single-core: only concurrency possible (rapid context switching)",
      "Multi-core: both concurrency and true parallelism",
      "Data parallelism: same op, different data subsets on different cores",
      "Task parallelism: different ops, different cores",
      "Challenges: dividing work, balancing, data splitting, dependencies, debugging",
    ],
    formula: {
      code: `Single core — CONCURRENT (not parallel):
  Time→  [T1][T2][T1][T2][T1][T2]
         (rapid switching gives illusion of simultaneous)

Multi core — PARALLEL:
  Core 1: [T1][T1][T1][T1]
  Core 2: [T2][T2][T2][T2]
  (truly simultaneous)

Data Parallelism (sum of array[0..N]):
  Core 1: sum array[0..N/4]
  Core 2: sum array[N/4..N/2]
  Core 3: sum array[N/2..3N/4]
  Core 4: sum array[3N/4..N]
  Merge results.

Task Parallelism:
  Core 1: UI thread
  Core 2: Network I/O thread
  Core 3: Compression thread`,
      explanation: "Concurrency = structural. Parallelism = execution. Parallelism requires hardware.",
    },
    examTips: [
      "Concurrency: structure (tasks can overlap). Parallelism: execution (tasks DO overlap).",
      "Concurrency without parallelism: single-core multitasking",
      "Data parallelism: same operation on data subsets. Task: different operations.",
      "Multicore challenges: dividing activities, balance, data splitting, dependencies, testing",
    ],
    questions: [
      { q: "What is the difference between data parallelism and task parallelism?", a: "Data parallelism: same operation applied to different subsets of data across cores (e.g., parallel sum). Task parallelism: different operations on different cores simultaneously (e.g., UI thread + network thread)." },
    ],
  },
  "thread-scheduling": {
    title: "Thread Scheduling (PCS vs SCS)", emoji: "🗓️",
    tldr: "PCS: user-level, within process. SCS: kernel-level, system-wide. Linux/macOS: only PTHREAD_SCOPE_SYSTEM.",
    explanation: `Two scopes for thread scheduling:

PCS (Process-Contention Scope): scheduling competition is within the process. User-level threads compete with each other for the process's kernel thread(s). Used in M:M and M:1 models. Thread library does the scheduling (priority-based). Kernel doesn't see individual user threads.

SCS (System-Contention Scope): kernel thread is scheduled onto available CPU — competition is among all threads in the entire system. Used in 1:1 model. Linux and macOS only support SCS (PTHREAD_SCOPE_SYSTEM).

PTHREAD_SCOPE_PROCESS = PCS scheduling.
PTHREAD_SCOPE_SYSTEM = SCS scheduling.`,
    keyPoints: [
      "PCS: competition within the process (user-level scheduling)",
      "SCS: competition system-wide (kernel-level scheduling)",
      "PCS: used in M:M and M:1 models",
      "SCS: used in 1:1 model",
      "PTHREAD_SCOPE_PROCESS = PCS. PTHREAD_SCOPE_SYSTEM = SCS.",
      "Linux and macOS: ONLY allow PTHREAD_SCOPE_SYSTEM",
      "Thread pool: pre-create fixed threads waiting for work → avoid creation overhead",
    ],
    formula: null,
    examTips: [
      "Linux/macOS: only PTHREAD_SCOPE_SYSTEM (SCS) allowed",
      "PCS = within process. SCS = across entire system.",
      "Thread pool: create N threads at startup, reuse them → avoids creation cost",
      "Asynchronous cancellation: dangerous (may leave mutex locked). Deferred: safe.",
    ],
    questions: [
      { q: "Why is asynchronous thread cancellation dangerous?", a: "The thread is terminated immediately, potentially while holding a mutex or in the middle of updating shared data, leaving resources in an inconsistent state." },
    ],
  },
  "race-condition": {
    title: "Race Condition", emoji: "🏁",
    tldr: "Outcome depends on execution order. counter++ is 3 instructions — can interleave. Result: unexpected value.",
    explanation: `A race condition occurs when multiple processes/threads access shared data concurrently and the final outcome depends on the execution order.

counter++ seems like one operation but compiles to THREE machine instructions: (1) load counter into register, (2) increment register, (3) store register back to counter. These three steps can be interleaved between two threads.

Classic example: counter = 5, producer does counter++, consumer does counter-- simultaneously. Expected: counter = 5. Possible outcomes due to interleaving: 4 or 6 — wrong!

Another example: next_available_pid — if two processes both call fork() simultaneously without protection, they could get the same PID assigned to two different processes.`,
    keyPoints: [
      "Race condition: outcome depends on thread/process execution order",
      "counter++ = 3 instructions: load, increment, store — can interleave",
      "Expected counter=5 after ++ and --, but can get 4 or 6",
      "Solution: critical section / mutual exclusion",
      "next_available_pid: fork() race can give same PID to two processes",
      "Non-atomic compound operations are vulnerable to races",
    ],
    formula: {
      code: `counter++ compiles to:
  R1 = counter    (load)
  R1 = R1 + 1     (increment)
  counter = R1    (store)

Race with counter=5:
  S0: Producer  R1 = counter → R1 = 5
  S1: Producer  R1 = R1+1   → R1 = 6
  S2: Consumer  R2 = counter → R2 = 5  ← reads STALE value!
  S3: Consumer  R2 = R2-1   → R2 = 4
  S4: Producer  counter = R1 → counter = 6
  S5: Consumer  counter = R2 → counter = 4  ← WRONG!

Expected: counter = 5 (one ++ and one -- cancel)
Actual:   counter = 4 (or 6 depending on schedule)`,
      explanation: "Interleaving makes one thread's read of 'counter' get an old/stale value.",
    },
    examTips: [
      "counter++ is NOT atomic — it's 3 instructions (load, add, store)",
      "Race condition: multiple threads, shared mutable data, no synchronization",
      "Result is unpredictable and non-deterministic (depends on scheduling)",
      "Solution: make the 3-instruction sequence atomic → critical section",
    ],
    questions: [
      { q: "Why is counter++ not atomic even on modern hardware?", a: "It compiles to three separate machine instructions: load the value, increment the register, store back. Any thread switch between these three steps causes a race condition." },
    ],
  },
  "critical-section": {
    title: "Critical Section Problem", emoji: "🚧",
    tldr: "3 requirements: Mutual Exclusion, Progress, Bounded Waiting. Structure: entry→CS→exit→remainder.",
    explanation: `A critical section is a code segment where a process accesses shared resources. The critical section problem is to design a protocol so only one process is in its critical section at a time.

Process structure: entry section (request permission) → critical section → exit section → remainder section.

3 requirements (ALL must be satisfied):
1. Mutual Exclusion: only one process in its CS at a time.
2. Progress: if no process is in CS and some want to enter, selection cannot be postponed indefinitely.
3. Bounded Waiting: there's a bound on how many times OTHER processes can enter CS after a process requests entry and before it's granted.

Kernel handling: Preemptive kernels allow preemption during kernel mode (responsive, needed for real-time). Non-preemptive kernels don't — essentially free of kernel-level race conditions.`,
    keyPoints: [
      "Critical section: code accessing shared resources (only 1 process at a time)",
      "Structure: entry section → critical section → exit section → remainder",
      "Requirement 1: Mutual Exclusion — only 1 in CS at a time",
      "Requirement 2: Progress — selection can't be postponed indefinitely",
      "Requirement 3: Bounded Waiting — bounded delay before entry guaranteed",
      "Preemptive kernel: can preempt during kernel mode (better responsiveness)",
      "Non-preemptive kernel: no preemption in kernel mode → safer, less responsive",
    ],
    formula: {
      code: `General process structure:
  do {
    [entry section]      ← request permission
    [critical section]   ← only ONE process here at a time
    [exit section]       ← signal departure
    [remainder section]  ← everything else
  } while (true);

Requirements:
  1. Mutual Exclusion: Pi in CS → no other Pj in CS
  2. Progress:         No process in CS + some want in
                       → must choose ONE; cannot delay forever
  3. Bounded Waiting:  After Pi requests, ≤ K others enter before Pi`,
      explanation: "All 3 requirements must hold simultaneously for a correct CS solution.",
    },
    examTips: [
      "3 requirements: Mutual Exclusion, Progress, Bounded Waiting — know all 3",
      "Progress ≠ no deadlock. Bounded Waiting ≠ no starvation. Related but distinct.",
      "Preemptive kernel = real-time suitable. Non-preemptive = simpler, safer.",
      "Entry section = acquiring lock. Exit section = releasing lock.",
    ],
    questions: [
      { q: "What is the Bounded Waiting requirement?", a: "After a process requests to enter its critical section, there's a limit (bound) on how many times other processes can enter their critical sections before the requesting process is granted entry. Prevents indefinite postponement (starvation)." },
    ],
  },
  "petersons": {
    title: "Peterson's Solution", emoji: "📐",
    tldr: "Software solution for 2 processes. Uses: int turn + bool flag[2]. flag[i]=true means Pi wants to enter.",
    explanation: `Peterson's solution is a classic software-based solution to the 2-process critical section problem. It requires two shared variables: int turn (whose turn to enter) and boolean flag[2] (flag[i]=true means Pi is ready/wants to enter).

Entry protocol for Pi: set flag[i]=true (I want in), set turn=j (I'll give the other a chance), then wait while flag[j] is true AND turn==j (the other wants in and it's their turn).

If Pj wants in simultaneously: they'll both set their flags and set turn. turn can only hold one value — the LAST one to write. The first one to write 'loses' (gets to enter first). This ensures no deadlock.

Modern caveat: Peterson's relies on atomic memory loads/stores. Modern CPUs reorder instructions for optimization, so Peterson's may not work without memory barriers on modern hardware.`,
    keyPoints: [
      "2-process software solution to critical section",
      "Shared vars: int turn + bool flag[2]",
      "flag[i] = true: Pi wants to enter CS",
      "turn: whose turn it is (the other process gets priority)",
      "Entry: flag[i]=true; turn=j; while(flag[j] && turn==j) spin;",
      "Proves: Mutual Exclusion, Progress, Bounded Waiting all satisfied",
      "Modern issue: CPUs reorder instructions → may not work without memory barriers",
    ],
    formula: {
      code: `Shared: int turn; bool flag[2]; // flag[0]=flag[1]=false

Process Pi:
  do {
    flag[i] = true;          // "I want to enter"
    turn = j;                // "but you go first"
    while (flag[j] && turn == j)
      ; // spin wait
    // === CRITICAL SECTION ===
    flag[i] = false;         // "I'm done"
    // remainder section
  } while (true);

Process Pj (same structure with i and j swapped):
  flag[j] = true; turn = i;
  while (flag[i] && turn == i) ;
  // CS
  flag[j] = false;

Why it works:
  turn = j means Pi lets Pj go first
  turn = i means Pj lets Pi go first
  turn can only be ONE value → exactly one enters`,
      explanation: "Setting turn=j means 'if we both want in, YOU go first.' Last writer to turn loses (gives way).",
    },
    examTips: [
      "Pi sets turn=j (other process), not turn=i (self)",
      "Wait condition: while(flag[j] AND turn==j) — both conditions must hold",
      "Pi enters when: flag[j]=false OR turn=i (either/or)",
      "Modern CPUs may violate Peterson's due to instruction reordering",
    ],
    questions: [
      { q: "In Peterson's solution for Pi, why does Pi set turn=j instead of turn=i?", a: "By setting turn=j, Pi says 'I'll give the other process a chance to go first.' If Pj also wants in, it sets turn=i, overwriting Pi's setting. turn ends up as the value written LAST — meaning the last to 'give way' wins." },
    ],
  },
  "hw-sync": {
    title: "Hardware Synchronization", emoji: "💻",
    tldr: "Atomic instructions: test_and_set (returns old, sets true) and compare_and_swap (swap if equal). Spinlocks.",
    explanation: `Software solutions like Peterson's are fragile on modern hardware (instruction reordering). Modern CPUs provide special atomic hardware instructions.

test_and_set(target): atomically reads the current value and sets target to TRUE. Returns the old value. One atomic operation — cannot be interrupted.

compare_and_swap(value, expected, new_value): atomically: if *value == expected, sets *value = new_value. Returns old value. If CAS returns expected, the swap happened (you won the race). Otherwise, retry.

Spinlock (busy waiting): thread spins in a loop testing the lock. Wastes CPU cycles but avoids context switch overhead. Good when lock is held for very short times, especially on multicore systems.

Spinlock advantage: no context switch needed (switch takes considerable time). Good when lock held briefly.`,
    keyPoints: [
      "test_and_set: reads old value + sets to TRUE atomically",
      "compare_and_swap: if *val==expected → set to new_val, return old (atomic)",
      "Spinlock: busy wait in loop — wastes CPU but avoids context switch",
      "Spinlock good for: short critical sections on multicore systems",
      "TSL (test_and_set) doesn't satisfy bounded waiting alone",
      "Need waiting[] array added to satisfy bounded waiting",
      "x86 CAS instruction: CMPXCHG (since 80486)",
    ],
    formula: {
      code: `test_and_set (atomic):
  bool test_and_set(bool *target) {
    bool rv = *target;
    *target = true;
    return rv;        // returns OLD value
  }

Usage:
  do {
    while (test_and_set(&lock)) ; // spin until lock=false→true
    // CRITICAL SECTION
    lock = false;
    // remainder
  } while (true);

compare_and_swap (atomic):
  int compare_and_swap(int *val, int expected, int new_val) {
    int temp = *val;
    if (*val == expected) *val = new_val;
    return temp;       // returns OLD value
  }

Usage:
  while (compare_and_swap(&lock, 0, 1) != 0) ;
  // CS
  lock = 0;

test_and_set: returns old, ALWAYS sets TRUE
CAS: returns old, sets new_val ONLY if old==expected`,
      explanation: "TSL always sets TRUE. CAS conditionally swaps. Both atomic — no interruption possible.",
    },
    examTips: [
      "TSL: always sets to TRUE, returns OLD value",
      "CAS: sets new_val only if current==expected, returns old",
      "Both: executed ATOMICALLY (indivisible, cannot be interrupted)",
      "Spinlock advantage: no context switch (fast for short critical sections)",
    ],
    questions: [
      { q: "lock=false. Thread A calls test_and_set(&lock). What is returned and what is lock after?", a: "Returns false (old value). lock is now set to true. Thread A successfully acquires the lock." },
      { q: "lock=1. Thread calls compare_and_swap(&lock, 0, 1). What happens?", a: "CAS checks: *lock(1) == expected(0)? NO → no swap. Returns 1 (old value). Since 1 != 0, the while condition is true → thread keeps spinning." },
    ],
  },
  "tsl-cas": {
    title: "Mutex Locks Implementation", emoji: "🔐",
    tldr: "Mutex = simplest OS tool for CS. acquire()/release() using atomic ops. Spinlock = busy-wait mutex.",
    explanation: `Mutex locks are the OS-provided software tool for critical sections. Simpler than hardware instructions for application programmers. A boolean variable tracks availability.

acquire(): wait until lock is free (busy wait), then mark it as unavailable.
release(): mark lock as available.

Both acquire and release MUST be atomic (implemented using hardware atomic instructions internally).

Problem: this requires busy waiting (spinlock). Thread burns CPU cycles checking the lock. Wasted CPU. Called a spinlock because the thread "spins" in place.

Spinlock advantage: no context switch overhead. Good when lock is held for a very short time (context switch itself takes considerable time). Useful on multicore where one thread spins while another holds the lock.`,
    keyPoints: [
      "Mutex = boolean: available (true=free, false=held)",
      "acquire(): busy-wait until free, then mark busy",
      "release(): mark free",
      "Both must be atomic (use hardware TSL/CAS internally)",
      "Spinlock = mutex with busy waiting",
      "Spinlock problem: wastes CPU cycles spinning",
      "Spinlock advantage: no context switch (saves time when lock held briefly)",
      "Pthread: pthread_mutex_lock() / pthread_mutex_unlock()",
    ],
    formula: {
      code: `Mutex implementation:
  acquire() {
    while (!available)
      ; // busy wait (spinlock!)
    available = false;
  }
  release() { available = true; }

Pthread Mutex:
  pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
  // or: pthread_mutex_init(&lock, NULL);

  pthread_mutex_lock(&lock);    // acquire
    counter++;                  // critical section
  pthread_mutex_unlock(&lock);  // release

Proper CS structure:
  do {
    acquire lock;
      // critical section
    release lock;
      // remainder
  } while (true);`,
      explanation: "acquire() blocks until available. release() wakes waiting threads.",
    },
    examTips: [
      "Mutex = MUTual EXclusion. Boolean: true=available, false=locked.",
      "Spinlock wastes CPU but avoids context switch overhead",
      "Context switch is expensive — spinlock better when CS is very short",
      "Only the thread holding the lock should call unlock (release)",
    ],
    questions: [
      { q: "When is a spinlock (busy-wait mutex) preferable to a blocking mutex?", a: "When the critical section is very short (< time of a context switch). On multicore, one CPU spins while another CPU holds and quickly releases the lock. Spinning for a few nanoseconds beats doing a full context switch." },
    ],
  },
  "semaphore": {
    title: "Semaphores", emoji: "🚦",
    tldr: "Integer variable. wait()=P=decrement. signal()=V=increment. Binary=mutex. Counting=resource pool.",
    explanation: `Semaphores are a more powerful synchronization tool than mutex locks. A semaphore S is an integer variable accessible only through two atomic operations: wait() (also called P, down, decrement) and signal() (also called V, up, increment).

wait(S): if S > 0, decrement S and proceed. If S = 0, busy-wait (simple version) or block.
signal(S): increment S. If any processes were waiting, wake one.

Two types:
Binary semaphore (0 or 1): equivalent to a mutex lock.
Counting semaphore: integer range 0..n. Represents number of available instances of a resource. Initialize to n = n processes can enter simultaneously.

Classic semaphore problem example (deadlock): P0 does wait(S) then wait(Q), P1 does wait(Q) then wait(S) — circular wait → deadlock.`,
    keyPoints: [
      "Integer variable accessed ONLY via wait() and signal()",
      "wait(S): S>0 → S-- → proceed. S=0 → busy-wait.",
      "signal(S): S++ → wake any waiting process",
      "wait = P = down = decrement. signal = V = up = increment.",
      "Binary semaphore (0/1): same as mutex",
      "Counting semaphore (0..n): controls access to n resource instances",
      "Initialize to n: n concurrent accesses allowed",
      "Semaphore deadlock: wait(S);wait(Q) vs wait(Q);wait(S) simultaneously",
    ],
    formula: {
      code: `wait(S) {           // P / down operation
  while (S <= 0)
    ; // busy wait
  S--;
}

signal(S) {         // V / up operation
  S++;
}

Binary semaphore (mutex equivalent):
  semaphore mutex = 1;  // init to 1

  wait(mutex);          // acquire
    // critical section
  signal(mutex);        // release

Counting semaphore (resource pool of 3):
  semaphore resource = 3;  // 3 instances available

  wait(resource);    // take one instance (3→2→1→0)
    // use resource
  signal(resource);  // return it (0→1→2→3)

Deadlock with semaphores:
  P0: wait(S); wait(Q);  |  P1: wait(Q); wait(S);
  P0 holds S, P1 holds Q, both waiting for each other → DEADLOCK`,
      explanation: "Counting semaphore init value = number of concurrent accesses allowed.",
    },
    examTips: [
      "wait()=P=down=decrement. signal()=V=up=increment — know ALL names.",
      "Binary semaphore initialized to 1 (not 0!). Counting: initialized to N.",
      "Starvation: process may NEVER be removed from semaphore queue",
      "Priority Inversion: low-priority holds lock needed by high-priority",
    ],
    questions: [
      { q: "What is Priority Inversion?", a: "A scheduling problem where a low-priority process holds a lock needed by a high-priority process. A medium-priority process preempts the low-priority one (which holds the lock), indirectly preventing the high-priority process from running. Solved by Priority Inheritance Protocol." },
      { q: "Semaphore initialized to 3. How many processes can be in the critical section?", a: "3 processes simultaneously. Each wait() decrements: 3→2→1→0. The 4th process that calls wait() when S=0 will block." },
    ],
  },
  "semaphore-impl": {
    title: "Semaphore without Busy Waiting", emoji: "💤",
    tldr: "Block instead of spin. Semaphore has value + waiting list. wait: decrement → if<0 block(). signal: increment → if≥0 wakeup().",
    explanation: `The basic semaphore with busy-waiting wastes CPU cycles. A better implementation blocks the process instead.

Each semaphore has: value (integer) and list (waiting queue). When wait() is called and S<0, the process is added to S's list and blocked (put to sleep). When signal() is called and S≥0, a process is removed from the list and woken up (moved to ready queue).

Key insight: with this implementation, S's value can go NEGATIVE. The magnitude of a negative value equals the number of processes waiting (|S| = waiting count).

block(): suspends the process. wakeup(P): places P on ready queue. These are OS operations.`,
    keyPoints: [
      "No busy waiting — process blocks (sleeps) instead of spinning",
      "Semaphore struct: int value + process *list (waiting queue)",
      "wait(): value-- → if value < 0: add to list, block()",
      "signal(): value++ → if value <= 0: remove from list, wakeup()",
      "Negative value = number of blocked processes",
      "block() = OS operation to suspend process",
      "wakeup(P) = OS operation to move P to ready queue",
      "wait/signal themselves must be atomic (CS protected)",
    ],
    formula: {
      code: `struct semaphore {
  int value;
  struct process *list;  // waiting queue
};

wait(semaphore *S) {
  S->value--;
  if (S->value < 0) {
    add this process to S->list;
    block();      // sleep
  }
}

signal(semaphore *S) {
  S->value++;
  if (S->value <= 0) {
    remove process P from S->list;
    wakeup(P);    // wake up one waiter
  }
}

Value interpretation:
  value > 0: resources available (value = how many)
  value = 0: no resources, no waiters
  value < 0: |value| = number of blocked processes`,
      explanation: "Negative semaphore value = number of processes sleeping on this semaphore.",
    },
    examTips: [
      "Negative value = |value| processes are blocked/waiting on this semaphore",
      "signal() wakes ONE process (not all)",
      "block() and wakeup() are OS primitives, not busy-wait",
      "Problems: signal(mutex) before wait(mutex) → mutual exclusion violated",
    ],
    questions: [
      { q: "Semaphore value is -3. How many processes are waiting?", a: "3 processes. Negative value means |value| processes are blocked on the semaphore's waiting list." },
    ],
  },
  "bounded-buffer-sem": {
    title: "Classic: Bounded Buffer Problem", emoji: "📦",
    tldr: "3 semaphores: mutex=1 (exclusive access), full=0 (count full), empty=n (count empty).",
    explanation: `The bounded buffer problem with semaphores is the canonical solution to producer-consumer with proper synchronization.

Three semaphores:
- mutex: initialized to 1 (binary semaphore for mutual exclusion on buffer)
- full: initialized to 0 (counts full buffer slots)
- empty: initialized to n (counts empty buffer slots)

Producer: wait(empty) → wait(mutex) → add item → signal(mutex) → signal(full)
Consumer: wait(full) → wait(mutex) → remove item → signal(mutex) → signal(empty)

Critical: wait(mutex) must come AFTER wait(empty)/wait(full), never before (otherwise deadlock possible).`,
    keyPoints: [
      "mutex=1: mutual exclusion on buffer operations",
      "full=0: counts full slots (consumer waits when 0)",
      "empty=n: counts empty slots (producer waits when 0)",
      "Producer: wait(empty) → wait(mutex) → add → signal(mutex) → signal(full)",
      "Consumer: wait(full) → wait(mutex) → remove → signal(mutex) → signal(empty)",
      "ORDER MATTERS: wait(mutex) always INSIDE wait(empty/full)",
      "Swap order → deadlock! (producer holds mutex, waits on empty, consumer holds empty wait...)",
    ],
    formula: {
      code: `Initialization:
  semaphore mutex = 1;   // mutual exclusion
  semaphore full  = 0;   // # full buffer slots
  semaphore empty = n;   // # empty buffer slots

Producer:
  do {
    /* produce item next_produced */
    wait(empty);     // wait for empty slot
    wait(mutex);     // acquire buffer lock
    /* add next_produced to buffer */
    signal(mutex);   // release buffer lock
    signal(full);    // one more full slot
  } while (true);

Consumer:
  do {
    wait(full);      // wait for full slot
    wait(mutex);     // acquire buffer lock
    /* remove item to next_consumed */
    signal(mutex);   // release buffer lock
    signal(empty);   // one more empty slot
    /* consume item */
  } while (true);

❌ WRONG order (deadlock risk):
  wait(mutex); wait(empty); ... — DON'T do this`,
      explanation: "wait(mutex) must come AFTER wait(empty/full) to avoid deadlock.",
    },
    examTips: [
      "3 semaphores: mutex(1), full(0), empty(n) — memorize init values",
      "Producer: wait(empty) THEN wait(mutex). Consumer: wait(full) THEN wait(mutex).",
      "NEVER: wait(mutex) before wait(empty/full) — deadlock!",
      "signal(mutex) always comes BEFORE signal(full/empty)",
    ],
    questions: [
      { q: "Why must wait(mutex) come AFTER wait(empty) in the producer?", a: "If producer does wait(mutex) first and then blocks on wait(empty), it holds the mutex while sleeping. A consumer can never acquire mutex to free a slot, so empty stays at 0 forever → deadlock." },
    ],
  },
  "readers-writers": {
    title: "Classic: Readers-Writers Problem", emoji: "📖",
    tldr: "Multiple readers OK simultaneously. Writer = exclusive. rw_mutex + mutex + read_count. First reader locks writer out, last unlocks.",
    explanation: `Multiple readers can read shared data simultaneously. But a writer needs exclusive access — no readers or other writers.

Shared data: rw_mutex (binary semaphore, init=1), mutex (binary semaphore, init=1), read_count (int, init=0).

Writer: wait(rw_mutex) → write → signal(rw_mutex). Simple.
Reader: uses read_count to track concurrent readers. First reader (read_count goes 1) must acquire rw_mutex to block writers. Last reader (read_count goes 0) must release rw_mutex to allow writers. Access to read_count itself protected by mutex.

First variation: readers never wait unless writer is writing. Can starve writers.
Second variation: once writer ready, writers get priority. Can starve readers.

Linux: rwlock_t biased towards readers → writer starvation. Fixed in kernel 3.16 with queued RW lock. RCU: readers never block (zero overhead), writers create copy then swap.`,
    keyPoints: [
      "Multiple readers simultaneously OK. Writer = exclusive.",
      "rw_mutex=1: reader/writer mutual exclusion",
      "mutex=1: protects read_count",
      "read_count: number of active readers",
      "First reader: wait(rw_mutex) → blocks writers",
      "Last reader: signal(rw_mutex) → lets writers in",
      "Writer starvation in variation 1 (readers have priority)",
      "Linux RCU: readers never block, writers copy-update-swap",
    ],
    formula: {
      code: `Initialization:
  semaphore rw_mutex = 1;  // reader/writer lock
  semaphore mutex   = 1;  // protects read_count
  int read_count    = 0;

Writer:
  do {
    wait(rw_mutex);
      /* writing */
    signal(rw_mutex);
  } while (true);

Reader:
  do {
    wait(mutex);          // protect read_count
    read_count++;
    if (read_count == 1)
      wait(rw_mutex);     // FIRST reader locks out writers
    signal(mutex);
    
      /* reading */
    
    wait(mutex);
    read_count--;
    if (read_count == 0)
      signal(rw_mutex);   // LAST reader unlocks writers
    signal(mutex);
  } while (true);`,
      explanation: "First reader acquires rw_mutex. Last reader releases it. All others just increment/decrement count.",
    },
    examTips: [
      "First reader: wait(rw_mutex). Last reader: signal(rw_mutex). Others: neither.",
      "read_count protected by its own mutex (meta-level mutual exclusion)",
      "First variation: writer starvation. Second variation: reader starvation.",
      "Linux kernel: rwlock_t biased toward readers → writer starvation problem",
    ],
    questions: [
      { q: "Why does only the FIRST reader call wait(rw_mutex)?", a: "rw_mutex blocks writers. Once the first reader acquires it, all subsequent readers can read freely (no need to re-acquire). Only the last reader needs to release it to let a writer in." },
    ],
  },
  "dining-philosophers": {
    title: "Classic: Dining Philosophers", emoji: "🍜",
    tldr: "5 philosophers, 5 chopsticks. Naive: all grab left → deadlock. 3 solutions: max 4, both-or-none, asymmetric.",
    explanation: `5 philosophers sit at a round table. Each needs 2 chopsticks to eat. Naive solution: philosopher i picks up chopstick[i] then chopstick[(i+1)%5].

Problem: all 5 pick up their left chopstick simultaneously → all waiting for right chopstick → circular wait → DEADLOCK.

Three deadlock solutions:
1. Allow at most 4 philosophers sitting simultaneously (breaks circular wait).
2. Pick up BOTH chopsticks atomically in a critical section (no partial allocation).
3. Asymmetric: odd-numbered philosophers pick LEFT then RIGHT; even pick RIGHT then LEFT (breaks symmetry → no circular wait).`,
    keyPoints: [
      "Shared: semaphore chopstick[5] initialized to 1 each",
      "Philosopher i: wait(chopstick[i]) → wait(chopstick[(i+1)%5]) → eat → signal both",
      "Deadlock: all pick up left simultaneously → circular wait",
      "Solution 1: max 4 philosophers at table simultaneously",
      "Solution 2: pick up BOTH chopsticks atomically (critical section)",
      "Solution 3: asymmetric (odd: left first; even: right first)",
      "Starvation: even with deadlock-free solution, a philosopher may starve",
    ],
    formula: {
      code: `Naive (DEADLOCKS):
  Philosopher i:
  do {
    wait(chopstick[i]);               // pick up left
    wait(chopstick[(i+1) % 5]);       // pick up right
    /* eat */
    signal(chopstick[i]);
    signal(chopstick[(i+1) % 5]);
    /* think */
  } while (true);

DEADLOCK scenario:
  P0 picks chopstick[0]
  P1 picks chopstick[1]
  P2 picks chopstick[2]
  P3 picks chopstick[3]
  P4 picks chopstick[4]
  All waiting for the next one → CIRCULAR WAIT!

Solutions:
  1. Max 4 at table: allow only 4 to sit → one always gets both
  2. Atomic pickup: wait(mutex); take both; signal(mutex);
  3. Asymmetric: even i → right first then left
                 odd i  → left first then right`,
      explanation: "Asymmetric: P4 (even) picks chopstick[4+1%5=0] first, breaking the cycle.",
    },
    examTips: [
      "Naive solution has DEADLOCK — all 5 pick up left simultaneously",
      "Asymmetric solution: odd picks LEFT first, even picks RIGHT first",
      "Max 4 rule: simplest fix — at least one philosopher always gets both",
      "Even deadlock-free solutions can have STARVATION (a separate problem)",
    ],
    questions: [
      { q: "Why does the naive Dining Philosophers solution deadlock?", a: "All 5 philosophers simultaneously pick up their left chopstick (chopstick[i]). All 5 then wait for their right chopstick (chopstick[(i+1)%5]), which is held by their neighbor. This creates a circular wait — one of the 4 deadlock conditions." },
    ],
  },
  "deadlock-intro": {
    title: "Deadlock — Introduction", emoji: "💀",
    tldr: "P holds R1, waits for R2. R2 held by Q, which waits for R1. Neither proceeds. Circular wait. Starvation ≠ Deadlock.",
    explanation: `Deadlock: a set of processes where each is waiting for a resource held by another in the set. No process can proceed. Requires external intervention to resolve.

System model: resources R1..Rm with Wi instances each. Each process: requests (system call) → uses → releases.

Deadlock vs Starvation: Starvation is indefinite postponement — can end if lucky (scheduling changes). Deadlock CANNOT end without external intervention (terminate process or preempt resource).

Resource types: physical (CPU, memory, I/O devices) and logical (semaphores, mutex locks, files).

Bridge example: two cars approaching from opposite sides. Each occupies one lane, each needs the other. Deadlock resolved by backing one car up (preemption).`,
    keyPoints: [
      "Deadlock: each process waiting for resource held by another in the set",
      "Cannot resolve on its own — needs external intervention",
      "Resources: physical (CPU, memory, printer) + logical (semaphores, files)",
      "Resource lifecycle: Request → Use → Release",
      "Starvation: can end. Deadlock: cannot end without intervention.",
      "Deadlock → starvation (but not vice versa)",
      "Bridge example: circular occupancy/need between two cars",
    ],
    formula: {
      code: `Classic deadlock:
  Thread A: x.acquire(); y.acquire();
  Thread B: y.acquire(); x.acquire();

  If A holds x and B holds y:
    A waits for y (B has it)
    B waits for x (A has it)
    → Neither can proceed → DEADLOCK

With 3 CD-RW drives, 3 processes each holding 1:
  P0 requests 1 more → no free drives
  → deadlock if others also need more

Starvation vs Deadlock:
  Starvation: east-going traffic constant → west car never moves
             (could end if east traffic stops — no intervention needed)
  Deadlock: two cars nose-to-nose on bridge
             (cannot end without one backing up — intervention needed)`,
      explanation: "Deadlock: circular dependency where NO process can voluntarily break the cycle.",
    },
    examTips: [
      "Deadlock needs EXTERNAL intervention. Starvation CAN end on its own.",
      "Deadlock → always starvation. Starvation → NOT necessarily deadlock.",
      "Non-deterministic: the x.acquire/y.acquire pattern SOMETIMES deadlocks",
      "Resource: Request → Use → Release (3-step lifecycle)",
    ],
    questions: [
      { q: "Can a deadlock occur if all resources are sharable (like read-only files)?", a: "No. Deadlock requires Mutual Exclusion — at least one resource must be non-shareable. Shareable resources don't block others, so no circular wait can form." },
    ],
  },
  "deadlock-4conditions": {
    title: "Deadlock — 4 Necessary Conditions", emoji: "4️⃣",
    tldr: "ALL 4 must hold: Mutual Exclusion + Hold & Wait + No Preemption + Circular Wait. Remove any one → no deadlock.",
    explanation: `Deadlock can occur IF AND ONLY IF all four conditions hold simultaneously:

1. Mutual Exclusion: at least one resource must be held in a non-shareable mode (only one process at a time). Read-only files can't cause deadlock.

2. Hold and Wait: a process holds at least one resource and is waiting for additional resources held by other processes.

3. No Preemption: resources cannot be forcibly taken away — only voluntarily released by the holding process after it completes.

4. Circular Wait: a set {P0, P1, ..., Pn} where P0 waits for P1's resource, P1 waits for P2's, ..., Pn waits for P0's.

These are NECESSARY conditions — if any one is absent, deadlock cannot occur.`,
    keyPoints: [
      "All 4 must hold simultaneously for deadlock to occur",
      "1. Mutual Exclusion: resource held in non-shareable mode",
      "2. Hold and Wait: holding ≥1 resource + waiting for more",
      "3. No Preemption: resources only released voluntarily",
      "4. Circular Wait: P0→P1→...→Pn→P0 (cyclic waiting chain)",
      "Deadlock prevention: eliminate at least ONE of these conditions",
      "Circular wait → necessarily hold-and-wait, but not vice versa",
    ],
    formula: {
      code: `4 Necessary Conditions for Deadlock:

1. MUTUAL EXCLUSION
   Resource held by only ONE process at a time
   (sharable resources like read-only files → no deadlock)

2. HOLD AND WAIT
   Process holds resource(s) AND is waiting for more
   (if you had to release before requesting → no HoldAndWait)

3. NO PREEMPTION
   Only the holding process can release the resource
   (if OS could forcibly take resources → no deadlock)

4. CIRCULAR WAIT
   P0 → R1 (held by P1)
   P1 → R2 (held by P2)
   P2 → R0 (held by P0)  ← cycle!

REMOVING any one condition:
  No Mutex Excl  → make resources shareable
  No Hold&Wait   → release all before requesting new
  Preemption     → OS takes resources forcibly
  No Circ Wait   → total ordering of resources`,
      explanation: "Deadlock prevention attacks one condition. Avoidance detects unsafe states dynamically.",
    },
    examTips: [
      "ALL 4 must hold simultaneously — missing even one = no deadlock",
      "Circular wait is the most targeted condition for prevention (resource ordering)",
      "Mutual exclusion can't always be eliminated (printers can't be shared mid-job)",
      "Know all 4 by name — exam loves listing them",
    ],
    questions: [
      { q: "What is the 'Hold and Wait' condition for deadlock?", a: "A process is holding at least one resource and is waiting to acquire additional resources that are currently held by other processes." },
    ],
  },
  "rag": {
    title: "Resource Allocation Graph (RAG)", emoji: "📊",
    tldr: "Request edge: Pi→Rj. Assignment edge: Rj→Pi. Cycle + single instance = deadlock. Multiple instances = maybe deadlock.",
    explanation: `The Resource Allocation Graph precisely describes the resource allocation state.

Vertices: processes P = {P1...Pn} and resource types R = {R1...Rm}.
Request edge: Pi → Rj (process Pi is requesting resource Rj).
Assignment edge: Rj → Pi (resource Rj is assigned to process Pi).

Basic facts: No cycle in graph → NO deadlock. Cycle exists AND all resource types have exactly one instance → DEADLOCK. Cycle exists AND some resource types have multiple instances → MIGHT be deadlock.

Wait-for graph: simplification for single-instance resources. Remove resource nodes, collapse edges. Pi → Pj means Pi is waiting for Pj to release a resource. Cycle in wait-for graph = deadlock.`,
    keyPoints: [
      "Request edge: Pi→Rj (process requests resource)",
      "Assignment edge: Rj→Pi (resource assigned to process)",
      "No cycle → NO deadlock (guaranteed)",
      "Cycle + single instance per resource → DEADLOCK (certain)",
      "Cycle + multiple instances → MIGHT be deadlock (uncertain)",
      "Wait-for graph: remove resource nodes, collapse edges",
      "Wait-for graph cycle → deadlock (only for single instance)",
      "Cycle detection: O(n²) algorithm",
    ],
    formula: {
      code: `RAG Notation:
  Process node: ○  (circle)
  Resource node: □  (square, dots inside = instances)
  Request edge:    Pi ——→ Rj   (Pi wants Rj)
  Assignment edge: Rj ——→ Pi   (Rj held by Pi)

Example with cycle → deadlock (single instance):
  P1 → R1 (P1 requests R1)
  R1 → P2 (R1 held by P2)
  P2 → R2 (P2 requests R2)
  R2 → P1 (R2 held by P1)
  → Cycle! P1↔P2 circular → DEADLOCK

Example with cycle but NO deadlock (multiple instances):
  R1 has 2 instances: held by P1 and P2
  P3 requests R1
  P2 requests R2 (R2 free after P3 finishes)
  → Cycle in graph BUT P3 can get R1 instance and finish

Wait-for graph (single-instance):
  Remove resource nodes
  Pi → Pj exists if Pi→Rq and Rq→Pj in RAG`,
      explanation: "Cycle is necessary but not sufficient for deadlock when resources have multiple instances.",
    },
    examTips: [
      "Request edge: Process→Resource. Assignment edge: Resource→Process.",
      "No cycle = definitely NO deadlock. Cycle = maybe deadlock.",
      "Single instance + cycle = DEFINITE deadlock.",
      "Wait-for graph: only for single-instance. Cycle = deadlock.",
    ],
    questions: [
      { q: "Does every cycle in a RAG indicate a deadlock?", a: "No. Only if each resource type in the cycle has exactly one instance. If any resource has multiple instances, the cycle may exist without deadlock (another instance may be available)." },
    ],
  },
  "deadlock-handling": {
    title: "Deadlock Handling Methods", emoji: "🛠️",
    tldr: "Prevention: eliminate condition. Avoidance: safe state. Detection: allow+recover. Denial: Ostrich algorithm (Linux).",
    explanation: `Four methods for handling deadlocks:

Prevention: write code that structurally cannot deadlock. Eliminate one of the 4 conditions. Low resource utilization possible.

Avoidance: dynamically delay requests to stay in safe states. Requires advance knowledge of max resource needs. Better utilization than prevention.

Detection + Recovery: allow deadlock to happen, detect it, then recover (terminate processes or preempt resources).

Denial (Ostrich Algorithm): ignore deadlock entirely. Most modern OSes (Linux, Windows) use this! Reasoning: deadlocks are rare; handling them has high overhead; let the user restart the program.`,
    keyPoints: [
      "Prevention: eliminate one of the 4 conditions (structural guarantee)",
      "Avoidance: dynamically ensure system stays in safe state",
      "Detection: let deadlock happen, find it, recover from it",
      "Denial (Ostrich): ignore deadlock entirely (Linux, Windows default!)",
      "Prevention: low resource utilization and possible starvation",
      "Avoidance: requires knowing max resource demands in advance",
      "Recovery: terminate processes OR preempt resources",
    ],
    formula: {
      code: `Method Comparison:
  Method      │ Approach           │ Cost/Trade-off
  ────────────┼────────────────────┼───────────────────
  Prevention  │ Restrict requests  │ Low utilization
  Avoidance   │ Dynamic safe-state │ Needs advance info
  Detection   │ Allow + recover    │ Overhead to recover
  Ostrich     │ IGNORE it          │ Simple but risky

Modern OS approach (Linux/Windows):
  "Ostrich Algorithm"
  - Deadlocks are rare in practice
  - Detection/prevention overhead > benefit
  - User just reboots/restarts
  - Applications responsible for avoiding deadlock
  
Avoidance grant rule:
  Only grant request if resulting state is still SAFE`,
      explanation: "Linux ignores deadlock — applications (databases, etc.) handle it themselves.",
    },
    examTips: [
      "Modern OSes (Linux, Windows) use the OSTRICH algorithm (ignore it)",
      "Prevention: attack one of the 4 conditions structurally",
      "Avoidance: needs max demand info in advance (proactive)",
      "Detection: reactive — fix after it happens",
    ],
    questions: [
      { q: "Why do most modern OS like Linux ignore deadlocks (Ostrich Algorithm)?", a: "Deadlocks are rare in well-written applications. Implementing detection/prevention/avoidance has significant overhead (memory, CPU) and complexity. The expected cost of handling deadlock exceeds the expected cost of the deadlock itself." },
    ],
  },
  "deadlock-prevention": {
    title: "Deadlock Prevention", emoji: "🔒",
    tldr: "Attack one of the 4 conditions. Circular Wait: total resource ordering. Hold&Wait: release before requesting.",
    explanation: `Eliminate at least one of the four necessary conditions:

Mutual Exclusion: make resources shareable where possible (read-only files). Cannot always be eliminated (printers, tape drives inherently non-shareable).

Hold and Wait: require process to request ALL resources before starting (no incrementalrequests), OR release all held resources before requesting new ones. Problem: low utilization, starvation possible.

No Preemption: if a process can't get new resource, release all current resources. Process restarts only when it can get everything it needs. Works for resources whose state can be saved (CPU registers, memory) — harder for printers.

Circular Wait: total ordering of all resource types. Assign each resource a number. Processes must request resources in increasing (or decreasing) order. Example: always request disk before printer before tape. x.acquire() before y.acquire() always — prevents cycle.`,
    keyPoints: [
      "Mutual Exclusion: make shareable (hard — printers can't be shared)",
      "Hold & Wait: request ALL at start OR release all before requesting more",
      "No Preemption: force release when blocked; restart when all available",
      "Circular Wait: total resource ordering — all processes follow same order",
      "Circular Wait most practical prevention technique",
      "Hold & Wait problems: low utilization, starvation possible",
      "Resource ordering: if need A and B, always request A before B",
    ],
    formula: {
      code: `Circular Wait Prevention:
  Assign ordering: R1 < R2 < R3 < ... < Rm
  
  Rule: can only request Rj if Rj > all currently held resources
  (must release higher-numbered ones to request lower-numbered)

Example:
  disk=1, memory=2, printer=3
  Process must request: disk → memory → printer (in order)
  CANNOT: hold printer, then request disk

Mutex + Ordered locking (prevents x/y deadlock):
  Thread A:                Thread B:
  x.acquire();             x.acquire();  ← both acquire x first
  y.acquire();             y.acquire();
  ...
  y.release(); x.release(); y.release(); x.release();
  (ordering: always acquire x before y → no cycle possible)

Hold & Wait prevention:
  Request ALL resources before execution begins
  OR: release all, then re-request everything needed`,
      explanation: "Circular wait prevention via ordering is the most commonly used technique.",
    },
    examTips: [
      "Circular Wait prevention: total ordering → request in ORDER (most practical)",
      "Hold & Wait: two options: request ALL upfront OR release all before re-requesting",
      "No Preemption: released resources go to 'waiting list', process restarts when all available",
      "Hold & Wait prevents deadlock but causes low utilization and possible starvation",
    ],
    questions: [
      { q: "How does total resource ordering prevent the Circular Wait condition?", a: "If all processes must request resources in increasing order, a process can never request a resource with a lower number than what it holds. This makes it structurally impossible to form a cycle (a cycle would require some process to have a lower-numbered resource and request a higher-numbered one AND vice versa)." },
    ],
  },
  "safe-state": {
    title: "Safe State & Deadlock Avoidance", emoji: "🟢",
    tldr: "Safe state: safe sequence exists. Safe → no deadlock. Unsafe → possible deadlock. Grant only if stays safe.",
    explanation: `Deadlock avoidance: the OS must know the maximum resource demands of each process in advance. It then dynamically decides whether to grant a request or make the process wait, ensuring the system never enters an unsafe state.

Safe state: there exists a safe sequence <P1, P2, ..., Pn> where each Pi can eventually complete using currently available resources plus resources held by all Pj with j < i.

Safe → no deadlock. Deadlock → unsafe (always). Unsafe → deadlock (MAYBE, not always). The goal: keep the system in a safe state at all times.

Resource Allocation Graph algorithm (single instance per resource): add claim edges (dashed) representing future requests. Only grant a request if doing so doesn't create a cycle even with claim edges.`,
    keyPoints: [
      "Safe state: safe sequence <P1...Pn> exists where all can complete",
      "Pi can complete with: available resources + resources from Pj (j<i) after they finish",
      "Safe state → guaranteed no deadlock",
      "Deadlock state → unsafe (always)",
      "Unsafe state → NOT necessarily deadlock (just a possibility)",
      "Avoidance goal: never leave safe state",
      "Avoidance requires: max demand info in advance for each process",
      "Claim edge (dashed): process may request resource in future",
    ],
    formula: {
      code: `Safe State Definition:
  A sequence <P1,P2,...Pn> is SAFE if for each Pi:
  Resources Pi needs ≤ Available + Σ(Resources held by Pj, j<i)

Example: 12 tape drives total
  Max   Holds  Needs-more
  P0: 10    5      5
  P1:  4    2      2
  P2:  9    3      6
  Available: 12 - (5+2+3) = 2

  Safe sequence: <P1, P0, P2>
  P1: needs 2 ≤ available(2) ✓ → P1 finishes, releases 2 → avail=4
  P0: needs 5 ≤ available(4+2=6)? Actually avail after P1=4 → needs 5 > 4 wait
  Actually check P0: needs 5 ≤ 4? No. Check P2: needs 6 ≤ 4? No.
  
  So check: <P1,P0,P2>: avail=2, P1 needs 2 ✓ → avail=4, P0 needs 5 > 4 ✗
  Try <P1,P2,...>: avail=4, P2 needs 6 > 4 ✗

State Diagram:
  safe state ──→ safe state  (avoidance goal)
  safe state ──X→ unsafe state  (avoidance prevents this)`,
      explanation: "Avoidance only grants request if the resulting state is still SAFE.",
    },
    examTips: [
      "Safe → no deadlock. Deadlock → unsafe. Unsafe → MAYBE deadlock (not always).",
      "Process Pi in safe sequence: check available + all Pj (j<i) releases",
      "Avoidance: only grant if resulting state remains safe",
      "Resource may be available but request still DENIED if it leads to unsafe state",
    ],
    questions: [
      { q: "A system is in an unsafe state. Does deadlock necessarily occur?", a: "No. An unsafe state means deadlock is POSSIBLE — the OS can no longer guarantee avoidance because processes might make requests that lead to deadlock. But it doesn't mean deadlock has occurred yet." },
    ],
  },
  "bankers": {
    title: "Banker's Algorithm", emoji: "🏦",
    tldr: "Max, Allocation, Need = Max-Allocation, Available. Safety algorithm: find process whose Need ≤ Available, simulate completion, repeat.",
    explanation: `Banker's Algorithm (for multiple resource types): named after bank lending analogy — like a bank that won't lend more than it can guarantee customers will eventually get back.

Data structures: Available[m] (available instances per resource type), Max[n][m] (max demand per process per resource), Allocation[n][m] (current allocation), Need[n][m] = Max - Allocation.

Safety Algorithm: find a process whose Need ≤ Available. Simulate it completing (add its Allocation to Available). Mark it as done. Repeat for remaining processes. If all finish → SAFE. Otherwise → UNSAFE.

Resource Request Algorithm: when Pi requests Resources, check if Request ≤ Need[i] (sanity check), then check Request ≤ Available (can we satisfy it?). Tentatively allocate. Run safety algorithm. If safe → grant. If unsafe → rollback (make Pi wait).`,
    keyPoints: [
      "Need = Max - Allocation (compute this first!)",
      "Available: what's currently free",
      "Safety: find process with Need ≤ Available → simulate → repeat",
      "If all processes can finish in some order → SAFE",
      "Request: check Request ≤ Need AND Request ≤ Available",
      "Tentative allocation + safety check → grant if safe, rollback if not",
      "O(n² × m) time complexity",
    ],
    formula: {
      code: `Data structures (n processes, m resource types):
  Available[m]      = free instances per type
  Max[n][m]         = max demand per process per type
  Allocation[n][m]  = current allocated to each process
  Need[n][m]        = Max[n][m] - Allocation[n][m]

Safety Algorithm:
  work = Available (copy)
  finish[n] = {false, false, ..., false}
  
  LOOP:
    Find i such that: finish[i]==false AND Need[i] ≤ work
    If found:
      work = work + Allocation[i]  (simulate Pi finishing)
      finish[i] = true
    If not found: BREAK
  
  If all finish[i]==true → SAFE state
  Otherwise → UNSAFE

Example (single resource):
  Available=3, Processes:
  P0: Max=9, Alloc=0 → Need=9
  P1: Max=3, Alloc=2 → Need=1
  P2: Max=7, Alloc=3 → Need=4
  
  Step 1: Need[P1]=1 ≤ 3 ✓ → work=3+2=5, finish[P1]=T
  Step 2: Need[P2]=4 ≤ 5 ✓ → work=5+3=8, finish[P2]=T
  Step 3: Need[P0]=9 ≤ 8  ✓ → work=8+0=8... (need ≤ 8) ✓ SAFE
  Safe sequence: <P1, P2, P0>`,
      explanation: "Work starts at Available. Add Allocation of each process as it 'finishes'. If all finish → safe.",
    },
    examTips: [
      "Need = Max - Allocation. Compute this first before anything else.",
      "Safety: iterate until no progress. All finish → safe; else → unsafe.",
      "Request algorithm: ALWAYS check Request ≤ Need first (error if not)",
      "Banker's: process must declare MAX demand upfront (key requirement)",
    ],
    questions: [
      { q: "Available=2, P0: Need=7,Alloc=3. P1: Need=1,Alloc=2. P2: Need=4,Alloc=3. Is it safe?", a: "Step 1: Need[P1]=1 ≤ 2 ✓ → work=2+2=4. Step 2: Need[P2]=4 ≤ 4 ✓ → work=4+3=7. Step 3: Need[P0]=7 ≤ 7 ✓ → work=7+3=10. Safe sequence: <P1,P2,P0>. SAFE." },
    ],
  },
  "deadlock-detection": {
    title: "Deadlock Detection & Recovery", emoji: "🔍",
    tldr: "Single instance: wait-for graph, cycle=deadlock. Multiple: banker-like with Request matrix. Recovery: kill or preempt.",
    explanation: `Detection allows deadlock to happen, then periodically checks for it.

Single instance per resource type: use wait-for graph (derived from RAG by removing resource nodes). Cycle in wait-for graph = deadlock. O(n²) cycle detection.

Multiple instances: use a detection algorithm similar to Banker's. Data: Available, Allocation, Request (current outstanding requests — not max!). Find process with Request ≤ Available, simulate completion, repeat. Processes that never finish → deadlocked.

Recovery options:
1. Process Termination: kill one or all deadlocked processes. Selective killing: kill in order minimizing cost (priority, progress, resources held).
2. Resource Preemption: take resources from one process and give to another. Issues: rollback (victim must restart), starvation (same process always selected as victim).`,
    keyPoints: [
      "Single instance: wait-for graph, O(n²) cycle detection",
      "Multiple instances: Request matrix (not Max like Banker's) + similar algorithm",
      "Detection frequency: every resource request (expensive) or periodically",
      "Recovery 1: terminate one or all deadlocked processes",
      "Recovery 2: preempt resources (rollback process to before acquisition)",
      "Selective kill: consider priority, work done, resources held, starvation",
      "Starvation risk in preemption: same process always preempted",
    ],
    formula: {
      code: `Wait-For Graph (single instance):
  RAG: P1→R1→P2, P2→R2→P1
  Wait-for: P1→P2, P2→P1 ← CYCLE → DEADLOCK

Multiple instance detection:
  Available[m], Allocation[n][m], Request[n][m]
  (Note: Request = current outstanding, not max demand!)
  
  Algorithm (same as Banker's safety):
    work = Available
    finish[i] = (Allocation[i] == 0)  ← done if no resources
    
    Find i: finish[i]==false AND Request[i] ≤ work
    work += Allocation[i]; finish[i] = true; REPEAT
    
    finish[i]==false for any i → Pi is DEADLOCKED

Recovery - Termination:
  Option 1: Abort ALL deadlocked processes (simple, expensive)
  Option 2: Abort ONE at a time + re-run detection after each
  
Recovery - Preemption:
  Select victim → preempt resource → rollback victim process
  Risk: same process always victim → starvation`,
      explanation: "Detection uses Request (current requests), not Max. Same algorithm structure as Banker's.",
    },
    examTips: [
      "Detection uses REQUEST (current), not MAX demand (like Banker's does)",
      "finish[i] initialized to TRUE if Allocation[i] is all zeros (process has nothing)",
      "After detecting deadlock: terminate or preempt (two recovery approaches)",
      "Starvation in recovery: always picking same victim → add age/count limit",
    ],
    questions: [
      { q: "How does deadlock detection differ from deadlock avoidance (Banker's) in terms of data used?", a: "Banker's uses Max demand (declared upfront). Detection uses actual current Request (the requests being made right now). Detection has no advance knowledge requirement." },
    ],
  },
  "signals": {
    title: "Signals", emoji: "📡",
    tldr: "Software interrupts. Generated→Delivered→Handled. Sync: illegal mem access, div/0. Async: Ctrl+C, timer. kill() and pthread_kill().",
    explanation: `A signal is a software interrupt in Unix/Linux used to notify a process of an event.

Three-step pattern: (1) Signal is GENERATED by event. (2) Signal is DELIVERED to a process. (3) Signal must be HANDLED.

Synchronous signals: caused by the process itself (e.g., illegal memory access, division by zero). Delivered to the process that caused it.
Asynchronous signals: caused by external events (Ctrl+C, timer expiry). Delivered to the process from outside.

Handling: default signal handler (kernel-defined) or user-defined signal handler (overrides default). Some signals can be ignored. kill() sends signal to a process. pthread_kill() sends to a specific thread.

Windows equivalent: APC (Asynchronous Procedure Calls) — similar to async signals but delivered to a specific thread, not the whole process.`,
    keyPoints: [
      "Signal = software interrupt. Pattern: Generate → Deliver → Handle.",
      "Synchronous: caused by same process (illegal mem access, div/0)",
      "Asynchronous: external event (Ctrl+C, timer, kill command)",
      "Two handlers: default (kernel) or user-defined (can override default)",
      "kill(pid, signal): send signal to process",
      "pthread_kill(tid, signal): send signal to specific thread",
      "Multithreaded: sync signals → to causing thread. Async → more complex.",
      "SIGKILL/SIGSTOP cannot be caught or ignored (hardcoded)",
    ],
    formula: {
      code: `Key Linux Signals:
  SIGINT  (2)  → Ctrl+C → terminate program
  SIGALRM (14) → alarm() timer expired
  SIGABRT (6)  → abort() called
  SIGSTOP (19) → pause process (cannot be caught!)
  SIGCONT (18) → resume paused process
  SIGSEGV (11) → segmentation fault (illegal memory access)
  SIGKILL (9)  → force terminate (cannot be caught!)

Signal delivery in multithreaded programs:
  Option 1: deliver to thread that triggered it (sync signals)
  Option 2: deliver to every thread (Ctrl+C)
  Option 3: deliver to specific threads only
  Option 4: designate ONE thread as signal receiver

Sending signals:
  kill(pid, SIGTERM)          // to process
  pthread_kill(tid, SIGTERM)  // to specific thread

Windows alternative:
  APC (Asynchronous Procedure Call)
  - User thread specifies callback function
  - Triggered on specific event
  - Delivered to specific thread (not whole process)`,
      explanation: "SIGKILL and SIGSTOP cannot be caught or ignored — guaranteed delivery.",
    },
    examTips: [
      "SIGSEGV = segmentation fault (illegal memory access)",
      "SIGKILL (9) and SIGSTOP (19): CANNOT be caught or ignored",
      "Sync signals → to CAUSING thread. Async signals → more flexible delivery options.",
      "Windows APC = rough equivalent of Unix async signals",
    ],
    questions: [
      { q: "What is the difference between synchronous and asynchronous signals?", a: "Synchronous: caused by the process itself (e.g., segfault, divide by zero) — delivered to the same process that caused it. Asynchronous: caused by external events (Ctrl+C, timer, another process) — delivered to the target process from outside." },
      { q: "Which Linux signals cannot be caught or ignored?", a: "SIGKILL (signal 9) and SIGSTOP (signal 19). These are always delivered and handled by the kernel directly." },
    ],
  },
};
