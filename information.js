const today = new Date();

const date = dateFormat(new Date(),'YYYY-MM-DD');
const field = document.getElementById("deadline");
field.value = date;
field.setAttribute("min", date);

/*“ú’ö‚Ì‰Šú’l‚ğ¡“ú‚É‚·‚é*/
function dateFormat(today, format){
    format = format.replace("YYYY", today.getFullYear());
    format = format.replace("MM", ("0"+(today.getMonth() + 1)).slice(-2));
    format = format.replace("DD", ("0"+ today.getDate()).slice(-2));
    return format;
}