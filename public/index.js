console.log("this is index page")

axios.get("http://localhost:3000/views/index")
.then(res=>{
    console.log(res.data.length)

    for(let i=0;i<res.data.length;i++){
        const unorderedlist=document.createElement('ul');
        unorderedlist.setAttribute("id","vaclist")
       // document.getElementById('vacancylist').appendChild(unorderedlist)
        const listElement=document.createElement('li')
        listElement.setAttribute("id","liElement")
        let content=document.createElement('a')
        content.textContent=res.data[i].companyName;
        content.setAttribute("id","newVacancyList")
        content.setAttribute('href',`display/${res.data[i].companyName}`)
        // const content=`<li></a href="display/${res.data[i].companyName}">${res.data[i].companyName}</a></li>`
        document.getElementById('vacancylist').appendChild(unorderedlist)
        unorderedlist.appendChild(listElement)
        listElement.appendChild(content)
        // const contentlist=document.getElementById('vacancylist')
        // contentlist.innerHTML=content;
    }
   
})

axios.get("/.netlify/functions/app/views/index")
.then(res=>{
    console.log(res)

    for(let i=0;i<=res.data.length;i++){
        if(res.data[i].admitCard==1){
        const unorderedlist=document.createElement('ul');
        unorderedlist.setAttribute("id","vaclist")
       // document.getElementById('vacancylist').appendChild(unorderedlist)
        const listElement=document.createElement('li')
        listElement.setAttribute("id","liElement")
        let content=document.createElement('a')
        content.textContent=res.data[i].companyName;
        content.setAttribute("id","newVacancyList")
        content.setAttribute('href',`display/${res.data[i].companyName}`)
        // const content=`<li></a href="display/${res.data[i].companyName}">${res.data[i].companyName}</a></li>`
        document.getElementById('vacancylist1').appendChild(unorderedlist)
        unorderedlist.appendChild(listElement)
        listElement.appendChild(content)
        // const contentlist=document.getElementById('vacancylist')
        // contentlist.innerHTML=content;
        }
    }
   
})

axios.get("/.netlify/functions/app/views/index")
.then(res=>{
    console.log(res)

    for(let i=0;i<=res.data.length;i++){
        if(res.data[i].result==1){
        const unorderedlist=document.createElement('ul');
        unorderedlist.setAttribute("id","vaclist")
       // document.getElementById('vacancylist').appendChild(unorderedlist)
        const listElement=document.createElement('li')
        listElement.setAttribute("id","liElement")
        let content=document.createElement('a')
        content.textContent=res.data[i].companyName;
        content.setAttribute("id","newVacancyList")
        content.setAttribute('href',`display/${res.data[i].companyName}`)
        // const content=`<li></a href="display/${res.data[i].companyName}">${res.data[i].companyName}</a></li>`
        document.getElementById('vacancylist2').appendChild(unorderedlist)
        unorderedlist.appendChild(listElement)
        listElement.appendChild(content)
        // const contentlist=document.getElementById('vacancylist')
        // contentlist.innerHTML=content;
        }
    }
   
})

