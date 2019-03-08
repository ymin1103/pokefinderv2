import Hangul from 'hangul-js';
import Searchdata from './config/Searchdata';

const ProcessInput = (input) => {
    const Result = [];

        if (Hangul.isCompleteAll(input) === true &&
            Hangul.isConsonantAll(input) === false)
            {
                Searchdata.HangulNameArray.map((e)=>{
                    if (Hangul.search(e,input)>=0)
                    {
                        
                        Result.push({
                            name:e,
                            id:Searchdata.HangulNameObj[e]+1
                            });
                    }
                })

                return Result;
            }
        else if(Hangul.isCompleteAll(input) === false &&
                Hangul.isConsonantAll(input) === true)
            {
                Searchdata.HangulNameArray.map((Ele)=>{

                    const DisaData = Hangul.d(Ele, true), ConsonantArray = [];
                    DisaData.map((e)=>{
                        ConsonantArray.push(e[0]);
                    })

                    if (ConsonantArray.toString().replace(/,/g,"").includes(input)===true)
                    {

                        Result.push({
                            name:Ele,
                            id:Searchdata.HangulNameObj[Ele]+1
                        })
                    }
                })

                return Result;
            }
        else {
                if(parseInt(input)!==NaN){
                return [{
                    name: Searchdata.HangulNameArray[parseInt(input)-1],
                    id: parseInt(input)
                }];
            }
                else{
                    return Searchdata.HangulNameObj[input]!==undefined?
                        [{ name: input, id: Searchdata.HangulNameObj[input]}]:
                        [input];
                }
        }

}

export default ProcessInput;