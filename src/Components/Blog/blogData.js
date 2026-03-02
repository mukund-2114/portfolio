export const blogs = [
  {
    id: 1,
    title: "Understanding the Thundering Herd Problem",
    summary: "Discover how synchronized traffic spikes, cache expiration, and sudden network bursts can crash large-scale distributed systems and how to prevent it.",
    date: "March 2, 2026",
    readTime: "8 min read",
    thumbnail: "/server.png",
    tags: ["System Design", "Backend", "Architecture"],
    content: [
      { type: 'paragraph', text: 'Imagine it is Black Friday. For weeks, a massive crowd has been waiting outside a department store. The doors are locked. Suddenly, at exactly 12:00 AM, the doors unlock.' },
      { type: 'callout', text: '**What happens?** Hundreds of people rush in simultaneously, stampeding through the entrance, overwhelming the staff, and sometimes breaking the doors completely.' },
      { type: 'image', src: '/store_rush.png', caption: 'A massive coordinated rush overwhelming a system analogous to a store opening on Black Friday.' },
      
      { type: 'paragraph', text: 'In system design, this exact phenomenon is called the ==Thundering Herd Problem==. It happens when a large number of processes or clients patiently wait for an event, and when that event occurs, they all "wake up" and simultaneously hit the same resource, completely overwhelming it.' },
      
      { type: 'heading', text: 'What is the Thundering Herd Problem?' },
      { type: 'paragraph', text: 'At its core, the thundering herd problem is a concurrency issue. When multiple clients are blocked waiting for a specific resource, and that resource becomes available, they all try to access it at the **exact same millisecond**. The server is hit with a massive, synchronized burst of traffic it was not designed to handle simultaneously.' },
      
      { type: 'heading', text: 'Where it commonly occurs' },
      { type: 'paragraph', text: 'This problem famously plagues high-scale distributed systems. Here are the most common bottlenecks:' },
      { type: 'paragraph', text: '• ==Caching Systems:== The most common scenario. When a heavily accessed cache key expires, thousands of incoming requests miss the cache and hit the DB directly.' },
      { type: 'paragraph', text: '• ==Databases & Pools:== When a dead database comes back online, idle services immediately rush to establish a new connection.' },
      { type: 'paragraph', text: '• ==Autoscaling:== New servers launched to handle traffic sometimes receive instant floods of DNS routing before they have fully "warmed up".' },

      { type: 'heading', text: 'Real-World Example: Cache Expiration' },
      { type: 'paragraph', text: 'Let’s take a popular live application as an example. Suppose during an IPL cricket match, an app brings in massive traffic just to check the live score. Since the score changes every ball, the backend computes the score from the DB and stores it in Redis with a **5-second Time-To-Live (TTL)**.' },
      { type: 'image', src: '/cricket.png', caption: 'Millions of concurrent users pulling the latest updates from an app during an active cricket match' },
      
      { type: 'paragraph', text: 'For 5 seconds, everything is perfect: `100,000 requests / sec` hit the blazing-fast Redis cache, while the database does virtually zero work. But at exactly the 6th second, the cache key expires.' },
      
      { type: 'callout', text: '**The Melt Down:** Suddenly, the next 100,000 requests miss the cache entirely! Because none of them see a cached value, **ALL 100,000 requests query the primary database simultaneously.** The database CPU spikes to 100%, and the server cluster catches fire.' },
      { type: 'image', src: '/blog1/diagram1.png', caption: 'Architecture Diagram: The cache expires and 100k requests bypass Redis and hit the DB simultaneously.' },

      { type: 'heading', text: 'Why is it Dangerous in Distributed Systems?' },
      { type: 'paragraph', text: 'You might wonder: *"What is the difference between a normal traffic spike and a thundering herd?"*' },
      { type: 'paragraph', text: '• **Normal Spikes** build gradually (over minutes or hours). Autoscaling groups have ample time to provision new nodes smoothly.' },
      { type: 'image', src: '/blog1/diagram2.png', caption: 'Architecture Diagram: Normal Auto-scaling behavior smoothly handling gradual traffic increase.' },
      
      { type: 'paragraph', text: '• **Thundering Herds** are instant, synchronised bursts occurring within milliseconds. No autoscaler reacts fast enough. This creates horrible cascading impacts:' },
      { type: 'callout', text: '• **Database Crashes** from compute-heavy duplicate queries.\n• **Latency Spikes** as active queues instantly overflow.\n• **CPU Thrashing** due to context switching between thousands of threads violently waking up simultaneously.' },
      { type: 'image', src: '/blog1/diagram3.png', caption: 'Architecture Diagram: Immediate synchronized Thundering Herd burst instantly crashing a system.' },

      { type: 'heading', text: 'Techniques to Prevent the Thundering Herd' },
      { type: 'paragraph', text: 'If you want to ace system design, understanding these five mitigation strategies is absolute gold.' },
      
      { type: 'subheading', text: '1. Request Coalescing (Single Flight)' },
      { type: 'paragraph', text: 'Instead of letting 1,000 requests hit the DB when the cache misses, the backend detects that they are for the same key. It holds 999 requests in wait, lets ONE request hit the DB to compute the value, updates the cache, and then broadcasts that value to all 1,000 waiting requests.' },
      { type: 'image', src: '/blog1/diagram4.png', caption: 'Architecture Diagram: Implementing Request Coalescing to hold 99,999 requests and only fire 1 query.' },

      { type: 'subheading', text: '2. Cache Locking (Mutexes)' },
      { type: 'paragraph', text: 'Similar to coalescing but handled via distributed locks. When a cache miss happens, a distributed lock is placed on that key. The first thread acquires the lock and queries the DB. Other threads that fail to acquire the lock must `sleep()` and re-check the cache after a few milliseconds instead of hammering the DB.' },

      { type: 'subheading', text: '3. Staggered & Jittered Expiry' },
      { type: 'paragraph', text: 'When caching a huge batch of items, do NOT set the exact same TTL (e.g., exactly 60 seconds). Adding a small random jitter (e.g. `TTL = 60s + random(1, 10s)`) ensures that all keys do not accidentally expire at the exact same millisecond, smoothing out traffic into manageable curves.' },

      { type: 'subheading', text: '4. Exponential Backoff and Jitter' },
      { type: 'paragraph', text: 'When clients try to reconnect to an overwhelmed service and fail, they should not retry immediately. If 10,000 clients retry continuously every 1 second, the service handles 10,000 hits at once and dies.' },
      { type: 'paragraph', text: 'Adding ==exponential backoff== (retry after 1s, then 2s, 4s, 8s) mixed with ==random jitter== means clients will slowly and chaotically trickle back in, giving the server time to breathe.' },

      { type: 'subheading', text: '5. Rate Limiting and Load Shedding' },
      { type: 'paragraph', text: 'Simply put, drop traffic. When an endpoint or database reaches critical CPU load, configure the API gateway to immediately return **HTTP 429 (Too Many Requests)** rather than attempting to queue computational work that mathematically cannot complete.' },

      { type: 'heading', text: 'Conclusion' },
      { type: 'paragraph', text: 'The Thundering Herd is an incredibly common anti-pattern in high-scale systems. The core lesson is to always be careful about synchronized time-based events and always assume your cache will eventually fail under pressure.' },
      { type: 'callout', text: 'Implement **request coalescing** and **jitter**, and you will save countless databases from total meltdown!' }
    ]
  }
];
