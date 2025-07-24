# Contributing to LearnOmni

Thank you for your interest in contributing to LearnOmni! This project is community-driven and thrives on contributions from learners, educators, and analytics professionals worldwide.

## 🌟 Ways to Contribute

### Content Contributions
- **Enhance lessons**: Improve existing lesson content, add examples, or fix errors
- **Create new lessons**: Write lessons for existing chapters
- **Add exercises**: Create practice problems and real-world scenarios
- **Improve explanations**: Make complex concepts more accessible
- **Add translations**: Help make content available in other languages

### Technical Contributions
- **Bug fixes**: Fix issues with the platform
- **Feature development**: Add new functionality
- **Performance improvements**: Optimize loading times and user experience
- **Accessibility**: Improve accessibility for all users

### Community Contributions
- **Documentation**: Improve setup guides and documentation
- **Code reviews**: Review pull requests from other contributors
- **Issue triage**: Help organize and prioritize issues
- **Community support**: Help other learners in discussions

## 📋 Content Guidelines

### Writing Style
- **Clear and concise**: Use simple language that beginners can understand
- **Progressive learning**: Build on concepts from previous lessons
- **Practical examples**: Include real-world use cases and examples
- **Visual aids**: Add diagrams, screenshots, or charts when helpful

### Content Structure
Each lesson should follow this structure:
```markdown
---
title: "Lesson Title"
videoId: "youtube-video-id"
duration: "X min"
order: N
description: "Brief lesson description"
---

# Lesson Title

Brief introduction explaining what the lesson covers.

> 🎥 **Watch the video above** for the main explanation, then continue with enhanced content below.

## Main Content Sections

### Key Concepts
- Bullet points with main ideas
- Clear definitions
- Examples

### Real-World Applications
- Practical use cases
- Industry examples
- Best practices

## Key Takeaways
✅ Summary points
✅ Main concepts learned
✅ Skills acquired

---

## Next Steps
Link to the next lesson or related content.

---

*Want to improve this lesson? [Contribute on GitHub →](https://github.com/yourusername/learnomni)*

### Code Examples
- Use proper syntax highlighting
- Include comments explaining complex parts
- Provide working examples when possible
- Test all code before submitting

## 🚀 Getting Started

### 1. Fork and Clone
```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR-USERNAME/learnomni.git
cd learnomni
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Create Content
```bash
# Add a new lesson
npm run add-lesson --chapter=01-introduction --title="New Lesson Title"

# Add a new chapter
npm run add-chapter --title="New Chapter Title"
```

## 📝 Submission Process

### For Content Changes
1. **Create a branch**: `git checkout -b enhance/lesson-analytics-basics`
2. **Make your changes**: Edit markdown files in the `content/` directory
3. **Preview locally**: Run `npm run dev` to see your changes
4. **Commit changes**: Use descriptive commit messages
5. **Submit PR**: Include a clear description of your changes

### For Code Changes
1. **Create a branch**: `git checkout -b feature/new-feature-name`
2. **Make changes**: Follow existing code style and patterns
3. **Test thoroughly**: Ensure all features work correctly
4. **Submit PR**: Include tests if applicable

## 📊 Content Review Process

### Review Criteria
- **Technical accuracy**: Content must be factually correct
- **Pedagogical value**: Content should enhance learning
- **Clarity**: Writing should be clear and accessible
- **Consistency**: Follow established style and structure
- **Relevance**: Content should be relevant to Omni analytics

### Review Timeline
- **Content PRs**: Typically reviewed within 3-5 days
- **Code PRs**: Typically reviewed within 1-3 days
- **Documentation PRs**: Typically reviewed within 1-2 days

## 🎯 Content Priorities

### High Priority
- **Foundational concepts**: Data basics, analytics fundamentals
- **Practical examples**: Real-world Omni use cases
- **Interactive elements**: Quizzes, exercises, hands-on activities
- **Visual content**: Diagrams, charts, infographics

### Medium Priority
- **Advanced topics**: Complex analytics techniques
- **Case studies**: Detailed business scenarios
- **Tool comparisons**: How Omni compares to other platforms
- **Industry-specific content**: Healthcare, finance, retail examples

## 🏆 Recognition

### Contributor Levels
- **Community Contributor**: 1-5 contributions
- **Active Contributor**: 6-15 contributions  
- **Core Contributor**: 16+ contributions or significant impact
- **Maintainer**: Long-term commitment to project direction

### Recognition Methods
- **Contributors page**: Featured on the website
- **GitHub profile**: Contributor stats and badges
- **Community shoutouts**: Regular recognition in updates
- **Mentorship opportunities**: Help guide new contributors

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs, feature requests, and discussions
- **GitHub Discussions**: For questions and community conversations
- **Discord**: Real-time chat with other contributors (coming soon)

### Mentorship Program
New contributors can request mentorship from experienced community members:
- **Content mentors**: Help with writing and lesson structure
- **Technical mentors**: Assist with code contributions
- **Community mentors**: Guide overall contribution process

## 🤝 Code of Conduct

### Our Standards
- **Be respectful**: Treat all community members with respect
- **Be inclusive**: Welcome contributors from all backgrounds
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Help others learn and grow
- **Be collaborative**: Work together towards common goals

### Enforcement
Community moderators will enforce these standards. Violations may result in temporary or permanent exclusion from the project.

## 📋 Issue Templates

### Content Issues
Use these labels:
- `content-enhancement`: Improve existing content
- `content-new`: Add new content
- `content-fix`: Fix errors in content
- `content-translation`: Translation requests

### Technical Issues
Use these labels:
- `bug`: Something isn't working
- `feature`: New feature request
- `performance`: Performance improvements
- `accessibility`: Accessibility improvements

## 🔄 Automated Processes

### Content Validation
- Markdown formatting checks
- Link validation
- Spell checking
- Image optimization

### Code Quality
- ESLint for code style
- TypeScript type checking
- Automated testing
- Performance monitoring

## 📈 Metrics and Impact

We track contribution impact through:
- **Content quality**: User feedback and engagement
- **Learning outcomes**: Progress tracking and completion rates
- **Community growth**: Contributor and learner metrics
- **Platform usage**: Analytics on lesson views and interactions

---

## 🎉 Thank You!

Every contribution, no matter how small, makes LearnOmni better for everyone. Your expertise and effort help thousands of learners master analytics with Omni.

**Ready to contribute?** Check out our [Good First Issues](https://github.com/yourusername/learnomni/labels/good-first-issue) or [Content Requests](https://github.com/yourusername/learnomni/labels/content-request) to get started!

---

*This document is itself open to contributions. Help us improve it by submitting suggestions and improvements.* 