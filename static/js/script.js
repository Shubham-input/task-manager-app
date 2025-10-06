// Custom JavaScript for Task Manager

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Auto-hide alerts after 5 seconds with beautiful animation
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        // Add entrance animation
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            alert.style.transition = 'all 0.5s ease';
            alert.style.opacity = '1';
            alert.style.transform = 'translateY(0)';
        }, 100);
        
        setTimeout(() => {
            alert.style.transition = 'all 0.5s ease';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }, 500);
        }, 5000);
    });

    // Beautiful card animations with staggered entrance
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });

    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('animate-float');
        }, index * 200 + 1000);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Task toggle functionality
    const taskToggles = document.querySelectorAll('.task-toggle');
    taskToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const taskId = this.dataset.taskId;
            const taskCard = this.closest('.task-card');
            const originalChecked = this.checked;
            
            // Show loading state
            this.disabled = true;
            
            fetch(`/toggle_task/${taskId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status) {
                    // Update the status badge
                    const statusBadge = taskCard.querySelector('.badge:last-of-type');
                    if (data.status === 'completed') {
                        statusBadge.textContent = 'Completed';
                        statusBadge.className = 'badge bg-success';
                        taskCard.style.opacity = '0.8';
                    } else {
                        statusBadge.textContent = 'Pending';
                        statusBadge.className = 'badge bg-warning';
                        taskCard.style.opacity = '1';
                    }
                    
                    // Show success message
                    showToast('Task status updated successfully!', 'success');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Revert the checkbox
                this.checked = !originalChecked;
                showToast('Failed to update task status. Please try again.', 'error');
            })
            .finally(() => {
                this.disabled = false;
            });
        });
    });

    // Delete confirmation
    const deleteLinks = document.querySelectorAll('a[href*="delete_task"]');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const taskTitle = this.closest('.task-card').querySelector('.card-title').textContent;
            
            if (confirm(`Are you sure you want to delete the task "${taskTitle}"?`)) {
                window.location.href = this.href;
            }
        });
    });

    // Search functionality (if implemented)
    const searchInput = document.getElementById('taskSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const taskCards = document.querySelectorAll('.task-card');
            
            taskCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Priority color coding
    const priorityBadges = document.querySelectorAll('.badge');
    priorityBadges.forEach(badge => {
        const text = badge.textContent.toLowerCase();
        if (text === 'high') {
            badge.classList.add('bg-danger');
        } else if (text === 'medium') {
            badge.classList.add('bg-warning');
        } else if (text === 'low') {
            badge.classList.add('bg-secondary');
        }
    });

    // Status color coding
    const statusBadges = document.querySelectorAll('.badge');
    statusBadges.forEach(badge => {
        const text = badge.textContent.toLowerCase();
        if (text === 'completed') {
            badge.classList.add('bg-success');
        } else if (text === 'in progress') {
            badge.classList.add('bg-info');
        } else if (text === 'pending') {
            badge.classList.add('bg-warning');
        }
    });
});

// Beautiful Toast notification function
function showToast(message, type = 'info') {
    // Create toast element with beautiful styling
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white border-0 glass`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.style.borderRadius = '16px';
    toast.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
    toast.style.backdropFilter = 'blur(10px)';
    
    // Set background based on type
    let bgClass = '';
    let iconClass = '';
    switch(type) {
        case 'success':
            bgClass = 'bg-success';
            iconClass = 'check-circle';
            break;
        case 'error':
            bgClass = 'bg-danger';
            iconClass = 'exclamation-circle';
            break;
        case 'warning':
            bgClass = 'bg-warning';
            iconClass = 'exclamation-triangle';
            break;
        default:
            bgClass = 'bg-info';
            iconClass = 'info-circle';
    }
    
    toast.classList.add(bgClass);
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body d-flex align-items-center">
                <i class="fas fa-${iconClass} me-3 animate-pulse"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Add entrance animation
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    // Add to toast container or create one
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '1055';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Animate entrance
    setTimeout(() => {
        toast.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Initialize and show toast
    const bsToast = new bootstrap.Toast(toast, { delay: 4000 });
    bsToast.show();
    
    // Remove toast element after it's hidden with exit animation
    toast.addEventListener('hidden.bs.toast', function() {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Export functions for global use
window.TaskManager = {
    showToast,
    formatDate,
    formatDateTime
};
