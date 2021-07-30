export default (axios) => {
    return {
        index(offset){
            return axios.get(`${process.env.VUE_APP_POKEAPI_URL}?offset=${offset}&limit=10`);
        },
        search(name){
            return axios.get(`${process.env.VUE_APP_POKEAPI_URL}/${name}`);
        },
        show(id){
            return axios.get(`${process.env.VUE_APP_POKEAPI_URL}/${id}`);
        }
    }
}