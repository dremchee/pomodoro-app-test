<script setup lang="ts">
import RepeatButtonIcon from '../../../assets/img/repeat-button.svg'
import PauseButtonIcon from '../../../assets/img/pause-button.svg'
import StopSessionButtonIcon from '../../../assets/img/stop-button.svg'
</script>


<template>
    <div class="container session-block">
        <div class="block-timer">
            <div class="time-indicator">
                <div class="date-of-work">12.01.2024</div>
                <div class="expiration-time">15:59</div>
                <div class="status">Work</div>
            </div>
        </div>
        <div class="report-block">
            <div class="report-circle-block">
                <div class="report-circle"></div>
                <div class="report-circle"></div>
                <div class="report-circle"></div>
                <div class="report-circle"></div>
                <div class="report-circle"></div>
                <div class="report-circle"></div>
            </div>
            <div class="report-text-info">2 of 6 sessions</div>
        </div>
        <div class="block-work-adjustment">
            <button class="repeat-button">
                <RepeatButtonIcon></RepeatButtonIcon>
            </button>
            <button class="pause-button">
                <PauseButtonIcon></PauseButtonIcon>
            </button>
            <button class="stop-button">
                <StopSessionButtonIcon></StopSessionButtonIcon>
            </button>
        </div>
    </div>
</template>

<style scoped>
.session-block {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
}

.block-timer {

    /* margin-top: 51px; */
}

.pause-button {
    /* border: none;
        cursor: pointer; */
    background-color: #262626;
}
</style>