const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-one')
const messagetwo = document.querySelector('#message-two')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    messageone.textContent ='Loading..'
    messagetwo.textContent =''

    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
        }else {
            messagetwo.textContent = data.location
            messageone.textContent = data.data
        }
    })
   })
})