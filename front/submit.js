const form = document.querySelector('.add-workout')
const inputs = Array.from(document.querySelectorAll('.form-control'))


const sendData = async (workout) => {
    const response = await fetch('http://localhost:5000/api/workouts/', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charaset=UTF-8"
        },
        body: JSON.stringify(workout)
    })

    const result = await response.json()

    return result

}




form.addEventListener('submit', (e) =>{
    //e.preventDefault()

    const title = inputs[0].value
    const reps = inputs[1].value
    const load = inputs[2].value

    const workout = {
        title: title,
        reps: reps,
        load: load
    }

    sendData(workout).then(result => {
        console.log(result)
    }).catch(error =>{
        console.log(error)
    })
})