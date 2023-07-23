import{_ as i,o as l,c as a,a as e}from"./app-5a5db9de.js";const r="/home/assets/image-20220228162548899-0faf9641.png",h="/home/assets/image-20220228162622797-038756bf.png",d="/home/assets/image-20220228162642100-22854cf1.png",n="/home/assets/image-20220228162746025-522efbcd.png",t="/home/assets/image-20220228162817747-5a0b0786.png",o={},s=e('<h1 id="文件系统实现" tabindex="-1"><a class="header-anchor" href="#文件系统实现" aria-hidden="true">#</a> 文件系统实现</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><ul><li>文件系统提供了在线存储和访问包括数据和程序在内的文件内容的机制。文件系统永久地驻留在外存上，外存可以永久存储大量数据。</li></ul><h2 id="文件系统结构" tabindex="-1"><a class="header-anchor" href="#文件系统结构" aria-hidden="true">#</a> 文件系统结构</h2><ul><li><p>磁盘的下述两个特点，使其成为存储多个文件的方便介质:</p></li><li><ul><li>可以原地重写，可以从磁盘上读一块，修改该块，并将它写回到原来的位置。</li><li>可以直接访问磁盘上的任意一块信息。因此，可以方便地按顺序或随机地访问文件，从一个文件切换到另一个文件只需要简单地移动读写磁头并等待磁盘转动即可以完成。</li></ul></li><li><p>为了改善IO效率，内存与磁盘之间的IO转移是以块为单位而不是以字节为单位来进行的。</p></li><li><p>为了提供对磁盘的高效且便捷的访问，操作系统通过文件系统来轻松地存储、定位、提取数据。文件系统有两个不同的设计问题。第一个对内问题是如何定义文件系统对用户的接口。这个任务涉及定义文件及其属性、文件所允许的操作、组织文件的目录结构。第二个对外问题是创建数据结构和算法来将逻辑文件系统映射到物理外存设备上。</p></li><li><p>文件系统本身通常由许多不同的层组成。分层设计如下</p></li></ul><img src="'+r+'" alt="image-20220228162548899" style="zoom:50%;"><ul><li>I/O控制为最底层，由设备驱动程序和中断处理程序组成，实现内存与磁盘之间的信息传输。</li><li>基本文件系统只需要向合适的设备驱动程序发送一般命令就可对磁盘上的物理块进行读写</li><li>文件组织模块（file-organization module）知道文件及其逻辑块和物理块。由于知道所使用的文件分配类型和文件的位置，文件组织模块可以将逻辑块地址转换成基本文件系统所用的物理块地址。</li><li>最后，逻辑文件系统管理元数据。元数据包括文件系统的所有结构数据，而不包括实际数据（或文件内容)。逻辑文件系统根据给定符号文件名来管理目录结构，并提供给文件组织模块所需要的信息。逻辑文件系统通过文件控制块来维护文件结构。文件控制块(filecontrol block,FCB）包含文件的信息，如拥有者、权限、文件内容的位置。逻辑文件系统也负责保护和安全</li><li>采用分层的结构实现文件系统，能够最大限度地少重复的代码。</li></ul><h2 id="文件系统实现-1" tabindex="-1"><a class="header-anchor" href="#文件系统实现-1" aria-hidden="true">#</a> 文件系统实现</h2><h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3><ul><li><p>在磁盘上，文件系统可能包括如下信息</p></li><li><ul><li>(每个卷的〉引导控制块(boot control block)包括系统从该卷引导操作系统所需要的信息。它通常为卷的第一块。UFS称之为引导块( boot block)，NTFS称之为分区引导扇区( partition boot sector)。</li><li>(每个卷的）卷控制块(volume control block）包括卷（或分区）的详细信息，UFS称之为超级块(superblock)，而在NTFS中它存储在主控文件表(Master File Table）中。</li><li>每个文件系统的目录结构用来组织文件。</li><li>每个文件的FCB包括很多该文件的详细信息</li></ul></li><li><p>内存内信息结构可能包括:</p></li><li><ul><li>一个内存中的安装表，包括所有安装卷的信息。</li><li>系统范围内的打开文件表包括每个打开文件的FCB副本和其他信息。</li><li>单个进程的打开文件表包括一个指向系统范围内已打开文件表中合适条目的指针和其他信息。</li></ul></li></ul><img src="'+h+'" alt="image-20220228162622797" style="zoom:67%;"><h3 id="分区和安装" tabindex="-1"><a class="header-anchor" href="#分区和安装" aria-hidden="true">#</a> 分区和安装</h3><ul><li>分区可以是“生的”(或原始的，raw)，即没有文件系统，或者“熟的”( cooked）即含有文件系统。“生”磁盘（raw disk〉用于没有合适文件系统的地方。</li><li>根分区(root partition)包括操作系统内核或其他系统文件，在引导时装入内存。其他卷根据不同操作系统可以在引导时自动装入或在此之后手动装入。</li></ul><h3 id="虚拟文件系统" tabindex="-1"><a class="header-anchor" href="#虚拟文件系统" aria-hidden="true">#</a> 虚拟文件系统</h3><img src="'+d+'" alt="image-20220228162642100" style="zoom:67%;"><ul><li><p>第二层称为虚拟文件系统( VFS)层，它有两个目的:</p></li><li><ul><li>VFS层通过定义一个清晰的VFS接口,以将文件系统的通用操作和具体实现分开。多个VFS接口的实现可以共存在同一台机器上，它允许访问已装在本地的多个类型的文件系统。</li><li>VFS提供了在网络上唯一标识一个文件的机制。VFS 基于称为 vnode的文件表示结构，该结构包括一个数值标识符以表示位于整个网络范围内的唯一文件。该网络范围的唯一性用来支持网络文件系统。内核中为每个活动节点（文件或目录）保存一个vnode结构。</li></ul></li></ul><h2 id="目录实现" tabindex="-1"><a class="header-anchor" href="#目录实现" aria-hidden="true">#</a> 目录实现</h2><h3 id="线性列表" tabindex="-1"><a class="header-anchor" href="#线性列表" aria-hidden="true">#</a> 线性列表</h3><ul><li>最为简单的目录实现方法是使用存储文件名和数据块指针的线性列表。这种方法编程简单但运行时较为费时。目录条目的线性列表的真正缺点是查找文件需要线性搜索。</li></ul><h3 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表" aria-hidden="true">#</a> 哈希表</h3><ul><li>用于文件目录的另一个数据结构是哈希表。采用这种方法时，除了使用线性列表存储目录条目外，还使用了哈希数据结构。哈希表根据文件名得到一个值，并返回一个指向线性列表中元素的指针。因此，它大大地减少目录搜索时间。插入和删除也较简单，不过需要一些预备措施来避免冲突(collision)（两个文件名哈希到相同的位置)。</li><li>哈希表的最大困难是其通常固定的大小和哈希函数对大小的依赖性。</li></ul><h2 id="分配方法" tabindex="-1"><a class="header-anchor" href="#分配方法" aria-hidden="true">#</a> 分配方法</h2><ul><li>主要问题是如何为这些文件分配空间，以便有效地使用磁盘空间和快速地访问文件。常用的主要磁盘空间分配方法有三个:连续、链接和索引。</li></ul><h3 id="连续分配" tabindex="-1"><a class="header-anchor" href="#连续分配" aria-hidden="true">#</a> 连续分配</h3><ul><li>连续分配（contiguous allocation）方法要求每个文件在磁盘上占有一组连续的块。磁盘地址为磁盘定义了一个线性序列。因此，用于访问连续分配文件所需要的寻道数最小，在确实需要寻道时所需要的寻道时间也最小。</li><li>文件的连续分配可以用第一块的磁盘地址和连续块的数量来定义。如果文件有n块长并从位置b开始，那么该文件将占有块b, b＋1,b十2,…, b＋n-1。一个文件的目录条目包括开始块的地址和该文件所分配区域的长度。</li><li>对一个连续分配文件的访问很容易。要顺序访问，文件系统会记住上次访问过块的磁盘地址，如需要可读入下一块。要直接访问一个从块b开始的文件的块 i，可以直接访问块b+i。因此连续分配支持顺序访问和直接访问。</li><li>不过，连续分配也有一些问题。一个困难是为新文件找到空间。</li><li>连续磁盘空间分配问题可以作为通用动态存储分配（ dynamicstorage-allocation)问题的一个具体应用，即如何从一个空闲孔列表中寻找一个满足大小为n 的空间。从一组空闲孔中寻找一个空闲孔的最为常用的策略是首次适合和最优适合。首次适合和最优适合在空间使用方面不相上下，但是首次适合运行速度更快。</li><li>这些算法都有外部碎片（ external fragmentation）问题。随着文件的分配和删除，磁盘空闲空间被分成许多小片。只要空闲空间分成小片，就会存在外部碎片。当最大连续片不能满足需求时就有问题;存储空间分成了许多小孔，但没有一个足够大以存储数据。</li><li>为了防止外部碎片导致的大量磁盘空间的浪费，用户必须运行一个重新打包程序，以将整个文件系统复制到另一个软盘或磁带上。原来的软盘变成了一个大的连续空闲空间。接着，该重新打包程序又对这一大的连续空闲空间采用连续分配方法，以将文件复制回来。这种方案有效地将所有小的空闲空间合并(compact)起来，因而解决了碎片问题。这种合并的代价是时间。</li><li>连续分配的另一个问题是确定一个文件需要多少空间。当创建文件时，需要找到和分配文件所需要的总的空间。如果为一个文件分配太小的空间，那么可能会发现文件不能扩展。</li><li>为了减少这些缺点，有的操作系统使用修正的连续分配方案。该方案开始分配一块连续空间，当空间不够时，另一块被称为扩展( extent）的连续空间会添加到原来的分配中。这样，文件块的位置就成为开始地址、块数、加上一个指向下一扩展的指针。</li></ul><h3 id="链接分配" tabindex="-1"><a class="header-anchor" href="#链接分配" aria-hidden="true">#</a> 链接分配</h3><ul><li>链接分配(linked allocation）解决了连续分配的所有问题。采用链接分配，每个文件是磁盘块的链表;磁盘块分布在磁盘的任何地方。目录包括文件第一块的指针和最后一块的指针。每一块都有一个指向下一块的指针。</li><li>采用链接分配没有外部碎片，空闲空间列表上的任何块可以用来满足请求。当创建文件时，并不需要说明文件大小。只要有空闲块，文件就可以增大。因此，无需合并磁盘空间。</li><li>不过，链接分配确实也有缺点。主要问题是它只能有效地用于文件的顺序访问。要找到文件的第i块，必须从文件的开始起，跟着指针，找到第i块。对指针的每次访问都需要读磁盘，有时需要进行磁盘寻道。因此，链接分配不能有效地支持文件的直接访问。</li><li>链接分配的另一缺点是指针需要空间。</li><li>对这个问题的常用解决方法是将多个块组成簇（cluster)，并按簇而不是按块来分配。文件系统可能定义一个簇为4块，并以簇为单位来操作。这样，指针所使用的磁盘空间的百分比就更少。这种方法允许逻辑块到物理块的映射仍然简单，而且提高了磁盘输出(更少磁头移动)，并降低了块分配和空闲列表管理所需要的空间。这种方法的代价是增加了内部碎片，如果一个簇而不是块没有充分使用，那么就会浪费更多空间。</li><li>链接分配的另一个问题是可靠性。由于文件是通过指针链接的，而指针分布在整个磁盘上，试想一下如果指针丢失或损坏会产生什么结果。</li><li>一个采用链接分配方法的变种是文件分配表（FAT)的使用。每个卷的开始部分用于存储该FAT。每块都在该表中有一项，该表可以通过块号码来索引。FAT的使用与链表相似。目录条目含有文件首块的块号码。根据块号码索引的FAT条目包含文件下一块的块号码。这条链会一直继续到最后一块，该块对应FAT条目的值为文件结束值。未使用的块用О值来表示。为文件分配一个新的块只要简单地找到第一个值为0的FAT条目，用新块的地址替换前面的文件结束值，用文件结束值替代0。</li><li>如果不对FAT采用缓存，FAT 分配方案可能导致大量的磁头寻道时间。其优点是改善了随机访问时间，因为通过读入FAT信息，磁头能找到任何块的位置。</li></ul><img src="'+n+'" alt="image-20220228162746025" style="zoom:67%;"><h3 id="索引分配" tabindex="-1"><a class="header-anchor" href="#索引分配" aria-hidden="true">#</a> 索引分配</h3><ul><li><p>链接分配解决了连续分配的外部碎片和大小声明问题。但是，如果不用FAT，那么链接分配就不能有效支持直接访问。索引分配（ indexed allocation〉通过把所有指针放在一起，即通过索引块解决了这个问题。</p></li><li><p>每个文件都有其索引块，这是一个磁盘块地址的数组。索引块的第i个条目指向文件的第i个块。目录条目包括索引块的地址。要读第i块，通过索引块的第i个条目的指针来查找和读入所需的块。</p></li><li><p>当创建文件时，索引块的所有指针都设为nil。当首次写入第 i块时，先从空闲空间管理器中得到一块，再将其地址写到索引块的第i个条目。</p></li><li><p>索引分配支持直接访问，且没有外部碎片问题，这是因为磁盘上的任一块都可满足更多空间的要求。索引分配会浪费空间。索引块指针的开销通常要比链接分配指针的开销大。一个问题:索引块究竟应为多大?每个文件必须有一个索引块，因此需要索引块尽可能地小。不过，如果索引块太小，那么它不能为大文件存储足够多的指针。因此，必须采取一定机制来处理这个问题。针对这一目的的机制包括如下:</p></li><li><ul><li>链接方案:一个索引块通常为一个磁盘块。因此，它本身能直接读写。为了处理大文件，可以将多个索引块链接起来。下一个地址（索引块的最后一个词）为nil（对于小文件)或指向另一个索引块(大文件)。</li><li>多层索引:链接表示的一种变种是用第一层索引块指向一组第二层的索引块，第二层索引块再指向文件块。这种方法根据最大文件大小的要求，可以继续到第三或第四层。对于有4 096 B的块，可以在索引块中存入1 024个4 B的指针。两层索引允许1 048576个数据块，这允许最大文件为4 GB。</li><li>组合方案:在 UFS中使用的另一方案是将索引块的头15个指针存在文件的inode中。这其中的头12个指针指向直接块;即它们包括了能存储文件数据的块的地址。因此，(不超过12块的）小文件不需要其他的索引块。如果块大小为4 KB，那么不超过48 KB的数据可以直接访问。其他3个指针指向间接块。第一个间接块指针为一级间接块的地址。一级间接块为索引块，它包含的不是数据，而是那些包含数据的块的地址。接着是一个二级间接块指针，它包含了一个块的地址，而这个块中的地址指向了一些块，这些块中又包含了指向真实数据块的指针。最后一个指针为三级间接块指针。</li></ul></li></ul><img src="'+t+'" alt="image-20220228162817747" style="zoom:67%;"><h2 id="空闲空间管理" tabindex="-1"><a class="header-anchor" href="#空闲空间管理" aria-hidden="true">#</a> 空闲空间管理</h2><ul><li>为了记录空闲磁盘空间，系统需要维护一个空闲空间链表（free-space list)。空闲空间链表记录了所有空闲磁盘空间，即未分配给文件或目录的空间。空闲空间链表虽然称为链表，但不一定表现为链表。</li></ul><h3 id="位向量" tabindex="-1"><a class="header-anchor" href="#位向量" aria-hidden="true">#</a> 位向量</h3><ul><li><p>通常，空闲空间表实现为位图( bit map）或位向量(bit vector)。每块用一位表示。如果一块为空闲，那么其位为1;如果一块已分配，那么其位为0。</p></li><li><p>例如，假设有一个磁盘，其块2、3、4、5、8、9、10、11、12、13、17、18、25、26、27为空闲，其他块为已分配。那么，空闲空间位图如下:</p></li><li><ul><li>001111001111110001100000011100000…</li></ul></li><li><p>这种方法的主要优点是查找磁盘上第一个空闲块和n个连续空闲块时相对简单和高效。在使用位图的系统上找到第一个空块来分配磁盘空间的一种技术是按顺序检查位图的每个字以检查其是否为0，因为一个值为0的字表示其对应的所有块都已分配。再对第一个值为非0的字进行搜索值为1的位偏移，该偏移对应着第一个空闲块。该块号码的计算如下:</p></li><li><ul><li>(值为О的字数)×(一个字的位数)＋第一个值为1的位的偏移</li></ul></li></ul><h3 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h3><ul><li>空闲空间管理的另一种方法是将所有空闲磁盘块用链表连接起来，并将指向第一空闲块的指针保存在磁盘的特殊位置，同时也缓存在内存中。第一块包含一个下一空闲磁盘块的指针，如此继续下去。要遍历整个表时，需要读入每一块，这需要大量的IO时间。通常，操作系统只不过简单地需要一个空闲块以分配给一个文件，所以分配空闲表的第一块就可以了。</li></ul><h2 id="效率和性能" tabindex="-1"><a class="header-anchor" href="#效率和性能" aria-hidden="true">#</a> 效率和性能</h2><h3 id="效率" tabindex="-1"><a class="header-anchor" href="#效率" aria-hidden="true">#</a> 效率</h3><ul><li>磁盘空间的有效使用主要取决于所使用的磁盘分配和目录管理算法。</li></ul><h3 id="性能" tabindex="-1"><a class="header-anchor" href="#性能" aria-hidden="true">#</a> 性能</h3><ul><li>有的系统有一块独立内存用做缓冲缓存，位于其中的块假设马上需要使用。其他系统采用页面缓存(page cache）来缓存文件数据。</li><li>因此,顺序访问可以通过采用马上释放和预先读取来加以优化。马上释放(free-behind)是在一旦请求下一页时，马上从缓存中删除上一页。冲空间。采用预先读取（read-ahead)所请求的页和之后的一些页可一起读入并缓存。这些可能在本页处理之后就要被请求。从磁盘中一次性地读入这些数据并加以缓存节省了大量时间。</li></ul><h3 id="恢复" tabindex="-1"><a class="header-anchor" href="#恢复" aria-hidden="true">#</a> 恢复</h3><ul><li>计算机崩溃可能导致：缓冲和缓存的内容、正在进行的IO操作和与之相关的对打开文件的目录的修改都会丢失，这种事件会导致文件系统处于不一致状态。</li><li>一致性检查程序(consistency checker)，将目录结构数据与磁盘数据块相比较，并试图纠正所发现的不一致。</li><li>日志算法已成功应用到一致性检查问题。这种实现称为基于日志的面向事务文件系统（ log-based transaction-oriented或journaling file system)。</li><li>采用基于日志的恢复技术以更新文件系统元数据。简单说，所有元数据都按顺序写到日志上。执行一个特殊任务的一组操作称为事务( transaction)。这些修改一旦写到这个日志上，就可认为已经提交，系统调用就可返回到用户进程，以允许它继续执行。同时，这些日志条目再对真实文件系统结构进行重放。随着修改的进行，可不断地更新一个指针以表示哪些操作已完成和哪些仍然没有完成。当一个完整提交事务已完成，那么就可从日志文件中删除（日志文件是个环形缓冲)。环形缓冲写到空间末尾的时候，会从头开始写，从而覆盖掉以前的旧值。环形缓冲不能覆盖掉还没有保存的数据。日志可能是文件系统的一个独立部分，或在另一个磁盘上。采用分开读写磁头可以减少磁头竞争和寻道时间，因此会更有效，但也更复杂。</li><li>如果系统崩溃，日志文件可能有零个或多个事务。它所包含的任何事务虽然已经由操作系统所提交，但是还没有（对文件系统）完成，所以必须要完成。可以执行事务直到该工作完成，因此文件系统结构仍能保持一致。唯一可能出现的问题是一个事务被中断，即在系统崩溃之前，它还没有被提交，这些事务所做文件系统的修改必须撤销。</li></ul>',44),c=[s];function u(p,b){return l(),a("div",null,c)}const f=i(o,[["render",u],["__file","11.html.vue"]]);export{f as default};
