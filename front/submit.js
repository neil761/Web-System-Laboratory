const form = document.querySelector('.add-workout')
const inputs = Array.from(document.querySelectorAll('.form-control'))

const createNewWorkoutCard = (workout) => {
    const workoutContainer = document.querySelector('.workout');
    const newCard = createCard(workout.reps, workout.load, workout.title, workout._id);
    workoutContainer.append(newCard);
}

const sendData = async (workout) => {
    const response = await fetch('http://localhost:5000/api/workouts/', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(workout)
    })

    const result = await response.json()
    return result
}

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    const title = inputs[0].value
    const reps = inputs[1].value
    const load = inputs[2].value

    const workout = {
        title: title,
        reps: reps,
        load: load
    }

    try {
        const result = await sendData(workout);
        createNewWorkoutCard(result); // Add the new workout to the DOM
        
        // Clear form inputs
        inputs.forEach(input => input.value = '');
        
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
    } catch (error) {
        console.log(error);
    }
})