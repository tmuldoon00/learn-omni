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

async function addChapter() {
  console.log('📚 Adding a new chapter to LearnOmni\n');

  try {
    // Get current chapters to determine order
    const chaptersDir = path.join(process.cwd(), 'content', 'chapters');
    const existingChapters = fs.readdirSync(chaptersDir).filter(dir => {
      return fs.statSync(path.join(chaptersDir, dir)).isDirectory();
    });

    console.log(`Currently ${existingChapters.length} chapters exist.\n`);

    // Get chapter details
    const chapterTitle = await prompt('Chapter title: ');
    const chapterDescription = await prompt('Chapter description: ');
    const estimatedHours = await prompt('Estimated hours to complete: ');

    // Generate chapter ID and order
    const chapterOrder = existingChapters.length + 1;
    const chapterId = String(chapterOrder).padStart(2, '0') + '-' + slugify(chapterTitle);

    // Create chapter directory structure
    const chapterPath = path.join(chaptersDir, chapterId);
    const lessonsPath = path.join(chapterPath, 'lessons');
    const assetsPath = path.join(chapterPath, 'assets');

    fs.mkdirSync(chapterPath, { recursive: true });
    fs.mkdirSync(lessonsPath, { recursive: true });
    fs.mkdirSync(assetsPath, { recursive: true });

    // Create chapter metadata
    const metadata = {
      id: chapterId,
      title: chapterTitle,
      description: chapterDescription,
      order: chapterOrder,
      estimatedHours: parseFloat(estimatedHours),
      lessons: []
    };

    // Write metadata file
    const metadataPath = path.join(chapterPath, 'index.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

    // Create placeholder README
    const readmeContent = `# ${chapterTitle}

${chapterDescription}

## Lessons in This Chapter

*No lessons yet. Use \`npm run add-lesson\` to add your first lesson.*

## Assets

Place any images, diagrams, or other assets for this chapter in the \`assets/\` directory.

## Contributing

Want to contribute to this chapter? Check out our [Contributing Guide](../../CONTRIBUTING.md) for guidelines on:
- Adding new lessons
- Improving existing content
- Creating exercises and examples
- Adding visual aids

---

*This chapter is part of the LearnOmni open source course. [Contribute on GitHub →](https://github.com/tmuldoon00/learn-omni)*
`;

    fs.writeFileSync(path.join(chapterPath, 'README.md'), readmeContent);

    console.log('\n✅ Chapter created successfully!');
    console.log(`📁 Directory: ${chapterPath}`);
    console.log(`🆔 Chapter ID: ${chapterId}`);
    console.log(`📊 Order: ${chapterOrder}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Add lessons to this chapter with: npm run add-lesson');
    console.log('   2. Add any images or assets to the assets/ directory');
    console.log('   3. Preview your changes with: npm run dev');
    console.log(`   4. The chapter will appear at: /chapter/${chapterId}`);

  } catch (error) {
    console.error('❌ Error creating chapter:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

addChapter(); 