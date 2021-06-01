function formatDate(date) {
    date = date.split(" ").splice(0, 4).join(" ");
    return date.substring(4); 
}