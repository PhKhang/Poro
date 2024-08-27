<template>
    <div class="container">
        <!-- Calendar Section -->

        <!-- Summary Section -->
        <div class="summary-section">
            <h3>Your working time in this</h3>
            <div>
                <span>Day</span>
                <span>{{ dayTime }} h</span>
            </div>
            <div>
                <span>Week</span>
                <span>{{ weekTime }} h</span>
            </div>
            <div>
                <span>Month</span>
                <span>{{ monthTime }} h</span>
            </div>
        </div>

        <!-- Leaderboard Section -->
        <div class="leaderboard-section">
            <h3>Leaderboard</h3>
            <div v-for="user in topUsers" :key="user.rank" class="leaderboard-item">
                <span>{{ user.rank }}. {{ user.name }}</span>
                <span>{{ user.total_hours }} h</span>
            </div>
            <div class="your-rank">
                Your Rank<br>{{ currentRank }}<br>{{ totalTime }}
            </div>
        </div>
    </div>
</template>

<script setup>
// export default {
//     data() {
//         return {
//             daysActivity: [
//                 { "date": "2024-07-01", "hours_studied": 0, "activity_level": "no-study" },
//                 { "date": "2024-07-02", "hours_studied": 0.5, "activity_level": "low-activity" },
//                 { "date": "2024-07-03", "hours_studied": 1.5, "activity_level": "medium-activity" },
//                 { "date": "2024-07-04", "hours_studied": 2.5, "activity_level": "medium-high-activity" },
//                 { "date": "2024-07-05", "hours_studied": 3.5, "activity_level": "high-activity" },
//                 { "date": "2024-07-06", "hours_studied": 0.2, "activity_level": "low-activity" },
//                 { "date": "2024-07-07", "hours_studied": 2.1, "activity_level": "medium-high-activity" },
//                 { "date": "2024-07-08", "hours_studied": 3.8, "activity_level": "high-activity" },
//                 { "date": "2024-07-09", "hours_studied": 1.8, "activity_level": "medium-activity" },
//                 { "date": "2024-07-10", "hours_studied": 2.7, "activity_level": "medium-high-activity" },
//                 { "date": "2024-07-11", "hours_studied": 0, "activity_level": "no-study" },
//                 { "date": "2024-07-12", "hours_studied": 1.2, "activity_level": "medium-activity" },
//                 { "date": "2024-07-13", "hours_studied": 3.0, "activity_level": "high-activity" },
//                 { "date": "2024-07-14", "hours_studied": 1.0, "activity_level": "low-activity" },
//                 { "date": "2024-07-15", "hours_studied": 0.9, "activity_level": "low-activity" },
//                 { "date": "2024-07-16", "hours_studied": 2.4, "activity_level": "medium-high-activity" },
//                 { "date": "2024-07-17", "hours_studied": 3.9, "activity_level": "high-activity" },
//                 { "date": "2024-07-18", "hours_studied": 1.5, "activity_level": "medium-activity" },
//                 { "date": "2024-07-19", "hours_studied": 0, "activity_level": "no-study" },
//                 { "date": "2024-07-20", "hours_studied": 2.6, "activity_level": "medium-high-activity" },
//                 { "date": "2024-07-21", "hours_studied": 3.1, "activity_level": "high-activity" },
//                 { "date": "2024-07-22", "hours_studied": 0.8, "activity_level": "low-activity" },
//                 { "date": "2024-07-23", "hours_studied": 2.0, "activity_level": "medium-activity" },
//                 { "date": "2024-07-24", "hours_studied": 1.9, "activity_level": "medium-activity" },
//                 { "date": "2024-07-25", "hours_studied": 0, "activity_level": "no-study" },
//                 { "date": "2024-07-26", "hours_studied": 3.6, "activity_level": "high-activity" },
//                 { "date": "2024-07-27", "hours_studied": 1.1, "activity_level": "medium-activity" },
//                 { "date": "2024-07-28", "hours_studied": 2.3, "activity_level": "medium-high-activity" },
//                 { "date": "2024-07-29", "hours_studied": 1.7, "activity_level": "medium-activity" },
//                 { "date": "2024-07-30", "hours_studied": 0.6, "activity_level": "low-activity" },
//                 { "date": "2024-07-31", "hours_studied": 3.2, "activity_level": "high-activity" }
//             ],

//         };
//     }
// }

const daysActivity = ref("")
daysActivity.value = await useFetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getDailyActivities',
    }
})
daysActivity.value = JSON.stringify(daysActivity.value)

const topRankList = ref("")
topRankList.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getRanks',
    }
})


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

const dayTime = ref("1")
const weekTime = ref("2")
const monthTime = ref("3")


const timeAnalysis = ref("")
timeAnalysis.value = await $fetch('/api/dashboard', {
    method: 'POST',
    body: {
        action: 'getByTime',
    }
})
dayTime.value = timeAnalysis.value.totalTimeOfToday
weekTime.value = timeAnalysis.value.totalTimeOfWeek
monthTime.value = timeAnalysis.value.totalTimeOfMonth

const topUsers = ref("")
topUsers.value = [
    { "rank": 1, "name": "Nhi Trần Ngọc Uyên", "total_hours": 655 },
    { "rank": 2, "name": "Nguyen Hoang", "total_hours": 523 },
    { "rank": 3, "name": "User 3", "total_hours": 300.1 },
    { "rank": 4, "name": "User 4", "total_hours": 231.5 },
    { "rank": 5, "name": "User 5", "total_hours": 45.1 },
    { "rank": 6, "name": "User 6", "total_hours": 40 },
    { "rank": 7, "name": "User 7", "total_hours": 40 },
    { "rank": 8, "name": "User 8", "total_hours": 40 },
    { "rank": 9, "name": "User 9", "total_hours": 40 },
    { "rank": 10, "name": "User 10", "total_hours": 40 }
]

console.log("----------------------------")
// console.log('Received data:', timeAnalysis.value)
// console.log('Received data:', daysActivity.value)
// console.log('Received data:', currentRankInfo.value)
console.log('Received data:', topRankList.value)
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