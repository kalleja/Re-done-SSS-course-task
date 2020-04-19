'use strict';

window.addEventListener('load', async () => {
  const ul = document.querySelector('ul');
  const rfrsh = document.querySelector('#refresh');
  const form = document.querySelector('form');
  const username = 'Kalle';  
  const greeting = form.elements.greeting;

  if ("serviceWorker" in navigator) {
    try {
        await navigator.serviceWorker.register("./sw.js");
        console.log("SW is registered");
        const registration = await navigator.serviceWorker.ready;
        if("sync" in registration) {
            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                console.log("submitting data");
                const message = {
                    username,
                    greeting: greeting.value,
                };

                try {
                    saveData("outbox", message);    
                    await registration.sync.register("send-message");
                } catch (error) {
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
}

const init = async () => {
        
        const data = [];
        try {
            const greetings = await getGreetingsByUser(username);
            for (const message of greetings) {
                data.push(message);
            }
        } catch (e) {
            console.log(e.message);
        }

        ul.innerHTML = "";
        data.forEach((item) => {
            ul.innerHTML += `<li>${item.username}: ${item.greeting}</li>`;
        });
    };

    init();

    rfrsh.addEventListener("click", init);
});