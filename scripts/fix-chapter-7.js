const fs = require('fs');
const path = require('path');

function fixChapter7() {
  console.log('🔧 Fixing Chapter 7: Advanced Features\n');
  
  const chapterPath = path.join(process.cwd(), 'content/chapters/07-advanced-features');
  const indexPath = path.join(chapterPath, 'index.json');
  const lessonsPath = path.join(chapterPath, 'lessons');
  
  // Get actual lesson files
  const actualFiles = fs.readdirSync(lessonsPath)
    .filter(file => file.endsWith('.md'))
    .sort();
  
  console.log('📄 Found lesson files:');
  actualFiles.forEach(file => console.log(`  - ${file}`));
  console.log('');
  
  // Read metadata from each lesson file
  const lessons = [];
  
  actualFiles.forEach(file => {
    const filePath = path.join(lessonsPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract front matter
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      
      // Parse YAML-style front matter manually (simple parsing)
      const metadata = {};
      frontMatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          let value = valueParts.join(':').trim();
          // Remove quotes
          value = value.replace(/^["']|["']$/g, '');
          metadata[key.trim()] = value;
        }
      });
      
      // Create lesson object with defaults
      const lesson = {
        id: metadata.id || file.replace('.md', ''),
        title: metadata.title || 'Untitled Lesson',
        description: metadata.description || 'No description available',
        duration: metadata.duration || '5 min',
        videoId: metadata.videoId || '',
        order: parseInt(metadata.order) || lessons.length + 1,
        videoMinutes: parseInt(metadata.videoMinutes) || parseInt(metadata.duration) || 5
      };
      
      lessons.push(lesson);
      console.log(`✅ Processed: ${lesson.id} - "${lesson.title}"`);
    } else {
      console.log(`⚠️  No front matter found in ${file}`);
    }
  });
  
  // Sort lessons by order
  lessons.sort((a, b) => a.order - b.order);
  
  // Read current index.json
  const chapterData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  
  // Update with new lesson data
  chapterData.lessons = lessons;
  
  // Write updated index.json
  fs.writeFileSync(indexPath, JSON.stringify(chapterData, null, 2));
  
  console.log(`\n✅ Updated ${indexPath}`);
  console.log(`📊 Chapter now has ${lessons.length} lessons properly configured`);
  
  // Show the updated structure
  console.log('\n📚 Updated Chapter 7 Structure:');
  console.log(`Title: ${chapterData.title}`);
  console.log(`Description: ${chapterData.description}`);
  console.log(`Lessons: ${lessons.length}`);
  lessons.forEach(lesson => {
    console.log(`  ${lesson.order}. ${lesson.title} (${lesson.duration})`);
  });
}

// Run the fix
fixChapter7(); 