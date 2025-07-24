# Contributing to LearnOmni.org

Thank you for your interest in contributing to LearnOmni! This project is community-driven and thrives on contributions from learners, educators, developers, and analytics professionals worldwide.

## 🌟 Ways to Contribute

### 📝 Content Contributions
- **Enhance existing lessons**: Improve explanations, add examples, fix errors
- **Create new content**: Write additional lessons or reference materials
- **Add practical exercises**: Create hands-on activities and real-world scenarios
- **Improve examples**: Add business use cases and industry applications
- **Update documentation**: Keep guides and instructions current

### 💻 Technical Contributions
- **Bug fixes**: Resolve issues with the platform functionality
- **Feature development**: Add new capabilities to enhance learning
- **Performance improvements**: Optimize loading times and user experience
- **Accessibility**: Make the platform usable for everyone
- **Mobile optimization**: Improve mobile experience and responsiveness

### 🎨 Design & UX Contributions
- **UI improvements**: Enhance the visual design and user interface
- **UX research**: Gather feedback and suggest user experience improvements
- **Component design**: Create reusable UI components
- **Design system**: Maintain consistency across the platform

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git for version control
- Basic familiarity with Markdown (for content contributions)
- React/Next.js knowledge (for code contributions)

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/learn-omni.git
cd learn-omni
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Verify Setup
Visit `http://localhost:3000` to ensure everything is working correctly.

## 📚 Content Contribution Guidelines

### Content Structure
Our content follows a structured approach:

#### Chapter Structure
```json
{
  "id": "chapter-id",
  "title": "Chapter Title",
  "description": "Brief chapter description",
  "order": 1,
  "lessons": [...]
}
```

#### Lesson Structure
```markdown
---
title: "Lesson Title"
videoId: "youtube-video-id"
duration: "X min"
videoMinutes: X
order: N
description: "Brief lesson description"
---

# Lesson Title

Brief introduction explaining the lesson's purpose...

## Key Concepts
- Main learning objectives
- Important definitions
- Core principles

## Real-World Applications
- Business scenarios
- Industry examples
- Practical use cases

## Key Takeaways
✅ Summary points
✅ Main concepts learned
✅ Skills acquired
```

### Writing Style Guidelines
- **Clear and accessible**: Use language that beginners can understand
- **Progressive complexity**: Build on concepts from previous lessons
- **Practical focus**: Include real-world examples and applications
- **Consistent structure**: Follow the established lesson template
- **Proper grammar**: Use tools like Grammarly to ensure quality

### Content Categories
1. **Getting Started** 🚀 - Platform introduction and basics
2. **Dashboards & Visualization** 📊 - Creating charts and dashboards
3. **Business Applications** 💼 - Real-world use cases
4. **Advanced Features** ⚡ - Complex functionality and integrations

## 💻 Code Contribution Guidelines

### Development Workflow
1. **Create a branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Follow existing code patterns and conventions
3. **Test thoroughly**: Ensure all functionality works (`npm run build`)
4. **Commit changes**: Use descriptive commit messages
5. **Submit PR**: Include clear description of changes

### Code Standards
- **TypeScript**: Use proper typing for all functions and components
- **ESLint**: Fix all linting errors before submitting
- **Component structure**: Follow existing patterns in `/src/components`
- **File organization**: Place files in appropriate directories
- **Performance**: Optimize for loading speed and user experience

### Technical Stack
- **Next.js 15**: App Router with Server and Client Components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom design system
- **React Markdown**: For rendering lesson content
- **Lucide React**: Consistent iconography

## 🔧 Using Content Management Scripts

### Adding New Content
```bash
# Add a new chapter (interactive prompts)
npm run add-chapter

# Add a lesson to existing chapter (interactive prompts)
npm run add-lesson

# Validate all content for issues
npm run audit-content
```

### Content Validation
Before submitting content contributions:
1. Run `npm run audit-content` to check for issues
2. Test locally with `npm run dev`
3. Verify all links work and videos load
4. Check spelling and grammar

## 🎯 Priority Contributions

### High Priority
- **Enhanced lesson explanations** with more detail and examples
- **Interactive exercises** and hands-on activities
- **Bug fixes** affecting user experience
- **Mobile responsiveness** improvements
- **Search functionality** enhancements

### Medium Priority
- **New lesson content** expanding existing chapters
- **Performance optimizations** for faster loading
- **Accessibility improvements** (ARIA labels, keyboard navigation)
- **Visual design enhancements** following design system

### Future Features
- **User account system** with progress tracking
- **Interactive quizzes** for each lesson
- **Discussion forums** for community interaction
- **Learning analytics** dashboard
- **Mobile app** development

## 📋 Submission Process

### For Content Changes
1. **Create a descriptive branch**: `git checkout -b content/improve-dashboard-lesson`
2. **Edit markdown files**: Modify files in `content/chapters/`
3. **Test locally**: Preview changes with `npm run dev`
4. **Validate content**: Run `npm run audit-content`
5. **Commit with clear message**: `git commit -m "Improve dashboard creation lesson with more examples"`
6. **Submit PR**: Include description of improvements and rationale

### For Code Changes
1. **Create a feature branch**: `git checkout -b feature/search-improvements`
2. **Implement changes**: Follow existing patterns and conventions
3. **Test thoroughly**: Run `npm run build` and manual testing
4. **Check linting**: Fix any ESLint errors
5. **Update documentation**: Add comments and update README if needed
6. **Submit PR**: Include technical details and testing instructions

## 🔍 Pull Request Guidelines

### PR Title Format
- **Content**: `Content: Improve lesson on data modeling with examples`
- **Feature**: `Feature: Add bookmark functionality for lessons`
- **Bug fix**: `Fix: Resolve search results highlighting issue`
- **Documentation**: `Docs: Update contributing guidelines`

### PR Description Template
```markdown
## Description
Brief summary of changes made.

## Type of Change
- [ ] Content improvement/addition
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested locally with `npm run dev`
- [ ] Verified build works with `npm run build`
- [ ] Checked all links and functionality
- [ ] Validated content with audit script

## Screenshots (if applicable)
Add screenshots showing the changes.

## Additional Notes
Any additional context or considerations.
```

## 📊 Content Review Process

### Review Criteria
- **Technical accuracy**: All information must be factually correct
- **Educational value**: Content should enhance learning outcomes
- **Clarity**: Writing should be clear and accessible to the target audience
- **Consistency**: Follow established style and structure guidelines
- **Completeness**: Lessons should be comprehensive and well-structured

### Review Timeline
- **Content PRs**: Typically reviewed within 2-3 days
- **Code PRs**: Typically reviewed within 1-2 days
- **Documentation PRs**: Typically reviewed within 1 day
- **Bug fixes**: Priority review, usually same day

## 🏆 Recognition

### Contributor Levels
- **First-time Contributor**: Made their first contribution
- **Regular Contributor**: 3+ accepted contributions
- **Active Contributor**: 10+ contributions or significant impact
- **Core Contributor**: 25+ contributions and ongoing involvement

### Recognition Methods
- **Contributors section** in README.md
- **GitHub contributor stats** and activity
- **Special mention** in release notes for significant contributions
- **Invitation to contribute** to project direction discussions

## 🤝 Community Guidelines

### Code of Conduct
- **Be respectful**: Treat all community members with kindness and respect
- **Be inclusive**: Welcome contributors from all backgrounds and skill levels
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Help others learn and grow
- **Be collaborative**: Work together towards common goals

### Communication
- **Use GitHub Issues** for bug reports and feature requests
- **Use GitHub Discussions** for questions and community conversations
- **Be specific** when describing issues or suggestions
- **Provide context** for your contributions and decisions

## 🔧 Development Setup Details

### Project Structure
```
learn-omni/
├── content/                 # Course content (markdown files)
│   ├── chapters/           # Chapter directories
│   ├── references/         # Reference materials
│   └── resources/          # Additional resources
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   └── lib/               # Utility functions
├── scripts/               # Content management scripts
└── public/                # Static assets
```

### Key Files
- **`src/lib/content.ts`**: Content loading and management
- **`src/lib/search.ts`**: Search functionality and algorithms
- **`src/app/globals.css`**: Global styles and design system
- **`tailwind.config.ts`**: Tailwind CSS configuration

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Validate content
npm run audit-content
```

## 📈 Metrics and Impact

We track the impact of contributions through:
- **Content quality**: User engagement and completion rates
- **Learning outcomes**: Feedback and user success stories
- **Platform performance**: Page load times and user experience metrics
- **Community growth**: Contributor activity and content expansion

## 🆘 Getting Help

### Common Issues
- **Build errors**: Check Node.js version (18+) and run `npm install`
- **Content validation**: Use `npm run audit-content` to identify issues
- **Development server**: Ensure port 3000 is available or use different port

### Support Channels
- **GitHub Issues**: Technical problems and bug reports
- **GitHub Discussions**: Questions about contributing and project direction
- **PR comments**: Specific feedback on your contributions

## 📝 Content Templates

### New Lesson Template
```markdown
---
title: "Your Lesson Title"
videoId: "youtube-video-id"
duration: "X min"
videoMinutes: X
order: N
description: "Brief description of what this lesson covers"
---

# Your Lesson Title

Brief introduction that sets context for the lesson...

## Learning Objectives
By the end of this lesson, you will:
- Understand key concept A
- Be able to perform task B
- Know how to apply technique C

## Key Concepts

### Concept 1
Explanation with examples...

### Concept 2
Explanation with examples...

## Real-World Applications
- Business scenario 1
- Use case 2
- Industry example 3

## Hands-On Exercise
Step-by-step exercise or challenge...

## Key Takeaways
✅ Main point 1
✅ Main point 2
✅ Main point 3

## Next Steps
Brief preview of the next lesson or suggested follow-up activities...
```

---

## 🎉 Thank You!

Every contribution, no matter how small, makes LearnOmni better for the entire analytics community. Your expertise and effort help thousands of learners master data analytics with Omni.

**Ready to contribute?** 

- Browse [Good First Issues](https://github.com/tmuldoon00/learn-omni/labels/good-first-issue)
- Check out [Content Requests](https://github.com/tmuldoon00/learn-omni/labels/content-request)
- Join the conversation in [Discussions](https://github.com/tmuldoon00/learn-omni/discussions)

---

*This guide is a living document. Help us improve it by suggesting changes and improvements!* 