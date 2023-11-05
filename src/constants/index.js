// accounts = Pending, Canceled, Approved
// enroll = Pending, Completed, Ended
// user = Verified, Unverified
// batch = Pending, Ongoing, Ended

export const mainNavs = [
  {
    id: "home",
    title: "হোম",
    href: "/",
    sub: [],
  },
  {
    id: "courses",
    title: "কোর্সসমূহ",
    href: false,
    sub: [
      {
        id: "hsc-ict-crush-course",
        title: "এইচএসসি আইসিটি ক্র্যাশ কোর্স",
        href: "/courses/hsc-ict-crush-course",
        icon: "/courses/ict.svg",
      },
      {
        id: "web-design",
        title: "ওয়েব ডিজাইন",
        href: "/courses/web-design",
        icon: "/courses/web-design.svg",
      },
      {
        id: "wordpress-theme-development",
        title: "ওয়ার্ডপ্রেস থিম ডেভেলপমেন্ট",
        href: "/courses/wordpress-theme-development",
        icon: "/courses/wptheme.svg",
      },
      {
        id: "wordpress-plugin-development",
        title: "ওয়ার্ডপ্রেস প্লাগিন ডেভেলপমেন্ট",
        href: "/courses/wordpress-plugin-development",
        icon: "/courses/wpplugin.svg",
      },
      {
        id: "thinking-in-react",
        title: "থিংকিং ইন রিয়াক্ট",
        href: "/courses/thinking-in-react",
        icon: "/courses/react.svg",
      },
      {
        id: "fullstack-with-nextjs",
        title: "ফুলস্ট্যাক উইথ নেক্সট জেএস",
        href: "/courses/fullstack-with-nextjs",
        icon: "/courses/nextjs.svg",
      },
    ],
  },
  {
    id: "why-our-course",
    title: "কেন আমাদের কোর্স",
    href: "/#why-our-course",
    sub: [],
  },
  {
    id: "student-feedback",
    title: "স্টুডেন্ট ফিডব্যাক",
    href: "/#student-feedback",
    sub: [],
  },
];

export const whyUs = [
  {
    id: 1,
    title:
      "আমরা আপনার শেখার যাত্রায় একটি প্রতিশ্রুতিমূলক সহায়ক। হাতে কলমে শেখানোর সাথে সাথে ছোট ছোট সমস্যাগুলোকে গুরত্বসহকারে সমাধানের জন্য সার্বক্ষনিক সাপোর্ট।",
  },
  {
    id: 2,
    title:
      "আপনাকে পেশাদার স্কিল এবং দক্ষতা সরবরাহ করতে সাহায্য করতে প্রস্তুত। আমরা আপনাকে প্রয়োজনীয় সমর্থন এবং পর্যাপ্ত গাইডেন্স দিব, যা আপনাকে নিজের লক্ষ্য এবং লক্ষ্যে পৌঁছানোর দিকে সাহায্য করবে।",
  },
  {
    id: 3,
    title:
      "ওয়েব ডিজাইন এবং ডেভেলপমেন্টে ব্যাপক অভিজ্ঞতা সহ শিল্প বিশেষজ্ঞদের কাছ থেকে শিখুন। আমাদের প্রশিক্ষকরা শিক্ষার্থীদের সফল হতে সাহায্য করার জন্য নির্দেশিকা, অন্তর্দৃষ্টি এবং পরামর্শ প্রদানের জন্য নিবেদিত।",
  },
  {
    id: 4,
    title:
      "ক্যারিয়ার ডেভেলপমেন্ট রিসোর্স, চাকরির নিয়োগ সহায়তা, এবং নেটওয়ার্কিং তৈরিতে সর্বোচ্চ সাহায্য পাবেন। শিক্ষার্থীদের আইটি সেক্টরে সফল ক্যারিয়ার শুরু করতে সাহায্য করতে প্রতিশ্রুতিবদ্ধ।",
  },
];

export const features = [
  {
    id: 1,
    title: "রিয়েলটাইম মাল্টিমেডিয়া ক্লাস",
    icon: "/multimedia.svg",
    description:
      "রিয়েলটাইম মাল্টিমেডিয়া ক্লাসে আমরা অত্যন্ত আকর্ষণীয় এবং সবোর্ণ শিক্ষা সরবরাহ করছি।",
  },
  {
    id: 2,
    title: "সমস্যা সমাধানের জন্য রেকর্ডেড ভিডিও",
    icon: "/video.svg",
    description:
      "রেকর্ডেড ভিডিও একটি প্রভাবশালী উপায় যাতে সমস্যা সমাধানে আরও ভালো বোঝানো এবং প্রতিনিধিত্ব করা যায়।",
  },
  {
    id: 3,
    title: "অ্যাসাইনমেন্ট ও প্রজেক্ট",
    icon: "/assignment.svg",
    description:
      "অ্যাসাইনমেন্ট ও প্রজেক্ট ব্যবহার করে আমরা শিক্ষার প্রক্রিয়াকে আরো গভীরভাবে সম্পন্ন করি।",
  },
  {
    id: 4,
    title: "ফ্রিল্যান্সিং সাপোর্ট ও টিম এ কাজ",
    icon: "/support.svg",
    description:
      "সফল ফ্রিল্যান্সিং ক্যারিয়ার শুরু করার জন্য সাপোর্ট ও একটি সক্ষম টিমের সাথে কাজ করার সুযোগ।",
  },
];

export const faqs = [
  {
    id: 1,
    question: "আপনাদের প্রদত্ত কোর্সের ফি কি এবং তা কীভাবে প্রদান করতে হবে?",
    answer:
      "আমাদের কোর্সের ফি প্রত্যেকটি কোর্সের সাথে সংযুক্ত থাকে। ফি প্রদানের জন্য আমরা বিভিন্ন পেমেন্ট প্রক্রিয়া, যেমন মোবাইল ব্যাংকিং বিকাশ,নগদ, রকেট অথবা হ্যান্ড ক্যাশ ইত্যাদি মাধ্যমে প্রদান করতে পারবে।",
  },
  {
    id: 2,
    question: "কোর্সটি আমার জন্য কেমন হবে। আমি কোর্সে কী কী শিখতে পারব?",
    answer:
      "সকল কোর্স সরাবরাহকারীগন বলেন যে কোর্সটি শিক্ষার্থীদের মত ডিজাইন করা হয়েছে বা কোর্স তোমার জন্য। আর আমরা 3টা ক্লাস শিক্ষার্থীদের জন্য উন্মুক্ত রাখি এবং তাকে উপলুব্ধ করতে সময় দেয় কোর্সটি তার জন্য কি? কোর্স ভিত্তিক আলোচ্য বিষয়গুলো কোর্স মডিউলে দেওয়া আছে।",
  },
  {
    id: 3,
    question: "কোর্সের সময়সূচি কি?",
    answer:
      "কোর্সের সময়সূচি আমরা আমাদের ওয়েবসাইটে প্রদান করি। ওয়েবসাইটে লগ ইন করে অথবা যোগ দিয়ে সময়সূচি দেখতে পারবে। সময়সূচি সম্পর্কে সম্পূর্ণ বিবরণ এবং ক্লাসের তারিখ এবং সময় ওয়েবসাইটি পেয়ে যাবে।",
  },
  {
    id: 4,
    question: "আমি কীভাবে কোর্সে নিবন্ধন করতে পারি?",
    answer:
      "ওয়েবসাইটি লগইন/সাইন আপের মাধ্যমে একটি প্রোফাইল তৈরি করে। সেই প্রোফাইল থেকে নির্দিষ্ট কোর্সে নিবন্ধন করতে পারবে। কোর্স গ্রহণের সকল প্রক্রিয়া ভিডিও আকারে প্রকাশ থাকবে।",
  },
  {
    id: 5,
    question: "কোর্স শেষে কি সার্টিফিকেট প্রদান করা হয়?",
    answer:
      "আইসিটি কোর্সের জন্য কোন সার্টিফিকেট সরাবরাহ করা হয় না। অন্য কোর্সগুলোর জন্য অনলাইন প্রতিষ্ঠানিক সার্টিফিকেট সরাবরাহ করা হবে।",
  },
  {
    id: 6,
    question: "আমি কোর্স শেষে কোন ধরনের সহায়ক সহায়ক সেবা পেতে পারি?",
    answer:
      "হ্যাঁ, কোর্স শেষে আপনি আমাদের পর্যাপ্ত সহায়ক সেবা পেতে পারেন। আমরা প্রশিক্ষণ শেষে ক্যারিয়ার সাপোর্ট, নিয়োগ সাপোর্ট, প্রথম চাকরি সাপোর্ট, সফলতার পথে সাপোর্ট এবং অন্যান্য সাহায্য সেবা সরবরাহ করি।",
  },
  {
    id: 7,
    question: "কোর্সে অধ্যয়নের জন্য কোন সরঞ্জাম প্রয়োজন?",
    answer:
      "কোর্সে অধ্যয়নের জন্য আপনাকে কোন সব সরঞ্জাম প্রয়োজন হবে সেটি প্রতিটি কোর্সের তথ্যে দেওয়া হবে। প্রায়শই কম্পিউটার এবং ইন্টারনেট সংযোগ আপনি প্রয়োজন হবে, আবার কিছু কোর্সে বিশেষ সফটওয়্যার বা উপকরণ প্রয়োজন হতে পারে।",
  },
];

export const loginSlider = [
  {
    title:
      "মাল্টিমেডিয়া ক্লাসের মাধ্যমে হাতে কলমে শেখার পর রেকর্ডেড ডিভিওর সুবিধা",
    image: "/multimedia-class.svg",
  },
  {
    title: "অন্যকে যেকোন কোর্সে ভর্তি করে আপনিও পেয়ে যান 10% কমিশন",
    image: "/earn-from-course.svg",
  },
];

export const profileSideNav = [
  {
    id: 1,
    title: "প্রোফাইল",
    href: "/profile",
  },
  {
    id: 2,
    title: "আমার কোর্সসমূহ",
    href: "/profile/my-courses",
  },
  {
    id: 3,
    title: "পেমেন্ট বিবরণ",
    href: "/profile/payment-history",
  },
  {
    id: 4,
    title: "উপস্থিতি রিপোর্ট",
    href: "/profile/present-report",
  },
  {
    id: 5,
    title: "রেফারেল ইনরোল",
    href: "/profile/referral-enroll",
  },
  {
    id: 6,
    title: "উইথড্রো বিবরণ",
    href: "/profile/withdraw-history",
  },
  {
    id: 7,
    title: "পাসওয়ার্ড পরিবর্তন",
    href: "/profile/change-password",
  },
];

export const dashboardSideNav = [
  {
    id: 1,
    titleE: "Discover",
    title: "ডিসকভার",
    navs: [
      {
        id: 1,
        icon: "LayoutDashboard",
        href: "/dashboard",
        titleE: "Dashboard",
        title: "ড্যাশবোর্ড",
      },
      {
        id: 2,
        icon: "Grid2X2",
        href: "/dashboard/browse",
        titleE: "Browse",
        title: "ব্রাউজ",
      },
    ],
  },
  {
    id: 2,
    titleE: "Academy",
    title: "একাডেমী",
    navs: [
      {
        id: 1,
        icon: "GanttChartSquare",
        href: "/dashboard/courses",
        titleE: "Courses",
        title: "কোর্সসমূহ",
      },
      {
        id: 2,
        icon: "ClipboardPaste",
        href: "/dashboard/enrolls/requests",
        titleE: "Enroll Requests",
        title: "ইনরোল রিকুয়েস্টস",
      },
      {
        id: 3,
        icon: "GraduationCap",
        href: "/dashboard/enrolls/completed",
        titleE: "Enroll Completed",
        title: "ইনরোল কমপ্লিটেড",
      },
      {
        id: 4,
        icon: "CalendarCheck2",
        href: "/dashboard/courses/completed",
        titleE: "Course Completed",
        title: "কোর্স কমপ্লিটেড",
      },
      {
        id: 5,
        icon: "Shapes",
        href: "/dashboard/batches",
        titleE: "Batches",
        title: "ব্যাচসমূহ",
      },
      {
        id: 6,
        icon: "ClipboardEdit",
        href: "/dashboard/attendance",
        titleE: "Attendance",
        title: "অ্যাটেনডেন্স",
      },
      {
        id: 7,
        icon: "ThumbsUp",
        href: "/dashboard/feedbacks",
        titleE: "Feedbacks",
        title: "ফিডব্যাক",
      },
    ],
  },
  {
    id: 3,
    titleE: "Accounts",
    title: "অ্যাকাউন্টস",
    navs: [
      {
        id: 1,
        icon: "BadgeDollarSign",
        href: "/dashboard/earnings",
        titleE: "Earnings",
        title: "আর্নিং",
      },
      {
        id: 2,
        icon: "FolderOpen",
        href: "/dashboard/reports",
        titleE: "Reports",
        title: "রিপোর্টস",
      },
    ],
  },
  {
    id: 4,
    titleE: "Human Resources",
    title: "হিউম্যান রিসোর্সেস",
    navs: [
      {
        id: 1,
        icon: "Users2",
        href: "/dashboard/users",
        titleE: "Users",
        title: "ইউজারস",
      },
    ],
  },
];
