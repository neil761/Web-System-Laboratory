// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    let currentWorkoutId = null;

    // Function to populate edit modal with workout data
    function populateEditModal(workout) {
        document.getElementById('edit-workout-id').value = workout.id;
        document.getElementById('edit-title').value = workout.title;
        document.getElementById('edit-reps').value = workout.reps;
        document.getElementById('edit-load').value = workout.load;
        currentWorkoutId = workout.id;
    }

    // Function to update workout card in the DOM
    function updateWorkoutCard(workoutCard, updatedData) {
        // Update the title
        const titleElement = workoutCard.querySelector('.card-header h5');
        if (titleElement) {
            titleElement.textContent = updatedData.title;
        }

        // Update reps
        const repsElement = workoutCard.querySelector('.list-group-item.reps');
        if (repsElement) {
            repsElement.textContent = updatedData.reps;
        }

        // Update loads
        const loadsElement = workoutCard.querySelector('.list-group-item.loads');
        if (loadsElement) {
            loadsElement.textContent = updatedData.load;
        }
    }

    // Function to update workout
    function updateWorkout(workoutId, updatedData) {
        fetch(`http://localhost:5000/api/workouts/${workoutId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update workout');
            }
            return response.json();
        })
        .then(updatedWorkout => {
            // Find the workout card
            const workoutCard = document.querySelector(`[data-workout-id="${workoutId}"]`);
            
            if (workoutCard) {
                // Update the card with the new data
                updateWorkoutCard(workoutCard, updatedData);
                
                // Close the modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                if (modal) {
                    modal.hide();
                }

                // Clear the form
                const form = document.querySelector('.edit-workout');
                if (form) {
                    form.reset();
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update workout');
        });
    }

    // Add event listener for edit form submission
    const editForm = document.querySelector('.edit-workout');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const updatedData = {
                title: document.getElementById('edit-title').value,
                reps: document.getElementById('edit-reps').value,
                load: document.getElementById('edit-load').value
            };
            
            if (currentWorkoutId) {
                updateWorkout(currentWorkoutId, updatedData);
            }
        });
    }

    // Add event listeners for edit buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            const workoutCard = e.target.closest('.card');
            if (workoutCard) {
                const workout = {
                    id: workoutCard.dataset.workoutId,
                    title: workoutCard.querySelector('h5').textContent.trim(),
                    reps: workoutCard.querySelector('.reps').textContent.trim(),
                    load: workoutCard.querySelector('.loads').textContent.trim()
                };
                populateEditModal(workout);
            }
        }
    });
});
