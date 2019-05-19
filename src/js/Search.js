import Tree from './Tree';


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

    GetResults: async (inputArray) => {
        const results = [];

        inputArray.map( async (e)=>{
            await P.getPokemonByName(e.id)
            .catch((error) => { console.warn(error); })
            .then((resolve)=>{
                results.push(
                    {
                        id:e.id,
                        name:e.name,
                        types:resolve.types,
                        img:resolve.sprites.front_default
                    }
                )
            })
        })

        results.sort((a,b)=>{return a.id - b.id});

        return results;
    },

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
            processedData.name = data.spec.names[0].language.name==="zh-Hans"? 
                data.spec.names.reverse() : data.spec.names;
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
            
            const ETree = new Tree({
                id:undefined,
                names: [],
                sprites: {},
                evolution_details: []
            });

            const getEvolve = (Node,Callback) => {
                Callback(Node);
                if (Node.evolves_to.length !== 0) {
                    for (let i = 0; i < Node.evolves_to.length; i++) {
                        getEvolve(Node.evolves_to[i], Callback);
                    }

                }
            }
            //let ite = 1;
            getEvolve(data.evolution.chain, async (node) => {
                /*processedData.evolution.push(
                    {details:node.evolution_details,species:node.species,result:{}}
                    );
                ite++;
                console.log(ite);*/
                
                let TempObj = {
                    id:undefined,
                    names:[],
                    sprites:[],
                    evolution_details:{}
                };
                
                TempObj.evolution_details = node.evolution_details;

            await P.getPokemonByName(node.species.url
                   .substr(42, node.species.url.length - 43)).then(
                    async (resolve)=>{
                        
                        TempObj.id = resolve.id;
                        TempObj.sprites=resolve.sprites;

                    await P.getPokemonSpeciesByName(node.species.url
                    .substr(42, node.species.url.length - 43)).then(
                        (resolve) =>{
                            
                        TempObj.names=resolve.names[0].language.name==="zh-Hans"?
                        resolve.names.reverse() : resolve.names;

                        ETree.insert(TempObj);
                    
                    }) 
            })
        })
            
            processedData.evolution = ETree;
            
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
                            processedData.abilities.push({...resolve,
                                is_hidden:data.basic.abilities[i].is_hidden,
                                slot:data.basic.abilities[i].slot});
                        }
                ).catch((reject) => { console.log(reject); });
            };
            
            for(let i=0; i<processedData.evolution.length; i++) { 
                /*await P.getPokemonByName(processedData.evolution[i].species.url
                    .substr(42, processedData.evolution[i].species.url.length - 43)).then(
                    (resolve)=>{
                        processedData.evolution[i].result.sprites=resolve.sprites;
                    
                    })*/
            
                await P.getPokemonSpeciesByName(processedData.evolution[i].species.url
                    .substr(42, processedData.evolution[i].species.url.length - 43)).then(
                        (resolve) =>{
                        processedData.evolution[i].result.names=resolve.names[0].language.name==="zh-Hans"?
                        resolve.names.reverse() : resolve.names;
                        //Due to API's indexing problem, just temporary
                        })

                    
            };

            processedData.moves.sort((a, b) => { return a.method[0].level_learned_at - b.method[0].level_learned_at})
            


        }).catch((reject)=>{console.log(reject);});

        console.log(data);
        console.log(processedData);
        /*
        const Names = [];

        for(let i=0;i<807;i++)
        {
            const TempNames = {};
            await P.getPokemonSpeciesByName(i+1).then((resolve)=>{
                TempNames = resolve.names[0].language.name === "zh-Hans" ?
                    resolve.names.reverse() : resolve.names;
                Names.push(TempNames.length === 11 ?
                    TempNames[2].name :
                    TempNames[1].name)
            })
        }
        console.log(Names);*/

        return processedData;
    }


}

export default Search;