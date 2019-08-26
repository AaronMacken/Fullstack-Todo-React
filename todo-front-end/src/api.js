// helper file that holds the async functions that interact with the back end api
const apiUrl = "/api/todos/";


// load initial data
// makes an API call to our endpoint, does error checking, 
// if good -> return json
export async function getTodos() {
    return fetch(apiUrl)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return (resp.json()).then(data => {
                        let err = { errorMsg: data.message }
                        throw err;
                    })
                } else {
                    let err = { errorMsg: "Please try agian later" }
                    throw err;
                }
            }
            return resp.json()
        })
}






// add a new item to the Database
// function that makes an API call with the state that was passed into the form component
// method - post & heaader - content type = json is passed into the initial fetch
// the body of the request is formatted so the data corresponds correctly with what is expected
// error handling is done and json is returned
export async function createTodo(inputText) {
    return fetch(apiUrl, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ name: inputText })
    })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return (resp.json()).then(data => {
                        let err = { errorMsg: data.message }
                        throw err;
                    })
                } else {
                    let err = { errorMsg: "Please try agian later" }
                    throw err;
                }
            }
            return resp.json()
        })
}





// function that hits the delete route with the passed in ID from db elements
// runs a .filter on elements where id's do not match the passed in id (thus filtering out the passed in element)
// the todos array is then re assigned to the newly filtered array
// added as an onDelete prop to the elements that are being loaded
// this needs to be .bind() when adding in as a prop since it required the unique data (the id's)
// in order to be ran
// this code is used as an on click in the actual component in order to carry out the api call

export async function deleteTodo(id) {
    const deleteURL = `${apiUrl}${id}`
    return fetch(deleteURL, {
        method: 'delete'
    })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return (resp.json()).then(data => {
                        let err = { errorMsg: data.message }
                        throw err;
                    })
                } else {
                    let err = { errorMsg: "Please try agian later" }
                    throw err;
                }
            }
        })
}





export async function updateTodo(todo) {
    const updateURL = `${apiUrl}${todo._id}`
    fetch(updateURL, {
        method: 'put',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ completed: !todo.completed })
    })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return (resp.json()).then(data => {
                        let err = { errorMsg: data.message }
                        throw err;
                    })
                } else {
                    let err = { errorMsg: "Please try agian later" }
                    throw err;
                }
            }
            return resp.json()
        })
}
