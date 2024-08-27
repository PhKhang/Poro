<template>
    <div class="container">
        <!-- Calendar Section -->
        <div class="calendar-section">
            <div class="calendar-header">
                <h2>July, 2024</h2>
            </div>
            <div class="calendar-grid">
                <div v-for="day in daysActivity" :key="day.date" :class="day.activity_level">
                    {{ day.date.split('-')[2] }}<br>
                    {{ day.hours_studied }}h
                </div>
            </div>
        </div>


        <!-- Summary Section -->
        <div class="summary-section">
            <h3>Your working time in this</h3>
            <div>
                <span>Day</span>
                <span>{{ timeAnalysis.totalTimeOfToday }} h</span>
            </div>
            <div>
                <span>Week</span>
                <span>{{ timeAnalysis.totalTimeOfWeek }} h</span>
            </div>
            <div>
                <span>Month</span>
                <span>{{ timeAnalysis.totalTimeOfMonth }} h</span>
            </div>
        </div>

        <!-- Leaderboard Section -->
        <div class="leaderboard-section">
            <h3>Leaderboard</h3>
            <div v-for="(user, index) in topUsers" :key="user.rank" class="leaderboard-item">
                <span>{{ index + 1 }}. {{ user.totalWorkingTime }}</span>
                <span>{{ user.totalWorkingTime }} h</span>
            </div>

            <div class="your-rank">
                Your Rank<br>{{ currentRank }}<br>{{ totalTime }}
            </div>
        </div>
    </div>
</template>

<script setup>

const daysActivity = ref()


daysActivity.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getDailyActivities',
    }
})
// console.log('Received data:', daysActivity.value[0])
// Hàm tạo danh sách các ngày từ ngày bắt đầu đến ngày kết thúc
function generateDateRange(startDate, endDate) {
    let dates = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}
// Hàm tạo danh sách tất cả các ngày trong một tháng bất kỳ
function generateMonthDays(year, month) {
    let startDate = new Date(year, month - 1, 1);
    let endDate = new Date(year, month, 0); // Lấy ngày cuối cùng của tháng
    return generateDateRange(startDate, endDate);
}

// Hàm thêm các ngày với hours_studied = 0 vào danh sách hiện tại
function fillMissingDays(daysActivity, year, month) {
    let allDates = generateMonthDays(year, month);
    let daysMap = {};
    daysActivity.forEach(item => {
        daysMap[item.date] = item;
    });
    allDates.forEach(date => {
        if (!daysMap[date]) {
            daysActivity.push({ "date": date, "hours_studied": 0, "activity_level": "no-study" });
        }
    });
    daysActivity.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Ví dụ sử dụng cho tháng 7 năm 2024

// let a = JSON.parse(JSON.stringify(daysActivity.value));
// let a = [
//     { "date": "2024-07-02", "hours_studied": 0.5, "activity_level": "low-activity" },
//     { "date": "2024-07-03", "hours_studied": 1.5, "activity_level": "medium-activity" },
// ];

// fillMissingDays(a, 2024, 7);
// console.log("acdsadfadf");
// console.log(a);

let a = []; // Initialize as an empty array
for (let i = 0; i < daysActivity.value.length; i++) {
    a.push({
        date: daysActivity.value[i].date,
        hours_studied: daysActivity.value[i].hours_studied,
        activity_level: daysActivity.value[i].activity_level
    });
}
console.log("----------------------------")
fillMissingDays(a, 2024, 8);
console.log(a);
console.log("----------------------------")
daysActivity.value = a;

// daysActivity.value = [
//     { "date": "2024-07-01", "hours_studied": 0, "activity_level": "no-study" },
//     { "date": "2024-07-02", "hours_studied": 0.5, "activity_level": "low-activity" },
//     { "date": "2024-07-03", "hours_studied": 1.5, "activity_level": "medium-activity" },
//     { "date": "2024-07-04", "hours_studied": 2.5, "activity_level": "medium-high-activity" },
//     { "date": "2024-07-05", "hours_studied": 3.5, "activity_level": "high-activity" },
//     { "date": "2024-07-06", "hours_studied": 0.2, "activity_level": "low-activity" },
//     { "date": "2024-07-07", "hours_studied": 2.1, "activity_level": "medium-high-activity" },
//     { "date": "2024-07-08", "hours_studied": 3.8, "activity_level": "high-activity" },
//     { "date": "2024-07-09", "hours_studied": 1.8, "activity_level": "medium-activity" },
//     { "date": "2024-07-10", "hours_studied": 2.7, "activity_level": "medium-high-activity" },
//     { "date": "2024-07-11", "hours_studied": 0, "activity_level": "no-study" },
//     { "date": "2024-07-12", "hours_studied": 1.2, "activity_level": "medium-activity" },
//     { "date": "2024-07-13", "hours_studied": 3.0, "activity_level": "high-activity" },
//     { "date": "2024-07-14", "hours_studied": 1.0, "activity_level": "low-activity" },
//     { "date": "2024-07-15", "hours_studied": 0.9, "activity_level": "low-activity" },
//     { "date": "2024-07-16", "hours_studied": 2.4, "activity_level": "medium-high-activity" },
//     { "date": "2024-07-17", "hours_studied": 3.9, "activity_level": "high-activity" },
//     { "date": "2024-07-18", "hours_studied": 1.5, "activity_level": "medium-activity" },
//     { "date": "2024-07-19", "hours_studied": 0, "activity_level": "no-study" },
//     { "date": "2024-07-20", "hours_studied": 2.6, "activity_level": "medium-high-activity" },
//     { "date": "2024-07-21", "hours_studied": 3.1, "activity_level": "high-activity" },
//     { "date": "2024-07-22", "hours_studied": 0.8, "activity_level": "low-activity" },
//     { "date": "2024-07-23", "hours_studied": 2.0, "activity_level": "medium-activity" },
//     { "date": "2024-07-24", "hours_studied": 1.9, "activity_level": "medium-activity" },
//     { "date": "2024-07-25", "hours_studied": 0, "activity_level": "no-study" },
//     { "date": "2024-07-26", "hours_studied": 3.6, "activity_level": "high-activity" },
//     { "date": "2024-07-27", "hours_studied": 1.1, "activity_level": "medium-activity" },
//     { "date": "2024-07-28", "hours_studied": 2.3, "activity_level": "medium-high-activity" },
//     { "date": "2024-07-29", "hours_studied": 1.7, "activity_level": "medium-activity" },
//     { "date": "2024-07-30", "hours_studied": 0.6, "activity_level": "low-activity" },
//     { "date": "2024-07-31", "hours_studied": 3.2, "activity_level": "high-activity" }
// ]
const topUsers = ref("")
const topRankList = ref("")
topRankList.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getRanks',
    }
})
topUsers.value = topRankList.value



const currentRankInfo = ref("")
const totalTime = ref("2")
const currentRank = ref("1")
currentRankInfo.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getCurrentStanding',
    }
})

// currentRank.value = currentRankInfo.value.top
// totalTime.value = currentRankInfo.value.totalTimeSoFar


const timeAnalysis = ref("")
timeAnalysis.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getByTime',
    }
})




console.log("----------------------------")
// console.log('Received data:', timeAnalysis.value)
// console.log('Received data:', daysActivity.value)
// console.log('Received data:', currentRankInfo.value)
// console.log('Received data:', topRankList.value)
console.log('Received data:', daysActivity.value)
console.log("----------------------------")

</script>

<style>
/* Add your CSS styling here */
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    background-color: #1a1a1a;
    color: white;
    font-family: Arial, sans-serif;
}

.calendar-section,
.summary-section,
.leaderboard-section {
    width: 30%;
}

.calendar-header h2 {
    text-align: center;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    margin-top: 20px;
}

.calendar-grid div {
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
}

.no-study {
    background-color: #333333;
}

.low-activity {
    background-color: #666666;
}

.medium-activity {
    background-color: #ffcc00;
}

.medium-high-activity {
    background-color: #ff9900;
}

.high-activity {
    background-color: #ff6600;
}

.summary-section div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 16px;
}

.leaderboard-section h3 {
    text-align: center;
    margin-bottom: 20px;
}

.leaderboard-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.your-rank {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
}
</style>