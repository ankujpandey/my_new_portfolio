"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToastContainer } from "@/components/toast-container";
import { useToast } from "@/hooks/use-toast";
import { validateForm } from "@/utils/validation";
import {
  SiNodedotjs,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiReact,
  SiJavascript,
  SiMysql,
  SiMongodb,
  SiGit,
  SiJenkins,
  SiLinux,
  SiPython,
  SiNextdotjs,
  SiLeetcode,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import {
  FaDatabase,
  FaCode,
  FaProjectDiagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Code,
  Palette,
  Smartphone,
  Server,
  Zap,
  Users,
  Target,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Send,
  Loader2,
  Briefcase,
  Instagram,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";

type CertificateDetails = {
  gpa?: string;
  honors?: string;
  relevantCourses?: string[];
  projects?: string[];
  achievements?: string[];
};

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [expandedExperience, setExpandedExperience] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedProjects, setExpandedProjects] = useState<{
    [key: string]: boolean;
  }>({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: [] as string[],
    email: [] as string[],
    message: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const projects = [
    {
      title: "Whisper Wave",
      description:
        "A fun web app for receiving anonymous whispers with a simple, secure interface and message suggestions powered by Gemini.",
      images: [
        "/pic1_whisper_wave.jpeg?height=300&width=500",
        "/pic2_whisper_wave.jpeg?height=300&width=500",
        "/pic3_whisper_wave.jpeg?height=300&width=500",
        "/pic4_whisper_wave.jpeg?height=300&width=500",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Shadcn/UI",
        "Zod",
        "OAuth",
        "Gemini API",
      ],
      liveUrl: "https://whisper-wave-pied.vercel.app",
      githubUrl: "https://github.com/ankujpandey/whisper-wave",
    },
    {
      title: "Projexure",
      description:
        "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      images: [
        "/pic1_projexure.png?height=300&width=500",
        "/pic2_projexure.png?height=300&width=500",
        "/pic3_projexure.png?height=300&width=500",
        "/pic4_projexure.png?height=300&width=500",
        "/pic5_projexure.png?height=300&width=500",
        "/pic6_projexure.png?height=300&width=500",
      ],
      technologies: [
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma ORM",
        "Redux Toolkit",
        "TypeScript",
        "Tailwind CSS",
        "MUI",
      ],
      liveUrl: "https://github.com/ankujpandey/Projexure",
      githubUrl: "https://github.com/ankujpandey/Projexure",
    },
    {
      title: "Weather Dashboard",
      description:
        "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      images: [
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
        "/placeholder.svg?height=300&width=500",
      ],
      technologies: ["React", "API Integration", "Chart.js", "Tailwind"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "offerings",
        "projects",
        "qualifications",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [projects]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Form handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear errors for this field when user starts typing
    if (formErrors[field as keyof typeof formErrors].length > 0) {
      setFormErrors(prev => ({ ...prev, [field]: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(
      formData.name,
      formData.email,
      formData.message
    );

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      toast.error(
        "😅 Oops! Something's not right.",
        "Could you check the form and try again?"
      );
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          "📩 Message sent!",
          "I'll get back to you soon. Thanks for reaching out!"
        );
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({ name: [], email: [], message: [] });
      } else {
        toast.error(
          "😬 Couldn't send your message.",
          "The server took a nap! Please try again in a bit."
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        "🚨 Uh-oh! Something went wrong.",
        "Try again or send me a direct email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleExperience = (index: number) => {
    setExpandedExperience(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleProject = (experienceIndex: number, projectIndex: number) => {
    const key = `${experienceIndex}-${projectIndex}`;
    setExpandedProjects(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const skills = [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "ReactJS", icon: SiReact, color: "#61DAFB" },
    { name: "Java", icon: DiJava, color: "#007396" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Jenkins", icon: SiJenkins, color: "#D33833" },
    { name: "Linux", icon: SiLinux, color: "#FCC624" },
    { name: "NoSQL", icon: FaDatabase, color: "#4A90E2" },
    { name: "Microservices", icon: FaProjectDiagram, color: "#8B5CF6" },
    { name: "VS Code", icon: FaCode, color: "#007ACC" },
    { name: "OOPs", icon: FaProjectDiagram, color: "#FFB547" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  ];

  // const skills = [
  //   {
  //     name: "Node.js",
  //     icon: SiNodedotjs,
  //     description:
  //       "Event‑driven JavaScript runtime built on Chrome’s V8 engine",
  //     color: "#339933",
  //   },
  //   {
  //     name: "Express.js",
  //     icon: SiExpress,
  //     description: "Minimal and flexible Node.js web application framework",
  //     color: "#000000",
  //   },
  //   {
  //     name: "HTML5",
  //     icon: SiHtml5,
  //     description: "The standard markup language for creating web pages",
  //     color: "#E34F26",
  //   },
  //   {
  //     name: "CSS3",
  //     icon: SiCss3,
  //     description: "Styling language used to design web pages",
  //     color: "#1572B6",
  //   },
  //   {
  //     name: "Bootstrap",
  //     icon: SiBootstrap,
  //     description: "Responsive, mobile‑first front‑end component library",
  //     color: "#7952B3",
  //   },
  //   {
  //     name: "Tailwind CSS",
  //     icon: SiTailwindcss,
  //     description: "Utility‑first CSS framework for rapid UI development",
  //     color: "#06B6D4",
  //   },
  //   {
  //     name: "ReactJS",
  //     icon: SiReact,
  //     description: "Library for building composable and reactive UIs",
  //     color: "#61DAFB",
  //   },
  //   {
  //     name: "Java",
  //     icon: DiJava,
  //     description: "Statically typed, class‑based programming language",
  //     color: "#007396",
  //   },
  //   {
  //     name: "JavaScript",
  //     icon: SiJavascript,
  //     description: "High‑level, dynamic scripting language of the Web",
  //     color: "#F7DF1E",
  //   },
  //   {
  //     name: "MySQL",
  //     icon: SiMysql,
  //     description: "Open‑source relational database management system",
  //     color: "#4479A1",
  //   },
  //   {
  //     name: "MongoDB",
  //     icon: SiMongodb,
  //     description: "Document‑oriented NoSQL database",
  //     color: "#47A248",
  //   },
  //   {
  //     name: "Git",
  //     icon: SiGit,
  //     description: "Distributed version‑control system for tracking code",
  //     color: "#F05032",
  //   },
  //   {
  //     name: "Jenkins",
  //     icon: SiJenkins,
  //     description: "Automation server for continuous integration/delivery",
  //     color: "#D33833",
  //   },
  //   {
  //     name: "Linux",
  //     icon: SiLinux,
  //     description: "Open‑source UNIX‑like operating system kernel",
  //     color: "#FCC624",
  //   },
  //   {
  //     name: "NoSQL",
  //     icon: FaDatabase,
  //     description: "Non‑relational database design for flexible schemas",
  //     color: "#4A90E2",
  //   },
  //   {
  //     name: "Microservices",
  //     icon: FaProjectDiagram,
  //     description: "Architectural style for building modular services",
  //     color: "#8B5CF6",
  //   },
  //   {
  //     name: "VS Code",
  //     icon: FaCode,
  //     description: "Lightweight but powerful source code editor",
  //     color: "#007ACC",
  //   },
  //   {
  //     name: "OOPs",
  //     icon: FaProjectDiagram,
  //     description: "Object‑oriented programming principles",
  //     color: "#FFB547",
  //   },
  //   {
  //     name: "Python",
  //     icon: SiPython,
  //     description: "High‑level programming language for backend & AI",
  //     color: "#3776AB",
  //   },
  //   {
  //     name: "Next.js",
  //     icon: SiNextdotjs,
  //     description: "React framework for hybrid static & server rendering",
  //     color: "#000000",
  //   },
  // ];

  const offerings = [
    {
      icon: Server,
      title: "Backend Development",
      description:
        "I design robust, scalable backend systems using Node.js and Express.js, focusing on modularity, performance, and maintainability.",
      features: [
        "Custom REST APIs",
        // "Loan & EMI Engines",
        "Microservices Architecture",
        "Secure Data Handling & Verification",
      ],
    },
    {
      icon: Zap,
      title: "System Integration & Automation",
      description:
        "I streamline business workflows with third-party API integrations to enhance efficiency and reliability.",
      features: [
        "API orchestration & versioning",
        "Webhook & event-driven pipelines",
        "Scheduled jobs",
        "Error handling & alerting",
      ],
    },
    {
      icon: Code,
      title: "Modern Frontend Engineering",
      description:
        "I build clean, responsive, and accessible interfaces with React, Next.js, and Tailwind CSS for high-performance dashboards and apps.",
      features: [
        "React & Next.js",
        "Responsive Design",
        "Performance Optimization",
        "Modern UI/UX",
      ],
    },
    // {
    //   icon: Smartphone,
    //   title: "Product Development",
    //   description:
    //     "I turn ideas into functional full-stack products, from rapid MVPs to complex applications, with a focus on usability and scalability.",
    //   features: [
    //     "End-to-End App Design",
    //     "Whisper Wave & Projexure",
    //     "Full-Stack Architecture",
    //     "Rapid Prototyping & Deployment",
    //   ],
    // },
    // {
    //   icon: Users,
    //   title: "Tech Consulting",
    //   description:
    //     "I guide early-stage teams in setting up clean codebases, secure backend logic, and scalable project architecture.",
    //   features: [
    //     "Code Structure & Patterns",
    //     "API & Auth Strategy",
    //     "Documentation & Handoff",
    //     "Best Practices Implementation",
    //   ],
    // },
  ];

  const qualifications = [
    {
      type: "Education",
      title: "B.Sc. Programme in (Computer Science)",
      institution: "St. Stephen’s College, University of Delhi",
      period: "2016 - 2019",
      location: "Delhi, India",
      description: "Studied Physics, Mathematics, and Computer Science.",
      icon: BookOpen,
      certificateImages: [], // No certificate images for education
      certificateDetails: {
        relevantCourses: [
          "Data Structures & Algorithms",
          "Software Engineering Principles",
          "Database Management Systems",
          "Modern Web Development",
        ],
        projects: [
          "Developed a collaborative task management system (Group Project)",
          "Built a basic e-commerce prototype (Final Year Project)",
        ],
      } as CertificateDetails,
    },
    {
      type: "Education",
      title: "Master of Computer Applications (MCA)",
      institution: "Dept. of Comp. Sci., University of Delhi",
      period: "2020 - 2022",
      location: "Delhi, India",
      description: "Specialized in Software Engineering and Web Technologies.",
      icon: BookOpen,
      certificateImages: [], // No certificate images for education
      certificateDetails: {
        relevantCourses: [
          "Data Structures & Algorithms",
          "Software Engineering Principles",
          "Database Management Systems",
          "Modern Web Development",
        ],
        projects: [
          "Developed a collaborative task management system (Group Project)",
          "Built a basic e-commerce prototype (Final Year Project)",
        ],
      } as CertificateDetails,
    },
    {
      type: "Internship",
      title: "Software Development Intern",
      institution: "Faircent",
      period: "Jan 2023 - Jun 2023",
      location: "Gurgaon, India",
      description: "Contributed to frontend and backend development projects.",
      icon: Briefcase,
      certificateImages: [
        "/intern_certificate.jpg?height=400&width=600&text=Internship+Certificate",
      ],
    },
    // {
    //   type: "Certification",
    //   title: "AWS Certified Developer – Associate",
    //   institution: "Amazon Web Services",
    //   period: "2023",
    //   location: "Online",
    //   description:
    //     "Validated skills in cloud application development using AWS services",
    //   icon: Award,
    //   certificateImages: [
    //     "/placeholder.svg?height=400&width=600&text=Degree+Certificate",
    //   ],
    // },
  ];

  const experience = [
    {
      title: "Software Developer",
      company: "Fairassets Technologies India Pvt Ltd",
      period: "Jul 2023 - Present",
      description:
        "Developed and enhanced multiple loan management and verification modules, improving EMI workflows and credit risk assessment pipelines.",
      shortDescription:
        "Full-stack development for loan workflows, automation systems, and real estate platform integration.",
      fullDescription:
        "At Fairassets, I built scalable backend systems and user interfaces for financial products, streamlining credit evaluation, borrower onboarding, and EMI deductions. I engineered key services like CKYC automation, mandate processing, PAN/GST/ITR verification, and real-time offer generation. I also contributed to the development of 'Fairkeys' — a real estate sub-product — working on tenant risk policies and admin modules.",
      techStack: [
        "Node.js",
        "Express.js",
        "React",
        "MongoDB",
        "MySQL",
        "AWS",
        "Cashfree API",
        "Karza API",
        "IDCentral",
        "Tailwind CSS",
        "Next.js",
      ],
      detailedProjects: [
        {
          title: "EMI Deduction & Statement System",
          period: "Jul 2023 - Oct 2023",
          description:
            "Built a more reliable and accurate EMI deduction engine and redesigned the borrower passbook and SOA systems.",
          outcome:
            "Improved EMI success rate and reduced error logs, leading to better customer experience.",
          techStack: ["Node.js", "MySQL", "AWS", "React", "Cron Jobs"],
        },
        {
          title: "Credit Verification Rule Engine",
          period: "Sep 2023 - Dec 2023",
          description:
            "Created a custom rule engine using Experian and CRIF data for assessing user eligibility and fraud checks.",
          outcome:
            "Increased successful verifications by 50% and reduced fraudulent entries.",
          techStack: ["Node.js", "MongoDB", "Karza API", "Experian API"],
        },
        {
          title: "PAN, GST, ITR, EPFO Verifications",
          period: "Nov 2023 - Jan 2024",
          description:
            "Integrated government document verification APIs to assess borrowers' compliance and financial stability.",
          outcome:
            "Streamlined onboarding by reducing manual verification overhead.",
          techStack: ["IDCentral API", "Karza API", "Node.js", "AWS"],
        },
        {
          title: "Fairkeys Real Estate Platform",
          period: "Feb 2024 - Present",
          description:
            "Worked on user registration, email notifications, and risk assessment logic for real estate tenants.",
          outcome:
            "Improved property onboarding experience and automated validation workflows.",
          techStack: ["React", "Node.js", "MongoDB", "AWS SES", "Next.js"],
        },
        {
          title: "Offer Generator System",
          period: "Mar 2024 - May 2024",
          description:
            "Built backend logic to dynamically calculate loan offers, interest, tenure, and processing fees.",
          outcome:
            "Automated end-to-end loan offering pipeline, saving manual computation time.",
          techStack: ["Node.js", "Express", "MongoDB"],
        },
      ],
    },
    {
      title: "Software Developer Intern",
      company: "Fairassets Technologies India Pvt Ltd",
      period: "Jan 2023 - Jul 2023",
      description:
        "Built borrower platform features from scratch, including onboarding, dashboards, EMI calculators, and admin management tools.",
      shortDescription:
        "End-to-end development of borrower web app and admin dashboard for loan management.",
      fullDescription:
        "During my internship, I led the frontend and backend development for borrower onboarding and dashboard modules. I integrated Aadhaar and biometric verification, built EMI calculator functionality, and enabled admins to manage loans and generate PDF reports. I also built wallet tracking, profile management, and agent control tools.",
      techStack: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "ID Analyzer API",
        "PDFKit",
      ],
      detailedProjects: [
        {
          title: "Borrower Web Platform",
          period: "Jan 2023 - Apr 2023",
          description:
            "Developed borrower onboarding flows, authentication, and EMI calculators with biometric verification integration.",
          outcome:
            "Enabled secure user registration and enhanced eligibility checks.",
          techStack: ["React", "Tailwind", "ID Analyzer", "Node.js"],
        },
        {
          title: "Admin Dashboard for Loan Operations",
          period: "Apr 2023 - Jul 2023",
          description:
            "Built tools for loan monitoring, agent management, and PDF generation of borrower profiles.",
          outcome:
            "Reduced operational friction for internal teams and improved transparency of borrower data.",
          techStack: ["React", "Node.js", "MongoDB", "PDFKit"],
        },
      ],
    },
  ];

  const socialLinks = [
    {
      Icon: Github,
      url: "https://github.com/ankujpandey",
    },
    {
      Icon: Linkedin,
      url: "https://www.linkedin.com/in/ankuj-pandey",
    },
    {
      Icon: Instagram,
      url: "https://www.instagram.com/ankujpandey/",
    },
    // {
    //   Icon: SiLeetcode,
    //   url: "mailto:ankuj.mca20.du@gmail.com",
    // },
    {
      Icon: Mail,
      url: "mailto:ankuj.mca20.du@gmail.com",
    },
  ];

  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            isDarkMode ? "bg-cyan-400/20" : "bg-orange-500/20"
          } animate-pulse`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animationDelay: `${i * 0.5}s`,
            transform: `translate(${mousePosition.x * 0.01 * (i + 1)}px, ${
              mousePosition.y * 0.01 * (i + 1)
            }px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/10 text-white"
          : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-900"
      }`}>
      <ToastContainer />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900/80 backdrop-blur-md border-b border-slate-700"
            : "bg-white/80 backdrop-blur-md border-b border-orange-200"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection("home")}
              className={`font-bold text-xl transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent animate-pulse"
                  : "bg-gradient-to-r from-orange-600 via-rose-600 to-emerald-600 bg-clip-text text-transparent animate-pulse"
              }`}>
              AP.dev
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                "home",
                "about",
                "skills",
                "offerings",
                "projects",
                "qualifications",
                "experience",
                "contact",
              ].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-200 hover:scale-105 ${
                    activeSection === item
                      ? `${
                          isDarkMode
                            ? "text-amber-400 font-medium transform scale-105"
                            : "text-orange-600 font-medium transform scale-105"
                        }`
                      : `${
                          isDarkMode
                            ? "text-slate-300 hover:text-amber-400"
                            : "text-slate-600 hover:text-orange-600"
                        }`
                  }`}>
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  isDarkMode
                    ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                    : "bg-orange-100 text-slate-600 hover:bg-orange-200"
                }`}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden transition-transform duration-200 hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div
              className={`md:hidden py-4 border-t transition-all duration-300 ${
                isDarkMode ? "border-slate-700" : "border-orange-200"
              }`}>
              {[
                "home",
                "about",
                "skills",
                "offerings",
                "projects",
                "qualifications",
                "experience",
                "contact",
              ].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-2 capitalize transition-colors duration-200 ${
                    isDarkMode
                      ? "text-slate-300 hover:text-amber-400"
                      : "text-slate-600 hover:text-orange-600"
                  }`}>
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <FloatingElements />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile: Image First */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float">
                <div
                  className={`absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse ${
                    isDarkMode
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                      : "bg-gradient-to-r from-orange-400 to-rose-500"
                  }`}></div>
                <div
                  className={`absolute inset-4 rounded-full blur-2xl opacity-30 animate-pulse animation-delay-1000 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-purple-500 to-cyan-600"
                      : "bg-gradient-to-r from-emerald-500 to-orange-600"
                  }`}></div>
                <div
                  className="
                            relative 
                            w-64 h-64
                            sm:w-80 sm:h-80
                            md:w-80 md:h-80
                            rounded-full
                            overflow-hidden
                            border-4 border-white shadow-2xl
                            transition-transform duration-500
                            hover:scale-105
                          ">
                  <Image
                    src="/my_image.png"
                    alt="Ankuj Pandey Profile"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                    className="object-cover [object-position:50%_15%]"
                  />
                </div>

                {/* Orbiting Elements */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div
                    className={`absolute top-0 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                      isDarkMode ? "bg-cyan-500" : "bg-orange-500"
                    }`}></div>
                  <div
                    className={`absolute bottom-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 translate-y-1/2 ${
                      isDarkMode ? "bg-blue-500" : "bg-rose-500"
                    }`}></div>
                  <div
                    className={`absolute left-0 top-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                      isDarkMode ? "bg-purple-400" : "bg-emerald-400"
                    }`}></div>
                  <div
                    className={`absolute right-0 top-1/2 w-3 h-3 rounded-full transform translate-x-1/2 -translate-y-1/2 ${
                      isDarkMode ? "bg-cyan-400" : "bg-orange-400"
                    }`}></div>
                </div>
              </div>
            </div>

            {/* Mobile: Content Second */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-4">
                <div className="animate-fade-in-up">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                    <span
                      className={`bg-clip-text text-transparent animate-gradient-x ${
                        isDarkMode
                          ? "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
                          : "bg-gradient-to-r from-orange-600 via-rose-600 to-emerald-600"
                      }`}>
                      Hello, I'm
                    </span>
                    <br />
                    <span
                      className={`animate-slide-in-right ${
                        isDarkMode ? "text-white" : "text-slate-800"
                      }`}>
                      Ankuj Pandey
                    </span>
                  </h1>
                </div>

                <div className="animate-fade-in-up animation-delay-200">
                  <p
                    className={`text-lg sm:text-xl lg:text-2xl font-light ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}>
                    Full Stack Web Developer
                  </p>
                </div>

                <div className="animate-fade-in-up animation-delay-400">
                  <p
                    className={`text-base sm:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0 ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}>
                    I craft beautiful, responsive web applications with modern
                    technologies. Passionate about creating exceptional user
                    experiences and clean, maintainable code.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
                <Button
                  size="lg"
                  className={`transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isDarkMode
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                      : "bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700"
                  }`}
                  onClick={() => scrollToSection("projects")}>
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={`transform hover:scale-105 transition-all duration-300 ${
                    isDarkMode
                      ? "border-slate-600 hover:bg-slate-800 bg-transparent text-white"
                      : "border-orange-300 hover:bg-orange-50 bg-transparent"
                  }`}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-6 animate-fade-in-up animation-delay-800">
                {socialLinks.map(({ Icon, url }, index) => (
                  <Link
                    key={index}
                    href={url}
                    target="_blank"
                    className={`transform hover:scale-125 transition-all duration-300 hover:-translate-y-1 ${
                      isDarkMode
                        ? "text-slate-400 hover:text-cyan-400"
                        : "text-slate-600 hover:text-orange-600"
                    }`}>
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-20 text-center animate-bounce">
            <button
              onClick={() => scrollToSection("about")}
              className={`transition-colors duration-300 hover:scale-110 transform ${
                isDarkMode
                  ? "text-slate-400 hover:text-cyan-400"
                  : "text-slate-400 hover:text-orange-600"
              }`}>
              <ChevronDown className="h-8 w-8" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-800/50" : "bg-white"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              About Me
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1 text-justify">
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                I'm a passionate <strong>full-stack web developer</strong> with
                a strong grasp of both frontend and backend technologies. I
                specialize in{" "}
                <strong>React, Next.js, Node.js, and MongoDB</strong>, and enjoy
                building robust, scalable, and maintainable applications.
              </p>
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                I'm always eager to learn new technologies and continuously
                improve my development skills while focusing on delivering clean
                code and impactful user experiences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {[
                  { label: "Location", value: "Gurugram, India" },
                  { label: "Experience", value: "2+ Years" },
                  { label: "Email", value: "ankuj.mca20.du@gmail.com" },
                  { label: "Availability", value: "Open to opportunities" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="transform hover:scale-105 transition-transform duration-300">
                    <h3
                      className={`font-semibold mb-2 ${
                        isDarkMode ? "text-white" : "text-slate-800"
                      }`}>
                      {item.label}
                    </h3>
                    <p
                      className={
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative transform hover:scale-105 transition-transform duration-500 max-w-md mx-auto shadow-xl overflow-hidden rounded-lg lg:max-w-none">
                <video
                  src="/developer1.mp4"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div
                  className={`absolute inset-0 rounded-lg ${
                    isDarkMode
                      ? "bg-gradient-to-t from-cyan-600/20 to-transparent"
                      : "bg-gradient-to-t from-orange-600/20 to-transparent"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-900/50" : "bg-orange-50"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              Skills & Technologies
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
          </div>

          {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-orange-50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold text-white"
                      style={{ backgroundColor: skill.color }}>
                      {skill.icon ? <skill.icon /> : skill.name.charAt(0)}
                    </div>
                  </div>
                  <h3
                    className={`font-semibold mb-2 text-sm sm:text-base ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}>
                    {skill.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div> */}

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 lg:gap-5">
            {skills.map((skill, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-white hover:bg-orange-50"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-3 sm:p-4 text-center">
                  <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold text-white"
                      style={{ backgroundColor: skill.color }}>
                      {skill.icon ? <skill.icon /> : skill.name.charAt(0)}
                    </div>
                  </div>
                  <h3
                    className={`font-semibold text-xs sm:text-sm ${
                      isDarkMode ? "text-white" : "text-slate-800"
                    }`}>
                    {skill.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section
        id="offerings"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-800/50" : "bg-white"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              What I Offer
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
            {/* <p
              className={`mt-6 text-lg max-w-3xl mx-auto ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}>
              Comprehensive web development services tailored to bring your
              ideas to life with modern technologies and best practices.
            </p> */}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {offerings.map((offering, index) => {
              const IconComponent = offering.icon;
              return (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group ${
                    isDarkMode
                      ? "bg-slate-800 hover:bg-slate-700"
                      : "bg-white hover:bg-orange-50"
                  }`}>
                  <CardContent className="p-6">
                    <div
                      className={`mb-4 p-3 rounded-lg w-fit ${
                        isDarkMode
                          ? "bg-gradient-to-r from-cyan-100 to-blue-100"
                          : "bg-gradient-to-r from-orange-100 to-rose-100"
                      }`}>
                      <IconComponent
                        className={`h-6 w-6 ${
                          isDarkMode ? "text-cyan-600" : "text-orange-600"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-3 ${
                        isDarkMode ? "text-white" : "text-slate-800"
                      }`}>
                      {offering.title}
                    </h3>
                    <p
                      className={`mb-4 ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}>
                      {offering.description}
                    </p>
                    <ul className="space-y-2">
                      {offering.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className={`flex items-center text-sm ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}>
                          <Target
                            className={`h-3 w-3 mr-2 ${
                              isDarkMode ? "text-cyan-400" : "text-orange-500"
                            }`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-900/50" : "bg-orange-50"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              Featured Projects
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isDarkMode={isDarkMode}
                // nextImage={nextImage}
                // prevImage={prevImage}
                // stopAutoPlay={stopAutoPlay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section
        id="qualifications"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-800/50" : "bg-white"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              Education & Certifications
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
            <p
              className={`mt-4 text-sm ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}>
              💡 Click on any card to view certificate details
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {qualifications.map((qual, index) => {
                const IconComponent = qual.icon;
                const isFlipped = flippedCards[index];

                return (
                  <div key={index} className="perspective-1000 h-[280px]">
                    <div
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                      onClick={() => toggleCardFlip(index)}>
                      {/* Front of card */}
                      <Card
                        className={`absolute inset-0 w-full h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 backface-hidden ${
                          isDarkMode ? "bg-slate-800" : "bg-white"
                        }`}>
                        <CardContent className="p-6 h-full flex flex-col">
                          <div className="flex items-start space-x-4 flex-1">
                            <div
                              className={`p-3 rounded-lg flex-shrink-0 ${
                                isDarkMode
                                  ? "bg-gradient-to-r from-cyan-100 to-blue-100"
                                  : "bg-gradient-to-r from-orange-100 to-rose-100"
                              }`}>
                              <IconComponent
                                className={`h-6 w-6 ${
                                  isDarkMode
                                    ? "text-cyan-600"
                                    : "text-orange-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {qual.type}
                                </Badge>
                                <div
                                  className={`flex items-center text-xs ${
                                    isDarkMode
                                      ? "text-slate-400"
                                      : "text-slate-500"
                                  }`}>
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {qual.period}
                                </div>
                              </div>
                              <h3
                                className={`text-lg font-semibold mb-1 ${
                                  isDarkMode ? "text-white" : "text-slate-800"
                                }`}>
                                {qual.title}
                              </h3>
                              <p
                                className={`font-medium mb-2 ${
                                  isDarkMode
                                    ? "text-cyan-400"
                                    : "text-orange-600"
                                }`}>
                                {qual.institution}
                              </p>
                              <div
                                className={`flex items-center text-xs mb-3 ${
                                  isDarkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}>
                                <MapPin className="h-3 w-3 mr-1" />
                                {qual.location}
                              </div>
                              <p
                                className={`text-sm ${
                                  isDarkMode
                                    ? "text-slate-300"
                                    : "text-slate-600"
                                }`}>
                                {qual.description}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-slate-400" : "text-slate-500"
                              }`}>
                              Click to view details →
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Back of card - Certificate Images Only */}
                      <Card
                        className={`absolute inset-0 w-full h-full border-0 shadow-lg rotate-y-180 backface-hidden overflow-hidden ${
                          isDarkMode ? "bg-slate-800" : "bg-white"
                        }`}>
                        <CardContent className="p-0 h-full">
                          {qual.type === "Education" ? (
                            // Education Details
                            <div className="h-full flex flex-col p-4 overflow-auto">
                              <h4
                                className={`text-lg font-semibold mb-2 ${
                                  isDarkMode ? "text-white" : "text-slate-800"
                                }`}>
                                Academic Details
                              </h4>
                              <ul className="space-y-1 text-sm flex-1">
                                {qual.certificateDetails?.gpa && (
                                  <li
                                    className={
                                      isDarkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }>
                                    <strong>GPA:</strong>{" "}
                                    {qual.certificateDetails.gpa}
                                  </li>
                                )}
                                {qual.certificateDetails?.honors && (
                                  <li
                                    className={
                                      isDarkMode
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }>
                                    <strong>Honors:</strong>{" "}
                                    {qual.certificateDetails.honors}
                                  </li>
                                )}
                                {qual.certificateDetails?.relevantCourses &&
                                  qual.certificateDetails?.relevantCourses
                                    ?.length > 0 && (
                                    <li
                                      className={
                                        isDarkMode
                                          ? "text-slate-300"
                                          : "text-slate-600"
                                      }>
                                      <strong>Relevant Courses:</strong>{" "}
                                      {qual.certificateDetails.relevantCourses.join(
                                        ", "
                                      )}
                                    </li>
                                  )}
                                {qual.certificateDetails?.projects &&
                                  qual.certificateDetails?.projects?.length >
                                    0 && (
                                    <li
                                      className={
                                        isDarkMode
                                          ? "text-slate-300"
                                          : "text-slate-600"
                                      }>
                                      <strong>Projects:</strong>{" "}
                                      {qual.certificateDetails?.projects.join(
                                        ", "
                                      )}
                                    </li>
                                  )}
                                {qual.certificateDetails?.achievements &&
                                  qual.certificateDetails?.achievements
                                    ?.length > 0 && (
                                    <li
                                      className={
                                        isDarkMode
                                          ? "text-slate-300"
                                          : "text-slate-600"
                                      }>
                                      <strong>Achievements:</strong>{" "}
                                      {qual.certificateDetails?.achievements.join(
                                        ", "
                                      )}
                                    </li>
                                  )}
                                {/* Fallback */}
                                {!qual.certificateDetails?.gpa &&
                                  !qual.certificateDetails?.honors &&
                                  (!qual.certificateDetails?.relevantCourses ||
                                    qual.certificateDetails.relevantCourses
                                      .length === 0) &&
                                  (!qual.certificateDetails?.projects ||
                                    qual.certificateDetails.projects.length ===
                                      0) &&
                                  (!qual.certificateDetails?.achievements ||
                                    qual.certificateDetails.achievements
                                      .length === 0) && (
                                    <li
                                      className={
                                        isDarkMode
                                          ? "text-slate-300"
                                          : "text-slate-600"
                                      }>
                                      Focused on foundational knowledge and
                                      practical application.
                                    </li>
                                  )}
                              </ul>
                              <div className="mt-4 text-center">
                                <p
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-slate-400"
                                      : "text-slate-500"
                                  }`}>
                                  Click to go back →
                                </p>
                              </div>
                            </div>
                          ) : (
                            // Non-Education Certificate Images
                            <div className="h-full relative">
                              {qual.certificateImages?.length > 0 ? (
                                <div className="h-full relative">
                                  <Image
                                    src={
                                      qual.certificateImages[0] ||
                                      "/placeholder.svg"
                                    }
                                    alt={`${qual.title} Certificate`}
                                    fill
                                    className="object-contain p-4"
                                  />

                                  {qual.certificateImages.length > 1 && (
                                    <>
                                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {qual.certificateImages.map(
                                          (_, imgIndex) => (
                                            <div
                                              key={imgIndex}
                                              className={`w-2 h-2 rounded-full ${
                                                imgIndex === 0
                                                  ? "bg-white"
                                                  : "bg-white/50"
                                              }`}
                                            />
                                          )
                                        )}
                                      </div>
                                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                                        {qual.certificateImages.length}{" "}
                                        certificates
                                      </div>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <div className="h-full flex items-center justify-center">
                                  <div className="text-center">
                                    <Award
                                      className={`h-16 w-16 mx-auto mb-4 ${
                                        isDarkMode
                                          ? "text-slate-600"
                                          : "text-slate-400"
                                      }`}
                                    />
                                    <p
                                      className={`text-sm ${
                                        isDarkMode
                                          ? "text-slate-400"
                                          : "text-slate-500"
                                      }`}>
                                      Certificate image coming soon
                                    </p>
                                  </div>
                                </div>
                              )}

                              <div className="absolute top-4 left-4">
                                <button
                                  className={`text-xs px-2 py-1 rounded ${
                                    isDarkMode
                                      ? "bg-slate-700 text-slate-300"
                                      : "bg-white/80 text-slate-600"
                                  }`}>
                                  ← Click to go back
                                </button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {/* <section
        id="experience"
        className={`py-12 sm:py-20 transition-colors duration-300 ${isDarkMode ? "bg-slate-900/50" : "bg-orange-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-slate-800"}`}
            >
              Work Experience
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => (
              <div key={index} className="relative">
                {index !== experience.length - 1 && (
                  <div
                    className={`absolute left-4 sm:left-6 top-16 w-0.5 h-full ${
                      isDarkMode
                        ? "bg-gradient-to-b from-amber-600 to-orange-600"
                        : "bg-gradient-to-b from-orange-600 to-rose-600"
                    }`}
                  ></div>
                )}

                <div className="flex items-start space-x-4 sm:space-x-6 mb-8 sm:mb-12">
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-amber-600 to-orange-600"
                        : "bg-gradient-to-r from-orange-600 to-rose-600"
                    }`}
                  >
                    <div className="w-3 h-3 sm:w-6 sm:h-6 bg-white rounded-full"></div>
                  </div>

                  <Card
                    className={`flex-1 border-0 shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                      isDarkMode ? "bg-slate-800" : "bg-white"
                    }`}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3
                          className={`text-lg sm:text-xl font-semibold ${isDarkMode ? "text-white" : "text-slate-800"}`}
                        >
                          {exp.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="w-fit mt-2 sm:mt-0 text-xs sm:text-sm"
                        >
                          {exp.period}
                        </Badge>
                      </div>
                      <p
                        className={`font-medium mb-3 text-sm sm:text-base ${
                          isDarkMode ? "text-cyan-400" : "text-orange-600"
                        }`}
                      >
                        {exp.company}
                      </p>
                      <p
                        className={`leading-relaxed text-sm sm:text-base ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
                      >
                        {exp.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section
        id="experience"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-900/50" : "bg-orange-50"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              Work Experience
            </h2>
            <div
              className={`w-20 h-1 mx-auto ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
            <p
              className={`mt-4 text-sm ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}>
              💡 Click on any experience to view detailed information
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {experience.map((exp, index) => {
              const isExpanded = expandedExperience[index];

              return (
                <div key={index} className="relative">
                  {index !== experience.length - 1 && (
                    <div
                      className={`absolute left-4 sm:left-6 top-20 w-0.5 h-full ${
                        isDarkMode
                          ? "bg-gradient-to-b from-amber-600 to-orange-600"
                          : "bg-gradient-to-b from-orange-600 to-rose-600"
                      }`}></div>
                  )}

                  <div className="flex items-start space-x-4 sm:space-x-6 mb-8 sm:mb-12">
                    <div
                      className={`flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 ${
                        isDarkMode
                          ? "bg-gradient-to-r from-amber-600 to-orange-600"
                          : "bg-gradient-to-r from-orange-600 to-rose-600"
                      }`}>
                      <div className="w-3 h-3 sm:w-6 sm:h-6 bg-white rounded-full"></div>
                    </div>

                    <Card
                      className={`flex-1 border-0 shadow-lg transition-all duration-300 cursor-pointer ${
                        isDarkMode
                          ? "bg-slate-800 hover:bg-slate-750"
                          : "bg-white hover:bg-orange-25"
                      } ${
                        isExpanded ? "transform scale-105" : "hover:scale-102"
                      }`}
                      onClick={() => toggleExperience(index)}>
                      <CardContent className="p-4 sm:p-6">
                        {/* Header - Always visible */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <h3
                            className={`text-lg sm:text-xl font-semibold ${
                              isDarkMode ? "text-white" : "text-slate-800"
                            }`}>
                            {exp.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                            <Badge
                              variant="outline"
                              className="text-xs sm:text-sm">
                              {exp.period}
                            </Badge>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                isExpanded ? "rotate-180" : ""
                              } ${
                                isDarkMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            />
                          </div>
                        </div>

                        <p
                          className={`font-medium mb-3 text-sm sm:text-base ${
                            isDarkMode ? "text-cyan-400" : "text-orange-600"
                          }`}>
                          {exp.company}
                        </p>

                        <p
                          className={`leading-relaxed text-sm sm:text-base ${
                            isDarkMode ? "text-slate-300" : "text-slate-600"
                          }`}>
                          {isExpanded
                            ? exp.fullDescription
                            : exp.shortDescription}
                        </p>

                        {/* Expanded content */}
                        {isExpanded && (
                          <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                            {/* Tech Stack */}
                            <div>
                              <h4
                                className={`text-sm font-semibold mb-3 ${
                                  isDarkMode ? "text-white" : "text-slate-800"
                                }`}>
                                Tech Stack
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.techStack.map((tech, techIndex) => (
                                  <Badge
                                    key={techIndex}
                                    variant="secondary"
                                    className={`text-xs ${
                                      isDarkMode
                                        ? "bg-slate-700 text-slate-300"
                                        : "bg-orange-100 text-orange-700"
                                    }`}>
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Detailed Projects */}
                            <div>
                              <h4
                                className={`text-sm font-semibold mb-3 ${
                                  isDarkMode ? "text-white" : "text-slate-800"
                                }`}>
                                Detailed Project Experience{" "}
                                {/* ({exp.detailedProjects.length} projects) */}
                              </h4>
                              {exp.detailedProjects.map(
                                (project, projectIndex) => {
                                  const projectKey = `${index}-${projectIndex}`;
                                  const isRespExpanded =
                                    expandedProjects[projectKey];

                                  return (
                                    <div className="space-y-1">
                                      <div
                                        key={projectIndex}
                                        className={`transition-all duration-300 ${
                                          isDarkMode
                                            ? "border-slate-600"
                                            : "border-orange-300"
                                        }`}>
                                        <div
                                          className="p-3 cursor-pointer flex items-center justify-between"
                                          onClick={e => {
                                            e.stopPropagation();
                                            setExpandedProjects(prev => ({
                                              ...prev,
                                              [projectKey]: !prev[projectKey],
                                            }));
                                          }}>
                                          <div className="flex items-start flex-1">
                                            {/* <Code
                                                      className={`h-3 w-3 mr-2 mt-0.5 flex-shrink-0 ${
                                                        isDarkMode ? "text-cyan-400" : "text-orange-500"
                                                      }`} */}
                                            <Target
                                              className={`h-3 w-3 mr-2 mt-0.5 flex-shrink-0 ${
                                                isDarkMode
                                                  ? "text-cyan-400"
                                                  : "text-orange-500"
                                              }`}
                                            />
                                            <span
                                              className={`text-xs ${
                                                isDarkMode
                                                  ? "text-slate-300"
                                                  : "text-slate-600"
                                              }`}>
                                              {project.title.split(".")[0]}
                                              ...
                                            </span>
                                          </div>
                                          <ChevronDown
                                            className={`h-3 w-3 transition-transform duration-300 ${
                                              isRespExpanded ? "rotate-180" : ""
                                            } ${
                                              isDarkMode
                                                ? "text-slate-400"
                                                : "text-slate-500"
                                            }`}
                                          />
                                        </div>

                                        {isRespExpanded && (
                                          <div className="px-3 pb-3 border-t border-slate-200 dark:border-slate-600">
                                            <div className="pt-3 space-y-3">
                                              <div>
                                                <h6
                                                  className={`text-xs font-semibold mb-1 ${
                                                    isDarkMode
                                                      ? "text-white"
                                                      : "text-slate-800"
                                                  }`}>
                                                  What I Did
                                                </h6>
                                                <p
                                                  className={`text-xs ${
                                                    isDarkMode
                                                      ? "text-slate-300"
                                                      : "text-slate-600"
                                                  }`}>
                                                  {project.description}
                                                </p>
                                              </div>

                                              <div>
                                                <h6
                                                  className={`text-xs font-semibold mb-1 ${
                                                    isDarkMode
                                                      ? "text-white"
                                                      : "text-slate-800"
                                                  }`}>
                                                  What I Achieved
                                                </h6>
                                                <p
                                                  className={`text-xs ${
                                                    isDarkMode
                                                      ? "text-slate-300"
                                                      : "text-slate-600"
                                                  }`}>
                                                  {/* Sample achievements - you can customize these */}
                                                  {project.outcome}
                                                </p>
                                              </div>

                                              <div>
                                                <h6
                                                  className={`text-xs font-semibold mb-1 ${
                                                    isDarkMode
                                                      ? "text-white"
                                                      : "text-slate-800"
                                                  }`}>
                                                  Key Technologies
                                                </h6>
                                                <div className="flex flex-wrap gap-1">
                                                  {/* Sample tech stack for each project */}
                                                  {project.techStack
                                                    .slice(0, 3)
                                                    .map((tech, techIdx) => (
                                                      <Badge
                                                        key={techIdx}
                                                        variant="outline"
                                                        className={`text-xs ${
                                                          isDarkMode
                                                            ? "border-slate-500 text-slate-400"
                                                            : "border-orange-400 text-orange-700"
                                                        }`}>
                                                        {tech}
                                                      </Badge>
                                                    ))}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>

                            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                              <p
                                className={`text-xs text-center ${
                                  isDarkMode
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}>
                                Click to collapse ↑
                              </p>
                            </div>
                          </div>
                        )}

                        {!isExpanded && (
                          <div className="mt-4 text-center">
                            <p
                              className={`text-xs ${
                                isDarkMode ? "text-slate-400" : "text-slate-500"
                              }`}>
                              Click to view details ↓
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-12 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-800/50" : "bg-white"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-800"
              }`}>
              Get In Touch
            </h2>
            <div
              className={`w-20 h-1 mx-auto mb-6 ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-orange-600"
                  : "bg-gradient-to-r from-orange-600 to-rose-600"
              }`}></div>
            <p
              className={`text-base sm:text-lg max-w-2xl mx-auto ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}>
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can work together!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    value: "ankuj.mca20.du@gmail.com",
                  },
                  {
                    icon: Linkedin,
                    title: "LinkedIn",
                    value: "linkedin.com/in/ankuj-pandey",
                  },
                  {
                    icon: Github,
                    title: "GitHub",
                    value: "github.com/ankujpandey",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300">
                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode
                          ? "bg-gradient-to-r from-cyan-100 to-blue-100"
                          : "bg-gradient-to-r from-orange-100 to-rose-100"
                      }`}>
                      <contact.icon
                        className={`h-5 w-5 sm:h-6 sm:w-6 ${
                          isDarkMode ? "text-cyan-600" : "text-orange-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDarkMode ? "text-white" : "text-slate-800"
                        }`}>
                        {contact.title}
                      </h3>
                      <p
                        className={`text-sm sm:text-base ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}>
                        {contact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Card
                className={`border-0 shadow-xl transform hover:scale-105 transition-transform duration-300 ${
                  isDarkMode ? "bg-slate-800" : "bg-white"
                }`}>
                <CardContent className="p-6 sm:p-8">
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-slate-300" : "text-slate-700"
                        }`}>
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 ${
                          isDarkMode
                            ? "border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            : "border-slate-300 bg-white text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        } ${
                          formErrors.name.length > 0
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Your Name"
                        disabled={isSubmitting}
                      />
                      {formErrors.name.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.name[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-slate-300" : "text-slate-700"
                        }`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 ${
                          isDarkMode
                            ? "border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            : "border-slate-300 bg-white text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        } ${
                          formErrors.name.length > 0
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                      {formErrors.email.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.email[0]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          isDarkMode ? "text-slate-300" : "text-slate-700"
                        }`}>
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 resize-none
                        ${
                          isDarkMode
                            ? "border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            : "border-slate-300 bg-white text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        }
                        ${
                          formErrors.message.length > 0
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="Tell me about your project..."
                        disabled={isSubmitting}
                      />
                      {formErrors.message.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">
                          {formErrors.message[0]}
                        </p>
                      )}
                      <p
                        className={`text-xs mt-1 ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}>
                        {formData.message.length}/1000 characters
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                        isDarkMode
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                          : "bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700"
                      }`}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 sm:py-12 ${
          isDarkMode ? "bg-slate-900" : "bg-slate-900"
        } text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div
              className={`font-bold text-xl sm:text-2xl mb-4 ${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent"
              }`}>
              Ankuj Pandey
            </div>
            <p className="text-slate-400 mb-6 text-sm sm:text-base">
              Full Stack Web Developer • Creating Digital Experiences
            </p>
            <div className="flex justify-center space-x-6 mb-6 sm:mb-8">
              {socialLinks.map(({ Icon, url }, index) => (
                <Link
                  key={index}
                  href={url}
                  target="_blank"
                  className="text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </Link>
              ))}
            </div>
            <Separator className="bg-slate-700 mb-4 sm:mb-6" />
            <p className="text-slate-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Ankuj Pandey. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
