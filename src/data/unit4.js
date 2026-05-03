// Auto-extracted from unit4.jsx
export const groups = [
  { name: "📁 File Concepts", ids: ["file-concept","file-attrs","file-ops","file-types-access"] },
  { name: "🗂️ Directory Structures", ids: ["dir-single-two","dir-tree","dir-acyclic","dir-general"] },
  { name: "🔌 FS Mounting & Sharing", ids: ["fs-mounting","file-sharing","file-protection"] },
  { name: "⚙️ FS Implementation", ids: ["fs-layers","fs-impl","vfs"] },
  { name: "💾 Disk Allocation", ids: ["alloc-contiguous","alloc-linked","alloc-indexed"] },
  { name: "🆓 Free Space Mgmt", ids: ["free-bitvector","free-linked","free-groupcounting"] },
  { name: "🖴 Mass Storage", ids: ["disk-structure","ssd-tape","disk-latency"] },
  { name: "📡 Disk Scheduling", ids: ["sched-fcfs-sstf","sched-scan-cscan","sched-look"] },
  { name: "🛡️ RAID", ids: ["raid-basics","raid-levels"] },
  { name: "🔐 Protection", ids: ["protection-domains","access-matrix","acl-capability","rbac-revocation"] },
  { name: "🔒 Security", ids: ["security-threats","security-defenses","security-impl"] },
  { name: "🛠️ AWK & SED", ids: ["awk","sed","awk-vs-sed"] },
];

export const topics = {
  "file-concept": {
    title: "File Concept", emoji: "📄",
    tldr: "File = logical storage unit. Sequence of bits/bytes/records. Physical storage = disk. OS manages abstraction.",
    explanation: `A file is the OS's fundamental abstraction for storing data on disk. While disks are the physical storage medium, files are the logical unit users and programs work with. Data CANNOT be written to disk except through files.

A file is a sequence of bits, bytes, lines, or records — the meaning of which is defined by the creator. Files can contain source code, executables, text, images, video, binary data, etc.

The file system is what bridges logical files (names, structure) to physical disk blocks. The OS provides a clean interface so programs don't need to know about cylinders, sectors, or tracks.`,
    keyPoints: [
      "File = logical storage. Disk = physical storage. OS bridges them.",
      "Data cannot be written to disk EXCEPT through files",
      "File = sequence of bits/bytes/lines/records — meaning defined by creator/user",
      "Stored on magnetic disks, SSDs, magnetic tapes, optical disks",
      "File system resides on secondary storage (disk), not RAM",
      "OS provides interface: logical names → physical disk blocks",
    ],
    formula: null,
    examTips: [
      "File is a LOGICAL concept — disk is the physical reality",
      "Data cannot be written to disk without being in a file (exam favorite)",
      "File creator/user defines meaning of contents — OS just stores bytes",
    ],
    questions: [
      { q: "What is the relationship between a file and a disk?", a: "Disk = physical storage (hardware). File = logical storage unit (OS abstraction). The file system maps logical file content to physical disk blocks." },
      { q: "Can data be written to disk without being in a file?", a: "No. All data written to disk must be in a file. Exception: raw disk access (no filesystem), used by databases for performance." },
    ],
  },
  "file-attrs": {
    title: "File Attributes", emoji: "🏷️",
    tldr: "Name (human-readable), Identifier (unique tag/inode), Type, Location, Size, Protection, Time/Date/User.",
    explanation: `Every file has a set of attributes the OS tracks. These are stored in the directory structure (on disk), NOT inside the file itself.

Name: the only attribute kept in human-readable form. Everything else uses internal representations.
Identifier: a unique tag (number) that identifies the file within the file system — what the OS actually uses internally (inode number in Unix).
Type: needed for systems supporting multiple file types.
Location: pointer to the file's physical location on the device.
Size: current file size.
Protection: who can read, write, execute.
Time/date/user: for protection, security, usage monitoring.`,
    keyPoints: [
      "Name: ONLY attribute in human-readable form",
      "Identifier: unique number (inode#) — OS's internal file reference",
      "Type: needed for systems that distinguish file types",
      "Location: pointer to physical disk location",
      "Size: current file size in bytes",
      "Protection: read/write/execute permissions per user/group",
      "Time/date/user: creation, modification, access times + owner",
      "Attributes stored in DIRECTORY STRUCTURE on disk (not inside file)",
    ],
    formula: null,
    examTips: [
      "Name = ONLY human-readable attribute (all others are numeric/binary)",
      "Identifier = inode number in Unix/Linux — NOT the filename",
      "Attributes stored in DIRECTORY, not inside the file's data blocks",
    ],
    questions: [
      { q: "Which file attribute is the only one kept in human-readable form?", a: "Name. All other attributes (identifier, size, location, etc.) use internal binary/numeric formats." },
      { q: "Where are file attributes stored?", a: "In the directory structure, which resides on disk. NOT inside the file's data blocks." },
    ],
  },
  "file-ops": {
    title: "File Operations", emoji: "⚙️",
    tldr: "Create, Write (write ptr), Read (read ptr), Seek/Reposition, Delete, Truncate, Append, Open, Close.",
    explanation: `Files are abstract data types. The OS provides system calls to operate on them.

Create: allocate space + make directory entry.
Write: write pointer tracks where next write goes.
Read: read pointer tracks where next read comes from.
Reposition (Seek/lseek): move the file pointer without I/O. Also called "seek to location."
Delete: search directory → release space → remove directory entry.
Truncate: erase CONTENTS but KEEP attributes (set file size to 0 without deleting).
Open: returns file handle. OS maintains open-file table with: file pointer, open-file count, disk location, access rights.
Close: release file from open-file table when last process closes it.`,
    keyPoints: [
      "Write: write pointer → next write location",
      "Read: read pointer → next read location (per-process pointer)",
      "Reposition (seek/lseek): moves pointer, NO actual I/O needed",
      "Truncate: erase CONTENTS, KEEP attributes (size → 0)",
      "Delete: search dir → release space → remove entry",
      "Open: returns file handle. Maintains open-file table.",
      "Open-file table tracks: file pointer, open-count, disk location, access rights",
      "File-open count: allows removal from table when last process closes",
    ],
    formula: {
      code: `Open File Table entries:
  ┌─────────────────────────────────┐
  │ File pointer    │ per-process   │
  │ File-open count │ shared        │
  │ Disk location   │ shared        │
  │ Access rights   │ per-process   │
  └─────────────────────────────────┘

Key operations:
  lseek(fd, offset, whence) → reposition: NO I/O
  truncate(file, 0)         → erase contents, keep file
  open(file, flags)         → returns fd (file descriptor)
  close(fd)                 → decrement open-count`,
      explanation: "File pointer is per-process. Disk location and open-count are shared.",
    },
    examTips: [
      "Reposition (seek) = NO actual disk I/O (just moves pointer)",
      "Truncate = erase contents, KEEP file and its attributes (size becomes 0)",
      "Delete = actually removes the file and directory entry",
      "Open-file count: entry removed from table only when LAST process closes",
    ],
    questions: [
      { q: "What is the difference between Truncate and Delete?", a: "Truncate: removes file contents (size → 0) but keeps the file and all its attributes. Delete: removes the file entirely including directory entry and frees all disk space." },
      { q: "Does repositioning (lseek) involve disk I/O?", a: "No. Repositioning just moves the file pointer in memory. No actual disk access occurs." },
    ],
  },
  "file-types-access": {
    title: "File Types & Access Methods", emoji: "🗃️",
    tldr: "Sequential: read/write in order, reset. Direct: read/write block n directly (random access).",
    explanation: `File Structure: Files can have no structure (raw bytes), simple record structure (fixed/variable-length lines), or complex structures (formatted documents, relocatable binaries). OS or program decides.

File Locks: Shared lock (reader lock) — multiple processes can hold simultaneously. Exclusive lock (writer lock) — only one process at a time. Mandatory: OS enforces. Advisory: processes voluntarily check.

Access Methods:
Sequential: read/write in order, can reset to beginning. Most common (log files, pipes).
Direct (Random): fixed-length records accessed by block number n. Can jump to any record instantly. Used for databases.`,
    keyPoints: [
      "Sequential access: read/write next, reset to beginning — in order only",
      "Direct access: read/write block n — jump to any position",
      "Direct access uses relative block numbers (from start of file)",
      "Shared lock = reader lock: multiple holders OK",
      "Exclusive lock = writer lock: only one at a time",
      "Mandatory locking: OS enforces. Advisory: processes check voluntarily",
      "Can simulate sequential on direct: cp = current position variable",
      "Relative block n → OS decides actual physical disk location",
    ],
    formula: {
      code: `Sequential Access:
  read_next()   → read from current position, advance ptr
  write_next()  → write at current position, advance ptr
  reset()       → go back to beginning of file

Direct Access (block n from start of file):
  read(n)          → read block n
  write(n)         → write to block n
  position_to(n)   → set current position to block n
  read_next()      → read from current position
  write_next()     → write at current position

Simulate sequential on direct:
  cp = 0  →  read_next ≡ read(cp); cp++`,
      explanation: "Direct access uses relative block number (0-based from file start).",
    },
    examTips: [
      "Sequential: read/write in ORDER, can only reset — no jumping",
      "Direct: any block by number — databases use this",
      "Relative block number: index from start of file (not physical address)",
      "Shared lock = concurrent reads OK. Exclusive = no concurrent access.",
    ],
    questions: [
      { q: "Which access method do databases typically use, and why?", a: "Direct (random) access. Databases need to jump to any record instantly without scanning from the beginning — sequential would be far too slow." },
    ],
  },
  "dir-single-two": {
    title: "Single & Two-Level Directories", emoji: "📂",
    tldr: "Single: one dir for ALL users (naming + grouping problems). Two-level: separate dir per user (path names, no grouping).",
    explanation: `A directory is a collection of nodes containing information about all files. Both directories and files reside on disk.

Directory operations: Search, Create file, Delete file, List directory, Rename file, Traverse file system.

Directory goals: Efficiency (find files fast), Naming (meaningful names, same name for different users), Grouping (logical grouping by type/property).

Single-Level Directory: ONE directory for ALL users. Problem 1: Naming — two users cannot have same filename. Problem 2: Grouping — no way to organize files logically.

Two-Level Directory: Separate directory for each user. Each user has their own namespace → same filename OK. Path names introduced. Efficient searching. BUT still no grouping within a user's directory.`,
    keyPoints: [
      "Directory = collection of nodes with info about all files (resides on disk)",
      "Directory ops: Search, Create, Delete, List, Rename, Traverse",
      "Single-level: ONE dir for all users → naming + grouping problems",
      "Two-level: separate dir per user → path names + same filename OK",
      "Two-level: efficient search but NO grouping capability",
      "Path name introduced with two-level directories",
    ],
    formula: {
      code: `Single Level:
  [root dir: file1, file2, file3, ...] ← all users share this
  Problem: User A names file "test" → User B can't also name "test"

Two Level:
  / [Master File Directory]
    /UserA/ → file1, file2, test
    /UserB/ → report, test    ← same name OK!
    /UserC/ → data, prog

  Path: /UserA/test   vs   /UserB/test → different files!`,
      explanation: "Two-level adds namespacing: /user/filename. Same filename → different users = OK.",
    },
    examTips: [
      "Single-level: naming problem + grouping problem (2 problems, remember both)",
      "Two-level: solves naming (path names), but NO grouping capability",
      "Single-level: all users share ONE directory",
      "Two-level: Master File Directory (MFD) + User File Directories (UFD)",
    ],
    questions: [
      { q: "What are the two problems with a single-level directory?", a: "1. Naming problem: two users can't have files with the same name. 2. Grouping problem: no way to logically group related files." },
    ],
  },
  "dir-tree": {
    title: "Tree-Structured Directories", emoji: "🌲",
    tldr: "Most common structure. Root + unique paths. Absolute vs relative paths. Can't share files (limitation).",
    explanation: `Tree-structured directories are the most common in modern systems (Unix, Windows). A single root directory with every file having a unique absolute path.

Current directory (working directory): the directory you're in right now. Relative paths use this as starting point. Absolute paths always start from root (/).

Key operations: cd (change directory), mkdir (create subdirectory), rm (delete file), rmdir (remove directory). Deleting a directory deletes its ENTIRE subtree.

Key limitation: cannot share files. If the same file needs to appear in two places, you need to copy it — no aliasing. This limitation is solved by acyclic-graph directories (hard/symbolic links).`,
    keyPoints: [
      "Most common directory structure (Unix, Windows)",
      "Single root; every file has a unique path",
      "Absolute path: starts from / (root)",
      "Relative path: starts from current working directory",
      "mkdir creates subdirectory in current directory",
      "Delete directory → deletes ENTIRE subtree rooted there",
      "KEY LIMITATION: cannot share files between directories",
      "cd /spell/mail/prog → changes working directory",
    ],
    formula: {
      code: `Absolute path: /spell/mail/prog/list
Relative path (if cwd = /spell): mail/prog/list

Commands:
  mkdir count       → creates /mail/count (if in /mail)
  rm <filename>     → delete a file
  cd /spell/mail    → change to /spell/mail dir
  
  Deleting /mail:
  → deletes /mail/prog, /mail/count, all files inside!

File system traversal:
  / → bin, etc, home, usr
      home/ → userA, userB
               userA/ → docs, code, test.txt`,
      explanation: "Each node is a directory or file. Path = concatenation of node names from root.",
    },
    examTips: [
      "Tree = most common directory structure in real OSes",
      "Cannot share files in tree structure (need links for sharing)",
      "Deleting a directory: removes the ENTIRE subtree (rm -r equivalent)",
      "Absolute: from /. Relative: from current working directory.",
    ],
    questions: [
      { q: "What is the key limitation of tree-structured directories?", a: "Cannot share files. The same file cannot appear in two different directories — you'd need to make a copy. Solved by acyclic-graph directories with links." },
    ],
  },
  "dir-acyclic": {
    title: "Acyclic-Graph Directories", emoji: "🔗",
    tldr: "Allows file sharing via links (aliasing). No cycles. Dangling pointer problem when original deleted.",
    explanation: `An acyclic graph directory allows the same file or subdirectory to appear in multiple directories via links (aliasing). This enables sharing without copying.

Two programmers working on a joint project can have the shared files appear in both their directories — no duplication needed.

Problem: dangling pointers. If dict deletes a shared file, the link in the other directory now points to nothing (dangling pointer). Solutions:
1. Backpointers: track all links to a file; delete all when file deleted.
2. Entry-hold-count (reference count): count how many links point to file; only delete when count reaches 0.
3. New entry type (symbolic link): a link is just a path name; if original deleted, link breaks gracefully.`,
    keyPoints: [
      "Allows SHARING: same file/dir appears in multiple directories",
      "Two different names (aliasing) for the same underlying file",
      "No cycles in the directory graph (acyclic)",
      "Problem: dangling pointer when original file is deleted",
      "Solution 1: backpointers — delete all pointers when file deleted",
      "Solution 2: entry-hold-count (reference count) — delete when count = 0",
      "Solution 3: symbolic links — just a path name, breaks if original gone",
      "Hard link: direct pointer to inode. Soft/Symbolic link: path name.",
    ],
    formula: {
      code: `Scenario:
  /dict/list  ──┐
                ├──→ [actual file on disk]
  /spell/list ──┘

  Two directories, ONE physical file copy.

Reference count (Entry-hold-count):
  count = 2 (dict + spell both link to it)
  
  dict deletes "list":
    count = 2 - 1 = 1  → file NOT deleted (spell still needs it)
  
  spell deletes "list":
    count = 1 - 1 = 0  → file NOW deleted from disk

Dangling pointer (without reference count):
  dict deletes file → spell/list now points to NOTHING!`,
      explanation: "Reference count = number of hard links to a file. File deleted only when count = 0.",
    },
    examTips: [
      "Entry-hold-count / Reference count: file deleted only when count = 0",
      "Dangling pointer: link exists but target is gone (classic exam question)",
      "Hard link: points to inode (count). Soft/Symbolic: stores path string",
      "In Unix: `ln` = hard link, `ln -s` = symbolic link",
    ],
    questions: [
      { q: "What is a dangling pointer in the context of acyclic-graph directories?", a: "A directory entry (link) that points to a file that has been deleted. The link still exists but the file it referenced is gone, so accessing it fails." },
      { q: "How does entry-hold-count (reference count) prevent dangling pointers?", a: "It counts how many directory entries point to the file. The file is only physically deleted when the count reaches 0, ensuring no links remain when the data is gone." },
    ],
  },
  "dir-general": {
    title: "General Graph Directory", emoji: "🕸️",
    tldr: "Allows cycles. Multiple parents per dir. Powerful but needs garbage collection for cleanup.",
    explanation: `A general graph directory allows cycles — a directory can have multiple parent directories, and paths can loop. This is the most flexible structure but also the most complex.

Advantages: allows maximum flexibility in linking/sharing. Multiple directories can be derived from more than one parent.

Disadvantages: more costly to implement. Needs garbage collection (must traverse entire file system to find all reachable files and free unreachable ones — like GC in programming languages).

How to prevent infinite loops: (1) Allow links only to files, not subdirectories. (2) Use garbage collection. (3) Run cycle-detection algorithm every time a new link is added.`,
    keyPoints: [
      "Allows CYCLES in directory structure",
      "Multiple parent directories for one node",
      "More flexible than acyclic graph but more costly",
      "Needs GARBAGE COLLECTION: traverse entire FS, mark reachable, free rest",
      "Problem: simple path traversal can loop infinitely",
      "Solution 1: links only to files (not subdirectories)",
      "Solution 2: garbage collection after traversal",
      "Solution 3: cycle detection algorithm on every new link added",
    ],
    formula: null,
    examTips: [
      "Garbage collection = mark-and-sweep over entire file system",
      "General graph: most flexible but requires GC (expensive!)",
      "Cycle prevention: restrict links to files only (not directories) — simplest fix",
      "Acyclic graph is preferred over general graph for this reason",
    ],
    questions: [
      { q: "Why does a general graph directory require garbage collection?", a: "Cycles in the directory graph mean reference counting alone doesn't work — a cycle can keep counts > 0 even when all external references are gone. GC traverses the entire file system to find truly unreachable files." },
    ],
  },
  "fs-mounting": {
    title: "File System Mounting", emoji: "🔌",
    tldr: "FS must be MOUNTED before access. Unmounted FS attached at a mount point → becomes part of directory tree.",
    explanation: `Before any file system can be accessed, it must be mounted into the system's directory tree. This is how external drives, USB sticks, and network shares become accessible.

A mount point is an existing directory in the current tree where the new file system gets attached. After mounting, files in the new file system appear as if they're under that directory.

The OS maintains a mount table tracking all active mounts (mount points and file system types). On Linux: /etc/fstab for permanent mounts, mount command for temporary. Mount makes a separate file system appear as part of the unified directory tree.`,
    keyPoints: [
      "File system MUST be mounted before it can be accessed",
      "Mount point: existing directory where FS is attached",
      "After mount: files appear under the mount point directory",
      "OS maintains mount table: mounts, mount points, FS types",
      "Linux: /etc/fstab for permanent mounts",
      "Unmounting: detaches the FS from the tree",
      "Allows combining multiple physical devices into one logical tree",
    ],
    formula: {
      code: `Example:
  Before mount:
    / → bin, home, mnt/
    mnt/ → (empty)
  
  USB drive (ext4 FS) mounted at /mnt/usb:
    mount /dev/sdb1 /mnt/usb
  
  After mount:
    / → bin, home, mnt/
    mnt/ → usb/
            usb/ → file1, file2, pictures/

  Access USB files: /mnt/usb/file1 (looks like regular files!)

Mount table entry:
  { mount_point: /mnt/usb, device: /dev/sdb1, type: ext4 }`,
      explanation: "Mount makes a new FS appear as a subtree of the existing directory tree.",
    },
    examTips: [
      "Must MOUNT before access (can't access unmounted FS)",
      "Mount point = existing directory in current tree",
      "Files in mounted FS accessed via mount point path",
      "Unmounting = detaching FS from tree (can't unmount if in use)",
    ],
    questions: [
      { q: "What happens when you mount a file system at /mnt/data?", a: "The root of the new file system replaces the /mnt/data directory. All files in the mounted FS are accessible via /mnt/data/... paths as if they were regular files in the tree." },
    ],
  },
  "file-sharing": {
    title: "File Sharing", emoji: "🤝",
    tldr: "Multi-user: UID/GID per user/group. Distributed: NFS (Unix), CIFS (Windows). Remote via FTP/web.",
    explanation: `File sharing is essential in multi-user systems. The OS must balance sharing with protection.

On multi-user systems: User IDs (UID) identify individual users. Group IDs (GID) allow users to be grouped with shared permissions. Every file has an owner and a group association.

Remote file sharing: FTP (manual, application-level), Distributed file systems (automatic, seamless — NFS, CIFS), World Wide Web (semi-automatic).

NFS (Network File System): standard Unix/Linux client-server protocol. Server exports directories. Client mounts them. Transparent to applications — same system calls work.

CIFS (Common Internet File System): standard Windows protocol for network shares. LDAP, DNS, NIS, Active Directory: distributed naming services for unified access to remote resources.`,
    keyPoints: [
      "UID (User ID): identifies individual users for per-user permissions",
      "GID (Group ID): groups of users with shared access rights",
      "Every file: has owner (UID) and group (GID)",
      "Remote sharing: FTP (manual), DFS/NFS (automatic), Web (semi-auto)",
      "NFS: standard Unix/Linux network file sharing protocol",
      "CIFS: standard Windows network file sharing protocol",
      "LDAP/DNS/NIS/Active Directory: distributed naming/identity services",
    ],
    formula: null,
    examTips: [
      "NFS = Unix/Linux. CIFS = Windows (network sharing protocols)",
      "UID per user. GID per group. File has BOTH owner (UID) and group (GID)",
      "NFS/CIFS: application uses same system calls — sharing is transparent",
    ],
    questions: [
      { q: "What is the difference between NFS and CIFS?", a: "NFS (Network File System) is the standard Unix/Linux network file-sharing protocol. CIFS (Common Internet File System) is the standard Windows network sharing protocol (also called SMB). Both allow clients to mount and access remote file systems transparently." },
    ],
  },
  "file-protection": {
    title: "File Protection (Unix rwx)", emoji: "🔐",
    tldr: "Three classes: owner/group/public. RWX bits. chmod 764 = owner:rwx, group:rw, public:r.",
    explanation: `File protection controls WHO can do WHAT to a file. Unix uses a 9-bit permission system: three bits (Read, Write, Execute) for each of three classes (Owner, Group, Public/Other).

Read (r=4): view file contents / list directory contents.
Write (w=2): modify file / add/delete files in directory.
Execute (x=1): run file as program / traverse directory.

Each class gets three bits encoded as an octal digit:
Owner: rwx = 111 = 7. rw- = 110 = 6. r-- = 100 = 4.
chmod 764: owner=7(rwx), group=6(rw-), public=4(r--).
chgrp G file: change the group associated with a file.`,
    keyPoints: [
      "Three access classes: Owner, Group, Public (others)",
      "Three access types per class: Read (4), Write (2), Execute (1)",
      "Total: 9 bits represented as 3 octal digits",
      "r=4, w=2, x=1 → add to get octal digit",
      "chmod 764: owner=rwx(7), group=rw(6), public=r(4)",
      "chown: change owner. chgrp: change group.",
      "Execute on directory = permission to traverse (cd into it)",
      "Types of access: Read, Write, Execute, Append, Delete, List",
    ],
    formula: {
      code: `Unix File Permissions:
  [owner|group|public]
  
  R W X | R W X | R W X
  1 1 1 | 1 1 0 | 0 0 1
    7   |   6   |   1   → chmod 761

Decode any chmod value:
  chmod 764:
    7 = 4+2+1 = rwx (owner gets all)
    6 = 4+2+0 = rw- (group gets read+write)
    4 = 4+0+0 = r-- (public gets read only)
    
  chmod 755 (common for directories):
    7 = rwx (owner: full control)
    5 = r-x (group: read+execute, no write)
    5 = r-x (public: read+execute, no write)

  chgrp G game → attach group G to file "game"
  ls -l output: -rwxr-xr-- 1 owner group 1234 Jan 1 file`,
      explanation: "Each octal digit = sum of r(4)+w(2)+x(1). 3 digits = owner/group/other.",
    },
    examTips: [
      "r=4, w=2, x=1 — MEMORIZE these values",
      "chmod 764: decode as 7=rwx, 6=rw-, 4=r-- → owner|group|public",
      "Execute on directory = traverse (cd into). Without x, can't enter dir.",
      "setuid bit: process runs with FILE OWNER's permissions (not runner's)",
    ],
    questions: [
      { q: "What permissions does chmod 644 give?", a: "6=rw- (owner: read+write), 4=r-- (group: read only), 4=r-- (public: read only). Common for regular files." },
      { q: "What does execute permission on a DIRECTORY mean?", a: "Permission to traverse (enter) the directory using cd. Without execute, you cannot cd into a directory or access files inside it, even if you know their names." },
    ],
  },
  "fs-layers": {
    title: "Layered File System", emoji: "🏗️",
    tldr: "5 layers: I/O control → Basic FS → File-org module → Logical FS → User app. Each abstracts the one below.",
    explanation: `The file system is organized in layers, each providing services to the layer above and using services from the layer below.

Layer 1 — I/O Control (Device Drivers + Interrupt Handlers): issues commands to physical hardware, handles interrupts.
Layer 2 — Basic File System: sends generic commands to device drivers ("retrieve block 123"). Manages memory buffers and caches.
Layer 3 — File Organization Module: translates logical block# to physical block#. Manages free space and disk allocation.
Layer 4 — Logical File System: manages metadata, directory structure, FCBs (File Control Blocks = inodes). Handles protection. Translates file name → file number → location.
Layer 5 — User/Application Programs.`,
    keyPoints: [
      "Device drivers: control physical hardware, issue disk I/O commands",
      "Basic file system: 'retrieve block 123' → driver. Manages buffers/caches",
      "File org module: logical block# → physical block#. Free space management.",
      "Logical file system: metadata, directory, FCB/inode, protection",
      "FCB (File Control Block) = inode in Unix: permissions, size, dates, location",
      "Each layer abstracts hardware details from the layer above",
      "VFS sits above logical file system to support multiple FS types",
    ],
    formula: {
      code: `Layered Architecture (top to bottom):
  ┌─────────────────────────────┐
  │    Application Programs     │  ← user code
  ├─────────────────────────────┤
  │      Logical File System    │  ← FCB/inode, dir, protection
  ├─────────────────────────────┤
  │   File Organization Module  │  ← logical→physical block#
  ├─────────────────────────────┤
  │      Basic File System      │  ← buffer/cache, generic commands
  ├─────────────────────────────┤
  │       I/O Control           │  ← device drivers + interrupts
  ├─────────────────────────────┤
  │          Hardware           │  ← physical disk
  └─────────────────────────────┘`,
      explanation: "Each layer only talks to adjacent layers — clean abstraction boundaries.",
    },
    examTips: [
      "FCB = File Control Block = inode (Unix). Stores metadata about ONE file.",
      "File org module: ONLY layer that translates logical → physical block numbers",
      "Logical FS: handles directory management and protection",
      "Basic FS: caches! Buffer cache lives here.",
    ],
    questions: [
      { q: "What is a File Control Block (FCB)?", a: "A storage structure (called inode in Unix) containing all metadata about a file: permissions, size, dates, owner, and pointers to the file's disk blocks. One FCB per file." },
    ],
  },
  "fs-impl": {
    title: "File System Implementation", emoji: "🗄️",
    tldr: "On-disk: boot block, superblock, dir structure, FCBs. In-memory: mount table, open-file tables, buffers.",
    explanation: `On-disk structures: Boot control block (first block of volume, needed to boot OS from that partition). Volume control block / Superblock (total blocks, free blocks, block size, free block pointers). Directory structure (file names + inode numbers). Per-file FCB/inode (permissions, size, dates, disk location).

In-memory structures: Mount table (active mounts, mount points, FS types). System-wide open-file table (one entry per distinct open file). Per-process open-file table (per-process file descriptors pointing into system table). Buffers (data blocks in transit between disk and RAM).

Opening a file: OS searches directory → finds inode → copies inode to in-memory open-file table → returns file descriptor to process. Reading: use descriptor → find inode → read disk block → copy to process memory.`,
    keyPoints: [
      "Boot block: volume boot info, first block, needed to start OS",
      "Superblock / Volume control block: total blocks, free blocks, block size",
      "Directory: file names → inode numbers",
      "FCB/inode: per-file metadata (permissions, size, dates, disk ptrs)",
      "Mount table: in-memory, tracks all active mounts",
      "System-wide open-file table: one entry per open file",
      "Per-process open-file table: file descriptors → system table entries",
      "open() returns fd. Subsequent read/write use fd.",
    ],
    formula: {
      code: `Opening a file:
  1. Search directory for "file.txt"
  2. Find inode number (e.g., 42)
  3. Load inode 42 into in-memory open-file table
  4. Create per-process fd → points to table entry
  5. Return fd to process

  open("file.txt", O_READ) → returns fd=3

Reading a file:
  1. Process calls read(fd=3, buf, 100)
  2. OS finds inode via fd → open-file table
  3. Reads block from disk → copies to process buffer

On-disk layout:
  [Boot Block][SuperBlock][Inodes][Data Blocks]
  Block 0      Block 1     Block 2-N  Block N+1...`,
      explanation: "fd = file descriptor = index into per-process open-file table.",
    },
    examTips: [
      "Superblock = Volume Control Block: total/free blocks, block size",
      "NTFS uses master file table (relational DB structure) instead of inode",
      "fd (file descriptor) = per-process. inode = shared system-wide.",
      "Boot block: ONLY needed on bootable volumes (contains boot loader)",
    ],
    questions: [
      { q: "What is the difference between the system-wide open-file table and the per-process open-file table?", a: "System-wide: one entry per distinct open file (inode data, disk location). Per-process: one entry per open file descriptor (fd) in that process, pointing into the system-wide table. Multiple processes can share system-wide entries." },
    ],
  },
  "vfs": {
    title: "Virtual File System (VFS)", emoji: "🌐",
    tldr: "Object-oriented layer. Same system calls work for ALL FS types (ext4, FAT, NFS). VFS dispatches to right driver.",
    explanation: `VFS (Virtual File System) provides an object-oriented abstraction layer above different file system implementations. It allows the same system calls (open, read, write, close) to work on ANY file system type.

How it works: Applications call the VFS API. VFS translates generic operations into specific calls for the actual FS (ext4, FAT32, NTFS, NFS, etc.). Each FS registers its operations with the VFS.

VFS uses vnodes (virtual nodes): in-memory objects representing a file or directory, regardless of FS type. An inode (local) or network file handle (NFS) gets wrapped in a vnode. The vnode contains function pointers to the specific FS's read/write/stat operations.

Result: cp /local/file /nfs/mount/file — works exactly the same even though one is local ext4 and the other is a remote NFS share.`,
    keyPoints: [
      "VFS: object-oriented layer between apps and specific FS implementations",
      "Same system calls work for ALL file system types",
      "VFS dispatches to appropriate FS-specific driver",
      "vnode: in-memory abstraction for a file/dir (wraps inode or network handle)",
      "VFS separates generic FS operations from implementation details",
      "Supports: local FS (ext4, FAT, NTFS), network FS (NFS), virtual FS (/proc)",
      "Linux VFS: four key object types: superblock, inode, dentry, file",
    ],
    formula: {
      code: `Without VFS:
  app → ext4 syscalls
  app → FAT syscalls    ← different calls for each FS!
  app → NFS syscalls

With VFS:
  app → open/read/write (ONE API)
        ↓
       [VFS layer]
        ↓         ↓         ↓
      ext4       FAT      NFS driver
     driver    driver   (remote ops)

VFS dispatches: open("file") on ext4 → ext4_open()
                open("file") on NFS  → nfs_open()
                open("file") on FAT  → fat_open()
                (transparent to app!)`,
      explanation: "VFS = the 'interface' that all file systems implement. Same API for all.",
    },
    examTips: [
      "VFS = allows SAME system calls for ALL FS types (key point!)",
      "vnode wraps inode (local) or file handle (network) — uniform representation",
      "Linux /proc is a VFS-based virtual FS (no actual disk!)",
      "VFS sits ABOVE specific FS implementations, BELOW application layer",
    ],
    questions: [
      { q: "What problem does VFS solve?", a: "Without VFS, applications would need different system calls for each file system type (ext4, FAT, NFS, etc.). VFS provides a single uniform API, dispatching to the appropriate FS driver behind the scenes." },
    ],
  },
  "alloc-contiguous": {
    title: "Contiguous Allocation", emoji: "📏",
    tldr: "Each file occupies contiguous blocks. Fast (sequential+direct). External fragmentation. Need compaction.",
    explanation: `Contiguous allocation assigns each file a set of consecutive disk blocks. Only two values needed in directory entry: starting block number + length (number of blocks).

Advantages: Simple. Best performance — sequential and direct access both fast. Minimal seek time (blocks are adjacent on disk).

Disadvantages: Finding contiguous space is hard (same first/best/worst fit as memory allocation). External fragmentation builds up over time. Need to know file size upfront. Compaction requires downtime. Files can't grow easily.

Address translation: Logical address LA divided by block size. Q = block index within file. R = byte offset within that block. Physical block = Q + starting_block.`,
    keyPoints: [
      "Directory entry: start block + length (number of blocks)",
      "Best read performance (no seeking between blocks)",
      "Supports BOTH sequential AND direct access efficiently",
      "Problem: external fragmentation over time",
      "Problem: must know file size upfront",
      "Problem: file cannot grow (may need to move entire file)",
      "Compaction needed periodically → requires downtime",
      "LA/512 → Q (block index) + R (byte offset within block)",
    ],
    formula: {
      code: `Directory entry: [start=14, length=2]
  → File occupies blocks 14, 15

Address Translation (block size = 512 bytes):
  LA = 1000 bytes
  Q = LA / 512 = 1 (floor division) → block index
  R = LA mod 512 = 488 → byte within block
  
  Physical block = start + Q = 14 + 1 = 15
  Byte within block 15 = 488

Access:
  Sequential: read block 14, then 15 (adjacent → fast!)
  Direct (block n): just go to start+n directly
  
External fragmentation example:
  [File A: 4 blocks][FREE: 2][File B: 6][FREE: 3]
  New file needs 4 blocks → can't fit! (despite 5 free)`,
      explanation: "LA ÷ block_size = Q (block index). LA mod block_size = R (byte offset).",
    },
    examTips: [
      "Physical block = start + Q where Q = floor(LA / block_size)",
      "External fragmentation: main problem. Compaction: solution (but expensive)",
      "Best performance of all three allocation methods",
      "Can't easily grow file (need contiguous space to expand)",
    ],
    questions: [
      { q: "A file starts at block 14, block size = 512 bytes. Access logical byte 1024. Which physical block?", a: "Q = 1024/512 = 2. Physical block = 14 + 2 = block 16. Offset within block = 1024 mod 512 = 0." },
    ],
  },
  "alloc-linked": {
    title: "Linked Allocation", emoji: "🔗",
    tldr: "Each block has pointer to next. No external fragmentation. Only sequential access efficient. FAT is variation.",
    explanation: `Linked allocation stores each file as a linked list of disk blocks. Each block contains data AND a pointer to the next block. Directory entry: first block address only.

Advantages: No external fragmentation (any free block can be used). Files can grow easily. No compaction needed.

Disadvantages: Only efficient for sequential access (to reach block n, must follow n-1 pointers). Pointer overhead wastes space (e.g., 4 bytes per 512-byte block = ~0.8% waste). Reliability problem (broken pointer = lost rest of file). Poor random access performance.

FAT (File Allocation Table): puts all the "next block" pointers in a separate table at the start of the volume. Table can be cached in memory → faster than following on-disk pointers. Used by MS-DOS, Windows (FAT32).`,
    keyPoints: [
      "Directory entry: first block only (no length needed for random access)",
      "Each block: data + pointer to next block (4 bytes of pointer overhead)",
      "NO external fragmentation (any free blocks usable)",
      "Files can grow dynamically (append another free block)",
      "ONLY efficient for sequential access (O(n) for block n)",
      "Reliability risk: corrupt pointer → lost rest of file",
      "FAT variation: pointer table at volume start → cacheable → faster",
      "0 in FAT = free block. EOF value = end of file chain.",
    ],
    formula: {
      code: `Linked list on disk:
  Dir[file] → block 9 → block 16 → block 1 → block 10 → EOF

  Each block: [data (508 bytes) | next ptr (4 bytes)]
  Block size 512B - pointer 4B = 508B usable per block

FAT (File Allocation Table):
  Index:  0   1   2   3   4   5   6   7   8   9  ...
  Value: [EOD][17][EOD][—][EOD][2 ][—][EOD][—][16][...]
  File starts at block 9:
    FAT[9]=16 → FAT[16]=1 → FAT[1]=10 → FAT[10]=EOF
    Blocks: 9, 16, 1, 10 (in order)

FAT cached in memory → follow chain in RAM (fast)!`,
      explanation: "FAT = all pointers in one table at start of volume. Cacheable = much faster than on-disk links.",
    },
    examTips: [
      "Linked: BAD for direct/random access (must traverse from start)",
      "FAT: linked allocation variant with cacheable pointer table",
      "Pointer overhead: 4 bytes per 512-byte block → 508 bytes usable",
      "Reliability: one broken pointer → lose rest of file (major weakness)",
    ],
    questions: [
      { q: "Why is FAT better than standard linked allocation?", a: "In standard linked, following a chain to block n requires n-1 disk reads (each block on disk). FAT keeps all pointers in a single table that can be cached in RAM, so traversal happens in memory — much faster." },
    ],
  },
  "alloc-indexed": {
    title: "Indexed Allocation", emoji: "📋",
    tldr: "Index block holds ALL pointers for one file. Supports direct access. Overhead for small files. Multi-level for large.",
    explanation: `Indexed allocation gives each file its own index block — a special block containing pointers to all the file's data blocks. Directory entry just points to the index block.

Advantages: Supports efficient direct access (go to index block, read pointer #n, access block n directly). No external fragmentation. No need to declare file size upfront.

Disadvantages: Overhead for small files (entire index block wasted for a 2-3 block file). Pointer overhead larger than linked allocation.

For VERY large files: single index block may not have enough pointer entries. Solutions: Linked scheme (chain of index blocks), Multilevel index (index block pointing to other index blocks), Combined scheme (Unix inode: direct + single-indirect + double-indirect + triple-indirect pointers).`,
    keyPoints: [
      "Index block: dedicated block containing ALL pointers for one file",
      "Directory entry → index block → data blocks",
      "Supports direct access: index[n] → data block n (O(1) random access!)",
      "No external fragmentation",
      "Waste: small files still need full index block",
      "Combined scheme (Unix): 12 direct + single/double/triple indirect ptrs",
      "Single indirect: index block → 256 data blocks (1024B block / 4B ptr)",
      "Double indirect: 256 × 256 = 65,536 additional blocks",
    ],
    formula: {
      code: `Indexed Allocation:
  Dir[file] → index_block → [ptr0, ptr1, ptr2, ..., ptrN]
                              ↓     ↓     ↓         ↓
                            blk0  blk1  blk2  ...  blkN

Direct access to block 5:
  1. Read index block (1 I/O)
  2. Get ptr[5] → block address
  3. Read data block (1 I/O)
  Total: 2 I/Os (same as paging!)

Unix Inode (Combined Scheme):
  [12 direct ptrs] → first 12 blocks directly
  [single indirect] → index block → 256 more blocks
  [double indirect] → idx → idx → 256² more blocks
  [triple indirect] → idx → idx → idx → 256³ blocks

  Assuming 4KB blocks, 4B pointers:
  Max file size ≈ 12 + 1024 + 1024² + 1024³ blocks`,
      explanation: "Unix uses combined scheme for flexibility: small files use direct; large use indirect.",
    },
    examTips: [
      "Indexed: 2 I/Os for any data block (1 for index + 1 for data)",
      "Small file waste: index block allocated even for 1-block file",
      "Unix inode: 12 direct + single + double + triple indirect (combined scheme)",
      "Linked scheme for huge files: chain multiple index blocks",
    ],
    questions: [
      { q: "How many disk accesses are needed to read byte 1000 of a file using indexed allocation?", a: "2 disk accesses: (1) read the index block to get the pointer for the target block, (2) read the actual data block at that pointer address." },
    ],
  },
  "free-bitvector": {
    title: "Free Space — Bit Vector", emoji: "🗺️",
    tldr: "1 bit per block. 1=free, 0=allocated. Fast to find contiguous free blocks. Must keep in memory.",
    explanation: `The OS must track which disk blocks are free to allocate to new files. One common method: bit vector (bitmap).

Each disk block gets 1 bit. If bit = 1: block is free. If bit = 0: block is allocated. The entire bitmap is typically kept in memory for fast access, written to disk periodically.

Finding n contiguous free blocks: scan for n consecutive 1-bits. Modern CPUs have hardware instructions to find the first set bit efficiently (BSF/BSR instructions on x86).

Example: blocks 2,3,4,5,8,9,10,11,12,13,17,18,25,26,27 are free → bitmap: 0011110011111100110000001110...`,
    keyPoints: [
      "1 bit per block: 1 = free, 0 = allocated",
      "Disk: free list is 0011110011111100110000001110...",
      "Advantage: simple; finding first free or n contiguous blocks is fast",
      "CPU has hardware bit-scanning instructions → very efficient",
      "Must be kept in memory for performance (written to disk periodically)",
      "If system crashes before writing back: bitmap inconsistency!",
      "Size: n_blocks / 8 bytes (reasonable for large disks)",
    ],
    formula: {
      code: `Example: blocks 2,3,4,5,8,9,10,11,12,13,17,18,25,26,27 free
  
  Bitmap: 0 0 1 1 1 1 0 0 1 1 1 1 1 1 0 0 1 1 0 0 0 0 0 0 0 1 1 1
          0 1 2 3 4 5 6 7 8 9 ...                           25 26 27

  Block 0: 0 (allocated)
  Block 2: 1 (free)
  Block 6: 0 (allocated)
  Block 8: 1 (free)

Size of bitmap for 1TB disk with 4KB blocks:
  1TB / 4KB = 256M blocks
  256M bits = 256M/8 bytes = 32MB bitmap
  (keep this 32MB in memory → fast!)`,
      explanation: "Bit position = block number. 1=free, 0=allocated (IMPORTANT: memorize this).",
    },
    examTips: [
      "1 = FREE, 0 = ALLOCATED (counterintuitive but correct — memorize!)",
      "Best for finding CONTIGUOUS free blocks (scan for runs of 1s)",
      "Must be kept in memory — writing to disk is I/O expensive",
      "Size = total_blocks / 8 bytes",
    ],
    questions: [
      { q: "Bitmap: 001111001. Which blocks are free?", a: "Blocks 2,3,4,5 and 7 are free (bit value = 1). Blocks 0,1,6,8,9 are allocated." },
    ],
  },
  "free-linked": {
    title: "Free Space — Linked List", emoji: "⛓️",
    tldr: "Link all free blocks together. Pointer to first free block cached in memory. Simple but slow to traverse.",
    explanation: `The linked list approach links all free disk blocks together. A special location on disk (and cached in memory) holds a pointer to the first free block. Each free block contains a pointer to the next free block.

To allocate: take the first free block, update the head pointer to point to the next block. To free: add block to front (or end) of the list.

Disadvantage: NOT efficient for traversal. To find n free blocks, you must read each block in sequence — each read requires disk I/O. Cannot easily find contiguous free blocks. Used in early systems, rarely used in modern OSes.`,
    keyPoints: [
      "Link all free blocks together as a linked list",
      "Head pointer (to first free block) cached in memory + stored on disk",
      "Each free block: contains pointer to next free block",
      "Allocate: take head block, update head to next",
      "NOT efficient for traversal (each step = 1 disk I/O)",
      "Cannot find contiguous free blocks easily",
      "Grouping: variation — store n free block addresses in first free block",
    ],
    formula: {
      code: `Linked Free List:
  head → block2 → block3 → block4 → block5 → block8 → ...
  
  [block2: ptr=3][block3: ptr=4][block4: ptr=5]...

Allocate 1 block:
  Take block2, set head = 3 → done (fast!)
  
Traverse to find 10th free block:
  Read block2 → read block3 → ... → read block11
  = 10 disk I/Os (slow!)

Grouping variation:
  block2 = [3, 4, 5, 8, 9, ... (n-1 free addrs), next_group_block]
  → Can find many free blocks from ONE disk read!`,
      explanation: "Basic linked: O(n) I/Os to traverse. Grouping: find n blocks in ~1 I/O.",
    },
    examTips: [
      "Basic linked list: NOT efficient for traversal",
      "Grouping: stores n free addresses in first free block → faster",
      "Counting: stores (first_free_block, count) pairs — good for contiguous chunks",
      "Traversal = substantial I/O time (main weakness of basic linked list)",
    ],
    questions: [
      { q: "Why is the linked list approach for free-space management not efficient?", a: "To traverse the list and find free blocks, each step requires reading a block from disk. Finding n free blocks = n disk I/Os. This is very slow compared to the bit vector approach." },
    ],
  },
  "free-groupcounting": {
    title: "Free Space — Grouping & Counting", emoji: "🧮",
    tldr: "Grouping: n addresses in first free block. Counting: (addr, count) pairs for contiguous runs.",
    explanation: `Grouping: Modification of the linked list. The first free block stores addresses of n free blocks. The first n-1 of those are actually free. The last one points to the next group block (which also stores n addresses). Allows finding many free blocks quickly.

Counting: Instead of listing individual free block addresses, store (starting_address, count) pairs. "Block 14 is free, and so are the 5 blocks following it" = one entry (14, 5). Particularly useful with contiguous allocation (blocks are frequently allocated/freed in groups). Entries stored in a balanced BST for O(log n) lookup, insert, delete.`,
    keyPoints: [
      "Grouping: first free block has n addresses; last of n points to next group",
      "Grouping: find many free blocks with few disk reads",
      "Counting: store (first_block, count) for runs of free blocks",
      "Counting: one entry represents multiple contiguous free blocks",
      "Counting: efficient for contiguous allocation patterns",
      "Counting: balanced BST for O(log n) operations",
    ],
    formula: {
      code: `Grouping:
  free_head → block2[ 3, 4, 5, 8, 9, 10, 11, 12, 13, → block17]
  block17 → [18, 25, 26, 27, ...]
  
  One read of block2 reveals 9 free blocks immediately!
  (much better than linked list)

Counting:
  Free list: (2, 4), (8, 6), (17, 2), (25, 3)
  Meaning:
    blocks 2,3,4,5     are free (start=2, count=4)
    blocks 8..13       are free (start=8, count=6)
    blocks 17,18       are free (start=17, count=2)
    blocks 25,26,27    are free (start=25, count=3)
  
  Total: 15 free blocks described in just 4 entries!`,
      explanation: "Counting compresses free space info for contiguous runs — very space-efficient.",
    },
    examTips: [
      "Grouping: variation of linked list — stores MULTIPLE addresses per block",
      "Counting: (addr, count) pairs — efficient for contiguous allocation",
      "Counting stored in balanced BST: O(log n) search/insert/delete",
      "These are improvements over basic bit vector and linked list",
    ],
    questions: [
      { q: "Which free-space management method is most efficient when blocks are frequently allocated/freed in contiguous groups?", a: "Counting method. It represents a run of n contiguous free blocks as a single (address, count) entry, storing this compactly in a balanced BST." },
    ],
  },
  "disk-structure": {
    title: "Disk Structure & Anatomy", emoji: "🖴",
    tldr: "Platters → Tracks → Cylinders → Sectors. Cylinder = same track position on all platters.",
    explanation: `A hard disk drive (HDD) consists of multiple platters rotating at high speed (60-250 RPM). Each platter has two surfaces coated with magnetic material. Read/write heads fly on a thin air cushion above each surface, attached to a disk arm that moves all heads together.

Logical structure: each surface divided into circular tracks. Tracks subdivided into sectors (smallest addressable unit, typically 512B or 4096B). A cylinder = all tracks at the same arm position across all platters (all surfaces).

Head crash: head contacts surface due to shock/failure → magnetic coating damaged → data lost permanently (not recoverable).`,
    keyPoints: [
      "Platter: circular disk coated with magnetic material (2 surfaces each)",
      "Track: circular ring on one surface",
      "Sector: subdivisions of a track (512B or 4096B, smallest unit)",
      "Cylinder: all tracks at same arm position across ALL platters",
      "Disk arm moves all heads together as a unit",
      "Head crash: head touches surface → permanent, unrecoverable data loss",
      "Drive motor: 60-250 RPM (7200 RPM typical for desktop HDD)",
      "Bus types: EIDE, ATA, SATA, USB, Fiber Channel, SCSI, SAS, Firewire",
    ],
    formula: {
      code: `Disk Anatomy:
  Platter 1: [surface top:  track0 track1 ... trackN]
             [surface bot:  track0 track1 ... trackN]
  Platter 2: [surface top:  track0 track1 ... trackN]
             [surface bot:  track0 track1 ... trackN]
  
  Cylinder n = {platter1.top.track_n, platter1.bot.track_n,
               platter2.top.track_n, platter2.bot.track_n}
  
  Reading cylinder n: no arm movement needed!
  (all heads at same position → read all surfaces = free!)
  
  Physical address: [cylinder | head | sector]`,
      explanation: "Cylinder = same track across all surfaces. Reading a full cylinder needs 0 extra seeks.",
    },
    examTips: [
      "Cylinder = tracks at same ARM POSITION across ALL platters (not just one platter)",
      "Head crash = unrecoverable data loss (exam favorite)",
      "Sector = smallest addressable unit (512B or 4096B)",
      "All heads on same arm → move together, can't position independently",
    ],
    questions: [
      { q: "What is a cylinder in the context of disk structure?", a: "A cylinder is the set of all tracks at the same arm position across all platters and surfaces. When the arm is at a given position, all surfaces can be read/written without moving — accessing a full cylinder requires zero additional seek time." },
    ],
  },
  "ssd-tape": {
    title: "SSD & Magnetic Tape", emoji: "💿",
    tldr: "SSD: no moving parts → no seek/rotation latency. Faster but costlier. Tape: sequential only, for backup.",
    explanation: `Solid-State Disk (SSD): Non-volatile memory (NAND flash) used like a hard drive. No moving parts → no seek time, no rotational latency. Much faster than HDD. Downsides: more expensive per GB, limited write cycles (cells wear out), standard bus (SATA) can be bottleneck → connect directly to PCIe/NVMe for max speed.

Magnetic Tape: Early secondary storage. Relatively permanent, large capacity, cheap per GB. But random access is ~1000× slower than HDD (must physically wind tape to position). Only used today for backup, archival storage, data transfer between sites.`,
    keyPoints: [
      "SSD: non-volatile memory, no moving parts",
      "SSD: NO seek time, NO rotational latency → much faster",
      "SSD: more expensive per MB, limited write cycles",
      "SSD: SATA bus can bottleneck → NVMe/PCIe for max performance",
      "SSD: may be more reliable than HDD (no crash risk)",
      "Magnetic tape: sequential access only",
      "Tape: random access ~1000× slower than disk",
      "Tape: used for backup/archival/data transfer only",
    ],
    formula: null,
    examTips: [
      "SSD: no seek time + no rotational latency (the TWO latency sources HDD has)",
      "SSD: SATA bottleneck → fix with NVMe (directly on PCIe bus)",
      "Tape: ~1000× slower than disk for random access",
      "SSD vs HDD: SSD faster+pricier, HDD cheaper+slower, both non-volatile",
    ],
    questions: [
      { q: "Why does an SSD have no seek time or rotational latency?", a: "SSDs have no moving parts — data is stored in flash memory cells accessed electronically. There's no arm to move (no seek) and no spinning platter to wait for (no rotational latency)." },
    ],
  },
  "disk-latency": {
    title: "Disk Access Time & Latency", emoji: "⏱️",
    tldr: "Disk Latency = Seek time + Rotational latency + Transfer time. Minimize seek time = goal of scheduling.",
    explanation: `Three components of disk access time:

Seek time: time for the disk arm to move to the correct cylinder. Dominates total access time. Minimizing this is the goal of disk scheduling algorithms.

Rotational latency: time waiting for the desired sector to rotate under the read/write head. On average = half rotation time. At 7200 RPM: one rotation = 1/7200 min = 8.33ms → avg rotational latency = 4.17ms.

Transfer time: actual time to transfer data once head is in position. Fastest component — proportional to amount of data.

Disk bandwidth = total bytes transferred / (time from first request to last transfer completion).`,
    keyPoints: [
      "Disk Latency = Seek time + Rotational latency + Transfer time",
      "Seek time: arm movement to correct cylinder — DOMINANT factor",
      "Rotational latency: waiting for sector to rotate under head",
      "Average rotational latency = ½ rotation time",
      "Transfer time: time to actually read/write data (fastest)",
      "Disk bandwidth = total bytes / total time from first request to last transfer",
      "Goal: minimize seek time (disk scheduling)",
    ],
    formula: {
      code: `Total Disk Access Time:
  = Seek time + Rotational latency + Transfer time

Example: 7200 RPM disk
  Rotation speed: 7200 rev/min = 120 rev/sec
  Time per rotation: 1/120 = 8.33 ms
  Average rotational latency: 8.33/2 = 4.17 ms

  Typical values:
    Seek time:          3-15 ms (average ~9ms)
    Rotational latency: 0-8.33ms (avg 4.17ms)
    Transfer time:      ~0.1-1ms (fast!)
    Total:              ~10-20 ms per random access

SSD equivalent:
  Seek time:         0 (no arm)
  Rotational latency: 0 (no platter)
  Transfer time:     ~0.05-0.1ms
  Total:             ~0.1ms (100× faster than HDD!)`,
      explanation: "Seek time = dominant factor for HDD. SSD eliminates seek + rotational latency entirely.",
    },
    examTips: [
      "Disk Latency = Seek + Rotational + Transfer — MEMORIZE formula",
      "Average rotational latency = ½ × (time for one full rotation)",
      "Seek time = dominant (most expensive) component of HDD access",
      "Disk scheduling algorithms minimize TOTAL SEEK DISTANCE",
    ],
    questions: [
      { q: "Disk rotates at 6000 RPM. What is the average rotational latency?", a: "Time per rotation = 60s/6000 = 0.01s = 10ms. Average latency = 10/2 = 5ms." },
    ],
  },
  "sched-fcfs-sstf": {
    title: "FCFS & SSTF Disk Scheduling", emoji: "📡",
    tldr: "FCFS: service in order (640 cylinders). SSTF: closest first (236 cylinders) — may cause starvation.",
    explanation: `Standard request queue: 98, 183, 37, 122, 14, 124, 65, 67. Head starts at 53.

FCFS (First Come First Served): service requests in the order they arrive. Simple, fair, no starvation. BUT: huge total head movement (640 cylinders in the example) — inefficient. Random jumping across the disk.

SSTF (Shortest Seek Time First): always serve the request closest to the current head position. Like SJF scheduling. Reduces total movement significantly (236 cylinders). Disadvantage: can cause starvation — if new nearby requests keep arriving, far-away requests may wait forever.`,
    keyPoints: [
      "FCFS: serve in arrival order. Fair. No starvation. 640 cylinders.",
      "SSTF: closest request first. 236 cylinders (better!)",
      "SSTF: form of SJF → starvation possible for distant requests",
      "SSTF is NOT optimal (SCAN can do better for sustained loads)",
      "Optimization algorithms only make sense when queue has multiple requests",
      "Standard example: queue=98,183,37,122,14,124,65,67. Head=53.",
    ],
    formula: {
      code: `Standard Example: Head=53, Queue: 98,183,37,122,14,124,65,67

FCFS (serve in order):
  53→98→183→37→122→14→124→65→67
  45 + 85 + 146 + 85 + 108 + 110 + 59 + 2 = 640 cylinders

SSTF (always go to closest):
  53→65→67→37→14→98→122→124→183
  12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = 236 cylinders
  
  At each step: find which queued request is closest
  From 53: closest is 65 (distance 12)
  From 65: closest is 67 (distance 2)
  From 67: closest is 37 (distance 30)
  ...`,
      explanation: "SSTF: at each step, service the request with MINIMUM distance from current head.",
    },
    examTips: [
      "FCFS: 640 cylinders. SSTF: 236 cylinders (for standard example)",
      "SSTF can starve: requests far from head may wait indefinitely",
      "SSTF = SJF for disk scheduling (same starvation problem)",
      "Both algorithms: queue must have multiple requests for optimization to matter",
    ],
    questions: [
      { q: "Head at 40. Queue: 10, 50, 30, 80. SSTF order?", a: "From 40: closest=50(dist 10) → then 30(dist 20) → then 10(dist 20) → then 80(dist 70). Order: 40→50→30→10→80. Total = 10+20+20+70 = 120." },
    ],
  },
  "sched-scan-cscan": {
    title: "SCAN & C-SCAN", emoji: "🔄",
    tldr: "SCAN: elevator algorithm, go to end then reverse. C-SCAN: one direction only, return to start without serving.",
    explanation: `SCAN (Elevator Algorithm): arm moves from one end to the other, servicing all requests in its path. At the end, it reverses direction. Like an elevator. Total movement for example: 236 cylinders (going toward 183, then reversing to 14).

Problem with SCAN: cylinders just past the head in the reverse direction (at the far end) wait the longest — the arm just came from there and won't return for a long time.

C-SCAN (Circular SCAN): arm moves in ONE direction only, servicing requests. When it reaches the end, it immediately jumps back to the beginning WITHOUT servicing requests on the return trip. Treats the disk as circular. Provides more uniform wait time. Total movement for example: 382 cylinders (includes the return trip across the disk).`,
    keyPoints: [
      "SCAN: elevator algorithm — go end to end, service in both directions",
      "SCAN: 236 cylinders in standard example (same as SSTF by coincidence)",
      "SCAN problem: far-end cylinders wait longest (just missed, won't return soon)",
      "C-SCAN: one direction only → jump back to start without servicing",
      "C-SCAN: more uniform wait time for all cylinders",
      "C-SCAN: 382 cylinders (includes the return sweep across disk)",
      "C-SCAN treats disk as circular list (wraps around)",
    ],
    formula: {
      code: `SCAN: Head=53, going toward 183. Queue: 98,183,37,122,14,124,65,67
  53→65→67→98→122→124→183→[REVERSE]→37→14
  Movement = 236 cylinders

C-SCAN: Head=53, queue=98,183,37,122,14,124,65,67
  53→65→67→98→122→124→183→199[end]→0[jump]→14→37
  Movement:
  (65-53)=12 + (67-65)=2 + (98-67)=31 + (122-98)=24
  + (124-122)=2 + (183-124)=59 + (199-183)=16
  + (199-0)=199 [jump across] + (14-0)=14 + (37-14)=23
  = 382 cylinders`,
      explanation: "C-SCAN's return journey counts toward total but gives fairer wait times.",
    },
    examTips: [
      "SCAN = elevator algorithm (goes both directions)",
      "C-SCAN: ONE direction, jump back without serving = more UNIFORM wait times",
      "C-SCAN: 382 cylinders includes the full return journey across disk",
      "SCAN doesn't go to actual end — just past the last request (that's LOOK)",
    ],
    questions: [
      { q: "What advantage does C-SCAN have over SCAN?", a: "C-SCAN provides more uniform wait times. In SCAN, cylinders just past the reversal point (at the far end) wait the longest. C-SCAN's one-direction approach ensures no cylinder waits more than one full sweep." },
    ],
  },
  "sched-look": {
    title: "LOOK & C-LOOK", emoji: "👁️",
    tldr: "LOOK = SCAN but reverses at LAST request (not disk end). C-LOOK = C-SCAN version. 322 cylinders.",
    explanation: `LOOK and C-LOOK are the practical improvements over SCAN and C-SCAN. The key difference: the arm doesn't go all the way to the physical end of the disk. It only goes as far as the LAST request in the current direction, then reverses (LOOK) or jumps back (C-LOOK).

This avoids wasting time traveling to the end of the disk if there are no requests there.

C-LOOK example total: 322 cylinders (vs C-SCAN's 382). The savings come from not traveling to cylinder 199 and from not returning all the way from 0 — only from 14 (the actual lowest request).

LOOK and C-LOOK are preferred over SCAN and C-SCAN in practice because they avoid unnecessary head travel.`,
    keyPoints: [
      "LOOK = SCAN but only goes to LAST REQUEST in each direction (not disk end)",
      "C-LOOK = C-SCAN variant — same optimization",
      "LOOK: reverses at last request, not at physical end of disk",
      "C-LOOK: jumps from highest request back to lowest (not from disk end to start)",
      "C-LOOK: 322 cylinders (vs C-SCAN's 382 — savings: no wasted travel to ends)",
      "LOOK/C-LOOK: preferred in practice over SCAN/C-SCAN",
    ],
    formula: {
      code: `C-LOOK: Head=53, queue: 98,183,37,122,14,124,65,67
  Go right to 183 (highest), then JUMP to 14 (lowest):
  53→65→67→98→122→124→183→[JUMP]→14→37
  
  Distances:
  12 + 2 + 31 + 24 + 2 + 59 + (183-14) + 23
  = 12+2+31+24+2+59+169+23 = 322 cylinders

Comparison summary:
  FCFS:   640 cylinders
  SSTF:   236 cylinders
  SCAN:   236 cylinders  
  C-SCAN: 382 cylinders
  C-LOOK: 322 cylinders`,
      explanation: "C-LOOK saves cylinders by not going to disk ends — only to actual request boundaries.",
    },
    examTips: [
      "LOOK = SCAN variant. C-LOOK = C-SCAN variant.",
      "Key difference: stop at LAST REQUEST, not at physical disk end",
      "C-LOOK: 322 cylinders (lower than C-SCAN's 382)",
      "Exam: know all 5 algorithms and their movement for the standard example",
    ],
    questions: [
      { q: "What is the difference between SCAN and LOOK?", a: "SCAN goes all the way to the physical end of the disk before reversing. LOOK goes only as far as the last queued request in the current direction, then reverses. LOOK is more efficient — no wasted travel past the last request." },
    ],
  },
  "raid-basics": {
    title: "RAID Basics: Striping & Mirroring", emoji: "🛡️",
    tldr: "RAID = Redundant Array of Independent Disks. Striping = speed. Mirroring = reliability. MTTF calculation.",
    explanation: `RAID (Redundant Array of Independent Disks) uses multiple disks for improved performance AND/OR reliability. Instead of one large expensive disk, use many smaller disks.

Striping: distributes data across multiple disks (block-level most common). Requests for different blocks can run in PARALLEL on different disks — improved throughput. Bit-level striping: one bit per disk. Block-level: one block per disk (more common).

Mirroring: maintain two copies of all data on separate disks. If one fails, use the other. Read performance improved (read from either copy in parallel). Write performance slightly worse (must write to both). Reliability dramatically improved. Cost: need 2× the disks.

MTTF: if one disk MTTF = 100,000 hours, an array of 100 disks has MTTF = 100,000/100 = 1000 hours for SOME disk to fail.`,
    keyPoints: [
      "RAID = many small disks instead of one large expensive disk",
      "Striping: spread data across disks → parallel access → better throughput",
      "Bit-level striping: 1 bit per disk. Block-level: 1 block per disk (common)",
      "Mirroring: duplicate data on 2 disks. 2× reliability, 2× cost.",
      "Mirror: read from either → faster reads. Writes go to both → slower writes.",
      "MTTF of array: MTTF_single / number_of_disks",
      "MTTF of mirrored pair: extremely high (both must fail before data lost)",
    ],
    formula: {
      code: `Block-level Striping (4 disks):
  File blocks: 0  1  2  3  4  5  6  7  8  ...
  Disk 0:      0        4        8  ...
  Disk 1:         1        5     9  ...
  Disk 2:            2        6  10 ...
  Disk 3:               3     7  11 ...
  
  Read blocks 0,1,2,3: ALL 4 disks work in PARALLEL → 4× speed!

Mirroring (RAID 1):
  Disk 0: A B C D    (primary)
  Disk 1: A B C D    (mirror — exact copy)
  If Disk 0 fails: use Disk 1. No data loss!

MTTF Calculation:
  Single disk MTTF = 100,000 hours
  Array of 100 disks → MTTF of FIRST failure:
    100,000 / 100 = 1,000 hours ≈ 41.6 days`,
      explanation: "MTTF of array = MTTF_single / N. Redundancy (mirroring/parity) protects against this.",
    },
    examTips: [
      "MTTF_array = MTTF_single / N — memorize this formula",
      "Striping → throughput. Mirroring → reliability. Parity → compromise.",
      "Block-level striping: parallel reads/writes to different disks",
      "Mirroring: reads from either disk (faster), writes to both (slightly slower)",
    ],
    questions: [
      { q: "100 disks, each with MTTF=200,000 hours. MTTF for first disk failure?", a: "MTTF_array = 200,000 / 100 = 2000 hours ≈ 83 days." },
    ],
  },
  "raid-levels": {
    title: "RAID Levels 0–6", emoji: "📊",
    tldr: "0=stripe only, 1=mirror, 4=parity disk, 5=distributed parity, 6=double parity. RAID 5 most popular.",
    explanation: `RAID 0: Block striping, NO redundancy. Best performance, zero fault tolerance. Any disk failure = total data loss.

RAID 1: Mirroring only. 2× cost but survives any single disk failure. Good read performance (read from either mirror).

RAID 4: Block striping + dedicated parity disk. Parity = XOR of corresponding blocks. Can recover from any single disk failure. Parity disk is a write bottleneck (every write updates parity disk).

RAID 5: Block striping + DISTRIBUTED parity (parity block rotates across all disks). Eliminates parity disk bottleneck. Most widely used RAID level. Survives any single disk failure.

RAID 6: Like RAID 5 but with TWO parity blocks (P+Q redundancy). Survives any TWO disk failures simultaneously.

RAID 1+0 (10): Mirrored stripes. RAID 0+1: Striped mirrors. Both combine performance + reliability.`,
    keyPoints: [
      "RAID 0: stripe only — best performance, NO fault tolerance",
      "RAID 1: mirror only — 2× cost, survives 1 disk failure",
      "RAID 4: striping + dedicated parity disk — parity disk = bottleneck",
      "RAID 5: striping + DISTRIBUTED parity — most popular, survives 1 failure",
      "RAID 6: two parity values (P+Q) — survives 2 simultaneous failures",
      "RAID 1+0: mirror stripes. RAID 0+1: stripe mirrors.",
      "Parity = XOR of data blocks on same stripe",
    ],
    formula: {
      code: `RAID Levels Summary:
  Level   Technique           Redundancy  Survives
  RAID 0  Stripe only         None        0 failures
  RAID 1  Mirror only         High        1 failure
  RAID 4  Stripe+parity disk  Medium      1 failure
  RAID 5  Stripe+dist parity  Medium      1 failure
  RAID 6  Stripe+2 parity     High        2 failures

Parity (XOR):
  Disk0=1010, Disk1=0110, Disk2=1100
  Parity = 1010 XOR 0110 XOR 1100 = 0000
  If Disk1 fails: recover = Disk0 XOR Disk2 XOR Parity
                           = 1010 XOR 1100 XOR 0000 = 0110 ✓

RAID 5 parity distribution:
  Stripe 1: [D0|D1|D2|P]  ← P on disk 3
  Stripe 2: [D0|D1|P|D2]  ← P on disk 2
  Stripe 3: [D0|P|D1|D2]  ← P on disk 1`,
      explanation: "RAID 5 most popular: good performance, tolerates 1 failure, no bottleneck disk.",
    },
    examTips: [
      "RAID 5 = most popular (distributed parity, survives 1 failure)",
      "RAID 6 = survives 2 simultaneous failures (2 parity blocks P+Q)",
      "RAID 4 problem: parity disk is always written → bottleneck",
      "Parity computed via XOR — recovery = XOR of all surviving disks with parity",
    ],
    questions: [
      { q: "Why is RAID 5 preferred over RAID 4?", a: "Both use striping with parity and survive one disk failure. But RAID 4 has a dedicated parity disk that becomes a write bottleneck (every write updates it). RAID 5 distributes parity across all disks, eliminating the bottleneck." },
    ],
  },
  "protection-domains": {
    title: "Protection Domains & setuid", emoji: "🏰",
    tldr: "Domain = set of (object, rights). Process runs in one domain. setuid = temporary domain switch in Unix.",
    explanation: `Protection: controlling WHO can do WHAT to WHICH resources. A domain defines a set of (object, access_right) pairs. A process executes in exactly one domain and can only perform operations allowed by that domain.

Domains can be static (fixed rights throughout execution) or dynamic (rights can change — supports least-privilege / need-to-know).

Domain implementations: User-as-domain (switch on login/logout), Process-as-domain (switch on IPC), Procedure-as-domain (switch on call).

Unix: domains are users. setuid (Set User ID) bit: when a file with setuid is executed, the process runs with the FILE OWNER's UID instead of the runner's UID. After execution, UID returns to original. Enables privileged operations (e.g., passwd command runs as root to edit /etc/shadow).`,
    keyPoints: [
      "Domain = {(object, access_right)} — set of allowed operations",
      "Process executes in ONE domain at a time",
      "Domain switching: process moves between domains",
      "Static domain: fixed rights. Dynamic: rights can change.",
      "User-as-domain (Unix): domain = user identity (UID)",
      "setuid bit: process temporarily runs with FILE OWNER's UID",
      "setuid OFF: runs as executor's UID. setuid ON: runs as file owner's UID",
      "After setuid execution: UID reverts to original user",
    ],
    formula: {
      code: `Domain = set of (object, right) pairs:
  D1 = {(file1, read), (file1, write), (printer, print)}
  D2 = {(file2, execute), (file3, read)}

Unix setuid Example:
  /usr/bin/passwd owned by root (UID=0), setuid=ON
  
  UserA runs passwd:
    setuid OFF: process runs as UserA → can't modify /etc/shadow!
    setuid ON:  process runs as root → can modify /etc/shadow ✓
    After exit: UID reverts to UserA

  Why needed: /etc/shadow only root-writable (permissions: 640)
  setuid lets ordinary user run a root-privilege program safely`,
      explanation: "setuid: temporary privilege escalation. File owner's rights for duration of execution.",
    },
    examTips: [
      "setuid ON → runs as FILE OWNER (not executor)",
      "setuid OFF → runs as EXECUTOR's UID (normal behavior)",
      "UID reverts after execution (temporary switch, not permanent)",
      "Classic setuid example: passwd command (must modify /etc/shadow as root)",
    ],
    questions: [
      { q: "User B runs a program owned by user A with setuid ON. Which UID runs?", a: "User A's UID. setuid makes the process run with the FILE OWNER's (A's) permissions, not the person who ran it (B)." },
    ],
  },
  "access-matrix": {
    title: "Access Matrix", emoji: "📊",
    tldr: "Rows=Domains, Columns=Objects, Cell=rights. access(i,j)=operations domain i can do on object j.",
    explanation: `The access matrix is a conceptual protection model. Rows represent protection domains (processes or users). Columns represent objects (files, devices, programs). Each cell access(i,j) contains the set of operations domain i is allowed to perform on object j.

Domain objects: domains themselves can be columns. A 'switch' right in access(Di, Dj) means domain Di can switch to domain Dj.

Additional rights: copy (duplicate a right to another domain), owner (full control of an object's column), control (modify rights in a domain's row).

The OS enforces: when process in Di tries to perform operation M on object Oj, OS checks if M ∈ access(Di, Oj). If yes: allow. If no: error.`,
    keyPoints: [
      "Rows = Domains (users/processes). Columns = Objects (files, devices, domains).",
      "Cell access(i,j) = set of allowed operations",
      "OS checks matrix on every access attempt",
      "Switch right: Di can switch to Dj",
      "Copy right: Di can give its rights on Oj to another domain",
      "Owner right: domain can change the column for that object",
      "Control right: domain can change another domain's row",
    ],
    formula: {
      code: `Example Access Matrix:
            F1     F2     F3   Printer  D2    D3
  D1:    [read] [    ] [read] [      ] [  ] [  ]
  D2:    [    ] [read] [    ] [print ] [  ] [sw]
  D3:    [rdwr] [rdwr] [    ] [      ] [sw] [  ]
  D4:    [read] [    ] [rdwr] [      ] [  ] [sw]

  D1 → can read F1, F3 only
  D2 → read F2, print, switch to D3
  D3 → read+write F1, F2; switch to D2

  Access check: D1 tries to write F1:
    access(D1, F1) = {read} → write NOT in set → DENIED`,
      explanation: "Rows=who, Columns=what object, Cell=what operations allowed.",
    },
    examTips: [
      "Rows=Domains. Columns=Objects. Cell=rights set.",
      "Switch right in cell (Di,Dj): Di can switch domain to Dj",
      "Owner right: domain controls its object's column in matrix",
      "Access matrix is the MODEL — actual implementation uses ACL or capabilities",
    ],
    questions: [
      { q: "In an access matrix, what does the 'switch' right in access(D2, D3) mean?", a: "A process running in domain D2 can switch its execution domain to D3, gaining D3's access rights." },
    ],
  },
  "acl-capability": {
    title: "ACL & Capability Lists", emoji: "🗝️",
    tldr: "ACL: per-object list of (domain, rights). Capability: per-domain list of (object, rights). Lock-key is compromise.",
    explanation: `The access matrix is too large and sparse to store directly. Two practical implementations:

ACL (Access Control List): for each object, store a list of (domain, rights) pairs. Easy to answer "who can access this file?" Easy to revoke (remove entry). Hard to find "what can this domain access?"

Capability List: for each domain, store a list of (object, rights). A capability is like a ticket — possessing it grants access. Easy to find "what can this domain access?" Hard to revoke (capabilities distributed across all domains).

Lock-Key Mechanism: compromise between ACL and capability. Each object has a list of LOCKS (bit patterns). Each domain has a list of KEYS. Access granted if domain has a key matching an object's lock.

Global Table: simplest — store all (domain, object, rights) triples in one big table. Simple but large and slow to search.`,
    keyPoints: [
      "ACL: per-object. Entry = (domain, rights). Easy to revoke (delete entry).",
      "Capability: per-domain. Entry = (object, rights). Hard to revoke.",
      "Capability = ticket — possessing it = having access",
      "ACL: easy to answer 'who can access this object?'",
      "Capability: easy to answer 'what can this domain access?'",
      "Lock-Key: each object has locks, each domain has keys; match = access",
      "Global table: (domain, object, rights) triples; simple but slow",
    ],
    formula: {
      code: `ACL for file F1:
  F1's ACL: [(D1, read), (D3, read+write), (D4, read)]
  → Easy to see who can access F1
  → Revoke D3's access: just remove (D3, read+write) entry

Capability list for Domain D3:
  D3's caps: [(F1, read+write), (F2, read+write), (D2, switch)]
  → Easy to see what D3 can do
  → Revoke D3's access to F1: HARD (must find D3's capability)

Lock-Key:
  F1 locks = [10110011, 01001100]
  D1 keys   = [10110011, 11000000]
  D1 has key matching F1's lock → ACCESS GRANTED`,
      explanation: "ACL: easy revocation. Capability: easy per-domain audit. Lock-key: compromise.",
    },
    examTips: [
      "ACL: per-OBJECT list. Capability: per-DOMAIN list.",
      "ACL: easy to revoke. Capability: hard to revoke (distributed).",
      "Unix uses ACL (rwxr-xr-- = simplified ACL per file)",
      "Capability = unforgeable ticket. OS protects against forgery.",
    ],
    questions: [
      { q: "Why is revoking access harder with capability lists than with ACLs?", a: "With ACL: just delete the entry from the object's list — one operation. With capabilities: the capability is distributed (domain D holds it). OS must find every domain holding a capability for that object and invalidate them — much harder." },
    ],
  },
  "rbac-revocation": {
    title: "RBAC & Revocation", emoji: "👥",
    tldr: "RBAC: permissions → roles → users. Revocation types: immediate/delayed, selective/general, partial/total, temp/permanent.",
    explanation: `Role-Based Access Control (RBAC): permissions are assigned to ROLES (Admin, Faculty, Student), not directly to individual users. Users are assigned to roles and inherit role permissions. Changing permissions for a role automatically affects all users with that role.

Advantages: easier to manage large systems, reduced complexity, better security (no direct permission assignment), audit-friendly.

Revocation: removing access rights. Types:
Immediate vs Delayed: instant removal vs later.
Selective vs General: specific users vs all users.
Partial vs Total: some rights vs all rights.
Temporary vs Permanent: can regain vs never again.

ACL revocation: easy (delete entry). Capability revocation: harder — techniques: reacquisition (capabilities expire), back-pointers (track all), indirection (global table lookup), keys (change master key → all old capabilities invalid).`,
    keyPoints: [
      "RBAC: users→roles→permissions (not users→permissions directly)",
      "Role change updates ALL users with that role instantly",
      "Revocation types: immediate/delayed, selective/general, partial/total, temporary/permanent",
      "ACL: easy revocation (delete entry from list)",
      "Capability: hard revocation (distributed)",
      "Key revocation: change master key → all old capabilities for that object invalid",
      "Indirection: capability uses pointer to global table entry → delete entry = revoke",
      "Back-pointers: track every capability issued → modify all on revocation",
    ],
    formula: {
      code: `RBAC Example:
  Roles: Admin, Faculty, Student
  
  Admin  → {read, write, delete, execute}
  Faculty→ {read, write, execute}
  Student→ {read}
  
  User assignments:
  Alice → Admin role   → gets all 4 permissions
  Bob   → Faculty role → gets 3 permissions
  Carol → Student role → read only
  
  Change Faculty permissions → Bob's access changes instantly!

Capability Revocation Techniques:
  Reacquisition:  capabilities have expiry → must re-request
  Back-pointers:  OS tracks all issued caps → invalidate all
  Indirection:    cap points to global table → delete table entry
  Keys:           cap has key value; change master key → old keys invalid`,
      explanation: "RBAC: manage by role, not individual. Changing role = changing all members' access.",
    },
    examTips: [
      "RBAC: permissions assigned to ROLES, not users directly",
      "4 types of revocation: immediate/delayed, selective/general, partial/total, temp/permanent",
      "ACL revocation = easy (delete entry). Capability revocation = hard.",
      "Key revocation: change master key → all previous capabilities instantly invalid",
    ],
    questions: [
      { q: "What are the four dimensions of access revocation?", a: "1. Immediate vs Delayed. 2. Selective (specific user) vs General (all users). 3. Partial (some rights) vs Total (all rights). 4. Temporary (can be regained) vs Permanent (never again)." },
    ],
  },
  "security-threats": {
    title: "Security Threats & Attacks", emoji: "⚠️",
    tldr: "5 breach types + masquerade/replay/MitM. 4 levels: physical/human/OS/network.",
    explanation: `Security ensures protection from unauthorized access and malicious/accidental damage. Covers data, programs, CPU, memory, and network.

Threat vs Attack: Threat = potential danger (could happen). Attack = actual attempt to break security.

Five types of security breaches:
1. Confidentiality: unauthorized READING of data (theft of information)
2. Integrity: unauthorized MODIFICATION of data
3. Availability: unauthorized DESTRUCTION of data
4. Theft of service: unauthorized USE of resources
5. Denial of Service (DoS): preventing LEGITIMATE use of system

Three attack types: Masquerading (pretending to be someone else), Replay attack (resending valid data to trick system), Man-in-the-Middle (intercepting communication between parties).

Four security levels: Physical → Human → OS → Network.`,
    keyPoints: [
      "Threat = potential danger. Attack = actual attempt.",
      "Breach of Confidentiality: unauthorized READ (data theft)",
      "Breach of Integrity: unauthorized MODIFICATION",
      "Breach of Availability: unauthorized DESTRUCTION",
      "Theft of Service: unauthorized USE of resources",
      "Denial of Service: prevent LEGITIMATE use",
      "Masquerading: pretend to be someone else",
      "Replay attack: resend valid captured data",
      "Man-in-the-Middle: intercept and potentially modify communication",
      "Security levels: Physical, Human, OS, Network",
    ],
    formula: null,
    examTips: [
      "Confidentiality=read, Integrity=modify, Availability=destroy — MEMORIZE",
      "DoS = Denial of Service (prevent legitimate use, not just damage)",
      "4 security levels: Physical → Human → OS → Network (all four must be secured)",
      "Masquerade ≠ MitM: masquerade = pretend to be someone; MitM = intercept live",
    ],
    questions: [
      { q: "What is the difference between a Breach of Confidentiality and a Breach of Integrity?", a: "Confidentiality = unauthorized READING of data (information theft). Integrity = unauthorized MODIFICATION of data (changing data without permission)." },
    ],
  },
  "security-defenses": {
    title: "Program & System Threats", emoji: "🦠",
    tldr: "Trojan Horse, Trap Door, Buffer Overflow, Virus, Worm. Defenses: crypto, authentication, protocols.",
    explanation: `Program Threats: 
Trojan Horse: malicious code hidden inside a legitimate program. When you run the program, the malicious code executes secretly.
Trap Door (Backdoor): a hidden access point in software left by the developer, bypassing normal authentication.
Buffer Overflow: exploit a programming bug where input data overflows a buffer, allowing attacker to overwrite return addresses and execute arbitrary code.
Virus: self-replicating malicious code that attaches to other programs.

System Threats:
Worm: self-replicating process that spreads across networks, consuming resources. Causes system slowdown/crash.

Defenses:
Cryptography: uses keys to encrypt/decrypt data. Provides confidentiality + integrity.
Authentication: verifies identity (passwords, OTP, multi-factor).
Protocols: SSL/TLS for web (HTTPS), SSH for remote login (port 22).`,
    keyPoints: [
      "Trojan Horse: malicious hidden code inside legitimate program",
      "Trap Door / Backdoor: hidden access point bypassing authentication",
      "Buffer Overflow: overflow buffer → overwrite return address → exploit",
      "Virus: self-replicating code, attaches to other programs",
      "Worm: self-replicating PROCESS, spreads via network, consumes resources",
      "Cryptography: encryption/decryption with keys → confidentiality + integrity",
      "Authentication: verifies identity (passwords, OTP, MFA)",
      "SSL/TLS: secure web communication (HTTPS). SSH: port 22, remote login.",
    ],
    formula: null,
    examTips: [
      "Virus attaches to PROGRAMS. Worm is standalone, spreads via NETWORK.",
      "Buffer overflow: most common exploitable bug in C programs",
      "Trap door = backdoor (different names, same thing in exams)",
      "SSH runs on port 22 — know this!",
    ],
    questions: [
      { q: "What is the difference between a virus and a worm?", a: "Virus: attaches to existing programs and replicates when those programs run. It needs a host program. Worm: a standalone self-replicating process that spreads independently across a network, consuming resources without needing a host program." },
    ],
  },
  "security-impl": {
    title: "Security Implementation", emoji: "🔒",
    tldr: "IDS/IPS, antivirus, firewall, logging/auditing. Security policy + vulnerability assessment + prevention.",
    explanation: `Three layers of security defense: define rules + detect attacks + prevent damage.

Security Policy: defines what is and isn't allowed — guides all security decisions.
Vulnerability Assessment: identifies system weaknesses (weak passwords, unauthorized programs, incorrect permissions, modified system files).
Intrusion Detection: IDS (Intrusion Detection System) detects attacks and raises alerts. IPS (Intrusion Prevention System) detects AND blocks attacks.
Virus Protection: antivirus software detects known viruses and removes malicious code. Best method: prevention (safe usage).
Logging & Auditing: records system activities to detect unauthorized access and abnormal behavior.
Firewall: controls incoming/outgoing network traffic based on rules. Acts as gateway between trusted internal network and untrusted external network.`,
    keyPoints: [
      "Security policy: defines what's allowed/not allowed",
      "Vulnerability assessment: find weaknesses before attackers do",
      "IDS: detect attacks + alert. IPS: detect + BLOCK attacks",
      "Antivirus: detects + removes known malware",
      "Best defense: PREVENTION (don't let threats in)",
      "Logging/Auditing: record activities for forensics and detection",
      "Firewall: filter network traffic based on rules",
      "Overall: Cryptography→protect data, Auth→verify identity, Protocols→secure channel",
    ],
    formula: null,
    examTips: [
      "IDS = detect + alert. IPS = detect + BLOCK (IPS is active, IDS is passive)",
      "Firewall controls NETWORK traffic (not application behavior)",
      "Best defense = prevention (don't click suspicious links, etc.)",
      "Logging = record events. Auditing = analyze records to find issues.",
    ],
    questions: [
      { q: "What is the difference between IDS and IPS?", a: "IDS (Intrusion Detection System): detects attacks and raises alerts — passive (notifies humans). IPS (Intrusion Prevention System): detects AND automatically blocks attacks — active (takes action without human intervention)." },
    ],
  },
  "awk": {
    title: "AWK", emoji: "🔧",
    tldr: "Pattern scanning language. Works line-by-line. awk 'pattern{action}' file. $1,$2=fields. NR=lines, NF=fields.",
    explanation: `AWK is a scripting language for pattern scanning and text processing. It reads an input file line by line, splits each line into fields ($1, $2, ...), and applies pattern→action rules.

If pattern matches (or no pattern specified) → execute action. If no action → print the line.

Key built-in variables: NR = Number of Records (total lines processed so far). NF = Number of Fields (on current line). $0 = entire current line. $1, $2, ... = individual fields.

AWK is powerful for: data filtering, column extraction, counting, report generation, and performing arithmetic on data.`,
    keyPoints: [
      "Reads file line by line, splits into fields",
      "Syntax: awk 'pattern {action}' file",
      "$1, $2, ... = field 1, field 2 (space-delimited by default)",
      "$0 = entire current line",
      "NR = total lines read so far (Number of Records)",
      "NF = number of fields on current line (Number of Fields)",
      "BEGIN{}: runs before first line. END{}: runs after last line.",
      "No pattern = action applies to EVERY line",
    ],
    formula: {
      code: `AWK Syntax: awk 'pattern {action}' file

Common Examples:
  # Print columns 1 and 4:
  awk '{print $1,$4}' employee.txt
  
  # Pattern matching (lines containing "manager"):
  awk '/manager/ {print}' file.txt
  
  # Count total lines:
  awk 'END {print NR}' file.txt
  
  # Print lines where field 2 > 50:
  awk '$2 > 50 {print $0}' data.txt
  
  # Sum column 3:
  awk '{sum += $3} END {print "Total:", sum}' data.txt
  
  # Print line number + first field:
  awk '{print NR, $1}' file.txt
  
  # Print last field of each line:
  awk '{print $NF}' file.txt`,
      explanation: "$NF = last field (NF = number of fields on current line, $NF = that field's value).",
    },
    examTips: [
      "NR = line counter (total lines read). NF = field counter per line.",
      "$1 = first field, $NF = last field, $0 = entire line",
      "END block runs AFTER last line (use for totals/summaries)",
      "BEGIN block runs BEFORE first line (use for initialization)",
    ],
    questions: [
      { q: "What does awk 'END {print NR}' file.txt do?", a: "Counts and prints the total number of lines in file.txt. NR accumulates the line count as AWK reads, and the END block executes after the last line." },
    ],
  },
  "sed": {
    title: "SED", emoji: "✂️",
    tldr: "Stream editor. Text transformation. Single pass. sed 's/old/new/' file. Used in pipelines.",
    explanation: `SED (Stream Editor) is a command-line text editor that processes text in a single pass, making it ideal for pipelines. It reads one line at a time, applies transformations, and outputs the result.

Unlike AWK (which focuses on fields and data processing), SED focuses on line-level text editing — substitution, deletion, printing, insertion, appending.

The 's' (substitute) command is the most commonly used: s/pattern/replacement/ replaces first occurrence on each line. Add 'g' flag (s/pattern/replacement/g) to replace ALL occurrences.`,
    keyPoints: [
      "Stream editor: reads line by line, single pass",
      "Used in pipelines: cat file | sed 's/old/new/'",
      "Syntax: sed 'command' file",
      "Substitute: s/old/new/ (first) or s/old/new/g (all occurrences)",
      "Delete: d (delete matching/specified lines)",
      "Print: p (print specific lines; use -n to suppress default output)",
      "Insert (i) and Append (a): add text before/after line",
      "Range: 4,6d = delete lines 4 through 6",
    ],
    formula: {
      code: `SED Syntax: sed 'command' file

Common Examples:
  # Replace first "hello" on each line:
  sed 's/hello/world/' file.txt
  
  # Replace ALL occurrences (global flag g):
  sed 's/hello/world/g' file.txt
  
  # Delete line 2:
  sed '2d' file.txt
  
  # Print specific line 2 (-n suppresses auto-print):
  sed -n '2p' file.txt
  
  # Delete lines 4 through 6:
  sed '4,6d' file.txt
  
  # Delete lines matching pattern:
  sed '/pattern/d' file.txt
  
  # Insert text before line 3:
  sed '3i\\New line here' file.txt
  
  # Append text after line 5:
  sed '5a\\Appended line' file.txt`,
      explanation: "-n suppresses default output. Add p to print only matching lines. g flag replaces all matches.",
    },
    examTips: [
      "s/old/new/ replaces FIRST match. s/old/new/g replaces ALL.",
      "-n flag: suppress default output (use with p to print specific lines)",
      "sed '2d': delete line 2. sed '4,6d': delete range 4-6.",
      "SED is a STREAM editor — processes line by line, single pass",
    ],
    questions: [
      { q: "What does sed -n '5p' file.txt do?", a: "Prints only line 5 of file.txt. The -n flag suppresses the default behavior of printing every line, and 'p' explicitly prints line 5." },
    ],
  },
  "awk-vs-sed": {
    title: "AWK vs SED Comparison", emoji: "⚖️",
    tldr: "AWK = programming language for data processing (fields). SED = stream editor for text editing (lines).",
    explanation: `AWK and SED are both command-line text processing tools but with different strengths.

SED: simpler, stream editor, works at the LINE level. Best for: substitution, deletion, line-level transformations. Single pass through file.

AWK: more powerful, a full scripting language, works at the FIELD level. Best for: column extraction, data filtering, arithmetic, report generation, complex logic.

When to use which: if you need to substitute/delete text patterns → SED. If you need to work with structured data (CSV-like), do arithmetic, count, or generate reports → AWK.

Real-world: they're often combined in pipelines (sed for cleanup → awk for processing).`,
    keyPoints: [
      "SED: stream editor, simpler, works on LINES",
      "AWK: programming language, more complex, works on FIELDS",
      "SED best for: text substitution, deletion, line manipulation",
      "AWK best for: data extraction, arithmetic, reporting, filtering",
      "Both: read line by line, single pass (SED explicitly; AWK by nature)",
      "Pipeline: cat file | sed 's/fix/this/' | awk '{print $1, $3}'",
    ],
    formula: {
      code: `Comparison Table:
  Feature      │ AWK              │ SED
  ─────────────┼──────────────────┼──────────────
  Type         │ Programming lang │ Stream editor
  Focus        │ Data processing  │ Text editing
  Works on     │ Fields ($1, $2)  │ Lines
  Complexity   │ Higher           │ Simpler
  Best for     │ Filtering/math   │ Substitution

Use AWK when:                Use SED when:
  - Need $1, $2, NR, NF      - Simple s/old/new/
  - Arithmetic calculations  - Delete specific lines
  - Conditional logic        - Quick substitutions
  - Generating reports       - In long pipelines

Combined pipeline:
  cat data.csv | sed 's/,/\\t/g' | awk '{sum+=$3} END{print sum}'
  (SED converts commas to tabs, AWK sums column 3)`,
      explanation: "SED = edit text. AWK = process/analyze data. They complement each other.",
    },
    examTips: [
      "AWK = higher complexity, field-level. SED = simpler, line-level.",
      "Both work line by line in a single pass",
      "AWK can do everything SED can + more (but SED is faster for simple tasks)",
      "Know the key commands for each: awk '{print $1}' vs sed 's/a/b/'",
    ],
    questions: [
      { q: "You need to count the number of lines containing the word 'error'. Use AWK or SED?", a: "AWK. Use: awk '/error/ {count++} END {print count}' file.txt. SED doesn't have a built-in counter mechanism — you'd need a separate command like wc. AWK handles counting natively." },
    ],
  },
};
