#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Function to parse duration string to minutes
function parseDurationToMinutes(duration) {
  const match = duration.match(/(\d+)\s*min/);
  return match ? parseInt(match[1], 10) : 0;
}

// Update a single chapter file
function updateChapterFile(chapterPath) {
  const indexPath = path.join(chapterPath, 'index.json');
  
  if (!fs.existsSync(indexPath)) {
    log(`⚠️  No index.json found in ${chapterPath}`, 'yellow');
    return false;
  }

  try {
    // Read the current file
    const rawData = fs.readFileSync(indexPath, 'utf8');
    const chapterData = JSON.parse(rawData);
    
    log(`📝 Processing ${chapterData.title}...`, 'blue');
    
    // Update lessons to include videoMinutes
    let totalMinutes = 0;
    const updatedLessons = chapterData.lessons.map(lesson => {
      const videoMinutes = lesson.videoMinutes || parseDurationToMinutes(lesson.duration);
      totalMinutes += videoMinutes;
      
      return {
        ...lesson,
        videoMinutes
      };
    });
    
    // Create updated chapter data (remove estimatedHours, add updated lessons)
    const updatedChapterData = {
      id: chapterData.id,
      title: chapterData.title,
      description: chapterData.description,
      order: chapterData.order,
      lessons: updatedLessons
      // estimatedHours removed - will be calculated dynamically
    };
    
    // Write the updated file
    fs.writeFileSync(indexPath, JSON.stringify(updatedChapterData, null, 2));
    log(`✅ Updated ${chapterData.title} (${totalMinutes} minutes total)`, 'green');
    
    return true;
  } catch (error) {
    log(`❌ Error updating ${chapterPath}: ${error.message}`, 'red');
    return false;
  }
}

// Main function
function updateAllChapters() {
  const chaptersDir = path.join(__dirname, '..', 'content', 'chapters');
  
  if (!fs.existsSync(chaptersDir)) {
    log('❌ Chapters directory not found!', 'red');
    process.exit(1);
  }
  
  log('🚀 Starting systematic video minutes update...', 'blue');
  log('', 'reset');
  
  const chapterDirs = fs.readdirSync(chaptersDir).filter(item => {
    const itemPath = path.join(chaptersDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
  
  let successCount = 0;
  let totalCount = chapterDirs.length;
  
  chapterDirs.forEach(chapterDir => {
    const chapterPath = path.join(chaptersDir, chapterDir);
    if (updateChapterFile(chapterPath)) {
      successCount++;
    }
  });
  
  log('', 'reset');
  log(`📊 Update Summary:`, 'blue');
  log(`   ✅ Successfully updated: ${successCount}/${totalCount} chapters`, 'green');
  
  if (successCount === totalCount) {
    log('🎉 All chapters updated successfully!', 'green');
    log('💡 Duration is now calculated dynamically from videoMinutes', 'blue');
  } else {
    log('⚠️  Some chapters had issues - check the output above', 'yellow');
  }
}

// Run the script
if (require.main === module) {
  updateAllChapters();
}

module.exports = { updateAllChapters }; 