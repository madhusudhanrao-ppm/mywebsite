// Timeline data
const timelineData = [
    {
        year: 2000,
        title: "Company Founded",
        description: "HealthFin Solutions was established with a vision to bridge healthcare and financial services."
    },
    {
        year: 2005,
        title: "Digital Transformation",
        description: "Launched our first digital platform for integrated healthcare payment solutions."
    },
    {
        year: 2010,
        title: "National Expansion",
        description: "Expanded operations to 25 states, serving over 100 major healthcare institutions."
    },
    {
        year: 2015,
        title: "Innovation Award",
        description: "Received the Healthcare Financial Management Innovation Award for our AI-powered billing system."
    },
    {
        year: 2020,
        title: "Global Reach",
        description: "Extended services internationally, partnering with healthcare providers in Europe and Asia."
    },
    {
        year: 2025,
        title: "Future Vision",
        description: "Projected to revolutionize healthcare financing with blockchain and AI integration."
    }
];

// Populate timeline
function populateTimeline() {
    const container = document.querySelector('.timeline-container');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const content = document.createElement('div');
        content.className = 'timeline-content';
        
        content.innerHTML = `
            <h3>${item.year}</h3>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        `;
        
        timelineItem.appendChild(content);
        container.appendChild(timelineItem);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateTimeline();
});

// Add scroll animation for timeline items
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items after they're created
setTimeout(() => {
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-in-out';
        observer.observe(item);
    });
}, 100);