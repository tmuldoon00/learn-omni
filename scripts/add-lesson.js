#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
}

async function addLesson() {
  console.log('🚀 Adding a new lesson to LearnOmni\n');

  try {
    // Get available chapters
    const chaptersDir = path.join(process.cwd(), 'content', 'chapters');
    const chapters = fs.readdirSync(chaptersDir).filter(dir => {
      return fs.statSync(path.join(chaptersDir, dir)).isDirectory();
    });

    console.log('Available chapters:');
    chapters.forEach((chapter, index) => {
      const metadata = JSON.parse(
        fs.readFileSync(path.join(chaptersDir, chapter, 'index.json'), 'utf8')
      );
      console.log(`  ${index + 1}. ${chapter} - ${metadata.title}`);
    });

    const chapterChoice = await prompt('\nEnter chapter number: ');
    const chapterIndex = parseInt(chapterChoice) - 1;
    
    if (chapterIndex < 0 || chapterIndex >= chapters.length) {
      console.log('❌ Invalid chapter selection');
      process.exit(1);
    }

    const selectedChapter = chapters[chapterIndex];
    const chapterPath = path.join(chaptersDir, selectedChapter);
    
    // Read current chapter metadata
    const metadataPath = path.join(chapterPath, 'index.json');
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

    // Get lesson details
    const lessonTitle = await prompt('Lesson title: ');
    const lessonDescription = await prompt('Lesson description: ');
    const videoDuration = await prompt('Video duration (e.g., "10 min"): ');
    const videoId = await prompt('YouTube video ID (optional): ') || 'dQw4w9WgXcQ';

    // Generate lesson ID and order
    const lessonId = String(metadata.lessons.length + 1).padStart(2, '0') + '-' + slugify(lessonTitle);
    const lessonOrder = metadata.lessons.length + 1;

    // Create lesson content
    const lessonContent = `---
title: "${lessonTitle}"
videoId: "${videoId}"
duration: "${videoDuration}"
order: ${lessonOrder}
description: "${lessonDescription}"
---

# ${lessonTitle}

${lessonDescription}

> 🎥 **Watch the video above** for the main explanation, then explore the enhanced content below.

## Overview

*Add your lesson content here...*

## Key Concepts

- **Concept 1**: Explanation
- **Concept 2**: Explanation
- **Concept 3**: Explanation

## Real-World Examples

### Example 1: [Scenario Name]
\`\`\`
Add practical examples here
\`\`\`

### Example 2: [Another Scenario]
\`\`\`
More examples...
\`\`\`

## Key Takeaways

✅ Main point 1  
✅ Main point 2  
✅ Main point 3  

---

## Next Steps

Continue your learning journey with the next lesson in this chapter.

---

*Want to improve this lesson? [Contribute on GitHub →](https://github.com/yourusername/learnomni)*
`;

    // Write lesson file
    const lessonFilePath = path.join(chapterPath, 'lessons', `${lessonId}.md`);
    fs.writeFileSync(lessonFilePath, lessonContent);

    // Update chapter metadata
    const newLesson = {
      id: lessonId,
      title: lessonTitle,
      description: lessonDescription,
      duration: videoDuration,
      videoId: videoId,
      order: lessonOrder
    };

    metadata.lessons.push(newLesson);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    console.log('\n✅ Lesson created successfully!');
    console.log(`📁 File: ${lessonFilePath}`);
    console.log(`🔗 URL: /chapter/${selectedChapter}/lesson/${lessonId}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Edit the lesson content in the markdown file');
    console.log('   2. Replace the YouTube video ID with your actual video');
    console.log('   3. Preview your changes with: npm run dev');

  } catch (error) {
    console.error('❌ Error creating lesson:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

addLesson(); 