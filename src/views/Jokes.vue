<template>
    <div class="jokes">
        <h1>Jokes</h1>
        <div>
            <button class="btn btn-sm btn-primary" @click="fetchData">Generate</button>
            <p v-if="joke">{{ joke }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        msg: String,
    },
    data() {
        return {
            joke: "",
        };
    },
    methods: {
        fetchData() {
            fetch('https://jokes-by-api-ninjas.p.rapidapi.com/v1/jokes', {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b',
                    'X-RapidAPI-Host': 'jokes-by-api-ninjas.p.rapidapi.com'
                }
            })
                .then((response) => {
                    response.json().then((data) => {
                        this.joke = data[0].joke;
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style scoped>
.jokes {
    padding-top: 20px;
}
</style>
