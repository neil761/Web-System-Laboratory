const listGroup = (reps, load) => {
    const ul = document.createElement('ul');
    const smallReps = document.createElement('small');
    const liReps = document.createElement('li');
    const smallLoad = document.createElement('small');
    const liLoad = document.createElement('li');

    // Add classes to elements
    ul.classList.add('list-group', 'list-group-flush');
    smallReps.classList.add('fw-bold');
    liReps.classList.add('list-group-item', 'fw-light', 'reps');
    smallLoad.classList.add('fw-bold');
    liLoad.classList.add('list-group-item', 'fw-light', 'loads');

    // Set text content
    smallReps.innerHTML = 'Reps:';
    liReps.innerHTML = reps;
    smallLoad.innerHTML = 'Loads:';
    liLoad.innerHTML = load;

    // Append elements
    smallReps.append(liReps);
    smallLoad.append(liLoad);
    ul.append(smallReps);
    ul.append(smallLoad);

    return ul;
}

const cardHeader = (title) => {
    const div = document.createElement('div');
    const h5 = document.createElement('h5');
    const buttonDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    // Add classes and attributes
    div.classList.add('card-header', 'd-flex', 'justify-content-between', 'align-items-center');
    
    // Edit button
    editBtn.classList.add('btn', 'btn-sm', 'btn-primary', 'edit-btn', 'me-2');
    editBtn.setAttribute('data-bs-toggle', 'modal');
    editBtn.setAttribute('data-bs-target', '#editModal');
    editBtn.textContent = 'Edit';

    // Delete button
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'delete-btn');
    deleteBtn.textContent = 'Delete';

    h5.innerHTML = title;
    
    // Append buttons to buttonDiv
    buttonDiv.append(editBtn);
    buttonDiv.append(deleteBtn);
    
    // Append h5 and buttonDiv to div
    div.append(h5);
    div.append(buttonDiv);

    return div;
}

const createCard = (reps, load, title, id) => {
    const col = document.createElement('div');
    const card = document.createElement('div');

    col.classList.add('col', 'col-lg-4', 'mb-4');
    card.classList.add('card');
    
    // Add data-workout-id attribute for edit/delete functionality
    card.setAttribute('data-workout-id', id);

    card.append(cardHeader(title));
    card.append(listGroup(reps, load));
    col.append(card);

    return col;
}

const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/workouts/');
    const result = await response.json();

    return result;
}

const workout = document.querySelector('.workout');

fetchData().then(data => {
    data.forEach(workouts => {
        workout.append(createCard(workouts.reps, workouts.load, workouts.title, workouts._id));
    });
}).catch(error => {
    console.log(error)
});
