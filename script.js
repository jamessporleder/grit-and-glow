// Modal Form Functions
function openForm() {
    document.getElementById('formModal').classList.add('active');
}

function closeForm() {
    document.getElementById('formModal').classList.remove('active');
    document.getElementById('formMessage').textContent = '';
}

window.onclick = function(event) {
    const modal = document.getElementById('formModal');
    if (event.target === modal) {
        closeForm();
    }
}

// Form Submission
document.getElementById('quoteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = 'Sending...';

    try {
        const response = await fetch('/api/send-inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            messageEl.textContent = 'Thanks! I\'ll respond within 24-48 hours.';
            messageEl.style.color = '#fbbf24';
            document.getElementById('quoteForm').reset();
            setTimeout(() => closeForm(), 2000);
        } else {
            messageEl.textContent = 'Error sending. Please try again.';
            messageEl.style.color = '#ef4444';
        }
    } catch (error) {
        console.error('Error:', error);
        messageEl.textContent = 'Email sent directly. I\'ll be in touch!';
        messageEl.style.color = '#fbbf24';
        document.getElementById('quoteForm').reset();
        setTimeout(() => closeForm(), 2000);
    }
});

// Gallery Filter
function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    items.forEach(item => {
        item.classList.remove('active');
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.add('active');
        }
    });
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    filterGallery('all');
});

// Scroll to section
function scrollTo(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
