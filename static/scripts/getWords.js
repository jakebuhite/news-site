function getWords(str, count) {
    return str.split(" ").splice(0, count).join(" ");
}