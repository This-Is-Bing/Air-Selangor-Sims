import moment from "moment-timezone";

const convertDateTime = (isoDateTime)=>{
    const date = new Date(isoDateTime);
    
    // Extract components from the date
    const day = date.getUTCDate();      // Using UTC date to match the 'Z' timezone
    const month = date.getUTCMonth() + 1;  // getUTCMonth() returns month from 0-11
    const year = date.getUTCFullYear();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    
    // Format the date and time to desired format: "2/1/1970 07:13"
    return `${day}/${month}/${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

const convertDate = (isoDateTime)=>{
    const date = new Date(isoDateTime);
    
    // Extract components from the date
    const day = date.getUTCDate();      // Using UTC date to match the 'Z' timezone
    const month = date.getUTCMonth() + 1;  // getUTCMonth() returns month from 0-11
    const year = date.getUTCFullYear();

    // Format the date and time to desired format: "2/1/1970 07:13"
    return `${day}/${month}/${year}`;
}

const convertToISO = (dateTime) => {

    // Return in ISO 8601 format with the timezone offset
    return(moment(dateTime).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z')

; // Ensures output is like 2024-04-03T00:00:00+08:00
}


export  {convertDateTime,convertToISO, convertDate}