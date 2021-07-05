import { async } from "q";
import { useState, useEffect } from "react";
import Pet from "./Pet";

const ANIMALS = ['dog', 'cat', 'bird', 'rabbit'];
const BREED = ['dog', 'cat', 'bird', 'rabbit'];

const SearchParams = () => {
    const [location, setLocation] = useState("Denver");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);

    const breeds = [];

    useEffect(() => {
        requestPets();
    }, []);

    async function requestPets() {
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        const json = await res.json();

        console.log(json);

        setPets(json.pets);
    }

    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input id="location"
                        value={location.toUpperCase()}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location " />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select id="animal"
                        value={animal}
                        onChange={(e) => setAnimal(e.target.value)}>
                        <option />
                        {
                            ANIMALS.map(animal => (
                                <option value={animal} key={animal}>
                                    {animal}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed
                    <select id="breed"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}>
                        <option />
                        {
                            BREED.map(breed => (
                                <option value={breed} key={breed}>
                                    {breed}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <button>Submit</button>
            </form>

            {
                pets.map(pet => (
                    <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.name} />
                ))
            }
        </div>
    )
}

export default SearchParams;