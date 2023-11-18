import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const CurrentTimeKey = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe, {
    loop: true,
    fullscreen: true,
    quality: '1080p',
});

const CurrentTime = function (currentTime) {
    const seconds = currentTime.seconds;
    localStorage.setItem(CurrentTimeKey, JSON.stringify(seconds));
};

player.on('timeupdate', throttle(CurrentTime, 1000));

player.setCurrentTime(JSON.parse(localStorage.getItem(CurrentTimeKey)) || 0);

player
    .setColor('#d8e0ff')
    .then(function (color) {
        console.log('The new color value: #D8E0FF');
    })
    .catch(function (error) {
        console.log('An error occurred while setting the color');
    });

