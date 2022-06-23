const trashCans = document.querySelectorAll('.fa-trash')
const thumbBtn = document.querySelectorAll('.fa-thumbs-up')

Array.from(trashCans).forEach((element) => {
    element.addEventListener('click', deleteTask)
})
Array.from(thumbBtn).forEach((element) => {
    element.addEventListener('click', addLike)
})


async function deleteTask(){ 
    const tTitle = this.parentNode.parentNode.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskTitleS': tTitle
            })
        })
    const data = await response.json()
    console.log(data)
    location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function addLike(){
    console.log(this.parentNode.parentNode.parentNode.childNodes[1])
    const tTitle = this.parentNode.parentNode.parentNode.childNodes[1].innerText
    const tLikes = Number(this.parentNode.childNodes[1].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'taskTitles': tTitle,
                'likesS': tLikes,
                'taskDescriptionS': tDesc, 
                'taskTypeS': tDesc, 
                'employeesS': Template, 
                'dueDatesS': tDue 
            })
          })

        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}