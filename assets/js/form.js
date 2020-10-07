const db = firebase.firestore()

const taskForm = document.querySelector('#task-form')
const taskContainer = document.querySelector('#task-container')

let editStatus = false
let id = ''

const saveTask = (title, description) => 
    db.collection('tasks').doc().set({
        title,
        description
    })

const getTasks = () => db.collection('tasks').get() 

const getTask = id => db.collection('tasks').doc(id).get()

const onGetTasks = (cb) => db.collection('tasks').onSnapshot(cb)

const deleteTask = id => db.collection('tasks').doc(id).delete()

const updateTask = (id, updatedTask) => 
    db.collection('tasks').doc(id).update(updatedTask)

window.addEventListener('DOMContentLoaded', async (e) => {
    //const querySnapshot = await getTasks()
    onGetTasks((querySnapshot) => {
        taskContainer.innerHTML = ''
            
        querySnapshot.forEach( (doc) => {
            //console.log(doc.data())
            const task = doc.data()
            task.id = doc.id
            taskContainer.innerHTML += `<tr>
            <th scope="row"></th>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
                <button class="btn btn-info btn-sm btn-edit">
                    <i class="fa fa-pen" data-id="${task.id}"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-delete">
                    <i class="far fa-trash-alt" data-id="${task.id}"></i>
                </button>
            </td>
            `
            const btnDelete = document.querySelectorAll('.btn-delete')
            
            btnDelete.forEach( btn => {
                btn.addEventListener('click', async (e) => {
                    console.log(e.target.dataset.id)
                    await deleteTask(e.target.dataset.id)
                })
            })

            const btnEdit = document.querySelectorAll('.btn-edit')

            btnEdit.forEach( btn => {
                btn.addEventListener('click', async (e) => {
                    const doc = await getTask(e.target.dataset.id)
                    const task = doc.data()

                    editStatus = true
                    id = doc.id

                    taskForm['task-title'].value = task.title
                    taskForm['task-description'].value = task.description
                    taskForm['btn-task-form'].innerText = 'Update'
                })
            })
        })
    })
})

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if(!editStatus) {
        await saveTask(title.value, description.value)
    }else {
        await updateTask( id, {
            title: title.value,
            description: description.value
        })

        editStatus = false
        id = ''
        taskForm['btn-task-form'].innerText = 'Save'
    }

    taskForm.reset()
    title.focus()  
}) 