# LearnOmni.org 🚀

> **Open source learning platform for mastering Omni Analytics**

A modern e-learning platform built with Next.js 15, featuring comprehensive analytics courses, YouTube video integration, intelligent search, and markdown-based content management.

![LearnOmni Platform](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🌟 Features

### 📚 Comprehensive Learning Platform
- **8 Structured Chapters** covering analytics fundamentals to advanced techniques
- **61 Video Lessons** with enhanced markdown content and practical examples
- **41+ Hours** of professional content dynamically calculated from video metadata
- **Progressive Learning Path** from beginner to advanced analytics mastery

### 🔍 Intelligent Search System
- **Semantic Search** with relevance scoring and content matching
- **Interactive Topic Browser** with categorized learning paths
- **Dynamic Suggestions** based on course content and user queries
- **Real-time Results** with highlighted matching content

### 🚀 Modern Tech Stack
- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS 4** with custom Khan Academy-inspired design system
- **Static Site Generation** for optimal performance and SEO

### 📱 User Experience
- **Mobile-First Design** that works perfectly on all devices
- **Progress Tracking** with localStorage-based lesson completion
- **YouTube Integration** with responsive video embedding
- **Clean UI** following accessibility and usability best practices

## 🏗️ Architecture

LearnOmni uses a **file-based content management system** with static generation:

```
📁 Content Structure
├── 📚 chapters/
│   ├── 01-introduction/
│   │   ├── index.json          # Chapter metadata
│   │   └── lessons/           # Markdown lessons
│   └── 02-data-modeling/
│       ├── index.json
│       └── lessons/
├── 📄 references/             # Reference materials
└── 📊 resources/             # Additional resources

🖥️ Application
├── ⚛️ src/app/               # Next.js App Router
├── 🎨 src/components/        # React components
├── 📚 src/lib/              # Utilities and content loaders
└── 🎯 public/               # Static assets
```

### Why This Architecture?

- **⚡ Performance**: Static generation + CDN = sub-second loading
- **📝 Content Management**: Simple markdown files, no database required
- **🔍 Search**: Built-in semantic search without external services
- **🚀 Deployment**: Deploy anywhere - Vercel, Netlify, GitHub Pages
- **💰 Cost-Effective**: Runs for free on most platforms
- **👥 Collaboration**: Git-based workflow for content contributions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone and Install
```bash
git clone https://github.com/tmuldoon00/learn-omni.git
cd learn-omni
npm install
```

### 2. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your learning platform!

### 3. Build for Production
```bash
npm run build
npm start
```

## 📚 Content Structure

### Chapter Format
Each chapter follows this structure:
```json
{
  "id": "01-introduction",
  "title": "Introduction to Omni Analytics", 
  "description": "Get started with the fundamentals...",
  "order": 1,
  "lessons": [
    {
      "id": "01-welcome",
      "title": "Welcome to Omni Analytics",
      "description": "Your journey begins here...",
      "duration": "5 min",
      "videoMinutes": 5,
      "videoId": "youtube-video-id",
      "order": 1
    }
  ]
}
```

### Lesson Format
```markdown
---
title: "Lesson Title"
videoId: "youtube-video-id"
duration: "10 min"
videoMinutes: 10
order: 1
description: "Brief lesson description"
---

# Lesson Title

Introduction text that complements the video...

## Key Concepts

- Main learning points
- Important definitions
- Practical applications

## Real-World Examples

Business scenarios and use cases...
```

## 🛠️ Content Management Scripts

### Available Commands
```bash
# Content management
npm run add-chapter      # Add a new chapter
npm run add-lesson       # Add a lesson to existing chapter
npm run audit-content    # Validate all content

# Development
npm run dev             # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint
```

### Adding Content
```bash
# Interactive chapter creation
npm run add-chapter
# Prompts for: title, description, order

# Interactive lesson creation
npm run add-lesson  
# Prompts for: chapter, title, description, duration, video ID
```

## 🔍 Search System

### Features
- **Semantic Matching**: Understands context and intent, not just keywords
- **Relevance Scoring**: Advanced algorithm with chapter and lesson scoring
- **Content Highlighting**: Shows matched text snippets with highlights
- **Topic Categorization**: Organized browse experience with 4 main categories
- **Dynamic Suggestions**: 15 curated search suggestions from actual content

### Search Algorithm
- **Chapter Scoring**: Title (25pts) + Description (15pts) + Keywords (10pts) + Lessons (50pts)
- **Lesson Scoring**: Title (20pts) + Description (10pts) + Content (8pts) + Context (32pts)
- **Final Normalization**: All scores capped at 100% for consistent UX

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Deploy to Netlify
```bash
# Build the site
npm run build

# Deploy the 'out' directory to Netlify
```

### Environment Variables
Currently no environment variables are required for basic functionality.

## 📊 Current Course Content

### By the Numbers
- **8 Chapters** covering complete analytics workflow
- **61 Video Lessons** with professional explanations  
- **41+ Hours** of comprehensive content
- **100% Free** and open source

### Learning Path
1. **Introduction** - Platform overview and getting started
2. **Data Connection & Modeling** - Connecting data sources and creating models
3. **Querying & Exploration** - AI-powered querying and data analysis
4. **Visualization & Dashboards** - Creating professional visualizations
5. **AI Features** - Leveraging intelligent analytics capabilities
6. **Sharing & Collaboration** - Embedding and distributing analytics
7. **Advanced Features** - Enterprise features and integrations
8. **Real-World Applications** - Business use cases and implementations

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

### Content Contributors
1. Fork the repository
2. Add or improve lesson content in `content/chapters/`
3. Test locally with `npm run dev`
4. Submit a pull request with clear description

### Code Contributors
1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes following existing patterns
4. Test thoroughly: `npm run build`
5. Submit a pull request

### Types of Contributions Needed
- 📝 **Enhanced lesson content** with more examples and explanations
- 🐛 **Bug fixes** and performance improvements
- ✨ **New features** like quizzes, progress tracking, user accounts
- 🌍 **Translations** to make content accessible globally
- 📚 **Documentation** improvements and guides

## 🔮 Roadmap

### Phase 1: Foundation ✅
- [x] Next.js 15 platform with App Router
- [x] Comprehensive course content (8 chapters, 61 lessons)
- [x] YouTube video integration
- [x] Intelligent search system
- [x] Mobile-responsive design
- [x] Static site generation

### Phase 2: Enhanced Learning (Q1 2025)
- [ ] **User Accounts** with progress synchronization
- [ ] **Interactive Quizzes** after each lesson
- [ ] **Completion Certificates** for chapters and full course
- [ ] **Bookmarking System** for favorite lessons
- [ ] **Learning Analytics** dashboard

### Phase 3: Community Features (Q2 2025)
- [ ] **Discussion Forums** for each lesson
- [ ] **Community Ratings** and reviews
- [ ] **Study Groups** and collaborative learning
- [ ] **Contributor Recognition** system
- [ ] **Learning Paths** and personalized recommendations

### Phase 4: Advanced Platform (Q3 2025)
- [ ] **Live Coding Environments** for hands-on practice
- [ ] **AI-Powered Tutoring** with personalized help
- [ ] **Mobile Apps** for iOS and Android
- [ ] **Offline Mode** for downloading lessons
- [ ] **Multi-language Support**

## 🛡️ Privacy & Open Source

### What's Open Source
✅ All application code and architecture  
✅ Content structure and lesson templates  
✅ UI components and design system  
✅ Documentation and contribution guides  

### What Stays Private
🔒 User progress data (stored locally)  
🔒 Environment variables and deployment configs  
🔒 Analytics and usage metrics  

### Self-Hosting
Anyone can run their own instance:
```bash
git clone https://github.com/tmuldoon00/learn-omni.git
cd learn-omni
npm install
npm run build
# Deploy to your preferred platform
```

## 📈 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Technical Optimizations
- Static site generation for instant loading
- Image optimization and lazy loading
- Code splitting and tree shaking
- CDN-optimized asset delivery
- Semantic HTML and ARIA compliance

## 🆘 Support & Community

### Getting Help
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/tmuldoon00/learn-omni/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/tmuldoon00/learn-omni/discussions)
- 📚 **Documentation**: This README and inline code comments
- 💬 **Community**: GitHub Discussions for questions and collaboration

### Stay Updated
- ⭐ **Star the repo** to get notifications
- 👀 **Watch releases** for new features
- 🍴 **Fork** to experiment and contribute

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

This means you can:
- ✅ Use commercially (run paid courses)
- ✅ Modify freely (customize for your needs)
- ✅ Distribute (share with others)
- ✅ Use privately (internal organizational use)
- ❗ Must include attribution to original project

## 🙏 Acknowledgments

### Built With
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework  
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - YAML front matter parsing

### Inspired By
- **[Khan Academy](https://www.khanacademy.org/)** - Free education for everyone
- **[freeCodeCamp](https://www.freecodecamp.org/)** - Open source curriculum
- **[Coursera](https://www.coursera.org/)** - High-quality online courses
- **[Omni Analytics](https://omni.co/)** - The analytics platform we're teaching

---

## 🚀 Ready to Start Learning?

Whether you're here to **master analytics**, **contribute content**, or **customize the platform**, we're excited to have you!

### For Learners
[**🎯 Start Learning →**](https://learnomni.org)

### For Contributors  
[**🤝 Read Contributing Guide →**](CONTRIBUTING.md)

### For Developers
[**⚡ Fork & Deploy →**](https://github.com/tmuldoon00/learn-omni/fork)

---

<div align="center">

**Made with ❤️ for the analytics community**

[Website](https://learnomni.org) • [GitHub](https://github.com/tmuldoon00/learn-omni) • [Issues](https://github.com/tmuldoon00/learn-omni/issues) • [Discussions](https://github.com/tmuldoon00/learn-omni/discussions)

⭐ **Star us on GitHub** if this project helps you learn analytics!

</div>
