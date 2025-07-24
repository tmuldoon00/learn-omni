#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Audit results tracking
const auditResults = {
  errors: [],
  warnings: [],
  info: [],
  stats: {}
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const colorCode = colors[type] || colors.reset;
  console.log(`${colorCode}[${timestamp}] ${message}${colors.reset}`);
}

function logError(message) {
  log(`❌ ERROR: ${message}`, 'red');
  auditResults.errors.push({ message, timestamp: new Date().toISOString() });
}

function logWarning(message) {
  log(`⚠️  WARNING: ${message}`, 'yellow');
  auditResults.warnings.push({ message, timestamp: new Date().toISOString() });
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
  auditResults.info.push({ message, timestamp: new Date().toISOString() });
}

// Content directories
const contentDir = path.join(__dirname, '..', 'content');
const chaptersDir = path.join(contentDir, 'chapters');

// Audit functions
class ContentAuditor {
  constructor() {
    this.chapters = [];
    this.allLessons = [];
    this.videoIds = new Set();
    this.duplicateVideos = [];
  }

  async runFullAudit() {
    logInfo('Starting comprehensive content audit...');
    
    try {
      // Core structure tests
      await this.auditDirectoryStructure();
      await this.auditChapterMetadata();
      await this.auditLessonFiles();
      await this.auditDataConsistency();
      await this.auditContentQuality();
      await this.auditDuplicates();
      await this.auditRouteAccessibility();
      
      // Generate summary
      this.generateAuditSummary();
      
    } catch (error) {
      logError(`Audit failed with unexpected error: ${error.message}`);
      process.exit(1);
    }
  }

  async auditDirectoryStructure() {
    logInfo('Auditing directory structure...');
    
    // Check content directory exists
    if (!fs.existsSync(contentDir)) {
      logError('Content directory does not exist');
      return;
    }
    
    // Check chapters directory exists
    if (!fs.existsSync(chaptersDir)) {
      logError('Chapters directory does not exist');
      return;
    }
    
    // Get all chapter directories
    const chapterDirs = fs.readdirSync(chaptersDir).filter(item => {
      const itemPath = path.join(chaptersDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
    
    logSuccess(`Found ${chapterDirs.length} chapter directories`);
    auditResults.stats.chapterCount = chapterDirs.length;
    
    // Validate expected chapters (01-08)
    const expectedChapters = Array.from({length: 8}, (_, i) => 
      String(i + 1).padStart(2, '0')
    );
    
    for (const expectedChapter of expectedChapters) {
      const found = chapterDirs.some(dir => dir.startsWith(expectedChapter));
      if (!found) {
        logError(`Missing expected chapter: ${expectedChapter}-*`);
      }
    }
    
    // Check each chapter directory structure
    for (const chapterDir of chapterDirs) {
      const chapterPath = path.join(chaptersDir, chapterDir);
      const indexPath = path.join(chapterPath, 'index.json');
      const lessonsPath = path.join(chapterPath, 'lessons');
      
      if (!fs.existsSync(indexPath)) {
        logError(`Missing index.json in chapter: ${chapterDir}`);
      }
      
      if (!fs.existsSync(lessonsPath)) {
        logError(`Missing lessons directory in chapter: ${chapterDir}`);
      } else if (!fs.statSync(lessonsPath).isDirectory()) {
        logError(`Lessons path is not a directory in chapter: ${chapterDir}`);
      }
    }
  }

  async auditChapterMetadata() {
    logInfo('Auditing chapter metadata...');
    
    const chapterDirs = fs.readdirSync(chaptersDir).filter(item => {
      const itemPath = path.join(chaptersDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
    
    for (const chapterDir of chapterDirs) {
      const chapterPath = path.join(chaptersDir, chapterDir);
      const indexPath = path.join(chapterPath, 'index.json');
      
      if (!fs.existsSync(indexPath)) {
        continue; // Already logged in previous function
      }
      
      try {
        const rawData = fs.readFileSync(indexPath, 'utf8');
        const chapterData = JSON.parse(rawData);
        
        // Validate required fields
        const requiredFields = ['id', 'title', 'description', 'order', 'lessons'];
        for (const field of requiredFields) {
          if (!chapterData[field]) {
            logError(`Chapter ${chapterDir}: Missing required field '${field}'`);
          }
        }
        
        // Validate lessons array
        if (!Array.isArray(chapterData.lessons)) {
          logError(`Chapter ${chapterDir}: 'lessons' must be an array`);
        } else {
          // Validate each lesson metadata
          for (const lesson of chapterData.lessons) {
            const lessonRequiredFields = ['id', 'title', 'description', 'duration', 'videoMinutes', 'order'];
            for (const field of lessonRequiredFields) {
              if (!lesson[field] && lesson[field] !== 0) { // Allow 0 for videoMinutes
                logError(`Chapter ${chapterDir}, Lesson ${lesson.id || 'unknown'}: Missing required field '${field}'`);
              }
            }
            
            // Check for valid video IDs
            if (lesson.videoId && lesson.videoId !== 'placeholder') {
              if (this.videoIds.has(lesson.videoId)) {
                this.duplicateVideos.push({
                  videoId: lesson.videoId,
                  locations: [
                    ...(this.duplicateVideos.find(d => d.videoId === lesson.videoId)?.locations || []),
                    `${chapterDir}/${lesson.id}`
                  ]
                });
              }
              this.videoIds.add(lesson.videoId);
            }
          }
          
          // Check lesson order consistency
          const orders = chapterData.lessons.map(l => l.order);
          const sortedOrders = [...orders].sort((a, b) => a - b);
          if (JSON.stringify(orders) !== JSON.stringify(sortedOrders)) {
            logWarning(`Chapter ${chapterDir}: Lesson orders may not be sequential`);
          }
        }
        
        this.chapters.push({
          ...chapterData,
          directory: chapterDir
        });
        
      } catch (error) {
        logError(`Chapter ${chapterDir}: Invalid JSON in index.json - ${error.message}`);
      }
    }
    
    logSuccess(`Validated ${this.chapters.length} chapter metadata files`);
    auditResults.stats.validChapters = this.chapters.length;
  }

  async auditLessonFiles() {
    logInfo('Auditing lesson markdown files...');
    
    let totalLessons = 0;
    let validLessons = 0;
    
    for (const chapter of this.chapters) {
      const chapterPath = path.join(chaptersDir, chapter.directory);
      const lessonsPath = path.join(chapterPath, 'lessons');
      
      if (!fs.existsSync(lessonsPath)) {
        continue;
      }
      
      for (const lesson of chapter.lessons) {
        totalLessons++;
        const lessonFile = path.join(lessonsPath, `${lesson.id}.md`);
        
        if (!fs.existsSync(lessonFile)) {
          logError(`Missing lesson file: ${chapter.directory}/lessons/${lesson.id}.md`);
          continue;
        }
        
        try {
          const fileContent = fs.readFileSync(lessonFile, 'utf8');
          const { data: frontmatter, content } = matter(fileContent);
          
          // Validate frontmatter
          const requiredFrontmatterFields = ['id', 'title', 'description', 'duration', 'order'];
          for (const field of requiredFrontmatterFields) {
            if (!frontmatter[field]) {
              logError(`Lesson ${chapter.directory}/${lesson.id}: Missing frontmatter field '${field}'`);
            }
          }
          
          // Check content is not empty
          if (!content || content.trim().length < 50) {
            logWarning(`Lesson ${chapter.directory}/${lesson.id}: Content appears to be empty or very short`);
          }
          
          // Check for placeholder content
          if (content.includes('Lorem ipsum') || content.includes('[TODO]') || content.includes('placeholder')) {
            logWarning(`Lesson ${chapter.directory}/${lesson.id}: Contains placeholder content`);
          }
          
          this.allLessons.push({
            chapterId: chapter.id,
            lessonId: lesson.id,
            frontmatter,
            content,
            filePath: lessonFile
          });
          
          validLessons++;
          
        } catch (error) {
          logError(`Lesson ${chapter.directory}/${lesson.id}: Error parsing markdown - ${error.message}`);
        }
      }
    }
    
    logSuccess(`Validated ${validLessons}/${totalLessons} lesson files`);
    auditResults.stats.totalLessons = totalLessons;
    auditResults.stats.validLessons = validLessons;
  }

  async auditDataConsistency() {
    logInfo('Auditing data consistency between index.json and markdown files...');
    
    let consistencyErrors = 0;
    
    for (const lesson of this.allLessons) {
      const chapterData = this.chapters.find(c => c.id === lesson.chapterId);
      if (!chapterData) {
        logError(`Lesson ${lesson.lessonId}: Chapter not found in metadata`);
        consistencyErrors++;
        continue;
      }
      
      const lessonMetadata = chapterData.lessons.find(l => l.id === lesson.lessonId);
      if (!lessonMetadata) {
        logError(`Lesson ${lesson.chapterId}/${lesson.lessonId}: Not found in chapter metadata`);
        consistencyErrors++;
        continue;
      }
      
      // Check consistency between index.json and frontmatter
      const fieldsToCheck = ['id', 'title', 'description', 'duration', 'order'];
      for (const field of fieldsToCheck) {
        if (lessonMetadata[field] !== lesson.frontmatter[field]) {
          logWarning(`Lesson ${lesson.chapterId}/${lesson.lessonId}: Mismatch in '${field}' between index.json and frontmatter`);
          logWarning(`  Index.json: ${lessonMetadata[field]}`);
          logWarning(`  Frontmatter: ${lesson.frontmatter[field]}`);
        }
      }
      
      // Check video ID consistency
      if (lessonMetadata.videoId !== lesson.frontmatter.videoId) {
        logWarning(`Lesson ${lesson.chapterId}/${lesson.lessonId}: Video ID mismatch`);
        logWarning(`  Index.json: ${lessonMetadata.videoId}`);
        logWarning(`  Frontmatter: ${lesson.frontmatter.videoId}`);
      }
    }
    
    if (consistencyErrors === 0) {
      logSuccess('All data consistency checks passed');
    } else {
      logError(`Found ${consistencyErrors} data consistency errors`);
    }
    
    auditResults.stats.consistencyErrors = consistencyErrors;
  }

  async auditContentQuality() {
    logInfo('Auditing content quality...');
    
    let qualityIssues = 0;
    
    // Check for placeholder video IDs
    const placeholderVideos = this.allLessons.filter(lesson => 
      !lesson.frontmatter.videoId || lesson.frontmatter.videoId === 'placeholder'
    );
    
    if (placeholderVideos.length > 0) {
      logWarning(`Found ${placeholderVideos.length} lessons with placeholder or missing video IDs`);
      placeholderVideos.forEach(lesson => {
        logWarning(`  ${lesson.chapterId}/${lesson.lessonId}`);
      });
      qualityIssues += placeholderVideos.length;
    }
    
    // Check for very short content
    const shortContent = this.allLessons.filter(lesson => 
      lesson.content && lesson.content.trim().length < 200
    );
    
    if (shortContent.length > 0) {
      logWarning(`Found ${shortContent.length} lessons with very short content (< 200 chars)`);
      shortContent.forEach(lesson => {
        logWarning(`  ${lesson.chapterId}/${lesson.lessonId} (${lesson.content.trim().length} chars)`);
      });
    }
    
    // Check for missing video IDs in YouTube format
    const invalidVideoIds = this.allLessons.filter(lesson => {
      const videoId = lesson.frontmatter.videoId;
      return videoId && videoId !== 'placeholder' && !/^[a-zA-Z0-9_-]{11}$/.test(videoId);
    });
    
    if (invalidVideoIds.length > 0) {
      logWarning(`Found ${invalidVideoIds.length} lessons with invalid YouTube video ID format`);
      invalidVideoIds.forEach(lesson => {
        logWarning(`  ${lesson.chapterId}/${lesson.lessonId}: ${lesson.frontmatter.videoId}`);
      });
      qualityIssues += invalidVideoIds.length;
    }
    
    auditResults.stats.qualityIssues = qualityIssues;
    
    if (qualityIssues === 0) {
      logSuccess('No content quality issues found');
    }
  }

  async auditDuplicates() {
    logInfo('Auditing for duplicate content...');
    
    let duplicateIssues = 0;
    
    // 1. Find duplicate video IDs
    const videoIdCounts = {};
    this.allLessons.forEach(lesson => {
      const videoId = lesson.frontmatter.videoId;
      if (videoId && videoId !== 'placeholder') {
        if (!videoIdCounts[videoId]) {
          videoIdCounts[videoId] = [];
        }
        videoIdCounts[videoId].push(`${lesson.chapterId}/${lesson.lessonId}`);
      }
    });
    
    const duplicateVideos = Object.entries(videoIdCounts).filter(([_, locations]) => locations.length > 1);
    
    if (duplicateVideos.length > 0) {
      logWarning(`Found ${duplicateVideos.length} duplicate video IDs`);
      duplicateVideos.forEach(([videoId, locations]) => {
        logWarning(`  Video ID ${videoId} used in:`);
        locations.forEach(location => logWarning(`    ${location}`));
      });
      duplicateIssues += duplicateVideos.length;
    }
    
    // 2. Find duplicate lesson titles
    const titleCounts = {};
    this.allLessons.forEach(lesson => {
      const title = lesson.frontmatter.title?.toLowerCase().trim();
      if (title) {
        if (!titleCounts[title]) {
          titleCounts[title] = [];
        }
        titleCounts[title].push(`${lesson.chapterId}/${lesson.lessonId}`);
      }
    });
    
    const duplicateTitles = Object.entries(titleCounts).filter(([_, locations]) => locations.length > 1);
    
    if (duplicateTitles.length > 0) {
      logWarning(`Found ${duplicateTitles.length} duplicate lesson titles`);
      duplicateTitles.forEach(([title, locations]) => {
        logWarning(`  Title "${title}" used in:`);
        locations.forEach(location => logWarning(`    ${location}`));
      });
      duplicateIssues += duplicateTitles.length;
    }
    
    // 3. Find duplicate lesson descriptions
    const descriptionCounts = {};
    this.allLessons.forEach(lesson => {
      const description = lesson.frontmatter.description?.toLowerCase().trim();
      if (description && description.length > 20) { // Only check substantial descriptions
        if (!descriptionCounts[description]) {
          descriptionCounts[description] = [];
        }
        descriptionCounts[description].push(`${lesson.chapterId}/${lesson.lessonId}`);
      }
    });
    
    const duplicateDescriptions = Object.entries(descriptionCounts).filter(([_, locations]) => locations.length > 1);
    
    if (duplicateDescriptions.length > 0) {
      logWarning(`Found ${duplicateDescriptions.length} duplicate lesson descriptions`);
      duplicateDescriptions.forEach(([description, locations]) => {
        logWarning(`  Description "${description.substring(0, 60)}..." used in:`);
        locations.forEach(location => logWarning(`    ${location}`));
      });
      duplicateIssues += duplicateDescriptions.length;
    }
    
    // 4. Find similar content using text similarity
    const contentSimilarities = this.findSimilarContent(this.allLessons);
    
    if (contentSimilarities.length > 0) {
      logWarning(`Found ${contentSimilarities.length} pairs of lessons with highly similar content`);
      contentSimilarities.forEach(similarity => {
        logWarning(`  ${similarity.lesson1} and ${similarity.lesson2} have ${(similarity.similarity * 100).toFixed(1)}% similar content`);
      });
      duplicateIssues += contentSimilarities.length;
    }
    
    // 5. Find duplicate chapter titles and descriptions
    const chapterTitleCounts = {};
    const chapterDescCounts = {};
    
    this.chapters.forEach(chapter => {
      const title = chapter.title?.toLowerCase().trim();
      const description = chapter.description?.toLowerCase().trim();
      
      if (title) {
        if (!chapterTitleCounts[title]) {
          chapterTitleCounts[title] = [];
        }
        chapterTitleCounts[title].push(chapter.id);
      }
      
      if (description && description.length > 20) {
        if (!chapterDescCounts[description]) {
          chapterDescCounts[description] = [];
        }
        chapterDescCounts[description].push(chapter.id);
      }
    });
    
    const duplicateChapterTitles = Object.entries(chapterTitleCounts).filter(([_, chapters]) => chapters.length > 1);
    const duplicateChapterDescs = Object.entries(chapterDescCounts).filter(([_, chapters]) => chapters.length > 1);
    
    if (duplicateChapterTitles.length > 0) {
      logWarning(`Found ${duplicateChapterTitles.length} duplicate chapter titles`);
      duplicateChapterTitles.forEach(([title, chapters]) => {
        logWarning(`  Chapter title "${title}" used in: ${chapters.join(', ')}`);
      });
      duplicateIssues += duplicateChapterTitles.length;
    }
    
    if (duplicateChapterDescs.length > 0) {
      logWarning(`Found ${duplicateChapterDescs.length} duplicate chapter descriptions`);
      duplicateChapterDescs.forEach(([description, chapters]) => {
        logWarning(`  Chapter description "${description.substring(0, 60)}..." used in: ${chapters.join(', ')}`);
      });
      duplicateIssues += duplicateChapterDescs.length;
    }
    
    // 6. Find lessons with identical durations (potential copy-paste indicators)
    const durationCounts = {};
    this.allLessons.forEach(lesson => {
      const duration = lesson.frontmatter.duration;
      if (duration) {
        if (!durationCounts[duration]) {
          durationCounts[duration] = [];
        }
        durationCounts[duration].push(`${lesson.chapterId}/${lesson.lessonId}`);
      }
    });
    
    // Only report durations used more than 4 times (likely suspicious)
    const suspiciousDurations = Object.entries(durationCounts).filter(([_, locations]) => locations.length > 4);
    
    if (suspiciousDurations.length > 0) {
      logWarning(`Found ${suspiciousDurations.length} durations used unusually frequently (possible copy-paste)`);
      suspiciousDurations.forEach(([duration, locations]) => {
        logWarning(`  Duration "${duration}" used ${locations.length} times`);
      });
    }
    
    auditResults.stats.duplicateVideos = duplicateVideos.length;
    auditResults.stats.duplicateTitles = duplicateTitles.length;
    auditResults.stats.duplicateDescriptions = duplicateDescriptions.length;
    auditResults.stats.similarContent = contentSimilarities.length;
    auditResults.stats.duplicateChapterTitles = duplicateChapterTitles.length;
    auditResults.stats.duplicateChapterDescs = duplicateChapterDescs.length;
    auditResults.stats.totalDuplicateIssues = duplicateIssues;
    
    if (duplicateIssues === 0) {
      logSuccess('No duplicate content issues found');
    } else {
      logWarning(`Found ${duplicateIssues} duplicate content issues`);
    }
  }
  
  findSimilarContent(lessons) {
    const similarities = [];
    const threshold = 0.85; // 85% similarity threshold
    
    // Compare each lesson with every other lesson
    for (let i = 0; i < lessons.length; i++) {
      for (let j = i + 1; j < lessons.length; j++) {
        const lesson1 = lessons[i];
        const lesson2 = lessons[j];
        
        // Skip if same chapter (some similarity expected)
        if (lesson1.chapterId === lesson2.chapterId) {
          continue;
        }
        
        const similarity = this.calculateTextSimilarity(lesson1.content, lesson2.content);
        
        if (similarity > threshold) {
          similarities.push({
            lesson1: `${lesson1.chapterId}/${lesson1.lessonId}`,
            lesson2: `${lesson2.chapterId}/${lesson2.lessonId}`,
            similarity: similarity
          });
        }
      }
    }
    
    return similarities;
  }
  
  calculateTextSimilarity(text1, text2) {
    if (!text1 || !text2) return 0;
    
    // Clean and normalize text
    const clean1 = this.cleanTextForComparison(text1);
    const clean2 = this.cleanTextForComparison(text2);
    
    // Use Jaccard similarity on word sets
    const words1 = new Set(clean1.split(/\s+/));
    const words2 = new Set(clean2.split(/\s+/));
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }
  
  cleanTextForComparison(text) {
    return text
      .toLowerCase()
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, '') // Remove inline code
      .replace(/#{1,6}\s+/g, '') // Remove headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  async auditRouteAccessibility() {
    logInfo('Auditing route accessibility...');
    
    // Simulate route testing by checking if all expected routes would work
    let routeErrors = 0;
    
    for (const chapter of this.chapters) {
      for (const lesson of chapter.lessons) {
        // Check if lesson file exists (already done, but this validates the route would work)
        const expectedRoute = `/chapter/${chapter.id}/lesson/${lesson.id}`;
        const lessonFile = path.join(chaptersDir, chapter.directory, 'lessons', `${lesson.id}.md`);
        
        if (!fs.existsSync(lessonFile)) {
          logError(`Route ${expectedRoute} would return 404 - missing file`);
          routeErrors++;
        }
      }
    }
    
    if (routeErrors === 0) {
      logSuccess('All routes should be accessible');
    } else {
      logError(`Found ${routeErrors} routes that would return 404`);
    }
    
    auditResults.stats.routeErrors = routeErrors;
  }

  generateAuditSummary() {
    console.log('\n' + '='.repeat(80));
    console.log(`${colors.bright}${colors.cyan}CONTENT AUDIT SUMMARY${colors.reset}`);
    console.log('='.repeat(80));
    
    // Statistics
    console.log(`${colors.bright}📊 Statistics:${colors.reset}`);
    console.log(`  Chapters: ${auditResults.stats.chapterCount || 0}`);
    console.log(`  Valid Chapters: ${auditResults.stats.validChapters || 0}`);
    console.log(`  Total Lessons: ${auditResults.stats.totalLessons || 0}`);
    console.log(`  Valid Lessons: ${auditResults.stats.validLessons || 0}`);
    console.log(`  Unique Videos: ${this.videoIds.size}`);
    
    // Results
    console.log(`\n${colors.bright}🏁 Results:${colors.reset}`);
    console.log(`  ${colors.red}❌ Errors: ${auditResults.errors.length}${colors.reset}`);
    console.log(`  ${colors.yellow}⚠️  Warnings: ${auditResults.warnings.length}${colors.reset}`);
    console.log(`  ${colors.blue}ℹ️  Info Messages: ${auditResults.info.length}${colors.reset}`);
    
    // Critical issues
    if (auditResults.stats.routeErrors > 0) {
      console.log(`\n${colors.red}${colors.bright}🚨 CRITICAL: ${auditResults.stats.routeErrors} routes will return 404 errors${colors.reset}`);
    }
    
    if (auditResults.stats.consistencyErrors > 0) {
      console.log(`\n${colors.red}${colors.bright}🚨 CRITICAL: ${auditResults.stats.consistencyErrors} data consistency errors${colors.reset}`);
    }
    
    // Overall status
    console.log('\n' + '='.repeat(80));
    if (auditResults.errors.length === 0) {
      console.log(`${colors.green}${colors.bright}✅ AUDIT PASSED - No critical errors found${colors.reset}`);
      process.exit(0);
    } else {
      console.log(`${colors.red}${colors.bright}❌ AUDIT FAILED - ${auditResults.errors.length} critical errors found${colors.reset}`);
      process.exit(1);
    }
  }
}

// Run the audit
if (require.main === module) {
  const auditor = new ContentAuditor();
  auditor.runFullAudit().catch(error => {
    logError(`Audit script failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  });
}

module.exports = ContentAuditor; 