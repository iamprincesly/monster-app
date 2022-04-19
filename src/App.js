import React, { useState, useEffect } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

const App = () => {
    console.log('rendered');
    const [ searchField, setSearchField ] = useState('');
    const [ monsters, setMonsters ] = useState([]);
    const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => setMonsters(users));
    }, []);

    useEffect(() => {
        const newFilteredMonster = monsters.filter((monster) => {
            return monster.name.toLocaleLowerCase().includes(searchField);
        });

        setFilteredMonsters(newFilteredMonster);
    }, [monsters, searchField])

    const onSearchChange = (e) => {
        setSearchField(e.target.value.toLocaleLowerCase())
    };

    return (
        <div className='App'>
            <h1 className='app-title'>Monsters App</h1>
            <SearchBox
                className='monster-search-box'
                placeholder='Search monsters'
                onSearchChange={onSearchChange}
            />
            <CardList monsters={filteredMonsters} />
        </div>
    );
}
// class App extends Component {
//     constructor() {
//         super();

//         this.state = {
//             monsters: [],
//             searchField: '',
//         };

//         // this.onSearchChange = this.onSearchChange.bind(this);
//     }

//     componentDidMount() {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then((res) => res.json())
//             .then((users) => this.setState({ monsters: users }));
//     }

//     onSearchChange = (e) => {
//         this.setState({ searchField: e.target.value });
//     };

//     render() {
//         const { monsters, searchField } = this.state;
//         const filteredMonsters = monsters.filter((monster) =>
//             monster.name.toLowerCase().includes(searchField.toLowerCase())
//         );
//         return (
//             <div className='App'>
//                 <h1>Monsters App</h1>
//                 <SearchBox
//                     placeholder='Search monsters'
//                     onSearchChange={this.onSearchChange}
//                 />
//                 <CardList monsters={filteredMonsters} />
//             </div>
//         );
//     }
// }

export default App;
