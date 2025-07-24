const fs = require('fs');
const path = require('path');

// Check Chapter 7 for broken links and missing files
function auditChapter7() {
  console.log('🔍 Auditing Chapter 7: Advanced Features\n');
  
  const chapterPath = path.join(process.cwd(), 'content/chapters/07-advanced-features');
  const indexPath = path.join(chapterPath, 'index.json');
  const lessonsPath = path.join(chapterPath, 'lessons');
  
  // Read index.json
  const chapterData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  console.log(`📚 Chapter: ${chapterData.title}`);
  console.log(`📖 Expected ${chapterData.lessons.length} lessons\n`);
  
  // Get actual lesson files
  const actualFiles = fs.readdirSync(lessonsPath)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
  
  console.log('🗂️  Actual lesson files:');
  actualFiles.forEach(file => console.log(`  - ${file}.md`));
  console.log('');
  
  // Check for missing/mismatched lessons
  console.log('❌ Missing or Mismatched Lessons:');
  let issuesFound = 0;
  
  chapterData.lessons.forEach(lesson => {
    const expectedFile = `${lesson.id}.md`;
    const filePath = path.join(lessonsPath, expectedFile);
    
    if (!fs.existsSync(filePath)) {
      console.log(`  ❌ ${expectedFile} - Referenced in index.json but file doesn't exist`);
      console.log(`     Title: "${lesson.title}"`);
      console.log(`     Description: "${lesson.description}"`);
      issuesFound++;
    } else {
      console.log(`  ✅ ${expectedFile} - Found`);
    }
  });
  
  // Check for orphaned files
  console.log('\n🔍 Orphaned lesson files (exist but not in index.json):');
  const expectedIds = chapterData.lessons.map(l => l.id);
  
  actualFiles.forEach(file => {
    if (!expectedIds.includes(file)) {
      console.log(`  ⚠️  ${file}.md - File exists but not referenced in index.json`);
      issuesFound++;
    }
  });
  
  // Check for internal links within lesson files
  console.log('\n🔗 Checking internal links in lesson files:');
  actualFiles.forEach(file => {
    const filePath = path.join(lessonsPath, `${file}.md`);
    const content = fs.readFileSync(filePath, 'utf8');
    const links = content.match(/\[.*?\]\((.*?)\)/g) || [];
    
    if (links.length > 0) {
      console.log(`\n  📄 ${file}.md:`);
      links.forEach(link => {
        const url = link.match(/\[.*?\]\((.*?)\)/)[1];
        
        if (url.startsWith('/chapter/') || url.startsWith('./') || url.startsWith('../')) {
          console.log(`    🔗 Internal link: ${url}`);
          // TODO: Check if internal link exists
        } else if (url.startsWith('http')) {
          console.log(`    🌐 External link: ${url}`);
        } else {
          console.log(`    ❓ Relative link: ${url}`);
        }
      });
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`  - Expected lessons: ${chapterData.lessons.length}`);
  console.log(`  - Actual files: ${actualFiles.length}`);
  console.log(`  - Issues found: ${issuesFound}`);
  
  if (issuesFound > 0) {
    console.log(`\n⚠️  Found ${issuesFound} issues that may cause 404 errors!`);
    return false;
  } else {
    console.log(`\n✅ No issues found in Chapter 7!`);
    return true;
  }
}

// Run the audit
auditChapter7(); 