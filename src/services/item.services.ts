interface ItemType {
        id: number,
        author:string
}

export async function getItemFromDB(path: string = "authors") {
    try {
        const response = await fetch(`http://localhost:3000/api/items/${path}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export async function getQuotesBy(authorName:string) {
    try {
        const response = await fetch(`http://localhost:3000/api/items/authors/${authorName}`)
        const data = await response.json()
        return data
    } catch(error){
        console.error(error)
    }      
}

export async function getWeekdayList() {
    try {
        const response = await fetch('http://localhost:3000/api/dayofweek/')
        const weeks = await response.json()
        return weeks
    } catch (error) {
        console.error(error)
    }
}