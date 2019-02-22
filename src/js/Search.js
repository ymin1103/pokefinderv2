import Elements from './elements';

const Pokedex = require('pokeapi-js-wrapper');
const options = {
    protocol: 'https',
    hostName: 'pokeapi.co',
    versionPath: '/api/v2/',
    cache: true,
    timeout: 10 * 1000 // 10s
}
const P = new Pokedex.Pokedex(options);

const Search = {

    GetData : async (input) => {

        let data = {basic:{}, moves:[], spec:{}, evolution:{}};

        let processedData = {
            id: 0,
            pokedexNo: [],
            name: [],
            genera:"",
            flavorText:[],
            body: {},
            abilities:[],
            moves: [],
            types: [],
            images: {},
            stats:[],
            evolution:[]
        };
    
        await P.getPokemonByName(input).then(async (resolve) => { 
              
            data.basic = resolve;

            await P.getPokemonSpeciesByName(input).then((resolve) => {
                data.spec = resolve;
            });

            for (let i = 0; i < data.basic.moves.length; i++) {

                await P.getMoveByName(data.basic.moves[i].move.url
                    .substr(31, data.basic.moves[i].move.url.length - 32)).then(
                    (resolve) => {
                        data.moves.push(resolve);
                        }).catch((reject) => { console.log(reject); });;

            };

            await P.getEvolutionChainById(data.spec.evolution_chain.url
                .substr(42, data.spec.evolution_chain.url.length - 43)).then((resolve) => {
                        data.evolution = resolve;
                }).catch((reject) => { console.log(reject); });;

            processedData.id = data.basic.id;
            if (data.spec.pokedex_numbers.length!==0){
                processedData.pokedexNo = data.spec.pokedex_numbers;
            }
            else{
                processedData.pokedexNo.push(data.spec.id);
            }
            processedData.name = data.spec.names.reverse();
            processedData.body = {
                height: data.basic.height,
                weight: data.basic.weight
            };
            processedData.genera = data.spec.genera.reverse();
            processedData.images = data.basic.sprites;
            processedData.moves = data.moves;
            
            data.spec.flavor_text_entries.map((e)=>{
                if(e.language.name==="ko"){
                processedData.flavorText.push(e);
                }
            })

            const getEvolve = (N,C) => {
                C(N);
                if (N.evolves_to.length !== 0) {
                    for (let i = 0; i < N.evolves_to.length; i++) {
                        getEvolve(N.evolves_to[i], C);
                    }

                }
            }

            getEvolve(data.evolution.chain, (node) => {
                processedData.evolution.push(
                    {details:node.evolution_details,species:node.species}
                    );
            })

            
            for (let i = 0; i < data.moves.length; i++) {
                processedData.moves[i].method = data.basic.moves[i].version_group_details;

            }

            processedData.stats=data.basic.stats.reverse();

            for (let i = 0; i < data.basic.types.length; i++) {
                await P.getTypeByName(data.basic.types[i].type.name)
                    .then((response) => {
                        processedData.types.push(response);
                    }).catch((reject) => { console.log(reject); });;
            }

            for (let i = 0; i < data.basic.abilities.length; i++) {
                await P.getAbilityByName(data.basic.abilities[i].ability.url
                    .substr(34, data.basic.abilities[i].ability.url.length - 35)).then(
                        (resolve) => {
                            processedData.abilities.push(resolve);
                        }
                ).catch((reject) => { console.log(reject); });
            };


        }).catch((reject)=>{console.log(reject);});

    
        console.log(data);
        console.log(processedData);

        return processedData;
    }


}

export default Search;