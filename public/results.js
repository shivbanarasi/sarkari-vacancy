document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/.netlify/functions/app/views/results');
        const data = await response.json();
        
        const container = document.getElementById('results-list');
        
        if (data.length === 0) {
            container.innerHTML = '<p class="no-data">No results found</p>';
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${item.company_name}</h3>
                <p><i class="fas fa-calendar-alt"></i> Notification Date: ${item.notification_date || 'N/A'}</p>
                <p><i class="fas fa-users"></i> Vacancies: ${item.total_vacancy}</p>
                ${item.download_notification ? 
                    `<a href="${item.download_notification}" target="_blank" class="btn">
                        <i class="fas fa-download"></i> Download Notification
                    </a>` : ''
                }
                <a href="/display.html?id=${item.id}" class="btn">
                    <i class="fas fa-info-circle"></i> View Details
                </a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading notifications:', error);
        document.getElementById('notifications-list').innerHTML = `
            <p class="error">Error loading notifications. Please try again later.</p>
        `;
    }
});