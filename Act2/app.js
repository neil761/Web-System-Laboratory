const title = document.getElementById('title');
const author = document.getElementById('author');
const button = document.getElementById('button');
const ol = document.getElementById('Anime');



button.addEventListener('click', () =>{
    //get value from input form
    const newTitle = title.value;
    const newAuthor = author.value;
    
    //create element
    const p = document.createElement('p');
    const small = document.createElement('small');
    const button = document.createElement('button')
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const li = document.createElement('li');

    //set value to the element
    p.innerHTML = newTitle;
    small.innerHTML = newAuthor;
    button.innerHTML = "Delete"

    //add class to element
    small.classList.add('author', 'fw-light');
    button.classList.add('btn', 'btn-danger');
    div1.classList.add('fw-bold');
    div2.classList.add('ms-2', 'me-auto');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');


    //create container
    
    
    div1.append(p);
    div1.append(small);
    div2.append(div1);
    li.append(div2);
    li.append(button)

    
    //append to list
    ol.append(li);

    console.log(li)
})



