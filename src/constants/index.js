import facebook_logo from "../img/facebook_logo.png";
import facebook_logo_red from "../img/facebook_logo_red.png";
import instagram_logo from "../img/instagram_logo.png";
import instagram_logo_red from "../img/instagram_logo_red.png";
import linked_in_logo from "../img/linked_in_logo.png";
import linked_in_logo_red from "../img/linked_in_logo_red.png";
import black_arrow_up from "../img/black_arrow_up.png";
import right_arrow_white from "../img/right_arrow_white.png";
import right_arrow_red from "../img/arrow_right_red.png";
import caret_down_red from "../img/caret_down_red.png";
import caret_down_grey from "../img/caret_down_grey.png";
import searchMobileResults from "../img/search_mobile_results.jpg";
import caret_left_red from "../img/caret_left_red.png";
import caret_right_red from "../img/caret_right_red.png";
import caret_right_grey from "../img/caret_right_grey.png";
import caret_left_grey from "../img/caret_left_grey.png";
import emptyStateResults from "../img/empty_state_results.jpg";
import kenanga_logo from "../img/kenanga_logo.png";
import burger_logo from "../img/burger_logo.png";
import search from "../img/search.png";
import searchIconHamburgerMenu from "../img/search_hamburger_menu.jpg";
import eAccess from "../img/eAccess.png";
import eAccess_hover from "../img/eAccess_hover.png";
import single_article_img from "../img/single_article.jpg";
import email_logo from "../img/email_logo.png";
import printer_logo from "../img/printer_logo.png";
import twitter_logo from "../img/twitter_logo.png";
import whatsapp_logo from "../img/whatsapp_logo.png";

export const SINGLEARTICLE = {
    name: "Fintech And Asset Management Firms Disrupting Fund Distribution",
    Heading: "Related Articles",
    noticeHeading: "Latest Notices",
    date: "November 2, 2020",
    tags: ["The Edge Market"],
    tag: "Tags",
    by: "By",
    img: single_article_img,
    author: "Tan Zhai Yun",
    share: "Share",
    shareLogo: [
      facebook_logo,
      linked_in_logo,
      twitter_logo,
      whatsapp_logo,
      email_logo,
      printer_logo,
    ],
    shareLink: [
      // "https://www.facebook.com/dialog/feed?app_id=585480489089632&link=https://www.recall.bersih.org/&redirect_uri=https://www.recall.bersih.org/",
      "https://www.facebook.com/sharer.php?u={url}",
      "https://www.linkedin.com/shareArticle?mini=true&title={title}&url={url}",
      "https://twitter.com/intent/tweet?text={title}{url} ",
      "https://web.whatsapp.com/send?text={title}: {url}",
      "mailto:?subject={title}&body=Check out this site:{url}",
      "",
    ],
    articles: {
      title: "Related Articles",
      headings: ["The Edge Market", "The Edge Market"],
      main: [
        "Fintech And Asset Management Firms Disrupting Fund Distribution",
        "Fintech And Asset Management Firms Disrupting Fund Distribution",
      ],
      misc: ["Read More", "Read More"],
    },
    text: [
      {
        text: [
          "A scheduled server maintenance exercise will be carried out this weekend. We apologise for any inconvenience that this may cause and we thank you for your patience.For enquiries, please email us at investorservices@kenanga.com.my. ",
        ],
      },
    ],
  };

export const BUTTON = {
  primary_image: right_arrow_white,
  secondary_image: right_arrow_red,
};

export const DROPDOWN = {
  caret: caret_down_red,
  caretGrey: caret_down_grey,
};

export const SEARCH_RESULTS = {
  breadcrumb: "Search",
  menu: searchMobileResults,
  leftCaret: caret_left_red,
  rightCaret: caret_right_red,
  rightCaretBlack: caret_right_grey,
  leftCaretBlack: caret_left_grey,

  emptyState: {
    image: emptyStateResults,
    title: "No matching search results",
    message:
      "Try adjusting your search or filter to find what you’re looking for.",
  },
};

export const NAVBAR = {
  logo: kenanga_logo,
  burger: burger_logo,
  search: search,
  searchIconHamburgerMenu: searchIconHamburgerMenu,
  eAccess: eAccess,
  eAccess_hover: eAccess_hover,
  solotab: {
    label2: "Choice of Profession",
    links2: "/Recruitment Agent",
  },
  tabs: [
    {
      label: "Invest for You",
      tabs: [
        "Our Mission",
        "Investment Mechanism & Philosophy",
        "Stewardship Code",
        "Principle of Waqf",
        "Accolades for MARC",
      ],
    },
    {
      label: "Connect with Us",
      tabs: [
        "Book An Appointment",
        "Contact Investor Services",
        "Head Office & Branch Locator",
      ],
    },
    // {
    //   label: "Choice of Profession",
    //   tabs: [
    //     "Recruitment Agent",
    //     "Qualification",
    //     "Our Plan for You",
    //     "Lifestyle Rewards",
    //   ],
    //   links: [
    //     "Recruitment Agent",
    //     "Recruitment Agent#Qualification",
    //     "Recruitment Agent#Our_Plan_for_You",
    //     "Recruitment Agent#Lifestyle_Rewards",
    //   ],
    // },
  ],
};

export const LoginCardData = {
  buttonText: "Visit",
  main: "eAccess",
  sub: "Lorem ipsum dolor sit amet",
  visitCard: [
    {
      header: "OMNI",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      href: "",
    },
    {
      header: "KenEASY",
      description:
        "Allow clients convenient access to view their financial portfolios. It is accessible 24 hours a day.",
      href: "https://www.kenangainvestors.com.my/KenEasy/KIB.Application.Web/",
    },
    {
      header: "AIMs",
      description:
        "Adviser-Investor Management System (AIMs) provides agents to handle performance and 24x7 access productivity.",
      href: "https://www.kenangainvestors.com.my/aims/kib.application.web/aimsdefault/default.aspx",
    },
    {
      header: "Kenanga i-Invest",
      description:
        "Invest in our EPF Approved Funds online using the EPF i-Invest facility within the i-Akaun (Member) platform.",
      href: "https://secure.kwsp.gov.my/member/member/login",
    },
    {
      header: "PRS Online Enrolment",
      description:
        "Service developed by PPA for our clients to select our OnePRS funds and save for their future in Private Retirement Scheme.",
      href: "https://prsenrolment.ppa.my/kenanga/",
    },
  ],
};

export const FOOTER = {
  upArrow: black_arrow_up,
  socialMedia: [
    {
      logo: facebook_logo,
      logo_red: facebook_logo_red,
      link: "https://www.facebook.com/KenangaGroup",
    },
    {
      logo: instagram_logo,
      logo_red: instagram_logo_red,
      link: "https://www.instagram.com/kenangagroupofficial",
    },
    {
      logo: linked_in_logo,
      logo_red: linked_in_logo_red,
      link: "https://www.linkedin.com/company/kenanga/",
    },
  ],
  data: [
    {
      heading: "Company",
      links: [
        {
          name: "Who We Are",
          link: "/AboutUs",
        },
        {
          name: "Our Structure",
          link: "/AboutUs/OurStructure",
        },
        {
          name: "Our Directorate",
          link: "/AboutUs/OurStructure#tab",
        },
        {
          name: "Our Personnel Professional",
          link: "/AboutUs/OurStructure/PersonnelProfessional#tab",
        },
        {
          name: "Our Investment Committee",
          link: "/AboutUs/OurInvestmentCommittee",
        },
        {
          name: "Delegation Function",
          link: "/AboutUs/DelegationFunction",
        },
        {
          name: "Shariah Adviser",
          link: "/AboutUs/DelegationFunction",
        },
        {
          name: `Kenanga Group`,
          link: "/AboutUs/KenangaGroup",
        },
      ],
    },
    {
      heading: "Products",
      links: [
        { name: "Conventional Fund", link: "/products/conventional_fund" },
        { name: "Shariah Fund", link: "/products/shariah_fund" },
        { name: "Wholesale Fund", link: "/products/wholesale_fund" },
        { name: "OnePRS by Kenanga", link: "/products/one_prs_by_kenanga" },
        { name: "OneETF by Kenanga", link: "/products/one_etf_by_kenanga" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { name: "Articles", link: "/article" },
        {
          name: "Videos & Webinar",
          link: "https://www.kenanga.com.my/news/#filter=.videos",
        },
        {
          name: "Market Outlook & Review",
          link: "https://www.kenanga.com.my/market-insights/#filter=.quarterly-market-outlook",
        },
        {
          name: "Events",
          link: "https://www.kenanga.com.my/news/#filter=.events",
        },
        { name: "Download Centre", link: "/download_center" },
        { name: "Frequently Asked Questions", link: "/faq" },
        // { name: "Calculators", link: "#" },
      ],
    },
  ],

  footerCopyright:
    "Kenanga Investors Berhad 199501024358 . All Rights Reserved.",

  footerLink: [
    { name: "Disclaimer", link: "/disclaimer" },
    { name: "Privacy Policy", link: "/privacyPolicy" },
    { name: "Internet Risk", link: "/internetRisk" },
    { name: "Terms & Conditions", link: "/termsAndConditions" },
    // { name: "Sitemap", link: "#" },
    { name: "SIDREC", link: "https://sidrec.com.my/" },
  ],
};

export const NEW_FOOTER_INFO_LINKS = [
  {
    heading: "Company",
    links: [
      {
        name: "Who We Are",
        link: "/AboutUs",
      },
      {
        name: "Our Structure",
        link: "/AboutUs/OurStructure",
        subLink: [
          {
            name: "Our Directorate",
            link: "/AboutUs/OurStructure#tab",
          },
          {
            name: "Our Personnel Professional",
            link: "/AboutUs/OurStructure/PersonnelProfessional#tab",
          },
        ],
      },

      {
        name: "Our Investment Committee",
        link: "/AboutUs/OurInvestmentCommittee",
      },
      {
        name: "Delegation Function",
        link: "/AboutUs/DelegationFunction",
        subLink: [
          {
            name: "External Fund Manager",
            link: "",
          },
          {
            name: "Shariah Adviser",
            link: "/AboutUs/DelegationFunction",
          },
          {
            name: "Trustee",
            link: "",
          },
        ],
      },
      {
        name: "Shariah Adviser",
        link: "/AboutUs/DelegationFunction",
      },
      {
        name: "Award History",
        link: "/AboutUs/AwardHistory",
      },
      {
        name: `Kenanga Group`,
        link: "/AboutUs/KenangaGroup",
      },
    ],
  },
  {
    heading: "Products",
    links: [
      { name: "Conventional Fund", link: "/products/conventional_fund" },
      { name: "Shariah Fund", link: "/products/shariah_fund" },
      { name: "Wholesale Fund", link: "/products/wholesale_fund" },
      { name: "OnePRS by Kenanga", link: "/products/one_prs_by_kenanga" },
      { name: "OneETF by Kenanga", link: "/products/one_etf_by_kenanga" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { name: "Articles", link: "/article" },
      {
        name: "Videos & Webinar",
        link: "",
        // link: "https://www.kenanga.com.my/news/#filter=.videos",
        target: true,
      },
      {
        name: "Market Outlook & Review",
        link: "",
        // link: "https://www.kenanga.com.my/market-insights/#filter=.quarterly-market-outlook",
        target: true,
      },
      {
        name: "Events",
        link: "",
        // link: "https://www.kenanga.com.my/news/#filter=.events",
        target: true,
      },
      { name: "Download Centre", link: "/download_center" },
      { name: "Frequently Asked Questions", link: "/faq" },
      {
        name: "Calculators",
        link: "/Retirement Calculator",
        subLink: [
          {
            name: "Retirement Calculator",
            link: "/Retirement Calculator",
          },
          {
            name: "EPF Calculator",
            link: "/EPF Calculator",
          },
        ],
      },
    ],
  },
];

export const TOOLTIPTEXT = "Awaiting Content For Development";
