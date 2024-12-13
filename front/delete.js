// delete.js
function deleteWorkout(workoutId) {
    fetch(`http://localhost:5000/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Remove the workout card from the DOM
            const workoutCard = document.querySelector(`[data-workout-id="${workoutId}"]`);
            workoutCard.closest('.col').remove();
        } else {
            throw new Error('Failed to delete workout');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete workout');
    });
}

// Add event listeners for delete buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const workoutCard = e.target.closest('.card');
        const workoutId = workoutCard.dataset.workoutId;
        
        if (confirm('Are you sure you want to delete this workout?')) {
            deleteWorkout(workoutId);
        }
    }
});
