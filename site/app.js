/**
 * REALLY ROOMATES — Grace & Strings
 * California Transitional Housing & Roommate Launchpad
 * Core Application Engine & State Controller
 */

import { guitarEngine } from './audio.js';

// ============================================================================
// Fallback Datasets (Ensures 100% functionality even in offline or file:// mode)
// ============================================================================
const DEFAULT_RESOURCES = [
  {
    id: "padsplit-ca",
    name: "PadSplit — California Rooms & Coliving",
    category: "Fast Move-in",
    region: "All California",
    priceRange: "$180 – $260 / week",
    speed: "Immediate (< 48 hrs)",
    depositRequirement: "Minimal ($99 – $199 move-in fee)",
    creditCheck: "No Minimum Credit Score (Income Verification)",
    guitarFriendlyRating: "Moderate (Private room, quiet hours 10pm-7am)",
    summary: "The fastest alternative to traditional leases in California. Rent a private furnished room with all utilities and high-speed Wi-Fi included. Pay weekly or bi-weekly.",
    keyPerks: [
      "Move in within 24 to 48 hours of verification",
      "No 12-month lease commitment (stay week-to-week or months)",
      "All utilities, electric, gas, water, and Wi-Fi included",
      "Fixed weekly payments keep budgeting completely predictable"
    ],
    actionUrl: "https://www.padsplit.com/rooms-for-rent",
    actionLabel: "Explore PadSplit California",
    proTip: "Have proof of your last 30 days income ready (pay stubs or bank deposits). Approval is automated based on income-to-rent ratio, not credit score."
  },
  {
    id: "furnished-finder-ca",
    name: "Furnished Finder — Mid-Term & 30+ Day Stays",
    category: "Room Share / Coliving",
    region: "All California",
    priceRange: "$850 – $1,400 / month",
    speed: "Fast (3–5 days)",
    depositRequirement: "Low Deposit ($250 – $500 typical)",
    creditCheck: "Background Check (Landlord Discretion)",
    guitarFriendlyRating: "High (Many detached ADUs, guest suites & in-law units)",
    summary: "Originally created for traveling nurses and transitioners, Furnished Finder has tens of thousands of private rooms, guest suites, and detached ADUs across California with no booking fees.",
    keyPerks: [
      "Zero traveler booking fees (saves $150–$300 vs Airbnb)",
      "Fully furnished with full kitchens and dedicated laundry",
      "Lots of separate detached guest houses and in-law suites",
      "Direct communication with property owners before committing"
    ],
    actionUrl: "https://www.furnishedfinder.com/housing/California",
    actionLabel: "Search Furnished Finder CA",
    proTip: "Send a polite intro message highlighting you are a reliable, respectful roommate who plays acoustic guitar with headphones or respectful daytime hours."
  },
  {
    id: "ca-ab12-protection",
    name: "California AB 12 — 1-Month Security Deposit Cap Law",
    category: "Deposit & Downpayment Grant",
    region: "All California",
    priceRange: "Legal Protection (Saves $1,000+ Upfront)",
    speed: "Immediate Legal Right",
    depositRequirement: "MAX 1 Month Rent (State Law as of July 1, 2024)",
    creditCheck: "Protects all renters across California",
    guitarFriendlyRating: "Universal Legal Right",
    summary: "As of July 1, 2024, California Assembly Bill 12 strictly forbids landlords from demanding more than ONE MONTH'S RENT as a security deposit (previously 2-3 months). Know your rights!",
    keyPerks: [
      "No landlord can legally charge first + double deposit",
      "Reduces initial move-in cash barrier by 50% across California",
      "Applies whether unit is furnished or unfurnished",
      "Small landlords (owning <= 2 properties with <= 4 units) can only charge up to 2 months if not an LLC/corporation"
    ],
    actionUrl: "https://oag.ca.gov/consumers/general/landlord-tenant-issues",
    actionLabel: "Read Official CA Tenant Rights",
    proTip: "If a landlord demands 2 months deposit, cite California Civil Code § 1950.5 (AB 12). Most landlords will immediately correct the lease once they know you understand state law."
  },
  {
    id: "ca-211-housing-ces",
    name: "California 2-1-1 & Coordinated Entry (Rapid Re-Housing)",
    category: "Deposit & Downpayment Grant",
    region: "All California",
    priceRange: "Free Grant / Direct Assistance",
    speed: "Urgent Triage (Call immediately)",
    depositRequirement: "Programs cover 1st Month + Full Deposit",
    creditCheck: "Zero Credit Barrier",
    guitarFriendlyRating: "High (Enables stable private housing)",
    summary: "California's official Coordinated Entry System (CES) connects individuals facing housing instability or transition directly to local rapid re-housing funds, deposit grants, and motel voucher bridges.",
    keyPerks: [
      "Dial 2-1-1 or text your ZIP code to 898211 for 24/7 live assistance",
      "Access to Emergency Solutions Grants (ESG) and Homeless Prevention funds",
      "Assistance for deposit, first month rent, and application fees",
      "Connects to county-specific flexible housing pools"
    ],
    actionUrl: "https://www.211ca.org/",
    actionLabel: "Connect to 2-1-1 California",
    proTip: "When you call, specifically request an intake for 'Rapid Re-Housing Security Deposit Assistance' and 'Flexible Housing Bridge Funds'."
  },
  {
    id: "welcome-home-oc",
    name: "Welcome Home OC & Orange County United Way",
    category: "Deposit & Downpayment Grant",
    region: "Orange County / SoCal",
    priceRange: "Full Security Deposit Grant + Move-in Support",
    speed: "Application (1–2 weeks)",
    depositRequirement: "Paid by Program Grant",
    creditCheck: "Voucher & Landlord Incentive Program",
    guitarFriendlyRating: "High",
    summary: "Orange County's premier housing navigation program. Provides security deposit guarantees, move-in assistance funds, and a network of participating private landlords willing to work with transitional residents.",
    keyPerks: [
      "Direct financial support for security deposit and holding fees",
      "Network of pre-vetted private landlords in Orange County",
      "Ongoing housing retention support and case navigation",
      "Helps bridge the gap from temporary stays to permanent leases"
    ],
    actionUrl: "https://www.unitedwayoc.org/our-work/housing/welcome-home-oc/",
    actionLabel: "Visit Welcome Home OC",
    proTip: "If connected to campus basic needs (like CSUF) or a community partner, request a direct referral to the Welcome Home OC housing specialist."
  },
  {
    id: "pathways-of-hope",
    name: "Pathways of Hope — North Orange County Housing",
    category: "Deposit & Downpayment Grant",
    region: "Orange County / SoCal",
    priceRange: "Rental & Deposit Assistance",
    speed: "Fast (3–7 days)",
    depositRequirement: "Assistance Available",
    creditCheck: "Income-focused assessment",
    guitarFriendlyRating: "Moderate",
    summary: "Based in Fullerton/Anaheim, Pathways of Hope operates rapid rehousing, emergency food assistance (The HUB), and rental deposit grants for North Orange County residents and students.",
    keyPerks: [
      "Direct proximity to Fullerton, Anaheim, Buena Park, and Brea",
      "Operates rapid rehousing and emergency supportive housing",
      "Strong partnership with local campus basic needs centers",
      "Emergency financial assistance for move-in and utilities"
    ],
    actionUrl: "https://www.pohoc.org/",
    actionLabel: "Contact Pathways of Hope",
    proTip: "Visit their Fullerton HUB center or call (714) 680-3691 early in the week at 8:30am when weekly funding allocations are refreshed."
  },
  {
    id: "oxford-house-ca",
    name: "Oxford Houses California — Self-Supporting Clean Living",
    category: "Transitional & Sober Living",
    region: "All California",
    priceRange: "$500 – $800 / month",
    speed: "Fast (1–3 days interview)",
    depositRequirement: "Low Move-in Fee ($100 – $200)",
    creditCheck: "No credit checks (House interview only)",
    guitarFriendlyRating: "High (Brotherhood, shared community, acoustic friendly)",
    summary: "Democratically run, self-supporting recovery and transitional houses across California. Zero tolerance for substances, highly supportive fellowship, very affordable shared living.",
    keyPerks: [
      "No lease or credit check — admission decided by house vote",
      "Costs are equally shared (utilities, cable, Wi-Fi included)",
      "Strong culture of personal responsibility, accountability, and brotherhood",
      "Over 100+ Oxford Houses active throughout Northern & Southern California"
    ],
    actionUrl: "https://www.oxfordhouse.org/directory_search.php",
    actionLabel: "Find Oxford Houses in CA",
    proTip: "Call the house phone number listed in the directory directly. Ask when their weekly house meeting occurs and request an in-person or phone interview."
  },
  {
    id: "salvation-army-arc",
    name: "Salvation Army Adult Rehab & Transitional Residences",
    category: "Transitional & Sober Living",
    region: "All California",
    priceRange: "Free / Subsidized Living",
    speed: "Fast (Same day intake available)",
    depositRequirement: "Zero Deposit",
    creditCheck: "None",
    guitarFriendlyRating: "High (Chapel, worship music, guitars welcomed)",
    summary: "Faith-based residential centers located in Anaheim, Long Beach, Los Angeles, San Diego, Oakland, and Sacramento providing structured transitional housing, meals, and spiritual support.",
    keyPerks: [
      "100% free residential shelter, meals, and work therapy programs",
      "Spiritual grounding with Christian chaplaincy and chapel services",
      "Safe, structured sanctuary away from chaos and negative influences",
      "Assistance with job placement and permanent housing transition"
    ],
    actionUrl: "https://www.salvationarmyusa.org/usn/adult-rehabilitation-centers/",
    actionLabel: "Locate Salvation Army Centers",
    proTip: "Salvation Army Anaheim (1300 S Lewis St) and Santa Monica/LA centers accept direct walk-in intakes Monday through Friday mornings."
  },
  {
    id: "roomies-ca",
    name: "Roomies.com — California Roommates & Verified Shares",
    category: "Room Share / Coliving",
    region: "All California",
    priceRange: "$650 – $1,100 / month",
    speed: "Fast (3–7 days)",
    depositRequirement: "1 Month Deposit (AB 12 Protected)",
    creditCheck: "Vetting varies by roommate profile",
    guitarFriendlyRating: "High (Filter by musician & music friendly tags)",
    summary: "Free platform for finding private rooms and roommates. Unlike Craigslist, Roomies verifies user IDs, phone numbers, and social profiles, drastically reducing rental scams.",
    keyPerks: [
      "Free messaging between verified members",
      "Detailed lifestyle filters (cleanliness, quiet hours, musicians, faith)",
      "Transparent breakdown of rent + estimated utility split",
      "Active listings across Fullerton, Orange, Long Beach, Irvine, LA"
    ],
    actionUrl: "https://www.roomies.com/rooms/california",
    actionLabel: "Browse Roomies California",
    proTip: "Complete your profile 100% with a friendly photo, your work schedule, and a note about your quiet practice habits for guitar."
  },
  {
    id: "christian-roommates",
    name: "Christian Roommate Boards & Church Housing Networks",
    category: "Faith-Based Housing",
    region: "All California",
    priceRange: "$600 – $950 / month",
    speed: "Moderate (5–10 days)",
    depositRequirement: "Reasonable / Flexible",
    creditCheck: "Character references valued over credit",
    guitarFriendlyRating: "Highest (Worship players, acoustic fellowship highly welcomed)",
    summary: "Network of Christian home providers, church bulletin boards (Eastside Christian, Saddleback, Mariners, Calvary Chapel), and faith-based shared housing where values align.",
    keyPerks: [
      "Peaceful, respectful living environment rooted in shared faith",
      "Hosts prioritize character, references, and peace over credit scores",
      "Often includes access to full home amenities, backyard, and kitchen",
      "Natural encouragement, prayer, and uplifting community"
    ],
    actionUrl: "https://www.christianroommates.com/",
    actionLabel: "Explore Christian Roommates",
    proTip: "Check the community bulletin boards at local churches (e.g. Mariners Church Irvine, Eastside Christian Anaheim, Rock Church San Diego) or call their pastoral care line for housing leads."
  },
  {
    id: "podshare-ca",
    name: "PodShare — Flexible Urban Coliving & Co-Living Pods",
    category: "Fast Move-in",
    region: "Los Angeles County",
    priceRange: "$45 – $65 / night or $950 / month",
    speed: "Immediate (Same-day check-in)",
    depositRequirement: "Zero Security Deposit",
    creditCheck: "ID verification only",
    guitarFriendlyRating: "Moderate (Co-working and creative space available)",
    summary: "Flexible membership coliving in Hollywood, DTLA, Venice, and Westwood. Custom pod beds with personal screens, charging stations, shared kitchens, and high-speed Wi-Fi.",
    keyPerks: [
      "No lease, no deposit, check in within 1 hour",
      "All groceries/basics (coffee, oatmeal, seasonings) complimentary",
      "Free access to all PodShare locations across Los Angeles",
      "Ideal 7-to-14 day bridge while touring and securing a permanent room"
    ],
    actionUrl: "https://www.podshare.com/",
    actionLabel: "View PodShare Los Angeles",
    proTip: "Use PodShare for 3 to 7 days as an emergency staging ground while going on in-person room tours in Southern California."
  },
  {
    id: "extended-stay-america",
    name: "Extended Stay America & InTown Suites (Bridge Living)",
    category: "Extended Stay Bridge",
    region: "All California",
    priceRange: "$350 – $550 / week (Weekly discount)",
    speed: "Immediate (< 24 hrs)",
    depositRequirement: "$50 – $100 incidental hold only",
    creditCheck: "No credit check (Debit or Credit card)",
    guitarFriendlyRating: "High (Private sound-insulated hotel room)",
    summary: "Furnished studio hotel rooms with full kitchenettes (stove, full fridge, microwave) designed for weeks or months of transitional living without any lease.",
    keyPerks: [
      "Full kitchen in room prevents costly takeout meals",
      "Zero utility bills or Wi-Fi fees",
      "Pet friendly and private parking included",
      "Instant peace of mind while searching for the right roommate"
    ],
    actionUrl: "https://www.extendedstayamerica.com/",
    actionLabel: "Check Weekly Rates",
    proTip: "Call the front desk directly and ask for the 'General Manager Special Weekly / 30-Day Rate'. On-site managers can discount online rates by 15-25%."
  }
];

const DEFAULT_DEVOTIONS = [
  {
    id: "devotion-1",
    verse: "Jeremiah 29:11",
    scripture: "“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”",
    theme: "Hope in the Next Chapter",
    reflection: "Transitions can feel uncertain, but your steps are guided. God already sees the dwelling place, the stability, and the community waiting on the other side of this season.",
    prayer: "Lord, thank You for ordering my steps. Calm my anxieties about housing and open the right door for safe, affordable shelter."
  },
  {
    id: "devotion-2",
    verse: "Philippians 4:6–7",
    scripture: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds.",
    theme: "Peace Over Pressure",
    reflection: "When rent deadlines loom, stress tries to take the wheel. Bring every dollar need and phone call before God. His peace guards your heart while you do the practical footwork.",
    prayer: "Father, I lay down the frantic rush. Fill me with Your quiet confidence as I interview and search today."
  },
  {
    id: "devotion-3",
    verse: "Isaiah 43:18–19",
    scripture: "Forget the former things; do not dwell on the past. See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.",
    theme: "A Clean Slate & Fresh Start",
    reflection: "Whatever led to this transitional moment does not define where you are going. God makes rivers in the desert and pathways in the wilderness. Expect new beginnings.",
    prayer: "Lord, let this move be a fresh foundation. Restore what was lost and give me courage to embrace this new season."
  },
  {
    id: "devotion-4",
    verse: "Psalm 121:1–2, 7–8",
    scripture: "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth... The Lord will keep your going out and your coming in from this time forth and forevermore.",
    theme: "Guarded in Your Coming & Going",
    reflection: "Moving involves logistics, boxes, negotiations, and changes of address. Psalm 121 promises that God watches over every exit and entrance of your life.",
    prayer: "Lord, protect my coming in and going out. Bless every threshold I cross and surround me with genuine allies."
  },
  {
    id: "devotion-5",
    verse: "Psalm 32:8",
    scripture: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you.",
    theme: "Divine Navigation",
    reflection: "When choosing between different rooms or roommates, God promises wisdom when we ask. Trust your discernment, watch for red flags, and seek harmony.",
    prayer: "Lord, give me sharp discernment. Show me which rooms are safe, quiet, and healthy for my creative and spiritual life."
  }
];

const DEFAULT_TASKS = [
  {
    id: "task-ab12-check",
    phase: "urgent",
    title: "Enforce CA AB 12 Deposit Cap Protection",
    description: "Ensure any prospective landlord or room provider charges at most ONE MONTH'S RENT as security deposit under California Civil Code § 1950.5 (AB 12, effective July 1, 2024).",
    actionTip: "Cuts move-in cash barrier in half immediately. If asked for 2x rent, politely send the AB 12 statute link.",
    priority: "Critical",
    completed: false
  },
  {
    id: "task-call-211-ces",
    phase: "urgent",
    title: "Call 2-1-1 for Rapid Re-Housing & Deposit Grants",
    description: "Dial 2-1-1 (or text your ZIP to 898211) and ask for Coordinated Entry System (CES) intake for emergency security deposit assistance and flexible housing bridge funds.",
    actionTip: "Request specific referrals for county rapid rehousing providers (e.g. Pathways of Hope, Share Ourselves, PATH, Welcome Home OC).",
    priority: "High",
    completed: false
  },
  {
    id: "task-padsplit-profile",
    phase: "urgent",
    title: "Submit PadSplit Verification for 24–48h Move-in",
    description: "Create a PadSplit account and upload your last 30 days of income proof (pay stubs or bank deposits). Approval takes under 48 hours with zero credit score check.",
    actionTip: "PadSplit rooms include all utilities, Wi-Fi, and furnishings with weekly payments ($180–$250/wk).",
    priority: "Critical",
    completed: false
  },
  {
    id: "task-movein-packet",
    phase: "urgent",
    title: "Assemble 1-Click 'Move-In Packet' on Phone",
    description: "Save clear PDF/photos of government ID, 2 recent pay stubs or bank statements, 2 personal/character references, and a polite introductory bio.",
    actionTip: "Landlords in California rent to whoever submits a complete, verified application first.",
    priority: "High",
    completed: false
  },
  {
    id: "task-roomies-spareroom",
    phase: "search",
    title: "Message 5 Verified Hosts on Roomies & Furnished Finder",
    description: "Search private rooms in your target California zone. Filter by 'Bills Included' and message 5 hosts using the Musician Pitch Script.",
    actionTip: "Use the built-in Musician & Respectful Roommate introduction template from this site.",
    priority: "High",
    completed: false
  },
  {
    id: "task-church-network",
    phase: "search",
    title: "Check Local Church Community Boards & Host Homes",
    description: "Call or visit pastoral care / community care at local churches to check their housing board for room listings.",
    actionTip: "Christian host homes often prioritize trustworthy, respectful roommates and offer lower rent with peaceful environments.",
    priority: "Medium",
    completed: false
  },
  {
    id: "task-oxford-house-interview",
    phase: "search",
    title: "Schedule Oxford House or Clean Living House Interview",
    description: "If seeking a supportive, substance-free, brotherhood-centered transitional home, call your regional Oxford House contact for an open bed interview.",
    actionTip: "Move-in fees are as low as $100–$200, with shared weekly expenses and strong mutual encouragement.",
    priority: "Medium",
    completed: false
  },
  {
    id: "task-cash-calculator",
    phase: "search",
    title: "Run REALLY ROOMATES Move-In Cash Calculator",
    description: "Calculate exact funds needed (1st month rent + 1 month deposit cap + utility buffer + moving fuel) and calculate your grant assistance gap.",
    actionTip: "Use the interactive Move-In Cash Calculator to match your deficit with available county aid.",
    priority: "High",
    completed: false
  },
  {
    id: "task-guitar-agreement",
    phase: "settle",
    title: "Review Musician Roommate Agreement & Quiet Hours",
    description: "Agree on designated acoustic playing/practice hours (e.g., 10am to 8pm), use headphones for amp/late sessions, and review safe instrument storage.",
    actionTip: "Clear upfront communication about music builds deep trust and prevents roommate friction before it starts.",
    priority: "Medium",
    completed: false
  },
  {
    id: "task-movein-inspection",
    phase: "settle",
    title: "Take Date-Stamped Move-In Video of Room & Fixtures",
    description: "Before bringing in luggage or gear, record a complete slow video walkthrough of walls, floor, windows, doors, and closet to protect your deposit.",
    actionTip: "Email the video link to yourself and the landlord immediately as mutual documentation.",
    priority: "High",
    completed: false
  },
  {
    id: "task-faith-recharge",
    phase: "settle",
    title: "Take 10 Minutes for Grace, Scripture & Acoustic Reflection",
    description: "Transition is hard work, but you are not walking alone. Read today's Scripture of Promise in the Grace Corner and play the acoustic chords to reset your spirit.",
    actionTip: "Peace of mind leads to better decisions, calm interviews, and lasting stability.",
    priority: "High",
    completed: false
  }
];

// ============================================================================
// Main Application State
// ============================================================================
class ReallyRoomatesApp {
  constructor() {
    this.resources = [];
    this.devotions = [];
    this.tasks = [];

    this.currentDevotionIndex = 0;
    this.currentTourStep = 0;

    this.filters = {
      search: '',
      region: 'All',
      category: 'All'
    };

    this.checklistActiveTab = 'all';

    this.tourSteps = [
      {
        tag: "STEP 1 OF 5 • WELCOME",
        title: "Welcome to REALLY ROOMATES",
        body: "We built this site to help your roommate (and you!) navigate California's transitional housing landscape faster, smarter, and with complete peace of mind. Let’s take 60 seconds to see how this tool accelerates your move."
      },
      {
        tag: "STEP 2 OF 5 • FAST-TRACK HOUSING",
        title: "Beyond Apartments.com: PadSplit & Coliving",
        body: "Standard leases demand 12-month commitments, 3x rent income, and 700+ credit scores. PadSplit offers furnished rooms with weekly rent, utilities included, and move-in under 48 hours without high credit bars. Plus, explore Furnished Finder guest suites and Oxford Houses."
      },
      {
        tag: "STEP 3 OF 5 • CALIFORNIA TENANT RIGHTS",
        title: "CA AB 12 Law: 1-Month Deposit Cap",
        body: "As of July 1, 2024, California law strictly limits residential security deposits to ONE MONTH'S RENT. If a landlord demands double deposit, state law protects you. We also link direct emergency deposit assistance grants through 2-1-1 CES, Welcome Home OC, and Pathways of Hope."
      },
      {
        tag: "STEP 4 OF 5 • INTERACTIVE TOOLS",
        title: "Move-In Cash Calculator & 7-Day Sprint",
        body: "Calculate your exact move-in requirement (rent, capped deposit, fees, buffer) minus your current savings to reveal your assistance gap. Then, check off actionable responsibilities in the interactive sprint checklist (auto-saved on your device)."
      },
      {
        tag: "STEP 5 OF 5 • GRACE & STRINGS SANCTUARY",
        title: "Faith, Acoustic Guitar & Harmony",
        body: "Transition can be stressful. Strum client-side acoustic guitar chords, read uplifting Scriptures of promise, and use the copyable Musician Roommate Pitch to assure roommates of your quiet practice hours. You are ready to move forward!"
      }
    ];
  }

  async init() {
    // 1. Load Data
    await this.loadInitialData();

    // 2. Setup Navigation & Dropdowns
    this.setupDropdownNavigation();

    // 3. Setup Resource Search & Filters
    this.setupResourceFilters();
    this.renderResources();

    // 4. Setup Move-In Cash Calculator
    this.setupCalculator();

    // 5. Setup 7-Day Checklist
    this.setupChecklist();

    // 6. Setup Grace & Strings (Audio + Devotionals)
    this.setupGraceAndStrings();

    // 7. Setup Onboarding Tour Modal
    this.setupTourModal();

    // 8. Setup Utility Actions (Print, Copy, Help)
    this.setupUtilityActions();

    console.log("REALLY ROOMATES application initialized successfully.");
  }

  // --------------------------------------------------------------------------
  // Data Loading
  // --------------------------------------------------------------------------
  async loadInitialData() {
    try {
      const resHousing = await fetch('/data/housing-resources.json');
      if (resHousing.ok) {
        this.resources = await resHousing.json();
      } else {
        this.resources = DEFAULT_RESOURCES;
      }
    } catch (e) {
      this.resources = DEFAULT_RESOURCES;
    }

    try {
      const resDevotions = await fetch('/data/devotions.json');
      if (resDevotions.ok) {
        this.devotions = await resDevotions.json();
      } else {
        this.devotions = DEFAULT_DEVOTIONS;
      }
    } catch (e) {
      this.devotions = DEFAULT_DEVOTIONS;
    }

    // Load tasks from localStorage or default
    const savedTasks = localStorage.getItem('really_roomates_tasks_v1');
    if (savedTasks) {
      try {
        this.tasks = JSON.parse(savedTasks);
      } catch (e) {
        this.tasks = [...DEFAULT_TASKS];
      }
    } else {
      this.tasks = [...DEFAULT_TASKS];
    }
  }

  // --------------------------------------------------------------------------
  // Navigation & Dropdown Controls
  // --------------------------------------------------------------------------
  setupDropdownNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      const btn = item.querySelector('.nav-button');
      if (!btn) return;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains('open');

        // Close all other dropdowns
        navItems.forEach(other => other.classList.remove('open'));

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdowns on click outside
    document.addEventListener('click', () => {
      navItems.forEach(item => {
        item.classList.remove('open');
        const btn = item.querySelector('.nav-button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close dropdowns on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navItems.forEach(item => {
          item.classList.remove('open');
          const btn = item.querySelector('.nav-button');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Dropdown direct links with filter presets
    const filterLinks = document.querySelectorAll('.dropdown-link[data-filter-cat], .dropdown-link[data-filter-region], .dropdown-link[data-filter-search]');
    filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const cat = link.getAttribute('data-filter-cat');
        const region = link.getAttribute('data-filter-region');
        const search = link.getAttribute('data-filter-search');

        if (cat) {
          this.filters.category = cat;
          this.syncFilterPills('category', cat);
        }
        if (region) {
          this.filters.region = region;
          this.syncFilterPills('region', region);
        }
        if (search) {
          this.filters.search = search;
          const searchInput = document.getElementById('resource-search-input');
          if (searchInput) searchInput.value = search;
        }

        this.renderResources();
      });
    });
  }

  syncFilterPills(group, value) {
    const pills = document.querySelectorAll(`.filter-pill[data-filter="${group}"]`);
    pills.forEach(pill => {
      if (pill.getAttribute('data-value') === value) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // Housing Resource Filter Engine
  // --------------------------------------------------------------------------
  setupResourceFilters() {
    const searchInput = document.getElementById('resource-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value.toLowerCase().trim();
        this.renderResources();
      });
    }

    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filterType = pill.getAttribute('data-filter');
        const filterVal = pill.getAttribute('data-value');

        // Toggle active within group
        document.querySelectorAll(`.filter-pill[data-filter="${filterType}"]`).forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        this.filters[filterType] = filterVal;
        this.renderResources();
      });
    });
  }

  renderResources() {
    const container = document.getElementById('resources-grid-container');
    const countBadge = document.getElementById('resource-count-badge');
    if (!container) return;

    const query = this.filters.search;
    const regionFilter = this.filters.region;
    const catFilter = this.filters.category;

    const filtered = this.resources.filter(item => {
      // Region Match
      if (regionFilter !== 'All' && item.region !== 'All California' && item.region !== regionFilter) {
        return false;
      }
      // Category Match
      if (catFilter !== 'All' && item.category !== catFilter) {
        return false;
      }
      // Keyword Match
      if (query) {
        const searchable = `${item.name} ${item.summary} ${item.category} ${item.region} ${item.proTip} ${(item.keyPerks || []).join(' ')}`.toLowerCase();
        if (!searchable.includes(query)) return false;
      }
      return true;
    });

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${this.resources.length} resources`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
          <p style="font-size: 1.2rem; color: var(--amber-300); font-weight: 700;">No California resources match this exact filter</p>
          <p class="text-muted" style="font-size: 0.9rem; margin-top: 6px;">Try clearing search keywords or choosing 'All California'</p>
          <button class="btn-secondary" id="btn-reset-filters" style="margin-top: 16px;">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.filters = { search: '', region: 'All', category: 'All' };
          const sInput = document.getElementById('resource-search-input');
          if (sInput) sInput.value = '';
          this.syncFilterPills('region', 'All');
          this.syncFilterPills('category', 'All');
          this.renderResources();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(item => `
      <article class="resource-card" aria-labelledby="title-${item.id}">
        <div class="card-top">
          <div class="card-badges">
            <span class="badge-tag tag-category">${this.escapeHtml(item.category)}</span>
            <span class="badge-tag tag-region">${this.escapeHtml(item.region)}</span>
            <span class="badge-tag tag-speed">${this.escapeHtml(item.speed)}</span>
          </div>

          <h3 class="resource-title" id="title-${item.id}">${this.escapeHtml(item.name)}</h3>

          <div class="resource-meta-table">
            <div class="meta-item">
              <dt>Price / Cost</dt>
              <dd>${this.escapeHtml(item.priceRange)}</dd>
            </div>
            <div class="meta-item">
              <dt>Deposit Barrier</dt>
              <dd>${this.escapeHtml(item.depositRequirement)}</dd>
            </div>
            <div class="meta-item">
              <dt>Credit Check</dt>
              <dd>${this.escapeHtml(item.creditCheck)}</dd>
            </div>
            <div class="meta-item">
              <dt>Guitar Friendly</dt>
              <dd style="color: var(--amber-300);">${this.escapeHtml(item.guitarFriendlyRating || 'Respectful Hours')}</dd>
            </div>
          </div>

          <p class="resource-summary">${this.escapeHtml(item.summary)}</p>

          <ul class="resource-perks-list">
            ${(item.keyPerks || []).map(perk => `<li>${this.escapeHtml(perk)}</li>`).join('')}
          </ul>

          <div class="protip-box">
            <strong>Pro Tip:</strong> ${this.escapeHtml(item.proTip)}
          </div>
        </div>

        <div class="card-bottom">
          <a class="btn-primary card-action-btn" href="${this.escapeHtml(item.actionUrl)}" target="_blank" rel="noopener noreferrer">
            <span>${this.escapeHtml(item.actionLabel || 'View California Resource')}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // Move-In Cash & Gap Calculator
  // --------------------------------------------------------------------------
  setupCalculator() {
    const rentInput = document.getElementById('calc-rent');
    const depositInput = document.getElementById('calc-deposit');
    const feesInput = document.getElementById('calc-app-fees');
    const movingInput = document.getElementById('calc-moving');
    const bufferInput = document.getElementById('calc-buffer');
    const savingsInput = document.getElementById('calc-savings');
    const depositCapLabel = document.getElementById('deposit-cap-label');

    const updateCalc = () => {
      const rent = Math.max(0, parseFloat(rentInput?.value) || 0);
      let deposit = Math.max(0, parseFloat(depositInput?.value) || 0);
      const fees = Math.max(0, parseFloat(feesInput?.value) || 0);
      const moving = Math.max(0, parseFloat(movingInput?.value) || 0);
      const buffer = Math.max(0, parseFloat(bufferInput?.value) || 0);
      const savings = Math.max(0, parseFloat(savingsInput?.value) || 0);

      // Enforce / display AB 12 Law Cap
      if (depositCapLabel) {
        if (deposit > rent) {
          depositCapLabel.textContent = `Warning: Exceeds CA AB 12 Cap ($${rent})`;
          depositCapLabel.style.color = 'var(--rose-urgent)';
        } else {
          depositCapLabel.textContent = `Capped at 1 mo rent ($${rent})`;
          depositCapLabel.style.color = 'var(--amber-400)';
        }
      }

      const totalNeeded = rent + deposit + fees + moving + buffer;
      const gap = Math.max(0, totalNeeded - savings);

      // Update Output Elements
      const setTxt = (id, txt) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
      };

      setTxt('summary-rent', `$${rent.toLocaleString()}`);
      setTxt('summary-deposit', `$${deposit.toLocaleString()}`);
      setTxt('summary-fees', `$${fees.toLocaleString()}`);
      setTxt('summary-moving', `$${moving.toLocaleString()}`);
      setTxt('summary-buffer', `$${buffer.toLocaleString()}`);
      setTxt('summary-total-needed', `$${totalNeeded.toLocaleString()}`);
      setTxt('summary-savings', `-$${savings.toLocaleString()}`);
      setTxt('summary-gap-amount', `$${gap.toLocaleString()}`);

      const statusNote = document.getElementById('gap-status-text');
      const matchedBox = document.getElementById('matched-grants-container');

      if (gap === 0) {
        if (statusNote) {
          statusNote.textContent = "Your cash covers 100% of move-in requirements! Keep a prayer of gratitude.";
          statusNote.style.color = "var(--green-success)";
        }
        if (matchedBox) {
          matchedBox.innerHTML = `
            <h4 class="matched-grants-title">Target Move-In Ready:</h4>
            <ul class="matched-grants-list">
              <li>• You have sufficient funds to cover 1st month + AB 12 capped deposit.</li>
              <li>• Proceed to message hosts on Roomies or PadSplit immediately!</li>
            </ul>
          `;
        }
      } else {
        if (statusNote) {
          statusNote.textContent = `Bridge this $${gap.toLocaleString()} gap through county deposit grants and rapid re-housing.`;
          statusNote.style.color = "var(--text-cream)";
        }
        if (matchedBox) {
          matchedBox.innerHTML = `
            <h4 class="matched-grants-title">Recommended Programs to Bridge This Gap:</h4>
            <ul class="matched-grants-list">
              <li>• <strong>2-1-1 Rapid Re-Housing CES</strong>: Dial 211 to apply for deposit assistance (up to $${deposit}).</li>
              <li>• <strong>Pathways of Hope / Welcome Home OC</strong>: Direct move-in grants for Orange County.</li>
              <li>• <strong>PadSplit Alternative</strong>: Eliminate the $${deposit} deposit barrier entirely with weekly $220 rent.</li>
              <li>• <strong>St. Vincent de Paul Parish Helpline</strong>: Emergency bridge assistance up to $500–$1,000.</li>
            </ul>
          `;
        }
      }
    };

    [rentInput, depositInput, feesInput, movingInput, bufferInput, savingsInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', updateCalc);
      }
    });

    // Auto-sync deposit when rent changes if user hasn't customized it
    if (rentInput && depositInput) {
      rentInput.addEventListener('change', () => {
        depositInput.value = rentInput.value;
        updateCalc();
      });
    }

    updateCalc();
  }

  // --------------------------------------------------------------------------
  // 7-Day & 30-Day Move Fast Checklist
  // --------------------------------------------------------------------------
  setupChecklist() {
    this.renderChecklist();

    // Tab buttons
    const tabs = document.querySelectorAll('.checklist-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.checklistActiveTab = tab.getAttribute('data-tab');
        this.renderChecklist();
      });
    });

    // Add custom task form
    const addForm = document.getElementById('add-task-form');
    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('new-task-input');
        if (!input || !input.value.trim()) return;

        const newTask = {
          id: `custom-task-${Date.now()}`,
          phase: "urgent",
          title: input.value.trim(),
          description: "Custom task added by you.",
          actionTip: "Created on this device.",
          priority: "High",
          completed: false
        };

        this.tasks.unshift(newTask);
        this.saveTasks();
        input.value = '';
        this.renderChecklist();
      });
    }

    // Export plan to JSON
    const exportBtn = document.getElementById('btn-export-checklist');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const payload = {
          appName: "REALLY ROOMATES",
          exportedAt: new Date().toISOString(),
          tasks: this.tasks
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `really-roomates-plan-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Reset tasks
    const resetBtn = document.getElementById('btn-reset-checklist');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Reset all checklist tasks to default? This will clear custom tasks on this device.")) {
          this.tasks = [...DEFAULT_TASKS];
          this.saveTasks();
          this.renderChecklist();
        }
      });
    }
  }

  saveTasks() {
    localStorage.setItem('really_roomates_tasks_v1', JSON.stringify(this.tasks));
  }

  renderChecklist() {
    const container = document.getElementById('tasks-list-container');
    const progressText = document.getElementById('checklist-progress-text');
    const progressPercent = document.getElementById('checklist-progress-percent');
    const progressBar = document.getElementById('checklist-progress-bar');
    if (!container) return;

    // Calculate Completion
    const totalCount = this.tasks.length;
    const completedCount = this.tasks.filter(t => t.completed).length;
    const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    if (progressText) progressText.textContent = `Progress: ${completedCount} of ${totalCount} tasks completed`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;

    // Filter by active tab
    const tab = this.checklistActiveTab;
    const filteredTasks = this.tasks.filter(t => {
      if (tab === 'all') return true;
      if (tab === 'completed') return t.completed;
      return t.phase === tab;
    });

    if (filteredTasks.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; background: rgba(14, 10, 8, 0.7); border-radius: var(--radius-sm); border: 1px dashed var(--border-subtle);">
          <p class="text-muted" style="font-size: 0.9rem;">No tasks found in this category.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredTasks.map(task => `
      <div class="task-item-card ${task.completed ? 'completed' : ''}" id="card-${task.id}">
        <div class="task-checkbox-wrap">
          <input type="checkbox" class="task-checkbox" id="check-${task.id}" ${task.completed ? 'checked' : ''} aria-label="Mark ${this.escapeHtml(task.title)} complete">
        </div>
        <div class="task-content">
          <div class="task-header-row">
            <span class="task-title">${this.escapeHtml(task.title)}</span>
            <span class="task-priority-badge priority-${this.escapeHtml(task.priority || 'High')}">${this.escapeHtml(task.priority || 'High')}</span>
          </div>
          <p class="task-desc">${this.escapeHtml(task.description)}</p>
          ${task.actionTip ? `<p class="task-tip">💡 ${this.escapeHtml(task.actionTip)}</p>` : ''}
        </div>
      </div>
    `).join('');

    // Attach checkbox events
    filteredTasks.forEach(task => {
      const chk = document.getElementById(`check-${task.id}`);
      if (chk) {
        chk.addEventListener('change', () => {
          task.completed = chk.checked;
          this.saveTasks();
          this.renderChecklist();
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // Grace & Strings Sanctuary (Audio Chords + Devotions + Musician Pitch)
  // --------------------------------------------------------------------------
  setupGraceAndStrings() {
    const chordButtons = document.querySelectorAll('.chord-btn');
    const statusLabel = document.getElementById('audio-status-label');
    const soundwave = document.getElementById('audio-indicator');
    const heroStrum = document.getElementById('hero-chord-strum');

    const playChord = (chordName) => {
      guitarEngine.strumChord(chordName);
      if (statusLabel) statusLabel.textContent = `Strummed: ${chordName} (Acoustic Chime)`;
      if (soundwave) {
        soundwave.classList.add('pulsing');
        setTimeout(() => soundwave.classList.remove('pulsing'), 2500);
      }
    };

    chordButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chord = btn.getAttribute('data-chord');
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 400);
        playChord(chord);
      });
    });

    if (heroStrum) {
      heroStrum.addEventListener('click', () => {
        playChord('Cmaj9');
      });
    }

    // Toggle continuous peaceful chord progression
    const toggleProgressionBtn = document.getElementById('btn-toggle-progression');
    if (toggleProgressionBtn) {
      toggleProgressionBtn.addEventListener('click', () => {
        if (guitarEngine.isPlayingArpeggio) {
          guitarEngine.stopPeacefulProgression();
          toggleProgressionBtn.innerHTML = `<span>▶ Play Calming Progression</span>`;
          if (statusLabel) statusLabel.textContent = "Progression paused";
          if (soundwave) soundwave.classList.remove('pulsing');
        } else {
          toggleProgressionBtn.innerHTML = `<span>■ Pause Progression</span>`;
          if (soundwave) soundwave.classList.add('pulsing');
          guitarEngine.playPeacefulProgression((chord) => {
            if (statusLabel) statusLabel.textContent = `Acoustic Harmony: ${chord}`;
          });
        }
      });
    }

    // Setup Devotionals
    this.renderDevotion();

    const btnNextDevotion = document.getElementById('btn-next-devotion');
    const btnShuffleDevotion = document.getElementById('btn-shuffle-devotion');

    const nextDevotion = () => {
      this.currentDevotionIndex = (this.currentDevotionIndex + 1) % this.devotions.length;
      this.renderDevotion();
    };

    if (btnNextDevotion) btnNextDevotion.addEventListener('click', nextDevotion);
    if (btnShuffleDevotion) btnShuffleDevotion.addEventListener('click', nextDevotion);

    // Copy Musician Pitch Script
    const copyPitchBtn = document.getElementById('btn-copy-pitch');
    const pitchText = document.getElementById('pitch-script-text');
    if (copyPitchBtn && pitchText) {
      copyPitchBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pitchText.textContent.trim());
          copyPitchBtn.innerHTML = `<span>✓ Copied to Clipboard!</span>`;
          copyPitchBtn.style.background = "var(--green-bg)";
          copyPitchBtn.style.color = "#6ee7b7";
          setTimeout(() => {
            copyPitchBtn.innerHTML = `<span>📋 Copy Script</span>`;
            copyPitchBtn.style.background = "";
            copyPitchBtn.style.color = "";
          }, 2400);
        } catch (e) {
          alert("Text copied: " + pitchText.textContent.trim());
        }
      });
    }
  }

  renderDevotion() {
    const item = this.devotions[this.currentDevotionIndex] || this.devotions[0];
    if (!item) return;

    // Update banner scripture
    const bannerQuote = document.getElementById('banner-scripture-text');
    const bannerVerse = document.getElementById('banner-scripture-verse');
    if (bannerQuote) bannerQuote.textContent = item.scripture;
    if (bannerVerse) bannerVerse.textContent = `${item.verse} • ${item.theme}`;

    // Update Sanctuary card devotion
    const cardVerse = document.getElementById('devotion-card-verse');
    const cardQuote = document.getElementById('devotion-card-quote');
    const cardTheme = document.getElementById('devotion-card-theme');
    const cardReflection = document.getElementById('devotion-card-reflection');
    const cardPrayer = document.getElementById('devotion-card-prayer');

    if (cardVerse) cardVerse.textContent = item.verse;
    if (cardQuote) cardQuote.textContent = item.scripture;
    if (cardTheme) cardTheme.textContent = item.theme;
    if (cardReflection) cardReflection.textContent = item.reflection;
    if (cardPrayer) cardPrayer.innerHTML = `<strong>Prayer:</strong> ${this.escapeHtml(item.prayer)}`;
  }

  // --------------------------------------------------------------------------
  // Interactive Walkthrough / Onboarding Tour Modal
  // --------------------------------------------------------------------------
  setupTourModal() {
    const modal = document.getElementById('tour-modal');
    const openBtn = document.getElementById('btn-open-tour');
    const closeBtn = document.getElementById('btn-close-tour');
    const skipBtn = document.getElementById('btn-tour-skip');
    const nextBtn = document.getElementById('btn-tour-next');
    const prevBtn = document.getElementById('btn-tour-prev');

    const openTour = () => {
      this.currentTourStep = 0;
      this.renderTourStep();
      if (modal) modal.classList.add('open');
    };

    const closeTour = () => {
      if (modal) modal.classList.remove('open');
      localStorage.setItem('really_roomates_tour_seen', 'true');
    };

    if (openBtn) openBtn.addEventListener('click', openTour);
    if (closeBtn) closeBtn.addEventListener('click', closeTour);
    if (skipBtn) skipBtn.addEventListener('click', closeTour);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTour();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentTourStep < this.tourSteps.length - 1) {
          this.currentTourStep++;
          this.renderTourStep();
        } else {
          closeTour();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentTourStep > 0) {
          this.currentTourStep--;
          this.renderTourStep();
        }
      });
    }

    // Auto-launch tour on first visit
    if (!localStorage.getItem('really_roomates_tour_seen')) {
      setTimeout(() => {
        openTour();
      }, 700);
    }
  }

  renderTourStep() {
    const step = this.tourSteps[this.currentTourStep];
    if (!step) return;

    const tag = document.getElementById('tour-step-tag');
    const title = document.getElementById('tour-step-title');
    const body = document.getElementById('tour-step-body');
    const prevBtn = document.getElementById('btn-tour-prev');
    const nextBtn = document.getElementById('btn-tour-next');
    const dotsContainer = document.getElementById('tour-dots-container');

    if (tag) tag.textContent = step.tag;
    if (title) title.textContent = step.title;
    if (body) body.textContent = step.body;

    if (prevBtn) {
      prevBtn.disabled = this.currentTourStep === 0;
    }

    if (nextBtn) {
      nextBtn.textContent = this.currentTourStep === this.tourSteps.length - 1 ? "Finish Tour ✓" : "Next →";
    }

    if (dotsContainer) {
      dotsContainer.innerHTML = this.tourSteps.map((_, i) => `
        <span class="tour-dot ${i === this.currentTourStep ? 'active' : ''}"></span>
      `).join('');
    }
  }

  // --------------------------------------------------------------------------
  // Utility Actions (Print, Help)
  // --------------------------------------------------------------------------
  setupUtilityActions() {
    const printBtn = document.getElementById('btn-print-page');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const helpBtn = document.getElementById('btn-open-help');
    if (helpBtn) {
      helpBtn.addEventListener('click', () => {
        const helpSection = document.getElementById('help-center');
        if (helpSection) {
          helpSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  // Helper to prevent XSS
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

// Instantiate and initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new ReallyRoomatesApp();
  app.init();
});
