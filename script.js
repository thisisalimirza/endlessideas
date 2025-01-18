// Framework information
const frameworkInfo = {
    actionable: {
        title: "Actionable Content 🎯",
        description: "Content that provides practical, step-by-step guidance that readers can implement immediately. This type focuses on tactical advice and concrete solutions.",
        examples: [
            "Step-by-step tutorials",
            "How-to guides",
            "Checklists and templates",
            "Implementation strategies",
            "Quick-start guides"
        ]
    },
    aspirational: {
        title: "Aspirational Content ⭐",
        description: "Content that inspires and motivates by showing what's possible. This type focuses on success stories, transformations, and achieving ambitious goals.",
        examples: [
            "Success stories",
            "Personal transformations",
            "Behind-the-scenes looks",
            "Vision and goal setting",
            "Inspirational case studies"
        ]
    },
    analytical: {
        title: "Analytical Content 📊",
        description: "Content that provides data-driven insights and deep analysis. This type focuses on research, trends, and strategic thinking backed by evidence.",
        examples: [
            "Data analysis",
            "Market research",
            "Industry trends",
            "Performance metrics",
            "Comparative studies"
        ]
    },
    anthropological: {
        title: "Anthropological Content 🧠",
        description: "Content that explores human behavior, cultural patterns, and psychological insights. This type focuses on understanding why people do what they do.",
        examples: [
            "Behavioral studies",
            "Cultural observations",
            "Psychological insights",
            "Social trends",
            "Community analysis"
        ]
    }
};

// Template generators for each category of the 4A's Framework
const templates = {
    actionable: [
        "The Step-by-Step Guide to {goal} for {audience}",
        "{number} Proven Ways to Overcome {problem} in Your {topic} Journey",
        "How to {goal} in {timeframe}: A Blueprint for {audience}",
        "The Ultimate {topic} Checklist for Solving {problem}",
        "Master {topic} with These {number} Daily Habits",
        "{number} {topic} Exercises That Will Help You {goal}",
        "The Beginner's Guide to Overcoming {problem} in {timeframe}",
        "Transform Your {topic} Results: From {problem} to {goal}",
        "Quick-Start Guide: {goal} for Busy {audience}",
        "The Complete {topic} Toolkit: From {problem} to {goal}",
        "{number} Actionable Steps to Master {topic} Today",
        "Your {timeframe} Action Plan for {goal}",
        "Essential {topic} Strategies for {audience}",
        "The No-Nonsense Guide to {goal} in {topic}",
        "Practical Solutions for {problem} in {topic}"
    ],
    aspirational: [
        "How I Overcame {problem} to Achieve {goal} in {topic}",
        "The Secret to {goal} That Nobody Talks About",
        "Why Most {audience} Struggle with {problem} (And How to Succeed)",
        "The {topic} Mindset That Will Transform {problem} into Success",
        "Break Through Your {problem} Plateau with This Simple Shift",
        "From Struggling with {problem} to Achieving {goal}: My {topic} Journey",
        "The Hidden Truth About Overcoming {problem}",
        "Unlock Your {topic} Potential: Moving Past {problem}",
        "The Extraordinary Journey: From {problem} to {goal}",
        "Redefining Success in {topic}: A Vision for {audience}",
        "Beyond Limits: Transforming Your Approach to {topic}",
        "The Art of Mastering {topic}: A Success Story",
        "Dream Bigger: Revolutionary {topic} Strategies",
        "The {audience}'s Path to {topic} Excellence",
        "Breakthrough Moments in {topic}: From Vision to Reality"
    ],
    analytical: [
        "{number} Data-Backed Solutions to {problem} in {topic}",
        "The Science Behind Overcoming {problem} in {topic}",
        "What {number} Top {audience} Can Teach Us About Solving {problem}",
        "Analysis: Why {problem} Persists (And What Actually Works)",
        "The ROI of Solving {problem}: Breaking Down the Numbers",
        "Case Study: How {audience} Achieve {goal} Despite {problem}",
        "{topic} Trends That Will Help You Overcome {problem}",
        "The Mathematics of {topic}: Solving {problem} Systematically",
        "Statistical Analysis: {topic} Success Factors",
        "Measuring {topic} Progress: Key Performance Indicators",
        "Research-Backed Strategies for {goal} in {topic}",
        "The Data-Driven Approach to Solving {problem}",
        "Comparative Analysis: Top {topic} Methods",
        "Evidence-Based Solutions for {audience} in {topic}",
        "Quantifying Success: {topic} Metrics That Matter"
    ],
    anthropological: [
        "Why {audience} Struggle with {problem} (And How to Fix It)",
        "The Psychology Behind Overcoming {problem} in {topic}",
        "What Your Approach to {problem} Says About You",
        "{number} Common {problem} Myths Debunked",
        "The Cultural Impact of {problem} on Modern {audience}",
        "Understanding the {problem} Mindset: A Deep Dive into {topic}",
        "The Evolution of {problem}: From Challenge to Opportunity",
        "How {problem} Shapes {audience} Identity (And How to Change It)",
        "The Social Dynamics of {topic} Success",
        "Cultural Perspectives on {topic} Excellence",
        "Behavioral Patterns in Successful {topic} Practitioners",
        "The Human Element: {topic} Beyond the Basics",
        "Community Insights: How {audience} Navigate {problem}",
        "The Psychology of {topic} Mastery",
        "Social Trends Reshaping {topic} Practice"
    ]
};

// Helper function to get random items from an array
function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Helper function to replace template placeholders
function fillTemplate(template, data) {
    const numbers = ['3', '5', '7', '10', '12', '15'];
    const timeframes = ['30 Days', '60 Days', '90 Days', '6 Months', 'One Year'];
    
    let filledTemplate = template
        .replace('{topic}', data.topic)
        .replace('{audience}', data.audience)
        .replace('{number}', numbers[Math.floor(Math.random() * numbers.length)])
        .replace('{timeframe}', timeframes[Math.floor(Math.random() * timeframes.length)])
        .replace('{startPoint}', 'Struggling')
        .replace('{endPoint}', 'Mastery');

    // Handle goal and problem separately based on context
    if (template.includes('{goal}')) {
        filledTemplate = filledTemplate.replace('{goal}', data.goal);
    }
    if (template.includes('{problem}')) {
        filledTemplate = filledTemplate.replace('{problem}', data.problem);
    }
    
    return filledTemplate;
}

// Local storage and saving functions
function getSavedIdeas() {
    const saved = localStorage.getItem('savedIdeas');
    return saved ? JSON.parse(saved) : [];
}

function saveIdea(idea, category) {
    const savedIdeas = getSavedIdeas();
    if (!savedIdeas.find(saved => saved.idea === idea)) {
        savedIdeas.push({ idea, category, timestamp: new Date().toISOString() });
        localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
        updateSavedIdeasList();
    }
}

function updateSavedIdeasList() {
    const savedIdeasList = document.getElementById('savedIdeasList');
    const savedIdeasSection = document.getElementById('savedIdeas');
    const savedIdeas = getSavedIdeas();
    
    savedIdeasList.innerHTML = '';
    if (savedIdeas.length > 0) {
        savedIdeasSection.style.display = 'block';
        savedIdeas.forEach(({idea, category}) => {
            const li = document.createElement('li');
            li.textContent = idea;
            
            // Add category badge
            const badge = document.createElement('span');
            badge.className = 'category-badge';
            badge.textContent = category;
            li.insertBefore(badge, li.firstChild);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
            deleteBtn.className = 'delete-idea';
            deleteBtn.onclick = () => {
                const updatedIdeas = getSavedIdeas().filter(i => i.idea !== idea);
                localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
                updateSavedIdeasList();
                
                // Update save button state
                const saveBtn = document.querySelector(`.save-idea[data-idea="${idea}"]`);
                if (saveBtn) {
                    saveBtn.classList.remove('selected');
                }
            };
            li.appendChild(deleteBtn);
            savedIdeasList.appendChild(li);
        });
    } else {
        savedIdeasSection.style.display = 'none';
    }
}

// Export to CSV function
function exportToCSV() {
    const savedIdeas = getSavedIdeas();
    if (savedIdeas.length === 0) {
        alert('No ideas saved to export!');
        return;
    }
    
    // Create CSV content
    const csvContent = [
        ['Category', 'Idea', 'Date Saved'],
        ...savedIdeas.map(({idea, category, timestamp}) => [
            category,
            idea,
            new Date(timestamp).toLocaleDateString()
        ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `saved_ideas_${new Date().toISOString().split('T')[0]}.csv`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Modal functionality
function showFrameworkInfo(framework) {
    const modal = document.getElementById('frameworkModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalExamples = document.getElementById('modalExamples');
    
    const info = frameworkInfo[framework];
    modalTitle.textContent = info.title;
    modalDescription.textContent = info.description;
    
    // Create examples list
    modalExamples.innerHTML = `
        <h4>Examples:</h4>
        <ul>
            ${info.examples.map(example => `<li>${example}</li>`).join('')}
        </ul>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeFrameworkModal() {
    const modal = document.getElementById('frameworkModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Main idea generation function
function generateIdeas() {
    const topic = document.getElementById('mainTopic').value.trim();
    const audience = document.getElementById('targetAudience').value.trim();
    const problem = document.getElementById('keyProblem').value.trim();
    const goal = document.getElementById('desiredGoal').value.trim();
    const ideasPerCategory = parseInt(document.getElementById('ideasPerCategory').value);

    if (!topic || !audience) {
        alert('Please fill in the Topic and Audience fields!');
        return;
    }

    if (!problem && !goal) {
        alert('Please fill in either a Problem to solve or a Goal to achieve (or both)!');
        return;
    }

    // Show the framework results container and output controls
    document.querySelector('.framework-results').style.display = 'grid';
    document.querySelector('.output-controls').style.display = 'flex';

    const data = {
        topic: topic,
        audience: audience,
        problem: problem || "this challenge", // fallback for problem-focused templates
        goal: goal || "succeed" // fallback for goal-focused templates
    };

    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('.category-toggles input:checked'))
        .map(checkbox => checkbox.dataset.category);

    // Generate ideas for each selected category
    Object.keys(templates).forEach(category => {
        const list = document.getElementById(`${category}List`);
        const categorySection = list.closest('.framework-category');
        
        if (selectedCategories.includes(category)) {
            categorySection.style.display = 'block';
            
            // Filter templates based on available inputs
            const availableTemplates = templates[category].filter(template => {
                const needsProblem = template.includes('{problem}');
                const needsGoal = template.includes('{goal}');
                
                // Include template if:
                // 1. It needs a problem and we have one, or
                // 2. It needs a goal and we have one, or
                // 3. It doesn't need either
                return (!needsProblem || problem) && (!needsGoal || goal);
            });

            if (availableTemplates.length === 0) {
                list.innerHTML = '<li class="no-ideas">No templates available for the provided inputs</li>';
                return;
            }

            const selectedTemplates = getRandomItems(availableTemplates, Math.min(ideasPerCategory, availableTemplates.length));
            const ideas = selectedTemplates.map(template => fillTemplate(template, data));
            
            list.innerHTML = '';
            ideas.forEach(idea => {
                const li = document.createElement('li');
                li.textContent = idea;
                
                // Add save button with improved functionality
                const saveBtn = document.createElement('button');
                saveBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
                saveBtn.className = 'save-idea';
                saveBtn.dataset.idea = idea;
                saveBtn.onclick = () => {
                    if (!saveBtn.classList.contains('selected')) {
                        saveBtn.classList.add('selected');
                        saveIdea(idea, category);
                    }
                };
                
                li.appendChild(saveBtn);
                list.appendChild(li);
            });
        } else {
            categorySection.style.display = 'none';
        }
    });

    // Scroll to results
    document.querySelector('.output-section').scrollIntoView({ behavior: 'smooth' });
}

// Save all generated ideas
function saveAllGeneratedIdeas() {
    const saveAllBtn = document.getElementById('saveAllIdeas');
    const isUnselectMode = saveAllBtn.textContent.includes('Unselect');

    if (isUnselectMode) {
        // Unselect all mode
        document.querySelectorAll('.idea-list li').forEach(li => {
            const saveBtn = li.querySelector('.save-idea');
            if (saveBtn && saveBtn.classList.contains('selected')) {
                const idea = li.textContent;
                // Remove from saved ideas
                const savedIdeas = getSavedIdeas().filter(i => i.idea !== idea);
                localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
                saveBtn.classList.remove('selected');
            }
        });
        saveAllBtn.innerHTML = '<i class="fas fa-bookmark"></i> Save All Ideas';
        // Clear all saved ideas
        localStorage.removeItem('savedIdeas');
        updateSavedIdeasList();
    } else {
        // Save all mode
        document.querySelectorAll('.idea-list li').forEach(li => {
            const saveBtn = li.querySelector('.save-idea');
            if (saveBtn && !saveBtn.classList.contains('selected')) {
                // Find the category from the parent framework-category
                const category = li.closest('.framework-category')
                    .querySelector('.framework-title')
                    .dataset.framework;
                
                saveBtn.classList.add('selected');
                saveIdea(li.textContent, category);
            }
        });
        saveAllBtn.innerHTML = '<i class="fas fa-bookmark"></i> Unselect All Ideas';
    }
    updateSavedIdeasList();
}

function clearAll() {
    // Clear all input fields
    document.getElementById('mainTopic').value = '';
    document.getElementById('targetAudience').value = '';
    document.getElementById('keyProblem').value = '';
    document.getElementById('desiredGoal').value = '';

    // Reset ideas per category to default
    document.getElementById('ideasPerCategory').value = '5';

    // Check all category toggles
    document.querySelectorAll('.category-toggles input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });

    // Hide the results section and output controls
    document.querySelector('.framework-results').style.display = 'none';
    document.querySelector('.output-controls').style.display = 'none';

    // Clear all idea lists
    ['actionableList', 'aspirationalList', 'analyticalList', 'anthropologicalList'].forEach(listId => {
        document.getElementById(listId).innerHTML = '';
    });

    // Clear saved ideas
    localStorage.removeItem('savedIdeas');
    updateSavedIdeasList();

    // Hide advanced panel if it's open
    document.getElementById('advancedPanel').style.display = 'none';
}

// Initialize everything after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize saved ideas list
    updateSavedIdeasList();
    
    // Event listeners for idea generation
    document.getElementById('generateBtn').addEventListener('click', generateIdeas);
    
    // Event listeners for saving/exporting ideas
    document.getElementById('saveAllIdeas').addEventListener('click', saveAllGeneratedIdeas);
    document.getElementById('exportIdeas').addEventListener('click', exportToCSV);
    document.getElementById('clearAllBtn').addEventListener('click', clearAll);
    
    // Advanced options toggle
    document.getElementById('toggleAdvanced').addEventListener('click', () => {
        const panel = document.getElementById('advancedPanel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    
    // Framework title click handlers
    document.querySelectorAll('.framework-title').forEach(title => {
        title.addEventListener('click', () => {
            const framework = title.dataset.framework;
            showFrameworkInfo(framework);
        });
    });

    // Info button click handlers
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.dataset.modal + 'Modal';
            document.getElementById(modalId).style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Modal close handlers
    document.querySelectorAll('.modal .close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });
    
    // Handle Enter key in input fields
    const inputFields = document.querySelectorAll('input[type="text"]');
    inputFields.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateIdeas();
            }
        });
    });
}); 