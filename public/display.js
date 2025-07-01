document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        window.location.href = '/index.html';
        return;
    }

    try {
        const response = await fetch(`/.netlify/functions/app/views/display/${id}`);
        const data = await response.json();
        
        const container = document.getElementById('vacancy-detail');
        
        if (!data || data.length === 0) {
            container.innerHTML = '<p class="no-data">Vacancy not found</p>';
            return;
        }

        const item = data[0];
        container.innerHTML = `
            <h1>${item.company_name}</h1>
            
            <div class="detail-section">
                <h2><i class="fas fa-calendar-alt"></i> Important Dates</h2>
                <p>Notification Date: ${item.notification_date || 'N/A'}</p>
                <p>Application Period: ${item.app_start_date} to ${item.app_end_date}</p>
                ${item.admit_card_date ? `<p>Exam Date: ${item.admit_card_date}</p>` : ''}
            </div>
            
            <div class="detail-section">
                <h2><i class="fas fa-info-circle"></i> Details</h2>
                <p>Total Vacancies: ${item.total_vacancy}</p>
                ${item.syllabus_and_edu ? `
                <div class="syllabus">
                    <h3>Syllabus & Education Qualification</h3>
                    <a href="${item.syllabus_and_edu}" download>Download Syllabus</a>
                </div>` : ''}
            </div>
            
            <div class="action-links">
                ${item.apply ? `<a href="${item.apply}" class="btn" target="_blank">Apply Online</a>` : ''}
                ${item.download_notification ? `<a href="${item.download_notification}" class="btn" target="_blank">Download Notification</a>` : ''}
                ${item.download_admit_card ? `<a href="${item.download_admit_card}" class="btn" target="_blank">Download Admit Card</a>` : ''}
                ${item.download_result ? `<a href="${item.download_result}" class="btn" target="_blank">Download Result</a>` : ''}
            </div>
        `;
    } catch (error) {
        console.error('Error loading details:', error);
        document.getElementById('vacancy-detail').innerHTML = `
            <p class="error">Error loading vacancy details. Please try again later.</p>
        `;
    }
});