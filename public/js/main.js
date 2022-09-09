const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const editBtn = document.querySelectorAll('.edit')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(editBtn).forEach((el)=>{
    el.addEventListener('click', editTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function editTodo(){
    const todoId = this.parentNode.dataset.id
    const editedText = prompt('Edit Todo')
    try{
        const response = await fetch('todos/editTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'editedTextFromJSFile': editedText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

    console.log(todoId)
    console.log(editedText)
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

var CalendarException = function CalendarException(message) {
    this.message = message;
    this.toString = function() {
       return this.constructor.name + ": " + this.message
    };
 }
 
 var Calendar = function Calendar(firstWeekDay) {
     //properties
     this.firstWeekDay = firstWeekDay || 0; // 0 = Sunday
 };
 
 Calendar.prototype = {
     constructor : Calendar,
     weekStartDate : function weekStartDate(date) {
         var startDate = new Date(date.getTime());
         while (startDate.getDay() !== this.firstWeekDay) {
             startDate.setDate(startDate.getDate() - 1);
         }
         return startDate;
     },
     monthDates : function monthDates(year, month, dayFormatter, weekFormatter) {
         if ((typeof year !== "number") || (year < 1970)) {
             throw new CalendarException('year must be a number >= 1970');
         };
         if ((typeof month !== "number") || (month < 0) || (month > 11)) {
             throw new CalendarException('month must be a number (Jan is 0)');
         };
         var weeks = [],
             week = [],
             i = 0,
             date = this.weekStartDate(new Date(year, month, 1));
         do {
             for (i=0; i<7; i++) {
                 week.push(dayFormatter ? dayFormatter(date) : date);
                 date = new Date(date.getTime());
                 date.setDate(date.getDate() + 1);
             }
             weeks.push(weekFormatter ? weekFormatter(week) : week);
             week = [];
         } while ((date.getMonth()<=month) && (date.getFullYear()===year));
         return weeks;
     },
     monthDays : function monthDays(year, month) {
         var getDayOrZero = function getDayOrZero(date) {
             return date.getMonth() === month ? date.getDate() : 0;
         };
         return this.monthDates(year, month, getDayOrZero);
     },
     monthText : function monthText(year, month) {
         if (typeof year === "undefined") {
             var now = new Date();
             year = now.getFullYear();
             month = now.getMonth();
         };
         var getDayOrBlank = function getDayOrBlank(date) {
             var s = date.getMonth() === month ? date.getDate().toString() : "  ";
             while (s.length < 2) s = " "+s;
             return s;
         };
         var weeks = this.monthDates(year, month, getDayOrBlank,
             function (week) { return week.join(" ") });
         return weeks.join("\n");
     }
 };
 var months = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");
 for (var i=0; i<months.length; i++)
     Calendar[months[i]] = i;