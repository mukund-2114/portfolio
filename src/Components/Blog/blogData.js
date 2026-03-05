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
      { type: 'callout', text: 'Implement **request coalescing** and **jitter**, and you will save countless databases from total meltdown!' },
      { type: 'internalLink', direction: 'right', label: 'Part 2', title: 'Strategic Caching in Distributed Systems: Beyond Basic TTL', link: '/blog/2' }
    ]
  },
  {
    id: 2,
    title: "Strategic Caching in Distributed Systems: Beyond Basic TTL",
    summary: "Why standard cache expiration isn't enough, and how advanced patterns like Jitter, Stale-While-Revalidate, and Early Recomputation prevent system crashes.",
    date: "March 15, 2026",
    readTime: "9 min read",
    thumbnail: "/blog2/thumbnail.jpg",
    tags: ["Performance", "Backend", "Architecture"],
    content: [
      { type: 'internalLink', direction: 'left', label: 'Part 1', title: 'Understanding the Thundering Herd Problem', link: '/blog/1' },
      { type: 'paragraph', text: 'Caching is normally the first tool developers reach for when a database starts running hot. The concept seems beautifully simple: intercept the request, check if the data is in memory, and if it is, return it immediately.' },
      { type: 'paragraph', text: 'But in high-scale distributed systems, simple caching introduces a terrifying hidden trap: ==simultaneous expiration==.' },
      
      { type: 'callout', text: '**The Problem:** If a heavily-requested piece of data (like a Black Friday discount code) is cached with a fixed Time-to-Live (TTL) of exactly 60 seconds, what happens at second 61 when that cache suddenly expires and disappears?' },

      { type: 'image', src: '/blog2/crowd.jpg', caption: 'High-traffic events like E-commerce sales can instantly overload databases if caches expire synchronously.' },

      { type: 'paragraph', text: 'At second 61, the cache expires. Instantly, all incoming traffic gets a "cache miss" and hits your primary database directly. This instantaneous flood is a form of the Thundering Herd problem, and basic caching simply isn\'t enough to stop it.' },
      { type: 'paragraph', text: 'Let’s explore the modern, production-ready cache strategies used by companies like Netflix and Amazon to combat these spikes and keep systems online.' },

      { type: 'heading', text: '1. TTL Jitter (Randomized Expiration)' },
      { type: 'paragraph', text: 'Imagine an IPL cricket match streaming to millions of devices. When the match starts, 5 million phones request the configuration file at the exact same moment. If you set `TTL = 300 seconds`, exactly five minutes later, 5 million phones will miss the cache simultaneously.' },
      { type: 'image', src: '/blog2/crowd_phone.jpg', caption: 'Millions of concurrent users requesting live data from a stadium or streaming event.' },
      { type: 'paragraph', text: 'The solution is ==Jitter==. Instead of a hardcoded 300 seconds, you add a small random offset to every key when saving it to the cache:' },
      { type: 'paragraph', text: '`TTL = Base_TTL + Random(0, Jitter_Window)`' },
      { type: 'paragraph', text: 'By setting the TTL to a random number between 280 and 320 seconds, the expirations are smeared smoothly across a 40-second window, preventing a sudden, synchronized database strike.' },
      { type: 'image', src: '/blog2/ttl-jitter.png', caption: 'Architecture Diagram: Synchronized TTL Expiry vs Jittered Timeline.' },

      { type: 'heading', text: '2. Cache Mutex (Locking)' },
      { type: 'paragraph', text: 'What happens when a critical cache key *does* expire, and 10,000 requests arrive in the exact same millisecond? No matter how much Jitter you use, a heavily accessed key will still cause a massive spike when it naturally dies.' },
      { type: 'paragraph', text: 'A **Cache Mutex** (mutual exclusion) solves this using a simple rule: ==Only ONE request is allowed to ask the database.==' },
      { type: 'paragraph', text: 'When a cache miss occurs, the backend attempts to acquire a distributed lock. The first request grabs the lock, queries the database, updates the cache, and releases the lock. The other 9,999 requests fail to get the lock, wait for 50ms, and retry the cache-finding it freshly populated!' },
      { type: 'image', src: '/blog2/cache-mutex.png', caption: 'Architecture Diagram: Mutex Locking allowing only one request to hit the DB.' },

      { type: 'heading', text: '3. Stale-While-Revalidate (SWR)' },
      { type: 'paragraph', text: 'This is the golden standard used heavily by modern CDNs. The philosophy behind SWR is: *"Serving slightly old data immediately is better than making the user wait for new data."*' },
      { type: 'paragraph', text: 'It works best for high-traffic, globally cached endpoints (e.g. `GET /sale/live-status` or a live blog) where minor staleness is acceptable.' },
      { type: 'paragraph', text: 'With SWR, you configure two timers:' },
      { type: 'paragraph', text: '• **Max-Age (e.g., 60s):** The data is considered completely fresh.' },
      { type: 'paragraph', text: '• **Stale-Window (e.g., 120s):** The data is old, but we are allowed to show it to the user anyway.' },
      { type: 'callout', text: '**How it works:** When a user requests data during the stale window, the cache immediately returns the old data so the user sees no loading screen. But behind the scenes, the cache fires off an asynchronous request to the database to fetch the fresh data. When the *next* user requests that exact same endpoint, they instantly get the freshly fetched data!' },
      { type: 'image', src: '/blog2/stale-while-revalidate.png', caption: 'Architecture Diagram: Stale-While-Revalidate (SWR) Flow.' },

      { type: 'heading', text: '4. Cache Pre-Warming' },
      { type: 'paragraph', text: 'If a highly anticipated Netflix show is premiering at midnight, or a massive E-commerce flash sale is starting, you cannot wait for the first user to cause a cache miss.' },
      { type: 'paragraph', text: '==Cache Warming== is the process of intentionally running scripts to query the database and populate the cache *before* the traffic arrives. By 11:59 PM, the cache is already fully loaded and the database is completely protected from the initial blast.' },
      { type: 'image', src: '/blog2/cache-warming.png', caption: 'Architecture Diagram: Cache Warming scripts running before a launch event.' },

      { type: 'heading', text: '5. Probability-Based Early Expiration' },
      { type: 'paragraph', text: 'Also known as Probabilistic Early Re-computation (PER), this is a brilliant mathematical technique used in systems like Redis.' },
      { type: 'paragraph', text: 'Instead of waiting for a key to fully expire, the system uses an algorithm to randomly "pretend" the key has expired slightly early. As a key gets closer and closer to its true death, the probability of it triggering a re-computation increases.' },
      { type: 'paragraph', text: 'Because this relies on random chance, exactly one random incoming request will trigger the early db-check while the cache is still technically alive. It elegantly prevents spikes without needing complex locking mechanisms.' },
      { type: 'image', src: '/blog2/probabilistic-early-expiration.png', caption: 'Probability algorithm timeline simulating early expiration.' },

      { type: 'heading', text: 'Tradeoffs and Strategy Selection' },
      { type: 'paragraph', text: 'Choosing the right cache strategy is entirely dependent on the specific constraints of your product:' },
      { type: 'callout', text: '• Use **Jitter** for massive bulk-loaded datasets to prevent synchronized expiration.\n• Use **Mutexes** when computing the data is extremely expensive and you cannot afford a single duplicate DB query.\n• Use **Stale-While-Revalidate** when low latency is strictly more important than data freshness (e.g. eCommerce catalogs, live scores).\n• Use **Pre-Warming** for scheduled, highly-marketed traffic events.' }
    ]
  },
  {
    id: 3,
    title: "Demystifying OpenID Connect: Identity on the Modern Web",
    summary: "Discover how OpenID Connect powers modern single sign-on (SSO), bridging the gap between OAuth 2.0 authorization and true digital identity.",
    date: "April 10, 2026",
    readTime: "7 min read",
    thumbnail: "/blog3/thumbnail.png",
    tags: ["Authentication", "Security", "Architecture"],
    content: [
      { type: 'paragraph', text: 'Authentication on the web used to be a massive problem. Every single application needed its own password database, whether it was YouTube, Google Maps, or a random startup. This led to password fatigue for users and giant security risks.' },
      
      { type: 'heading', text: 'How OIDC Came Into Existence' },
      { type: 'paragraph', text: 'In the early days, if an application wanted to sync your Google Contacts, it literally asked you to type in your Google password. To fix this security nightmare, the industry created **OAuth 2.0**. This allowed apps to request access to your data without ever seeing your password. It was a massive win for *authorization*.' },
      { type: 'paragraph', text: 'However, developers soon realized they could hack OAuth 2.0 to act as a login system. They would use the protocol to fetch a user\'s profile data and use that as proof of identity. This forced an authorization protocol to do an *authentication* job, which resulted in a fragmented and insecure mess across the web.' },
      { type: 'paragraph', text: 'To fix this, the industry introduced **OpenID Connect (OIDC)**. OIDC is a standardized identity layer built directly on top of OAuth 2.0. It finally gave developers a native, standard way to securely verify exactly who a user is.' },
      
      { type: 'heading', text: 'A System Design Perspective: Centralizing Identity' },
      { type: 'paragraph', text: 'At its core, OIDC is an architectural pattern for centralizing authentication. When designing scalable systems, you don\'t want every microservice managing user passwords. Instead, you build a distinct Identity Provider.' },
      { type: 'callout', text: '1. **OpenID Provider (OP):** The central authentication server that verifies the user (e.g., `auth-google`).\n2. **Relying Party (RP):** The client application or microservice that relies on the OP to identify the user.' },
      { type: 'paragraph', text: 'The OP handles the login screen and consent. Once authenticated, it returns a cryptographically signed **ID Token (formatted as a JWT)** back to the RP. The RP then uses this token to establish a session.' },

      { type: 'heading', text: 'Why JWTs Make OIDC Highly Scalable' },
      { type: 'paragraph', text: 'From a system design standpoint, the genius of OIDC lies in the ID Token being a stateless JSON Web Token (JWT). If YouTube (the Relying Party) had to make a network request to `auth-google` (the OP) to verify a user on every single video click, `auth-google` would crash from the immense load.' },
      { type: 'paragraph', text: 'Instead, `auth-google` cryptographically signs the JWT. YouTube can fetch Google\'s public keys (via a standard JWKS endpoint) and verify the token\'s signature locally. This allows the Relying Party to validate user identity asynchronously, preventing the central Identity Provider from becoming a system bottleneck.' },

      { type: 'heading', text: 'Ecosystem Architecture in Practice' },
      { type: 'paragraph', text: 'To understand the true power of this decoupled auth architecture, look at how the tech giants structure their ecosystems:' },
      
      { type: 'animation', name: 'oidc' },
      
      { type: 'subheading', text: '1. Internal Ecosystems (1st-Party RPs)' },
      { type: 'paragraph', text: 'Google does not build separate login databases for YouTube, Photos, or Maps. It built one highly secure OIDC microservice (`auth-google`). All internal apps simply act as 1st-party Relying Parties that consume ID Tokens from this central service.' },

      { type: 'subheading', text: '2. External Delegated Auth (3rd-Party RPs)' },
      { type: 'paragraph', text: 'Because OIDC is an open standard, it can be extended securely over the public internet. Any independent startup can integrate a "Sign in with Google" button, acting as a 3rd-party Relying Party. During this exchange, `auth-google` injects an OAuth 2.0 Consent Form to ensure the user approves sharing their profile data.' },

      { type: 'callout', text: '**The System Design Takeaway:** By decoupling identity management into a dedicated OpenID Provider, companies achieve single sign-on (SSO), localize security risks to one service, and scale validation infinitely via stateless JWTs. It is the modern standard for distributed systems.' }
    ]
  }
];
