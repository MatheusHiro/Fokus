const addTaskBt = document.querySelector('.app__button--add-task')
const form = document.querySelector('.app__form-add-task')
const formAnswer = document.querySelector('.app__form-textarea')
const ulTasks = document.querySelector('.app__section-task-list')
const cancelBt = document.querySelector('.app__form-footer__button--cancel')
const deleteBt = document.querySelector('.app__form-footer__button--delete')
const clearAllBt = document.getElementById('btn-remover-todas')

const tasks = JSON.parse(localStorage.getItem('tasks')) || []

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function createTaskElement(task) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `    
           <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
               <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
           </svg>
       `
    const p = document.createElement('p')
    const input = document.createElement('input')
    input.type = 'text'
    input.classList.add('app__section-task-list-item-description')
    input.classList.add('input-box-hide')
    input.classList.add('hidden')
    p.textContent = task.description
    p.classList.add('app__section-task-list-item-description')

    const button = document.createElement('button')
    button.classList.add('app_button-edit')

    button.onclick = () => {
        console.log(input.classList.contains('hidden'))

        if (input.classList.contains('hidden')) {
            p.classList.add('hidden')
            p.classList.remove('show')
            input.classList.add('show')
            input.classList.remove('hidden')
            input.value = '' //cleans the bar to insert text

        } else {
            p.classList.add('show')
            p.classList.remove('hidden')
            input.classList.add('hidden')
            input.classList.remove('show')

        }
        /**if there is a value the text is replaced/edited, otherwise the text does not change */
        if (input.value) {
            p.textContent = input.value
            task.description = input.value
            updateTasks()

        }

    }
    const img = document.createElement('img')

    img.setAttribute('src', '/imagens/edit.png')
    button.append(img)
    li.append(svg)
    li.append(p)
    li.append(input)
    li.append(button)

    return li
}

addTaskBt.addEventListener('click', () => {
    form.classList.toggle('hidden')
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const task = {
        description: formAnswer.value
    }
    tasks.push(task)

    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)
    updateTasks()
    formAnswer.value = ''
    form.classList.add('hidden')
})

tasks.forEach(task => {
    const taskElement = createTaskElement(task)
    ulTasks.append(taskElement)
});

cancelBt.addEventListener('click', () => {
    formAnswer.value = ''
    form.classList.add('hidden')
})

deleteBt.addEventListener('click', () => {
    formAnswer.value = ''

})

clearAllBt.addEventListener('click', () => {
    localStorage.clear()
})
