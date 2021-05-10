module.exports = {
    dateFormat: date => {
        const monthList = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const dateInfo = new Date(date);
        return `${monthList[dateInfo.getMonth()]} ${dateInfo.getDate()}, ${dateInfo.getFullYear()}`;
    }

}