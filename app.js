// for DOM manipulation

const cityForm = document.querySelector('form')

const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('.time')
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

    console.log(data)
    
    const { cityDeets, weatherDeets } = data;

    details.innerHTML = `
    <h5 class="my-3">${cityDeets.EnglishName}</h5>
    <div class="my-3">${weatherDeets.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherDeets.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>
    `;

    // Update day/night icon images
    const iconSrc = `${weatherDeets.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    let timeSrc = weatherDeets.IsDayTime ? 'day.svg' : 'night.svg'

    time.setAttribute('src', timeSrc)

    // remove class of display none if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    };

};

const updateCity = async (city) => {

    const cityDeets = await getCity(city);
    const weatherDeets = await getWeatherInfo(cityDeets.Key);
    
    return { cityDeets, weatherDeets }
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // to get city value from the input
    const city = cityForm.city.value.trim();
    cityForm.reset();
    
    // update UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
})
