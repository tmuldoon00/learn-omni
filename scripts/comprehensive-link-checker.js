const fs = require('fs');
const path = require('path');

function getAllChapters() {
  const chaptersDir = path.join(process.cwd(), 'content/chapters');
  const chapterDirs = fs.readdirSync(chaptersDir)
    .filter(dir => fs.statSync(path.join(chaptersDir, dir)).isDirectory())
    .sort();
  
  return chapterDirs.map(dir => {
    const indexPath = path.join(chaptersDir, dir, 'index.json');
    if (fs.existsSync(indexPath)) {
      return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }
    return null;
  }).filter(Boolean);
}

function checkIfLessonExists(chapterId, lessonId) {
  const lessonPath = path.join(process.cwd(), 'content/chapters', chapterId, 'lessons', `${lessonId}.md`);
  return fs.existsSync(lessonPath);
}

function checkIfChapterExists(chapterId) {
  const chapterPath = path.join(process.cwd(), 'content/chapters', chapterId, 'index.json');
  return fs.existsSync(chapterPath);
}

function extractLinksFromMarkdown(content) {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      full: match[0]
    });
  }
  
  return links;
}

function categorizeLink(url) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return 'external';
  } else if (url.startsWith('/chapter/')) {
    return 'internal-absolute';
  } else if (url.startsWith('./') || url.startsWith('../')) {
    return 'internal-relative';
  } else if (url.startsWith('/')) {
    return 'internal-root';
  } else if (url.startsWith('#')) {
    return 'anchor';
  } else {
    return 'unknown';
  }
}

function checkInternalLink(url) {
  // Parse /chapter/{chapterId}/lesson/{lessonId} links
  const chapterLessonMatch = url.match(/^\/chapter\/([^\/]+)\/lesson\/([^\/]+)(?:[?#].*)?$/);
  if (chapterLessonMatch) {
    const [, chapterId, lessonId] = chapterLessonMatch;
    const chapterExists = checkIfChapterExists(chapterId);
    const lessonExists = checkIfLessonExists(chapterId, lessonId);
    
    return {
      valid: chapterExists && lessonExists,
      reason: !chapterExists ? `Chapter '${chapterId}' not found` : 
              !lessonExists ? `Lesson '${lessonId}' not found in chapter '${chapterId}'` : 
              'Valid'
    };
  }
  
  // Parse /chapter/{chapterId} links
  const chapterMatch = url.match(/^\/chapter\/([^\/]+)(?:[?#].*)?$/);
  if (chapterMatch) {
    const [, chapterId] = chapterMatch;
    const chapterExists = checkIfChapterExists(chapterId);
    
    return {
      valid: chapterExists,
      reason: !chapterExists ? `Chapter '${chapterId}' not found` : 'Valid'
    };
  }
  
  // Check other internal URLs
  const staticPages = ['/', '/search'];
  if (staticPages.includes(url)) {
    return { valid: true, reason: 'Static page' };
  }
  
  return {
    valid: false,
    reason: `Unknown internal URL pattern: ${url}`
  };
}

function comprehensiveLinkCheck() {
  console.log('🔍 Running Comprehensive Link Check for LearnOmni Course\n');
  
  const chapters = getAllChapters();
  let totalLinks = 0;
  let brokenLinks = 0;
  let externalLinks = 0;
  const issues = [];
  
  console.log(`📚 Found ${chapters.length} chapters to check\n`);
  
  chapters.forEach(chapter => {
    console.log(`📖 Checking Chapter ${chapter.order}: ${chapter.title}`);
    
    const lessonsDir = path.join(process.cwd(), 'content/chapters', chapter.id, 'lessons');
    
    if (!fs.existsSync(lessonsDir)) {
      console.log(`  ⚠️  Lessons directory not found: ${lessonsDir}`);
      return;
    }
    
    const lessonFiles = fs.readdirSync(lessonsDir)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    lessonFiles.forEach(file => {
      const lessonId = file.replace('.md', '');
      const filePath = path.join(lessonsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const links = extractLinksFromMarkdown(content);
      totalLinks += links.length;
      
      if (links.length > 0) {
        console.log(`  📄 ${file} (${links.length} links):`);
        
        links.forEach(link => {
          const category = categorizeLink(link.url);
          
          switch (category) {
            case 'external':
              externalLinks++;
              console.log(`    🌐 External: ${link.url}`);
              break;
              
            case 'internal-absolute':
              const checkResult = checkInternalLink(link.url);
              if (checkResult.valid) {
                console.log(`    ✅ Internal: ${link.url}`);
              } else {
                console.log(`    ❌ BROKEN: ${link.url} - ${checkResult.reason}`);
                brokenLinks++;
                issues.push({
                  chapter: chapter.title,
                  lesson: file,
                  link: link.url,
                  text: link.text,
                  reason: checkResult.reason
                });
              }
              break;
              
            case 'internal-relative':
              console.log(`    📁 Relative: ${link.url} (not checked)`);
              break;
              
            case 'internal-root':
              const rootCheckResult = checkInternalLink(link.url);
              if (rootCheckResult.valid) {
                console.log(`    ✅ Root: ${link.url}`);
              } else {
                console.log(`    ❌ BROKEN ROOT: ${link.url} - ${rootCheckResult.reason}`);
                brokenLinks++;
                issues.push({
                  chapter: chapter.title,
                  lesson: file,
                  link: link.url,
                  text: link.text,
                  reason: rootCheckResult.reason
                });
              }
              break;
              
            case 'anchor':
              console.log(`    ⚓ Anchor: ${link.url}`);
              break;
              
            default:
              console.log(`    ❓ Unknown: ${link.url}`);
              break;
          }
        });
      }
    });
    
    console.log('');
  });
  
  // Summary report
  console.log('📊 LINK CHECK SUMMARY');
  console.log('═'.repeat(50));
  console.log(`Total links found: ${totalLinks}`);
  console.log(`External links: ${externalLinks}`);
  console.log(`Broken internal links: ${brokenLinks}`);
  console.log(`Chapters checked: ${chapters.length}`);
  
  if (issues.length > 0) {
    console.log('\n❌ BROKEN LINKS FOUND:');
    console.log('═'.repeat(50));
    
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue.chapter} > ${issue.lesson}`);
      console.log(`   Link: ${issue.link}`);
      console.log(`   Text: "${issue.text}"`);
      console.log(`   Issue: ${issue.reason}`);
      console.log('');
    });
    
    console.log(`⚠️  CRITICAL: Found ${brokenLinks} broken links that will cause 404 errors!`);
    console.log('Please fix these links before deploying to production.');
  } else {
    console.log('\n✅ ALL INTERNAL LINKS ARE VALID!');
    console.log('No 404 errors detected in the course content.');
  }
  
  return {
    totalLinks,
    externalLinks,
    brokenLinks,
    issues,
    success: brokenLinks === 0
  };
}

// Run the comprehensive link check
const result = comprehensiveLinkCheck();
process.exit(result.success ? 0 : 1); 