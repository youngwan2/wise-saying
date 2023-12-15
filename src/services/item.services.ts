

export async function getItemFromDB(path:string){
    const mode = process.env.NODE_ENV 
    const response = await fetch(`${mode==='development'?'http://localhost:3000/api/items/'+path:'/api/items/'+path}`)
    const data = await response.json()
    const refinement = data.map((item: any)=>{
        return {id: item.id,author:item.author, wise_sayings: JSON.parse(item['wise_sayings'])};
    
    })


    return refinement
}