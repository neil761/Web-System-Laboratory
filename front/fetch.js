const listGroup = (reps, load) => {
    const ul = document.createElement('ul');
    const smallReps = document.createElement('small');
    const liReps = document.createElement('li');
    const smallLoad = document.createElement('small');
    const liLoad = document.createElement('li');

    // Add classes to elements
    ul.classList.add('list-group', 'list-group-flush');
    smallReps.classList.add('fw-bold');
    liReps.classList.add('list-group-item', 'fw-light');
    smallLoad.classList.add('fw-bold');
    liLoad.classList.add('list-group-item', 'fw-light');

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

    div.classList.add('card-header');
    h5.innerHTML = title;
    div.append(h5);

    return div;
}

const createCard = (reps, load, title) => {
    const col = document.createElement('div');
    const card = document.createElement('div');

    col.classList.add('col', 'col-lg-4');
    card.classList.add('card');

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
        workout.append(createCard(workouts.reps, workouts.load, workouts.title));
    });
}).catch(error => {
    console.log(error)
});
