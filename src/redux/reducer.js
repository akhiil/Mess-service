
var today = new Date();
const dd = today.getDate();
let mm;
let day;
let numberOfDays;
let mont = today.getMonth();

switch (mont) {
    case 0:
        mm = 'Jan';
        numberOfDays = 31
        break;
    case 1:
        mm = 'Feb';
        if (today.getFullYear % 4 == 0) numberOfDays = 29;
        else numberOfDays = 28
        break;
    case 2:
        mm = 'Mar';
        numberOfDays = 31;
        break;
    case 3:
        mm = 'Apr';
        numberOfDays = 30;
        break;
    case 4:
        mm = 'May';
        numberOfDays = 31;
        break;
    case 5:
        mm = 'Jun';
        numberOfDays = 30;
        break;
    case 6:
        mm = 'Jul';
        numberOfDays = 31;
        break;
    case 7:
        mm = 'Aug';
        numberOfDays = 31;
        break;
    case 8:
        mm = 'Sept';
        numberOfDays = 30;
        break;
    case 9:
        mm = 'Oct';
        numberOfDays = 31;
        break;
    case 10:
        mm = 'Nov';
        numberOfDays = 30;
        break;
    case 11:
        mm = 'Dec';
        numberOfDays = 31;
        break;
}



let sun = new Date().getDay();
let next;

let list = [];
let j = 0;
for (let i = dd; i <= numberOfDays; i++) {



    switch (sun) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
            break;
        default:
            day = "fault";
    }

    list.push({ date: `${i} ${mm}-${day}`, id: j, checkLunch: false, checkDinner: false, foodLunch: '', foodDinner: '' });
    if (sun === 6) {
        sun = 0;
    }
    else {
        sun++;
    }

    if (i === numberOfDays) next = (1 + mont);
    j++;
}

switch (next) {
    case 0:
        mm = 'Jan';
        numberOfDays = 31
        break;
    case 1:
        mm = 'Feb';
        if (today.getFullYear % 4 == 0) numberOfDays = 29;
        else numberOfDays = 28
        break;
    case 2:
        mm = 'Mar';
        numberOfDays = 31;
        break;
    case 3:
        mm = 'Apr';
        numberOfDays = 30;
        break;
    case 4:
        mm = 'May';
        numberOfDays = 31;
        break;
    case 5:
        mm = 'Jun';
        numberOfDays = 30;
        break;
    case 6:
        mm = 'Jul';
        numberOfDays = 31;
        break;
    case 7:
        mm = 'Aug';
        numberOfDays = 31;
        break;
    case 8:
        mm = 'Sept';
        numberOfDays = 30;
        break;
    case 9:
        mm = 'Oct';
        numberOfDays = 31;
        break;
    case 10:
        mm = 'Nov';
        numberOfDays = 30;
        break;
    case 11:
        mm = 'Dec';
        numberOfDays = 31;
        break;
}



for (let i = 1; i <= numberOfDays; i++) {

    switch (sun) {
        case 0:
            day = "Sun";
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
            break;
        default:
            day = "fault";
    }

    list.push({ date: `${i} ${mm}-${day}`, id: j, checkLunch: false, checkDinner: false, foodLunch: '', foodDinner: '' });
    if (sun === 6) {
        sun = 0;
    }
    else {
        sun++;
    }
    j++;
}

/*
listItem = {
    checkDinner: false,
    checkDinner: true,
    date: "14 dec-thu"
    foodDinner: "",
    foodLunch: "",
    id: 0
}
*/

export const TotalReducer = (state = list, action) => {
    if (action.type === 'ADD_LUNCH') {
        let temp = [...state];
        let ind = action.id;
        temp[ind].checkLunch = true;
        temp[ind].foodLunch = action.food;
        return temp;

    } else if (action.type === 'DELETE_LUNCH') {
        let temp = [...state];
        let ind = action.id;
        temp[ind].checkLunch = false;
        temp[ind].foodLunch = "";
        return temp;
    } else if (action.type === 'ADD_DINNER') {
        let temp = [...state];
        let ind = action.id;
        temp[ind].checkDinner = true;
        temp[ind].foodDinner = action.food;
        return temp;
    } else if (action.type === 'DELETE_DINNER') {
        let temp = [...state];
        let ind = action.id;
        temp[ind].checkDinner = false;
        temp[ind].foodDinner = "";
        return temp;
    } else if (action.type === 'CLEAR_ALL') {
        let temp = [...state];
        temp.map((item) => {
            item.checkDinner = false;
            item.checkLunch = false;
            item.foodDinner = "";
            item.foodLunch = "";
        })
    }
    return state;
}

export const ThemeColor = (state = true, action) => {
    if (action.type === 'LIGHT_THEME') {
        return false;
    } else if (action.type === 'DARK_THEME') {
        return true;
    }
    return state;
}