---
id: 06-snowflake-cortex-comprehensive
title: Additional Snowflake Cortex Tools
description: Extended Cortex capabilities including sentiment analysis and NBA data examples
duration: 4 min
videoId: CAdJNVVZ6bs
order: 6
---

# Additional Snowflake Cortex Tools

## **Overview**

Explore the extended capabilities of Snowflake Cortex beyond basic sentiment analysis. Learn advanced AI functions, real-world applications with sports data, and specialized tools for complex analytics scenarios.

## **Key Learning Objectives**

- **Advanced Cortex Functions**: Master additional AI capabilities
- **Real-World Examples**: Apply Cortex to sports and entertainment data
- **Complex Analytics**: Combine multiple AI functions for deeper insights
- **Performance Optimization**: Efficient use of Cortex resources

## **Extended Cortex Function Library**

### **1. Advanced Text Processing**
```sql
-- Extract key phrases and entities
SELECT 
  article_title,
  SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
    article_content, 
    'What are the main performance metrics mentioned?'
  ) as key_metrics,
  SNOWFLAKE.CORTEX.CLASSIFY_TEXT(
    article_content,
    ['performance', 'strategy', 'financial', 'operational']
  ) as content_category
FROM business_articles;
```

### **2. Question-Answering Capabilities**
```sql
-- NBA data analysis example
SELECT 
  player_name,
  season,
  SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
    player_bio || ' ' || season_stats,
    'What position does this player play and what are their strengths?'
  ) as player_analysis
FROM nba_players
WHERE season = '2023-24';
```

### **3. Advanced Sentiment Granularity**
```sql
-- Multi-dimensional sentiment analysis
SELECT 
  game_id,
  home_team,
  away_team,
  SNOWFLAKE.CORTEX.SENTIMENT(fan_comments) as overall_sentiment,
  SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
    fan_comments,
    'What specific aspects are fans commenting on?'
  ) as sentiment_aspects
FROM game_social_media
WHERE game_date >= current_date - interval '7 days';
```

## **Sports Analytics Use Cases**

### **Player Performance Analysis**
```sql
-- Analyze player performance narratives
WITH player_analysis AS (
  SELECT 
    p.player_name,
    p.team,
    p.position,
    s.points_per_game,
    s.assists_per_game,
    s.rebounds_per_game,
    SNOWFLAKE.CORTEX.SUMMARIZE(
      listagg(m.game_recap, ' ') within group (order by m.game_date)
    ) as season_narrative
  FROM players p
  JOIN stats s ON p.player_id = s.player_id
  JOIN media_coverage m ON p.player_id = m.player_id
  WHERE s.season = '2023-24'
  GROUP BY p.player_name, p.team, p.position, s.points_per_game, s.assists_per_game, s.rebounds_per_game
)
SELECT 
  player_name,
  team,
  points_per_game,
  SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
    season_narrative,
    'What are this player''s main contributions to team success?'
  ) as key_contributions
FROM player_analysis
ORDER BY points_per_game DESC;
```

### **Team Strategy Analysis**
```sql
-- Analyze coaching strategies from game recaps
SELECT 
  t.team_name,
  t.coach_name,
  count(*) as games_analyzed,
  SNOWFLAKE.CORTEX.CLASSIFY_TEXT(
    listagg(gr.strategy_notes, ' ') within group (order by gr.game_date),
    ['offensive', 'defensive', 'pace', 'rotation', 'adjustment']
  ) as primary_strategy_focus,
  avg(gr.team_score) as avg_score
FROM teams t
JOIN game_recaps gr ON t.team_id = gr.team_id
WHERE gr.season = '2023-24'
GROUP BY t.team_name, t.coach_name;
```

### **Fan Engagement Insights**
```sql
-- Multi-platform fan sentiment analysis
SELECT 
  event_type,
  platform,
  date_trunc('week', post_date) as week,
  count(*) as post_count,
  avg(SNOWFLAKE.CORTEX.SENTIMENT(post_content)) as avg_sentiment,
  SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
    listagg(post_content, ' | ') within group (order by engagement_score desc limit 100),
    'What are fans most excited or concerned about?'
  ) as fan_themes
FROM social_media_posts
WHERE post_date >= current_date - interval '30 days'
GROUP BY event_type, platform, date_trunc('week', post_date);
```

## **Advanced Integration Patterns**

### **1. Multi-Function Workflows**
```sql
-- Comprehensive content analysis pipeline
WITH content_processing AS (
  SELECT 
    content_id,
    original_text,
    -- Step 1: Classify content type
    SNOWFLAKE.CORTEX.CLASSIFY_TEXT(
      original_text,
      ['news', 'opinion', 'analysis', 'recap', 'preview']
    ) as content_type,
    -- Step 2: Extract sentiment
    SNOWFLAKE.CORTEX.SENTIMENT(original_text) as sentiment_score,
    -- Step 3: Summarize key points
    SNOWFLAKE.CORTEX.SUMMARIZE(original_text) as key_summary,
    -- Step 4: Answer specific questions
    SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
      original_text,
      'What are the main topics and conclusions?'
    ) as main_topics
  FROM content_library
)
SELECT 
  content_type,
  count(*) as content_count,
  avg(sentiment_score) as avg_sentiment,
  listagg(distinct main_topics, ' | ') as common_topics
FROM content_processing
GROUP BY content_type;
```

### **2. Real-Time Processing**
```sql
-- Stream processing with Cortex functions
CREATE OR REPLACE STREAM social_stream ON social_media_posts;

-- Process new posts with AI analysis
SELECT 
  post_id,
  user_id,
  platform,
  SNOWFLAKE.CORTEX.SENTIMENT(post_content) as sentiment,
  SNOWFLAKE.CORTEX.CLASSIFY_TEXT(
    post_content,
    ['positive_experience', 'complaint', 'question', 'compliment']
  ) as post_category,
  current_timestamp() as processed_at
FROM social_stream
WHERE METADATA$ACTION = 'INSERT';
```

### **3. Comparative Analysis**
```sql
-- Compare team strategies across seasons
SELECT 
  team_name,
  season,
  SNOWFLAKE.CORTEX.EXTRACT_ANSWER(
    season_analysis,
    'What were the key strategic changes compared to previous seasons?'
  ) as strategic_evolution,
  wins,
  losses,
  win_percentage
FROM (
  SELECT 
    t.team_name,
    s.season,
    s.wins,
    s.losses,
    s.wins / (s.wins + s.losses) as win_percentage,
    SNOWFLAKE.CORTEX.SUMMARIZE(
      listagg(ga.strategy_notes, ' ') within group (order by ga.game_date)
    ) as season_analysis
  FROM teams t
  JOIN season_stats s ON t.team_id = s.team_id
  JOIN game_analysis ga ON t.team_id = ga.team_id AND s.season = ga.season
  GROUP BY t.team_name, s.season, s.wins, s.losses
) team_seasons;
```

## **Performance Optimization**

### **1. Efficient Function Usage**
```sql
-- Batch processing for large datasets
SELECT 
  batch_id,
  count(*) as records_processed,
  avg(processing_time_ms) as avg_processing_time
FROM (
  SELECT 
    ceil(row_number() over (order by content_id) / 1000.0) as batch_id,
    content_id,
    datediff('millisecond', 
      current_timestamp(), 
      current_timestamp()
    ) as processing_time_ms,
    SNOWFLAKE.CORTEX.SENTIMENT(content_text) as sentiment
  FROM large_content_table
) batched_processing
GROUP BY batch_id;
```

### **2. Caching Strategies**
```sql
-- Cache expensive AI function results
CREATE OR REPLACE TABLE ai_function_cache AS
SELECT 
  hash(input_text) as text_hash,
  input_text,
  SNOWFLAKE.CORTEX.SENTIMENT(input_text) as sentiment_result,
  SNOWFLAKE.CORTEX.SUMMARIZE(input_text) as summary_result,
  current_timestamp() as cached_at
FROM content_to_process;

-- Use cached results when available
SELECT 
  c.content_id,
  coalesce(cache.sentiment_result, 
           SNOWFLAKE.CORTEX.SENTIMENT(c.content_text)) as sentiment,
  coalesce(cache.summary_result,
           SNOWFLAKE.CORTEX.SUMMARIZE(c.content_text)) as summary
FROM content c
LEFT JOIN ai_function_cache cache ON hash(c.content_text) = cache.text_hash;
```

## **Business Applications Beyond Sports**

### **Customer Service Analytics**
- **Issue Classification**: Automatically categorize support tickets
- **Escalation Prediction**: Identify tickets likely to escalate
- **Resolution Tracking**: Analyze resolution effectiveness
- **Agent Performance**: Monitor service quality through AI analysis

### **Market Intelligence**
- **Competitor Monitoring**: Analyze competitor news and announcements
- **Trend Detection**: Identify emerging market trends
- **Risk Assessment**: Monitor potential business risks
- **Opportunity Identification**: Spot new business opportunities

### **Content Strategy**
- **Content Performance**: Analyze which content resonates
- **Audience Insights**: Understand audience preferences
- **SEO Optimization**: Optimize content for search engines
- **Campaign Effectiveness**: Measure marketing campaign success

## **Next Steps**

After mastering additional Cortex tools:
1. **Explore Embedded AI Capabilities** → Lesson 7
2. **Implement Advanced Workflows** → Build complex AI pipelines
3. **Optimize Performance** → Fine-tune AI function usage
4. **Expand Use Cases** → Apply to new business domains

---

*Leverage the full power of Snowflake Cortex AI tools for comprehensive analytics across any domain.* 