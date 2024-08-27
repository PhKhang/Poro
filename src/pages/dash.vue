<template>
    <div class="container">
        <!-- Calendar Section -->
        <div class="calendar-section">
            <div class="calendar-header">
                <h2>{{ thisMonth }}, {{ thisYear }}</h2>
            </div>
            <div class="calendar-grid">
                <div v-for="day in daysActivity" :key="day.date" :class="day.activity_level">
                    {{ getDay(day.date) }}<br>
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
                <span>{{ index + 1 }}. {{ user.name }}</span>
                <span>{{ user.totalWorkingTime }} h</span>
            </div>

            <div class="your-rank">
                Your Rank<br>{{ currentRank }}<br>{{ totalTime }}
            </div>
        </div>
    </div>
</template>

<script setup>
function getDay(date) {
    return new Date(date).getDate();
}
const daysActivity = ref()

const thisMonthIndex = new Date().getMonth();
const thisYear = ref()
thisYear.value = new Date().getFullYear();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const thisMonth = ref()
thisMonth.value = monthNames[thisMonthIndex];


daysActivity.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getDailyActivities',
    }
})

// console.log('Received data:', daysActivity.value[0])
// Hàm tạo danh sách các ngày từ ngày bắt đầu đến ngày kết thúc


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

console.log('Received data:', currentRankInfo.value)

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