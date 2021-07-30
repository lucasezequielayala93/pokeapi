import axios from 'axios';
import pokeapi from './pokeapi.js';

export default {
    pokeapi : new pokeapi(axios)
}