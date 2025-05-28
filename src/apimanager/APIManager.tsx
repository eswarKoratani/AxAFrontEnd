
const BASE_URL = 'http://localhost:8080/task'
const username = 'admin';
const password = 'admin123';
const basicAuth = btoa(`${username}:${password}`);

class APIManager{

    static getTasks = () =>{

    const url = BASE_URL+'/getTasks'
    return fetch(url, {
    credentials: "include", // if using cookies/sessions
    headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${basicAuth}`,
        Accept: "application/json",
    },
})
.then(async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return response.json();
})
}

    static createTask = (params: any) =>{

        const url = BASE_URL+'/createTask'
        return fetch(url, {
            credentials: "include", // if using cookies/sessions
            method:"PUT",
            body:JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${basicAuth}`,
                Accept: "application/json"
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }
                return response.json();
            })
    }
}
export default APIManager;