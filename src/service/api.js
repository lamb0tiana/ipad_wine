import { create } from 'apisauce';

const api = create({
    baseURL:'https://api.github.com',
    headers: {'Accept': 'application/vnd.github.v3+json'}
});

api
    .get('/repos/skellock/apisauce/commits')
    .then((response) => response.data[0].commit.message)
    .then(console.log)

export default api;