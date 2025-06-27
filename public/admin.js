console.log('this is admin page');

//sending data to server
// document.getElementById('saveData').addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const data={
//         name:e.target.name.value,
//         notificationDate:e.target.notificationdate.value,
//         applicationStartDate:e.target.applicationstartdate.value,
//         applicationEndDate:e.target.applicationenddate.value,
//         totalVacancy:e.target.vacancy.value,
//         apply:e.target.apply.value
//     }
//     axios.post('http://localhost:3000/views/admin.html',data)
//     .then((res)=>{
//         console.log(res)
//     })
// })

// const resp=axios.get("http://localhost:3000/views/display")
// console.log(resp)