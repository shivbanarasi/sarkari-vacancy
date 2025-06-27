console.log("this is index page")
document.querySelector('.loader-wrapper').style.display = 'flex';


axios.get("/.netlify/functions/app/views/index")
.then(res=>{
    console.log(res.data.length)

   // In your index.js, update the vacancy creation code:
for(let i=0;i<res.data.length;i++){
    const vacancyCard = document.createElement('div');
    vacancyCard.className = 'vacancy-card';
    
    vacancyCard.innerHTML = `
        <div class="vacancy-header">
            <h3>${res.data[i].companyName}</h3>
            <span class="badge">New</span>
        </div>
        <div class="vacancy-dates">
            <p><i class="far fa-calendar-alt"></i> Starts: ${new Date(res.data[i].appStartDate).toLocaleDateString()}</p>
            <p><i class="far fa-calendar-times"></i> Ends: ${new Date(res.data[i].appEndDate).toLocaleDateString()}</p>
        </div>
        <div class="vacancy-footer">
            <a href="display/${res.data[i].companyName}" class="btn-apply">View Details</a>
            <span class="vacancy-count">${res.data[i].totalVacancy} Positions</span>
        </div>
    `;
    
    document.getElementById('vacancylist').appendChild(vacancyCard);
}
})
.finally(() => {
    // Hide loader when done
    document.querySelector('.loader-wrapper').style.display = 'none';
});

axios.get("/.netlify/functions/app/views/index")
.then(res=>{
    console.log(res)

    // In your index.js, update the vacancy creation code:
for(let i=0;i<res.data.length;i++){
    const vacancyCard = document.createElement('div');
    vacancyCard.className = 'vacancy-card';
    
    vacancyCard.innerHTML = `
        <div class="vacancy-header">
            <h3>${res.data[i].companyName}</h3>
            <span class="badge">New</span>
        </div>
        <div class="vacancy-dates">
            <p><i class="far fa-calendar-alt"></i> Starts: ${new Date(res.data[i].appStartDate).toLocaleDateString()}</p>
            <p><i class="far fa-calendar-times"></i> Ends: ${new Date(res.data[i].appEndDate).toLocaleDateString()}</p>
        </div>
        <div class="vacancy-footer">
            <a href="display/${res.data[i].companyName}" class="btn-apply">View Details</a>
            <span class="vacancy-count">${res.data[i].totalVacancy} Positions</span>
        </div>
    `;
    
    document.getElementById('vacancylist').appendChild(vacancyCard);
}
   
})
.finally(() => {
    // Hide loader when done
    document.querySelector('.loader-wrapper').style.display = 'none';
});

axios.get("/.netlify/functions/app/views/index")
.then(res=>{
    console.log(res)

    // In your index.js, update the vacancy creation code:
for(let i=0;i<res.data.length;i++){
    const vacancyCard = document.createElement('div');
    vacancyCard.className = 'vacancy-card';
    
    vacancyCard.innerHTML = `
        <div class="vacancy-header">
            <h3>${res.data[i].companyName}</h3>
            <span class="badge">New</span>
        </div>
        <div class="vacancy-dates">
            <p><i class="far fa-calendar-alt"></i> Starts: ${new Date(res.data[i].appStartDate).toLocaleDateString()}</p>
            <p><i class="far fa-calendar-times"></i> Ends: ${new Date(res.data[i].appEndDate).toLocaleDateString()}</p>
        </div>
        <div class="vacancy-footer">
            <a href="display/${res.data[i].companyName}" class="btn-apply">View Details</a>
            <span class="vacancy-count">${res.data[i].totalVacancy} Positions</span>
        </div>
    `;
    
    document.getElementById('vacancylist').appendChild(vacancyCard);
}
   
})
.finally(() => {
    // Hide loader when done
    document.querySelector('.loader-wrapper').style.display = 'none';
});

