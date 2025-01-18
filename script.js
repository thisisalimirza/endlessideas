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
        "{number} Proven Ways to {goal} in Your {topic} Journey",
        "How to {goal} in {timeframe}: A Blueprint for {audience}",
        "The Ultimate {topic} Checklist for {audience}",
        "Master {topic} with These {number} Daily Habits",
        "{number} {topic} Exercises That Will Help You {goal}",
        "The Beginner's Guide to {goal} in {timeframe}",
        "Transform Your {topic} Results with These {number} Strategies"
    ],
    aspirational: [
        "How I Went From {startPoint} to {endPoint} in {topic}",
        "The Secret to {goal} That Nobody Talks About",
        "Why Most {audience} Fail at {topic} (And How to Succeed)",
        "The {topic} Mindset That Will Change Your Life",
        "Break Through Your {topic} Plateau with This Simple Shift",
        "From Zero to Hero: My {topic} Journey and What I Learned",
        "The Hidden Truth About {topic} Success",
        "Unlock Your {topic} Potential with This Framework"
    ],
    analytical: [
        "{number} Data-Backed {topic} Strategies That Actually Work",
        "The Science Behind Successful {topic} Practice",
        "What {number} Top {audience} Can Teach Us About {topic}",
        "Analysis: Why {topic} Methods Fail (And What Works Instead)",
        "The ROI of {topic}: Breaking Down the Numbers",
        "Case Study: How {audience} Achieve {goal}",
        "{topic} Trends That Will Define {timeframe}",
        "The Mathematics of {topic}: Understanding the Core Principles"
    ],
    anthropological: [
        "Why {audience} Struggle with {topic} (And How to Fix It)",
        "The Psychology Behind Successful {topic} Habits",
        "What Your {topic} Style Says About You",
        "{number} Common {topic} Myths Debunked",
        "The Cultural Impact of {topic} on Modern {audience}",
        "Understanding the {audience} Mindset: A Deep Dive into {topic}",
        "The Evolution of {topic}: From Past to Present",
        "How {topic} Shapes {audience} Identity"
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
    
    return template
        .replace('{topic}', data.topic)
        .replace('{audience}', data.audience)
        .replace('{goal}', data.goal)
        .replace('{number}', numbers[Math.floor(Math.random() * numbers.length)])
        .replace('{timeframe}', timeframes[Math.floor(Math.random() * timeframes.length)])
        .replace('{startPoint}', 'Struggling')
        .replace('{endPoint}', 'Mastery');
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

function clearSavedIdeas() {
    localStorage.removeItem('savedIdeas');
    updateSavedIdeasList();
    // Clear selected state of all save buttons
    document.querySelectorAll('.save-idea').forEach(btn => {
        btn.classList.remove('selected');
    });
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
    const goal = document.getElementById('keyProblem').value.trim();
    const ideasPerCategory = parseInt(document.getElementById('ideasPerCategory').value);

    if (!topic || !audience || !goal) {
        alert('Please fill in all fields to generate ideas!');
        return;
    }

    const data = {
        topic: topic,
        audience: audience,
        goal: goal
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
            const selectedTemplates = getRandomItems(templates[category], ideasPerCategory);
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
}

// Initialize everything after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize saved ideas list
    updateSavedIdeasList();
    
    // Event listeners for idea generation
    document.getElementById('generateBtn').addEventListener('click', generateIdeas);
    
    // Event listeners for saving/exporting/clearing ideas
    document.getElementById('saveAllIdeas').addEventListener('click', saveAllGeneratedIdeas);
    document.getElementById('exportIdeas').addEventListener('click', exportToCSV);
    document.getElementById('clearSaved').addEventListener('click', clearSavedIdeas);
    
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
    
    // Modal close handlers
    const modal = document.getElementById('frameworkModal');
    const closeModal = document.querySelector('.close-modal');
    
    closeModal.addEventListener('click', closeFrameworkModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeFrameworkModal();
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeFrameworkModal();
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