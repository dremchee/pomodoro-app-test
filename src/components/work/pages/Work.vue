<script setup lang="ts">
import RepeatButtonIcon from '../../../assets/img/repeat-button.svg'
import PauseButtonIcon from '../../../assets/img/pause-button.svg'
import StopSessionButtonIcon from '../../../assets/img/stop-button.svg'
</script>


<template>
    <div class="container work">
        <div class="work-content">
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
        </div>
        <div class="work-action">
            <button class="work-action__button _repeat">
                <RepeatButtonIcon></RepeatButtonIcon>
            </button>
            <button class="work-action__button _action">
                <PauseButtonIcon></PauseButtonIcon>
            </button>
            <button class="work-action__button _stop">
                <StopSessionButtonIcon></StopSessionButtonIcon>
            </button>
        </div>
    </div>
</template>

<style scoped>
.work {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
}

.work-content {
    flex-grow: 1;
}

.work-action {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.work-action__button {
    border: none;
    cursor: pointer;
    background-color: #3E3D3A;
    color: var(--color-text);
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

    &._action {
        background-color: transparent;
        border: 0.1875rem solid var(--color-text);
        width: 8rem;
        height: 8rem;
    }
}
</style>