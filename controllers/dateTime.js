const dateTime = async() =>{
    try{
        const now = new Date().toLocaleString('en-us',{
            timeZone:"Asia/Karachi",
            hourCycle:'h12'
        })
        return now
    }
    catch(error){
        console.log(error)
    }
}
export default dateTime