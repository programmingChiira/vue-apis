<template>
    <div class="news">
        <h1>Kenyan News</h1>
        <div>
            <button class="btn btn-sm btn-primary" @click="fetchData">Generate</button>
            <div v-if="fetchedData.length > 0">
                <div v-for="article in shuffledFetchedData" :key="article.title">
                    <h2>{{ article.title }}</h2>
                    <p>Author: {{ article.author }}</p>
                    <p>Publish Date: {{ article.publishedAt }}</p>
                    <img :src="article.imgUrl" alt="News Image">
                    <p>URL: <a :href="article.url">{{ article.url }}</a></p>
                    <hr>
                </div>
            </div>
            <p v-else>No news fetched yet.</p>
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
            fetchedData: [], // Initialize as an empty array
        };
    },
    methods: {
        fetchData() {
            fetch('https://kenyan-news-api.p.rapidapi.com/news/swahili', {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': '4113cbec39mshcf11b1d912ad411p14e994jsn27f8488c373b',
                    'X-RapidAPI-Host': 'kenyan-news-api.p.rapidapi.com'
                }
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    this.fetchedData = data.slice(0, 10); // Store first 10 articles
                    this.shuffleArticles(); // Shuffle the articles in place
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    this.fetchedData = []; // Clear data on error
                });
        },
        shuffleArticles() {
            // Shuffle the fetchedData array using the Fisher-Yates algorithm
            for (let i = this.fetchedData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.fetchedData[i], this.fetchedData[j]] = [this.fetchedData[j], this.fetchedData[i]];
            }
        },
    },
    computed: {
        shuffledFetchedData() {
            return this.fetchedData; // Return the shuffled array
        },
    },
};

</script>

<style scoped>
.news {
    padding-top: 20px;
}
</style>
