import "dotenv/config";

const getOpenAIAPIResponse = async (message) =>{
    const options={
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model:"gpt-4o-mini",
            messages:[{
                role:"user",
                content:message //as parameter async(message)
            }
        ]

        })
    }
    try{
        const response=await fetch("https://api.openai.com/v1/chat/completions",options);
        //if not use json then it remains like a sealed envelope not opened 
        
        const data=await response.json()
        console.log(data);
        // res.send(data); when its an api call
        return data; //returning assistant message
    }
    catch(err){
        console.log(err);
    }

}
export default getOpenAIAPIResponse;